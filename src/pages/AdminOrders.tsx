import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  ArrowLeft,
  Search,
  Download,
  Package,
  MapPin,
  Phone,
  User,
  CreditCard,
  Truck,
  Calendar,
  Hash,
  Mail,
  Copy,
  Check,
  Trash2,
} from 'lucide-react';
import { db } from '@/lib/firebase';
import { collection, query, onSnapshot, doc, updateDoc, serverTimestamp, deleteDoc, where, getDocs, limit } from 'firebase/firestore';
import type { FirestoreTimestamp } from '@/types';

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
  createdAt: FirestoreTimestamp;
  updatedAt: FirestoreTimestamp;
  shippingDetails?: ShippingDetails;
  couponCode?: string | null;
  discount?: number;
  paidAmount?: number;
  orderNumber?: string;
}

export default function AdminOrders() {
  const navigate = useNavigate();
  const { isAdmin, user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [paymentStatusUpdating, setPaymentStatusUpdating] = useState<string | null>(null);
  const [deletingOrder, setDeletingOrder] = useState<string | null>(null);

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

  // Fetch orders
  useEffect(() => {
    if (!isAdmin) return;

    const ordersQuery = query(collection(db, 'orders'));
    const unsubscribe = onSnapshot(ordersQuery, (snapshot) => {
      const ordersData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Order[];
      setOrders(
        ordersData.sort(
          (a, b) =>
            (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0)
        )
      );
      setLoading(false);
    });

    return () => unsubscribe();
  }, [isAdmin]);

  const filteredOrders = orders.filter(
    (order) =>
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (order.userEmail || '')
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      (order.shippingAddress?.phone || '').includes(searchTerm) ||
      (order.shippingAddress?.fullName || '')
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      (order.shippingAddress?.pincode || '').includes(searchTerm)
  );

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const updatePaymentStatus = async (orderId: string, paymentStatus: string) => {
    setPaymentStatusUpdating(orderId);
    try {
      const orderRef = doc(db, 'orders', orderId);
      await updateDoc(orderRef, {
        paymentStatus,
        updatedAt: serverTimestamp()
      });
    } catch (err) {
      console.error('Failed to update payment status:', err);
      alert('Failed to update payment status. Please try again.');
    } finally {
      setPaymentStatusUpdating(null);
    }
  };

  const deleteOrder = async (order: Order) => {
    const label = order.orderNumber || `#${order.id.slice(-8).toUpperCase()}`;
    if (!window.confirm(`Delete order ${label}? This cannot be undone.`)) return;
    setDeletingOrder(order.id);
    try {
      // Delete from orders collection
      await deleteDoc(doc(db, 'orders', order.id));
      // Also delete from affiliateOrders if it exists
      if (order.orderNumber) {
        const affQuery = query(
          collection(db, 'affiliateOrders'),
          where('orderNumber', '==', order.orderNumber),
          limit(10)
        );
        const affSnap = await getDocs(affQuery);
        affSnap.forEach((d) => deleteDoc(d.ref));
      }
      // Close dialog if this order was selected
      setSelectedOrder(null);
    } catch (err) {
      console.error('Failed to delete order:', err);
      alert('Failed to delete order. Please try again.');
    } finally {
      setDeletingOrder(null);
    }
  };

  const exportToCSV = () => {
    const headers = [
      'Order ID',
      'Date',
      'Customer Name',
      'Email',
      'Phone',
      'Address',
      'City',
      'State',
      'Pincode',
      'Payment Method',
      'Payment Status',
      'Transaction ID',
      'Items',
      'Subtotal',
      'Shipping',
      'COD Charge',
      'Total',
      'Order Status',
      'Courier',
      'AWB',
    ];

    const rows = filteredOrders.map((order) => [
      order.id,
      order.createdAt?.toDate?.().toLocaleString('en-IN') || 'N/A',
      order.shippingAddress?.fullName || '',
      order.userEmail || '',
      order.shippingAddress?.phone || '',
      `${order.shippingAddress?.addressLine1 || ''}${
        order.shippingAddress?.addressLine2
          ? ', ' + order.shippingAddress.addressLine2
          : ''
      }${order.shippingAddress?.landmark ? ' (Landmark: ' + order.shippingAddress.landmark + ')' : ''}`,
      order.shippingAddress?.city || '',
      order.shippingAddress?.state || '',
      order.shippingAddress?.pincode || '',
      order.paymentMethod || '',
      order.paymentStatus || '',
      order.txnid || '',
      order.items?.map((i) => `${i.name} x${i.quantity}`).join('; ') || '',
      order.subtotal || 0,
      order.shipping || 0,
      order.codCharge || 0,
      order.total || 0,
      order.status || '',
      order.shippingDetails?.courier || '',
      order.shippingDetails?.awb || '',
    ]);

    const csvContent =
      headers.join(',') +
      '\n' +
      rows.map((r) => r.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `orders_export_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
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

  if (loading) {
    return (
      <div className="min-h-screen bg-sugan-bone flex items-center justify-center">
        <div className="text-sugan-ink font-body">Loading orders...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sugan-bone pt-24 pb-8">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/admin')}
              className="font-body border-sugan-ink/20"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back
            </Button>
            <div>
              <h1 className="font-display text-3xl text-sugan-ink">
                All Orders Record
              </h1>
              <p className="font-body text-sugan-ink/60 mt-1">
                Complete order history with all details
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={exportToCSV}
              className="font-body border-sugan-ink/20"
            >
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
          </div>
        </div>

        {/* Search */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-sugan-ink/40" />
              <Input
                placeholder="Search by order ID, email, phone, name, pincode..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 font-body"
              />
            </div>
          </CardContent>
        </Card>

        {/* Orders Table */}
        <Card>
          <CardHeader>
            <CardTitle className="font-display text-xl text-sugan-ink">
              Orders ({filteredOrders.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1000px]">
                <thead>
                  <tr className="border-b border-sugan-ink/10">
                    <th className="text-left py-3 px-3 font-body text-sm text-sugan-ink/60">
                      Order #
                    </th>
                    <th className="text-left py-3 px-3 font-body text-sm text-sugan-ink/60">
                      Date
                    </th>
                    <th className="text-left py-3 px-3 font-body text-sm text-sugan-ink/60">
                      Customer
                    </th>
                    <th className="text-left py-3 px-3 font-body text-sm text-sugan-ink/60">
                      Contact
                    </th>
                    <th className="text-left py-3 px-3 font-body text-sm text-sugan-ink/60">
                      Address
                    </th>
                    <th className="text-left py-3 px-3 font-body text-sm text-sugan-ink/60">
                      Items
                    </th>
                    <th className="text-left py-3 px-3 font-body text-sm text-sugan-ink/60">
                      Payment
                    </th>
                    <th className="text-right py-3 px-3 font-body text-sm text-sugan-ink/60">
                      Total
                    </th>
                    <th className="text-center py-3 px-3 font-body text-sm text-sugan-ink/60">
                      Status
                    </th>
                    <th className="text-right py-3 px-3 font-body text-sm text-sugan-ink/60">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order) => (
                    <tr
                      key={order.id}
                      className="border-b border-sugan-ink/5 hover:bg-sugan-ink/5 cursor-pointer transition-colors"
                      onClick={() => setSelectedOrder(order)}
                    >
                      <td className="py-3 px-3">
                        <span className="font-body text-sm font-medium text-sugan-ink">
                          #{order.id.slice(-8).toUpperCase()}
                        </span>
                      </td>
                      <td className="py-3 px-3">
                        <span className="font-body text-xs text-sugan-ink/60">
                          {order.createdAt?.toDate?.().toLocaleDateString(
                            'en-IN',
                            {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                            }
                          ) || 'N/A'}
                        </span>
                      </td>
                      <td className="py-3 px-3">
                        <div>
                          <p className="font-body text-sm text-sugan-ink font-medium">
                            {order.shippingAddress?.fullName || 'N/A'}
                          </p>
                          <p className="font-body text-xs text-sugan-ink/50">
                            {order.userEmail}
                          </p>
                        </div>
                      </td>
                      <td className="py-3 px-3">
                        <span className="font-body text-sm text-sugan-ink/70">
                          {order.shippingAddress?.phone || 'N/A'}
                        </span>
                      </td>
                      <td className="py-3 px-3 max-w-[200px]">
                        <p className="font-body text-xs text-sugan-ink/60 truncate">
                          {order.shippingAddress?.addressLine1}
                          {order.shippingAddress?.addressLine2 &&
                            `, ${order.shippingAddress.addressLine2}`}
                          , {order.shippingAddress?.city},{' '}
                          {order.shippingAddress?.state} -{' '}
                          {order.shippingAddress?.pincode}
                        </p>
                      </td>
                      <td className="py-3 px-3">
                        <span className="font-body text-xs text-sugan-ink/60">
                          {order.items?.length || 0} items
                        </span>
                      </td>
                      <td className="py-3 px-3">
                        <div className="flex flex-col gap-1">
                          <Badge
                            className={`${getPaymentStatusColor(
                              order.paymentStatus
                            )} font-body text-xs w-fit`}
                          >
                            {order.paymentMethod}
                          </Badge>
                          <select
                            value={order.paymentStatus}
                            onChange={(e) => {
                              e.stopPropagation();
                              updatePaymentStatus(order.id, e.target.value);
                            }}
                            disabled={paymentStatusUpdating === order.id}
                            className="font-body text-xs bg-white border border-sugan-ink/20 rounded px-2 py-1 capitalize focus:outline-none focus:border-sugan-gold disabled:opacity-50"
                          >
                            <option value="pending">Pending</option>
                            <option value="paid">Paid</option>
                            <option value="cod_pending">COD Pending</option>
                            <option value="failed">Failed</option>
                          </select>
                        </div>
                      </td>
                      <td className="py-3 px-3 text-right">
                        <span className="font-body text-sm font-semibold text-sugan-ink">
                          ₹{order.total?.toLocaleString()}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-center">
                        <Badge
                          className={`${getStatusColor(
                            order.status
                          )} font-body capitalize text-xs`}
                        >
                          {order.status}
                        </Badge>
                      </td>
                      <td className="py-3 px-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="font-body text-xs"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedOrder(order);
                            }}
                          >
                            View
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="font-body text-xs border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                            disabled={deletingOrder === order.id}
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteOrder(order);
                            }}
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredOrders.length === 0 && (
                    <tr>
                      <td
                        colSpan={10}
                        className="text-center py-12 text-sugan-ink/60 font-body"
                      >
                        <Package className="w-12 h-12 text-sugan-ink/20 mx-auto mb-4" />
                        No orders found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-4">
              {filteredOrders.map((order) => (
                <div
                  key={order.id}
                  className="bg-white border border-sugan-ink/10 rounded-lg p-4 space-y-3"
                  onClick={() => setSelectedOrder(order)}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-body text-sm font-medium text-sugan-ink">
                      #{order.id.slice(-8).toUpperCase()}
                    </span>
                    <Badge className={`${getStatusColor(order.status)} font-body capitalize text-xs`}>
                      {order.status}
                    </Badge>
                  </div>
                  <div className="space-y-1">
                    <p className="font-body text-sm text-sugan-ink">
                      {order.shippingAddress?.fullName || 'N/A'}
                    </p>
                    <p className="font-body text-xs text-sugan-ink/50">
                      {order.userEmail}
                    </p>
                    <p className="font-body text-xs text-sugan-ink/50">
                      {order.shippingAddress?.phone}
                    </p>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-sugan-ink/10">
                    <div className="flex flex-col gap-1">
                      <Badge className={`${getPaymentStatusColor(order.paymentStatus)} font-body text-xs w-fit`}>
                        {order.paymentMethod}
                      </Badge>
                      <select
                        value={order.paymentStatus}
                        onChange={(e) => {
                          e.stopPropagation();
                          updatePaymentStatus(order.id, e.target.value);
                        }}
                        disabled={paymentStatusUpdating === order.id}
                        className="font-body text-xs bg-white border border-sugan-ink/20 rounded px-2 py-1 capitalize focus:outline-none focus:border-sugan-gold disabled:opacity-50"
                      >
                        <option value="pending">Pending</option>
                        <option value="paid">Paid</option>
                        <option value="cod_pending">COD Pending</option>
                        <option value="failed">Failed</option>
                      </select>
                    </div>
                    <span className="font-body text-sm font-semibold text-sugan-ink">
                      ₹{order.total?.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="font-body text-xs text-sugan-ink/40">
                      {order.createdAt?.toDate?.().toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                      }) || 'N/A'}
                    </p>
                    <Button
                      size="sm"
                      variant="outline"
                      className="font-body text-xs border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                      disabled={deletingOrder === order.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteOrder(order);
                      }}
                    >
                      <Trash2 className="w-3 h-3 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
              {filteredOrders.length === 0 && (
                <div className="text-center py-12 text-sugan-ink/60 font-body">
                  <Package className="w-12 h-12 text-sugan-ink/20 mx-auto mb-4" />
                  No orders found
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Order Detail Dialog */}
      <Dialog
        open={!!selectedOrder}
        onOpenChange={() => setSelectedOrder(null)}
      >
        <DialogContent className="max-w-full md:max-w-5xl max-h-[95vh] overflow-y-auto p-4 md:p-8 w-full md:w-auto">
          <DialogHeader>
            <DialogTitle className="font-display text-xl text-sugan-ink">
              Order Details
            </DialogTitle>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-8 mt-2">
              {/* Order Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-sugan-ink/10">
                <div>
                  <div className="flex items-center gap-2">
                    <Hash className="w-4 h-4 text-sugan-ink/40" />
                    <span className="font-body text-sm text-sugan-ink/60">
                      Order #{selectedOrder.id.slice(-8).toUpperCase()}
                    </span>
                    <button
                      onClick={() =>
                        handleCopy(
                          selectedOrder.id.slice(-8).toUpperCase(),
                          'orderId'
                        )
                      }
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
                      {selectedOrder.createdAt?.toDate?.().toLocaleString(
                        'en-IN',
                        {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        }
                      ) || 'Date not available'}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Badge
                    className={`${getStatusColor(
                      selectedOrder.status
                    )} font-body capitalize`}
                  >
                    {selectedOrder.status}
                  </Badge>
                  <Badge
                    className={`${getPaymentStatusColor(
                      selectedOrder.paymentStatus
                    )} font-body capitalize`}
                  >
                    {selectedOrder.paymentStatus}
                  </Badge>
                </div>
              </div>

              {/* Customer & Address */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="bg-sugan-bone/50 rounded-lg p-5">
                  <h4 className="font-body font-medium text-sugan-ink mb-4 flex items-center gap-2">
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
                      {selectedOrder.shippingAddress?.city},{' '}
                      {selectedOrder.shippingAddress?.state} -{' '}
                      {selectedOrder.shippingAddress?.pincode}
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
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <p className="font-body text-xs text-sugan-ink/50">
                      Method
                    </p>
                    <p className="font-body text-sm text-sugan-ink font-medium">
                      {selectedOrder.paymentMethod}
                    </p>
                  </div>
                  <div>
                    <p className="font-body text-xs text-sugan-ink/50">
                      Status
                    </p>
                    <p className="font-body text-sm text-sugan-ink font-medium capitalize">
                      {selectedOrder.paymentStatus}
                    </p>
                  </div>
                  <div className="sm:col-span-2">
                    <p className="font-body text-xs text-sugan-ink/50">
                      Transaction ID
                    </p>
                    <p className="font-body text-sm text-sugan-ink font-medium break-all">
                      {selectedOrder.txnid || 'N/A'}
                    </p>
                  </div>
                  <div>
                    <p className="font-body text-xs text-sugan-ink/50">
                      Total Paid
                    </p>
                    <p className="font-body text-sm text-sugan-ink font-medium">
                      ₹{selectedOrder.paidAmount?.toLocaleString() || selectedOrder.total?.toLocaleString()}
                    </p>
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
                    <div
                      key={idx}
                      className="flex items-center gap-4 bg-sugan-bone/50 p-3 rounded-lg"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <p className="font-body text-sm font-medium text-sugan-ink">
                          {item.name}
                        </p>
                        <p className="font-body text-xs text-sugan-ink/50">
                          SKU: {item.productId}
                        </p>
                        <p className="font-body text-xs text-sugan-ink/60">
                          Qty: {item.quantity} × ₹
                          {item.price?.toLocaleString()}
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
              <div className="bg-sugan-bone/50 rounded-lg p-4">
                <h4 className="font-body font-medium text-sugan-ink mb-3">
                  Order Summary
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between font-body text-sm text-sugan-ink/60">
                    <span>Subtotal</span>
                    <span>₹{selectedOrder.subtotal?.toLocaleString()}</span>
                  </div>
                  {(selectedOrder.discount ?? 0) > 0 && (
                    <div className="flex justify-between font-body text-sm text-green-600">
                      <span>Discount {selectedOrder.couponCode ? `(${selectedOrder.couponCode})` : ''}</span>
                      <span>-₹{selectedOrder.discount?.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-body text-sm text-sugan-ink/60">
                    <span>Shipping</span>
                    <span>
                      {selectedOrder.shipping === 0
                        ? 'FREE'
                        : `₹${selectedOrder.shipping}`}
                    </span>
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
                      <p className="font-body text-xs text-sugan-ink/50">
                        Courier
                      </p>
                      <p className="font-body text-sm text-sugan-ink font-medium">
                        {selectedOrder.shippingDetails.courier}
                      </p>
                    </div>
                    <div>
                      <p className="font-body text-xs text-sugan-ink/50">
                        AWB Number
                      </p>
                      <p className="font-body text-sm text-sugan-ink font-medium">
                        {selectedOrder.shippingDetails.awb || 'N/A'}
                      </p>
                    </div>
                    <div>
                      <p className="font-body text-xs text-sugan-ink/50">
                        Shipment ID
                      </p>
                      <p className="font-body text-sm text-sugan-ink font-medium">
                        {selectedOrder.shippingDetails.shipmentId || 'N/A'}
                      </p>
                    </div>
                    {selectedOrder.shippingDetails.label && (
                      <div>
                        <p className="font-body text-xs text-sugan-ink/50">
                          Label
                        </p>
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
  );
}
