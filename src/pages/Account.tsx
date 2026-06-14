import { useEffect, useState } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Package, Heart, LogOut, User,
  ShoppingBag, Clock, Truck, CheckCircle, RefreshCw,
  ChevronDown, ChevronUp, AlertTriangle, MessageCircle
} from 'lucide-react';
import { db } from '@/lib/firebase';
import { collection, query, where, onSnapshot, doc, deleteDoc } from 'firebase/firestore';
import type { Product, CartItem, ShippingAddress, FirestoreTimestamp } from '@/types';

interface Order {
  id: string;
  items: CartItem[];
  total: number;
  subtotal?: number;
  discount?: number;
  couponCode?: string | null;
  shipping?: number;
  codCharge?: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  paymentStatus?: string;
  paymentMethod?: string;
  txnid?: string | null;
  createdAt: FirestoreTimestamp;
  shippedAt?: FirestoreTimestamp;
  deliveredAt?: FirestoreTimestamp;
  shippingAddress: ShippingAddress;
}

interface WishlistItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  image: string;
}

// Calculate days remaining for return (7 days from delivery or ship date)
const getReturnDaysRemaining = (order: Order): number | null => {
  const startDate = order.deliveredAt?.toDate?.() || order.shippedAt?.toDate?.() || order.createdAt?.toDate?.();
  if (!startDate) return null;
  
  const returnDeadline = new Date(startDate);
  returnDeadline.setDate(returnDeadline.getDate() + 7);
  
  const today = new Date();
  const diffTime = returnDeadline.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return diffDays > 0 ? diffDays : 0;
};

// Check if return is eligible (within 7 days)
const isReturnEligible = (order: Order): boolean => {
  const daysRemaining = getReturnDaysRemaining(order);
  return daysRemaining !== null && daysRemaining > 0 && order.status !== 'pending';
};

export default function Account() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user, userData, logout, isAdmin, isAffiliate } = useAuth();
  const { addToCart } = useCart();
  const [orders, setOrders] = useState<Order[]>([]);
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [orderNotification, setOrderNotification] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    // Show order notification from query params
    const orderId = searchParams.get('order');
    const isCod = searchParams.get('cod') === 'true';
    if (orderId) {
      setOrderNotification(isCod ? 'cod' : 'success');
      setExpandedOrder(orderId);
      // Clear query params without reloading
      window.history.replaceState({}, '', '/account');
    }

    // Fetch orders
    const ordersQuery = query(
      collection(db, 'orders'),
      where('userId', '==', user.uid)
    );

    const unsubscribeOrders = onSnapshot(ordersQuery, (snapshot) => {
      const ordersData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Order[];
      setOrders(ordersData.sort((a, b) => (b.createdAt?.seconds ?? 0) - (a.createdAt?.seconds ?? 0)));
      setLoading(false);
    });

    // Fetch wishlist
    const wishlistQuery = query(
      collection(db, 'wishlists'),
      where('userId', '==', user.uid)
    );

    const unsubscribeWishlist = onSnapshot(wishlistQuery, (snapshot) => {
      const wishlistData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as WishlistItem[];
      setWishlist(wishlistData);
    });

    return () => {
      unsubscribeOrders();
      unsubscribeWishlist();
    };
  }, [user, navigate]);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const removeFromWishlist = async (id: string) => {
    await deleteDoc(doc(db, 'wishlists', id));
  };

  const moveToCart = (item: WishlistItem) => {
    addToCart({
      id: item.productId,
      name: item.name,
      price: item.price,
      image: item.image
    } as Product);
    removeFromWishlist(item.id);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="w-4 h-4" />;
      case 'shipped':
        return <Truck className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-700';
      case 'shipped':
        return 'bg-blue-100 text-blue-700';
      case 'processing':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const toggleOrderExpand = (orderId: string) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-sugan-bone flex items-center justify-center">
        <div className="text-sugan-ink font-body">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sugan-bone pt-24 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="font-display text-3xl text-sugan-ink">
              My Account
            </h1>
            <p className="font-body text-sugan-ink/60 mt-1">
              Welcome back, {userData?.name || 'User'}
            </p>
          </div>
          <div className="flex gap-3 flex-wrap">
            {isAdmin && (
              <Button
                onClick={() => navigate('/admin')}
                className="bg-sugan-gold hover:bg-sugan-gold/90 font-body"
              >
                Admin Dashboard
              </Button>
            )}
            {isAffiliate && (
              <Button
                onClick={() => navigate('/affiliate')}
                className="bg-sugan-ink hover:bg-sugan-ink/90 font-body"
              >
                Affiliate Dashboard
              </Button>
            )}
            <Button
              variant="outline"
              onClick={handleLogout}
              className="font-body border-sugan-ink/20"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        <Tabs defaultValue="orders" className="space-y-6">
          <TabsList className="bg-white border border-sugan-ink/10 p-1">
            <TabsTrigger value="orders" className="font-body data-[state=active]:bg-sugan-ink data-[state=active]:text-white">
              <Package className="w-4 h-4 mr-2" />
              Orders
            </TabsTrigger>
            <TabsTrigger value="wishlist" className="font-body data-[state=active]:bg-sugan-ink data-[state=active]:text-white">
              <Heart className="w-4 h-4 mr-2" />
              Wishlist
            </TabsTrigger>
            <TabsTrigger value="profile" className="font-body data-[state=active]:bg-sugan-ink data-[state=active]:text-white">
              <User className="w-4 h-4 mr-2" />
              Profile
            </TabsTrigger>
          </TabsList>

          {/* Orders Tab */}
          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle className="font-display text-xl text-sugan-ink">
                  My Orders ({orders.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {orderNotification && (
                  <div className={`p-4 rounded-lg mb-4 ${orderNotification === 'cod' ? 'bg-blue-50 border border-blue-200' : 'bg-green-50 border border-green-200'}`}>
                    <p className={`font-body text-sm font-medium ${orderNotification === 'cod' ? 'text-blue-800' : 'text-green-800'}`}>
                      {orderNotification === 'cod' 
                        ? '✅ Order placed successfully! Cash on Delivery selected.' 
                        : '✅ Order placed successfully! Payment confirmed.'}
                    </p>
                  </div>
                )}
                {orders.length === 0 ? (
                  <div className="text-center py-12">
                    <Package className="w-12 h-12 text-sugan-ink/20 mx-auto mb-4" />
                    <h3 className="font-display text-lg text-sugan-ink mb-2">
                      No orders yet
                    </h3>
                    <p className="font-body text-sugan-ink/60 mb-4">
                      Start shopping to see your orders here
                    </p>
                    <Link to="/shop">
                      <Button className="bg-sugan-ink hover:bg-sugan-ink/90 font-body">
                        Browse Products
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order) => {
                      const daysRemaining = getReturnDaysRemaining(order);
                      const returnEligible = isReturnEligible(order);
                      const isExpanded = expandedOrder === order.id;
                      
                      return (
                        <Card key={order.id} className="border-sugan-ink/10">
                          <CardContent className="p-4">
                            {/* Order Header */}
                            <div 
                              className="flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer"
                              onClick={() => toggleOrderExpand(order.id)}
                            >
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <p className="font-body text-sm text-sugan-ink/60">
                                    Order #{order.id.slice(-8).toUpperCase()}
                                  </p>
                                  {isExpanded ? <ChevronUp className="w-4 h-4 text-sugan-ink/40" /> : <ChevronDown className="w-4 h-4 text-sugan-ink/40" />}
                                </div>
                                <p className="font-body text-sugan-ink">
                                  {order.items?.length} items • ₹{order.total?.toLocaleString()}
                                </p>
                                <p className="font-body text-xs text-sugan-ink/40 mt-1">
                                  {order.createdAt?.toDate?.().toLocaleDateString('en-IN', {
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric'
                                  })}
                                </p>
                              </div>
                              <div className="flex items-center gap-3">
                                <Badge className={`${getStatusColor(order.status)} font-body capitalize w-fit`}>
                                  <span className="flex items-center gap-1">
                                    {getStatusIcon(order.status)}
                                    {order.status}
                                  </span>
                                </Badge>
                              </div>
                            </div>

                            {/* Expanded Order Details */}
                            {isExpanded && (
                              <div className="mt-4 pt-4 border-t border-sugan-ink/10">
                                {/* Order Items with SKUs */}
                                <div className="space-y-3 mb-4">
                                  <h4 className="font-body font-medium text-sugan-ink">Order Items</h4>
                                  {order.items?.map((item, idx) => (
                                    <div key={idx} className="flex items-center gap-3 bg-sugan-bone/50 p-3 rounded-lg">
                                      <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-16 h-16 object-cover rounded-lg"
                                      />
                                      <div className="flex-1">
                                        <p className="font-body text-sm font-medium text-sugan-ink">{item.name}</p>
                                        <p className="text-xs text-sugan-ink/60">
                                          SKU: <span className="font-mono">{item.id}</span>
                                        </p>
                                        <p className="text-xs text-sugan-ink/60">
                                          Qty: {item.quantity} × ₹{item.price?.toLocaleString()}
                                        </p>
                                      </div>
                                      <p className="font-body font-medium text-sugan-ink">
                                        ₹{(item.price * item.quantity)?.toLocaleString()}
                                      </p>
                                    </div>
                                  ))}
                                </div>

                                {/* Order Summary */}
                                <div className="mb-4 p-3 bg-sugan-bone/50 rounded-lg">
                                  <h4 className="font-body font-medium text-sugan-ink mb-2">Order Summary</h4>
                                  <div className="space-y-1">
                                    <div className="flex justify-between font-body text-sm text-sugan-ink/60">
                                      <span>Subtotal</span>
                                      <span>₹{(order.subtotal ?? order.total)?.toLocaleString()}</span>
                                    </div>
                                    {(order.discount ?? 0) > 0 && (
                                      <div className="flex justify-between font-body text-sm text-green-600">
                                        <span>Discount {order.couponCode ? `(${order.couponCode})` : ''}</span>
                                        <span>-₹{order.discount?.toLocaleString()}</span>
                                      </div>
                                    )}
                                    <div className="flex justify-between font-body text-sm text-sugan-ink/60">
                                      <span>Shipping</span>
                                      <span>{order.shipping === 0 ? 'FREE' : `₹${order.shipping}`}</span>
                                    </div>
                                    {(order.codCharge ?? 0) > 0 && (
                                      <div className="flex justify-between font-body text-sm text-sugan-ink/60">
                                        <span>COD Fee</span>
                                        <span>₹{order.codCharge}</span>
                                      </div>
                                    )}
                                    <div className="flex justify-between font-body text-sm font-semibold text-sugan-ink pt-1 border-t border-sugan-ink/10">
                                      <span>Total</span>
                                      <span>₹{order.total?.toLocaleString()}</span>
                                    </div>
                                    {order.paymentStatus && (
                                      <div className="flex justify-between font-body text-sm text-sugan-ink/60 pt-1">
                                        <span>Payment</span>
                                        <span className="capitalize">{order.paymentMethod} • {order.paymentStatus}</span>
                                      </div>
                                    )}
                                    {order.txnid && (
                                      <div className="flex justify-between font-body text-sm text-sugan-ink/60">
                                        <span>Transaction ID</span>
                                        <span className="font-mono text-xs">{order.txnid}</span>
                                      </div>
                                    )}
                                  </div>
                                </div>

                                {/* Shipping Address */}
                                {order.shippingAddress && (
                                  <div className="mb-4 p-3 bg-sugan-bone/50 rounded-lg">
                                    <h4 className="font-body font-medium text-sugan-ink mb-2">Shipping Address</h4>
                                    <p className="font-body text-sm text-sugan-ink/70">
                                      {order.shippingAddress.fullName}<br />
                                      {order.shippingAddress.addressLine1}<br />
                                      {order.shippingAddress.addressLine2 && <>{order.shippingAddress.addressLine2}<br /></>}
                                      {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}<br />
                                      Phone: {order.shippingAddress.phone}
                                    </p>
                                  </div>
                                )}

                                {/* Pending Payment Banner */}
                                {order.paymentStatus === 'pending' && (
                                  <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                                    <p className="font-body text-sm text-amber-800 font-medium flex items-center gap-2">
                                      <Clock className="w-4 h-4" />
                                      Payment Pending
                                    </p>
                                    <p className="font-body text-xs text-amber-700 mt-1">
                                      If you completed payment on PayU, it may take a few minutes to reflect here. Please refresh this page or contact us on WhatsApp for instant confirmation.
                                    </p>
                                  </div>
                                )}

                                {/* Action Buttons */}
                                <div className="flex flex-wrap gap-3">
                                  <a
                                    href={`https://wa.me/916367677255?text=Hi, I have a question about my order. Order ID: ${order.id.slice(-8).toUpperCase()}%0AName: ${order.shippingAddress?.fullName || ''}%0AEmail: ${user?.email}%0APayment Status: ${order.paymentStatus || 'N/A'}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    <Button 
                                      variant="outline" 
                                      size="sm"
                                      className="font-body text-xs border-green-600 text-green-700 hover:bg-green-50"
                                    >
                                      <MessageCircle className="w-3 h-3 mr-1" />
                                      WhatsApp Us
                                    </Button>
                                  </a>
                                  {order.status === 'shipped' && (
                                    <Button 
                                      variant="outline" 
                                      size="sm"
                                      className="font-body text-xs"
                                      onClick={() => navigate(`/track/${order.id}`)}
                                    >
                                      <Truck className="w-3 h-3 mr-1" />
                                      Track Order
                                    </Button>
                                  )}

                                  {/* Return Button */}
                                  {returnEligible && (
                                    <Dialog>
                                      <DialogTrigger asChild>
                                        <Button 
                                          variant="outline" 
                                          size="sm"
                                          className="font-body text-xs border-amber-500 text-amber-700 hover:bg-amber-50"
                                        >
                                          <RefreshCw className="w-3 h-3 mr-1" />
                                          Return Item ({daysRemaining} days left)
                                        </Button>
                                      </DialogTrigger>
                                      <DialogContent className="max-w-md">
                                        <DialogHeader>
                                          <DialogTitle className="font-display text-xl text-sugan-ink">
                                            Return Request
                                          </DialogTitle>
                                        </DialogHeader>
                                        <div className="space-y-4">
                                          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                                            <div className="flex items-start gap-2">
                                              <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                                              <div>
                                                <p className="font-body text-sm text-amber-800 font-medium">
                                                  Return Processing Fee
                                                </p>
                                                <p className="font-body text-sm text-amber-700">
                                                  A fee of <strong>₹100</strong> will be deducted from your refund amount.
                                                </p>
                                              </div>
                                            </div>
                                          </div>
                                          
                                          <div className="space-y-2">
                                            <p className="font-body text-sm text-sugan-ink/70">
                                              <strong>Return Window:</strong> {daysRemaining} days remaining
                                            </p>
                                            <p className="font-body text-sm text-sugan-ink/70">
                                              <strong>Refund Timeline:</strong> 7-10 business days after we receive the item
                                            </p>
                                          </div>

                                          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                                            <p className="font-body text-xs text-red-700">
                                              <strong>Note:</strong> For damaged/defective items, you must provide an unboxing video as proof.
                                            </p>
                                          </div>

                                          <a 
                                            href={`mailto:contact@sugan.shop?subject=Return Request - Order ${order.id.slice(-8).toUpperCase()}&body=Order ID: ${order.id}%0AName: ${userData?.name || ''}%0AEmail: ${user?.email}%0A%0AReason for return:%0A`}
                                          >
                                            <Button className="w-full bg-sugan-ink hover:bg-sugan-ink/90 font-body">
                                              <RefreshCw className="w-4 h-4 mr-2" />
                                              Email Return Request
                                            </Button>
                                          </a>
                                        </div>
                                      </DialogContent>
                                    </Dialog>
                                  )}

                                  {/* Return Window Closed */}
                                  {order.status === 'delivered' && !returnEligible && (
                                    <Badge variant="outline" className="text-gray-500 border-gray-300">
                                      Return window closed
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Wishlist Tab */}
          <TabsContent value="wishlist">
            <Card>
              <CardHeader>
                <CardTitle className="font-display text-xl text-sugan-ink">
                  My Wishlist ({wishlist.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {wishlist.length === 0 ? (
                  <div className="text-center py-12">
                    <Heart className="w-12 h-12 text-sugan-ink/20 mx-auto mb-4" />
                    <h3 className="font-display text-lg text-sugan-ink mb-2">
                      Your wishlist is empty
                    </h3>
                    <p className="font-body text-sugan-ink/60 mb-4">
                      Save products you love for later
                    </p>
                    <Link to="/shop">
                      <Button className="bg-sugan-ink hover:bg-sugan-ink/90 font-body">
                        Browse Products
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {wishlist.map((item) => (
                      <Card key={item.id} className="border-sugan-ink/10">
                        <CardContent className="p-4">
                          <div className="flex gap-4">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-20 h-20 object-cover rounded-lg"
                              loading="lazy"
                            />
                            <div className="flex-1">
                              <h4 className="font-body font-medium text-sugan-ink">
                                {item.name}
                              </h4>
                              <p className="font-body text-sugan-gold font-semibold">
                                ₹{item.price.toLocaleString()}
                              </p>
                              <div className="flex gap-2 mt-2">
                                <Button
                                  size="sm"
                                  onClick={() => moveToCart(item)}
                                  className="bg-sugan-ink hover:bg-sugan-ink/90 font-body text-xs"
                                >
                                  <ShoppingBag className="w-3 h-3 mr-1" />
                                  Add to Cart
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => removeFromWishlist(item.id)}
                                  className="font-body text-xs border-sugan-ink/20"
                                >
                                  Remove
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle className="font-display text-xl text-sugan-ink">
                  Profile Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-sugan-bone/50 rounded-lg">
                      <p className="text-sm text-sugan-ink/60 font-body mb-1">Name</p>
                      <p className="font-body text-sugan-ink">{userData?.name || 'Not set'}</p>
                    </div>
                    <div className="p-4 bg-sugan-bone/50 rounded-lg">
                      <p className="text-sm text-sugan-ink/60 font-body mb-1">Email</p>
                      <p className="font-body text-sugan-ink">{user?.email}</p>
                    </div>
                    <div className="p-4 bg-sugan-bone/50 rounded-lg">
                      <p className="text-sm text-sugan-ink/60 font-body mb-1">Phone</p>
                      <p className="font-body text-sugan-ink">{(userData as { phone?: string })?.phone || 'Not set'}</p>
                    </div>
                    <div className="p-4 bg-sugan-bone/50 rounded-lg">
                      <p className="text-sm text-sugan-ink/60 font-body mb-1">Member Since</p>
                      <p className="font-body text-sugan-ink">
                        {(() => {
                          const created = (userData as { createdAt?: FirestoreTimestamp })?.createdAt;
                          return created?.toDate?.() ? created.toDate!().toLocaleDateString('en-IN', {
                            month: 'long',
                            year: 'numeric'
                          }) : 'N/A';
                        })()}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
