import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShoppingCart, ExternalLink, Star } from 'lucide-react';
import { products, categories } from '@/data/products';
import { useCart } from '@/context/CartContext';
import type { Product } from '@/types';

gsap.registerPlugin(ScrollTrigger);

export default function Products() {
  const [activeCategory, setActiveCategory] = useState('all');
  const { addToCart, setIsCartOpen } = useCart();
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const filteredProducts =
    activeCategory === 'all'
      ? products
      : products.filter((p) => p.category === activeCategory);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gridRef.current?.querySelectorAll('.product-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [filteredProducts]);

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    setIsCartOpen(true);
  };

  const handleBuyOnAmazon = (amazonUrl: string) => {
    window.open(amazonUrl, '_blank');
  };

  return (
    <section
      id="products"
      ref={sectionRef}
      className="py-20 lg:py-32 bg-sugan-cream section-padding"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-12">
          <div>
            <p className="text-sugan-gold font-body text-sm tracking-[0.2em] uppercase mb-3">
              Our Collection
            </p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-light text-sugan-brown">
              Featured <span className="font-medium">Products</span>
            </h2>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mt-6 lg:mt-0">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 text-sm font-body transition-all duration-300 rounded-full ${
                  activeCategory === cat.id
                    ? 'bg-sugan-brown text-sugan-cream'
                    : 'bg-white text-sugan-brown hover:bg-sugan-brown/10'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8"
        >
          {filteredProducts.map((product) => (
            <div key={product.id} className="product-card">
              {/* Image */}
              <div className="relative aspect-square overflow-hidden bg-sugan-cream-dark">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {product.originalPrice && (
                  <span className="absolute top-3 left-3 bg-sugan-gold text-white text-xs font-body px-2 py-1 rounded">
                    Sale
                  </span>
                )}
                {/* Quick Actions */}
                <div className="absolute inset-0 bg-sugan-brown/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-sugan-brown hover:bg-sugan-gold hover:text-white transition-colors"
                    title="Add to Cart"
                  >
                    <ShoppingCart className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleBuyOnAmazon(product.amazonUrl)}
                    className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-sugan-brown hover:bg-sugan-gold hover:text-white transition-colors"
                    title="Buy on Amazon"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <p className="text-sugan-gold text-xs font-body uppercase tracking-wider mb-1">
                  {product.category}
                </p>
                <h3 className="font-display text-lg font-medium text-sugan-brown mb-2 group-hover:text-sugan-gold transition-colors">
                  {product.name}
                </h3>
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3 h-3 ${
                        i < Math.floor(product.rating || 0)
                          ? 'fill-sugan-gold text-sugan-gold'
                          : 'text-sugan-brown/20'
                      }`}
                    />
                  ))}
                  <span className="text-xs text-sugan-brown/50 ml-1">
                    ({product.reviews})
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-display text-xl font-semibold text-sugan-brown">
                    ₹{product.price.toLocaleString()}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-sugan-brown/40 line-through">
                      ₹{product.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All CTA */}
        <div className="text-center mt-12">
          <p className="text-sugan-brown/60 font-body text-sm mb-4">
            All orders are fulfilled via Amazon FBA for fast, reliable delivery
          </p>
          <a
            href="https://www.amazon.in/s?me=SUGAN_SELLER_ID"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sugan-gold font-body text-sm hover:underline"
          >
            View All Products on Amazon
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
