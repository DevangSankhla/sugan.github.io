import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

export default function CTA() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const headline = sectionRef.current?.querySelector('[data-cta-headline]');
      if (headline) {
        const split = new SplitType(headline as HTMLElement, { types: 'lines,words' });
        if (split.words) {
          gsap.fromTo(
            split.words,
            { y: 32, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1.2,
              stagger: 0.04,
              ease: 'expo.out',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 75%',
                toggleActions: 'play none none none',
              },
            }
          );
        }
      }

      const cta = sectionRef.current?.querySelector('[data-cta-button]');
      if (cta) {
        gsap.fromTo(
          cta,
          { y: 16, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            delay: 0.4,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
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
      id="contact"
      ref={sectionRef}
      className="relative bg-sugan-ink text-sugan-bone overflow-hidden"
    >
      {/* Scoped grain at 0.06 opacity */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-screen"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      <div className="relative section-padding py-[clamp(120px,18vw,260px)] flex flex-col items-center justify-center text-center">
        <h2
          data-cta-headline
          className="font-display text-display-2xl font-light leading-[0.95] mb-12 max-w-5xl"
        >
          Built once.
          <br />
          Kept forever.
        </h2>

        <div data-cta-button>
          <Link
            to="/shop"
            data-cursor="view"
            className="
              inline-flex items-center gap-2 px-7 py-4 rounded-pill
              bg-sugan-bone text-sugan-ink
              font-body text-[13px] font-medium tracking-[0.08em] uppercase
              transition-[transform,background-color] duration-300 ease-apple
              hover:bg-sugan-gold hover:text-sugan-ink active:scale-[0.98] group
            "
          >
            Explore the collection
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 ease-apple group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
