import { useEffect, useState, useMemo } from 'react';
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
  Eye, ArrowRight, MapPin, Phone, CreditCard, Truck, Calendar, Hash, Copy, Check, Trash2
} from 'lucide-react';
import { db, functions as fns } from '@/lib/firebase';
import { collection, query, onSnapshot, doc, updateDoc, serverTimestamp, setDoc, deleteDoc, where, getDocs, limit } from 'firebase/firestore';
import { httpsCallable } from 'firebase/functions';
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
  isTrial?: boolean;
  orderType?: 'regular' | 'trial' | 'creator';
  orderNumber?: string;
}

interface UserData {
  uid: string;
  email: string;
  name: string;
  isAdmin: boolean;
  createdAt: any;
}

interface AffiliateCodeRow {
  id: string;
  code: string;
  email: string;
  name?: string;
  discountPercent: number;
  commissionPercent: number;
  active: boolean;
  totalOrders?: number;
  totalCommissionAccrued?: number;
  createdAt?: any;
}

interface AffiliateOrderRow {
  id: string;
  orderNumber: string;
  affiliateCode: string;
  affiliateEmail: string;
  status: string;
  paymentStatus: string;
  itemCount: number;
  itemsSummary: string;
  commissionAmount: number;
  commissionVoided: boolean;
  voidReason?: string;
  eligibilityDate?: any;
  commissionMonth?: string | null;
  createdAt?: any;
  deliveredAt?: any;
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

function mapDocs<T>(snapshot: { docs: { id: string; data(): object }[] }): T[] {
  return snapshot.docs.map(d => ({ id: d.id, ...d.data() })) as T[];
}

export default function Admin() {
  const navigate = useNavigate();
  const { isAdmin, user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>(allProducts);
  const [users, setUsers] = useState<UserData[]>([]);
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editingUser, setEditingUser] = useState<UserData | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [statusError, setStatusError] = useState('');
  const [affiliateCodes, setAffiliateCodes] = useState<AffiliateCodeRow[]>([]);
  const [affiliateOrders, setAffiliateOrders] = useState<AffiliateOrderRow[]>([]);
  const [showCreateAffiliate, setShowCreateAffiliate] = useState(false);
  const [newAff, setNewAff] = useState({ code: '', email: '', name: '', discountPercent: 10, commissionPercent: 10 });
  const [affError, setAffError] = useState('');
  const [voidingId, setVoidingId] = useState<string | null>(null);
  const [deletingOrder, setDeletingOrder] = useState<string | null>(null);
  const realOrders = useMemo(
    () => orders.filter(o => !o.isTrial && o.orderType !== 'trial' && o.orderType !== 'creator'),
    [orders]
  );
  const totalRevenue = useMemo(() => realOrders.reduce((sum, o) => sum + (o.total || 0), 0), [realOrders]);

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

    let unsubscribeOrders: (() => void) | undefined;
    let unsubscribeUsers: (() => void) | undefined;
    let unsubscribeSubmissions: (() => void) | undefined;
    let unsubscribeAffiliates: (() => void) | undefined;
    let unsubscribeAffiliateOrders: (() => void) | undefined;

    try {
      // Fetch orders
      const ordersQuery = query(collection(db, 'orders'));
      unsubscribeOrders = onSnapshot(ordersQuery,
        (snapshot) => {
          const data = mapDocs<Order>(snapshot);
          setOrders(data.sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0)));
        },
        (error) => console.error('Orders error:', error)
      );

      // Fetch users
      const usersQuery = query(collection(db, 'users'));
      unsubscribeUsers = onSnapshot(usersQuery,
        (snapshot) => setUsers(mapDocs<UserData>(snapshot)),
        (error) => {
          console.error('Users error:', error);
          if (user) {
            setUsers([{ uid: user.uid, email: user.email || '', name: user.displayName || 'Current User', isAdmin: true, createdAt: null }]);
          }
        }
      );

      // Fetch contact submissions
      const submissionsQuery = query(collection(db, 'contactSubmissions'));
      unsubscribeSubmissions = onSnapshot(submissionsQuery,
        (snapshot) => {
          const data = mapDocs<ContactSubmission>(snapshot);
          setSubmissions(data.sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0)));
        },
        (error) => console.error('Submissions error:', error)
      );

      // Fetch affiliate codes
      unsubscribeAffiliates = onSnapshot(query(collection(db, 'affiliateCodes')),
        (snapshot) => setAffiliateCodes(mapDocs<AffiliateCodeRow>(snapshot)),
        (error) => console.error('Affiliate codes error:', error)
      );

      // Fetch affiliate order mirror (so admin can see + void)
      unsubscribeAffiliateOrders = onSnapshot(query(collection(db, 'affiliateOrders')),
        (snapshot) => {
          const data = mapDocs<AffiliateOrderRow>(snapshot);
          setAffiliateOrders(data.sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0)));
        },
        (error) => console.error('Affiliate orders error:', error)
      );

      setLoading(false);
    } catch (error) {
      console.error('Error fetching admin data:', error);
      setLoading(false);
    }

    return () => {
      unsubscribeOrders?.();
      unsubscribeUsers?.();
      unsubscribeSubmissions?.();
      unsubscribeAffiliates?.();
      unsubscribeAffiliateOrders?.();
    };
  }, [isAdmin]);

  const createAffiliateCode = async () => {
    setAffError('');
    const code = newAff.code.trim().toUpperCase();
    const email = newAff.email.trim().toLowerCase();
    if (!code || !email) { setAffError('Code and email are required'); return; }
    if (!/^[A-Z0-9]{3,20}$/.test(code)) { setAffError('Code must be 3–20 letters/numbers'); return; }
    if (affiliateCodes.some(c => c.id === code)) { setAffError('This code already exists'); return; }
    try {
      await setDoc(doc(db, 'affiliateCodes', code), {
        code,
        email,
        name: newAff.name.trim() || null,
        discountPercent: Number(newAff.discountPercent) || 10,
        commissionPercent: Number(newAff.commissionPercent) || 10,
        active: true,
        totalOrders: 0,
        totalCommissionAccrued: 0,
        createdAt: serverTimestamp(),
        createdBy: user?.uid || null,
      });
      setNewAff({ code: '', email: '', name: '', discountPercent: 10, commissionPercent: 10 });
      setShowCreateAffiliate(false);
    } catch (err) {
      console.error(err);
      setAffError('Could not create code (check Firestore rules)');
    }
  };

  const toggleAffiliateActive = async (codeId: string, active: boolean) => {
    try {
      await updateDoc(doc(db, 'affiliateCodes', codeId), {
        active,
        updatedAt: serverTimestamp(),
      });
    } catch (err) { console.error(err); }
  };

  const deleteAffiliateCode = async (codeId: string) => {
    if (!window.confirm(`Delete affiliate code ${codeId}? Existing orders keep their commission record.`)) return;
    try { await deleteDoc(doc(db, 'affiliateCodes', codeId)); } catch (err) { console.error(err); }
  };

  const voidCommission = async (orderId: string) => {
    const reason = window.prompt('Reason for voiding commission (e.g. "returned 14 days later"):');
    if (reason === null) return;
    setVoidingId(orderId);
    try {
      const call = httpsCallable<{ orderId: string; reason: string }, { success: boolean }>(fns, 'voidAffiliateCommission');
      await call({ orderId, reason });
    } catch (err) {
      console.error('Void failed:', err);
      alert('Failed to void commission. See console for details.');
    } finally {
      setVoidingId(null);
    }
  };

  const updateOrderStatus = async (orderId: string, status: Order['status']) => {
    const prevStatus = orders.find(o => o.id === orderId)?.status;
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
    try {
      await updateDoc(doc(db, 'orders', orderId), { status, updatedAt: serverTimestamp() });
      setStatusError('');
    } catch (error) {
      console.error('Error updating order status:', error);
      if (prevStatus) setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: prevStatus } : o));
      setStatusError('Failed to update status. Check admin permissions.');
    }
  };

  const updatePaymentStatus = async (orderId: string, paymentStatus: string) => {
    const prev = orders.find(o => o.id === orderId)?.paymentStatus;
    setOrders(p => p.map(o => o.id === orderId ? { ...o, paymentStatus } : o));
    try {
      await updateDoc(doc(db, 'orders', orderId), { paymentStatus, updatedAt: serverTimestamp() });
      setStatusError('');
    } catch (error) {
      console.error('Error updating payment status:', error);
      if (prev) setOrders(p => p.map(o => o.id === orderId ? { ...o, paymentStatus: prev } : o));
      setStatusError('Failed to update payment status. Check admin permissions.');
    }
  };

  const updateSubmissionStatus = async (submissionId: string, status: string) => {
    try {
      await updateDoc(doc(db, 'contactSubmissions', submissionId), { status });
    } catch (error) {
      console.error('Error updating submission:', error);
    }
  };

  const updateUser = async (userId: string, data: Partial<UserData>) => {
    try {
      await updateDoc(doc(db, 'users', userId), data);
      setEditingUser(null);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const updateOrderType = async (orderId: string, orderType: 'regular' | 'trial' | 'creator') => {
    try {
      await updateDoc(doc(db, 'orders', orderId), {
        orderType,
        isTrial: orderType === 'trial',
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      console.error('Error updating order type:', error);
    }
  };

  const deleteOrder = async (order: Order) => {
    const label = order.orderNumber || `#${order.id.slice(-8).toUpperCase()}`;
    if (!window.confirm(`Delete order ${label}? This cannot be undone.`)) return;
    setDeletingOrder(order.id);
    try {
      await deleteDoc(doc(db, 'orders', order.id));
      if (order.orderNumber) {
        const affQuery = query(
          collection(db, 'affiliateOrders'),
          where('orderNumber', '==', order.orderNumber),
          limit(10)
        );
        const affSnap = await getDocs(affQuery);
        affSnap.forEach((d) => deleteDoc(d.ref));
      }
      setSelectedOrder(null);
    } catch (err) {
      console.error('Failed to delete order:', err);
      alert('Failed to delete order. Please try again.');
    } finally {
      setDeletingOrder(null);
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
      <div className="min-h-screen bg-sugan-bone flex items-center justify-center">
        <div className="text-sugan-ink font-body">Loading admin dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sugan-bone pt-24 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-display text-3xl text-sugan-ink">
              Admin Dashboard
            </h1>
            <p className="font-body text-sugan-ink/60 mt-1">
              Manage your store, orders, and inventory
            </p>
          </div>
          <Button
            onClick={() => navigate('/account')}
            variant="outline"
            className="font-body border-sugan-ink/20"
          >
            Back to Account
          </Button>
        </div>

        {/* Stats Cards */}
        {statusError && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700 font-body">
            {statusError}
          </div>
        )}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-body text-sm text-sugan-ink/60">Total Orders</p>
                  <p className="font-display text-2xl text-sugan-ink">{realOrders.length}</p>
                </div>
                <ShoppingCart className="w-8 h-8 text-sugan-gold" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-body text-sm text-sugan-ink/60">Revenue</p>
                  <p className="font-display text-2xl text-sugan-ink">
                    ₹{(totalRevenue / 1000).toFixed(1)}k
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
                  <p className="font-body text-sm text-sugan-ink/60">Products</p>
                  <p className="font-display text-2xl text-sugan-ink">{allProducts.length}</p>
                </div>
                <Package className="w-8 h-8 text-sugan-gold" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-body text-sm text-sugan-ink/60">Users</p>
                  <p className="font-display text-2xl text-sugan-ink">{users.length}</p>
                </div>
                <Users className="w-8 h-8 text-sugan-gold" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-body text-sm text-sugan-ink/60">Messages</p>
                  <p className="font-display text-2xl text-sugan-ink">{submissions.length}</p>
                </div>
                <Mail className="w-8 h-8 text-sugan-gold" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="products" className="space-y-6">
          <TabsList className="bg-white border border-sugan-ink/10 p-1 flex flex-wrap">
            <TabsTrigger value="products" className="font-body data-[state=active]:bg-sugan-ink data-[state=active]:text-white">
              <Package className="w-4 h-4 mr-2" />
              Products
            </TabsTrigger>
            <TabsTrigger value="orders" className="font-body data-[state=active]:bg-sugan-ink data-[state=active]:text-white">
              <ShoppingCart className="w-4 h-4 mr-2" />
              Orders
            </TabsTrigger>
            <TabsTrigger value="users" className="font-body data-[state=active]:bg-sugan-ink data-[state=active]:text-white">
              <User className="w-4 h-4 mr-2" />
              Users
            </TabsTrigger>
            <TabsTrigger value="messages" className="font-body data-[state=active]:bg-sugan-ink data-[state=active]:text-white">
              <MessageSquare className="w-4 h-4 mr-2" />
              Messages
              {submissions.filter(s => s.status === 'new').length > 0 && (
                <span className="ml-2 bg-sugan-gold text-white text-xs px-2 py-0.5 rounded-full">
                  {submissions.filter(s => s.status === 'new').length}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="affiliates" className="font-body data-[state=active]:bg-sugan-ink data-[state=active]:text-white">
              <DollarSign className="w-4 h-4 mr-2" />
              Affiliates
            </TabsTrigger>
          </TabsList>

          {/* Products Tab */}
          <TabsContent value="products">
            <Card>
              <CardHeader className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <CardTitle className="font-display text-xl text-sugan-ink">
                  Manage Products ({filteredProducts.length})
                </CardTitle>
                <div className="flex gap-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-sugan-ink/40" />
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
                      <tr className="border-b border-sugan-ink/10">
                        <th className="text-left py-3 px-4 font-body text-sm text-sugan-ink/60">Product</th>
                        <th className="text-left py-3 px-4 font-body text-sm text-sugan-ink/60">SKU</th>
                        <th className="text-left py-3 px-4 font-body text-sm text-sugan-ink/60">Price</th>
                        <th className="text-left py-3 px-4 font-body text-sm text-sugan-ink/60">Stock</th>
                        <th className="text-right py-3 px-4 font-body text-sm text-sugan-ink/60">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredProducts.map((product) => (
                        <tr key={product.id} className="border-b border-sugan-ink/5 hover:bg-sugan-ink/5">
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-3">
                              <img
                                src={product.image}
                                alt={product.name}
                                className="w-12 h-12 object-cover rounded"
                                loading="lazy"
                              />
                              <div>
                                <p className="font-body text-sugan-ink font-medium">{product.name}</p>
                                <p className="text-xs text-sugan-ink/50">{product.category}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4 font-body text-sm text-sugan-ink/60">
                            {product.id}
                          </td>
                          <td className="py-3 px-4 font-body text-sugan-ink">
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
                <CardTitle className="font-display text-xl text-sugan-ink">
                  All Orders ({orders.length})
                  {realOrders.length < orders.length && (
                    <span className="ml-2 text-sm font-body text-sugan-ink/50">({realOrders.length} real)</span>
                  )}
                </CardTitle>
                <Button
                  variant="outline"
                  onClick={() => navigate('/admin/orders')}
                  className="font-body border-sugan-ink/20"
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
                      className="border-sugan-ink/10 hover:border-sugan-gold/50 cursor-pointer transition-colors"
                      onClick={() => setSelectedOrder(order)}
                    >
                      <CardContent className="p-4">
                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <p className="font-body text-sm font-medium text-sugan-ink">
                                {order.orderNumber || `#${order.id.slice(-8).toUpperCase()}`}
                              </p>
                              {(order.isTrial || order.orderType === 'trial') && (
                                <Badge className="bg-gray-100 text-gray-500 font-body text-xs">TRIAL</Badge>
                              )}
                              {order.orderType === 'creator' && (
                                <Badge className="bg-purple-100 text-purple-600 font-body text-xs">CREATOR</Badge>
                              )}
                              <span className="font-body text-xs text-sugan-ink/40">
                                {order.createdAt?.toDate?.().toLocaleString('en-IN', {
                                  day: 'numeric',
                                  month: 'short',
                                  year: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit'
                                }) || ''}
                              </span>
                            </div>
                            <p className="font-body text-sugan-ink">
                              {order.userEmail} • {order.items?.length} items
                            </p>
                            <p className="font-body text-xs text-sugan-ink/50 mt-1">
                              {order.shippingAddress?.fullName} • {order.shippingAddress?.phone}
                            </p>
                            <p className="font-body text-xs text-sugan-ink/40 mt-0.5">
                              {order.shippingAddress?.city}, {order.shippingAddress?.state} - {order.shippingAddress?.pincode}
                            </p>
                            {/* Order Items with SKUs */}
                            <div className="mt-2 space-y-1">
                              {order.items?.map((item: OrderItem, idx: number) => (
                                <div key={idx} className="flex items-center gap-2 text-sm">
                                  <span className="text-sugan-ink/60">•</span>
                                  <span className="font-body text-sugan-ink">{item.name}</span>
                                  <span className="font-body text-xs text-sugan-ink/40 bg-sugan-ink/5 px-2 py-0.5 rounded">
                                    SKU: {item.productId}
                                  </span>
                                  <span className="font-body text-xs text-sugan-ink/60">
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
                            <div className="flex items-center gap-2">
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
                              <Button
                                size="sm"
                                variant="outline"
                                className="font-body border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                                disabled={deletingOrder === order.id}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  deleteOrder(order);
                                }}
                              >
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </div>
                            <div className="flex items-center gap-3">
                              <select
                                value={order.status}
                                onClick={(e) => e.stopPropagation()}
                                onChange={(e) => { e.stopPropagation(); updateOrderStatus(order.id, e.target.value as Order['status']); }}
                                className="font-body text-sm border border-sugan-ink/20 rounded-md px-3 py-1 bg-white cursor-pointer"
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
                            <div className="flex items-center gap-2">
                              <span className="font-body text-xs text-sugan-ink/50">Type:</span>
                              <select
                                value={order.orderType || (order.isTrial ? 'trial' : 'regular')}
                                onClick={(e) => e.stopPropagation()}
                                onChange={(e) => { e.stopPropagation(); updateOrderType(order.id, e.target.value as 'regular' | 'trial' | 'creator'); }}
                                className="font-body text-xs border border-sugan-ink/20 rounded-md px-2 py-1 bg-white cursor-pointer"
                              >
                                <option value="regular">Regular</option>
                                <option value="trial">Trial</option>
                                <option value="creator">Creator</option>
                              </select>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="font-body text-xs text-sugan-ink/50">Payment:</span>
                              <select
                                value={order.paymentStatus || 'pending'}
                                onClick={(e) => e.stopPropagation()}
                                onChange={(e) => { e.stopPropagation(); updatePaymentStatus(order.id, e.target.value); }}
                                className={`font-body text-xs border rounded-md px-2 py-1 cursor-pointer ${
                                  order.paymentStatus === 'paid' ? 'border-green-300 bg-green-50 text-green-700' :
                                  order.paymentStatus === 'cod_pending' ? 'border-orange-300 bg-orange-50 text-orange-700' :
                                  order.paymentStatus === 'failed' ? 'border-red-300 bg-red-50 text-red-700' :
                                  'border-sugan-ink/20 bg-white text-sugan-ink'
                                }`}
                              >
                                <option value="pending">Pending</option>
                                <option value="paid">Paid</option>
                                <option value="cod_pending">COD Pending</option>
                                <option value="failed">Failed</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  {orders.length === 0 && (
                    <div className="text-center py-12">
                      <ShoppingCart className="w-12 h-12 text-sugan-ink/20 mx-auto mb-4" />
                      <p className="font-body text-sugan-ink/60">No orders yet</p>
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
                <CardTitle className="font-display text-xl text-sugan-ink">
                  All Users ({users.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {users.map((userData) => (
                    <Card key={userData.uid} className="border-sugan-ink/10">
                      <CardContent className="p-4">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-sugan-ink/10 rounded-full flex items-center justify-center">
                              <User className="w-5 h-5 text-sugan-ink" />
                            </div>
                            <div>
                              <p className="font-body text-sugan-ink font-medium">
                                {userData.name || 'No Name'}
                              </p>
                              <p className="font-body text-sm text-sugan-ink/60">
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
                      <Users className="w-12 h-12 text-sugan-ink/20 mx-auto mb-4" />
                      <p className="font-body text-sugan-ink/60">No users yet</p>
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
                <CardTitle className="font-display text-xl text-sugan-ink">
                  Contact Submissions ({submissions.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {submissions.map((submission) => (
                    <Card key={submission.id} className={`border-sugan-ink/10 ${submission.status === 'new' ? 'bg-sugan-gold/5' : ''}`}>
                      <CardContent className="p-4">
                        <div className="flex flex-col gap-4">
                          {/* Header */}
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-sugan-ink/10 rounded-full flex items-center justify-center">
                                <Mail className="w-5 h-5 text-sugan-ink" />
                              </div>
                              <div>
                                <p className="font-body text-sugan-ink font-medium">
                                  {submission.name}
                                  {submission.company && (
                                    <span className="text-sugan-ink/60"> ({submission.company})</span>
                                  )}
                                </p>
                                <p className="font-body text-sm text-sugan-ink/60">
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
                          <div className="bg-sugan-bone/50 rounded-lg p-4">
                            {submission.subject && (
                              <p className="font-body font-medium text-sugan-ink mb-2">
                                Subject: {submission.subject}
                              </p>
                            )}
                            {submission.orderType && (
                              <div className="flex gap-4 mb-2 text-sm">
                                <span className="text-sugan-ink/60">
                                  <strong>Type:</strong> {submission.orderType.replace(/_/g, ' ')}
                                </span>
                                {submission.quantity && (
                                  <span className="text-sugan-ink/60">
                                    <strong>Qty:</strong> {submission.quantity}
                                  </span>
                                )}
                              </div>
                            )}
                            <p className="font-body text-sugan-ink/80 whitespace-pre-wrap">
                              {submission.message}
                            </p>
                          </div>

                          {/* Footer */}
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                            <p className="text-xs text-sugan-ink/40 font-body">
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
                                className="px-3 py-1.5 border border-sugan-ink/20 rounded-lg font-body text-sm bg-white focus:outline-none focus:border-sugan-gold"
                              >
                                <option value="new">New</option>
                                <option value="read">Read</option>
                                <option value="replied">Replied</option>
                              </select>
                              <a 
                                href={`mailto:${submission.email}?subject=Re: ${submission.subject || 'Your inquiry'}`}
                                className="px-4 py-1.5 bg-sugan-ink text-sugan-bone rounded-lg font-body text-sm hover:bg-sugan-ink/90 transition-colors"
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
                      <Mail className="w-12 h-12 text-sugan-ink/20 mx-auto mb-4" />
                      <p className="font-body text-sugan-ink/60">No messages yet</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Affiliates Tab */}
          <TabsContent value="affiliates">
            <div className="space-y-6">
              {/* Codes management */}
              <Card>
                <CardHeader className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <CardTitle className="font-display text-xl text-sugan-ink">
                    Affiliate Codes ({affiliateCodes.length})
                  </CardTitle>
                  <Button
                    onClick={() => { setShowCreateAffiliate(true); setAffError(''); }}
                    className="bg-sugan-ink hover:bg-sugan-ink/90 font-body"
                  >
                    + New Code
                  </Button>
                </CardHeader>
                <CardContent>
                  {affiliateCodes.length === 0 ? (
                    <p className="font-body text-sugan-ink/60 py-8 text-center">
                      No affiliate codes yet. Click "+ New Code" to create one.
                    </p>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm font-body">
                        <thead>
                          <tr className="text-left text-sugan-ink/60 border-b border-sugan-ink/10">
                            <th className="py-2 pr-4">Code</th>
                            <th className="py-2 pr-4">Influencer</th>
                            <th className="py-2 pr-4">Email</th>
                            <th className="py-2 pr-4 text-right">Disc / Comm %</th>
                            <th className="py-2 pr-4 text-right">Orders</th>
                            <th className="py-2 pr-4 text-right">Commission accrued</th>
                            <th className="py-2 pr-4">Active</th>
                            <th className="py-2 pr-4"></th>
                          </tr>
                        </thead>
                        <tbody>
                          {affiliateCodes.map((c) => (
                            <tr key={c.id} className="border-b border-sugan-ink/5">
                              <td className="py-3 pr-4 font-mono font-medium text-sugan-ink">{c.id}</td>
                              <td className="py-3 pr-4 text-sugan-ink">{c.name || '—'}</td>
                              <td className="py-3 pr-4 text-sugan-ink/70">{c.email}</td>
                              <td className="py-3 pr-4 text-right text-sugan-ink/70">
                                {c.discountPercent}% / {c.commissionPercent}%
                              </td>
                              <td className="py-3 pr-4 text-right text-sugan-ink">{c.totalOrders || 0}</td>
                              <td className="py-3 pr-4 text-right text-sugan-ink">
                                ₹{(c.totalCommissionAccrued || 0).toLocaleString('en-IN')}
                              </td>
                              <td className="py-3 pr-4">
                                <input
                                  type="checkbox"
                                  checked={c.active !== false}
                                  onChange={(e) => toggleAffiliateActive(c.id, e.target.checked)}
                                  className="w-4 h-4 accent-sugan-gold"
                                />
                              </td>
                              <td className="py-3 pr-4">
                                <button
                                  onClick={() => deleteAffiliateCode(c.id)}
                                  className="text-red-500 hover:text-red-700 text-xs"
                                >
                                  Delete
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Affiliate orders mirror */}
              <Card>
                <CardHeader>
                  <CardTitle className="font-display text-xl text-sugan-ink">
                    Affiliate Orders ({affiliateOrders.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {affiliateOrders.length === 0 ? (
                    <p className="font-body text-sugan-ink/60 py-8 text-center">
                      No orders have used an affiliate code yet.
                    </p>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm font-body">
                        <thead>
                          <tr className="text-left text-sugan-ink/60 border-b border-sugan-ink/10">
                            <th className="py-2 pr-4">Order</th>
                            <th className="py-2 pr-4">Code</th>
                            <th className="py-2 pr-4">Affiliate</th>
                            <th className="py-2 pr-4">Status</th>
                            <th className="py-2 pr-4 text-right">Commission</th>
                            <th className="py-2 pr-4">Eligible (month)</th>
                            <th className="py-2 pr-4"></th>
                          </tr>
                        </thead>
                        <tbody>
                          {affiliateOrders.map((o) => (
                            <tr key={o.id} className="border-b border-sugan-ink/5">
                              <td className="py-3 pr-4 font-mono text-sugan-ink">{o.orderNumber}</td>
                              <td className="py-3 pr-4 font-mono text-sugan-gold">{o.affiliateCode}</td>
                              <td className="py-3 pr-4 text-sugan-ink/70">{o.affiliateEmail}</td>
                              <td className="py-3 pr-4">
                                <Badge className={`text-xs ${
                                  o.status === 'delivered' ? 'bg-green-100 text-green-800' :
                                  o.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                                  o.status === 'processing' ? 'bg-amber-100 text-amber-800' :
                                  'bg-gray-100 text-gray-700'
                                }`}>{o.status}</Badge>
                              </td>
                              <td className="py-3 pr-4 text-right">
                                {o.commissionVoided ? (
                                  <span className="line-through text-sugan-ink/40">₹{(o.commissionAmount || 0).toLocaleString('en-IN')}</span>
                                ) : (
                                  <span className="font-medium text-sugan-ink">₹{(o.commissionAmount || 0).toLocaleString('en-IN')}</span>
                                )}
                                {o.commissionVoided && o.voidReason && (
                                  <p className="text-[10px] text-red-500 mt-1">{o.voidReason}</p>
                                )}
                              </td>
                              <td className="py-3 pr-4 text-sugan-ink/60 text-xs">
                                {o.commissionMonth || '—'}
                              </td>
                              <td className="py-3 pr-4">
                                {!o.commissionVoided && o.commissionMonth && (
                                  <button
                                    onClick={() => voidCommission(o.id)}
                                    disabled={voidingId === o.id}
                                    className="text-red-500 hover:text-red-700 text-xs disabled:opacity-50"
                                  >
                                    {voidingId === o.id ? 'Voiding…' : 'Void'}
                                  </button>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Create Affiliate Code Dialog */}
        <Dialog open={showCreateAffiliate} onOpenChange={setShowCreateAffiliate}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="font-display text-2xl text-sugan-ink">New Affiliate Code</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-1">
                <Label className="font-body text-sm">Code (uppercase, no spaces)</Label>
                <Input
                  value={newAff.code}
                  onChange={(e) => setNewAff({ ...newAff, code: e.target.value.toUpperCase().replace(/\s/g, '') })}
                  placeholder="RIYA10"
                  className="font-mono uppercase"
                />
              </div>
              <div className="space-y-1">
                <Label className="font-body text-sm">Influencer email (must match their signup)</Label>
                <Input
                  type="email"
                  value={newAff.email}
                  onChange={(e) => setNewAff({ ...newAff, email: e.target.value.toLowerCase() })}
                  placeholder="riya@example.com"
                />
              </div>
              <div className="space-y-1">
                <Label className="font-body text-sm">Display name (optional)</Label>
                <Input
                  value={newAff.name}
                  onChange={(e) => setNewAff({ ...newAff, name: e.target.value })}
                  placeholder="Riya Sharma"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label className="font-body text-sm">Discount %</Label>
                  <Input
                    type="number"
                    value={newAff.discountPercent}
                    onChange={(e) => setNewAff({ ...newAff, discountPercent: Number(e.target.value) })}
                    min={0} max={100}
                  />
                </div>
                <div className="space-y-1">
                  <Label className="font-body text-sm">Commission %</Label>
                  <Input
                    type="number"
                    value={newAff.commissionPercent}
                    onChange={(e) => setNewAff({ ...newAff, commissionPercent: Number(e.target.value) })}
                    min={0} max={100}
                  />
                </div>
              </div>
              {affError && <p className="text-sm text-red-600 font-body">{affError}</p>}
              <div className="flex gap-2 justify-end pt-2">
                <Button variant="outline" onClick={() => setShowCreateAffiliate(false)} className="font-body">Cancel</Button>
                <Button onClick={createAffiliateCode} className="bg-sugan-ink hover:bg-sugan-ink/90 font-body">Create</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Order Detail Dialog */}
        <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
          <DialogContent className="max-w-5xl max-h-[95vh] overflow-y-auto p-8">
            <DialogHeader>
              <DialogTitle className="font-display text-xl text-sugan-ink">
                Order Details
              </DialogTitle>
            </DialogHeader>
            {selectedOrder && (
              <div className="space-y-8 mt-2">
                {/* Order Header */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-sugan-ink/10">
                  <div>
                    <div className="flex items-center gap-2">
                      <Hash className="w-4 h-4 text-sugan-ink/40" />
                      <span className="font-body text-sm text-sugan-ink/60">
                        {selectedOrder.orderNumber || `#${selectedOrder.id.slice(-8).toUpperCase()}`}
                        {(selectedOrder.isTrial || selectedOrder.orderType === 'trial') && (
                          <Badge className="ml-2 bg-gray-100 text-gray-500 font-body text-xs">TRIAL</Badge>
                        )}
                        {selectedOrder.orderType === 'creator' && (
                          <Badge className="ml-2 bg-purple-100 text-purple-600 font-body text-xs">CREATOR</Badge>
                        )}
                      </span>
                      <button
                        onClick={() => handleCopy(selectedOrder.id.slice(-8).toUpperCase(), 'orderId')}
                        className="text-sugan-ink/40 hover:text-sugan-ink transition-colors"
                      >
                        {copiedField === 'orderId' ? (
                          <Check className="w-3 h-3 text-green-600" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                      </button>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <Calendar className="w-4 h-4 text-sugan-ink/40" />
                      <span className="font-body text-xs text-sugan-ink/50">
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
                  <div className="bg-sugan-bone/50 rounded-lg p-5">
                    <h4 className="font-body font-medium text-sugan-ink mb-3 flex items-center gap-2">
                      <User className="w-4 h-4 text-sugan-gold" />
                      Customer
                    </h4>
                    <div className="space-y-2">
                      <p className="font-body text-sm text-sugan-ink">
                        {selectedOrder.shippingAddress?.fullName || 'N/A'}
                      </p>
                      <div className="flex items-center gap-2">
                        <Mail className="w-3 h-3 text-sugan-ink/40" />
                        <span className="font-body text-xs text-sugan-ink/60">
                          {selectedOrder.userEmail || 'N/A'}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-3 h-3 text-sugan-ink/40" />
                        <span className="font-body text-xs text-sugan-ink/60">
                          {selectedOrder.shippingAddress?.phone || 'N/A'}
                        </span>
                      </div>
                      <p className="font-body text-xs text-sugan-ink/40 mt-1">
                        User ID: {selectedOrder.userId}
                      </p>
                    </div>
                  </div>

                  <div className="bg-sugan-bone/50 rounded-lg p-5">
                    <h4 className="font-body font-medium text-sugan-ink mb-4 flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-sugan-gold" />
                      Shipping Address
                    </h4>
                    <div className="space-y-1">
                      <p className="font-body text-sm text-sugan-ink">
                        {selectedOrder.shippingAddress?.addressLine1}
                      </p>
                      {selectedOrder.shippingAddress?.addressLine2 && (
                        <p className="font-body text-sm text-sugan-ink/80">
                          {selectedOrder.shippingAddress.addressLine2}
                        </p>
                      )}
                      <p className="font-body text-sm text-sugan-ink">
                        {selectedOrder.shippingAddress?.city}, {selectedOrder.shippingAddress?.state} - {selectedOrder.shippingAddress?.pincode}
                      </p>
                      {selectedOrder.shippingAddress?.landmark && (
                        <p className="font-body text-xs text-sugan-ink/50">
                          Landmark: {selectedOrder.shippingAddress.landmark}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Payment Info */}
                <div className="bg-sugan-bone/50 rounded-lg p-5">
                  <h4 className="font-body font-medium text-sugan-ink mb-4 flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-sugan-gold" />
                    Payment Information
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    <div>
                      <p className="font-body text-xs text-sugan-ink/50">Method</p>
                      <p className="font-body text-sm text-sugan-ink font-medium">{selectedOrder.paymentMethod}</p>
                    </div>
                    <div>
                      <p className="font-body text-xs text-sugan-ink/50">Status</p>
                      <p className="font-body text-sm text-sugan-ink font-medium capitalize">{selectedOrder.paymentStatus}</p>
                    </div>
                    <div>
                      <p className="font-body text-xs text-sugan-ink/50">Transaction ID</p>
                      <p className="font-body text-sm text-sugan-ink font-medium">{selectedOrder.txnid || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="font-body text-xs text-sugan-ink/50">Total Paid</p>
                      <p className="font-body text-sm text-sugan-ink font-medium">₹{selectedOrder.total?.toLocaleString()}</p>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div>
                  <h4 className="font-body font-medium text-sugan-ink mb-4 flex items-center gap-2">
                    <Package className="w-4 h-4 text-sugan-gold" />
                    Order Items ({selectedOrder.items?.length || 0})
                  </h4>
                  <div className="space-y-4">
                    {selectedOrder.items?.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-4 bg-sugan-bone/50 p-3 rounded-lg">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <p className="font-body text-sm font-medium text-sugan-ink">{item.name}</p>
                          <p className="font-body text-xs text-sugan-ink/50">SKU: {item.productId}</p>
                          <p className="font-body text-xs text-sugan-ink/60">
                            Qty: {item.quantity} × ₹{item.price?.toLocaleString()}
                          </p>
                        </div>
                        <p className="font-body text-sm font-semibold text-sugan-ink">
                          ₹{(item.price * item.quantity).toLocaleString()}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Order Summary */}
                <div className="bg-sugan-bone/50 rounded-lg p-5">
                  <h4 className="font-body font-medium text-sugan-ink mb-4">Order Summary</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between font-body text-sm text-sugan-ink/60">
                      <span>Subtotal</span>
                      <span>₹{selectedOrder.subtotal?.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between font-body text-sm text-sugan-ink/60">
                      <span>Shipping</span>
                      <span>{selectedOrder.shipping === 0 ? 'FREE' : `₹${selectedOrder.shipping}`}</span>
                    </div>
                    {selectedOrder.codCharge > 0 && (
                      <div className="flex justify-between font-body text-sm text-sugan-ink/60">
                        <span>COD Fee</span>
                        <span>₹{selectedOrder.codCharge}</span>
                      </div>
                    )}
                    <div className="flex justify-between font-body text-sm font-semibold text-sugan-ink pt-2 border-t border-sugan-ink/10">
                      <span>Total</span>
                      <span>₹{selectedOrder.total?.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Shipping Details */}
                {selectedOrder.shippingDetails && (
                  <div className="bg-sugan-bone/50 rounded-lg p-5">
                    <h4 className="font-body font-medium text-sugan-ink mb-4 flex items-center gap-2">
                      <Truck className="w-4 h-4 text-sugan-gold" />
                      Shipping Details
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                      <div>
                        <p className="font-body text-xs text-sugan-ink/50">Courier</p>
                        <p className="font-body text-sm text-sugan-ink font-medium">{selectedOrder.shippingDetails.courier}</p>
                      </div>
                      <div>
                        <p className="font-body text-xs text-sugan-ink/50">AWB Number</p>
                        <p className="font-body text-sm text-sugan-ink font-medium">{selectedOrder.shippingDetails.awb || 'N/A'}</p>
                      </div>
                      <div>
                        <p className="font-body text-xs text-sugan-ink/50">Shipment ID</p>
                        <p className="font-body text-sm text-sugan-ink font-medium">{selectedOrder.shippingDetails.shipmentId || 'N/A'}</p>
                      </div>
                      {selectedOrder.shippingDetails.label && (
                        <div>
                          <p className="font-body text-xs text-sugan-ink/50">Label</p>
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
            {selectedOrder && (
              <div className="pt-6 border-t border-sugan-ink/10 flex justify-end">
                <Button
                  variant="outline"
                  className="font-body border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                  disabled={deletingOrder === selectedOrder.id}
                  onClick={() => deleteOrder(selectedOrder)}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  {deletingOrder === selectedOrder.id ? 'Deleting...' : 'Delete Order'}
                </Button>
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
          className="w-full h-24 px-3 py-2 border border-sugan-ink/20 rounded-md font-body text-sm"
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
            className="w-full h-10 px-3 border border-sugan-ink/20 rounded-md font-body text-sm"
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
      <div className="border-t border-sugan-ink/10 pt-4">
        <h4 className="font-display text-lg text-sugan-ink mb-4">Dimensions (inches)</h4>
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
      <div className="border-t border-sugan-ink/10 pt-4">
        <h4 className="font-display text-lg text-sugan-ink mb-4">Product Details</h4>
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
      <div className="flex items-center gap-2 pt-4 border-t border-sugan-ink/10">
        <input
          type="checkbox"
          id="inStock"
          checked={formData.inStock}
          onChange={(e) => setFormData({...formData, inStock: e.target.checked})}
          className="w-4 h-4 rounded border-sugan-ink/20"
        />
        <Label htmlFor="inStock" className="font-body">In Stock</Label>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-sugan-ink/10">
        <Button type="button" variant="outline" onClick={onCancel} className="font-body">
          <X className="w-4 h-4 mr-1" />
          Cancel
        </Button>
        <Button type="submit" className="bg-sugan-ink hover:bg-sugan-ink/90 font-body">
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
        <p className="text-xs text-sugan-ink/50">Email cannot be changed</p>
      </div>

      <div className="flex items-center gap-2 pt-2">
        <input
          type="checkbox"
          id="isAdmin"
          checked={formData.isAdmin}
          onChange={(e) => setFormData({...formData, isAdmin: e.target.checked})}
          className="w-4 h-4 rounded border-sugan-ink/20"
        />
        <Label htmlFor="isAdmin" className="font-body">Admin Access</Label>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-sugan-ink/10">
        <Button type="button" variant="outline" onClick={onCancel} className="font-body">
          <X className="w-4 h-4 mr-1" />
          Cancel
        </Button>
        <Button type="submit" className="bg-sugan-ink hover:bg-sugan-ink/90 font-body">
          <Save className="w-4 h-4 mr-1" />
          Save Changes
        </Button>
      </div>
    </form>
  );
}
