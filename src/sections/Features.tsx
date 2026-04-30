import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const pillars = [
  {
    number: '01',
    label: 'Solid Wood',
    headline: 'Always solid. Never veneered.',
    body: 'Sheesham, teak, mango, acacia - slow-grown hardwoods, sustainably sourced and finished with food-safe oils. Never particle board, never veneer.',
  },
  {
    number: '02',
    label: 'Jodhpur',
    headline: 'Built in Boranada, Jodhpur.',
    body: 'Every piece comes out of our workshops in Boranada, hand-finished by craftsmen whose families have worked the same wood for generations.',
  },
  {
    number: '03',
    label: '25 Years',
    headline: 'Built in 1999. Built to outlast us.',
    body: 'A quarter-century of one trade, one material, one obsession with joinery. Each piece is signed, numbered, and made to be inherited.',
    cta: { label: 'Read our process', to: '/bulk-orders' },
  },
];

export default function Features() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cols = sectionRef.current?.querySelectorAll('[data-pillar]');
      if (cols) {
        gsap.fromTo(
          cols,
          { y: 32, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
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
      className="bg-sugan-bone section-padding section-y"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-y-16">
        {pillars.map((p, i) => (
          <div
            key={p.number}
            data-pillar
            className={[
              'flex flex-col gap-6 md:px-gutter',
              i > 0 ? 'md:border-l md:border-sugan-ink/10' : '',
              i > 0 ? 'border-t md:border-t-0 border-sugan-ink/10 pt-16 md:pt-0' : '',
            ].join(' ')}
          >
            <p className="font-body tabular-nums text-eyebrow text-sugan-ink uppercase">
              {p.number} <span className="mx-2 text-sugan-ink/30">/</span> {p.label}
            </p>
            <h3 className="font-display text-display-md font-light text-sugan-ink max-w-md">
              {p.headline}
            </h3>
            <p className="font-body text-body text-sugan-ink-soft max-w-prose">
              {p.body}
            </p>
            {p.cta && (
              <div className="pt-2">
                <Link to={p.cta.to} className="btn-ghost group">
                  {p.cta.label}
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 ease-apple group-hover:translate-x-1" />
                </Link>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
