# Sugan — Atelier Apple Redesign Brief

A complete design specification for elevating sugan.shop from "tasteful artisan e-commerce" to a premium, restraint-driven, Apple/Aesop-grade experience. Hand this entire document to Claude Code and instruct it to execute phase-by-phase.

> Stack on hand: React 18 + TypeScript + Vite + TailwindCSS + shadcn/ui + GSAP + ScrollTrigger + react-router-dom. Existing palette token names live in `tailwind.config.*` as `sugan-cream / sugan-brown / sugan-gold` and friends. Display font: Cormorant Garamond. Body font: Inter.

---

## 0. Design philosophy (read before touching code)

The current site fills the frame. The redesign empties it. Premium is not what you add — it's what you remove and what you keep.

Three rules everyone violates that we will not:

1. **One accent, used three times max per viewport.** Gold is a guest, not a host. Default text and chrome is ink-black on bone. Gold appears only on the *one* thing we want the eye to land on.
2. **Type does the heavy lifting.** Headlines are 1.4x bigger than instinct says, with tighter tracking and lighter weight. Body copy gets longer line-height and shorter measure (max-w-prose).
3. **Motion is engineered, not decorative.** No bouncing badges, no 360° icon rotations, no idle floating dots. Every animation has a reason: reveal, response, or affirmation. Time them in 200ms / 400ms / 800ms — nothing in between.

If a change fights one of those rules, undo it.

---

## 1. Design tokens

### 1.1 Palette — replace these in `tailwind.config.ts` (or `.js`) and `src/index.css` `:root`

| Token | Old (current) | New (Atelier Apple) | HSL for `index.css` |
|---|---|---|---|
| `sugan-bone` (was `sugan-cream`) | `#F5F0E8` | `#FAF8F5` | `36 33% 97%` |
| `sugan-bone-dark` (was `sugan-cream-dark`) | `#E8E0D4` | `#EFEAE2` | `36 24% 91%` |
| `sugan-ink` (was `sugan-brown`) | `#2C1810` | `#0F0E0C` | `30 13% 5%` |
| `sugan-ink-soft` (new — replaces `sugan-brown/60`) | n/a | `#3C3530` | `28 11% 21%` |
| `sugan-line` (new — for hairline borders) | n/a | `#1A1A1A1A` (ink at 10% alpha) | use `border-sugan-ink/10` |
| `sugan-gold` (kept, slightly desaturated) | `#D4A056` | `#B68B3F` | `36 49% 48%` |
| `sugan-gold-soft` (new — for backgrounds) | n/a | `#F5EBD8` | `38 56% 90%` |

**Action:** rename `sugan-cream` → `sugan-bone` everywhere via global find-and-replace. Same for `sugan-brown` → `sugan-ink`. The new names re-frame the brand mentally as well as visually.

### 1.2 Typography — replace `@import` in `src/index.css`

Swap the current Cormorant Garamond + Inter pairing for:

```css
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@300;400;500;600;700&display=swap');
```

**Why Fraunces:** modern variable serif, optical sizing, hits the same heritage register as Cormorant but with more presence at large sizes — the typeface Aesop and Hims-tier brands reach for now. Keep Inter for body.

### 1.3 Type scale — wire into `tailwind.config.ts` `theme.extend.fontSize`

| Token | Size | Line-height | Letter-spacing | Use |
|---|---|---|---|---|
| `display-2xl` | clamp(56px, 9vw, 144px) | 0.95 | -0.04em | Hero H1 only |
| `display-xl` | clamp(40px, 6vw, 96px) | 0.98 | -0.03em | Section H2s |
| `display-lg` | clamp(32px, 4vw, 64px) | 1.05 | -0.025em | Sub-headlines |
| `display-md` | clamp(24px, 2.5vw, 40px) | 1.15 | -0.02em | Card headlines |
| `eyebrow` | 11px | 1 | 0.18em (uppercase) | Section labels |
| `body-lg` | 18px | 1.6 | -0.005em | Hero descriptor, lead paragraphs |
| `body` | 15px | 1.65 | 0 | Default body |
| `body-sm` | 13px | 1.5 | 0 | Captions, meta |
| `mono` | 12px | 1.4 | 0.04em | Prices, SKUs (Inter `tabular-nums`) |

Default `font-display` weight is **300** for headlines. Use 400 only when you need emphasis. Never use 600+ for display type (looks chunky).

### 1.4 Spacing — be ruthless

Add a new scale to Tailwind: `theme.extend.spacing`:
```js
'section-y': 'clamp(96px, 12vw, 200px)',   // vertical section padding
'section-x': 'clamp(20px, 5vw, 96px)',     // horizontal page padding
'gutter': 'clamp(16px, 2vw, 32px)',        // grid gutter
```

Rewrite `.section-padding` in `src/index.css`:
```css
.section-padding { @apply px-section-x; }
.section-y { @apply py-section-y; }
```

### 1.5 Radii — flatten everything

Replace all `rounded-xl`, `rounded-2xl` with **`rounded-none`** or `rounded-sm` (2px). Premium reads as *square*, not rounded. The only exception is buttons (see §1.6) and circular elements (avatars, decorative circles).

Update Tailwind config:
```js
borderRadius: {
  none: '0',
  sm: '2px',
  DEFAULT: '4px',
  pill: '9999px', // for buttons only
},
```

### 1.6 Shadows — kill them

Drop `hover:shadow-gold`, `hover:shadow-gold-lg`, `shadow-2xl` etc. Replace with one shadow token:

```js
boxShadow: {
  hairline: '0 0 0 1px rgb(15 14 12 / 0.08)',
  lift: '0 24px 60px -20px rgb(15 14 12 / 0.12)',
}
```

`hairline` is the new default for cards (1px ink-on-bone outline, no blur). `lift` is for the modal/cart drawer only.

### 1.7 Buttons — replace `.btn-primary` and `.btn-outline` in `src/index.css`

```css
.btn-primary {
  @apply inline-flex items-center justify-center gap-2 bg-sugan-ink text-sugan-bone
         px-7 py-4 font-body text-[13px] font-medium tracking-[0.08em] uppercase
         rounded-pill transition-[transform,background-color] duration-300 ease-out
         hover:bg-sugan-gold active:scale-[0.98];
}

.btn-outline {
  @apply inline-flex items-center justify-center gap-2 bg-transparent text-sugan-ink
         border border-sugan-ink/20 px-7 py-4 font-body text-[13px] font-medium
         tracking-[0.08em] uppercase rounded-pill transition-all duration-300
         hover:border-sugan-ink hover:bg-sugan-ink hover:text-sugan-bone active:scale-[0.98];
}

.btn-ghost {
  @apply inline-flex items-center gap-1.5 text-sugan-ink font-body text-[13px]
         tracking-[0.04em] uppercase border-b border-sugan-ink/30 pb-1
         transition-colors hover:border-sugan-gold hover:text-sugan-gold;
}
```

The `rounded-pill` on buttons is intentional — pill buttons against square cards = Apple's exact recipe.

---

## 2. Motion language

### 2.1 Install three new libraries

```bash
npm i lenis @studio-freight/react-lenis split-type
```

- **Lenis** — smooth scroll. Wraps the entire app. Single most impactful change for "premium feel."
- **split-type** — splits headlines into chars/words for staggered reveals. Pairs with GSAP.

### 2.2 Wrap the app in Lenis

In `src/main.tsx` replace contents with:
```tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ReactLenis } from '@studio-freight/react-lenis';
import './index.css';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ReactLenis root options={{ duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) }}>
      <App />
    </ReactLenis>
  </StrictMode>,
);
```

### 2.3 Standard durations (use only these — kill all others)

| Use | Duration | Easing |
|---|---|---|
| Hover state | `200ms` | `ease-out` (cubic-bezier(0.16, 1, 0.3, 1)) |
| State change (modal open, cart open) | `400ms` | `ease-out` |
| Reveal on scroll | `800ms` | `power3.out` |
| Hero reveal | `1200ms` | `expo.out` |

Add to Tailwind `theme.extend.transitionTimingFunction`:
```js
{ 'apple': 'cubic-bezier(0.16, 1, 0.3, 1)' }
```
Then use `ease-apple` everywhere instead of `ease-out`.

### 2.4 Scroll reveals — replace existing GSAP fade-ins

Build a single reusable hook `src/hooks/useReveal.ts`:

```tsx
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

export function useReveal(selector = '.reveal', opts: { stagger?: number; y?: number } = {}) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(selector).forEach((el) => {
        const split = el.dataset.split === 'true' ? new SplitType(el, { types: 'lines,words' }) : null;
        const targets = split?.words ?? el;
        gsap.fromTo(
          targets,
          { y: opts.y ?? 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: opts.stagger ?? (split ? 0.02 : 0.06),
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' },
          }
        );
      });
    }, ref);
    return () => ctx.revert();
  }, [selector, opts.stagger, opts.y]);
  return ref;
}
```

Then in any section: add `className="reveal"` (and `data-split="true"` on H1/H2 for word-by-word). Replace existing per-section GSAP boilerplate with one `useReveal()` call.

### 2.5 Custom cursor — net-new component

Create `src/components/Cursor.tsx`:

```tsx
import { useEffect, useState } from 'react';

export default function Cursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [variant, setVariant] = useState<'default' | 'hover' | 'view'>('default');

  useEffect(() => {
    const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest('[data-cursor="view"]')) setVariant('view');
      else if (t.closest('a, button, [role="button"]')) setVariant('hover');
      else setVariant('default');
    };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseover', over);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', over);
    };
  }, []);

  // Hide on touch devices
  if (typeof window !== 'undefined' && matchMedia('(pointer: coarse)').matches) return null;

  const size = variant === 'view' ? 96 : variant === 'hover' ? 40 : 8;

  return (
    <>
      <style>{`* { cursor: none !important; }`}</style>
      <div
        className="fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference"
        style={{
          transform: `translate3d(${pos.x - size / 2}px, ${pos.y - size / 2}px, 0)`,
          width: size,
          height: size,
          transition: 'width 300ms cubic-bezier(0.16,1,0.3,1), height 300ms cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-[10px] uppercase tracking-widest text-black font-medium">
          {variant === 'view' ? 'View' : ''}
        </div>
      </div>
    </>
  );
}
```

Mount it once in `src/App.tsx` inside `<BrowserRouter>` (just below `<Navigation />`). Add `data-cursor="view"` to product card links and hero image so the cursor expands to "View".

### 2.6 Marquee — net-new component

Create `src/components/Marquee.tsx`:

```tsx
export default function Marquee({ items }: { items: string[] }) {
  const row = (
    <div className="flex shrink-0 items-center gap-16 pr-16">
      {items.map((t, i) => (
        <span key={i} className="font-display text-[clamp(40px,6vw,96px)] font-light text-sugan-ink whitespace-nowrap">
          {t}
          <span className="inline-block w-2 h-2 rounded-full bg-sugan-gold mx-12 align-middle" />
        </span>
      ))}
    </div>
  );
  return (
    <div className="relative w-full overflow-hidden border-y border-sugan-ink/10 py-8 bg-sugan-bone">
      <div className="flex w-max animate-[marquee_40s_linear_infinite]">
        {row}{row}
      </div>
    </div>
  );
}
```

Add to Tailwind config `theme.extend.keyframes` + `animation`:
```js
keyframes: { marquee: { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } } },
animation: { marquee: 'marquee 40s linear infinite' }
```

Use it on the homepage *between* Hero and Features with strings like:
```tsx
<Marquee items={['Handcrafted in Jodhpur', 'Solid Sheesham', 'Since 1999', 'Free Shipping ₹1999+', 'Worldwide Atelier']} />
```

---

## 3. Component-by-component spec

### 3.1 `src/sections/Navigation.tsx`

**Remove:**
- The `bg-sugan-cream/95 backdrop-blur-md py-4 shadow-sm` scroll state — too heavy.
- The `animate-bounce` cart count badge (line 154).
- The mobile menu's centered-item layout.

**Replace with:**
- Default state: `bg-transparent` with `mix-blend-difference` text on home page (so the logo stays readable over hero image without a panel).
- Scrolled state: `bg-sugan-bone/80 backdrop-blur-xl border-b border-sugan-ink/8 py-3` — stricter blur, hairline border, no shadow.
- Logo: switch to `font-display font-light tracking-[-0.02em]` and add a tiny mark — a 6px gold dot — after the wordmark: `Sugan<span class="inline-block w-1.5 h-1.5 rounded-full bg-sugan-gold ml-1 align-middle" />`. That dot is the only gold in the nav.
- Cart badge: **drop the bounce.** Use a small inline counter `[12]` rendered after the bag icon at body-sm size with `tabular-nums`. No pill, no animation, no color — just text.
- Mobile menu: instead of centered links, do a left-aligned full-bleed list with `display-lg` type stacked vertically with a hairline divider between each item. Each item slides in with a 60ms stagger when menu opens.
- Search modal: keep the modal pattern but change `bg-sugan-brown/80` → `bg-sugan-ink/95 backdrop-blur-2xl`, drop `rounded-lg` on the inner card → `rounded-none`, change the input font-size to `display-md`.

### 3.2 `src/sections/Hero.tsx`

**Current problem:** 45/55 split with stats and gold dots — competent but generic.

**New layout — "Editorial Hero":**
- **Full viewport, single image, edge-to-edge.** The image (`/images/SAC030.jpeg`) becomes the entire background at `object-cover` with a subtle bottom-gradient `from-sugan-bone via-transparent to-transparent` covering the bottom 40%.
- **H1 placed at the bottom-left**, baseline-aligned with the bottom of the viewport. Use `display-2xl` (clamp 56→144px) at `font-light`. Two lines max:
  ```
  Solid wood,
  shaped by hand.
  ```
- **Eyebrow** above H1: `Jodhpur · Atelier · Est. 1999` in `eyebrow` style (11px uppercase, 0.18em tracking, ink-soft).
- **Single CTA** to the right of H1 baseline: `btn-ghost` with text "Explore the collection →". Drop the duplicate "BULK/TRADE" button — that's a footer link, not a hero CTA.
- **Stats removed from the hero.** They become their own dedicated section called "By the numbers" placed *after* About (see §3.5).
- **Decorative dots:** delete (lines 186–187 of current Hero).

**Reveals:**
- Image: scale from 1.05 → 1.00 over 1.4s with `expo.out`, opacity 0→1.
- H1: word-by-word reveal (use `useReveal` with `data-split="true"`), 1.2s, 30ms stagger between words, starts 200ms after image.
- Eyebrow + CTA: fade up 16px, 800ms, 200ms after H1.

**Mobile:** image fills 70vh at top, content stacks beneath with `display-xl` H1.

### 3.3 New section: "Marquee strip" (replaces the current Features stagger)

Drop the current Features 4-card grid with rotating icons (it's the most templated thing on the page). Replace with:

**Section A — Marquee** (the component from §2.6) with brand pillars.

**Section B — Editorial Pillars (replaces Features.tsx grid)**

Rebuild `src/sections/Features.tsx` as a 3-column horizontal layout where each pillar is just text — no card, no icon, no shadow:

```
01 / SHEESHAM           02 / JODHPUR           03 / 25 YEARS
[ headline ]            [ headline ]           [ headline ]
[ paragraph ]           [ paragraph ]          [ paragraph ]
                                               [ link → ]
```

Each column has:
- A small monospace number `01 /` in `eyebrow` style with `tabular-nums`
- A `display-md` headline ("Sourced from one species. By design.")
- A 60–80 char body paragraph in `body` style at `text-sugan-ink-soft`
- An optional ghost button on the third column ("Read our process →")

Columns separated by hairline vertical lines (`border-l border-sugan-ink/8`). On mobile, stack vertically with hairline horizontal separators.

### 3.4 `src/sections/Products.tsx` — rebuild as horizontal scroll

**Current:** 3-column grid of room cards with rounded-2xl and decorative circles.

**New: horizontal scroll showcase pinned to vertical scroll position.**

When the user scrolls into this section, the section pins for ~3× viewport height and the rooms slide horizontally. Reference: Apple iPad scroll gallery, Aimé Leon Dore lookbook.

```tsx
useEffect(() => {
  const ctx = gsap.context(() => {
    const track = trackRef.current!;
    gsap.to(track, {
      x: () => -(track.scrollWidth - window.innerWidth) + 'px',
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: () => '+=' + (track.scrollWidth - window.innerWidth),
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
      },
    });
  }, sectionRef);
  return () => ctx.revert();
}, []);
```

Each room card in the horizontal track:
- Aspect ratio 4:5
- Width 60vw on desktop, 80vw on mobile (tablet falls back to vertical stack)
- Full-bleed image of an example product from that room (use existing room images, or first product in room)
- Title overlaid bottom-left at `display-lg`, room name only — no description
- Hover: image scales 1.04 → 1.0 (yes, *reverse* — image starts slightly bigger and "settles" on hover, more interesting than typical zoom-in)
- `data-cursor="view"` on the link

Mobile fallback: vertical 1-col list, no pin.

### 3.5 New section: "By the numbers"

After About, before Testimonials. Pure type, no images. Ink-on-bone.

```
[ ───── ESTABLISHED 1999 ]

Twenty-five
years of
solid wood.

[ 5,000+   25     100%  ]
[ Customers Years  Solid Wood ]
```

Numbers in `display-2xl` `tabular-nums` `font-light`, animated with the same gsap counter you have but trigger on scroll. Hairline divider above each number. This is where the stats live — pulled from Hero so the Hero can breathe.

### 3.6 `src/sections/About.tsx`

(Read it but the spec for it is: full-bleed image left, text right. Image takes 60vw on desktop, sticky-pinned for the height of the text column. Headline at `display-xl`, body at `body-lg`, max 4 short paragraphs. End with a ghost button "Visit the workshop →" linking to a future workshop page or contact.)

If About.tsx already has this rough structure, just apply token swaps.

### 3.7 `src/sections/Testimonials.tsx`

**Remove all card chrome.** Testimonials become editorial pull-quotes, one at a time, each on its own viewport-height block.

```
                    "
The cabinet arrived in
perfect condition and the
joinery is the best I've seen
on a piece under ₹50k.
                    "

— Riya Kapoor, Mumbai · Bought the Khasa sideboard
```

- Quote in `display-lg` `font-light` `italic`, max-w-3xl, centered.
- Quote marks as oversized SVG glyphs at `display-2xl` in `text-sugan-gold/30`.
- Name + verified-purchase line in `eyebrow` style below.
- Use `<Carousel>` from your existing shadcn carousel for navigation, but disable the default arrows — instead a tiny dot pagination at the bottom and keyboard arrow support.

### 3.8 `src/sections/CTA.tsx`

**Replace whatever's there with one move:** a full-bleed dark section. `bg-sugan-ink text-sugan-bone`. Centered headline at `display-2xl`. Single CTA below.

```
Built once.
Kept forever.

[ Explore the collection → ]
```

Add a subtle film grain over this dark block (apply the existing `.grain-overlay` here scoped to the section, double opacity to 0.06).

### 3.9 `src/sections/Footer.tsx`

Footer should feel like a colophon, not a sitemap. Layout:

- **Top:** giant "SUGAN" wordmark in `display-2xl` `font-light`, full-bleed, centered. The wordmark is a Link to `/`.
- **Below the wordmark:** a 4-column hairline-separated grid of small links (Shop / Help / Company / Connect). Links at `body-sm` `text-sugan-ink-soft`. Each column has a tiny eyebrow header.
- **Bottom strip:** copyright + GST + "Made in Jodhpur" on one line at `body-sm`.

Drop social icons as decoration — list them inline as text links: `Instagram · Pinterest · Email`. Way more elevated than colored icons.

### 3.10 `src/components/ProductCard.tsx`

**Remove:**
- `rounded-xl` (line 71) — change to `rounded-none`.
- `hover:shadow-lg` — change to nothing on the wrapper. The hover effect lives only on the image.
- `text-sugan-gold` on the category eyebrow — change to `text-sugan-ink/40` (gold gets reserved).
- `font-display text-sugan-brown font-semibold` on price — change to `font-body text-sugan-ink tabular-nums`. Numbers in serif look amateurish.
- Wishlist heart that fades in on hover — keep the function but make the button always visible at low opacity (`opacity-30 group-hover:opacity-100`), and drop the red bg when active in favor of a filled black heart.

**Add:**
- A second `<img>` placed above the first, opacity-0 → opacity-100 on group-hover. This is the *secondary image reveal* — Aimé Leon Dore / bluorng signature move. If only one image exists for a product, fall back to scale only.
- `data-cursor="view"` on the Link.
- Below the price, a tiny `body-sm` line showing material + dimensions if present (e.g. "Solid Sheesham · 60×40×80cm"). This adds the Apple-spec-sheet feel.

Final card structure:
```tsx
<Link to={...} data-cursor="view" className="group block">
  <div className="relative aspect-[4/5] overflow-hidden bg-sugan-bone-dark">
    <img src={primary} className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 group-hover:opacity-0" />
    <img src={secondary || primary} className="absolute inset-0 w-full h-full object-cover scale-105 opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
    {/* wishlist button absolute top-3 right-3 */}
  </div>
  <div className="pt-4">
    <p className="text-[11px] uppercase tracking-[0.18em] text-sugan-ink/40">{category}</p>
    <h4 className="mt-2 font-body text-[15px] text-sugan-ink">{name}</h4>
    {spec && <p className="mt-1 text-[12px] text-sugan-ink-soft">{spec}</p>}
    <p className="mt-2 font-body text-[15px] text-sugan-ink tabular-nums">₹{price.toLocaleString()}</p>
  </div>
</Link>
```

### 3.11 `src/pages/ProductDetail.tsx`

Make this the most editorial page on the site.

- **Above the fold:** full-viewport image. No text overlay. Just the image and the navigation.
- **Scroll down:** a sticky info panel on the right (40% width) with the name, price, size selector, qty, "Add to bag" button, and a short description. The image gallery on the left becomes a vertically-stacked column of full-width images that scroll past while the right panel pins. Reference: Aesop product pages, Apple Mac product pages.
- **Below the gallery:** a "Specifications" section as a 2-col table — Material | Solid Sheesham, Dimensions | …, Weight | …, Finish | …, Care | …. All in `body-sm` `tabular-nums`, hairline rows.
- **"Crafted by" block** with workshop photo + 1 paragraph about the artisan/process. Re-use ArtisanStory.tsx contents.
- **Related products** at the bottom — horizontal scroll of 4 products, each card per the new ProductCard spec.

### 3.12 `src/pages/Shop.tsx`

- Remove rounded corners and shadows on the filter sidebar.
- Filter labels: `eyebrow` style.
- Active filters as inline chips with `border border-sugan-ink/20 rounded-pill px-3 py-1`.
- Sort dropdown: replace shadcn `<Select>` chrome with a flat ghost button that opens a popover on click — feels more bespoke.
- Grid: 4-up on desktop (was likely 3 or 4), 2-up on mobile, generous gutter (`gutter` token).
- Page header: huge `display-xl` "Shop" with a single sentence subhead, hairline below.

### 3.13 `src/sections/CartDrawer.tsx`

- Drop `rounded-l-xl` etc → `rounded-none`.
- Cart drawer slides in over a 0.4 backdrop blur-xl.
- Each line item: 80×100 thumbnail left, name + size + price right, qty stepper as `[-] 1 [+]` with hairline border, no buttons that scream.
- Free-shipping progress bar — keep the logic but render as a single hairline track with a gold fill, not the chunky rounded bar most likely there.
- Footer of drawer: ink-on-bone primary button "Checkout · ₹X,XXX" at full width with `tabular-nums` price.

### 3.14 Mobile bottom navigation (`src/components/BottomNavigation.tsx`)

- Backdrop `bg-sugan-bone/95 backdrop-blur-2xl` with hairline top border, not shadow.
- Icons + tiny eyebrow-style labels, not boxes around them.
- Active state: a 1px gold underline below the active icon, no fill.

### 3.15 Page loader (in `App.tsx` `PageLoader`)

Replace the spinner with the brand wordmark fading in/out:

```tsx
function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-sugan-bone">
      <span className="font-display text-display-md font-light text-sugan-ink animate-pulse">Sugan</span>
    </div>
  );
}
```

### 3.16 Site-wide initial loader (net-new)

On first visit only, show a 1.2s splash:
- Black background.
- "SUGAN" centered in `display-2xl` white, fading in 0→1 over 400ms.
- A 1px gold line underneath that grows from 0 to 100% width in 800ms.
- After 1.2s, fade out and reveal the home page.

Implement as `src/components/Splash.tsx` and mount in `App.tsx`. Use `sessionStorage` flag so it only shows once per session.

---

## 4. Things to delete (lossless cleanup)

In `src/index.css`:
- `.feature-card:hover .feature-icon { rotate-[360deg] }` — kill the rotation.
- `.product-card::after` gold underline animation — replaced by the dual-image hover.
- The custom scrollbar styling (`::-webkit-scrollbar` block) — Lenis handles it, default scrollbar shouldn't be visible during smooth-scroll.

In `src/App.css`:
- `.feature-card:nth-child(n)` margin-top staggers — we're going horizontal/grid not staggered.
- `.cart-drawer-enter` keyframes — drawer is now driven by GSAP/CSS transition.

In `tailwind.config.*`:
- Any `shadow-gold-sm/md/lg` — replaced with `hairline` and `lift`.
- `animation-delay-*` utilities — GSAP controls timing now.

---

## 5. Implementation phases (give Claude Code one phase per session)

**Phase 1 — Tokens + global (single PR):**
- Update `tailwind.config.*` palette, fonts, type scale, spacing, radii, shadows, easing, marquee animation.
- Update `src/index.css`: new font import, new `:root` HSL vars, new `.btn-*` classes, new `.section-padding`, remove dead styles.
- Find-and-replace `sugan-cream` → `sugan-bone`, `sugan-brown` → `sugan-ink` across all `.tsx`/`.css`. Test that the build still passes.
- Install Lenis + split-type. Wrap app in `<ReactLenis>`.
- Add `useReveal` hook.

**Phase 2 — Hero + Navigation:**
- Rebuild Hero per §3.2.
- Rebuild Navigation per §3.1 (kill bounce badge, new mobile menu, new logo treatment).
- Add `Cursor.tsx` and mount in App.tsx. Add `data-cursor="view"` to hero image and primary CTA.
- Add `Marquee.tsx` and place between Hero and Features.

**Phase 3 — Home sections:**
- Rebuild Features → editorial pillars (§3.3).
- Rebuild Products as horizontal scroll showcase (§3.4).
- Add new "By the numbers" section (§3.5).
- Update Testimonials to single-quote viewport blocks (§3.7).
- Update CTA section (§3.8) and Footer (§3.9).

**Phase 4 — Product card + Shop + Product detail:**
- Rewrite ProductCard per §3.10.
- Update Shop page per §3.12.
- Editorialize ProductDetail per §3.11 (this is the biggest single change — give it a dedicated session).

**Phase 5 — Polish:**
- Cart drawer, bottom nav, page loader, splash (§3.13–§3.16).
- Audit every page for stragglers (Login, Signup, Account, FAQ, etc.) — apply the new tokens, kill any rounded-xl, swap shadow-* for hairline.

---

## 6. Acceptance checklist (use to verify each phase)

Hero:
- [ ] H1 reveals word-by-word on first paint.
- [ ] Image scales 1.05 → 1 on first paint.
- [ ] No stat counters in hero.
- [ ] Custom cursor expands to "View" pill when over the image.

Navigation:
- [ ] Cart counter does not bounce. Renders as `[12]` text.
- [ ] Logo has a 6px gold dot after the wordmark.
- [ ] Scroll state is `bg-bone/80 backdrop-blur-xl` with hairline border, no shadow.

Tokens:
- [ ] No usage of `rounded-xl` or `rounded-2xl` left in the codebase except buttons.
- [ ] No `shadow-gold*` or `shadow-2xl` left except `lift` on modals.
- [ ] `font-display` is Fraunces. `font-body` is Inter.
- [ ] All `transition-*` durations resolve to 200/400/800ms only.

Motion:
- [ ] Page scrolls smoothly via Lenis (no jitter, no missed scrolls).
- [ ] Headlines reveal word-by-word with split-type.
- [ ] No `animate-bounce`, no idle floating dots, no `rotate-[360deg]`.

Product card:
- [ ] Hovering shows a different image, not just a zoom.
- [ ] Price is `font-body tabular-nums`, not serif.
- [ ] Category eyebrow is ink/40, not gold.

Color:
- [ ] No more than three uses of `sugan-gold` per viewport (count them).
- [ ] Default text is `sugan-ink`. Secondary text is `sugan-ink-soft`.

Mobile:
- [ ] Hero stacks: image 70vh top, text below.
- [ ] Horizontal scroll Products section falls back to a vertical stack.
- [ ] Bottom nav uses hairline border, not shadow.
- [ ] Custom cursor is hidden on touch devices.

If any of these fail, the phase is not done.

---

## 7. References to keep open while building

Keep these tabs open and *steal poses, not pixels:*

- **apple.com/iphone** — scroll-pinned product reveals, type scale, button rounding contrast.
- **aesop.com** — restraint, hairlines, editorial product detail page.
- **bluorng.com** — marquee energy, full-bleed photography, attitude (we use less of it but borrow the swagger).
- **aimeleondore.com** — secondary image reveal on product hover, footer colophon treatment.
- **norse-projects.com** — square cards, ink-on-bone palette, generous whitespace.

---

End of brief. Hand this whole document to Claude Code and start with **Phase 1**. Verify Phase 1 acceptance before moving on. Each phase should land in a separate commit so you can roll back any single phase without losing the others.
