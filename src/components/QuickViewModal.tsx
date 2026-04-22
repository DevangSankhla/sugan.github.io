import { X, ShoppingCart, Star } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import type { Product } from '@/types';

interface QuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function QuickViewModal({ product, isOpen, onClose }: QuickViewModalProps) {
  const { addToCart, setIsCartOpen } = useCart();
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  if (!isOpen || !product) return null;

  const handleAddToCart = () => {
    if (!user) {
      onClose();
      navigate(`/login?redirect=${encodeURIComponent(`/product/${product.id}`)}`);
      return;
    }
    addToCart(product);
    onClose();
    setIsCartOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-sugan-brown/60 backdrop-blur-sm">
      <div className="bg-sugan-cream rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
          {/* Image */}
          <div className="aspect-square bg-sugan-cream-dark rounded-xl overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>

          {/* Content */}
          <div className="flex flex-col">
            <button
              onClick={onClose}
              className="self-end p-2 hover:bg-sugan-brown/10 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-sugan-brown" />
            </button>

            <p className="text-sugan-gold text-xs font-body uppercase tracking-wider mb-2">
              {product.category}
            </p>

            <h2 className="font-display text-2xl text-sugan-brown mb-2">
              {product.name}
            </h2>

            {product.rating && (
              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating || 0)
                          ? 'fill-sugan-gold text-sugan-gold'
                          : 'text-sugan-brown/20'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-sugan-brown/60 font-body">
                  ({product.reviews} reviews)
                </span>
              </div>
            )}

            <p className="font-display text-2xl text-sugan-brown mb-4">
              ₹{product.price.toLocaleString()}
            </p>

            <p className="text-sugan-brown/70 font-body text-sm mb-6 line-clamp-3">
              {product.description}
            </p>

            {/* Size variants if available */}
            {product.relatedSizes && product.relatedSizes.length > 0 && (
              <div className="mb-4">
                <p className="text-sm font-medium text-sugan-brown mb-2">Available Sizes:</p>
                <div className="flex flex-wrap gap-2">
                  {[...product.relatedSizes, { 
                    size: product.name.match(/(Small|Medium|Large|Extra Small)/)?.[0] || 'Current', 
                    productId: product.id, 
                    price: product.price 
                  }]
                    .sort((a, b) => a.price - b.price)
                    .map((variant, idx) => (
                      <span
                        key={idx}
                        className={`px-3 py-1 rounded-lg text-xs font-body ${
                          variant.productId === product.id
                            ? 'bg-sugan-gold text-white'
                            : 'bg-sugan-brown/10 text-sugan-brown'
                        }`}
                      >
                        {variant.size}
                      </span>
                    ))}
                </div>
              </div>
            )}

            <div className="flex gap-3 mt-auto">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-sugan-brown text-sugan-cream py-3 px-6 rounded-lg font-body hover:bg-sugan-brown/90 transition-colors flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-4 h-4" />
                Add to Cart
              </button>
              <Link
                to={`/product/${product.id}`}
                state={{ from: location.pathname }}
                onClick={onClose}
                className="flex-1 border-2 border-sugan-brown text-sugan-brown py-3 px-6 rounded-lg font-body hover:bg-sugan-brown hover:text-sugan-cream transition-colors text-center"
              >
                View Details
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
