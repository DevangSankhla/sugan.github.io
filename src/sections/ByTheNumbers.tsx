import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 5000, suffix: '+', label: 'Customers' },
  { value: 25, suffix: '', label: 'Years' },
  { value: 100, suffix: '%', label: 'Solid Wood' },
];

export default function ByTheNumbers() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const headline = sectionRef.current?.querySelector('[data-headline]');
      if (headline) {
        gsap.fromTo(
          headline,
          { y: 32, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      const numbers = sectionRef.current?.querySelectorAll<HTMLElement>('[data-counter]');
      numbers?.forEach((el) => {
        const target = Number(el.dataset.target ?? 0);
        const suffix = el.dataset.suffix ?? '';
        gsap.fromTo(
          el,
          { innerText: 0 },
          {
            innerText: target,
            duration: 1.6,
            ease: 'power2.out',
            snap: { innerText: 1 },
            onUpdate() {
              const current = Math.round(parseFloat(el.textContent || '0'));
              el.textContent = current.toLocaleString() + suffix;
            },
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-sugan-bone section-padding section-y"
    >
      <div className="max-w-6xl">
        <p className="text-eyebrow font-body uppercase text-sugan-ink-soft mb-8 inline-flex items-center gap-3">
          <span className="block w-12 h-px bg-sugan-ink/20" aria-hidden="true" />
          Established 1999
        </p>

        <h2
          data-headline
          className="font-display text-display-xl font-light text-sugan-ink mb-20 max-w-4xl"
        >
          Twenty-five
          <br />
          years of
          <br />
          solid wood.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-12">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={[
                'flex flex-col gap-4 md:px-gutter pt-8',
                i > 0 ? 'md:border-l md:border-sugan-ink/10' : '',
                'border-t border-sugan-ink/10',
              ].join(' ')}
            >
              <span
                data-counter
                data-target={stat.value}
                data-suffix={stat.suffix}
                className="font-display text-display-2xl font-light text-sugan-ink tabular-nums leading-none"
              >
                0{stat.suffix}
              </span>
              <span className="text-eyebrow font-body uppercase text-sugan-ink-soft">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
