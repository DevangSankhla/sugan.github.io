import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Check } from 'lucide-react';
import { allProducts } from '@/data/rooms';
import type { Product } from '@/types';

interface CompleteTheLookProps {
  currentProduct: Product;
}

export default function CompleteTheLook({ currentProduct }: CompleteTheLookProps) {
  const suggestions = useMemo(() => {
    // Find complementary products based on room and category
    const roomProducts = allProducts.filter(
      p => p.room === currentProduct.room && p.id !== currentProduct.id
    );
    
    // Get products from same category
    const categoryProducts = roomProducts.filter(
      p => p.category === currentProduct.category
    ).slice(0, 2);
    
    // Get products from different categories in same room
    const otherCategoryProducts = roomProducts
      .filter(p => p.category !== currentProduct.category)
      .slice(0, 2);
    
    return [...categoryProducts, ...otherCategoryProducts].slice(0, 3);
  }, [currentProduct]);

  if (suggestions.length === 0) return null;

  const totalPrice = suggestions.reduce((sum, p) => sum + p.price, currentProduct.price);
  const savings = Math.floor(totalPrice * 0.1); // 10% bundle discount

  return (
    <div className="bg-sugan-cream rounded-2xl p-6">
      <h3 className="font-display text-xl text-sugan-brown mb-4">Complete the Look</h3>
      <p className="text-sugan-brown/60 font-body text-sm mb-6">
        Frequently bought together with this item
      </p>

      <div className="space-y-4">
        {/* Current Product */}
        <div className="flex items-center gap-4 p-3 bg-white rounded-lg">
          <div className="w-16 h-16 bg-sugan-cream-dark rounded-lg overflow-hidden flex-shrink-0">
            <img
              src={currentProduct.image}
              alt={currentProduct.name}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-sugan-gold font-body uppercase">Current Item</p>
            <h4 className="font-body text-sm text-sugan-brown truncate">{currentProduct.name}</h4>
            <p className="font-display text-sugan-brown">₹{currentProduct.price.toLocaleString()}</p>
          </div>
          <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
        </div>

        {/* Plus Divider */}
        <div className="flex items-center justify-center">
          <Plus className="w-5 h-5 text-sugan-brown/30" />
        </div>

        {/* Suggested Products */}
        {suggestions.map((product) => (
          <Link
            key={product.id}
            to={`/product/${product.id}`}
            className="flex items-center gap-4 p-3 bg-white rounded-lg hover:shadow-md transition-shadow group"
          >
            <div className="w-16 h-16 bg-sugan-cream-dark rounded-lg overflow-hidden flex-shrink-0">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                loading="lazy"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-sugan-brown/50 font-body uppercase">{product.category}</p>
              <h4 className="font-body text-sm text-sugan-brown truncate group-hover:text-sugan-gold transition-colors">
                {product.name}
              </h4>
              <p className="font-display text-sugan-brown">₹{product.price.toLocaleString()}</p>
            </div>
          </Link>
        ))}

        {/* Bundle Summary */}
        <div className="border-t border-sugan-brown/10 pt-4 mt-4">
          <div className="flex items-center justify-between mb-2">
            <span className="font-body text-sugan-brown/60">Bundle Price:</span>
            <span className="font-display text-xl text-sugan-brown">₹{totalPrice.toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-between mb-4">
            <span className="font-body text-green-600 text-sm">You save:</span>
            <span className="font-body text-green-600">₹{savings.toLocaleString()}</span>
          </div>
          <button className="w-full bg-sugan-brown text-sugan-cream py-3 rounded-lg font-body hover:bg-sugan-brown/90 transition-colors">
            Add All to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
