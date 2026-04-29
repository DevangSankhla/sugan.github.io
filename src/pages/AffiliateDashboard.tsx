import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  collection, query, where, onSnapshot, orderBy,
  type Timestamp,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TrendingUp, Package, IndianRupee, Calendar, AlertCircle } from 'lucide-react';

interface AffiliateOrder {
  id: string;
  orderNumber: string;
  affiliateCode: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  paymentStatus: string;
  itemCount: number;
  itemsSummary: string;
  commissionAmount: number;
  commissionVoided: boolean;
  voidReason?: string;
  eligibilityDate?: Timestamp | null;
  commissionMonth?: string | null;
  createdAt?: Timestamp;
  deliveredAt?: Timestamp | null;
}

interface MonthlyRollup {
  id: string;            // YYYY-MM
  ordersDelivered: number;
  ordersSuccessful: number;
  commissionTotal: number;
  netPayable: number;
  status: 'pending' | 'paid';
  paidAt?: Timestamp;
}

function fmtCurrency(n: number): string {
  return `₹${(n || 0).toLocaleString('en-IN')}`;
}

function currentMonthKey(): string {
  const now = new Date();
  const ist = new Date(now.getTime() + 5.5 * 60 * 60 * 1000);
  return `${ist.getUTCFullYear()}-${String(ist.getUTCMonth() + 1).padStart(2, '0')}`;
}

function statusBadgeClass(s: string): string {
  switch (s) {
    case 'delivered': return 'bg-green-100 text-green-800';
    case 'shipped': return 'bg-blue-100 text-blue-800';
    case 'processing': return 'bg-amber-100 text-amber-800';
    case 'pending': return 'bg-gray-100 text-gray-700';
    default: return 'bg-gray-100 text-gray-700';
  }
}

export default function AffiliateDashboard() {
  const navigate = useNavigate();
  const { user, loading, isAffiliate, affiliateCode } = useAuth();
  const [orders, setOrders] = useState<AffiliateOrder[]>([]);
  const [monthly, setMonthly] = useState<MonthlyRollup[]>([]);

  useEffect(() => {
    if (loading) return;
    if (!user) navigate('/login?redirect=/affiliate');
  }, [user, loading, navigate]);

  // Subscribe to live affiliate orders
  useEffect(() => {
    if (!user?.email || !isAffiliate) return;
    const q = query(
      collection(db, 'affiliateOrders'),
      where('affiliateEmail', '==', user.email),
      orderBy('createdAt', 'desc'),
    );
    const unsub = onSnapshot(q,
      (snap) => setOrders(snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<AffiliateOrder, 'id'>) }))),
      (err) => console.error('affiliateOrders subscription error:', err),
    );
    return () => unsub();
  }, [user?.email, isAffiliate]);

  // Subscribe to settled monthly rollups
  useEffect(() => {
    if (!user?.email || !isAffiliate) return;
    const q = query(collection(db, 'affiliateMonthly', user.email, 'months'));
    const unsub = onSnapshot(q,
      (snap) => {
        const rows = snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<MonthlyRollup, 'id'>) }));
        rows.sort((a, b) => b.id.localeCompare(a.id));
        setMonthly(rows);
      },
      (err) => console.error('affiliateMonthly subscription error:', err),
    );
    return () => unsub();
  }, [user?.email, isAffiliate]);

  const stats = useMemo(() => {
    const thisMonthKey = currentMonthKey();
    let livePlaced = 0, liveDelivered = 0, liveSuccessful = 0;
    let liveCommissionGross = 0, liveCommissionPending = 0;
    let thisMonthCommission = 0;
    for (const o of orders) {
      livePlaced += 1;
      if (o.status === 'delivered') liveDelivered += 1;
      if (!o.commissionVoided) {
        if (o.commissionMonth) liveSuccessful += 1;
      }
      liveCommissionGross += o.commissionAmount || 0;
      if (!o.commissionVoided && o.commissionMonth) {
        if (o.commissionMonth === thisMonthKey) thisMonthCommission += o.commissionAmount || 0;
      }
      if (!o.commissionVoided && !o.commissionMonth && o.status !== 'delivered') {
        liveCommissionPending += o.commissionAmount || 0;
      }
    }
    return {
      livePlaced, liveDelivered, liveSuccessful,
      liveCommissionGross, liveCommissionPending, thisMonthCommission,
    };
  }, [orders]);

  if (loading) {
    return (
      <div className="min-h-screen bg-sugan-bone flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-sugan-gold border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) return null;

  if (!isAffiliate) {
    return (
      <div className="min-h-screen bg-sugan-bone pt-24 pb-12">
        <div className="max-w-md mx-auto px-4">
          <Card>
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-8 h-8 text-amber-600" />
              </div>
              <h1 className="font-display text-2xl text-sugan-ink mb-2">No affiliate code on this account</h1>
              <p className="font-body text-sugan-ink/70 mb-6">
                We don't see an active affiliate code linked to <strong>{user.email}</strong>.
                If you should have access, contact us so we can link your code.
              </p>
              <Link to="/contact">
                <Button className="bg-sugan-ink hover:bg-sugan-ink/90 font-body">
                  Contact Sugan
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sugan-bone pt-24 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between flex-wrap gap-4">
          <div>
            <h1 className="font-display text-3xl text-sugan-ink">Affiliate Dashboard</h1>
            <p className="font-body text-sugan-ink/70 mt-1">
              Code: <span className="font-mono font-semibold text-sugan-gold">{affiliateCode}</span>
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs font-body text-sugan-ink/50">Signed in as</p>
            <p className="font-body text-sugan-ink">{user.email}</p>
          </div>
        </div>

        {/* Top stat cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <StatCard icon={<TrendingUp className="w-5 h-5" />} label="This month (live)"
            value={fmtCurrency(stats.thisMonthCommission)} sub={`${currentMonthKey()} so far`} />
          <StatCard icon={<Package className="w-5 h-5" />} label="Orders placed"
            value={String(stats.livePlaced)} sub={`${stats.liveDelivered} delivered`} />
          <StatCard icon={<Calendar className="w-5 h-5" />} label="Successful"
            value={String(stats.liveSuccessful)} sub="Past 7-day return window" />
          <StatCard icon={<IndianRupee className="w-5 h-5" />} label="Pending review"
            value={fmtCurrency(stats.liveCommissionPending)} sub="Not yet delivered" />
        </div>

        {/* Live orders */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="font-display text-xl text-sugan-ink">Recent orders</CardTitle>
          </CardHeader>
          <CardContent>
            {orders.length === 0 ? (
              <p className="font-body text-sugan-ink/60 py-8 text-center">
                No orders yet with your code. Share <span className="font-mono">{affiliateCode}</span> to get started.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm font-body">
                  <thead>
                    <tr className="text-left text-sugan-ink/60 border-b border-sugan-ink/10">
                      <th className="py-2 pr-4">Order</th>
                      <th className="py-2 pr-4">Items</th>
                      <th className="py-2 pr-4">Status</th>
                      <th className="py-2 pr-4">Payment</th>
                      <th className="py-2 pr-4 text-right">Commission</th>
                      <th className="py-2 pr-4">Eligible</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((o) => (
                      <tr key={o.id} className="border-b border-sugan-ink/5">
                        <td className="py-3 pr-4 font-mono text-sugan-ink">{o.orderNumber}</td>
                        <td className="py-3 pr-4 text-sugan-ink/70">{o.itemsSummary}</td>
                        <td className="py-3 pr-4">
                          <Badge className={`${statusBadgeClass(o.status)} text-xs`}>{o.status}</Badge>
                        </td>
                        <td className="py-3 pr-4 text-sugan-ink/70">{o.paymentStatus}</td>
                        <td className="py-3 pr-4 text-right">
                          {o.commissionVoided ? (
                            <span className="line-through text-sugan-ink/40">{fmtCurrency(o.commissionAmount)}</span>
                          ) : (
                            <span className="font-medium text-sugan-ink">{fmtCurrency(o.commissionAmount)}</span>
                          )}
                          {o.commissionVoided && o.voidReason && (
                            <p className="text-[10px] text-red-500 mt-1">Voided: {o.voidReason}</p>
                          )}
                        </td>
                        <td className="py-3 pr-4 text-sugan-ink/60 text-xs">
                          {o.eligibilityDate ? o.eligibilityDate.toDate().toLocaleDateString('en-IN') : '—'}
                          {o.commissionMonth && (
                            <span className="block text-sugan-ink/40">{o.commissionMonth}</span>
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

        {/* Monthly history */}
        <Card>
          <CardHeader>
            <CardTitle className="font-display text-xl text-sugan-ink">Monthly settlements</CardTitle>
          </CardHeader>
          <CardContent>
            {monthly.length === 0 ? (
              <p className="font-body text-sugan-ink/60 py-8 text-center">
                Your first monthly settlement will appear here on the 1st of next month.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm font-body">
                  <thead>
                    <tr className="text-left text-sugan-ink/60 border-b border-sugan-ink/10">
                      <th className="py-2 pr-4">Month</th>
                      <th className="py-2 pr-4">Delivered</th>
                      <th className="py-2 pr-4">Successful</th>
                      <th className="py-2 pr-4 text-right">Commission</th>
                      <th className="py-2 pr-4 text-right">Net payable</th>
                      <th className="py-2 pr-4">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {monthly.map((m) => (
                      <tr key={m.id} className="border-b border-sugan-ink/5">
                        <td className="py-3 pr-4 font-medium text-sugan-ink">{m.id}</td>
                        <td className="py-3 pr-4 text-sugan-ink/70">{m.ordersDelivered}</td>
                        <td className="py-3 pr-4 text-sugan-ink/70">{m.ordersSuccessful}</td>
                        <td className="py-3 pr-4 text-right text-sugan-ink">{fmtCurrency(m.commissionTotal)}</td>
                        <td className="py-3 pr-4 text-right font-medium text-sugan-ink">{fmtCurrency(m.netPayable)}</td>
                        <td className="py-3 pr-4">
                          <Badge className={m.status === 'paid'
                            ? 'bg-green-100 text-green-800 text-xs'
                            : 'bg-amber-100 text-amber-800 text-xs'}>
                            {m.status}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>

        <p className="mt-8 text-xs font-body text-sugan-ink/40 text-center">
          Successful = order delivered + 7-day return window passed. Commission = 10% of listed prices.
          Customer details are private and not shown here.
        </p>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, sub }: {
  icon: React.ReactNode; label: string; value: string; sub?: string;
}) {
  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs font-body uppercase tracking-wide text-sugan-ink/50">{label}</p>
          <div className="text-sugan-gold">{icon}</div>
        </div>
        <p className="font-display text-2xl text-sugan-ink">{value}</p>
        {sub && <p className="text-xs font-body text-sugan-ink/50 mt-1">{sub}</p>}
      </CardContent>
    </Card>
  );
}
