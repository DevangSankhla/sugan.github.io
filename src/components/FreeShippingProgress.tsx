import { useCart } from '@/context/CartContext';

interface FreeShippingProgressProps {
  onClose?: () => void;
  showClose?: boolean;
}

export default function FreeShippingProgress({ }: FreeShippingProgressProps) {
  const { totalPrice } = useCart();
  if (totalPrice === 0) return null;

  return (
    <div className="flex items-center gap-2 text-eyebrow font-body uppercase text-sugan-ink-soft">
      <span className="block w-1.5 h-1.5 rounded-full bg-sugan-gold" aria-hidden="true" />
      Free shipping on every order
    </div>
  );
}
