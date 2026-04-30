import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import SplitType from 'split-type';

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.fromTo(
        imageRef.current,
        { scale: 1.05, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.4, ease: 'expo.out' }
      );

      const split = headlineRef.current
        ? new SplitType(headlineRef.current, { types: 'lines,words' })
        : null;

      if (split?.words) {
        tl.fromTo(
          split.words,
          { y: 32, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.2, stagger: 0.03, ease: 'expo.out' },
          0.2
        );
      }

      tl.fromTo(
        [eyebrowRef.current, ctaRef.current],
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.08, ease: 'power3.out' },
        '-=0.6'
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative w-full h-screen min-h-[640px] overflow-hidden bg-sugan-bone-dark"
    >
      {/* Full-bleed image */}
      <img
        ref={imageRef}
        src="/images/SAC030.jpeg"
        alt="Solid wood furniture, hand-shaped in Jodhpur"
        data-cursor="view"
        className="absolute inset-0 w-full h-full object-cover will-change-transform"
      />

      {/* Bottom gradient - covers ~40% from below */}
      <div className="absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-sugan-bone via-sugan-bone/40 to-transparent pointer-events-none" />

      {/* Content baseline-aligned to bottom-left */}
      <div className="absolute inset-x-0 bottom-0 section-padding pb-[clamp(40px,8vw,96px)]">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <div className="flex flex-col gap-5 max-w-4xl">
            <p
              ref={eyebrowRef}
              className="text-eyebrow font-body uppercase text-sugan-ink-soft"
            >
              Jodhpur · Since 1999
            </p>
            <h1
              ref={headlineRef}
              className="font-display text-display-2xl font-light text-sugan-ink"
            >
              Solid wood,
              <br />
              shaped by hand.
            </h1>
          </div>

          <div ref={ctaRef} className="lg:pb-3">
            <Link
              to="/shop"
              className="btn-ghost group"
            >
              Explore the collection
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 ease-apple group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
