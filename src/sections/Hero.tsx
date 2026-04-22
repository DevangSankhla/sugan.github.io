import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowRight, Award, Users, TreePine, Building2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image reveal animation
      gsap.fromTo(
        imageRef.current,
        { scale: 1.2, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.5, ease: 'power3.out' }
      );

      // Content stagger animation
      const contentElements = contentRef.current?.querySelectorAll('.animate-item');
      if (contentElements) {
        gsap.fromTo(
          contentElements,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.15,
            ease: 'power3.out',
            delay: 0.3,
          }
        );
      }

      // Stats counter animation
      const statNumbers = statsRef.current?.querySelectorAll('.stat-number');
      if (statNumbers) {
        statNumbers.forEach((stat) => {
          const target = parseInt(stat.getAttribute('data-target') || '0');
          gsap.fromTo(
            stat,
            { innerText: 0 },
            {
              innerText: target,
              duration: 2,
              ease: 'power2.out',
              delay: 0.8,
              snap: { innerText: 1 },
              onUpdate: function () {
                const current = Math.round(parseFloat(stat.textContent || '0'));
                stat.textContent = current + (target >= 100 ? '+' : '');
              },
            }
          );
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollToProducts = () => {
    const element = document.getElementById('products');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      ref={heroRef}
      className="min-h-screen relative overflow-hidden bg-sugan-cream"
    >
      <div className="w-full min-h-screen flex flex-col lg:flex-row">
        {/* Content Side */}
        <div className="w-full lg:w-[45%] flex flex-col justify-center section-padding py-32 lg:py-20 order-2 lg:order-1">
          <div ref={contentRef} className="max-w-xl">
            <p className="animate-item text-sugan-gold font-body text-sm tracking-[0.2em] uppercase mb-4">
              Since 1999 • Jodhpur, India
            </p>
            <h1 className="animate-item font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-light text-sugan-brown leading-[1.1] mb-6">
              Handcrafted
              <br />
              <span className="font-medium">Solid Wood</span>
              <br />
              Furniture
            </h1>
            <p className="animate-item text-sugan-brown/70 font-body text-base lg:text-lg leading-relaxed mb-8 max-w-md">
              Experience the perfect blend of traditional Jodhpur craftsmanship
              and modern design. Each piece tells a story of heritage and
              excellence.
            </p>
            <div className="animate-item flex flex-col sm:flex-row gap-4">
              <button
                onClick={scrollToProducts}
                className="btn-primary flex items-center justify-center gap-2 group"
              >
                Explore Collection
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
              <button
                onClick={() => navigate('/bulk-orders')}
                className="btn-outline flex items-center justify-center gap-2 group"
              >
                <Building2 className="w-4 h-4" />
                BULK/TRADE ORDERS
              </button>
            </div>

            {/* Stats */}
            <div
              ref={statsRef}
              className="animate-item grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-sugan-brown/10"
            >
              <div className="text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                  <Award className="w-4 h-4 text-sugan-gold" />
                  <span
                    className="stat-number font-display text-2xl sm:text-3xl font-semibold text-sugan-brown"
                    data-target="25"
                  >
                    0
                  </span>
                </div>
                <p className="text-xs text-sugan-brown/60 font-body">
                  Years Experience
                </p>
              </div>
              <div className="text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                  <Users className="w-4 h-4 text-sugan-gold" />
                  <span
                    className="stat-number font-display text-2xl sm:text-3xl font-semibold text-sugan-brown"
                    data-target="5000"
                  >
                    0
                  </span>
                </div>
                <p className="text-xs text-sugan-brown/60 font-body">
                  Happy Customers
                </p>
              </div>
              <div className="text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                  <TreePine className="w-4 h-4 text-sugan-gold" />
                  <span
                    className="stat-number font-display text-2xl sm:text-3xl font-semibold text-sugan-brown"
                    data-target="100"
                  >
                    0
                  </span>
                </div>
                <p className="text-xs text-sugan-brown/60 font-body">
                  % Solid Wood
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Image Side */}
        <div className="w-full lg:w-[55%] relative h-[50vh] lg:h-screen order-1 lg:order-2">
          <div
            ref={imageRef}
            className="absolute inset-0 lg:inset-y-0 lg:right-0 lg:left-[-10%]"
          >
            <img
              src="/images/SAC030.jpeg"
              alt="Handcrafted wooden product"
              className="w-full h-full object-cover"
            />
            {/* Gradient overlay for mobile */}
            <div className="absolute inset-0 bg-gradient-to-t from-sugan-cream via-transparent to-transparent lg:hidden" />
            {/* Subtle gradient for desktop */}
            <div className="hidden lg:block absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-sugan-cream to-transparent" />
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-10 left-10 w-20 h-20 border border-sugan-gold/20 rounded-full hidden lg:block animate-float" />
      <div className="absolute top-1/3 right-[10%] w-3 h-3 bg-sugan-gold/40 rounded-full hidden lg:block animate-float animation-delay-500" />
    </section>
  );
}
