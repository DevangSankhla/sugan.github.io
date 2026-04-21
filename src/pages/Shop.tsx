import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { rooms, roomProducts, allProducts, getDisplayProduct, hasSizeVariants, getSizeVariantCount, getBaseProductName, isSetProduct } from '@/data/rooms';
import { Link } from 'react-router-dom';
import * as Icons from 'lucide-react';
import type { Product } from '@/types';

gsap.registerPlugin(ScrollTrigger);

// Define categories based on actual product categories
const categories = [
  { id: 'pet-feeders', name: 'Pet Feeders', icon: 'Heart' },
  { id: 'trays', name: 'Serving Trays', icon: 'LayoutGrid' },
  { id: 'bowls', name: 'Bowls', icon: 'Circle' },
  { id: 'coasters', name: 'Coasters', icon: 'Square' },
  { id: 'cutlery', name: 'Cutlery & Organizers', icon: 'Utensils' },
  { id: 'chopping-boards', name: 'Chopping Boards', icon: 'Square' },
  { id: 'pooja', name: 'Pooja Essentials', icon: 'Sparkles' },
];

// Shows set-of-3 as their own entry; collapses other size variants to the small variant.
const getUniqueProductsByName = (products: Product[]): Product[] => {
  const seen = new Set<string>();
  return products
    .map(p => isSetProduct(p) ? p : getDisplayProduct(p))
    .filter(p => {
      const baseName = getBaseProductName(p.name);
      if (seen.has(baseName)) return false;
      seen.add(baseName);
      return true;
    });
};

export default function Shop() {
  const [activeView, setActiveView] = useState<'home' | 'rooms' | 'category'>('home');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeView === 'home') return;
    
    const ctx = gsap.context(() => {
      const cards = gridRef.current?.querySelectorAll('.item-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.08,
            ease: 'power3.out',
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [activeView, selectedCategory]);

  // Get products by category - returns unique products only
  const getCategoryProducts = (categoryId: string): Product[] => {
    let products: Product[] = [];
    switch(categoryId) {
      case 'pet-feeders':
        products = roomProducts['pet'] || [];
        break;
      case 'trays':
        products = allProducts.filter(p => p.name.toLowerCase().includes('tray'));
        break;
      case 'bowls':
        products = allProducts.filter(p => p.name.toLowerCase().includes('bowl') && p.room !== 'pet');
        break;
      case 'coasters':
        products = allProducts.filter(p => p.name.toLowerCase().includes('coaster'));
        break;
      case 'cutlery':
        products = allProducts.filter(p => p.name.toLowerCase().includes('cutlery') || p.name.toLowerCase().includes('organizer'));
        break;
      case 'chopping-boards':
        products = allProducts.filter(p => p.name.toLowerCase().includes('chopping') || p.name.toLowerCase().includes('board'));
        break;
      case 'pooja':
        products = roomProducts['pooja'] || [];
        break;
      case 'decor':
        products = allProducts.filter(p => p.category?.toLowerCase().includes('decor'));
        break;
      default:
        products = [];
    }
    // Return unique products only to avoid duplicates from size variants
    return getUniqueProductsByName(products);
  };

  // Filter out shop-all from rooms display
  const displayRooms = rooms.filter(r => r.id !== 'shop-all');

  return (
    <div className="min-h-screen bg-sugan-cream pt-24">
      {/* Header */}
      <div className="bg-sugan-brown py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="font-display text-3xl sm:text-4xl lg:text-6xl text-sugan-cream mb-4">
            Shop <span className="text-sugan-gold">Sugan</span>
          </h1>
          <p className="text-sugan-cream/70 font-body max-w-2xl mx-auto text-lg">
            Handcrafted wooden products from Jodhpur. 
            Browse by room or category to find your perfect piece.
          </p>
        </div>
      </div>

      {/* Main Shop Navigation */}
      {activeView === 'home' && (
        <section className="py-16 section-padding">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Shop by Room */}
              <button
                onClick={() => setActiveView('rooms')}
                className="group relative bg-white rounded-3xl p-12 transition-all duration-500 hover:shadow-gold-lg hover:-translate-y-2 text-left overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-48 h-48 bg-sugan-cream/50 rounded-full -mr-24 -mt-24 transition-transform duration-500 group-hover:scale-150" />
                <div className="relative">
                  <div className="w-20 h-20 bg-sugan-brown/5 rounded-2xl flex items-center justify-center mb-6 transition-colors duration-300 group-hover:bg-sugan-gold/10">
                    <Icons.Home className="w-10 h-10 text-sugan-brown transition-colors duration-300 group-hover:text-sugan-gold" />
                  </div>
                  <h2 className="font-display text-3xl font-medium text-sugan-brown mb-3 group-hover:text-sugan-gold transition-colors">
                    Shop by Room
                  </h2>
                  <p className="text-sugan-brown/60 font-body mb-6">
                    Browse products organized by rooms in your home
                  </p>
                  <div className="flex items-center text-sugan-gold font-body">
                    <span>Explore Rooms</span>
                    <Icons.ArrowRight className="w-5 h-5 ml-2 transform transition-transform group-hover:translate-x-2" />
                  </div>
                </div>
              </button>

              {/* Shop by Category */}
              <button
                onClick={() => setActiveView('category')}
                className="group relative bg-white rounded-3xl p-12 transition-all duration-500 hover:shadow-gold-lg hover:-translate-y-2 text-left overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-48 h-48 bg-sugan-cream/50 rounded-full -mr-24 -mt-24 transition-transform duration-500 group-hover:scale-150" />
                <div className="relative">
                  <div className="w-20 h-20 bg-sugan-brown/5 rounded-2xl flex items-center justify-center mb-6 transition-colors duration-300 group-hover:bg-sugan-gold/10">
                    <Icons.Grid3X3 className="w-10 h-10 text-sugan-brown transition-colors duration-300 group-hover:text-sugan-gold" />
                  </div>
                  <h2 className="font-display text-3xl font-medium text-sugan-brown mb-3 group-hover:text-sugan-gold transition-colors">
                    Shop by Category
                  </h2>
                  <p className="text-sugan-brown/60 font-body mb-6">
                    Find specific products like feeders, trays, bowls & more
                  </p>
                  <div className="flex items-center text-sugan-gold font-body">
                    <span>Explore Categories</span>
                    <Icons.ArrowRight className="w-5 h-5 ml-2 transform transition-transform group-hover:translate-x-2" />
                  </div>
                </div>
              </button>
            </div>

            {/* Shop All Link */}
            <div className="text-center mt-12">
              <Link 
                to="/shop/shop-all"
                className="inline-flex items-center gap-2 px-8 py-4 bg-sugan-brown text-sugan-cream rounded-full font-body hover:bg-sugan-brown/90 transition-colors"
              >
                <Icons.Grid3X3 className="w-5 h-5" />
                View All Products
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Shop by Room View - Shows Room Buttons */}
      {activeView === 'rooms' && (
        <section ref={sectionRef} className="py-12 section-padding">
          <div className="max-w-7xl mx-auto">
            <button 
              onClick={() => setActiveView('home')}
              className="flex items-center gap-2 text-sugan-brown/60 hover:text-sugan-gold mb-8 font-body"
            >
              <Icons.ArrowLeft className="w-4 h-4" />
              Back
            </button>

            <h2 className="font-display text-3xl text-sugan-brown mb-8">Shop by Room</h2>
            
            {/* Room Buttons Grid */}
            <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {displayRooms.map((room) => {
                const roomProds = roomProducts[room.id] || [];
                if (roomProds.length === 0) return null;
                
                const uniqueProducts = getUniqueProductsByName(roomProds);
                const IconComponent = (Icons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[room.icon];

                return (
                  <Link
                    key={room.id}
                    to={`/shop/${room.id}`}
                    className="item-card group bg-white rounded-2xl p-6 text-center hover:shadow-gold-lg transition-all hover:-translate-y-1"
                  >
                    <div className="w-16 h-16 bg-sugan-brown/5 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-colors group-hover:bg-sugan-gold/10">
                      {IconComponent && <IconComponent className="w-8 h-8 text-sugan-brown group-hover:text-sugan-gold transition-colors" />}
                    </div>
                    <h3 className="font-display text-lg text-sugan-brown group-hover:text-sugan-gold transition-colors">{room.name}</h3>
                    <p className="text-sm text-sugan-brown/50 font-body mt-1">{uniqueProducts.length} products</p>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Shop by Category View */}
      {activeView === 'category' && (
        <section ref={sectionRef} className="py-12 section-padding">
          <div className="max-w-7xl mx-auto">
            <button 
              onClick={() => {
                setActiveView('home');
                setSelectedCategory(null);
              }}
              className="flex items-center gap-2 text-sugan-brown/60 hover:text-sugan-gold mb-8 font-body"
            >
              <Icons.ArrowLeft className="w-4 h-4" />
              Back
            </button>

            {!selectedCategory ? (
              <>
                <h2 className="font-display text-3xl text-sugan-brown mb-8">Shop by Category</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {categories.map((category) => {
                    const productCount = getCategoryProducts(category.id).length;
                    if (productCount === 0) return null;

                    const IconComponent = (Icons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[category.icon];

                    return (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className="item-card group bg-white rounded-2xl p-6 text-center hover:shadow-gold-lg transition-all hover:-translate-y-1"
                      >
                        <div className="w-16 h-16 bg-sugan-brown/5 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-colors group-hover:bg-sugan-gold/10">
                          {IconComponent && <IconComponent className="w-8 h-8 text-sugan-brown group-hover:text-sugan-gold transition-colors" />}
                        </div>
                        <h3 className="font-display text-lg text-sugan-brown group-hover:text-sugan-gold transition-colors">{category.name}</h3>
                        <p className="text-sm text-sugan-brown/50 font-body mt-1">{productCount} products</p>
                      </button>
                    );
                  })}
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center justify-between mb-8">
                  <h2 className="font-display text-3xl text-sugan-brown">
                    {categories.find(c => c.id === selectedCategory)?.name}
                  </h2>
                  <button 
                    onClick={() => setSelectedCategory(null)}
                    className="text-sugan-gold font-body hover:underline"
                  >
                    View All Categories
                  </button>
                </div>
                
                <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {getCategoryProducts(selectedCategory).map((product) => (
                    <Link
                      key={product.id}
                      to={`/product/${product.id}`}
                      state={{ from: '/shop', category: selectedCategory }}
                      className="item-card group bg-white rounded-xl overflow-hidden hover:shadow-lg transition-all"
                    >
                      <div className="aspect-square overflow-hidden bg-sugan-cream-dark">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover transition-transform group-hover:scale-105"
                          loading="lazy"
                        />
                      </div>
                      <div className="p-3">
                        <p className="text-xs text-sugan-gold font-body uppercase">{product.category}</p>
                        <h4 className="font-body text-sm text-sugan-brown line-clamp-2">{getBaseProductName(product.name)}</h4>
                        <p className="font-display text-sugan-brown font-semibold mt-1">₹{product.price.toLocaleString()}</p>
                        {hasSizeVariants(product) && (
                          <p className="text-xs text-sugan-brown/50 font-body mt-1">{getSizeVariantCount(product)} sizes available</p>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              </>
            )}
          </div>
        </section>
      )}

      {/* Info Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <div className="w-12 h-12 bg-sugan-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icons.Truck className="w-6 h-6 text-sugan-gold" />
              </div>
              <h3 className="font-display text-lg font-medium text-sugan-brown mb-2">Pan India Shipping</h3>
              <p className="text-sugan-brown/60 font-body text-sm">Free shipping on orders above ₹1999</p>
            </div>
            <div className="p-6">
              <div className="w-12 h-12 bg-sugan-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icons.Shield className="w-6 h-6 text-sugan-gold" />
              </div>
              <h3 className="font-display text-lg font-medium text-sugan-brown mb-2">Quality Guaranteed</h3>
              <p className="text-sugan-brown/60 font-body text-sm">Handcrafted with premium wood</p>
            </div>
            <div className="p-6">
              <div className="w-12 h-12 bg-sugan-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icons.Heart className="w-6 h-6 text-sugan-gold" />
              </div>
              <h3 className="font-display text-lg font-medium text-sugan-brown mb-2">Made in Jodhpur</h3>
              <p className="text-sugan-brown/60 font-body text-sm">Supporting local artisans</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
