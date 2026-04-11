import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShoppingCart, Star, Search, ArrowLeft, Eye } from 'lucide-react';
import { roomProducts, rooms } from '@/data/rooms';
import { useCart } from '@/context/CartContext';
import type { Product } from '@/types';
import { Link, useParams, useNavigate } from 'react-router-dom';
import * as Icons from 'lucide-react';
import QuickViewModal from '@/components/QuickViewModal';
import MobileCartButton from '@/components/MobileCartButton';

gsap.registerPlugin(ScrollTrigger);

export default function RoomShop() {
  const { roomId } = useParams<{ roomId: string }>();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const { addToCart, setIsCartOpen } = useCart();
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const room = rooms.find(r => r.id === roomId);
  const products = roomId === 'shop-all' 
    ? Object.values(roomProducts).flat()
    : roomProducts[roomId || ''] || [];

  // Filter to show only unique base products (not all size variants)
  // Products with relatedSizes are considered variants of the same product
  const uniqueProducts = products.reduce((acc: Product[], product) => {
    // Check if this product is already represented by another product with the same name
    const isDuplicate = acc.some(p => p.name === product.name);
    if (!isDuplicate) {
      acc.push(product);
    }
    return acc;
  }, []);

  const filteredProducts = uniqueProducts.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  // Get the icon component dynamically
  const IconComponent = room ? (Icons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[room.icon] : null;

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

  if (!room) {
    return (
      <div className="min-h-screen bg-sugan-cream pt-24 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-display text-sugan-brown mb-4">Room not found</h1>
          <Link to="/shop" className="btn-primary">Back to Shop</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sugan-cream pt-24">
      {/* Header */}
      <div className="bg-sugan-brown py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <button 
            onClick={() => navigate('/shop')}
            className="flex items-center gap-2 text-sugan-cream/70 hover:text-sugan-gold mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Rooms
          </button>
          <div className="flex items-center gap-4">
            {IconComponent && <IconComponent className="w-10 h-10 text-sugan-gold" />}
            <div>
              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl text-sugan-cream">
                {room.name}
              </h1>
              <p className="text-sugan-cream/70 font-body mt-1">
                {room.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white border-b border-sugan-brown/10 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <p className="text-sugan-brown/60 font-body text-sm">
              {filteredProducts.length} products
            </p>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-sugan-brown/40" />
              <input
                type="text"
                placeholder={`Search ${room.name.toLowerCase()}...`}
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
              <p className="text-sugan-brown/60 font-body mb-4">No products in this room yet.</p>
              <p className="text-sugan-brown/40 font-body text-sm">We're curating the best products for your {room.name.toLowerCase()}.</p>
              <Link to="/shop" className="inline-flex items-center gap-2 btn-primary mt-6">
                Browse Other Rooms
              </Link>
            </div>
          ) : (
            <div
              ref={gridRef}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8"
            >
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="product-card group bg-white rounded-lg overflow-hidden transition-all duration-500 hover:shadow-gold-lg"
                >
                  {/* Image */}
                  <Link to={`/product/${product.id}`} state={{ from: `/shop/${roomId}` }} className="block relative aspect-square overflow-hidden bg-sugan-cream-dark">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />

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
                        onClick={() => setQuickViewProduct(product)}
                        className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-sugan-brown hover:bg-sugan-gold hover:text-white transition-colors"
                        title="Quick View"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                    </div>
                  </Link>

                  {/* Content */}
                  <div className="p-5">
                    <p className="text-sugan-gold text-xs font-body uppercase tracking-wider mb-1">
                      {product.category}
                    </p>
                    <Link to={`/product/${product.id}`} state={{ from: `/shop/${roomId}` }}>
                      <h3 className="font-display text-lg font-medium text-sugan-brown mb-2 group-hover:text-sugan-gold transition-colors">
                        {product.name}
                      </h3>
                    </Link>
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

                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Quick View Modal */}
      <QuickViewModal 
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />

      {/* Mobile Cart Button */}
      <MobileCartButton />
    </div>
  );
}
