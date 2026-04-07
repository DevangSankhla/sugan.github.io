import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShoppingCart, ExternalLink, Star, Search } from 'lucide-react';
import { products, categories } from '@/data/products';
import { useCart } from '@/context/CartContext';
import type { Product } from '@/types';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

export default function Shop() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const { addToCart, setIsCartOpen } = useCart();
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const filteredProducts = products.filter((p) => {
    const matchesCategory = activeCategory === 'all' || p.category === activeCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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

  return (
    <div className="min-h-screen bg-sugan-cream pt-24">
      {/* Header */}
      <div className="bg-sugan-brown py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl text-sugan-cream mb-4">
            Shop Our <span className="text-sugan-gold">Collection</span>
          </h1>
          <p className="text-sugan-cream/70 font-body max-w-xl">
            Discover our handcrafted wooden products, made with love in Jodhpur.
          </p>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-white border-b border-sugan-brown/10 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 text-sm font-body transition-all duration-300 rounded-full ${
                    activeCategory === cat.id
                      ? 'bg-sugan-brown text-sugan-cream'
                      : 'bg-sugan-cream text-sugan-brown hover:bg-sugan-brown/10'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-sugan-brown/40" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 bg-sugan-cream border border-sugan-brown/20 rounded-full text-sm font-body focus:outline-none focus:border-sugan-gold w-full md:w-64"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <section ref={sectionRef} className="py-12 section-padding">
        <div className="max-w-7xl mx-auto">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-sugan-brown/60 font-body">No products found.</p>
            </div>
          ) : (
            <div
              ref={gridRef}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8"
            >
              {filteredProducts.map((product) => (
                <Link
                  key={product.id}
                  to={`/product/${product.id}`}
                  className="product-card group bg-white rounded-lg overflow-hidden transition-all duration-500 hover:shadow-gold-lg"
                >
                  {/* Image */}
                  <div className="relative aspect-square overflow-hidden bg-sugan-cream-dark">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {product.originalPrice && (
                      <span className="absolute top-3 left-3 bg-sugan-gold text-white text-xs font-body px-2 py-1 rounded">
                        Sale
                      </span>
                    )}
                    {/* Quick Actions */}
                    <div 
                      className="absolute inset-0 bg-sugan-brown/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                    >
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-sugan-brown hover:bg-sugan-gold hover:text-white transition-colors"
                        title="Add to Cart"
                      >
                        <ShoppingCart className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => window.open(product.amazonUrl, '_blank')}
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
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
