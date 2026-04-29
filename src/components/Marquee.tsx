type MarqueeProps = {
  items: string[];
};

export default function Marquee({ items }: MarqueeProps) {
  const row = (
    <div className="flex shrink-0 items-center gap-12 pr-12">
      {items.map((t, i) => (
        <span
          key={i}
          className="font-display text-[clamp(40px,6vw,96px)] font-light text-sugan-ink whitespace-nowrap leading-none flex items-center"
        >
          {t}
          <span
            className="inline-block w-2 h-2 rounded-full bg-sugan-gold mx-12 align-middle"
            aria-hidden="true"
          />
        </span>
      ))}
    </div>
  );

  return (
    <div
      className="relative w-full overflow-hidden border-y border-sugan-ink/10 py-8 bg-sugan-bone"
      aria-hidden="true"
    >
      <div className="flex w-max animate-marquee">
        {row}
        {row}
      </div>
    </div>
  );
}
