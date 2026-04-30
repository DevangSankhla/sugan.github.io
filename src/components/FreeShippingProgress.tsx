import { useCart } from '@/context/CartContext';

interface FreeShippingProgressProps {
  onClose?: () => void;
  showClose?: boolean;
}

export default function FreeShippingProgress({ }: FreeShippingProgressProps) {
  const { totalPrice } = useCart();
  const FREE_SHIPPING_THRESHOLD = 1999;
  const progress = Math.min((totalPrice / FREE_SHIPPING_THRESHOLD) * 100, 100);
  const remaining = Math.max(FREE_SHIPPING_THRESHOLD - totalPrice, 0);

  if (totalPrice === 0) return null;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-eyebrow font-body uppercase">
        <span className="text-sugan-ink-soft">
          {remaining === 0 ? 'Free shipping unlocked' : 'Free shipping at ₹1,999'}
        </span>
        {remaining > 0 && (
          <span className="text-sugan-ink tabular-nums">
            ₹{remaining.toLocaleString()} to go
          </span>
        )}
      </div>

      {/* Hairline track */}
      <div className="h-px w-full bg-sugan-ink/10 relative overflow-hidden">
        <div
          className="absolute inset-y-0 left-0 bg-sugan-gold transition-[width] duration-500 ease-apple"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
