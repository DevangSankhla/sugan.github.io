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
  calculateShippingRates, 
  checkPincodeServiceability,
  createShiprocketOrder,
  updateOrderShipping
} from '@/lib/shiprocket';
import { MapPin, Phone, User, Home, Building, Navigation, CreditCard, Banknote, Truck, Shield, AlertCircle, Star, Package, Clock } from 'lucide-react';

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

interface ShippingRate {
  courier_name: string;
  rate: number;
  cod: number;
  etd: string;
  rating: number;
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
  const [shippingRates, setShippingRates] = useState<ShippingRate[]>([]);
  const [selectedCourier, setSelectedCourier] = useState<string>('');
  const [isLoadingRates, setIsLoadingRates] = useState(false);
  const [codAvailable, setCodAvailable] = useState(true);

  // Redirect if not logged in or cart is empty
  if (!user) {
    navigate('/login?redirect=/checkout');
    return null;
  }

  if (items.length === 0) {
    navigate('/shop');
    return null;
  }

  // Calculate total weight (mock calculation)
  const totalWeight = items.reduce((sum, item) => sum + (item.quantity * 500), 0);

  // Validate pincode and fetch shipping rates
  useEffect(() => {
    const fetchShippingData = async () => {
      if (address.pincode.length === 6) {
        const isValid = /^[1-9][0-9]{5}$/.test(address.pincode);
        setIsPincodeValid(isValid);
        setPincodeError(isValid ? '' : 'Invalid pincode');
        
        if (isValid) {
          setIsLoadingRates(true);
          try {
            // Check COD availability
            const serviceability = await checkPincodeServiceability(address.pincode);
            setCodAvailable(serviceability.cod);
            
            // Fetch shipping rates (using Jodhpur pincode as pickup)
            const rates = await calculateShippingRates('342012', address.pincode, totalWeight, paymentMethod === 'cod');
            setShippingRates(rates);
            if (rates.length > 0 && !selectedCourier) {
              setSelectedCourier(rates[0].courier_name);
            }
          } catch (error) {
            console.error('Error fetching shipping rates:', error);
          } finally {
            setIsLoadingRates(false);
          }
        }
      } else {
        setIsPincodeValid(false);
        setPincodeError('');
        setShippingRates([]);
      }
    };

    fetchShippingData();
  }, [address.pincode, totalWeight, paymentMethod]);

  // Get selected shipping rate
  const selectedRate = shippingRates.find(r => r.courier_name === selectedCourier);
  const shippingCost = totalPrice > 1999 ? 0 : (selectedRate?.rate || 99);
  const codCharge = paymentMethod === 'cod' ? (selectedRate?.cod || 50) : 0;
  const finalTotal = totalPrice + shippingCost + codCharge;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
        shipping: shippingCost,
        shippingCourier: selectedCourier,
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
      if (selectedCourier) {
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
              courier: selectedCourier,
              awb: shiprocketResult.awb || '',
              shipmentId: shiprocketResult.shipmentId || '',
              label: shiprocketResult.label,
            });
          }
        } catch (shipError) {
          console.error('Shiprocket order creation error:', shipError);
          // Continue with order even if shiprocket fails - can be created later
        }
      }

      if (paymentMethod === 'cod') {
        // Process Cash on Delivery
        await processCOD(orderId);
        clearCart();
        navigate(`/account?order=${orderId}&cod=true`);
      } else {
        // Process PayU Payment
        const payuFormData = preparePayUForm({
          orderId,
          userId: user.uid,
          amount: finalTotal,
          customerName: address.fullName,
          customerEmail: user.email || '',
          customerPhone: address.phone,
          productInfo: `Order from Sugan (${items.length} items)`
        });

        // Store order ID in session storage for retrieval after payment
        sessionStorage.setItem('pendingOrderId', orderId);
        
        // Submit to PayU
        submitPayUPayment(payuFormData);
        // Note: Page will redirect to PayU, no need to clear cart yet
      }
    } catch (error) {
      console.error('Error creating order:', error);
      alert('Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = address.fullName && address.phone && address.addressLine1 && 
                      address.city && address.state && isPincodeValid && selectedCourier;

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

            {/* Shipping Method */}
            {shippingRates.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="font-display text-xl text-sugan-brown flex items-center gap-2">
                    <Package className="w-5 h-5 text-sugan-gold" />
                    Shipping Method
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {isLoadingRates ? (
                    <div className="flex items-center justify-center py-8">
                      <div className="w-8 h-8 border-4 border-sugan-gold border-t-transparent rounded-full animate-spin" />
                      <span className="ml-3 text-sugan-brown/60 font-body">Calculating shipping rates...</span>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {shippingRates.map((rate) => (
                        <button
                          key={rate.courier_name}
                          type="button"
                          onClick={() => setSelectedCourier(rate.courier_name)}
                          className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                            selectedCourier === rate.courier_name
                              ? 'border-sugan-gold bg-sugan-gold/5'
                              : 'border-sugan-brown/10 hover:border-sugan-brown/30'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                selectedCourier === rate.courier_name ? 'border-sugan-gold' : 'border-sugan-brown/30'
                              }`}>
                                {selectedCourier === rate.courier_name && <div className="w-2.5 h-2.5 bg-sugan-gold rounded-full" />}
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="font-body font-medium text-sugan-brown">{rate.courier_name}</span>
                                  <div className="flex items-center gap-1">
                                    <Star className="w-3 h-3 text-sugan-gold fill-sugan-gold" />
                                    <span className="text-xs text-sugan-brown/60">{rate.rating}</span>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-sugan-brown/60 font-body mt-1">
                                  <Clock className="w-3 h-3" />
                                  <span>Delivery: {rate.etd}</span>
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <span className="font-display text-lg text-sugan-brown">
                                ₹{totalPrice > 1999 ? 'FREE' : rate.rate}
                              </span>
                              {paymentMethod === 'cod' && rate.cod > 0 && (
                                <p className="text-xs text-sugan-brown/50 font-body">+ ₹{rate.cod} COD</p>
                              )}
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                  
                  {totalPrice > 1999 && (
                    <div className="mt-4 p-3 bg-green-50 rounded-lg">
                      <p className="text-sm text-green-700 font-body flex items-center gap-2">
                        <Truck className="w-4 h-4" />
                        Free shipping on orders above ₹1999!
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
            )}

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

                  {/* Totals */}
                  <div className="border-t border-sugan-brown/10 pt-4 space-y-2">
                    <div className="flex justify-between font-body text-sugan-brown/60">
                      <span>Subtotal</span>
                      <span>₹{totalPrice.toLocaleString()}</span>
                    </div>
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
    </div>
  );
}
