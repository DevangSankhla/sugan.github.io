import { X, Plus, Minus, ShoppingBag, ArrowRight, CreditCard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';

export default function CartDrawer() {
  const navigate = useNavigate();
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
        className="fixed inset-0 bg-sugan-brown/50 backdrop-blur-sm z-50 transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full sm:w-[420px] bg-sugan-cream z-50 shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-sugan-brown/10">
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-5 h-5 text-sugan-gold" />
            <h2 className="font-display text-xl font-medium text-sugan-brown">
              Your Cart
            </h2>
            {totalItems > 0 && (
              <span className="bg-sugan-gold text-white text-xs px-2 py-0.5 rounded-full">
                {totalItems}
              </span>
            )}
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="w-10 h-10 rounded-full bg-sugan-brown/5 flex items-center justify-center text-sugan-brown hover:bg-sugan-brown/10 transition-colors"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full p-8 text-center">
              <div className="w-20 h-20 bg-sugan-brown/5 rounded-full flex items-center justify-center mb-4">
                <ShoppingBag className="w-10 h-10 text-sugan-brown/30" />
              </div>
              <h3 className="font-display text-xl text-sugan-brown mb-2">
                Your cart is empty
              </h3>
              <p className="text-sugan-brown/60 font-body text-sm mb-6">
                Discover our beautiful handcrafted wooden products
              </p>
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  document
                    .getElementById('products')
                    ?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="btn-primary"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <div className="p-6 space-y-6">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 bg-white p-4 rounded-lg"
                >
                  {/* Image */}
                  <div className="w-20 h-20 bg-sugan-cream-dark rounded overflow-hidden flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-sugan-gold text-xs font-body uppercase tracking-wider">
                          {item.category}
                        </p>
                        <h4 className="font-display text-base font-medium text-sugan-brown truncate">
                          {item.name}
                        </h4>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-sugan-brown/40 hover:text-sugan-brown transition-colors"
                        aria-label="Remove item"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      {/* Quantity */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="w-7 h-7 rounded bg-sugan-cream flex items-center justify-center text-sugan-brown hover:bg-sugan-brown hover:text-sugan-cream transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center font-body text-sm text-sugan-brown">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="w-7 h-7 rounded bg-sugan-cream flex items-center justify-center text-sugan-brown hover:bg-sugan-brown hover:text-sugan-cream transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Price */}
                      <span className="font-display text-base font-semibold text-sugan-brown">
                        ₹{(item.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-sugan-brown/10 p-6 space-y-4">
            {/* Subtotal */}
            <div className="flex items-center justify-between">
              <span className="text-sugan-brown/60 font-body text-sm">
                Subtotal ({totalItems} items)
              </span>
              <span className="font-display text-xl font-semibold text-sugan-brown">
                ₹{totalPrice.toLocaleString()}
              </span>
            </div>

            {/* Note */}
            <p className="text-sugan-brown/50 font-body text-xs">
              Shipping and taxes calculated at checkout
            </p>

            {/* Checkout Buttons */}
            <div className="space-y-3">
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  navigate('/checkout');
                }}
                className="w-full btn-primary flex items-center justify-center gap-2"
              >
                Proceed to Checkout
                <CreditCard className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsCartOpen(false)}
                className="w-full btn-outline flex items-center justify-center gap-2"
              >
                Continue Shopping
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Shipping Info */}
            <div className="flex items-center justify-center gap-2 pt-2">
              <svg
                className="w-5 h-5 text-sugan-gold"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
              <span className="text-sugan-brown/50 text-xs font-body">
                Free shipping on orders above ₹1999
              </span>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
