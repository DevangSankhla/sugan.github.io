import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Package, Users, DollarSign, ShoppingCart, Search, Edit, Save, X, User, Mail, MessageSquare,
  Eye, ArrowRight, MapPin, Phone, CreditCard, Truck, Calendar, Hash, Copy, Check
} from 'lucide-react';
import { db } from '@/lib/firebase';
import { collection, query, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import { allProducts } from '@/data/rooms';
import type { Product } from '@/types';

interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

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

interface ShippingDetails {
  courier: string;
  awb: string;
  shipmentId: string;
  label?: string;
  estimatedDelivery?: string;
}

interface Order {
  id: string;
  userId: string;
  userEmail: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  shippingCourier: string;
  codCharge: number;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  paymentStatus: string;
  paymentMethod: string;
  shippingAddress: ShippingAddress;
  txnid: string | null;
  createdAt: any;
  updatedAt: any;
  shippingDetails?: ShippingDetails;
}

interface UserData {
  uid: string;
  email: string;
  name: string;
  isAdmin: boolean;
  createdAt: any;
}

interface DashboardStats {
  totalOrders: number;
  totalRevenue: number;
  totalProducts: number;
  totalUsers: number;
  totalMessages: number;
}

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subject?: string;
  message: string;
  type: 'general_contact' | 'bulk_order';
  status: 'new' | 'read' | 'replied';
  createdAt: any;
  orderType?: string;
  quantity?: string;
}

export default function Admin() {
  const navigate = useNavigate();
  const { isAdmin, user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>(allProducts);
  const [users, setUsers] = useState<UserData[]>([]);
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [stats, setStats] = useState<DashboardStats>({
    totalOrders: 0,
    totalRevenue: 0,
    totalProducts: allProducts.length,
    totalUsers: 0,
    totalMessages: 0
  });
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editingUser, setEditingUser] = useState<UserData | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Redirect if not admin
  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    if (!isAdmin) {
      navigate('/account');
      return;
    }
  }, [user, isAdmin, navigate]);

  // Fetch data from Firestore
  useEffect(() => {
    if (!isAdmin) {
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        // Fetch orders
        const ordersQuery = query(collection(db, 'orders'));
        const unsubscribeOrders = onSnapshot(ordersQuery, (snapshot) => {
          const ordersData = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          })) as Order[];
          setOrders(ordersData);
          
          const revenue = ordersData.reduce((sum, order) => sum + (order.total || 0), 0);
          setStats(prev => ({
            ...prev,
            totalOrders: ordersData.length,
            totalRevenue: revenue
          }));
        }, (error) => {
          console.error('Orders error:', error);
        });

        // Fetch users
        const usersQuery = query(collection(db, 'users'));
        const unsubscribeUsers = onSnapshot(usersQuery, (snapshot) => {
          const usersData = snapshot.docs.map(doc => ({
            uid: doc.id,
            ...doc.data()
          })) as UserData[];
          setUsers(usersData);
          setStats(prev => ({
            ...prev,
            totalUsers: usersData.length
          }));
        }, (error) => {
          console.error('Users error:', error);
          // If permission denied, at least show current user
          if (user) {
            setUsers([{
              uid: user.uid,
              email: user.email || '',
              name: user.displayName || 'Current User',
              isAdmin: true,
              createdAt: null
            }]);
          }
        });

        // Fetch contact submissions
        const submissionsQuery = query(collection(db, 'contactSubmissions'));
        const unsubscribeSubmissions = onSnapshot(submissionsQuery, (snapshot) => {
          const submissionsData = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          })) as ContactSubmission[];
          setSubmissions(submissionsData.sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0)));
          setStats(prev => ({
            ...prev,
            totalMessages: submissionsData.length
          }));
        }, (error) => {
          console.error('Submissions error:', error);
        });

        setLoading(false);

        return () => {
          unsubscribeOrders();
          unsubscribeUsers();
          unsubscribeSubmissions();
        };
      } catch (error) {
        console.error('Error fetching admin data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [isAdmin]);

  const updateOrderStatus = async (orderId: string, status: string) => {
    await updateDoc(doc(db, 'orders', orderId), { status });
  };

  const updateSubmissionStatus = async (submissionId: string, status: string) => {
    await updateDoc(doc(db, 'contactSubmissions', submissionId), { status });
  };

  const updateUser = async (userId: string, data: Partial<UserData>) => {
    await updateDoc(doc(db, 'users', userId), data);
    setEditingUser(null);
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

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-700';
      case 'cod_pending':
        return 'bg-orange-100 text-orange-700';
      case 'failed':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const filteredProducts = products.filter(p => 
    p.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.id?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-sugan-cream flex items-center justify-center">
        <div className="text-sugan-brown font-body">Loading admin dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sugan-cream pt-24 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-display text-3xl text-sugan-brown">
              Admin Dashboard
            </h1>
            <p className="font-body text-sugan-brown/60 mt-1">
              Manage your store, orders, and inventory
            </p>
          </div>
          <Button
            onClick={() => navigate('/account')}
            variant="outline"
            className="font-body border-sugan-brown/20"
          >
            Back to Account
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-body text-sm text-sugan-brown/60">Total Orders</p>
                  <p className="font-display text-2xl text-sugan-brown">{stats.totalOrders}</p>
                </div>
                <ShoppingCart className="w-8 h-8 text-sugan-gold" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-body text-sm text-sugan-brown/60">Revenue</p>
                  <p className="font-display text-2xl text-sugan-brown">
                    ₹{(stats.totalRevenue / 1000).toFixed(1)}k
                  </p>
                </div>
                <DollarSign className="w-8 h-8 text-sugan-gold" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-body text-sm text-sugan-brown/60">Products</p>
                  <p className="font-display text-2xl text-sugan-brown">{stats.totalProducts}</p>
                </div>
                <Package className="w-8 h-8 text-sugan-gold" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-body text-sm text-sugan-brown/60">Users</p>
                  <p className="font-display text-2xl text-sugan-brown">{stats.totalUsers}</p>
                </div>
                <Users className="w-8 h-8 text-sugan-gold" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-body text-sm text-sugan-brown/60">Messages</p>
                  <p className="font-display text-2xl text-sugan-brown">{stats.totalMessages}</p>
                </div>
                <Mail className="w-8 h-8 text-sugan-gold" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="products" className="space-y-6">
          <TabsList className="bg-white border border-sugan-brown/10 p-1 flex flex-wrap">
            <TabsTrigger value="products" className="font-body data-[state=active]:bg-sugan-brown data-[state=active]:text-white">
              <Package className="w-4 h-4 mr-2" />
              Products
            </TabsTrigger>
            <TabsTrigger value="orders" className="font-body data-[state=active]:bg-sugan-brown data-[state=active]:text-white">
              <ShoppingCart className="w-4 h-4 mr-2" />
              Orders
            </TabsTrigger>
            <TabsTrigger value="users" className="font-body data-[state=active]:bg-sugan-brown data-[state=active]:text-white">
              <User className="w-4 h-4 mr-2" />
              Users
            </TabsTrigger>
            <TabsTrigger value="messages" className="font-body data-[state=active]:bg-sugan-brown data-[state=active]:text-white">
              <MessageSquare className="w-4 h-4 mr-2" />
              Messages
              {submissions.filter(s => s.status === 'new').length > 0 && (
                <span className="ml-2 bg-sugan-gold text-white text-xs px-2 py-0.5 rounded-full">
                  {submissions.filter(s => s.status === 'new').length}
                </span>
              )}
            </TabsTrigger>
          </TabsList>

          {/* Products Tab */}
          <TabsContent value="products">
            <Card>
              <CardHeader className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <CardTitle className="font-display text-xl text-sugan-brown">
                  Manage Products ({filteredProducts.length})
                </CardTitle>
                <div className="flex gap-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-sugan-brown/40" />
                    <Input
                      placeholder="Search products..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-64 font-body"
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-sugan-brown/10">
                        <th className="text-left py-3 px-4 font-body text-sm text-sugan-brown/60">Product</th>
                        <th className="text-left py-3 px-4 font-body text-sm text-sugan-brown/60">SKU</th>
                        <th className="text-left py-3 px-4 font-body text-sm text-sugan-brown/60">Price</th>
                        <th className="text-left py-3 px-4 font-body text-sm text-sugan-brown/60">Stock</th>
                        <th className="text-right py-3 px-4 font-body text-sm text-sugan-brown/60">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredProducts.map((product) => (
                        <tr key={product.id} className="border-b border-sugan-brown/5 hover:bg-sugan-brown/5">
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-3">
                              <img
                                src={product.image}
                                alt={product.name}
                                className="w-12 h-12 object-cover rounded"
                                loading="lazy"
                              />
                              <div>
                                <p className="font-body text-sugan-brown font-medium">{product.name}</p>
                                <p className="text-xs text-sugan-brown/50">{product.category}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4 font-body text-sm text-sugan-brown/60">
                            {product.id}
                          </td>
                          <td className="py-3 px-4 font-body text-sugan-brown">
                            ₹{product.price?.toLocaleString()}
                          </td>
                          <td className="py-3 px-4">
                            <Badge className={product.inStock ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}>
                              {product.inStock ? 'In Stock' : 'Out of Stock'}
                            </Badge>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="font-body"
                                  onClick={() => setEditingProduct(product)}
                                >
                                  <Edit className="w-3 h-3 mr-1" />
                                  Edit
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                                <DialogHeader>
                                  <DialogTitle className="font-display text-xl">
                                    Edit Product
                                  </DialogTitle>
                                </DialogHeader>
                                {editingProduct?.id === product.id && (
                                  <ProductEditForm
                                    product={product}
                                    onSave={(updatedProduct) => {
                                      // Update local state
                                      setProducts(prev => prev.map(p => 
                                        p.id === updatedProduct.id ? updatedProduct : p
                                      ));
                                      // Also update in Firestore if it exists there
                                      updateDoc(doc(db, 'products', product.id), { ...updatedProduct }).catch(() => {
                                        // Product might not exist in Firestore yet
                                      });
                                      setEditingProduct(null);
                                    }}
                                    onCancel={() => setEditingProduct(null)}
                                  />
                                )}
                              </DialogContent>
                            </Dialog>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders">
            <Card>
              <CardHeader className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <CardTitle className="font-display text-xl text-sugan-brown">
                  All Orders ({orders.length})
                </CardTitle>
                <Button
                  variant="outline"
                  onClick={() => navigate('/admin/orders')}
                  className="font-body border-sugan-brown/20"
                >
                  View Full Records
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {orders.map((order) => (
                    <Card 
                      key={order.id} 
                      className="border-sugan-brown/10 hover:border-sugan-gold/50 cursor-pointer transition-colors"
                      onClick={() => setSelectedOrder(order)}
                    >
                      <CardContent className="p-4">
                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <p className="font-body text-sm text-sugan-brown/60">
                                Order #{order.id.slice(-8).toUpperCase()}
                              </p>
                              <span className="font-body text-xs text-sugan-brown/40">
                                {order.createdAt?.toDate?.().toLocaleDateString('en-IN', {
                                  day: 'numeric',
                                  month: 'short',
                                  year: 'numeric'
                                }) || ''}
                              </span>
                            </div>
                            <p className="font-body text-sugan-brown">
                              {order.userEmail} • {order.items?.length} items
                            </p>
                            <p className="font-body text-xs text-sugan-brown/50 mt-1">
                              {order.shippingAddress?.fullName} • {order.shippingAddress?.phone}
                            </p>
                            <p className="font-body text-xs text-sugan-brown/40 mt-0.5">
                              {order.shippingAddress?.city}, {order.shippingAddress?.state} - {order.shippingAddress?.pincode}
                            </p>
                            {/* Order Items with SKUs */}
                            <div className="mt-2 space-y-1">
                              {order.items?.map((item: any, idx: number) => (
                                <div key={idx} className="flex items-center gap-2 text-sm">
                                  <span className="text-sugan-brown/60">•</span>
                                  <span className="font-body text-sugan-brown">{item.name}</span>
                                  <span className="font-body text-xs text-sugan-brown/40 bg-sugan-brown/5 px-2 py-0.5 rounded">
                                    SKU: {item.id}
                                  </span>
                                  <span className="font-body text-xs text-sugan-brown/60">
                                    x{item.quantity}
                                  </span>
                                </div>
                              ))}
                            </div>
                            <div className="flex items-center gap-2 mt-2">
                              <p className="font-body text-sugan-gold font-semibold">
                                ₹{order.total?.toLocaleString()}
                              </p>
                              <Badge className={`${getPaymentStatusColor(order.paymentStatus)} font-body text-xs capitalize`}>
                                {order.paymentMethod} • {order.paymentStatus}
                              </Badge>
                            </div>
                          </div>
                          <div className="flex flex-col items-end gap-3">
                            <Button
                              size="sm"
                              variant="outline"
                              className="font-body"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedOrder(order);
                              }}
                            >
                              <Eye className="w-3 h-3 mr-1" />
                              View Details
                            </Button>
                            <div className="flex items-center gap-3">
                              <select
                                value={order.status}
                                onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                                className="font-body text-sm border border-sugan-brown/20 rounded-md px-3 py-1 bg-white"
                              >
                                <option value="pending">Pending</option>
                                <option value="processing">Processing</option>
                                <option value="shipped">Shipped</option>
                                <option value="delivered">Delivered</option>
                              </select>
                              <Badge className={`${getStatusColor(order.status)} font-body capitalize`}>
                                {order.status}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  {orders.length === 0 && (
                    <div className="text-center py-12">
                      <ShoppingCart className="w-12 h-12 text-sugan-brown/20 mx-auto mb-4" />
                      <p className="font-body text-sugan-brown/60">No orders yet</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle className="font-display text-xl text-sugan-brown">
                  All Users ({users.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {users.map((userData) => (
                    <Card key={userData.uid} className="border-sugan-brown/10">
                      <CardContent className="p-4">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-sugan-brown/10 rounded-full flex items-center justify-center">
                              <User className="w-5 h-5 text-sugan-brown" />
                            </div>
                            <div>
                              <p className="font-body text-sugan-brown font-medium">
                                {userData.name || 'No Name'}
                              </p>
                              <p className="font-body text-sm text-sugan-brown/60">
                                {userData.email}
                              </p>
                              {userData.isAdmin && (
                                <Badge className="bg-sugan-gold text-white mt-1">Admin</Badge>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="font-body"
                                  onClick={() => setEditingUser(userData)}
                                >
                                  <Edit className="w-3 h-3 mr-1" />
                                  Edit
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-md">
                                <DialogHeader>
                                  <DialogTitle className="font-display text-xl">
                                    Edit User
                                  </DialogTitle>
                                </DialogHeader>
                                {editingUser?.uid === userData.uid && (
                                  <UserEditForm
                                    user={userData}
                                    onSave={(data) => updateUser(userData.uid, data)}
                                    onCancel={() => setEditingUser(null)}
                                  />
                                )}
                              </DialogContent>
                            </Dialog>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  {users.length === 0 && (
                    <div className="text-center py-12">
                      <Users className="w-12 h-12 text-sugan-brown/20 mx-auto mb-4" />
                      <p className="font-body text-sugan-brown/60">No users yet</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Messages Tab */}
          <TabsContent value="messages">
            <Card>
              <CardHeader>
                <CardTitle className="font-display text-xl text-sugan-brown">
                  Contact Submissions ({submissions.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {submissions.map((submission) => (
                    <Card key={submission.id} className={`border-sugan-brown/10 ${submission.status === 'new' ? 'bg-sugan-gold/5' : ''}`}>
                      <CardContent className="p-4">
                        <div className="flex flex-col gap-4">
                          {/* Header */}
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-sugan-brown/10 rounded-full flex items-center justify-center">
                                <Mail className="w-5 h-5 text-sugan-brown" />
                              </div>
                              <div>
                                <p className="font-body text-sugan-brown font-medium">
                                  {submission.name}
                                  {submission.company && (
                                    <span className="text-sugan-brown/60"> ({submission.company})</span>
                                  )}
                                </p>
                                <p className="font-body text-sm text-sugan-brown/60">
                                  {submission.email}
                                  {submission.phone && ` • ${submission.phone}`}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge className={`font-body capitalize ${
                                submission.type === 'bulk_order' 
                                  ? 'bg-sugan-gold text-white' 
                                  : 'bg-blue-100 text-blue-700'
                              }`}>
                                {submission.type === 'bulk_order' ? 'Bulk Order' : 'General'}
                              </Badge>
                              <Badge className={`font-body capitalize ${
                                submission.status === 'new' 
                                  ? 'bg-green-100 text-green-700' 
                                  : submission.status === 'replied'
                                  ? 'bg-blue-100 text-blue-700'
                                  : 'bg-gray-100 text-gray-700'
                              }`}>
                                {submission.status}
                              </Badge>
                            </div>
                          </div>

                          {/* Message Content */}
                          <div className="bg-sugan-cream/50 rounded-lg p-4">
                            {submission.subject && (
                              <p className="font-body font-medium text-sugan-brown mb-2">
                                Subject: {submission.subject}
                              </p>
                            )}
                            {submission.orderType && (
                              <div className="flex gap-4 mb-2 text-sm">
                                <span className="text-sugan-brown/60">
                                  <strong>Type:</strong> {submission.orderType.replace(/_/g, ' ')}
                                </span>
                                {submission.quantity && (
                                  <span className="text-sugan-brown/60">
                                    <strong>Qty:</strong> {submission.quantity}
                                  </span>
                                )}
                              </div>
                            )}
                            <p className="font-body text-sugan-brown/80 whitespace-pre-wrap">
                              {submission.message}
                            </p>
                          </div>

                          {/* Footer */}
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                            <p className="text-xs text-sugan-brown/40 font-body">
                              {submission.createdAt?.toDate?.().toLocaleString('en-IN', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              }) || 'Date not available'}
                            </p>
                            <div className="flex items-center gap-2">
                              <select
                                value={submission.status}
                                onChange={(e) => updateSubmissionStatus(submission.id, e.target.value)}
                                className="px-3 py-1.5 border border-sugan-brown/20 rounded-lg font-body text-sm bg-white focus:outline-none focus:border-sugan-gold"
                              >
                                <option value="new">New</option>
                                <option value="read">Read</option>
                                <option value="replied">Replied</option>
                              </select>
                              <a 
                                href={`mailto:${submission.email}?subject=Re: ${submission.subject || 'Your inquiry'}`}
                                className="px-4 py-1.5 bg-sugan-brown text-sugan-cream rounded-lg font-body text-sm hover:bg-sugan-brown/90 transition-colors"
                              >
                                Reply
                              </a>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  {submissions.length === 0 && (
                    <div className="text-center py-12">
                      <Mail className="w-12 h-12 text-sugan-brown/20 mx-auto mb-4" />
                      <p className="font-body text-sugan-brown/60">No messages yet</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Order Detail Dialog */}
        <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
          <DialogContent className="max-w-5xl max-h-[95vh] overflow-y-auto p-8">
            <DialogHeader>
              <DialogTitle className="font-display text-xl text-sugan-brown">
                Order Details
              </DialogTitle>
            </DialogHeader>
            {selectedOrder && (
              <div className="space-y-8 mt-2">
                {/* Order Header */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-sugan-brown/10">
                  <div>
                    <div className="flex items-center gap-2">
                      <Hash className="w-4 h-4 text-sugan-brown/40" />
                      <span className="font-body text-sm text-sugan-brown/60">
                        Order #{selectedOrder.id.slice(-8).toUpperCase()}
                      </span>
                      <button
                        onClick={() => handleCopy(selectedOrder.id.slice(-8).toUpperCase(), 'orderId')}
                        className="text-sugan-brown/40 hover:text-sugan-brown transition-colors"
                      >
                        {copiedField === 'orderId' ? (
                          <Check className="w-3 h-3 text-green-600" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                      </button>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <Calendar className="w-4 h-4 text-sugan-brown/40" />
                      <span className="font-body text-xs text-sugan-brown/50">
                        {selectedOrder.createdAt?.toDate?.().toLocaleString('en-IN', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        }) || 'Date not available'}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Badge className={`${getStatusColor(selectedOrder.status)} font-body capitalize`}>
                      {selectedOrder.status}
                    </Badge>
                    <Badge className={`${getPaymentStatusColor(selectedOrder.paymentStatus)} font-body capitalize`}>
                      {selectedOrder.paymentStatus}
                    </Badge>
                  </div>
                </div>

                {/* Customer & Address */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="bg-sugan-cream/50 rounded-lg p-5">
                    <h4 className="font-body font-medium text-sugan-brown mb-3 flex items-center gap-2">
                      <User className="w-4 h-4 text-sugan-gold" />
                      Customer
                    </h4>
                    <div className="space-y-2">
                      <p className="font-body text-sm text-sugan-brown">
                        {selectedOrder.shippingAddress?.fullName || 'N/A'}
                      </p>
                      <div className="flex items-center gap-2">
                        <Mail className="w-3 h-3 text-sugan-brown/40" />
                        <span className="font-body text-xs text-sugan-brown/60">
                          {selectedOrder.userEmail || 'N/A'}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-3 h-3 text-sugan-brown/40" />
                        <span className="font-body text-xs text-sugan-brown/60">
                          {selectedOrder.shippingAddress?.phone || 'N/A'}
                        </span>
                      </div>
                      <p className="font-body text-xs text-sugan-brown/40 mt-1">
                        User ID: {selectedOrder.userId}
                      </p>
                    </div>
                  </div>

                  <div className="bg-sugan-cream/50 rounded-lg p-5">
                    <h4 className="font-body font-medium text-sugan-brown mb-4 flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-sugan-gold" />
                      Shipping Address
                    </h4>
                    <div className="space-y-1">
                      <p className="font-body text-sm text-sugan-brown">
                        {selectedOrder.shippingAddress?.addressLine1}
                      </p>
                      {selectedOrder.shippingAddress?.addressLine2 && (
                        <p className="font-body text-sm text-sugan-brown/80">
                          {selectedOrder.shippingAddress.addressLine2}
                        </p>
                      )}
                      <p className="font-body text-sm text-sugan-brown">
                        {selectedOrder.shippingAddress?.city}, {selectedOrder.shippingAddress?.state} - {selectedOrder.shippingAddress?.pincode}
                      </p>
                      {selectedOrder.shippingAddress?.landmark && (
                        <p className="font-body text-xs text-sugan-brown/50">
                          Landmark: {selectedOrder.shippingAddress.landmark}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Payment Info */}
                <div className="bg-sugan-cream/50 rounded-lg p-5">
                  <h4 className="font-body font-medium text-sugan-brown mb-4 flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-sugan-gold" />
                    Payment Information
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    <div>
                      <p className="font-body text-xs text-sugan-brown/50">Method</p>
                      <p className="font-body text-sm text-sugan-brown font-medium">{selectedOrder.paymentMethod}</p>
                    </div>
                    <div>
                      <p className="font-body text-xs text-sugan-brown/50">Status</p>
                      <p className="font-body text-sm text-sugan-brown font-medium capitalize">{selectedOrder.paymentStatus}</p>
                    </div>
                    <div>
                      <p className="font-body text-xs text-sugan-brown/50">Transaction ID</p>
                      <p className="font-body text-sm text-sugan-brown font-medium">{selectedOrder.txnid || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="font-body text-xs text-sugan-brown/50">Total Paid</p>
                      <p className="font-body text-sm text-sugan-brown font-medium">₹{selectedOrder.total?.toLocaleString()}</p>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div>
                  <h4 className="font-body font-medium text-sugan-brown mb-4 flex items-center gap-2">
                    <Package className="w-4 h-4 text-sugan-gold" />
                    Order Items ({selectedOrder.items?.length || 0})
                  </h4>
                  <div className="space-y-4">
                    {selectedOrder.items?.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-4 bg-sugan-cream/50 p-3 rounded-lg">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <p className="font-body text-sm font-medium text-sugan-brown">{item.name}</p>
                          <p className="font-body text-xs text-sugan-brown/50">SKU: {item.productId}</p>
                          <p className="font-body text-xs text-sugan-brown/60">
                            Qty: {item.quantity} × ₹{item.price?.toLocaleString()}
                          </p>
                        </div>
                        <p className="font-body text-sm font-semibold text-sugan-brown">
                          ₹{(item.price * item.quantity).toLocaleString()}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Order Summary */}
                <div className="bg-sugan-cream/50 rounded-lg p-5">
                  <h4 className="font-body font-medium text-sugan-brown mb-4">Order Summary</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between font-body text-sm text-sugan-brown/60">
                      <span>Subtotal</span>
                      <span>₹{selectedOrder.subtotal?.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between font-body text-sm text-sugan-brown/60">
                      <span>Shipping</span>
                      <span>{selectedOrder.shipping === 0 ? 'FREE' : `₹${selectedOrder.shipping}`}</span>
                    </div>
                    {selectedOrder.codCharge > 0 && (
                      <div className="flex justify-between font-body text-sm text-sugan-brown/60">
                        <span>COD Fee</span>
                        <span>₹{selectedOrder.codCharge}</span>
                      </div>
                    )}
                    <div className="flex justify-between font-body text-sm font-semibold text-sugan-brown pt-2 border-t border-sugan-brown/10">
                      <span>Total</span>
                      <span>₹{selectedOrder.total?.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Shipping Details */}
                {selectedOrder.shippingDetails && (
                  <div className="bg-sugan-cream/50 rounded-lg p-5">
                    <h4 className="font-body font-medium text-sugan-brown mb-4 flex items-center gap-2">
                      <Truck className="w-4 h-4 text-sugan-gold" />
                      Shipping Details
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                      <div>
                        <p className="font-body text-xs text-sugan-brown/50">Courier</p>
                        <p className="font-body text-sm text-sugan-brown font-medium">{selectedOrder.shippingDetails.courier}</p>
                      </div>
                      <div>
                        <p className="font-body text-xs text-sugan-brown/50">AWB Number</p>
                        <p className="font-body text-sm text-sugan-brown font-medium">{selectedOrder.shippingDetails.awb || 'N/A'}</p>
                      </div>
                      <div>
                        <p className="font-body text-xs text-sugan-brown/50">Shipment ID</p>
                        <p className="font-body text-sm text-sugan-brown font-medium">{selectedOrder.shippingDetails.shipmentId || 'N/A'}</p>
                      </div>
                      {selectedOrder.shippingDetails.label && (
                        <div>
                          <p className="font-body text-xs text-sugan-brown/50">Label</p>
                          <a
                            href={selectedOrder.shippingDetails.label}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-body text-sm text-blue-600 hover:underline"
                          >
                            View Label
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

// Product Edit Form Component
function ProductEditForm({ 
  product, 
  onSave, 
  onCancel 
}: { 
  product: Product; 
  onSave: (product: Product) => void;
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState<Product>({ ...product });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const updateDetail = (key: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      details: {
        ...prev.details,
        [key]: value
      }
    }));
  };

  const updateDimension = (key: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      details: {
        ...prev.details,
        dimensions: {
          ...prev.details?.dimensions,
          [key]: value
        }
      }
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 mt-4">
      {/* Basic Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="font-body">Product Name</Label>
          <Input
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className="font-body"
          />
        </div>
        <div className="space-y-2">
          <Label className="font-body">Price (₹)</Label>
          <Input
            type="number"
            value={formData.price}
            onChange={(e) => setFormData({...formData, price: Number(e.target.value)})}
            className="font-body"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label className="font-body">Description</Label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({...formData, description: e.target.value})}
          className="w-full h-24 px-3 py-2 border border-sugan-brown/20 rounded-md font-body text-sm"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="font-body">Category</Label>
          <Input
            value={formData.category || ''}
            onChange={(e) => setFormData({...formData, category: e.target.value})}
            className="font-body"
          />
        </div>
        <div className="space-y-2">
          <Label className="font-body">Room</Label>
          <select
            value={formData.room}
            onChange={(e) => setFormData({...formData, room: e.target.value})}
            className="w-full h-10 px-3 border border-sugan-brown/20 rounded-md font-body text-sm"
          >
            <option value="kitchen">Kitchen</option>
            <option value="living">Living Room</option>
            <option value="bedroom">Bedroom</option>
            <option value="dining">Dining</option>
            <option value="office">Office</option>
            <option value="pooja">Pooja</option>
            <option value="outdoor">Outdoor</option>
            <option value="pet">Pet</option>
          </select>
        </div>
      </div>

      {/* Dimensions Section */}
      <div className="border-t border-sugan-brown/10 pt-4">
        <h4 className="font-display text-lg text-sugan-brown mb-4">Dimensions (inches)</h4>
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label className="font-body">Length</Label>
            <Input
              placeholder="e.g., 12"
              value={formData.details?.dimensions?.length || ''}
              onChange={(e) => updateDimension('length', e.target.value)}
              className="font-body"
            />
          </div>
          <div className="space-y-2">
            <Label className="font-body">Width</Label>
            <Input
              placeholder="e.g., 8"
              value={formData.details?.dimensions?.width || ''}
              onChange={(e) => updateDimension('width', e.target.value)}
              className="font-body"
            />
          </div>
          <div className="space-y-2">
            <Label className="font-body">Height</Label>
            <Input
              placeholder="e.g., 4"
              value={formData.details?.dimensions?.height || ''}
              onChange={(e) => updateDimension('height', e.target.value)}
              className="font-body"
            />
          </div>
        </div>
      </div>

      {/* Product Details */}
      <div className="border-t border-sugan-brown/10 pt-4">
        <h4 className="font-display text-lg text-sugan-brown mb-4">Product Details</h4>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="font-body">Materials</Label>
            <Input
              value={formData.details?.materials || ''}
              onChange={(e) => updateDetail('materials', e.target.value)}
              className="font-body"
            />
          </div>
          <div className="space-y-2">
            <Label className="font-body">Finish</Label>
            <Input
              value={formData.details?.finish || ''}
              onChange={(e) => updateDetail('finish', e.target.value)}
              className="font-body"
            />
          </div>
          <div className="space-y-2">
            <Label className="font-body">Origin</Label>
            <Input
              value={formData.details?.origin || ''}
              onChange={(e) => updateDetail('origin', e.target.value)}
              className="font-body"
            />
          </div>
          <div className="space-y-2">
            <Label className="font-body">Care Instructions</Label>
            <Input
              value={formData.details?.care || ''}
              onChange={(e) => updateDetail('care', e.target.value)}
              className="font-body"
            />
          </div>
          <div className="space-y-2">
            <Label className="font-body">Maintenance</Label>
            <Input
              value={formData.details?.maintenance || ''}
              onChange={(e) => updateDetail('maintenance', e.target.value)}
              className="font-body"
            />
          </div>
        </div>
      </div>

      {/* Stock Status */}
      <div className="flex items-center gap-2 pt-4 border-t border-sugan-brown/10">
        <input
          type="checkbox"
          id="inStock"
          checked={formData.inStock}
          onChange={(e) => setFormData({...formData, inStock: e.target.checked})}
          className="w-4 h-4 rounded border-sugan-brown/20"
        />
        <Label htmlFor="inStock" className="font-body">In Stock</Label>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-sugan-brown/10">
        <Button type="button" variant="outline" onClick={onCancel} className="font-body">
          <X className="w-4 h-4 mr-1" />
          Cancel
        </Button>
        <Button type="submit" className="bg-sugan-brown hover:bg-sugan-brown/90 font-body">
          <Save className="w-4 h-4 mr-1" />
          Save Changes
        </Button>
      </div>
    </form>
  );
}

// User Edit Form Component
function UserEditForm({ 
  user, 
  onSave, 
  onCancel 
}: { 
  user: UserData; 
  onSave: (data: Partial<UserData>) => void;
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState({
    name: user.name || '',
    isAdmin: user.isAdmin || false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
      <div className="space-y-2">
        <Label className="font-body">Full Name</Label>
        <Input
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          className="font-body"
          placeholder="User's full name"
        />
      </div>

      <div className="space-y-2">
        <Label className="font-body">Email</Label>
        <Input
          value={user.email}
          disabled
          className="font-body bg-gray-100"
        />
        <p className="text-xs text-sugan-brown/50">Email cannot be changed</p>
      </div>

      <div className="flex items-center gap-2 pt-2">
        <input
          type="checkbox"
          id="isAdmin"
          checked={formData.isAdmin}
          onChange={(e) => setFormData({...formData, isAdmin: e.target.checked})}
          className="w-4 h-4 rounded border-sugan-brown/20"
        />
        <Label htmlFor="isAdmin" className="font-body">Admin Access</Label>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-sugan-brown/10">
        <Button type="button" variant="outline" onClick={onCancel} className="font-body">
          <X className="w-4 h-4 mr-1" />
          Cancel
        </Button>
        <Button type="submit" className="bg-sugan-brown hover:bg-sugan-brown/90 font-body">
          <Save className="w-4 h-4 mr-1" />
          Save Changes
        </Button>
      </div>
    </form>
  );
}
