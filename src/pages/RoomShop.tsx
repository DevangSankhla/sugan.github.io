import { useState, useEffect, useRef, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowLeft, Search } from 'lucide-react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import {
  rooms,
  roomProducts,
  getDisplayProduct,
  getBaseProductName,
  isSetProduct,
} from '@/data/rooms';
import type { Product } from '@/types';
import ProductCard from '@/components/ProductCard';
import MobileCartButton from '@/components/MobileCartButton';

gsap.registerPlugin(ScrollTrigger);

type SortKey = 'featured' | 'price-asc' | 'price-desc' | 'name';

export default function RoomShop() {
  const { roomId } = useParams<{ roomId: string }>();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortKey, setSortKey] = useState<SortKey>('featured');
  const [sortOpen, setSortOpen] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const room = rooms.find((r) => r.id === roomId);
  const products =
    roomId === 'shop-all'
      ? Object.values(roomProducts).flat()
      : roomProducts[roomId || ''] || [];

  const uniqueProducts = useMemo(
    () =>
      products.reduce((acc: Product[], product) => {
        const displayProduct = isSetProduct(product) ? product : getDisplayProduct(product);
        const baseName = getBaseProductName(displayProduct.name);
        const isDuplicate = acc.some((p) => getBaseProductName(p.name) === baseName);
        if (!isDuplicate) acc.push(displayProduct);
        return acc;
      }, []),
    [products]
  );

  const filteredProducts = useMemo(() => {
    const q = searchQuery.toLowerCase();
    let list = uniqueProducts.filter(
      (p) =>
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );

    switch (sortKey) {
      case 'price-asc':
        list = [...list].sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        list = [...list].sort((a, b) => b.price - a.price);
        break;
      case 'name':
        list = [...list].sort((a, b) => a.name.localeCompare(b.name));
        break;
    }
    return list;
  }, [uniqueProducts, searchQuery, sortKey]);

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
  }, [filteredProducts]);

  if (!room) {
    return (
      <div className="min-h-screen bg-sugan-bone pt-32 flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-display-lg font-light text-sugan-ink mb-6">
            Room not found
          </h1>
          <Link to="/shop" className="btn-outline">
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  const sortLabel: Record<SortKey, string> = {
    featured: 'Featured',
    'price-asc': 'Price · low to high',
    'price-desc': 'Price · high to low',
    name: 'Name',
  };

  return (
    <div ref={sectionRef} className="min-h-screen bg-sugan-bone pt-32">
      {/* Header */}
      <div className="section-padding pb-10 border-b border-sugan-ink/10">
        <button
          onClick={() => navigate('/shop')}
          className="inline-flex items-center gap-2 text-eyebrow font-body uppercase text-sugan-ink-soft hover:text-sugan-ink transition-colors mb-6"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          All rooms
        </button>
        <p className="text-eyebrow font-body uppercase text-sugan-ink-soft mb-4">
          {String(filteredProducts.length).padStart(2, '0')} products
        </p>
        <h1 className="font-display text-display-xl font-light text-sugan-ink">
          {room.name}
        </h1>
        <p className="mt-6 max-w-2xl font-body text-body-lg text-sugan-ink-soft">
          {room.description}
        </p>
      </div>

      {/* Filter / sort bar */}
      <div className="section-padding py-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-sugan-ink/10 sticky top-[64px] bg-sugan-bone/80 backdrop-blur-xl z-30">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-sugan-ink/40" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={`Search ${room.name.toLowerCase()}`}
            className="w-full pl-10 pr-4 py-2 bg-transparent border-b border-sugan-ink/20 font-body text-[15px] text-sugan-ink placeholder:text-sugan-ink/30 focus:outline-none focus:border-sugan-ink transition-colors"
          />
        </div>

        {/* Flat ghost sort dropdown */}
        <div className="relative">
          <button
            onClick={() => setSortOpen((v) => !v)}
            className="inline-flex items-center gap-2 text-eyebrow font-body uppercase text-sugan-ink border-b border-sugan-ink/30 pb-1 hover:border-sugan-ink transition-colors"
          >
            Sort · {sortLabel[sortKey]}
          </button>
          {sortOpen && (
            <div
              className="absolute right-0 mt-3 min-w-[220px] bg-sugan-bone border border-sugan-ink/10 shadow-lift z-40"
              onMouseLeave={() => setSortOpen(false)}
            >
              {(Object.keys(sortLabel) as SortKey[]).map((key) => (
                <button
                  key={key}
                  onClick={() => {
                    setSortKey(key);
                    setSortOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 text-eyebrow font-body uppercase border-b border-sugan-ink/10 last:border-b-0 transition-colors ${
                    sortKey === key
                      ? 'text-sugan-ink bg-sugan-bone-dark'
                      : 'text-sugan-ink-soft hover:text-sugan-ink'
                  }`}
                >
                  {sortLabel[key]}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Active search chip */}
      {searchQuery && (
        <div className="section-padding pt-6">
          <button
            onClick={() => setSearchQuery('')}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-pill border border-sugan-ink/20 text-eyebrow font-body uppercase text-sugan-ink hover:border-sugan-ink transition-colors"
          >
            “{searchQuery}” ×
          </button>
        </div>
      )}

      {/* Products Grid */}
      <section className="section-padding py-12">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-24">
            <p className="font-display text-display-md font-light text-sugan-ink mb-3">
              Nothing here yet.
            </p>
            <p className="font-body text-body text-sugan-ink-soft mb-8">
              We're curating pieces for the {room.name.toLowerCase()}.
            </p>
            <Link to="/shop" className="btn-outline">
              Browse other rooms
            </Link>
          </div>
        ) : (
          <div
            ref={gridRef}
            className="grid grid-cols-2 lg:grid-cols-4 gap-gutter"
          >
            {filteredProducts.map((product) => (
              <div key={product.id} data-card>
                <ProductCard product={product} baseName={getBaseProductName(product.name)} />
              </div>
            ))}
          </div>
        )}
      </section>

      <MobileCartButton />
    </div>
  );
}
