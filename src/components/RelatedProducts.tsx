import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { allProducts } from '@/data/rooms';
import type { Product } from '@/types';

interface RelatedProductsProps {
  currentProduct: Product;
}

export default function RelatedProducts({ currentProduct }: RelatedProductsProps) {
  const relatedProducts = useMemo(() => {
    // Find products in the same category/room, excluding current product
    const sameCategory = allProducts.filter(
      p => p.id !== currentProduct.id && 
      (p.category === currentProduct.category || p.room === currentProduct.room)
    );
    
    // If not enough in same category, add products from other categories
    if (sameCategory.length < 4) {
      const otherProducts = allProducts.filter(
        p => p.id !== currentProduct.id && !sameCategory.includes(p)
      );
      return [...sameCategory, ...otherProducts].slice(0, 8);
    }
    
    return sameCategory.slice(0, 8);
  }, [currentProduct]);

  if (relatedProducts.length === 0) return null;

  return (
    <section className="py-12 bg-sugan-cream border-t border-sugan-brown/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-display text-2xl text-sugan-brown mb-8 text-center">
          Customers Also Viewed
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
          {relatedProducts.map((product) => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="p-3">
                <p className="text-xs text-sugan-gold font-body uppercase mb-1">{product.category}</p>
                <h3 className="font-body text-sm text-sugan-brown line-clamp-2 group-hover:text-sugan-gold transition-colors">
                  {product.name}
                </h3>
                <p className="font-display text-sugan-brown font-semibold mt-1">
                  ₹{product.price.toLocaleString()}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
