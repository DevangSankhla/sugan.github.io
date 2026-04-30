import { useState, useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { testimonials } from '@/data/rooms';

gsap.registerPlugin(ScrollTrigger);

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);

  const goTo = useCallback((index: number) => {
    setActiveIndex((index + testimonials.length) % testimonials.length);
  }, []);

  // Keyboard arrow support when section is in view
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const inView = rect.top < window.innerHeight * 0.6 && rect.bottom > window.innerHeight * 0.4;
      if (!inView) return;
      if (e.key === 'ArrowRight') goTo(activeIndex + 1);
      if (e.key === 'ArrowLeft') goTo(activeIndex - 1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [activeIndex, goTo]);

  // Auto-rotate
  useEffect(() => {
    const id = setInterval(() => goTo(activeIndex + 1), 6000);
    return () => clearInterval(id);
  }, [activeIndex, goTo]);

  // Reveal the active quote
  useEffect(() => {
    const ctx = gsap.context(() => {
      const active = headlineRef.current?.querySelector(`[data-quote-index="${activeIndex}"]`);
      if (!active) return;
      gsap.fromTo(
        active,
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, [activeIndex]);

  const t = testimonials[activeIndex];

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="relative bg-sugan-bone min-h-[90vh] flex items-center justify-center section-padding section-y overflow-hidden"
    >
      <div className="relative w-full max-w-4xl text-center">
        {/* Oversized opening quote */}
        <span
          aria-hidden="true"
          className="block font-display text-display-2xl font-light text-sugan-gold/30 leading-none mb-6 select-none"
        >
          “
        </span>

        {/* Quote */}
        <div ref={headlineRef} className="relative min-h-[8em]">
          {testimonials.map((q, i) => (
            <p
              key={q.id}
              data-quote-index={i}
              className={`font-display text-display-lg font-light italic text-sugan-ink leading-snug transition-opacity duration-500 ease-apple ${
                i === activeIndex ? 'opacity-100' : 'absolute inset-0 opacity-0 pointer-events-none'
              }`}
            >
              {q.text}
            </p>
          ))}
        </div>

        {/* Closing quote glyph */}
        <span
          aria-hidden="true"
          className="block font-display text-display-2xl font-light text-sugan-gold/30 leading-none mt-2 mb-12 select-none"
        >
          ”
        </span>

        {/* Attribution */}
        <p className="text-eyebrow font-body uppercase text-sugan-ink-soft inline-flex flex-wrap items-center justify-center gap-2">
          <span>- {t.name}, {t.location}</span>
          <span aria-hidden="true" className="text-sugan-ink/30">·</span>
          <span className="text-sugan-ink-soft/80">Verified buyer</span>
        </p>

        {/* Dot pagination */}
        <div className="flex items-center justify-center gap-3 mt-12">
          {testimonials.map((q, i) => (
            <button
              key={q.id}
              onClick={() => goTo(i)}
              aria-label={`Show testimonial ${i + 1}`}
              className={`h-1.5 rounded-pill transition-all duration-400 ease-apple ${
                i === activeIndex
                  ? 'w-8 bg-sugan-ink'
                  : 'w-1.5 bg-sugan-ink/20 hover:bg-sugan-ink/40'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
