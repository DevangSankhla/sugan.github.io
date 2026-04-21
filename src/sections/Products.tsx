import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { rooms } from '@/data/rooms';
import * as Icons from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Products() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // Show only first 6 rooms on home page
  const featuredRooms = rooms.slice(0, 6);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gridRef.current?.querySelectorAll('.room-card');
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
  }, []);

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
            <p className="section-label mb-3">
              Shop by Room
            </p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-light text-sugan-brown">
              Find Products for <span className="font-medium">Every Space</span>
            </h2>
            <p className="text-sugan-brown/60 font-body mt-4 max-w-xl">
              Browse our handcrafted wooden products organized by room. 
              From kitchen essentials to living room decor, find the perfect pieces for your home.
            </p>
          </div>
        </div>

        {/* Rooms Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {featuredRooms.map((room) => {
            const IconComponent = (Icons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[room.icon];
            
            return (
              <Link
                key={room.id}
                to={`/shop/${room.id}`}
                className="room-card group relative bg-white rounded-2xl p-8 transition-all duration-500 hover:shadow-gold-lg hover:-translate-y-2 overflow-hidden"
              >
                {/* Background Pattern */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-sugan-cream/50 rounded-full -mr-16 -mt-16 transition-transform duration-500 group-hover:scale-150" />
                
                {/* Icon */}
                <div className="relative mb-6">
                  <div className="w-14 h-14 bg-sugan-brown/5 rounded-xl flex items-center justify-center transition-colors duration-300 group-hover:bg-sugan-gold/10">
                    {IconComponent && <IconComponent className="w-7 h-7 text-sugan-brown transition-colors duration-300 group-hover:text-sugan-gold" />}
                  </div>
                </div>

                {/* Content */}
                <div className="relative">
                  <h3 className="font-display text-xl font-medium text-sugan-brown mb-2 group-hover:text-sugan-gold transition-colors">
                    {room.name}
                  </h3>
                  <p className="text-sugan-brown/60 font-body text-sm">
                    {room.description}
                  </p>
                </div>

                {/* Arrow */}
                <div className="absolute bottom-8 right-8 opacity-0 transform translate-x-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                  <Icons.ArrowRight className="w-5 h-5 text-sugan-gold" />
                </div>
              </Link>
            );
          })}
        </div>

        {/* View All CTA */}
        <div className="text-center mt-12">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 btn-primary"
          >
            Explore All Rooms
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
