import { useEffect, useState } from 'react';

type CursorVariant = 'default' | 'hover' | 'view';

export default function Cursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [variant, setVariant] = useState<CursorVariant>('default');
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(pointer: coarse)').matches) return;
    setEnabled(true);

    const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      if (!t) return setVariant('default');
      if (t.closest('[data-cursor="view"]')) setVariant('view');
      else if (t.closest('a, button, [role="button"], input, textarea, select, label'))
        setVariant('hover');
      else setVariant('default');
    };

    window.addEventListener('mousemove', move);
    window.addEventListener('mouseover', over);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', over);
    };
  }, []);

  if (!enabled) return null;

  const size = variant === 'view' ? 96 : variant === 'hover' ? 40 : 8;

  return (
    <>
      {/* Hide native cursor on pointer-fine devices */}
      <style>{`@media (pointer: fine) { *, *::before, *::after { cursor: none !important; } }`}</style>
      <div
        className="fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference"
        style={{
          transform: `translate3d(${pos.x - size / 2}px, ${pos.y - size / 2}px, 0)`,
          width: size,
          height: size,
          transition:
            'width 300ms cubic-bezier(0.16,1,0.3,1), height 300ms cubic-bezier(0.16,1,0.3,1)',
        }}
        aria-hidden="true"
      >
        <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-[10px] uppercase tracking-[0.18em] text-black font-medium">
          {variant === 'view' ? 'View' : ''}
        </div>
      </div>
    </>
  );
}
