import { useState } from 'react';
import { Tag, Check, X } from 'lucide-react';

interface CouponCodeProps {
  subtotal: number;
  onApplyCoupon: (discount: number, code: string) => void;
  onRemoveCoupon: () => void;
  appliedCoupon: string | null;
  discountAmount: number;
}

const AVAILABLE_COUPONS = [
  { code: 'FIRST10', discount: 10, type: 'percent', minOrder: 0, description: '10% off your first order' },
  { code: 'SUGAN5', discount: 5, type: 'percent', minOrder: 0, description: '5% off any order' },
  { code: 'SAVE100', discount: 100, type: 'fixed', minOrder: 999, description: '₹100 off on orders above ₹999' },
  { code: 'SAVE250', discount: 250, type: 'fixed', minOrder: 1999, description: '₹250 off on orders above ₹1999' },
];

export default function CouponCode({ 
  subtotal, 
  onApplyCoupon, 
  onRemoveCoupon, 
  appliedCoupon, 
  discountAmount 
}: CouponCodeProps) {
  const [code, setCode] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [showCoupons, setShowCoupons] = useState(false);

  const handleApply = () => {
    setError(null);
    setSuccess(null);

    const coupon = AVAILABLE_COUPONS.find(c => c.code.toUpperCase() === code.trim().toUpperCase());
    
    if (!coupon) {
      setError('Invalid coupon code');
      return;
    }

    if (subtotal < coupon.minOrder) {
      setError(`Minimum order amount is ₹${coupon.minOrder} for this coupon`);
      return;
    }

    const discount = coupon.type === 'percent' 
      ? Math.round((subtotal * coupon.discount) / 100)
      : coupon.discount;

    onApplyCoupon(discount, coupon.code);
    setSuccess(`Coupon applied! You saved ₹${discount.toLocaleString()}`);
    setCode('');
  };

  const handleRemove = () => {
    onRemoveCoupon();
    setCode('');
    setError(null);
    setSuccess(null);
  };

  return (
    <div className="border border-sugan-brown/10 rounded-xl p-4 mb-4">
      <h3 className="font-body font-medium text-sugan-brown mb-3 flex items-center gap-2">
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
              className="flex-1 px-3 py-2 border border-sugan-brown/20 rounded-lg font-body text-sm focus:outline-none focus:border-sugan-gold uppercase"
            />
            <button
              onClick={handleApply}
              disabled={!code.trim()}
              className="px-4 py-2 bg-sugan-brown text-sugan-cream rounded-lg font-body text-sm hover:bg-sugan-brown/90 transition-colors disabled:opacity-50"
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
                  className="p-3 bg-sugan-cream/50 rounded-lg cursor-pointer hover:bg-sugan-cream transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-body text-sm font-medium text-sugan-brown">{coupon.code}</span>
                    <span className="text-xs text-sugan-gold font-body">
                      {coupon.type === 'percent' ? `${coupon.discount}% OFF` : `₹${coupon.discount} OFF`}
                    </span>
                  </div>
                  <p className="text-xs text-sugan-brown/60 font-body">{coupon.description}</p>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
