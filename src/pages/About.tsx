import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 25, suffix: '', label: 'Years' },
  { value: 300, suffix: '+', label: 'Artisans' },
  { value: 27, suffix: '', label: 'Countries Served' },
];

export default function AboutPage() {
  const storyRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const woodRef = useRef<HTMLDivElement>(null);
  const rangeRef = useRef<HTMLDivElement>(null);

  // Founding story animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      const image = storyRef.current?.querySelector('[data-about-image]');
      if (image) {
        gsap.fromTo(
          image,
          { scale: 1.08, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 1.4,
            ease: 'expo.out',
            scrollTrigger: { trigger: image, start: 'top 85%', toggleActions: 'play none none none' },
          }
        );
      }

      storyRef.current?.querySelectorAll('[data-story-headline]').forEach((el) => {
        const split = new SplitType(el as HTMLElement, { types: 'lines,words' });
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
              scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' },
            }
          );
        }
      });

      const bodyEls = storyRef.current?.querySelectorAll('[data-story-body]');
      if (bodyEls?.length) {
        gsap.fromTo(
          bodyEls,
          { y: 16, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.08,
            ease: 'power3.out',
            scrollTrigger: { trigger: bodyEls[0], start: 'top 85%', toggleActions: 'play none none none' },
          }
        );
      }
    }, storyRef);

    return () => ctx.revert();
  }, []);

  // Stats counter animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      const numbers = statsRef.current?.querySelectorAll<HTMLElement>('[data-counter]');
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
            scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' },
          }
        );
      });
    }, statsRef);

    return () => ctx.revert();
  }, []);

  // Wood section fade-up
  useEffect(() => {
    const ctx = gsap.context(() => {
      const els = woodRef.current?.querySelectorAll('[data-wood-reveal]');
      if (els?.length) {
        gsap.fromTo(
          els,
          { y: 16, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: { trigger: woodRef.current, start: 'top 80%', toggleActions: 'play none none none' },
          }
        );
      }
    }, woodRef);

    return () => ctx.revert();
  }, []);

  // Range section fade-up
  useEffect(() => {
    const ctx = gsap.context(() => {
      const els = rangeRef.current?.querySelectorAll('[data-range-reveal]');
      if (els?.length) {
        gsap.fromTo(
          els,
          { y: 16, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: { trigger: rangeRef.current, start: 'top 80%', toggleActions: 'play none none none' },
          }
        );
      }
    }, rangeRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-sugan-bone pt-32">

      {/* Section 1 — Page header */}
      <div className="section-padding pb-10 border-b border-sugan-ink/10">
        <p className="text-eyebrow font-body uppercase text-sugan-ink-soft mb-6 inline-flex items-center gap-3">
          <span className="block w-12 h-px bg-sugan-ink/20" aria-hidden="true" />
          Est. 1999 · Jodhpur
        </p>
        <h1 className="font-display text-display-xl font-light text-sugan-ink">
          Sugan
        </h1>
        <p className="mt-6 max-w-2xl font-body text-body-lg text-sugan-ink-soft">
          A Hindi word. It means good. It means kind.
        </p>
      </div>

      {/* Section 2 — Name block */}
      <div className="section-padding py-section-y text-center">
        <p
          aria-hidden="true"
          className="font-display text-display-2xl font-light text-sugan-ink/10 select-none mb-8"
        >
          सुगन
        </p>
        <p className="font-body text-body-lg text-sugan-ink-soft max-w-2xl mx-auto">
          Sugan is a Hindi word. It means good. It means kind. It is the name our founder carried,
          and the only brief this business has ever followed.
        </p>
      </div>

      {/* Section 3 — Founding story */}
      <div ref={storyRef} className="grid grid-cols-1 lg:grid-cols-[60fr_40fr]">
        {/* Sticky image */}
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
        <div className="section-padding py-section-y lg:py-[clamp(96px,15vh,240px)] flex flex-col gap-16">

          {/* 1999 block */}
          <div className="flex flex-col gap-6">
            <p data-story-body className="text-eyebrow font-body uppercase text-sugan-ink-soft inline-flex items-center gap-3">
              <span className="block w-12 h-px bg-sugan-ink/20" aria-hidden="true" />
              Jodhpur, 1999
            </p>
            <h2 data-story-headline className="font-display text-display-xl font-light text-sugan-ink">
              Built in 1999.
              <br />
              Built to outlast us.
            </h2>
            <div data-story-body className="space-y-5 font-body text-body-lg text-sugan-ink-soft leading-relaxed">
              <p>
                He opened a workshop in Boranada, the district where Jodhpur's craftspeople
                have worked the same hardwoods for generations, passing knowledge from father
                to son the way you pass a tool: with both hands, without ceremony.
              </p>
              <p>
                The first years were spent learning the trade as seriously as any apprentice.
                Which woods hold their shape. Which joinery survives decades of daily use.
                Which finishes protect the grain without hiding it.
              </p>
              <p>
                By 2001, the work was good enough that the world came looking. What followed
                was two decades of building for international markets. Buyers across 27 countries
                who demanded quality that would survive shipping, climate changes, and daily use
                for years without complaint. That discipline shaped everything we do.
              </p>
            </div>
          </div>

          {/* 2026 block */}
          <div className="flex flex-col gap-6 border-t border-sugan-ink/10 pt-16">
            <p data-story-body className="text-eyebrow font-body uppercase text-sugan-ink-soft inline-flex items-center gap-3">
              <span className="block w-12 h-px bg-sugan-ink/20" aria-hidden="true" />
              The Second Chapter
            </p>
            <h2 data-story-headline className="font-display text-display-xl font-light text-sugan-ink">
              2026.
              <br />
              Coming Home.
            </h2>
            <div data-story-body className="space-y-5 font-body text-body-lg text-sugan-ink-soft leading-relaxed">
              <p>
                The domestic chapter. The second generation, working out of the same workshops
                in Boranada with the same team of craftspeople whose families have been doing
                this trade for as long as anyone can remember.
              </p>
              <p>
                We are not a startup. We are a 25-year-old manufacturer that finally decided
                it was time to sell directly to Indian homes. The craft was always here.
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Section 4 — Stats */}
      <div ref={statsRef} className="bg-sugan-bone section-padding section-y">
        <p className="text-eyebrow font-body uppercase text-sugan-ink-soft mb-16 inline-flex items-center gap-3">
          <span className="block w-12 h-px bg-sugan-ink/20" aria-hidden="true" />
          By the numbers
        </p>
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

      {/* Section 5 — The Wood */}
      <div ref={woodRef} className="section-padding section-y border-t border-sugan-ink/10">
        <p data-wood-reveal className="text-eyebrow font-body uppercase text-sugan-ink-soft mb-6 inline-flex items-center gap-3">
          <span className="block w-12 h-px bg-sugan-ink/20" aria-hidden="true" />
          The Wood
        </p>
        <h2 data-wood-reveal className="font-display text-display-xl font-light text-sugan-ink mb-10 max-w-3xl">
          Sourced with patience.
        </h2>
        <p data-wood-reveal className="font-body text-body-lg text-sugan-ink-soft max-w-2xl leading-relaxed mb-12">
          We work in sheesham, acacia, mango wood, and teak. All sustainably sourced.
          Not because sustainability is fashionable, but because the forests that grew
          these trees took decades to do so, and we owe them the same patience we give
          our joinery. Food-safe finishes. Solid construction. Never particle board.
          Never veneer. A piece from our workshop is made to outlast the room it lives in.
        </p>
        <div data-wood-reveal className="flex flex-wrap gap-0">
          {['Sheesham', 'Acacia', 'Mango Wood', 'Teak'].map((material, i) => (
            <span
              key={material}
              className={[
                'text-eyebrow font-body uppercase text-sugan-ink px-6 py-3',
                i > 0 ? 'border-l border-sugan-ink/10' : '',
              ].join(' ')}
            >
              {material}
            </span>
          ))}
        </div>
      </div>

      {/* Section 6 — What We Make */}
      <div ref={rangeRef} className="section-padding section-y border-t border-sugan-ink/10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-gutter items-start">
          <div className="flex flex-col gap-6">
            <p data-range-reveal className="text-eyebrow font-body uppercase text-sugan-ink-soft inline-flex items-center gap-3">
              <span className="block w-12 h-px bg-sugan-ink/20" aria-hidden="true" />
              What We Make
            </p>
            <h2 data-range-reveal className="font-display text-display-xl font-light text-sugan-ink">
              Everything for the home,
              <br />
              in wood.
            </h2>
            <div data-range-reveal className="space-y-5 font-body text-body-lg text-sugan-ink-soft leading-relaxed">
              <p>
                A serving tray and a custom dining table for a twelve-person household
                come from the same hands, the same workshops, the same standard of finish.
              </p>
              <p>
                For most pieces we take custom orders: your dimensions, your wood species,
                your finish, your hardware. For large requirements, hotels, resorts, offices,
                entire projects, we have the infrastructure to deliver at scale and on schedule.
              </p>
              <p>
                There is no order too small to take seriously. There is no order too large for
                us to handle.
              </p>
            </div>
          </div>

          <div data-range-reveal className="flex flex-col gap-4 lg:pt-[clamp(64px,8vw,128px)]">
            <Link to="/shop" className="btn-ghost group self-start">
              Explore the collection
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 ease-apple group-hover:translate-x-1" />
            </Link>
            <Link to="/bulk-orders" className="btn-ghost group self-start">
              Bulk and custom orders
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 ease-apple group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>

      {/* Section 7 — Closing promise */}
      <div className="bg-sugan-ink section-padding py-section-y text-center">
        <div className="max-w-3xl mx-auto flex flex-col gap-4">
          <p className="font-display text-display-xl font-light text-sugan-bone">Good.</p>
          <p className="font-display text-display-xl font-light text-sugan-bone">Kind.</p>
          <p className="font-display text-display-xl font-light text-sugan-bone">Made well.</p>
          <p className="mt-8 font-body text-body text-sugan-bone/50">
            The founding promise. Every piece, every order, every year.
          </p>
        </div>
      </div>

    </div>
  );
}
