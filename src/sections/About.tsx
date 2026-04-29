import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Calendar, Heart } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image reveal with clip-path
      gsap.fromTo(
        imageRef.current,
        { clipPath: 'circle(0% at 50% 50%)' },
        {
          clipPath: 'circle(100% at 50% 50%)',
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Content parallax
      const contentElements = contentRef.current?.querySelectorAll('.animate-item');
      if (contentElements) {
        gsap.fromTo(
          contentElements,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 60%',
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
      id="about"
      ref={sectionRef}
      className="py-20 lg:py-32 bg-sugan-bone section-padding overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <div ref={imageRef} className="relative">
            <div className="aspect-square rounded-lg overflow-hidden">
              <img
                src="/images/Crafting Excellence hero.jpeg"
                alt="Crafting Excellence - Sugan Heritage"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            {/* Floating Badge */}
            <div className="absolute -bottom-6 -right-6 bg-sugan-ink text-sugan-bone p-6 rounded-lg shadow-xl hidden sm:block">
              <p className="font-display text-4xl font-semibold">25+</p>
              <p className="text-sm font-body opacity-80">Years of Excellence</p>
            </div>
            {/* Decorative */}
            <div className="absolute -top-4 -left-4 w-24 h-24 border-2 border-sugan-gold/30 rounded-lg -z-10" />
          </div>

          {/* Content */}
          <div ref={contentRef}>
            <p className="animate-item section-label mb-3">
              Our Heritage
            </p>
            <h2 className="animate-item font-display text-3xl sm:text-4xl lg:text-5xl font-light text-sugan-ink mb-6">
              Crafting Excellence
              <br />
              <span className="font-medium">Since 1999</span>
            </h2>
            <div className="animate-item space-y-4 text-sugan-ink/70 font-body leading-relaxed mb-8">
              <p>
                For over two decades, Sugan has been synonymous with premium
                wooden craftsmanship in Jodhpur, the heart of Rajasthan's rich
                artisanal heritage. What began as a small family workshop has
                evolved into a trusted brand that brings the warmth of solid wood
                into homes across India.
              </p>
              <p>
                Each Sugan product is meticulously handcrafted by skilled
                artisans who have inherited the secrets of woodworking through
                generations. We use only the finest sustainably sourced solid
                wood—walnut, teak, oak, and mango—ensuring every piece is not
                just beautiful, but built to last a lifetime.
              </p>
              <p>
                Our commitment to quality extends beyond craftsmanship. We use
                food-safe, non-toxic finishes that are healthy for your family
                and kind to the environment. From kitchen essentials to home
                décor, every Sugan product tells a story of tradition, passion,
                and uncompromising quality.
              </p>
            </div>

            {/* Features */}
            <div className="animate-item grid grid-cols-3 gap-4 mb-8">
              <div className="text-center p-4 bg-white rounded-lg">
                <MapPin className="w-5 h-5 text-sugan-gold mx-auto mb-2" />
                <p className="text-xs text-sugan-ink/60 font-body">Jodhpur</p>
              </div>
              <div className="text-center p-4 bg-white rounded-lg">
                <Calendar className="w-5 h-5 text-sugan-gold mx-auto mb-2" />
                <p className="text-xs text-sugan-ink/60 font-body">Since 1999</p>
              </div>
              <div className="text-center p-4 bg-white rounded-lg">
                <Heart className="w-5 h-5 text-sugan-gold mx-auto mb-2" />
                <p className="text-xs text-sugan-ink/60 font-body">Handmade</p>
              </div>
            </div>

            <button
              onClick={() =>
                document
                  .getElementById('products')
                  ?.scrollIntoView({ behavior: 'smooth' })
              }
              className="animate-item btn-primary"
            >
              Explore Our Collection
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
