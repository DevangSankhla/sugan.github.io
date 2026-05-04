import { Link } from 'react-router-dom';
import { rooms, roomProducts } from '@/data/rooms';

// Curated hero images per room - override the default first-product image
const ROOM_HERO_IMAGES: Record<string, string> = {
  kitchen: '/images/SAC05L_01.png',
  pet: '/images/SAC048M_01.png',
  living: '/images/SAC056_02.png',
  bedroom: '/images/SAC054_02.png',
};

export default function Products() {
  const showcaseRooms = rooms
    .filter((r) => r.id !== 'shop-all')
    .slice(0, 6)
    .map((r) => ({
      ...r,
      heroImage: ROOM_HERO_IMAGES[r.id] ?? roomProducts[r.id]?.[0]?.image ?? '/images/SAC030.jpeg',
    }));

  return (
    <section id="products" className="relative bg-sugan-bone">
      {/* Header */}
      <div className="section-padding pt-section-y pb-10">
        <p className="text-eyebrow font-body uppercase text-sugan-ink-soft mb-4">
          Shop by Room
        </p>
        <h2 className="font-display text-display-xl font-light text-sugan-ink max-w-3xl">
          Find what fits the space.
        </h2>
      </div>

      {/* Horizontal CSS scroll - no GSAP pin, normal page scroll preserved */}
      <div
        className="overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-section-y"
        style={{ scrollbarWidth: 'none' }}
      >
        <div className="flex gap-gutter section-padding">
          {showcaseRooms.map((room, i) => (
            <Link
              key={room.id}
              to={`/shop/${room.id}`}
              data-cursor="view"
              className="group relative shrink-0 snap-start w-[78vw] sm:w-[55vw] lg:w-[36vw] aspect-square overflow-hidden bg-sugan-bone-dark"
            >
              <img
                src={room.heroImage}
                alt={room.name}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover scale-[1.04] transition-transform duration-700 ease-apple group-hover:scale-100"
              />
              <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-sugan-ink/80 via-sugan-ink/30 to-transparent pointer-events-none" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <p className="text-eyebrow font-body uppercase text-sugan-bone/70 mb-3">
                  {String(i + 1).padStart(2, '0')}
                </p>
                <h3 className="font-display text-display-lg font-light text-sugan-bone">
                  {room.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
