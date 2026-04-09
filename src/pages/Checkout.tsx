import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { MapPin, Phone, User, Home, Building, Navigation } from 'lucide-react';

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

  // Redirect if not logged in or cart is empty
  if (!user) {
    navigate('/login?redirect=/checkout');
    return null;
  }

  if (items.length === 0) {
    navigate('/shop');
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Create order in Firestore
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
        total: totalPrice,
        status: 'pending',
        shippingAddress: address,
        createdAt: serverTimestamp()
      };

      const orderRef = await addDoc(collection(db, 'orders'), orderData);
      
      // Clear cart
      clearCart();
      
      // Redirect to order confirmation
      navigate(`/account?order=${orderRef.id}`);
    } catch (error) {
      console.error('Error creating order:', error);
      alert('Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const shippingCost = totalPrice > 1999 ? 0 : 99;
  const finalTotal = totalPrice + shippingCost;

  return (
    <div className="min-h-screen bg-sugan-cream py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-display text-3xl text-sugan-brown mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Shipping Form */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="font-display text-xl text-sugan-brown">
                  Shipping Address
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
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
                          className="pl-10 font-body"
                          placeholder="6-digit PIN"
                          required
                          pattern="[0-9]{6}"
                        />
                      </div>
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

                  <Button
                    type="submit"
                    className="w-full h-12 bg-sugan-brown hover:bg-sugan-brown/90 font-body mt-6"
                    disabled={loading}
                  >
                    {loading ? 'Placing Order...' : `Place Order • ₹${finalTotal.toLocaleString()}`}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="font-display text-xl text-sugan-brown">
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-body text-sugan-brown font-medium">{item.name}</h4>
                        <p className="text-sm text-sugan-brown/60 font-body">
                          Qty: {item.quantity}
                        </p>
                        <p className="text-sugan-gold font-body">
                          ₹{(item.price * item.quantity).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}

                  <div className="border-t border-sugan-brown/10 pt-4 space-y-2">
                    <div className="flex justify-between font-body text-sugan-brown/60">
                      <span>Subtotal</span>
                      <span>₹{totalPrice.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between font-body text-sugan-brown/60">
                      <span>Shipping</span>
                      <span>{shippingCost === 0 ? 'FREE' : `₹${shippingCost}`}</span>
                    </div>
                    <div className="flex justify-between font-body text-sugan-brown font-semibold text-lg pt-2 border-t border-sugan-brown/10">
                      <span>Total</span>
                      <span>₹{finalTotal.toLocaleString()}</span>
                    </div>
                  </div>

                  {shippingCost === 0 && (
                    <p className="text-green-600 text-sm font-body text-center">
                      🎉 You got FREE shipping!
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
