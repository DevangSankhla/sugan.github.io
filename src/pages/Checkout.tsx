import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  preparePayUForm,
  submitPayUPayment,
  processCOD,
  createOrder
} from '@/lib/payu';
import {
  checkPincodeServiceability,
  createShiprocketOrder,
  updateOrderShipping
} from '@/lib/shiprocket';
import { MapPin, Phone, User, Home, Building, Navigation, CreditCard, Banknote, Truck, Shield, AlertCircle, Package, MessageCircle, X, Info, ArrowRight, Loader2, ChevronDown } from 'lucide-react';
import CouponCode from '@/components/CouponCode';

const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu',
  'Delhi', 'Jammu and Kashmir', 'Ladakh', 'Lakshadweep', 'Puducherry',
];

type PaymentMethod = 'payu' | 'cod';

interface ShippingAddress {
  fullName: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
  landmark?: string;
}

export default function Checkout() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { items, totalPrice, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('payu');
  const [address, setAddress] = useState<ShippingAddress>({
    fullName: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    pincode: '',
    landmark: ''
  });
  const [pincodeError, setPincodeError] = useState('');
  const [isPincodeValid, setIsPincodeValid] = useState(false);
  const [isPincodeChecking, setIsPincodeChecking] = useState(false);
  const [phoneError, setPhoneError] = useState('');
  const [codAvailable, setCodAvailable] = useState(true);
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [affiliateMeta, setAffiliateMeta] = useState<{
    code: string;
    email: string;
    commissionPercent: number;
  } | null>(null);
  const [showPayUWarning, setShowPayUWarning] = useState(false);
  const [pendingPayUOrderId, setPendingPayUOrderId] = useState<string | null>(null);
  const [promoRemaining, setPromoRemaining] = useState<number | null>(null);
  const [guestEmail, setGuestEmail] = useState('');
  const [guestEmailError, setGuestEmailError] = useState('');
  const [confirmedOrder, setConfirmedOrder] = useState<{ id: string; orderNumber?: string } | null>(null);

  const SAC048_SKUS = ['SAC048S', 'SAC048M', 'SAC048L'];
  const hasSAC048 = items.some(item => SAC048_SKUS.includes(item.id));
  const promoFreeDelivery = hasSAC048 && promoRemaining !== null && promoRemaining > 0;

  // Shipping is free for every order, every customer.
  const shippingCost = 0;
  // COD charge: ₹50 on COD, waived if the SAC048 promo is active.
  const codCharge = promoFreeDelivery ? 0 : (paymentMethod === 'cod' ? 50 : 0);
  const finalTotal = totalPrice - discountAmount + shippingCost + codCharge;

  // Nothing to redirect on — guests are allowed through checkout

  // Pre-fill name from Firebase auth profile
  useEffect(() => {
    if (user?.displayName && !address.fullName) {
      setAddress(prev => ({ ...prev, fullName: user.displayName! }));
    }
  }, [user?.displayName]);

  // Validate pincode and check COD availability
  useEffect(() => {
    if (address.pincode.length !== 6) {
      setIsPincodeValid(false);
      setIsPincodeChecking(false);
      setPincodeError('');
      return;
    }

    const isValid = /^[1-9][0-9]{5}$/.test(address.pincode);
    setIsPincodeValid(isValid);
    setPincodeError(isValid ? '' : 'Invalid pincode');

    if (!isValid) return;

    setIsPincodeChecking(true);
    let cancelled = false;
    const timer = setTimeout(async () => {
      try {
        const serviceability = await checkPincodeServiceability(address.pincode);
        if (!cancelled) {
          setCodAvailable(serviceability.cod);
          setIsPincodeChecking(false);
        }
      } catch (error) {
        console.error('Error checking serviceability:', error);
        if (!cancelled) setIsPincodeChecking(false);
      }
    }, 400);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [address.pincode]);

  // Real-time promo counter subscription for SAC048 free delivery
  useEffect(() => {
    if (!hasSAC048) return;
    const promoRef = doc(db, 'promotions', 'sac048_free_delivery');
    const unsub = onSnapshot(promoRef, (snap) => {
      setPromoRemaining(snap.exists() ? (snap.data().remaining as number) : null);
    });
    return () => unsub();
  }, [hasSAC048]);

  const handleSubmit = async () => {
    setLoading(true);

    try {
      // Affiliate fields snapshot - commission is on listed prices (sum of
      // items[].price * items[].quantity), independent of customer discount.
      const itemsTotal = items.reduce((s, it) => s + it.price * it.quantity, 0);
      const affiliateFields = affiliateMeta ? {
        affiliateCode: affiliateMeta.code,
        affiliateEmail: affiliateMeta.email,
        affiliateCommissionPercent: affiliateMeta.commissionPercent,
        affiliateCommissionAmount: Math.round(itemsTotal * affiliateMeta.commissionPercent) / 100,
      } : {};

      const effectiveEmail = user ? user.email : guestEmail;

      // Create order in Firestore first
      const orderData = {
        userId: user?.uid || null,
        userEmail: effectiveEmail,
        ...(user ? {} : { guestEmail, guestPhone: address.phone }),
        items: items.map(item => ({
          productId: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image
        })),
        subtotal: totalPrice,
        discount: discountAmount,
        couponCode: appliedCoupon,
        ...affiliateFields,
        shipping: shippingCost,
        shippingCourier: 'Shiprocket',
        codCharge: codCharge,
        total: finalTotal,
        status: 'pending',
        paymentStatus: 'pending',
        paymentMethod: paymentMethod === 'cod' ? 'COD' : 'PayU',
        shippingAddress: address,
        txnid: null,
      };

      const orderId = await createOrder(orderData, promoFreeDelivery);

      // Create Shiprocket order for shipping
      try {
          const shiprocketResult = await createShiprocketOrder({
            orderId,
            items: items.map(item => ({
              name: item.name,
              sku: item.id,
              units: item.quantity,
              selling_price: item.price,
            })),
            pickupLocation: {
              name: 'Sugan Warehouse',
              address: 'III Phase, Boranada',
              city: 'Jodhpur',
              state: 'Rajasthan',
              pincode: '342012',
              phone: '6367677255',
            },
            shippingAddress: {
              name: address.fullName,
              address: address.addressLine1,
              address_2: address.addressLine2,
              city: address.city,
              state: address.state,
              pincode: address.pincode,
              phone: address.phone,
            },
            paymentMethod: paymentMethod === 'cod' ? 'COD' : 'Prepaid',
            totalAmount: finalTotal,
          });

          if (shiprocketResult.success) {
            await updateOrderShipping(orderId, {
              courier: 'Shiprocket',
              awb: shiprocketResult.awb || '',
              shipmentId: shiprocketResult.shipmentId || '',
              label: shiprocketResult.label,
            });
          }
        } catch (shipError) {
          console.error('Shiprocket order creation error:', shipError);
          // Continue with order even if shiprocket fails - can be created later
        }

      if (paymentMethod === 'cod') {
        // Customer confirmation email is handled by the sendOrderPlacedEmail
        // Cloud Function trigger - no client-side notify call needed.
        await processCOD(orderId);
        clearCart();
        if (user) {
          navigate(`/account?order=${orderId}&cod=true`);
        } else {
          // Guest COD: show inline confirmation (no account to navigate to)
          const { getOrderDetails } = await import('@/lib/payu');
          const orderDoc = await getOrderDetails(orderId);
          setConfirmedOrder({ id: orderId, orderNumber: (orderDoc as Record<string, unknown>)?.orderNumber as string | undefined });
        }
      } else {
        // Show warning before PayU redirect (GitHub Pages blocks POST back)
        setPendingPayUOrderId(orderId);
        setShowPayUWarning(true);
        setLoading(false);
        return;
      }
    } catch (error) {
      console.error('Error creating order:', error);
      alert('Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const proceedToPayU = () => {
    if (!pendingPayUOrderId) return;
    const payuFormData = preparePayUForm({
      orderId: pendingPayUOrderId,
      userId: user?.uid || '',
      amount: finalTotal,
      customerName: address.fullName,
      customerEmail: user?.email || guestEmail,
      customerPhone: address.phone,
      productInfo: `Order from Sugan (${items.length} items)`
    });

    sessionStorage.setItem('pendingOrderId', pendingPayUOrderId);
    submitPayUPayment(payuFormData);
  };



  const isPhoneValid = /^[6-9]\d{9}$/.test(address.phone);
  const isGuestEmailValid = !user ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(guestEmail) : true;
  const isFormValid = !!address.fullName && isPhoneValid && !!address.addressLine1 &&
                      !!address.city && !!address.state && isPincodeValid && isGuestEmailValid;

  // Must be after all hooks
  if (items.length === 0 && !confirmedOrder) {
    navigate('/shop');
    return null;
  }

  // Guest COD confirmed screen
  if (confirmedOrder) {
    return (
      <div className="min-h-screen bg-sugan-bone pt-24 pb-12">
        <div className="max-w-md mx-auto px-4">
          <Card className="border-none shadow-xl">
            <CardContent className="p-8 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Package className="w-10 h-10 text-green-500" />
              </div>
              <h1 className="font-display text-3xl text-sugan-ink mb-2">Order Placed!</h1>
              <p className="text-sugan-ink/60 font-body mb-6">
                Your Cash on Delivery order has been confirmed.
              </p>
              {confirmedOrder.orderNumber && (
                <p className="font-body font-semibold text-sugan-ink mb-4">
                  Order Number: {confirmedOrder.orderNumber}
                </p>
              )}
              <div className="bg-sugan-bone rounded-xl p-4 mb-6 text-sm text-sugan-ink/70 font-body text-left space-y-2">
                <p>• A confirmation email has been sent to <strong>{guestEmail}</strong></p>
                <p>• Delivery in 5–7 business days</p>
                <p>• Please keep the exact amount ready at delivery</p>
              </div>
              <a
                href={`https://wa.me/916367677255?text=Hi, I just placed a COD order${confirmedOrder.orderNumber ? ' ' + confirmedOrder.orderNumber : ''}. Please confirm.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 w-full justify-center px-6 py-3 bg-green-500 text-white rounded-full font-body hover:bg-green-600 transition-colors mb-4"
              >
                <Phone className="w-4 h-4" />
                Track via WhatsApp
              </a>
              <Link to="/shop">
                <Button variant="outline" className="w-full font-body border-sugan-ink/20">
                  Continue Shopping
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sugan-bone py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-display text-3xl text-sugan-ink mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Shipping & Payment */}
          <div className="space-y-6">
            {/* Guest email card — only shown when not signed in */}
            {!user && (
              <Card>
                <CardHeader>
                  <CardTitle className="font-display text-xl text-sugan-ink flex items-center gap-2">
                    <User className="w-5 h-5 text-sugan-gold" />
                    Contact Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label className="font-body">Email Address</Label>
                    <Input
                      type="email"
                      value={guestEmail}
                      onChange={(e) => {
                        setGuestEmail(e.target.value);
                        setGuestEmailError('');
                      }}
                      onBlur={() => {
                        if (guestEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(guestEmail)) {
                          setGuestEmailError('Enter a valid email address');
                        }
                      }}
                      className={`font-body ${guestEmailError ? 'border-red-500' : ''}`}
                      placeholder="you@example.com"
                    />
                    {guestEmailError && (
                      <p className="text-xs text-red-500 font-body">{guestEmailError}</p>
                    )}
                    <p className="text-xs text-sugan-ink/50 font-body">
                      Order confirmation will be sent here. Sign up later to track your order.
                    </p>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-sugan-bone rounded-lg">
                    <span className="text-xs text-sugan-ink/60 font-body">Already have an account?</span>
                    <Link to="/login?redirect=/checkout" className="text-xs text-sugan-gold font-body hover:underline">
                      Sign in
                    </Link>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Shipping Address */}
            <Card>
              <CardHeader>
                <CardTitle className="font-display text-xl text-sugan-ink flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-sugan-gold" />
                  Shipping Address
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="space-y-2">
                    <Label className="font-body">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-sugan-ink/40" />
                      <Input
                        value={address.fullName}
                        onChange={(e) => setAddress({...address, fullName: e.target.value})}
                        className="pl-10 font-body"
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="font-body">Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-sugan-ink/40" />
                      <Input
                        value={address.phone}
                        onChange={(e) => {
                          const val = e.target.value;
                          setAddress({...address, phone: val});
                          if (val.length > 0 && !/^[6-9]\d{0,9}$/.test(val)) {
                            setPhoneError('Enter a valid 10-digit Indian mobile number');
                          } else if (val.length === 10 && !/^[6-9]\d{9}$/.test(val)) {
                            setPhoneError('Number must start with 6, 7, 8, or 9');
                          } else {
                            setPhoneError('');
                          }
                        }}
                        className={`pl-10 font-body ${phoneError ? 'border-red-500' : ''}`}
                        placeholder="10-digit mobile number"
                        required
                        maxLength={10}
                        inputMode="numeric"
                      />
                    </div>
                    {phoneError && (
                      <p className="text-xs text-red-500 font-body">{phoneError}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label className="font-body">Address Line 1</Label>
                    <div className="relative">
                      <Home className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-sugan-ink/40" />
                      <Input
                        value={address.addressLine1}
                        onChange={(e) => setAddress({...address, addressLine1: e.target.value})}
                        className="pl-10 font-body"
                        placeholder="House/Flat No., Building, Street"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="font-body">Address Line 2 (Optional)</Label>
                    <div className="relative">
                      <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-sugan-ink/40" />
                      <Input
                        value={address.addressLine2}
                        onChange={(e) => setAddress({...address, addressLine2: e.target.value})}
                        className="pl-10 font-body"
                        placeholder="Area, Colony, Sector"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="font-body">City</Label>
                      <Input
                        value={address.city}
                        onChange={(e) => setAddress({...address, city: e.target.value})}
                        className="font-body"
                        placeholder="City"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="font-body">State</Label>
                      <div className="relative">
                        <select
                          value={address.state}
                          onChange={(e) => setAddress({...address, state: e.target.value})}
                          className="w-full h-10 pl-3 pr-8 font-body text-sm border border-input rounded-md bg-background text-sugan-ink appearance-none focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                          required
                        >
                          <option value="">Select state</option>
                          {INDIAN_STATES.map(s => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-sugan-ink/40 pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="font-body">PIN Code</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-sugan-ink/40" />
                        <Input
                          value={address.pincode}
                          onChange={(e) => setAddress({...address, pincode: e.target.value.replace(/\D/g, '').slice(0, 6)})}
                          className={`pl-10 pr-8 font-body ${pincodeError ? 'border-red-500' : isPincodeValid ? 'border-green-500' : ''}`}
                          placeholder="6-digit PIN"
                          required
                          maxLength={6}
                          inputMode="numeric"
                        />
                        {isPincodeChecking && (
                          <Loader2 className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-sugan-ink/40 animate-spin" />
                        )}
                        {isPincodeValid && !isPincodeChecking && (
                          <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-green-500 text-xs">✓</span>
                        )}
                      </div>
                      {pincodeError && (
                        <p className="text-xs text-red-500 font-body">{pincodeError}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label className="font-body">Landmark (Optional)</Label>
                      <div className="relative">
                        <Navigation className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-sugan-ink/40" />
                        <Input
                          value={address.landmark}
                          onChange={(e) => setAddress({...address, landmark: e.target.value})}
                          className="pl-10 font-body"
                          placeholder="Nearby landmark"
                        />
                      </div>
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Shipping Info */}
            <Card>
              <CardHeader>
                <CardTitle className="font-display text-xl text-sugan-ink flex items-center gap-2">
                  <Truck className="w-5 h-5 text-sugan-gold" />
                  Shipping
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3 p-4 bg-sugan-bone rounded-xl">
                  <Package className="w-10 h-10 text-sugan-gold" />
                  <div>
                    <p className="font-body font-medium text-sugan-ink">Standard Delivery</p>
                    <p className="text-sm text-sugan-ink/60 font-body">
                      Ships within 2-3 business days
                    </p>
                    <p className="text-xs text-sugan-ink/50 font-body mt-1">
                      via Shiprocket
                    </p>
                  </div>
                </div>
                
                {promoFreeDelivery ? (
                  <div className="mt-4 p-4 bg-green-50 border-2 border-green-300 rounded-xl">
                    <p className="font-body font-bold text-green-800">
                      🎁 Free Delivery - At no extra cost!
                    </p>
                    <p className="font-body text-sm text-green-700 mt-1">
                      <strong>{promoRemaining} left</strong> - Shipping & COD charge both waived
                    </p>
                  </div>
                ) : hasSAC048 && promoRemaining === 0 ? (
                  <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl">
                    <p className="font-body font-semibold text-red-800 text-sm mb-1">
                      The first 50 free deliveries are sold out - sorry, you're late!
                    </p>
                    <p className="font-body text-sm text-red-700">
                      Get your next order with us with no extra shipping costs.
                    </p>
                    <p className="font-body text-xs text-red-600 mt-2 font-medium">
                      📸 Screenshot this message and send it to us on WhatsApp before placing your next order.
                    </p>
                  </div>
                ) : (
                  <div className="mt-4 p-3 bg-green-50 rounded-lg">
                    <p className="text-sm text-green-700 font-body flex items-center gap-2">
                      <Truck className="w-4 h-4" />
                      Free shipping on all orders!
                    </p>
                  </div>
                )}

                {!codAvailable && paymentMethod === 'cod' && (
                  <div className="mt-4 p-3 bg-red-50 rounded-lg">
                    <p className="text-sm text-red-700 font-body">
                      COD is not available for this pincode. Please choose online payment.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card>
              <CardHeader>
                <CardTitle className="font-display text-xl text-sugan-ink flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-sugan-gold" />
                  Payment Method
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {/* PayU Online Payment */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('payu')}
                    className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                      paymentMethod === 'payu'
                        ? 'border-sugan-gold bg-sugan-gold/5'
                        : 'border-sugan-ink/10 hover:border-sugan-ink/30'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        paymentMethod === 'payu' ? 'border-sugan-gold' : 'border-sugan-ink/30'
                      }`}>
                        {paymentMethod === 'payu' && <div className="w-2.5 h-2.5 bg-sugan-gold rounded-full" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-body font-medium text-sugan-ink">Pay Online</span>
                          <Badge className="bg-green-100 text-green-700 text-xs">Secure</Badge>
                        </div>
                        <p className="text-xs text-sugan-ink/60 font-body mt-1">
                          UPI, Cards, Net Banking, Wallets
                        </p>
                      </div>
                      <div className="flex gap-1">
                        <div className="w-8 h-5 bg-sugan-ink/10 rounded" />
                        <div className="w-8 h-5 bg-sugan-ink/10 rounded" />
                      </div>
                    </div>
                  </button>

                  {/* Cash on Delivery */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cod')}
                    className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                      paymentMethod === 'cod'
                        ? 'border-sugan-gold bg-sugan-gold/5'
                        : 'border-sugan-ink/10 hover:border-sugan-ink/30'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        paymentMethod === 'cod' ? 'border-sugan-gold' : 'border-sugan-ink/30'
                      }`}>
                        {paymentMethod === 'cod' && <div className="w-2.5 h-2.5 bg-sugan-gold rounded-full" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-body font-medium text-sugan-ink">Cash on Delivery</span>
                          <Badge className="bg-blue-100 text-blue-700 text-xs">COD</Badge>
                        </div>
                        <p className="text-xs text-sugan-ink/60 font-body mt-1">
                          Pay when you receive the product
                        </p>
                      </div>
                      <Banknote className="w-8 h-8 text-sugan-ink/20" />
                    </div>
                  </button>

                  {/* COD Notice */}
                  {paymentMethod === 'cod' && codCharge > 0 && (
                    <div className="flex items-start gap-2 p-3 bg-yellow-50 rounded-lg">
                      <AlertCircle className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-0.5" />
                      <p className="text-xs text-yellow-700 font-body">
                        A ₹{codCharge} COD fee will be added to your order total. 
                        Please keep exact change ready at the time of delivery.
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Order Summary */}
          <div>
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="font-display text-xl text-sugan-ink">
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Items */}
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                        loading="lazy"
                      />
                      <div className="flex-1">
                        <h4 className="font-body text-sugan-ink font-medium line-clamp-1">{item.name}</h4>
                        <p className="text-sm text-sugan-ink/60 font-body">
                          Qty: {item.quantity}
                        </p>
                        <p className="text-sugan-gold font-body">
                          ₹{(item.price * item.quantity).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}

                  {/* Coupon */}
                  <CouponCode
                    subtotal={totalPrice}
                    paymentMethod={paymentMethod}
                    onApplyCoupon={(discount, code, aff) => {
                      setDiscountAmount(discount);
                      setAppliedCoupon(code);
                      setAffiliateMeta(aff || null);
                    }}
                    onRemoveCoupon={() => {
                      setDiscountAmount(0);
                      setAppliedCoupon(null);
                      setAffiliateMeta(null);
                    }}
                    appliedCoupon={appliedCoupon}
                    discountAmount={discountAmount}
                  />

                  {/* Totals */}
                  <div className="border-t border-sugan-ink/10 pt-4 space-y-2">
                    <div className="flex justify-between font-body text-sugan-ink/60">
                      <span>Subtotal</span>
                      <span>₹{totalPrice.toLocaleString()}</span>
                    </div>
                    {discountAmount > 0 && (
                      <div className="flex justify-between font-body text-green-600">
                        <span>Discount ({appliedCoupon})</span>
                        <span>-₹{discountAmount.toLocaleString()}</span>
                      </div>
                    )}
                    <div className="flex justify-between font-body text-sugan-ink/60">
                      <span>Shipping</span>
                      <span className={promoFreeDelivery ? 'text-green-600 font-medium' : ''}>
                        {shippingCost === 0 ? (promoFreeDelivery ? 'FREE 🎁' : 'FREE') : `₹${shippingCost}`}
                      </span>
                    </div>
                    {promoFreeDelivery && paymentMethod === 'cod' ? (
                      <div className="flex justify-between font-body text-green-600">
                        <span>COD Fee</span>
                        <span className="font-medium">FREE 🎁</span>
                      </div>
                    ) : codCharge > 0 ? (
                      <div className="flex justify-between font-body text-sugan-ink/60">
                        <span>COD Fee</span>
                        <span>₹{codCharge}</span>
                      </div>
                    ) : null}
                    <div className="flex justify-between font-body text-sugan-ink font-semibold text-lg pt-2 border-t border-sugan-ink/10">
                      <span>Total</span>
                      <span>₹{finalTotal.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Security Badges */}
                  <div className="flex items-center justify-center gap-4 pt-4 border-t border-sugan-ink/10">
                    <div className="flex items-center gap-1 text-xs text-sugan-ink/50 font-body">
                      <Shield className="w-4 h-4" />
                      Secure Payment
                    </div>
                    <div className="flex items-center gap-1 text-xs text-sugan-ink/50 font-body">
                      <Truck className="w-4 h-4" />
                      Free Shipping
                    </div>
                  </div>

                  {/* Place Order Button */}
                  <Button
                    type="button"
                    onClick={handleSubmit}
                    disabled={!isFormValid || loading}
                    className="w-full h-14 bg-sugan-ink hover:bg-sugan-ink/90 font-body text-lg"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Processing...
                      </span>
                    ) : paymentMethod === 'cod' ? (
                      'Place Order (COD)'
                    ) : (
                      'Proceed to Pay'
                    )}
                  </Button>

                  {/* Trust Note */}
                  <p className="text-xs text-sugan-ink/50 font-body text-center">
                    By placing this order, you agree to our Terms of Service and Privacy Policy.
                    All transactions are secured by PayU.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      {/* PayU Redirect Warning Modal */}
      {showPayUWarning && (
        <div className="fixed inset-0 z-50 bg-sugan-ink/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-sugan-bone rounded-2xl p-6 md:p-8 max-w-md w-full shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display text-xl text-sugan-ink flex items-center gap-2">
                <Info className="w-5 h-5 text-sugan-gold" />
                Important
              </h3>
              <button
                onClick={() => setShowPayUWarning(false)}
                className="text-sugan-ink/40 hover:text-sugan-ink"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <p className="font-body text-sugan-ink/80">
                You are about to be redirected to PayU to complete your payment.
              </p>
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <p className="font-body text-sm text-amber-800 font-medium mb-1">
                  After payment, please check your Account → Orders page
                </p>
                <p className="font-body text-xs text-amber-700">
                  Do not refresh or close your browser after payment. Your order confirmation will appear in your account within a few minutes.
                </p>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
                <MessageCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-body text-sm text-blue-800 font-medium">
                    Get instant updates on WhatsApp
                  </p>
                  <a
                    href={`https://wa.me/916367677255?text=Hi, I just placed an order on Sugan. Please confirm my payment status. Order ID: ${pendingPayUOrderId?.slice(-8).toUpperCase()}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-blue-600 font-body hover:underline mt-1"
                  >
                    Message us
                    <ArrowRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
              <div className="flex flex-col gap-3 pt-2">
                <Button
                  onClick={proceedToPayU}
                  className="w-full h-12 bg-sugan-ink hover:bg-sugan-ink/90 font-body"
                >
                  Continue to PayU
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowPayUWarning(false)}
                  className="w-full h-12 font-body border-sugan-ink/20"
                >
                  Go Back
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
