import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Package, Heart, LogOut, User,
  ShoppingBag, Clock, Truck, CheckCircle 
} from 'lucide-react';
import { db } from '@/lib/firebase';
import { collection, query, where, onSnapshot, doc, deleteDoc } from 'firebase/firestore';
import type { Product } from '@/types';

interface Order {
  id: string;
  items: any[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  createdAt: any;
  shippingAddress: any;
}

interface WishlistItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  image: string;
}

export default function Account() {
  const navigate = useNavigate();
  const { user, userData, logout, isAdmin } = useAuth();
  const { addToCart } = useCart();
  const [orders, setOrders] = useState<Order[]>([]);
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
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
      setOrders(ordersData.sort((a, b) => b.createdAt?.seconds - a.createdAt?.seconds));
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

  if (loading) {
    return (
      <div className="min-h-screen bg-sugan-cream flex items-center justify-center">
        <div className="text-sugan-brown font-body">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sugan-cream pt-24 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="font-display text-3xl text-sugan-brown">
              My Account
            </h1>
            <p className="font-body text-sugan-brown/60 mt-1">
              Welcome back, {userData?.name || 'User'}
            </p>
          </div>
          <div className="flex gap-3">
            {isAdmin && (
              <Button
                onClick={() => navigate('/admin')}
                className="bg-sugan-gold hover:bg-sugan-gold/90 font-body"
              >
                Admin Dashboard
              </Button>
            )}
            <Button
              variant="outline"
              onClick={handleLogout}
              className="font-body border-sugan-brown/20"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        <Tabs defaultValue="orders" className="space-y-6">
          <TabsList className="bg-white border border-sugan-brown/10 p-1">
            <TabsTrigger value="orders" className="font-body data-[state=active]:bg-sugan-brown data-[state=active]:text-white">
              <Package className="w-4 h-4 mr-2" />
              Orders
            </TabsTrigger>
            <TabsTrigger value="wishlist" className="font-body data-[state=active]:bg-sugan-brown data-[state=active]:text-white">
              <Heart className="w-4 h-4 mr-2" />
              Wishlist
            </TabsTrigger>
            <TabsTrigger value="profile" className="font-body data-[state=active]:bg-sugan-brown data-[state=active]:text-white">
              <User className="w-4 h-4 mr-2" />
              Profile
            </TabsTrigger>
          </TabsList>

          {/* Orders Tab */}
          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle className="font-display text-xl text-sugan-brown">
                  My Orders ({orders.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {orders.length === 0 ? (
                  <div className="text-center py-12">
                    <Package className="w-12 h-12 text-sugan-brown/20 mx-auto mb-4" />
                    <h3 className="font-display text-lg text-sugan-brown mb-2">
                      No orders yet
                    </h3>
                    <p className="font-body text-sugan-brown/60 mb-4">
                      Start shopping to see your orders here
                    </p>
                    <Link to="/shop">
                      <Button className="bg-sugan-brown hover:bg-sugan-brown/90 font-body">
                        Browse Products
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <Card key={order.id} className="border-sugan-brown/10">
                        <CardContent className="p-4">
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div>
                              <p className="font-body text-sm text-sugan-brown/60">
                                Order #{order.id.slice(-8).toUpperCase()}
                              </p>
                              <p className="font-body text-sugan-brown">
                                {order.items?.length} items • ₹{order.total?.toLocaleString()}
                              </p>
                              <p className="font-body text-xs text-sugan-brown/40 mt-1">
                                {order.createdAt?.toDate().toLocaleDateString('en-IN', {
                                  day: 'numeric',
                                  month: 'long',
                                  year: 'numeric'
                                })}
                              </p>
                            </div>
                            <Badge className={`${getStatusColor(order.status)} font-body capitalize w-fit`}>
                              <span className="flex items-center gap-1">
                                {getStatusIcon(order.status)}
                                {order.status}
                              </span>
                            </Badge>
                          </div>
                          {order.status === 'shipped' && (
                            <div className="mt-3 pt-3 border-t border-sugan-brown/10">
                              <Button 
                                variant="outline" 
                                size="sm"
                                className="font-body text-xs"
                                onClick={() => navigate(`/track/${order.id}`)}
                              >
                                <Truck className="w-3 h-3 mr-1" />
                                Track Order
                              </Button>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Wishlist Tab */}
          <TabsContent value="wishlist">
            <Card>
              <CardHeader>
                <CardTitle className="font-display text-xl text-sugan-brown">
                  My Wishlist ({wishlist.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {wishlist.length === 0 ? (
                  <div className="text-center py-12">
                    <Heart className="w-12 h-12 text-sugan-brown/20 mx-auto mb-4" />
                    <h3 className="font-display text-lg text-sugan-brown mb-2">
                      Your wishlist is empty
                    </h3>
                    <p className="font-body text-sugan-brown/60 mb-4">
                      Save products you love for later
                    </p>
                    <Link to="/shop">
                      <Button className="bg-sugan-brown hover:bg-sugan-brown/90 font-body">
                        Browse Products
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {wishlist.map((item) => (
                      <Card key={item.id} className="border-sugan-brown/10">
                        <CardContent className="p-4">
                          <div className="flex gap-4">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-20 h-20 object-cover rounded-lg"
                            />
                            <div className="flex-1">
                              <h4 className="font-body font-medium text-sugan-brown">
                                {item.name}
                              </h4>
                              <p className="font-body text-sugan-gold font-semibold">
                                ₹{item.price.toLocaleString()}
                              </p>
                              <div className="flex gap-2 mt-2">
                                <Button
                                  size="sm"
                                  className="bg-sugan-brown hover:bg-sugan-brown/90 font-body text-xs"
                                  onClick={() => moveToCart(item)}
                                >
                                  <ShoppingBag className="w-3 h-3 mr-1" />
                                  Add to Cart
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="font-body text-xs border-red-200 text-red-600 hover:bg-red-50"
                                  onClick={() => removeFromWishlist(item.id)}
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
                <CardTitle className="font-display text-xl text-sugan-brown">
                  Profile Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="font-body text-sm text-sugan-brown/60">Full Name</label>
                    <p className="font-body text-sugan-brown font-medium">{userData?.name || 'Not set'}</p>
                  </div>
                  <div>
                    <label className="font-body text-sm text-sugan-brown/60">Email</label>
                    <p className="font-body text-sugan-brown font-medium">{userData?.email}</p>
                  </div>
                  <div>
                    <label className="font-body text-sm text-sugan-brown/60">Account Type</label>
                    <p className="font-body text-sugan-brown font-medium">
                      {isAdmin ? 'Administrator' : 'Customer'}
                    </p>
                  </div>
                  <div>
                    <label className="font-body text-sm text-sugan-brown/60">Member Since</label>
                    <p className="font-body text-sugan-brown font-medium">
                      {userData?.createdAt ? new Date().toLocaleDateString('en-IN') : 'N/A'}
                    </p>
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
