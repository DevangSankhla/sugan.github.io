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
  Package, Users, DollarSign, ShoppingCart, Search, Edit
} from 'lucide-react';
import { db } from '@/lib/firebase';
import { collection, query, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import type { Product } from '@/types';

interface Order {
  id: string;
  userId: string;
  userEmail: string;
  items: any[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  createdAt: any;
  shippingAddress: any;
}

interface DashboardStats {
  totalOrders: number;
  totalRevenue: number;
  totalProducts: number;
  totalUsers: number;
}

export default function Admin() {
  const navigate = useNavigate();
  const { isAdmin, user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [, setUsers] = useState<any[]>([]);
  const [stats, setStats] = useState<DashboardStats>({
    totalOrders: 0,
    totalRevenue: 0,
    totalProducts: 0,
    totalUsers: 0
  });
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

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

  // Fetch data
  useEffect(() => {
    if (!isAdmin) return;

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
    });

    // Fetch products
    const productsQuery = query(collection(db, 'products'));
    const unsubscribeProducts = onSnapshot(productsQuery, (snapshot) => {
      const productsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Product[];
      setProducts(productsData);
      setStats(prev => ({
        ...prev,
        totalProducts: productsData.length
      }));
      setLoading(false);
    });

    // Fetch users
    const usersQuery = query(collection(db, 'users'));
    const unsubscribeUsers = onSnapshot(usersQuery, (snapshot) => {
      const usersData = snapshot.docs.map(doc => doc.data());
      setUsers(usersData);
      setStats(prev => ({
        ...prev,
        totalUsers: usersData.length
      }));
    });

    return () => {
      unsubscribeOrders();
      unsubscribeProducts();
      unsubscribeUsers();
    };
  }, [isAdmin]);

  const updateOrderStatus = async (orderId: string, status: string) => {
    await updateDoc(doc(db, 'orders', orderId), { status });
  };

  const updateProduct = async (productId: string, data: Partial<Product>) => {
    await updateDoc(doc(db, 'products', productId), data);
    setEditingProduct(null);
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
    <div className="min-h-screen bg-sugan-cream py-8">
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
        </div>

        <Tabs defaultValue="products" className="space-y-6">
          <TabsList className="bg-white border border-sugan-brown/10 p-1">
            <TabsTrigger value="products" className="font-body data-[state=active]:bg-sugan-brown data-[state=active]:text-white">
              <Package className="w-4 h-4 mr-2" />
              Products
            </TabsTrigger>
            <TabsTrigger value="orders" className="font-body data-[state=active]:bg-sugan-brown data-[state=active]:text-white">
              <ShoppingCart className="w-4 h-4 mr-2" />
              Orders
            </TabsTrigger>
          </TabsList>

          {/* Products Tab */}
          <TabsContent value="products">
            <Card>
              <CardHeader className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <CardTitle className="font-display text-xl text-sugan-brown">
                  Manage Products
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
                                className="w-10 h-10 object-cover rounded"
                              />
                              <span className="font-body text-sugan-brown">{product.name}</span>
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
                            <div className="flex justify-end gap-2">
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
                                  {editingProduct && (
                                    <ProductEditForm
                                      product={editingProduct}
                                      onSave={(data) => updateProduct(product.id, data)}
                                      onCancel={() => setEditingProduct(null)}
                                    />
                                  )}
                                </DialogContent>
                              </Dialog>
                            </div>
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
              <CardHeader>
                <CardTitle className="font-display text-xl text-sugan-brown">
                  All Orders ({orders.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
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
                              {order.userEmail} • {order.items?.length} items
                            </p>
                            <p className="font-body text-sugan-gold font-semibold">
                              ₹{order.total?.toLocaleString()}
                            </p>
                          </div>
                          <div className="flex items-center gap-3">
                            <select
                              value={order.status}
                              onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                              className="font-body text-sm border border-sugan-brown/20 rounded-md px-3 py-1"
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
        </Tabs>
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
  onSave: (data: Partial<Product>) => void;
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState({
    name: product.name || '',
    price: product.price || 0,
    description: product.description || '',
    inStock: product.inStock || false,
    category: product.category || '',
    details: {
      materials: product.details?.materials || '',
      finish: product.details?.finish || '',
      origin: product.details?.origin || '',
      dimensions: {
        length: product.details?.dimensions?.length || '',
        width: product.details?.dimensions?.width || '',
        height: product.details?.dimensions?.height || ''
      },
      care: product.details?.care || '',
      maintenance: product.details?.maintenance || ''
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 mt-4">
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

      {/* Dimensions Section */}
      <div className="border-t border-sugan-brown/10 pt-4">
        <h4 className="font-display text-lg text-sugan-brown mb-4">Dimensions (inches)</h4>
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label className="font-body">Length</Label>
            <Input
              placeholder="e.g., 12"
              value={formData.details.dimensions.length}
              onChange={(e) => setFormData({
                ...formData,
                details: {
                  ...formData.details,
                  dimensions: { ...formData.details.dimensions, length: e.target.value }
                }
              })}
              className="font-body"
            />
          </div>
          <div className="space-y-2">
            <Label className="font-body">Width</Label>
            <Input
              placeholder="e.g., 8"
              value={formData.details.dimensions.width}
              onChange={(e) => setFormData({
                ...formData,
                details: {
                  ...formData.details,
                  dimensions: { ...formData.details.dimensions, width: e.target.value }
                }
              })}
              className="font-body"
            />
          </div>
          <div className="space-y-2">
            <Label className="font-body">Height</Label>
            <Input
              placeholder="e.g., 4"
              value={formData.details.dimensions.height}
              onChange={(e) => setFormData({
                ...formData,
                details: {
                  ...formData.details,
                  dimensions: { ...formData.details.dimensions, height: e.target.value }
                }
              })}
              className="font-body"
            />
          </div>
        </div>
      </div>

      <div className="border-t border-sugan-brown/10 pt-4">
        <h4 className="font-display text-lg text-sugan-brown mb-4">Product Details</h4>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="font-body">Materials</Label>
            <Input
              value={formData.details.materials}
              onChange={(e) => setFormData({
                ...formData,
                details: { ...formData.details, materials: e.target.value }
              })}
              className="font-body"
            />
          </div>
          <div className="space-y-2">
            <Label className="font-body">Finish</Label>
            <Input
              value={formData.details.finish}
              onChange={(e) => setFormData({
                ...formData,
                details: { ...formData.details, finish: e.target.value }
              })}
              className="font-body"
            />
          </div>
          <div className="space-y-2">
            <Label className="font-body">Care Instructions</Label>
            <Input
              value={formData.details.care}
              onChange={(e) => setFormData({
                ...formData,
                details: { ...formData.details, care: e.target.value }
              })}
              className="font-body"
            />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 pt-4">
        <input
          type="checkbox"
          id="inStock"
          checked={formData.inStock}
          onChange={(e) => setFormData({...formData, inStock: e.target.checked})}
          className="rounded border-sugan-brown/20"
        />
        <Label htmlFor="inStock" className="font-body">In Stock</Label>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-sugan-brown/10">
        <Button type="button" variant="outline" onClick={onCancel} className="font-body">
          Cancel
        </Button>
        <Button type="submit" className="bg-sugan-brown hover:bg-sugan-brown/90 font-body">
          Save Changes
        </Button>
      </div>
    </form>
  );
}
