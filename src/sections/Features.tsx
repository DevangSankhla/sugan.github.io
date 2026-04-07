import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, Truck, ShieldCheck, Leaf } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: Award,
    title: 'Premium Quality',
    description:
      'Crafted from the finest solid wood, each piece undergoes rigorous quality checks to ensure lasting durability and beauty.',
  },
  {
    icon: Truck,
    title: 'Free Shipping',
    description:
      'Enjoy complimentary delivery across India via Amazon FBA. Fast, reliable, and right to your doorstep.',
  },
  {
    icon: ShieldCheck,
    title: 'Secure Payment',
    description:
      'Shop with confidence using Amazon\'s trusted payment gateway. 100% secure transactions guaranteed.',
  },
  {
    icon: Leaf,
    title: 'Eco-Friendly',
    description:
      'Sustainably sourced wood with food-safe, non-toxic finishes. Good for your home, good for the planet.',
  },
];

export default function Features() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardsRef.current?.querySelectorAll('.feature-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              end: 'top 30%',
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
      ref={sectionRef}
      className="py-20 lg:py-32 bg-sugan-cream section-padding"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sugan-gold font-body text-sm tracking-[0.2em] uppercase mb-3">
            Why Choose Us
          </p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-light text-sugan-brown">
            The Sugan <span className="font-medium">Difference</span>
          </h2>
        </div>

        <div
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
        >
          {features.map((feature, index) => (
            <div
              key={index}
              className="feature-card group"
              style={{ marginTop: index % 2 === 1 ? '2rem' : '0' }}
            >
              <div className="feature-icon mb-6">
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="font-display text-xl font-medium text-sugan-brown mb-3">
                {feature.title}
              </h3>
              <p className="text-sugan-brown/60 font-body text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
