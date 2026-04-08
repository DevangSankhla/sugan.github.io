import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { rooms } from '@/data/rooms';
import { Link } from 'react-router-dom';
import * as Icons from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Shop() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

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
    <div className="min-h-screen bg-sugan-cream pt-24">
      {/* Header */}
      <div className="bg-sugan-brown py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="font-display text-3xl sm:text-4xl lg:text-6xl text-sugan-cream mb-4">
            Shop by <span className="text-sugan-gold">Room</span>
          </h1>
          <p className="text-sugan-cream/70 font-body max-w-2xl mx-auto text-lg">
            Discover handcrafted wooden products organized by room. 
            Find the perfect pieces for every corner of your Indian home.
          </p>
        </div>
      </div>

      {/* Room Selection Grid */}
      <section ref={sectionRef} className="py-16 section-padding">
        <div className="max-w-7xl mx-auto">
          <div
            ref={gridRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          >
            {rooms.map((room) => {
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
                    <div className="w-16 h-16 bg-sugan-brown/5 rounded-2xl flex items-center justify-center transition-colors duration-300 group-hover:bg-sugan-gold/10">
                      {IconComponent && <IconComponent className="w-8 h-8 text-sugan-brown transition-colors duration-300 group-hover:text-sugan-gold" />}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative">
                    <h3 className="font-display text-2xl font-medium text-sugan-brown mb-2 group-hover:text-sugan-gold transition-colors">
                      {room.name}
                    </h3>
                    <p className="text-sugan-brown/60 font-body text-sm">
                      {room.description}
                    </p>
                  </div>

                  {/* Arrow */}
                  <div className="absolute bottom-8 right-8 opacity-0 transform translate-x-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                    <Icons.ArrowRight className="w-6 h-6 text-sugan-gold" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

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
