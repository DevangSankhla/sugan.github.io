import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { ArrowRight, X } from 'lucide-react';
import { rooms, roomProducts, allProducts, getDisplayProduct, getBaseProductName, isSetProduct } from '@/data/rooms';

const ROOM_HERO_IMAGES: Record<string, string> = {
  kitchen: '/images/SAC01S_03.png',
  pet: '/images/SAC048M_01.png',
  living: '/images/SAC056_02.png',
  bedroom: '/images/SAC054_02.png',
  library: '/images/SAC058_02.png',
};

const CATEGORY_HERO_IMAGES: Record<string, string> = {
  'pet-feeders': '/images/SAC048M_01.png',
  'side-tables': '/images/SAC050_02.png',
  'bookshelves': '/images/SAC058_01.png',
};
import type { Product } from '@/types';
import ProductCard from '@/components/ProductCard';

gsap.registerPlugin(ScrollTrigger);

const categories = [
  { id: 'pet-feeders', name: 'Pet Feeders' },
  { id: 'trays', name: 'Serving Trays' },
  { id: 'bowls', name: 'Bowls' },
  { id: 'coasters', name: 'Coasters' },
  { id: 'cutlery', name: 'Cutlery & Organizers' },
  { id: 'chopping-boards', name: 'Chopping Boards' },
  { id: 'napkin-holders', name: 'Napkin Holders' },
  { id: 'side-tables', name: 'Side Tables' },
  { id: 'coffee-tables', name: 'Coffee Tables' },
  { id: 'bookshelves', name: 'Bookshelves' },
  { id: 'wall-shelves', name: 'Wall Shelves' },
  { id: 'pooja', name: 'Pooja Essentials' },
];

const getUniqueProductsByName = (products: Product[]): Product[] => {
  const seen = new Set<string>();
  return products
    .map((p) => (isSetProduct(p) ? p : getDisplayProduct(p)))
    .filter((p) => {
      const baseName = getBaseProductName(p.name);
      if (seen.has(baseName)) return false;
      seen.add(baseName);
      return true;
    });
};

function getCategoryProducts(categoryId: string): Product[] {
  let products: Product[] = [];
  switch (categoryId) {
    case 'pet-feeders':
      products = roomProducts['pet'] || [];
      break;
    case 'trays':
      products = allProducts.filter((p) => p.name.toLowerCase().includes('tray'));
      break;
    case 'bowls':
      products = allProducts.filter(
        (p) => p.name.toLowerCase().includes('bowl') && p.room !== 'pet'
      );
      break;
    case 'coasters':
      products = allProducts.filter((p) => p.name.toLowerCase().includes('coaster'));
      break;
    case 'cutlery':
      products = allProducts.filter(
        (p) =>
          p.name.toLowerCase().includes('cutlery') ||
          p.name.toLowerCase().includes('organizer')
      );
      break;
    case 'chopping-boards':
      products = allProducts.filter(
        (p) =>
          p.name.toLowerCase().includes('chopping') ||
          p.name.toLowerCase().includes('board')
      );
      break;
    case 'napkin-holders':
      products = allProducts.filter((p) =>
        p.name.toLowerCase().includes('napkin') ||
        p.name.toLowerCase().includes('tissue')
      );
      break;
    case 'side-tables':
      products = allProducts.filter((p) => p.name.toLowerCase().includes('side table') || p.name.toLowerCase().includes('bedside table'));
      break;
    case 'coffee-tables':
      products = allProducts.filter((p) => p.name.toLowerCase().includes('coffee table'));
      break;
    case 'bookshelves':
      products = allProducts.filter((p) => p.category === 'Bookshelf');
      break;
    case 'wall-shelves':
      products = roomProducts['wall'] || [];
      break;
    case 'pooja':
      products = roomProducts['pooja'] || [];
      break;
  }
  return getUniqueProductsByName(products);
}

export default function Shop() {
  const [browseBy, setBrowseBy] = useState<'rooms' | 'categories'>('rooms');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // Reveal grid on view change
  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gridRef.current?.querySelectorAll('[data-card]');
      if (cards && cards.length) {
        gsap.fromTo(
          cards,
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.04,
            ease: 'power3.out',
          }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, [browseBy, selectedCategory]);

  const displayRooms = rooms.filter((r) => r.id !== 'shop-all');
  const activeCategoryName = categories.find((c) => c.id === selectedCategory)?.name;
  const categoryProducts = selectedCategory ? getCategoryProducts(selectedCategory) : [];

  return (
    <div ref={sectionRef} className="min-h-screen bg-sugan-bone pt-32">
      {/* Header */}
      <div className="section-padding pb-10 border-b border-sugan-ink/10">
        <p className="text-eyebrow font-body uppercase text-sugan-ink-soft mb-6 inline-flex items-center gap-3">
          <span className="block w-12 h-px bg-sugan-ink/20" aria-hidden="true" />
          The Collection
        </p>
        <h1 className="font-display text-display-xl font-light text-sugan-ink">
          Shop
        </h1>
        <p className="mt-6 max-w-2xl font-body text-body-lg text-sugan-ink-soft">
          Solid wood, slow-grown and hand-shaped in Jodhpur. Browse by room or by category.
        </p>
      </div>

      {/* Filter row */}
      <div className="section-padding pt-8 pb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-6">
          <span className="text-eyebrow font-body uppercase text-sugan-ink-soft">
            Browse by
          </span>
          <div className="flex items-center gap-1">
            {(['rooms', 'categories'] as const).map((mode) => {
              const active = browseBy === mode;
              return (
                <button
                  key={mode}
                  onClick={() => {
                    setBrowseBy(mode);
                    setSelectedCategory(null);
                  }}
                  className={`px-3 py-1.5 text-eyebrow font-body uppercase rounded-pill border transition-colors duration-300 ease-apple ${
                    active
                      ? 'border-sugan-ink bg-sugan-ink text-sugan-bone'
                      : 'border-sugan-ink/20 text-sugan-ink-soft hover:border-sugan-ink hover:text-sugan-ink'
                  }`}
                >
                  {mode}
                </button>
              );
            })}
          </div>
        </div>

        {/* Active filter chip */}
        {browseBy === 'categories' && selectedCategory && (
          <button
            onClick={() => setSelectedCategory(null)}
            className="self-start inline-flex items-center gap-2 px-3 py-1.5 rounded-pill border border-sugan-ink/20 text-eyebrow font-body uppercase text-sugan-ink hover:border-sugan-ink transition-colors duration-300 ease-apple"
          >
            {activeCategoryName}
            <X className="w-3 h-3" />
          </button>
        )}
      </div>

      {/* Content */}
      <section className="section-padding pb-section-y">
        {browseBy === 'rooms' ? (
          <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-gutter">
            {displayRooms.map((room) => {
              const count = getUniqueProductsByName(roomProducts[room.id] || []).length;
              if (count === 0) return null;
              const heroImage = ROOM_HERO_IMAGES[room.id] ?? roomProducts[room.id]?.[0]?.image ?? '/images/SAC030.jpeg';
              return (
                <Link
                  key={room.id}
                  to={`/shop/${room.id}`}
                  data-card
                  data-cursor="view"
                  className="group block"
                >
                  <div className="relative aspect-square overflow-hidden bg-sugan-bone-dark">
                    <img
                      src={heroImage}
                      alt={room.name}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-contain scale-[1.04] transition-transform duration-700 ease-apple group-hover:scale-100"
                    />
                  </div>
                  <div className="pt-4">
                    <p className="text-eyebrow font-body uppercase text-sugan-ink/40">
                      {String(count).padStart(2, '0')} products
                    </p>
                    <h3 className="mt-2 font-display text-display-md font-light text-sugan-ink">
                      {room.name}
                    </h3>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : !selectedCategory ? (
          <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-gutter">
            {categories.map((category) => {
              const products = getCategoryProducts(category.id);
              if (products.length === 0) return null;
              const heroImage = CATEGORY_HERO_IMAGES[category.id] ?? products[0]?.image ?? '/images/SAC030.jpeg';
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  data-card
                  data-cursor="view"
                  className="group block text-left"
                >
                  <div className="relative aspect-square overflow-hidden bg-sugan-bone-dark">
                    <img
                      src={heroImage}
                      alt={category.name}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-contain scale-[1.04] transition-transform duration-700 ease-apple group-hover:scale-100"
                    />
                  </div>
                  <div className="pt-4">
                    <p className="text-eyebrow font-body uppercase text-sugan-ink/40">
                      {String(products.length).padStart(2, '0')} products
                    </p>
                    <h3 className="mt-2 font-display text-display-md font-light text-sugan-ink">
                      {category.name}
                    </h3>
                  </div>
                </button>
              );
            })}
          </div>
        ) : (
          <div ref={gridRef} className="grid grid-cols-2 lg:grid-cols-4 gap-gutter">
            {categoryProducts.map((product) => (
              <div key={product.id} data-card>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Footer prompt */}
      <div className="border-t border-sugan-ink/10">
        <div className="section-padding py-12 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="font-body text-body text-sugan-ink-soft max-w-md">
            Looking for something at scale? We take on resort, hotel, and office commissions.
          </p>
          <Link to="/bulk-orders" className="btn-ghost group self-start">
            Bulk &amp; trade enquiries
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 ease-apple group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}
