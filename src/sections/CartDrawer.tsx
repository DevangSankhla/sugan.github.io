import { X, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import FreeShippingProgress from '@/components/FreeShippingProgress';

export default function CartDrawer() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const {
    items,
    removeFromCart,
    updateQuantity,
    totalItems,
    totalPrice,
    isCartOpen,
    setIsCartOpen,
  } = useCart();

  if (!isCartOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-sugan-ink/40 backdrop-blur-xl z-50 transition-opacity duration-400 ease-apple"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Drawer */}
      <aside
        className="fixed right-0 top-0 h-full w-full sm:w-[440px] bg-sugan-bone z-50 shadow-lift flex flex-col"
        aria-label="Shopping bag"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-sugan-ink/10">
          <div className="flex items-center gap-3">
            <p className="text-eyebrow font-body uppercase text-sugan-ink-soft">Bag</p>
            {totalItems > 0 && (
              <span className="font-body text-body-sm text-sugan-ink tabular-nums">
                [{totalItems}]
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={() => setIsCartOpen(false)}
            className="text-sugan-ink-soft hover:text-sugan-ink transition-colors"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full px-8 text-center gap-6">
              <ShoppingBag className="w-8 h-8 text-sugan-ink/30" strokeWidth={1.25} />
              <h3 className="font-display text-display-md font-light text-sugan-ink">
                Your bag is empty.
              </h3>
              <p className="font-body text-body text-sugan-ink-soft max-w-xs">
                Browse the collection and add a piece you'd like to keep for a long time.
              </p>
              <button
                type="button"
                onClick={() => {
                  setIsCartOpen(false);
                  navigate('/shop');
                }}
                className="btn-outline"
              >
                Start browsing
              </button>
            </div>
          ) : (
            <ul className="divide-y divide-sugan-ink/10">
              {items.map((item) => (
                <li key={item.id} className="flex gap-5 px-8 py-6">
                  {/* Image */}
                  <div className="w-20 h-24 bg-sugan-bone-dark overflow-hidden flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0 flex flex-col gap-2">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        {item.category && (
                          <p className="text-eyebrow font-body uppercase text-sugan-ink/40 truncate">
                            {item.category}
                          </p>
                        )}
                        <h4 className="font-body text-[15px] text-sugan-ink line-clamp-2 mt-1">
                          {item.name}
                        </h4>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        className="text-sugan-ink/40 hover:text-sugan-ink transition-colors flex-shrink-0"
                        aria-label="Remove item"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-auto">
                      {/* Quantity stepper - hairline border, no fill */}
                      <div className="inline-flex items-center border border-sugan-ink/20 rounded-pill">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 inline-flex items-center justify-center text-sugan-ink hover:text-sugan-gold transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center font-body text-body-sm tabular-nums text-sugan-ink">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 inline-flex items-center justify-center text-sugan-ink hover:text-sugan-gold transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="font-body text-[15px] text-sugan-ink tabular-nums">
                        ₹{(item.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-sugan-ink/10 px-8 py-6 space-y-5">
            <FreeShippingProgress />

            <div className="flex items-center justify-between">
              <span className="text-eyebrow font-body uppercase text-sugan-ink-soft">
                Subtotal
              </span>
              <span className="font-body text-display-md font-light text-sugan-ink tabular-nums">
                ₹{totalPrice.toLocaleString()}
              </span>
            </div>
            <p className="text-eyebrow font-body uppercase text-sugan-ink/40">
              Shipping at checkout
            </p>

            <div className="flex flex-col gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  setIsCartOpen(false);
                  navigate(user ? '/checkout' : '/login?redirect=/checkout');
                }}
                className="btn-primary w-full tabular-nums"
              >
                {user ? 'Checkout' : 'Sign in to checkout'} · ₹{totalPrice.toLocaleString()}
              </button>
              <button
                onClick={() => setIsCartOpen(false)}
                className="btn-ghost self-center"
              >
                Continue browsing
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
