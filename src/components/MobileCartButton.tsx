import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function MobileCartButton() {
  const { totalItems, setIsCartOpen } = useCart();

  return (
    <button
      onClick={() => setIsCartOpen(true)}
      className="md:hidden fixed bottom-4 right-4 z-40 w-14 h-14 bg-sugan-brown rounded-full shadow-lg flex items-center justify-center"
      aria-label="Open cart"
    >
      <ShoppingCart className="w-6 h-6 text-sugan-cream" />
      {totalItems > 0 && (
        <span className="absolute -top-1 -right-1 w-5 h-5 bg-sugan-gold text-white text-xs rounded-full flex items-center justify-center font-medium">
          {totalItems}
        </span>
      )}
    </button>
  );
}
