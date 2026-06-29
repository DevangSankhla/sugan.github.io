// Hand-authored grounding for the Sugan storefront assistant.
// Business facts and policies are maintained here; the product catalog is
// generated from src/data/rooms.ts (knowledge.generated.ts). Keep policies in
// sync with the /shipping, /returns, /faq, /bulk-orders, and /contact pages.
//
// To stay within free-tier token limits, scale to any catalog size, and stay
// precise, the assistant uses FACETED RETRIEVAL: it sends only the products
// matched to each question (by type / colour / price), not the whole catalog.

import {
  PRODUCTS,
  PRODUCT_TYPES,
  ROOMS_OVERVIEW,
  PRODUCT_COUNT,
  type CatalogProduct,
} from './knowledge.generated';

const BUSINESS_INFO = `
ABOUT SUGAN
- Sugan (website: sugan.shop) sells handcrafted, solid-wood homeware, serveware, and furniture.
- Everything is handmade by artisans in Jodhpur, Rajasthan, India. The brand has been crafting since 1999.
- Materials: 100% solid wood — acacia, mango, teak, and sheesham. We NEVER use MDF, particle board, or veneers.
- Finishes are food-safe and non-toxic (mineral oil and natural waxes) — safe for serving food and daily use.
- Every piece is handcrafted, so slight variation in wood grain and colour is natural and expected — no two pieces are identical.
- We ship across India (all 29 states, 8 union territories, 19,000+ pin codes) and offer worldwide shipping.
- Contact: email contact@sugan.shop, phone +91 6367677255.
`.trim();

const POLICIES = `
SHIPPING
- Free shipping on every order across India (no minimum order value). Cash on Delivery (COD) adds a flat ₹50 handling charge.
- Order processing: 24–48 hours. Transit: 3–7 days. Total delivery: roughly 5–9 business days from order to doorstep.
- Delivery times can be longer during festivals and peak seasons.

ORDER TRACKING
- Once an order ships, the customer gets an email and SMS with a tracking number.
- Customers can track orders from the "My Account" page (/account). The assistant cannot look up individual order status — direct customers to /account or to contact support with their order number.

PAYMENTS
- Accepted: credit/debit cards, UPI, net banking, wallets (PayTM, PhonePe, etc.), and Cash on Delivery.
- Payments are processed securely via PayU (PCI-DSS compliant); card details are never stored.
- COD available for orders up to ₹10,000 (₹50 COD fee). COD orders above ₹5,000 may require advance payment.
- Orders can be modified or cancelled within 12 hours of placing them, if not already processed for shipping.

RETURNS & REFUNDS
- 7-day return window from the date of delivery. Return pickup is free.
- A return processing fee is deducted from the refund: ₹100 for orders under ₹2,999, or 10% of the order total for orders ₹2,999 and above.
- To start a return: contact contact@sugan.shop or +91 6367677255 within 7 days with the order number and reason.
- For damaged, defective, or wrong items, an UNBOXING VIDEO is mandatory as proof (showing the package before opening and the issue). Without it, damaged-item returns cannot be processed.
- Refund routing: prepaid orders can be refunded to the original payment method OR the Sugan Wallet (customer's choice); COD orders are refunded to the Sugan Wallet. Refund is processed within 7–10 business days after the returned item passes inspection (total cycle ~10–15 business days).
- NOT returnable: used/washed/altered items, damage from misuse, customized/personalized orders (unless a manufacturing defect), returns after 7 days, and damaged items without an unboxing video.

SUGAN WALLET
- Store credit tied to the customer's account. Customers view their balance and history under Account → Wallet.
- How credit is added: issued by Sugan only — e.g. refunds on returns, or goodwill/promotional credit. Customers cannot buy or top up wallet credit themselves.
- Using it at checkout: a signed-in customer with a balance can apply any amount of their credit (up to their balance and up to the order total) to reduce what they pay. Example: a ₹999 order with ₹699 wallet credit applied = ₹300 left to pay.
- Rules: wallet credit CANNOT be combined with a coupon code, and can ONLY be used with online/prepaid payment — NOT Cash on Delivery. If the credit covers the whole order, nothing is charged online and the order is placed immediately.
- Non-withdrawable (cannot be moved to a bank account or card) and never expires.
- If an online payment fails or is cancelled after credit was applied, the credit is automatically returned to the wallet.

CARE
- Clean with a soft, damp cloth and mild soap. Do not soak or use harsh chemicals or a dishwasher.
- Apply food-grade mineral oil periodically to maintain the finish and prevent the wood from drying.

CUSTOM / MADE-TO-ORDER DESIGNS
- Yes, we make custom pieces. If a customer wants a custom design, a different size, or a bespoke piece made, they can request it by messaging us from their profile/account dashboard (/account), or by emailing contact@sugan.shop or calling +91 6367677255. Custom pieces need extra lead time.

BULK, CUSTOM & CORPORATE
- We take bulk orders for hotels, restaurants, corporate gifting, and events. Customization includes engraving (e.g. company logos), custom sizes, and specific wood types (custom orders need extra time and minimum quantities).
- Request a quote on the Bulk Orders page (/bulk-orders) or contact contact@sugan.shop / +91 6367677255.
`.trim();

const INSTRUCTIONS = `
You are "Sugan Assistant", the friendly assistant on Sugan's online store (sugan.shop).

YOUR JOB
- Help shoppers discover products and pick the right one, answer questions about materials, dimensions, care, and use, and answer store policy questions (shipping, returns, payments, bulk orders).

GROUNDING RULES (important)
- Use ONLY the information in this prompt (business info, policies, and the product list). Do NOT invent products, prices, SKUs, dimensions, materials, discounts, or policies.
- The "RELEVANT PRODUCTS" list is only a SUBSET of the full catalogue, chosen to match this question — it is not everything we sell. If the customer wants something not in the list, recommend the closest options shown and point them to the relevant section page (e.g. /shop/kitchen) or /shop to browse the rest. Never claim a specific product exists unless it appears in the list.
- All prices are in Indian Rupees (₹). Quote prices and availability exactly as listed.
- If you don't know something or it isn't covered here, say so honestly and point to contact@sugan.shop or +91 6367677255.

RECOMMENDING PRODUCTS
- Recommend 1–4 relevant items. For each, use a markdown link in the exact form [Product Name](/product/SKU) using the link from the list.
- Match the shopper's need (room, use, budget, size, material). Mention price and a one-line reason. If an item is out of stock, say so and offer an in-stock alternative if there is one.
- MATCH THE TYPE asked for: the list is pre-filtered to the right product type, so recommend that type only (e.g. for "coffee table" don't suggest a side table).
- COLOUR HONESTY: each product shows a "colour:" field (the finishes we detected). Only describe an item using a colour shown there. The list header states how many EXACT colour matches exist for the request. If it says 0 exact matches, tell the customer plainly that we don't have that colour and offer the closest finish honestly (e.g. "we don't have an all-black coffee table — the closest is one with a dark ebony base"). Never call a natural, walnut, or grey piece "black".
- To point at a whole category, link a section page like [Kitchen](/shop/kitchen).
- CUSTOM REQUESTS: if the customer wants something we don't sell, a different size, or a bespoke/custom design, tell them we make custom pieces — they can request one by messaging us from their profile/account dashboard (/account), or via contact@sugan.shop / +91 6367677255.

ORDER STATUS
- You cannot access individual orders. For "where is my order"-type questions, point to "My Account" (/account) and the tracking email/SMS, or to contact support with the order number.

STYLE
- Be warm, concise, and helpful. Prefer short paragraphs and small bullet lists. Sound like a knowledgeable shop assistant, not a brochure.
- Reply in the customer's language if they don't write in English.
- Stay on topic (Sugan products, orders, and policies). Politely redirect anything off-topic. Don't promise discounts or make up coupon codes.
- For complaints, custom quotes, or anything needing a human, share contact@sugan.shop / +91 6367677255 and the relevant page.
- Format all links as site-relative paths beginning with "/" (this is a single-page app).
`.trim();

// --- Faceted retrieval -------------------------------------------------------

const MAX_PRODUCTS = 24;
const MIN_PRODUCTS = 12;
const MAX_COLOR_ALTERNATIVES = 8;

const STOPWORDS = new Set([
  'the', 'and', 'for', 'are', 'you', 'your', 'with', 'have', 'has', 'can', 'what',
  'which', 'where', 'how', 'does', 'will', 'this', 'that', 'they', 'them', 'some',
  'something', 'any', 'need', 'want', 'looking', 'look', 'please', 'show', 'tell',
  'about', 'under', 'below', 'above', 'over', 'between', 'than', 'less', 'upto',
  'price', 'priced', 'cost', 'cheap', 'cheapest', 'buy', 'get', 'find', 'recommend',
  'recommendation', 'suggest', 'idea', 'ideas', 'rupees', 'inr', 'rs', 'good', 'best',
  'nice', 'me', 'my', 'mine', 'our', 'from', 'into', 'around',
]);

function parsePriceMax(q: string): number | null {
  const m =
    q.match(/(?:under|below|less than|upto|up to|within|max|maximum|budget(?:\s+of)?)\s*(?:₹|rs\.?|inr)?\s*([\d,]+)/i) ||
    q.match(/(?:₹|rs\.?|inr)\s*([\d,]+)/i);
  if (!m) return null;
  const n = parseInt(m[1].replace(/,/g, ''), 10);
  return Number.isFinite(n) && n > 0 ? n : null;
}

function termsOf(q: string): string[] {
  const raw = q
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((t) => t.length > 2 && !STOPWORDS.has(t));
  const set = new Set<string>();
  for (const t of raw) {
    set.add(t);
    if (t.endsWith('s') && t.length > 3) set.add(t.slice(0, -1)); // naive singular
  }
  return [...set];
}

// Type detection: map query phrases to canonical product types (longest first so
// "coffee table" wins over the generic "table").
const PRESENT_TYPES = new Set(PRODUCT_TYPES);
const ALL_TABLE_TYPES = PRODUCT_TYPES.filter((t) => t.endsWith(' table'));

const PHRASE_TO_TYPES: Record<string, string[]> = {
  'coffee table': ['coffee table'], 'center table': ['coffee table'], 'centre table': ['coffee table'],
  'cocktail table': ['coffee table'], 'couch table': ['coffee table'],
  'side table': ['side table'], 'end table': ['side table'], 'accent table': ['side table'],
  'bedside table': ['bedside table'], nightstand: ['bedside table'], 'night stand': ['bedside table'],
  'console table': ['console table'], console: ['console table'],
  'serving tray': ['serving tray'], tray: ['serving tray'],
  'serving bowl': ['serving bowl'], bowl: ['serving bowl'],
  'serving board': ['serving board'], 'chopping board': ['serving board'],
  'cutting board': ['serving board'], 'cheese board': ['serving board'], board: ['serving board'],
  'wall shelf': ['wall shelf'], 'wall shelves': ['wall shelf'], 'floating shelf': ['wall shelf'],
  shelf: ['wall shelf'], shelves: ['wall shelf'],
  bookshelf: ['bookshelf'], 'book shelf': ['bookshelf'], bookcase: ['bookshelf'],
  'lounge chair': ['lounge chair'], armchair: ['lounge chair'], 'arm chair': ['lounge chair'],
  'accent chair': ['lounge chair'], chair: ['chair', 'lounge chair'],
  'wine rack': ['wine rack'],
  'napkin holder': ['napkin holder'], 'napkin holders': ['napkin holder'],
  pooja: ['pooja'], temple: ['pooja'], mandir: ['pooja'],
  cabinet: ['cabinet'],
  'stepping stool': ['stepping stool'], stool: ['stepping stool'],
  'storage box': ['storage box'], box: ['storage box'],
  'pet feeder': ['pet feeder'], feeder: ['pet feeder'], 'cat feeder': ['pet feeder'],
  'dog feeder': ['pet feeder'], 'pet bowl': ['pet feeder'], 'cat bowl': ['pet feeder'], 'dog bowl': ['pet feeder'],
  table: ['__ALL_TABLES__'],
};
const TYPE_PHRASES = Object.keys(PHRASE_TO_TYPES).sort(
  (a, b) => b.split(' ').length - a.split(' ').length || b.length - a.length,
);

function detectTypes(q: string): Set<string> {
  let work = ' ' + q.replace(/[^a-z0-9]+/g, ' ').trim() + ' ';
  const out = new Set<string>();
  for (const ph of TYPE_PHRASES) {
    const pad = ' ' + ph + ' ';
    if (work.includes(pad)) {
      for (const t of PHRASE_TO_TYPES[ph]) {
        if (t === '__ALL_TABLES__') ALL_TABLE_TYPES.forEach((tt) => out.add(tt));
        else if (PRESENT_TYPES.has(t)) out.add(t);
      }
      work = work.split(pad).join(' '); // consume so shorter phrases don't re-match
    }
  }
  return out;
}

// Colour detection in the query → canonical colours (matched against product.colors).
const QUERY_COLORS: [string, RegExp][] = [
  ['black', /\b(black|ebony|charcoal|jet)\b/],
  ['white', /\b(white|bleached|ivory)\b/],
  ['grey', /\b(grey|gray|greywash)\b/],
  ['brown', /\b(brown|walnut|mahogany|chocolate)\b/],
  ['natural', /\b(natural|honey|tan|beige|oak)\b/],
  ['dark', /\bdark\b/],
  ['light', /\blight\b/],
];
const NEAR_COLOR: Record<string, string[]> = { black: ['dark'], white: ['light'] };

function detectColors(q: string): Set<string> {
  const out = new Set<string>();
  for (const [c, re] of QUERY_COLORS) if (re.test(q)) out.add(c);
  return out;
}

function fallbackProducts(priceMax: number | null): CatalogProduct[] {
  const out: CatalogProduct[] = [];
  const seen = new Set<string>();
  const within = (p: CatalogProduct) => priceMax === null || p.price <= priceMax;
  const add = (p: CatalogProduct) => {
    if (!seen.has(p.id) && within(p)) {
      seen.add(p.id);
      out.push(p);
    }
  };
  for (const p of PRODUCTS) if (p.inStock && p.flags && /bestseller|hot/.test(p.flags)) add(p);
  const perRoom = new Set<string>();
  for (const p of PRODUCTS) {
    if (out.length >= MAX_PRODUCTS) break;
    if (p.inStock && !perRoom.has(p.room)) {
      perRoom.add(p.room);
      add(p);
    }
  }
  for (const p of PRODUCTS) {
    if (out.length >= MIN_PRODUCTS) break;
    add(p);
  }
  return out.slice(0, MAX_PRODUCTS);
}

export interface Selection {
  products: CatalogProduct[];
  types: string[];
  colors: string[];
  colorExactCount: number | null;
  priceMax: number | null;
}

export function selectRelevantProducts(query: string): Selection {
  const q = (query || '').toLowerCase();
  const priceMax = parsePriceMax(q);
  const skus = new Set((query.match(/\bSAC[a-z0-9_]+/gi) || []).map((s) => s.toUpperCase()));
  const types = detectTypes(q);
  const colors = detectColors(q);
  const terms = termsOf(q);

  const near = new Set<string>();
  for (const c of colors) (NEAR_COLOR[c] || []).forEach((n) => near.add(n));
  const isExact = (p: CatalogProduct) => colors.size > 0 && p.colors.some((c) => colors.has(c));
  const isNear = (p: CatalogProduct) => near.size > 0 && p.colors.some((c) => near.has(c));

  // Candidate pool: filter by type and price (SKUs explicitly named always pass).
  let pool = PRODUCTS;
  if (types.size) pool = pool.filter((p) => types.has(p.type) || skus.has(p.id));
  if (priceMax !== null) pool = pool.filter((p) => p.price <= priceMax || skus.has(p.id));

  const colorExactCount = colors.size ? pool.filter(isExact).length : null;

  const score = (p: CatalogProduct): number => {
    let s = 0;
    if (skus.has(p.id)) s += 1000;
    if (isExact(p)) s += 50;
    else if (isNear(p)) s += 8;
    for (const t of terms) {
      if (p.name.toLowerCase().includes(t)) s += 4;
      else if (p.type.includes(t) || (p.category || '').toLowerCase().includes(t)) s += 2;
      else if (p.search.includes(t)) s += 1;
    }
    if (p.flags && /bestseller|hot/.test(p.flags)) s += 0.3;
    return s;
  };

  let ranked: CatalogProduct[];
  if (types.size) {
    // A type was named — keep the whole (filtered) type pool, best-ranked first.
    ranked = [...pool].sort((a, b) => score(b) - score(a) || a.price - b.price);
  } else {
    ranked = pool
      .map((p) => ({ p, s: score(p) }))
      .filter((x) => x.s > 0)
      .sort((a, b) => b.s - a.s || a.p.price - b.p.price)
      .map((x) => x.p);
    if (ranked.length < MIN_PRODUCTS) {
      const seen = new Set(ranked.map((p) => p.id));
      for (const p of fallbackProducts(priceMax)) {
        if (ranked.length >= MAX_PRODUCTS) break;
        if (!seen.has(p.id)) {
          seen.add(p.id);
          ranked.push(p);
        }
      }
    }
  }

  // When a colour is requested: exact matches first, then a few alternatives —
  // keeps requests token-light and lets the model be honest about gaps.
  if (colors.size) {
    const exactSet = new Set(ranked.filter(isExact).map((p) => p.id));
    const exact = ranked.filter((p) => exactSet.has(p.id));
    const others = ranked.filter((p) => !exactSet.has(p.id));
    ranked = [...exact, ...others.slice(0, MAX_COLOR_ALTERNATIVES)];
  }

  return {
    products: ranked.slice(0, MAX_PRODUCTS),
    types: [...types],
    colors: [...colors],
    colorExactCount,
    priceMax,
  };
}

function formatProduct(p: CatalogProduct): string {
  let price = `₹${p.price.toLocaleString('en-IN')}`;
  if (p.onSale && p.originalPrice && p.originalPrice > p.price) {
    price += ` (was ₹${p.originalPrice.toLocaleString('en-IN')})`;
  }
  if (p.flags) price += ` [${p.flags}]`;
  const availability = p.preOrder ? 'pre-order' : p.inStock ? 'in stock' : 'out of stock';
  const parts = [p.id, p.name, price, availability];
  if (p.colors.length) parts.push(`colour: ${p.colors.join('/')}`);
  if (p.specs) parts.push(p.specs);
  if (p.desc) parts.push(p.desc);
  let line = parts.join(' | ') + ` | link: /product/${p.id}`;
  if (p.sizes) line += ` | other sizes: ${p.sizes}`;
  return line;
}

/**
 * Builds the system prompt for a given user message: business info, policies,
 * instructions, and a relevant SUBSET of products (faceted retrieval), with a
 * header that tells the model what was matched (type/budget/colour exactness).
 */
export function buildSystemPrompt(latestUserMessage: string): string {
  const sel = selectRelevantProducts(latestUserMessage);

  const notes: string[] = [];
  if (sel.types.length) notes.push(`Type: ${sel.types.join(' / ')}.`);
  if (sel.priceMax !== null) notes.push(`Budget: ≤ ₹${sel.priceMax.toLocaleString('en-IN')}.`);
  if (sel.colors.length) {
    const c = sel.colors.join('/');
    notes.push(
      sel.colorExactCount
        ? `Colour requested: ${c} — ${sel.colorExactCount} exact match(es), listed first; the rest are NOT ${c} (offer only as alternatives and say so).`
        : `Colour requested: ${c} — we have NO exact ${c} match in this type. The items below are the closest, but are NOT ${c}; tell the customer we don't have ${c} and suggest the nearest finish.`,
    );
  }

  const header =
    `RELEVANT PRODUCTS — a subset of our ${PRODUCT_COUNT}-item catalogue matched to this question (not the full range). ` +
    (notes.length ? notes.join(' ') + ' ' : '') +
    `Browse everything by section: ${ROOMS_OVERVIEW}.`;

  return [
    BUSINESS_INFO,
    POLICIES,
    INSTRUCTIONS,
    header + '\n' + sel.products.map(formatProduct).join('\n'),
  ].join('\n\n');
}

export const KNOWLEDGE_META = { productCount: PRODUCT_COUNT };
