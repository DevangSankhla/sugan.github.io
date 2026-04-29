import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { Product } from '@/types';
import { allProducts } from '@/data/rooms';

const STORAGE_KEY = 'sugan_recently_viewed';
const MAX_ITEMS = 8;

export function addToRecentlyViewed(productId: string) {
  if (typeof window === 'undefined') return;
  
  const stored = localStorage.getItem(STORAGE_KEY);
  let viewed: string[] = stored ? JSON.parse(stored) : [];
  
  // Remove if already exists (to move to front)
  viewed = viewed.filter(id => id !== productId);
  
  // Add to front
  viewed.unshift(productId);
  
  // Keep only max items
  viewed = viewed.slice(0, MAX_ITEMS);
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(viewed));
}

export default function RecentlyViewed() {
  const [recentProducts, setRecentProducts] = useState<Product[]>([]);
  const scrollRef = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const viewedIds: string[] = JSON.parse(stored);
      const products = viewedIds
        .map(id => allProducts.find(p => p.id === id))
        .filter((p): p is Product => p !== undefined);
      setRecentProducts(products);
    }
  }, []);

  if (recentProducts.length === 0) return null;

  return (
    <section className="py-12 bg-white border-t border-sugan-ink/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <h2 className="font-display text-2xl text-sugan-ink mb-6">Recently Viewed</h2>
        
        <div className="relative">
          <div 
            ref={el => scrollRef[1](el)}
            className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {recentProducts.map((product) => (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                className="flex-shrink-0 w-40 group"
              >
                <div className="aspect-square bg-sugan-bone-dark rounded-lg overflow-hidden mb-2">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <h3 className="font-body text-sm text-sugan-ink line-clamp-2 group-hover:text-sugan-gold transition-colors">
                  {product.name}
                </h3>
                <p className="font-display text-sugan-ink font-semibold text-sm">
                  ₹{product.price.toLocaleString()}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
