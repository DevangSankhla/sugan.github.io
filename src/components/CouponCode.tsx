import { useState } from 'react';
import { Tag, Check, X } from 'lucide-react';
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/context/AuthContext';

export interface AffiliateMeta {
  code: string;
  email: string;
  commissionPercent: number;
}

interface CouponCodeProps {
  subtotal: number;
  onApplyCoupon: (discount: number, code: string, affiliate?: AffiliateMeta) => void;
  onRemoveCoupon: () => void;
  appliedCoupon: string | null;
  discountAmount: number;
}

const AVAILABLE_COUPONS = [
  { code: 'FIRST10', discount: 10, type: 'percent', minOrder: 0, description: '10% off your first order (max ₹499)' },
];

export default function CouponCode({
  subtotal,
  onApplyCoupon,
  onRemoveCoupon,
  appliedCoupon,
  discountAmount
}: CouponCodeProps) {
  const { user } = useAuth();
  const [code, setCode] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [showCoupons, setShowCoupons] = useState(false);

  const handleApply = async () => {
    setError(null);
    setSuccess(null);

    const normalized = code.trim().toUpperCase();

    if (normalized === 'LOVESUGAN') {
      if (!user) {
        setError('Please sign in to use this code');
        return;
      }
      try {
        const snap = await getDocs(
          query(collection(db, 'orders'), where('userId', '==', user.uid))
        );
        const prior = snap.docs.filter(d => d.data().status !== 'cancelled');
        const alreadyUsed = prior.some(d => d.data().couponCode === 'LOVESUGAN');
        if (alreadyUsed) {
          setError('This code has already been used on a previous order');
          return;
        }
        if (prior.length === 0) {
          setError('This code is only valid for returning customers');
          return;
        }
        if (prior.length > 1) {
          setError('This code is only valid for your second order');
          return;
        }
        const discount = Math.min(Math.round((subtotal * 15) / 100), 499);
        onApplyCoupon(discount, 'LOVESUGAN');
        setSuccess(`Coupon applied! You saved ₹${discount.toLocaleString()}`);
        setCode('');
      } catch {
        setError('Could not verify code right now — please try again');
      }
      return;
    }

    const coupon = AVAILABLE_COUPONS.find(c => c.code.toUpperCase() === normalized);

    if (coupon) {
      if (subtotal < coupon.minOrder) {
        setError(`Minimum order amount is ₹${coupon.minOrder} for this coupon`);
        return;
      }
      const rawDiscount = coupon.type === 'percent'
        ? Math.round((subtotal * coupon.discount) / 100)
        : coupon.discount;
      const discount = Math.min(rawDiscount, 499);
      onApplyCoupon(discount, coupon.code);
      setSuccess(`Coupon applied! You saved ₹${discount.toLocaleString()}`);
      setCode('');
      return;
    }

    // Unknown code - try the affiliate codes collection
    try {
      const affSnap = await getDoc(doc(db, 'affiliateCodes', normalized));
      if (!affSnap.exists()) {
        setError('Invalid coupon code');
        return;
      }
      const aff = affSnap.data() as {
        active?: boolean;
        email?: string;
        discountPercent?: number;
        commissionPercent?: number;
      };
      if (!aff.active) {
        setError('This code is no longer active');
        return;
      }
      if (!aff.email || typeof aff.discountPercent !== 'number') {
        setError('This code is misconfigured - contact support');
        return;
      }
      const discount = Math.min(Math.round((subtotal * aff.discountPercent) / 100), 499);
      const meta: AffiliateMeta = {
        code: normalized,
        email: aff.email,
        commissionPercent: typeof aff.commissionPercent === 'number' ? aff.commissionPercent : 10,
      };
      onApplyCoupon(discount, normalized, meta);
      setSuccess(`Coupon applied! You saved ₹${discount.toLocaleString()}`);
      setCode('');
    } catch (err) {
      console.error('Affiliate code lookup failed:', err);
      setError('Could not verify code right now - please try again');
    }
  };

  const handleRemove = () => {
    onRemoveCoupon();
    setCode('');
    setError(null);
    setSuccess(null);
  };

  return (
    <div className="border border-sugan-ink/10 rounded-xl p-4 mb-4">
      <h3 className="font-body font-medium text-sugan-ink mb-3 flex items-center gap-2">
        <Tag className="w-4 h-4 text-sugan-gold" />
        Apply Coupon
      </h3>

      {appliedCoupon ? (
        <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-lg p-3">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-green-600" />
            <div>
              <p className="font-body text-sm text-green-800 font-medium">{appliedCoupon}</p>
              <p className="text-xs text-green-600">Saved ₹{discountAmount.toLocaleString()}</p>
            </div>
          </div>
          <button 
            onClick={handleRemove}
            className="text-red-500 hover:text-red-700 p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <>
          <div className="flex gap-2">
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Enter coupon code"
              className="flex-1 px-3 py-2 border border-sugan-ink/20 rounded-lg font-body text-sm focus:outline-none focus:border-sugan-gold uppercase"
            />
            <button
              onClick={handleApply}
              disabled={!code.trim()}
              className="px-4 py-2 bg-sugan-ink text-sugan-bone rounded-lg font-body text-sm hover:bg-sugan-ink/90 transition-colors disabled:opacity-50"
            >
              Apply
            </button>
          </div>

          {error && (
            <p className="text-xs text-red-600 font-body mt-2">{error}</p>
          )}
          {success && (
            <p className="text-xs text-green-600 font-body mt-2">{success}</p>
          )}

          {/* Available Coupons */}
          <button
            onClick={() => setShowCoupons(!showCoupons)}
            className="text-xs text-sugan-gold font-body mt-3 hover:underline"
          >
            {showCoupons ? 'Hide available coupons' : 'View available coupons'}
          </button>

          {showCoupons && (
            <div className="mt-3 space-y-2">
              {AVAILABLE_COUPONS.filter(c => subtotal >= c.minOrder).map((coupon) => (
                <div 
                  key={coupon.code}
                  onClick={() => {
                    setCode(coupon.code);
                    setShowCoupons(false);
                  }}
                  className="p-3 bg-sugan-bone/50 rounded-lg cursor-pointer hover:bg-sugan-bone transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-body text-sm font-medium text-sugan-ink">{coupon.code}</span>
                    <span className="text-xs text-sugan-gold font-body">
                      {coupon.type === 'percent' ? `${coupon.discount}% OFF` : `₹${coupon.discount} OFF`}
                    </span>
                  </div>
                  <p className="text-xs text-sugan-ink/60 font-body">{coupon.description}</p>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
