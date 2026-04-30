import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image scale-in on enter
      const image = sectionRef.current?.querySelector('[data-about-image]');
      if (image) {
        gsap.fromTo(
          image,
          { scale: 1.08, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 1.4,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: image,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Word-by-word headline reveal
      const headline = sectionRef.current?.querySelector('[data-about-headline]');
      if (headline) {
        const split = new SplitType(headline as HTMLElement, { types: 'lines,words' });
        if (split.words) {
          gsap.fromTo(
            split.words,
            { y: 24, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1,
              stagger: 0.03,
              ease: 'expo.out',
              scrollTrigger: {
                trigger: headline,
                start: 'top 85%',
                toggleActions: 'play none none none',
              },
            }
          );
        }
      }

      // Body + CTA fade up
      const bodyEls = sectionRef.current?.querySelectorAll('[data-about-body]');
      if (bodyEls) {
        gsap.fromTo(
          bodyEls,
          { y: 16, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.08,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: bodyEls[0],
              start: 'top 85%',
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
      id="about"
      ref={sectionRef}
      className="bg-sugan-bone section-y"
    >
      <div className="grid grid-cols-1 lg:grid-cols-[60fr_40fr]">
        {/* Image (full-bleed left, sticky on desktop) */}
        <div className="relative h-[70vh] lg:h-auto">
          <div className="lg:sticky lg:top-0 lg:h-screen overflow-hidden">
            <img
              data-about-image
              src="/images/Crafting Excellence hero.jpeg"
              alt="Sugan workshop, Jodhpur"
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Text column */}
        <div className="section-padding py-section-y lg:py-[clamp(96px,15vh,240px)] flex flex-col gap-10 max-w-2xl">
          <p
            data-about-body
            className="text-eyebrow font-body uppercase text-sugan-ink-soft inline-flex items-center gap-3"
          >
            <span className="block w-12 h-px bg-sugan-ink/20" aria-hidden="true" />
            Our heritage
          </p>

          <h2
            data-about-headline
            className="font-display text-display-xl font-light text-sugan-ink"
          >
            Crafting excellence,
            <br />
            since 1999.
          </h2>

          <div
            data-about-body
            className="space-y-5 font-body text-body-lg text-sugan-ink-soft leading-relaxed"
          >
            <p>
              For over two decades, Sugan has been synonymous with premium
              wooden craftsmanship in Jodhpur, the heart of Rajasthan's
              artisanal heritage. What began as a small family workshop has
              grown into multiple manufacturing workshops, all working in
              solid wood.
            </p>
            <p>
              Each piece is hand-shaped by artisans who inherited the trade
              through generations. We work in sheesham, teak, and acacia -
              slow-grown, sustainably sourced, and finished with food-safe
              oils that protect without hiding the grain.
            </p>
            <p>
              Twenty-five years on, the answer to "why solid wood?" hasn't
              changed: it's the only material that earns more character
              with use.
            </p>
          </div>

          <div data-about-body className="pt-2">
            <Link to="/contact" className="btn-ghost group">
              Visit our workshops
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 ease-apple group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
