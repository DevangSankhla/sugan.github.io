import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

export default function CTA() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax background
      gsap.to(bgRef.current, {
        yPercent: 20,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });

      // Card scale animation
      gsap.fromTo(
        cardRef.current,
        { scale: 0.9, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-32 lg:py-48 overflow-hidden"
    >
      {/* Background Image */}
      <div
        ref={bgRef}
        className="absolute inset-0 -top-20 -bottom-20"
        style={{ willChange: 'transform' }}
      >
        <img
          src="/images/cta-living-room.jpg"
          alt="Beautiful living room with wooden furniture"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-sugan-ink/60" />
      </div>

      {/* Content Card */}
      <div className="relative z-10 section-padding">
        <div className="max-w-3xl mx-auto">
          <div
            ref={cardRef}
            className="bg-sugan-bone/95 backdrop-blur-sm p-8 sm:p-12 lg:p-16 rounded-lg text-center"
          >
            <p className="text-sugan-gold font-body text-sm tracking-[0.2em] uppercase mb-4">
              Start Your Journey
            </p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-light text-sugan-ink mb-6">
              Bring Home the Beauty of
              <span className="font-medium block">Solid Wood</span>
            </h2>
            <p className="text-sugan-ink/70 font-body leading-relaxed mb-8 max-w-lg mx-auto">
              Explore our collection of handcrafted wooden lifestyle products.
              Each piece is made with love in Jodhpur and delivered to your
              doorstep with pan-India shipping.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/shop"
                className="btn-primary flex items-center justify-center gap-2 group"
              >
                Shop Now
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/shop"
                className="btn-outline"
              >
                Browse All Rooms
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="mt-10 pt-8 border-t border-sugan-ink/10">
              <p className="text-sugan-ink/50 text-xs font-body mb-4">
                Trusted by 5000+ customers across India
              </p>
              <div className="flex items-center justify-center gap-6">
                <div className="flex items-center gap-2 text-sugan-ink/60">
                  <svg
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                  </svg>
                  <span className="text-xs font-body">Premium Quality</span>
                </div>
                <div className="flex items-center gap-2 text-sugan-ink/60">
                  <svg
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z" />
                  </svg>
                  <span className="text-xs font-body">Secure Payment</span>
                </div>
                <div className="flex items-center gap-2 text-sugan-ink/60">
                  <svg
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
                  </svg>
                  <span className="text-xs font-body">Free Delivery</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
