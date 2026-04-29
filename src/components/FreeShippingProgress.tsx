import { Truck, X } from 'lucide-react';
import { useCart } from '@/context/CartContext';

interface FreeShippingProgressProps {
  onClose?: () => void;
  showClose?: boolean;
}

export default function FreeShippingProgress({ onClose, showClose = false }: FreeShippingProgressProps) {
  const { totalPrice } = useCart();
  const FREE_SHIPPING_THRESHOLD = 1999;
  const progress = Math.min((totalPrice / FREE_SHIPPING_THRESHOLD) * 100, 100);
  const remaining = Math.max(FREE_SHIPPING_THRESHOLD - totalPrice, 0);

  if (totalPrice === 0) return null;

  return (
    <div className="bg-sugan-gold/10 border border-sugan-gold/20 rounded-xl p-4 mb-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Truck className="w-5 h-5 text-sugan-gold" />
          <span className="font-body text-sm text-sugan-ink font-medium">
            {remaining === 0 ? 'You got free shipping!' : 'Free Shipping Progress'}
          </span>
        </div>
        {showClose && onClose && (
          <button onClick={onClose} className="text-sugan-ink/40 hover:text-sugan-ink">
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
      
      {/* Progress Bar */}
      <div className="h-2 bg-sugan-ink/10 rounded-full overflow-hidden">
        <div 
          className="h-full bg-sugan-gold rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
      
      {/* Text */}
      <p className="text-xs text-sugan-ink/60 font-body mt-2">
        {remaining === 0 ? (
          'Your order qualifies for free shipping!'
        ) : (
          <>Add <span className="text-sugan-gold font-semibold">₹{remaining.toLocaleString()}</span> more for free shipping</>
        )}
      </p>
    </div>
  );
}
