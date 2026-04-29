import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { rooms, roomProducts } from '@/data/rooms';

gsap.registerPlugin(ScrollTrigger);

export default function Products() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // Skip 'shop-all' meta-room; cap at 6 cards for the showcase
  const showcaseRooms = rooms
    .filter((r) => r.id !== 'shop-all')
    .slice(0, 6)
    .map((r) => ({
      ...r,
      heroImage: roomProducts[r.id]?.[0]?.image ?? '/images/SAC030.jpeg',
    }));

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(min-width: 1024px)', () => {
        const track = trackRef.current;
        const section = sectionRef.current;
        if (!track || !section) return;

        gsap.to(track, {
          x: () => -(track.scrollWidth - window.innerWidth) + 'px',
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: () => '+=' + (track.scrollWidth - window.innerWidth),
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
      });

      mm.add('(max-width: 1023px)', () => {
        // Mobile/tablet: simple fade-in stagger, no pin
        const cards = trackRef.current?.querySelectorAll('[data-room-card]');
        if (cards) {
          gsap.fromTo(
            cards,
            { y: 32, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              stagger: 0.08,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 80%',
                toggleActions: 'play none none none',
              },
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="products"
      ref={sectionRef}
      className="relative bg-sugan-bone overflow-hidden"
    >
      {/* Header */}
      <div className="section-padding pt-section-y pb-12 lg:pb-20 max-w-7xl">
        <p className="text-eyebrow font-body uppercase text-sugan-ink-soft mb-4">
          Shop by Room
        </p>
        <h2 className="font-display text-display-xl font-light text-sugan-ink max-w-3xl">
          Find what fits the space.
        </h2>
      </div>

      {/* Horizontal track on desktop, vertical stack on mobile */}
      <div
        ref={trackRef}
        className="
          flex flex-col gap-gutter section-padding pb-section-y
          lg:flex-row lg:flex-nowrap lg:gap-gutter lg:pb-0 lg:pl-section-x lg:pr-[20vw] lg:will-change-transform
        "
      >
        {showcaseRooms.map((room) => (
          <Link
            key={room.id}
            to={`/shop/${room.id}`}
            data-room-card
            data-cursor="view"
            className="
              group relative shrink-0
              w-full aspect-[4/5]
              lg:w-[60vw] lg:h-[80vh] lg:aspect-auto
              overflow-hidden bg-sugan-bone-dark
            "
          >
            <img
              src={room.heroImage}
              alt={room.name}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover scale-[1.04] transition-transform duration-700 ease-apple group-hover:scale-100"
            />
            {/* Bottom-left gradient + label */}
            <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-sugan-ink/80 via-sugan-ink/30 to-transparent pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-10">
              <p className="text-eyebrow font-body uppercase text-sugan-bone/70 mb-3">
                {String(showcaseRooms.indexOf(room) + 1).padStart(2, '0')}
              </p>
              <h3 className="font-display text-display-lg font-light text-sugan-bone">
                {room.name}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
