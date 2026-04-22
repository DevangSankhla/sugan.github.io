import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
  createOrder,
  generateTxnId
} from '@/lib/payu';
import { 
  checkPincodeServiceability,
  createShiprocketOrder,
  updateOrderShipping
} from '@/lib/shiprocket';
import { sendOrderEmail } from '@/lib/notifications';
import { MapPin, Phone, User, Home, Building, Navigation, CreditCard, Banknote, Truck, Shield, AlertCircle, Package, MessageCircle, X, Info, ArrowRight } from 'lucide-react';
import CouponCode from '@/components/CouponCode';

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
  const [codAvailable, setCodAvailable] = useState(true);
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [showPayUWarning, setShowPayUWarning] = useState(false);
  const [pendingPayUOrderId, setPendingPayUOrderId] = useState<string | null>(null);

  // Simple shipping cost logic
  const shippingCost = totalPrice > 1999 ? 0 : 99;
  const codCharge = paymentMethod === 'cod' ? 50 : 0;
  const finalTotal = totalPrice - discountAmount + shippingCost + codCharge;

  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      navigate('/login?redirect=/checkout');
      return;
    }
  }, [user, navigate]);

  // Validate pincode and check COD availability
  useEffect(() => {
    if (address.pincode.length !== 6) {
      setIsPincodeValid(false);
      setPincodeError('');
      return;
    }

    const isValid = /^[1-9][0-9]{5}$/.test(address.pincode);
    setIsPincodeValid(isValid);
    setPincodeError(isValid ? '' : 'Invalid pincode');

    if (!isValid) return;

    let cancelled = false;
    const timer = setTimeout(async () => {
      try {
        const serviceability = await checkPincodeServiceability(address.pincode);
        if (!cancelled) setCodAvailable(serviceability.cod);
      } catch (error) {
        console.error('Error checking serviceability:', error);
      }
    }, 400);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [address.pincode]);

  const handleSubmit = async () => {
    if (!user) {
      navigate('/login?redirect=/checkout');
      return;
    }
    setLoading(true);

    try {
      // Create order in Firestore first
      const orderData = {
        userId: user.uid,
        userEmail: user.email,
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
        shipping: shippingCost,
        shippingCourier: 'Shiprocket',
        codCharge: codCharge,
        total: finalTotal,
        status: 'pending',
        paymentStatus: 'pending',
        paymentMethod: paymentMethod === 'cod' ? 'COD' : 'PayU',
        shippingAddress: address,
        txnid: paymentMethod === 'payu' ? generateTxnId() : null,
      };

      const orderId = await createOrder(orderData);

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
        // Process Cash on Delivery
        await processCOD(orderId);
        
        // Send email notification
        try {
          await sendOrderEmail({
            to: user.email || '',
            orderId,
            customerName: address.fullName,
            total: finalTotal,
            items: items.map(item => ({
              name: item.name,
              price: item.price,
              quantity: item.quantity
            })),
            paymentMethod: 'Cash on Delivery'
          });
        } catch (notifyErr) {
          console.error('Notification error:', notifyErr);
        }
        
        clearCart();
        navigate(`/account?order=${orderId}&cod=true`);
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
    if (!pendingPayUOrderId || !user) return;
    const payuFormData = preparePayUForm({
      orderId: pendingPayUOrderId,
      userId: user.uid,
      amount: finalTotal,
      customerName: address.fullName,
      customerEmail: user.email || '',
      customerPhone: address.phone,
      productInfo: `Order from Sugan (${items.length} items)`
    });

    sessionStorage.setItem('pendingOrderId', pendingPayUOrderId);
    submitPayUPayment(payuFormData);
  };



  const isFormValid = address.fullName && address.phone && address.addressLine1 && 
                      address.city && address.state && isPincodeValid;

  // Don't render if redirecting (must be after all hooks)
  if (!user || items.length === 0) {
    return null;
  }

  return (
    <div className="min-h-screen bg-sugan-cream py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-display text-3xl text-sugan-brown mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Shipping & Payment */}
          <div className="space-y-6">
            {/* Shipping Address */}
            <Card>
              <CardHeader>
                <CardTitle className="font-display text-xl text-sugan-brown flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-sugan-gold" />
                  Shipping Address
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="space-y-2">
                    <Label className="font-body">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-sugan-brown/40" />
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
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-sugan-brown/40" />
                      <Input
                        value={address.phone}
                        onChange={(e) => setAddress({...address, phone: e.target.value})}
                        className="pl-10 font-body"
                        placeholder="10-digit mobile number"
                        required
                        pattern="[0-9]{10}"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="font-body">Address Line 1</Label>
                    <div className="relative">
                      <Home className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-sugan-brown/40" />
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
                      <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-sugan-brown/40" />
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
                      <Input
                        value={address.state}
                        onChange={(e) => setAddress({...address, state: e.target.value})}
                        className="font-body"
                        placeholder="State"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="font-body">PIN Code</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-sugan-brown/40" />
                        <Input
                          value={address.pincode}
                          onChange={(e) => setAddress({...address, pincode: e.target.value})}
                          className={`pl-10 font-body ${pincodeError ? 'border-red-500' : ''}`}
                          placeholder="6-digit PIN"
                          required
                          pattern="[0-9]{6}"
                        />
                      </div>
                      {pincodeError && (
                        <p className="text-xs text-red-500 font-body">{pincodeError}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label className="font-body">Landmark (Optional)</Label>
                      <div className="relative">
                        <Navigation className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-sugan-brown/40" />
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
                <CardTitle className="font-display text-xl text-sugan-brown flex items-center gap-2">
                  <Truck className="w-5 h-5 text-sugan-gold" />
                  Shipping
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3 p-4 bg-sugan-cream rounded-xl">
                  <Package className="w-10 h-10 text-sugan-gold" />
                  <div>
                    <p className="font-body font-medium text-sugan-brown">Standard Delivery</p>
                    <p className="text-sm text-sugan-brown/60 font-body">
                      Ships within 2-3 business days
                    </p>
                    <p className="text-xs text-sugan-brown/50 font-body mt-1">
                      via Shiprocket
                    </p>
                  </div>
                </div>
                
                {totalPrice > 1999 ? (
                  <div className="mt-4 p-3 bg-green-50 rounded-lg">
                    <p className="text-sm text-green-700 font-body flex items-center gap-2">
                      <Truck className="w-4 h-4" />
                      Free shipping on orders above ₹1999!
                    </p>
                  </div>
                ) : (
                  <div className="mt-4 p-3 bg-sugan-cream rounded-lg">
                    <p className="text-sm text-sugan-brown/60 font-body">
                      Shipping: <span className="font-medium text-sugan-brown">₹99</span>
                    </p>
                    <p className="text-xs text-sugan-brown/40 font-body mt-1">
                      Free shipping on orders above ₹1999
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
                <CardTitle className="font-display text-xl text-sugan-brown flex items-center gap-2">
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
                        : 'border-sugan-brown/10 hover:border-sugan-brown/30'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        paymentMethod === 'payu' ? 'border-sugan-gold' : 'border-sugan-brown/30'
                      }`}>
                        {paymentMethod === 'payu' && <div className="w-2.5 h-2.5 bg-sugan-gold rounded-full" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-body font-medium text-sugan-brown">Pay Online</span>
                          <Badge className="bg-green-100 text-green-700 text-xs">Secure</Badge>
                        </div>
                        <p className="text-xs text-sugan-brown/60 font-body mt-1">
                          UPI, Cards, Net Banking, Wallets
                        </p>
                      </div>
                      <div className="flex gap-1">
                        <div className="w-8 h-5 bg-sugan-brown/10 rounded" />
                        <div className="w-8 h-5 bg-sugan-brown/10 rounded" />
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
                        : 'border-sugan-brown/10 hover:border-sugan-brown/30'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        paymentMethod === 'cod' ? 'border-sugan-gold' : 'border-sugan-brown/30'
                      }`}>
                        {paymentMethod === 'cod' && <div className="w-2.5 h-2.5 bg-sugan-gold rounded-full" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-body font-medium text-sugan-brown">Cash on Delivery</span>
                          <Badge className="bg-blue-100 text-blue-700 text-xs">COD</Badge>
                        </div>
                        <p className="text-xs text-sugan-brown/60 font-body mt-1">
                          Pay when you receive the product
                        </p>
                      </div>
                      <Banknote className="w-8 h-8 text-sugan-brown/20" />
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
                <CardTitle className="font-display text-xl text-sugan-brown">
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
                        <h4 className="font-body text-sugan-brown font-medium line-clamp-1">{item.name}</h4>
                        <p className="text-sm text-sugan-brown/60 font-body">
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
                    onApplyCoupon={(discount, code) => { setDiscountAmount(discount); setAppliedCoupon(code); }}
                    onRemoveCoupon={() => { setDiscountAmount(0); setAppliedCoupon(null); }}
                    appliedCoupon={appliedCoupon}
                    discountAmount={discountAmount}
                  />

                  {/* Totals */}
                  <div className="border-t border-sugan-brown/10 pt-4 space-y-2">
                    <div className="flex justify-between font-body text-sugan-brown/60">
                      <span>Subtotal</span>
                      <span>₹{totalPrice.toLocaleString()}</span>
                    </div>
                    {discountAmount > 0 && (
                      <div className="flex justify-between font-body text-green-600">
                        <span>Discount ({appliedCoupon})</span>
                        <span>-₹{discountAmount.toLocaleString()}</span>
                      </div>
                    )}
                    <div className="flex justify-between font-body text-sugan-brown/60">
                      <span>Shipping</span>
                      <span>{shippingCost === 0 ? 'FREE' : `₹${shippingCost}`}</span>
                    </div>
                    {codCharge > 0 && (
                      <div className="flex justify-between font-body text-sugan-brown/60">
                        <span>COD Fee</span>
                        <span>₹{codCharge}</span>
                      </div>
                    )}
                    <div className="flex justify-between font-body text-sugan-brown font-semibold text-lg pt-2 border-t border-sugan-brown/10">
                      <span>Total</span>
                      <span>₹{finalTotal.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Security Badges */}
                  <div className="flex items-center justify-center gap-4 pt-4 border-t border-sugan-brown/10">
                    <div className="flex items-center gap-1 text-xs text-sugan-brown/50 font-body">
                      <Shield className="w-4 h-4" />
                      Secure Payment
                    </div>
                    <div className="flex items-center gap-1 text-xs text-sugan-brown/50 font-body">
                      <Truck className="w-4 h-4" />
                      Free Shipping above ₹1999
                    </div>
                  </div>

                  {/* Place Order Button */}
                  <Button
                    type="button"
                    onClick={handleSubmit}
                    disabled={!isFormValid || loading}
                    className="w-full h-14 bg-sugan-brown hover:bg-sugan-brown/90 font-body text-lg"
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
                  <p className="text-xs text-sugan-brown/50 font-body text-center">
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
        <div className="fixed inset-0 z-50 bg-sugan-brown/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-sugan-cream rounded-2xl p-6 md:p-8 max-w-md w-full shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display text-xl text-sugan-brown flex items-center gap-2">
                <Info className="w-5 h-5 text-sugan-gold" />
                Important
              </h3>
              <button
                onClick={() => setShowPayUWarning(false)}
                className="text-sugan-brown/40 hover:text-sugan-brown"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <p className="font-body text-sugan-brown/80">
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
                  className="w-full h-12 bg-sugan-brown hover:bg-sugan-brown/90 font-body"
                >
                  Continue to PayU
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowPayUWarning(false)}
                  className="w-full h-12 font-body border-sugan-brown/20"
                >
                  Go Back
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PayU Redirect Warning Modal */}
      {showPayUWarning && (
        <div className="fixed inset-0 z-50 bg-sugan-brown/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-sugan-cream rounded-2xl p-6 md:p-8 max-w-md w-full shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display text-xl text-sugan-brown flex items-center gap-2">
                <Info className="w-5 h-5 text-sugan-gold" />
                Important
              </h3>
              <button
                onClick={() => setShowPayUWarning(false)}
                className="text-sugan-brown/40 hover:text-sugan-brown"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <p className="font-body text-sugan-brown/80">
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
                  className="w-full h-12 bg-sugan-brown hover:bg-sugan-brown/90 font-body"
                >
                  Continue to PayU
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowPayUWarning(false)}
                  className="w-full h-12 font-body border-sugan-brown/20"
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
