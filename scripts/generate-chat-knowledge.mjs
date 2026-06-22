// Generates functions/src/knowledge.generated.ts — a compact, token-efficient
// product catalog the chatbot uses as grounding context.
//
// Source of truth is src/data/rooms.ts. We esbuild-transform it (which strips
// the type-only `@/types` import, leaving pure data) and import the result, so
// this stays in sync with the real catalog. Re-run after editing products:
//
//   node scripts/generate-chat-knowledge.mjs
//
// (Also wired into `npm run build` via predeploy — see package.json.)

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
  // Dimensions: prefer the structured object, else the first line of the freeform block.
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
  return f.length ? ` (${f.join(', ')})` : '';
}

function availabilityOf(p) {
  if (p.preOrder) return 'pre-order';
  return p.inStock ? 'in stock' : 'out of stock';
}

function priceOf(p) {
  const base = `₹${p.price.toLocaleString('en-IN')}`;
  if (p.onSale && p.originalPrice && p.originalPrice > p.price) {
    return `${base} (was ₹${p.originalPrice.toLocaleString('en-IN')})`;
  }
  return base;
}

function lineFor(p) {
  const parts = [
    p.id,
    p.name,
    priceOf(p) + flagsOf(p),
    availabilityOf(p),
  ];
  const specs = specsOf(p);
  if (specs) parts.push(specs);
  const desc = clip(p.description, 130);
  if (desc) parts.push(desc);
  let line = parts.join(' | ') + ` | link: /product/${p.id}`;
  if (Array.isArray(p.relatedSizes) && p.relatedSizes.length) {
    const sizes = p.relatedSizes
      .map((s) => `${s.size} ₹${Number(s.price).toLocaleString('en-IN')} (/product/${s.productId})`)
      .join('; ');
    line += ` | other sizes: ${sizes}`;
  }
  return line;
}

async function main() {
  const tsSource = await readFile(ROOMS_TS, 'utf8');
  const { code } = await transform(tsSource, {
    loader: 'ts',
    format: 'esm',
    target: 'es2020',
  });

  const tmp = join(tmpdir(), `sugan-rooms-${Date.now()}.mjs`);
  await writeFile(tmp, code, 'utf8');
  let rooms, allProducts, categories;
  try {
    ({ rooms, allProducts, categories } = await import(pathToFileURL(tmp).href));
  } finally {
    await rm(tmp, { force: true });
  }

  const roomName = new Map((rooms || []).map((r) => [r.id, r.name]));

  // Group products by room, preserving the rooms[] ordering.
  const byRoom = new Map();
  for (const p of allProducts) {
    const key = p.room || 'other';
    if (!byRoom.has(key)) byRoom.set(key, []);
    byRoom.get(key).push(p);
  }

  const orderedRoomIds = [
    ...(rooms || []).map((r) => r.id).filter((id) => byRoom.has(id) && id !== 'shop-all'),
    ...[...byRoom.keys()].filter((id) => !roomName.has(id)),
  ];

  const sections = [];
  for (const roomId of orderedRoomIds) {
    const items = byRoom.get(roomId);
    if (!items || !items.length) continue;
    const title = roomName.get(roomId) || roomId;
    sections.push(
      `### ${title} (browse: /shop/${roomId})\n` + items.map(lineFor).join('\n'),
    );
  }

  const catalog = [
    `PRODUCT CATALOG — ${allProducts.length} products. Prices in INR (₹). Use exact prices, names, and /product/<ID> links from here; never invent products or prices.`,
    categories && categories.length
      ? `Categories: ${categories
          .map((c) => (typeof c === 'string' ? c : c && (c.name || c.id)))
          .filter((c) => c && !/^all/i.test(c))
          .join(', ')}.`
      : '',
    '',
    sections.join('\n\n'),
  ]
    .filter(Boolean)
    .join('\n');

  const banner = `// AUTO-GENERATED by scripts/generate-chat-knowledge.mjs — DO NOT EDIT BY HAND.\n// Re-run: node scripts/generate-chat-knowledge.mjs\n`;
  const out =
    banner +
    `\nexport const PRODUCT_COUNT = ${allProducts.length};\n` +
    `export const GENERATED_AT = ${JSON.stringify(new Date().toISOString())};\n` +
    `export const PRODUCT_CATALOG = ${JSON.stringify(catalog)};\n`;

  await mkdir(dirname(OUT_TS), { recursive: true });
  await writeFile(OUT_TS, out, 'utf8');
  console.log(
    `✓ Wrote ${OUT_TS} (${allProducts.length} products, ${(out.length / 1024).toFixed(1)} KB)`,
  );
}

main().catch((err) => {
  console.error('Failed to generate chat knowledge:', err);
  process.exit(1);
});
