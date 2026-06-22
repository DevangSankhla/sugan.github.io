// Generates functions/src/knowledge.generated.ts — a structured, compact product
// catalog the chatbot uses as grounding context.
//
// The bot uses RETRIEVAL: it sends only the most relevant products per question
// (not the whole catalog), to stay within free-tier token limits and scale to any
// catalog size. So we emit a structured PRODUCTS array (with a precomputed `search`
// blob) plus a small ROOMS_OVERVIEW, and the function selects + formats a subset.
//
// Source of truth is src/data/rooms.ts. We esbuild-transform it (stripping the
// type-only `@/types` import, leaving pure data) and import the result, so this
// stays in sync with the real catalog. Re-run after editing products:
//
//   node scripts/generate-chat-knowledge.mjs
//
// (Also wired into `npm run build`.)

import { transform } from 'esbuild';
import { readFile, writeFile, mkdir, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const ROOMS_TS = join(ROOT, 'src/data/rooms.ts');
const OUT_TS = join(ROOT, 'functions/src/knowledge.generated.ts');

/** Collapse whitespace and hard-truncate. */
function clip(str, max) {
  if (!str) return '';
  const s = String(str).replace(/\s+/g, ' ').trim();
  return s.length > max ? s.slice(0, max - 1).trimEnd() + '…' : s;
}

/** Pull the most useful spec facts into one short string. */
function specsOf(p) {
  const d = p.details || {};
  const bits = [];
  if (d.materials) bits.push(clip(d.materials, 40));
  if (d.finish && d.finish !== d.materials) bits.push(clip(d.finish, 40));
  const dim = d.dimensions;
  if (dim && (dim.length || dim.width || dim.height || dim.diameter)) {
    const dimStr = [
      dim.length && `L${dim.length}`,
      dim.width && `W${dim.width}`,
      dim.height && `H${dim.height}`,
      dim.depth && `D${dim.depth}`,
      dim.diameter && `⌀${dim.diameter}`,
      dim.weight && dim.weight,
    ]
      .filter(Boolean)
      .join('×');
    if (dimStr) bits.push(dimStr);
  } else if (d.usesAndMeasurements) {
    bits.push(clip(d.usesAndMeasurements.split('\n')[0], 50));
  }
  return bits.join(', ');
}

function flagsOf(p) {
  const f = [];
  if (p.isBestSeller) f.push('bestseller');
  if (p.isPremium) f.push('premium');
  if (p.isHot) f.push('hot');
  if (p.onSale) f.push('on sale');
  return f.join(', ');
}

function sizesOf(p) {
  if (!Array.isArray(p.relatedSizes) || !p.relatedSizes.length) return '';
  return p.relatedSizes
    .map((s) => `${s.size} ₹${Number(s.price).toLocaleString('en-IN')} (/product/${s.productId})`)
    .join('; ');
}

async function main() {
  const tsSource = await readFile(ROOMS_TS, 'utf8');
  const { code } = await transform(tsSource, { loader: 'ts', format: 'esm', target: 'es2020' });

  const tmp = join(tmpdir(), `sugan-rooms-${Date.now()}.mjs`);
  await writeFile(tmp, code, 'utf8');
  let rooms, allProducts;
  try {
    ({ rooms, allProducts } = await import(pathToFileURL(tmp).href));
  } finally {
    await rm(tmp, { force: true });
  }

  const roomName = new Map((rooms || []).map((r) => [r.id, r.name]));

  const products = allProducts.map((p) => {
    const d = p.details || {};
    const room = p.room || 'other';
    const obj = {
      id: p.id,
      name: p.name,
      price: p.price,
      room,
      roomName: roomName.get(room) || room,
      inStock: p.inStock !== false,
      desc: clip(p.description, 130),
    };
    if (p.originalPrice) obj.originalPrice = p.originalPrice;
    if (p.onSale) obj.onSale = true;
    if (p.preOrder) obj.preOrder = true;
    if (p.category) obj.category = p.category;
    const flags = flagsOf(p);
    if (flags) obj.flags = flags;
    const specs = specsOf(p);
    if (specs) obj.specs = specs;
    const sizes = sizesOf(p);
    if (sizes) obj.sizes = sizes;
    // Search blob is used server-side for retrieval only — it is NOT sent in the
    // prompt, so we can afford to make it rich.
    obj.search = [
      p.id,
      p.name,
      p.category,
      obj.roomName,
      room,
      p.description,
      d.materials,
      d.finish,
      Array.isArray(p.tags) ? p.tags.join(' ') : '',
      Array.isArray(d.usp) ? d.usp.join(' ') : '',
      d.usesAndMeasurements,
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase()
      .replace(/\s+/g, ' ')
      .slice(0, 600);
    return obj;
  });

  // Rooms overview: "Kitchen (32), Pet (18), …" in rooms[] order (skip shop-all).
  const counts = new Map();
  for (const p of products) counts.set(p.room, (counts.get(p.room) || 0) + 1);
  const overviewParts = [];
  for (const r of rooms || []) {
    if (r.id === 'shop-all') continue;
    const c = counts.get(r.id);
    if (c) overviewParts.push(`${r.name} (${c}) → /shop/${r.id}`);
  }
  for (const [id, c] of counts) {
    if (!roomName.has(id)) overviewParts.push(`${id} (${c})`);
  }
  const roomsOverview = overviewParts.join(', ');

  const iface = `export interface CatalogProduct {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  onSale?: boolean;
  preOrder?: boolean;
  inStock: boolean;
  room: string;
  roomName: string;
  category?: string;
  flags?: string;
  specs?: string;
  sizes?: string;
  desc: string;
  search: string;
}`;

  const banner = `// AUTO-GENERATED by scripts/generate-chat-knowledge.mjs — DO NOT EDIT BY HAND.\n// Re-run: node scripts/generate-chat-knowledge.mjs\n`;
  const out =
    banner +
    `\n${iface}\n\n` +
    `export const PRODUCT_COUNT = ${products.length};\n` +
    `export const GENERATED_AT = ${JSON.stringify(new Date().toISOString())};\n` +
    `export const ROOMS_OVERVIEW = ${JSON.stringify(roomsOverview)};\n` +
    `export const PRODUCTS: CatalogProduct[] = ${JSON.stringify(products)};\n`;

  await mkdir(dirname(OUT_TS), { recursive: true });
  await writeFile(OUT_TS, out, 'utf8');
  console.log(
    `✓ Wrote ${OUT_TS} (${products.length} products, ${(out.length / 1024).toFixed(1)} KB)`,
  );
}

main().catch((err) => {
  console.error('Failed to generate chat knowledge:', err);
  process.exit(1);
});
