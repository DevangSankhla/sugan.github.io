import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

type RevealOptions = {
  stagger?: number;
  y?: number;
};

export function useReveal<T extends HTMLElement = HTMLElement>(
  selector = '.reveal',
  opts: RevealOptions = {}
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const scope = ref.current ?? undefined;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(selector).forEach((el) => {
        const split =
          el.dataset.split === 'true' ? new SplitType(el, { types: 'lines,words' }) : null;
        const targets = (split?.words as Element[] | null) ?? el;

        gsap.fromTo(
          targets,
          { y: opts.y ?? 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: opts.stagger ?? (split ? 0.02 : 0.06),
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    }, scope);

    return () => ctx.revert();
  }, [selector, opts.stagger, opts.y]);

  return ref;
}
