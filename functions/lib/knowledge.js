"use strict";
// Hand-authored grounding for the Sugan storefront assistant.
// Business facts and policies are maintained here; the product catalog is
// generated from src/data/rooms.ts (knowledge.generated.ts). Keep policies in
// sync with the /shipping, /returns, /faq, /bulk-orders, and /contact pages.
//
// To stay within free-tier token limits (and to scale to any catalog size), the
// assistant uses RETRIEVAL: only the most relevant products for each question are
// included in the prompt, not the whole catalog.
Object.defineProperty(exports, "__esModule", { value: true });
exports.KNOWLEDGE_META = void 0;
exports.selectRelevantProducts = selectRelevantProducts;
exports.buildSystemPrompt = buildSystemPrompt;
const knowledge_generated_1 = require("./knowledge.generated");
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
- Store credit tied to the customer's account. Non-withdrawable (cannot be moved to a bank/card), no expiry, usable toward future orders at checkout.

CARE
- Clean with a soft, damp cloth and mild soap. Do not soak or use harsh chemicals or a dishwasher.
- Apply food-grade mineral oil periodically to maintain the finish and prevent the wood from drying.

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
- To point at a whole category, link a section page like [Kitchen](/shop/kitchen).

ORDER STATUS
- You cannot access individual orders. For "where is my order"-type questions, point to "My Account" (/account) and the tracking email/SMS, or to contact support with the order number.

STYLE
- Be warm, concise, and helpful. Prefer short paragraphs and small bullet lists. Sound like a knowledgeable shop assistant, not a brochure.
- Reply in the customer's language if they don't write in English.
- Stay on topic (Sugan products, orders, and policies). Politely redirect anything off-topic. Don't promise discounts or make up coupon codes.
- For complaints, custom quotes, or anything needing a human, share contact@sugan.shop / +91 6367677255 and the relevant page.
- Format all links as site-relative paths beginning with "/" (this is a single-page app).
`.trim();
// --- Retrieval ---------------------------------------------------------------
const MAX_PRODUCTS = 30;
const MIN_PRODUCTS = 12;
const STOPWORDS = new Set([
    'the', 'and', 'for', 'are', 'you', 'your', 'with', 'have', 'has', 'can', 'what',
    'which', 'where', 'how', 'does', 'will', 'this', 'that', 'they', 'them', 'some',
    'something', 'any', 'need', 'want', 'looking', 'look', 'please', 'show', 'tell',
    'about', 'under', 'below', 'above', 'over', 'between', 'than', 'less', 'upto',
    'price', 'priced', 'cost', 'cheap', 'cheapest', 'buy', 'get', 'find', 'recommend',
    'recommendation', 'suggest', 'idea', 'ideas', 'rupees', 'inr', 'rs', 'good', 'best',
    'nice', 'me', 'my', 'mine', 'our', 'from', 'into', 'around',
]);
function parsePriceMax(q) {
    const m = q.match(/(?:under|below|less than|upto|up to|within|max|maximum|budget(?:\s+of)?)\s*(?:₹|rs\.?|inr)?\s*([\d,]+)/i) ||
        q.match(/(?:₹|rs\.?|inr)\s*([\d,]+)/i);
    if (!m)
        return null;
    const n = parseInt(m[1].replace(/,/g, ''), 10);
    return Number.isFinite(n) && n > 0 ? n : null;
}
function termsOf(q) {
    const raw = q
        .toLowerCase()
        .split(/[^a-z0-9]+/)
        .filter((t) => t.length > 2 && !STOPWORDS.has(t));
    const set = new Set();
    for (const t of raw) {
        set.add(t);
        if (t.endsWith('s') && t.length > 3)
            set.add(t.slice(0, -1)); // naive singular
    }
    return [...set];
}
function fallbackProducts(priceMax) {
    const out = [];
    const seen = new Set();
    const within = (p) => priceMax === null || p.price <= priceMax;
    const add = (p) => {
        if (!seen.has(p.id) && within(p)) {
            seen.add(p.id);
            out.push(p);
        }
    };
    // Highlights first.
    for (const p of knowledge_generated_1.PRODUCTS)
        if (p.inStock && p.flags && /bestseller|hot/.test(p.flags))
            add(p);
    // Then spread one per room for variety.
    const perRoom = new Set();
    for (const p of knowledge_generated_1.PRODUCTS) {
        if (out.length >= MAX_PRODUCTS)
            break;
        if (p.inStock && !perRoom.has(p.room)) {
            perRoom.add(p.room);
            add(p);
        }
    }
    // Top up if still short.
    for (const p of knowledge_generated_1.PRODUCTS) {
        if (out.length >= MIN_PRODUCTS)
            break;
        add(p);
    }
    return out.slice(0, MAX_PRODUCTS);
}
function selectRelevantProducts(query) {
    const q = (query || '').toLowerCase();
    const priceMax = parsePriceMax(q);
    const skus = new Set((query.match(/\bSAC[a-z0-9_]+/gi) || []).map((s) => s.toUpperCase()));
    const terms = termsOf(q);
    const scored = knowledge_generated_1.PRODUCTS.map((p) => {
        let score = 0;
        if (skus.has(p.id))
            score += 100;
        for (const t of terms)
            if (p.search.includes(t))
                score += 1;
        if (priceMax !== null && p.price <= priceMax)
            score += 0.5;
        return { p, score };
    });
    let picked = scored
        .filter((x) => x.score > 0)
        .filter((x) => priceMax === null || x.p.price <= priceMax || skus.has(x.p.id))
        .sort((a, b) => b.score - a.score || a.p.price - b.p.price)
        .map((x) => x.p);
    if (picked.length < MIN_PRODUCTS) {
        const seen = new Set(picked.map((p) => p.id));
        for (const p of fallbackProducts(priceMax)) {
            if (picked.length >= MAX_PRODUCTS)
                break;
            if (!seen.has(p.id)) {
                seen.add(p.id);
                picked.push(p);
            }
        }
    }
    return picked.slice(0, MAX_PRODUCTS);
}
function formatProduct(p) {
    let price = `₹${p.price.toLocaleString('en-IN')}`;
    if (p.onSale && p.originalPrice && p.originalPrice > p.price) {
        price += ` (was ₹${p.originalPrice.toLocaleString('en-IN')})`;
    }
    if (p.flags)
        price += ` [${p.flags}]`;
    const availability = p.preOrder ? 'pre-order' : p.inStock ? 'in stock' : 'out of stock';
    const parts = [p.id, p.name, price, availability];
    if (p.specs)
        parts.push(p.specs);
    if (p.desc)
        parts.push(p.desc);
    let line = parts.join(' | ') + ` | link: /product/${p.id}`;
    if (p.sizes)
        line += ` | other sizes: ${p.sizes}`;
    return line;
}
/**
 * Builds the system prompt for a given user message. Includes business info,
 * policies, instructions, and a relevant SUBSET of products (retrieval).
 */
function buildSystemPrompt(latestUserMessage) {
    const products = selectRelevantProducts(latestUserMessage);
    const catalog = `RELEVANT PRODUCTS — a subset of our ${knowledge_generated_1.PRODUCT_COUNT}-product catalogue, matched to this question (not the full range). ` +
        `Browse everything by section: ${knowledge_generated_1.ROOMS_OVERVIEW}.\n` +
        products.map(formatProduct).join('\n');
    return [BUSINESS_INFO, POLICIES, INSTRUCTIONS, catalog].join('\n\n');
}
exports.KNOWLEDGE_META = { productCount: knowledge_generated_1.PRODUCT_COUNT };
//# sourceMappingURL=knowledge.js.map