import { useEffect, useState } from 'react';

const STORAGE_KEY = 'sugan-splash-shown';

export default function Splash() {
  const [shown, setShown] = useState(false);
  const [hiding, setHiding] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (sessionStorage.getItem(STORAGE_KEY)) return;

    setShown(true);
    sessionStorage.setItem(STORAGE_KEY, '1');

    const fadeStart = window.setTimeout(() => setHiding(true), 1200);
    const remove = window.setTimeout(() => setShown(false), 1700);
    return () => {
      window.clearTimeout(fadeStart);
      window.clearTimeout(remove);
    };
  }, []);

  if (!shown) return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[10000] bg-sugan-ink flex flex-col items-center justify-center gap-6 transition-opacity duration-500 ease-apple ${
        hiding ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <span className="font-display text-display-2xl font-light text-sugan-bone tracking-[-0.04em] animate-[splash-fade_400ms_ease-out_forwards]">
        Sugan
      </span>
      <span className="block h-px bg-sugan-gold animate-[splash-line_800ms_ease-out_forwards] origin-left" />
      <style>{`
        @keyframes splash-fade {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes splash-line {
          from { width: 0; }
          to   { width: clamp(160px, 28vw, 360px); }
        }
      `}</style>
    </div>
  );
}
