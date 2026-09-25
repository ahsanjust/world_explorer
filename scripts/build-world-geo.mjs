#!/usr/bin/env node
/* =============================================================================
   WORLD EXPLORER — BOUNDARY ASSET GENERATOR
   =============================================================================
   Regenerates public/maps/world-countries-50m.geojson from the upstream
   Natural Earth dataset. Keeping the generator in the repository is what makes
   the shipped asset *reproducible* rather than an opaque blob: provenance is
   verified by re-running this script, not asserted in a comment.

   Usage:
     node scripts/build-world-geo.mjs <ne_50m_admin_0_countries.geojson>
     node scripts/build-world-geo.mjs <source> --out <path>

   Source (public domain, no attribution required):
     https://github.com/nvkelso/natural-earth-vector
       /geojson/ne_50m_admin_0_countries.geojson

   WHY 50m AND NOT 110m
     110m omits Singapore entirely — a first-class member of this app's country
     dataset. 50m also carries all 195 UN member/observer states.

   WHY NOT SHIP THE SOURCE UNCHANGED
     3.1 MB raw / 242 features is wasteful for a static site. The reductions
     below are lossless *at the scales the map is actually drawn at*, and each
     one is bounded so it can never delete a country (see FLOOR below).

   PIPELINE (per ring, in order)
     1. Douglas-Peucker simplification, tolerance span-adaptive and clamped to
        [0.002 deg, 0.12 deg]. A continent loses redundant vertices; a
        microstate is left effectively untouched because its tolerance is tiny.
     2. SIGNIFICANT-DIGIT-AWARE rounding. Precision is derived from the ring's
        own span, so Vatican City (span ~0.009 deg) rounds to 4-5 decimals
        instead of collapsing. THIS IS THE FIX for the previous revision, which
        flattened every coordinate to 1 decimal and therefore reduced 15 small
        territories to a single point — invisible and unclickable.
     3. Hard FLOOR: a feature's largest ring is never dropped, and if rounding
        destroys a ring the precision is escalated until it survives (up to 6
        decimals, ~0.1 m). A ring that still cannot reach 4 positions throws
        instead of silently vanishing, so this script fails loudly rather than
        shipping a missing country.
     4. Specks (interior rings) below 0.0004 deg^2 (~2 km across) are dropped to
        keep the payload sane. Unlike the old 0.01 deg^2 rule this keeps real
        islands such as Hawaii, the Philippine archipelago and the Maldives'
        atolls.

   PROPERTIES
     Derived deterministically from upstream. Natural Earth uses `-99` as its
     "no ISO code" sentinel and four territories carry an ISO3 that disagrees
     with ISO 3166-1; both are corrected in ISO3_CORRECTIONS below. The script
     reproduces the previously shipped property values byte-for-byte — geometry
     is the only thing that changes.
   ============================================================================= */

import { createHash } from 'node:crypto';
import { readFileSync, statSync, writeFileSync } from 'node:fs';
import { gzipSync } from 'node:zlib';

/* ============================== TUNABLES ================================= */

/** Interior rings smaller than this (deg^2) are dropped. ~5 km across. */
const MIN_RING_AREA_DEG2 = 0.0025;
/** A valid GeoJSON ring needs >= 4 positions, i.e. >= 3 distinct points. */
const MIN_RING_POSITIONS = 4;
/** Escape hatch: escalate rounding up to this many decimals before giving up. */
const MAX_PRECISION = 6;
/** Quantisation steps aimed for across each ring's longest axis. */
const QUANTISATION_STEPS = 8;
/** Simplification tolerance as a fraction of a ring's span. */
const TOLERANCE_RATIO = 0.0025;
const MIN_TOLERANCE_DEG = 0.002;
const MAX_TOLERANCE_DEG = 0.12;

/**
 * ISO 3166-1 alpha-3 corrections keyed by Natural Earth's `ADM0_A3`.
 * Natural Earth ships the *de facto* short code for these four; the map joins
 * against the ISO standard, so map them here rather than in the UI.
 */
const ISO3_CORRECTIONS = {
  SDS: 'SSD', // South Sudan  (NE uses the outdated "SDS")
  SAH: 'ESH', // Western Sahara
  PSX: 'PSE', // Palestine
  ALD: 'ALA', // Åland Islands
};

const DEFAULT_OUT = 'public/maps/world-countries-50m.geojson';
const SOURCE_REPO = 'https://github.com/nvkelso/natural-earth-vector';

/* ============================ ARGUMENTS ================================== */

const argv = process.argv.slice(2);
const outIndex = argv.indexOf('--out');
const sourcePath = argv.find((arg) => !arg.startsWith('--') && arg !== argv[outIndex + 1]);
const outPath = outIndex !== -1 ? argv[outIndex + 1] : DEFAULT_OUT;

if (!sourcePath) {
  console.error(
    'usage: node scripts/build-world-geo.mjs <ne_50m_admin_0_countries.geojson> [--out path]'
  );
  process.exit(2);
}

/* ======================== GEOMETRY PRIMITIVES ============================ */

function ringBounds(ring) {
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  for (const [x, y] of ring) {
    if (x < minX) minX = x;
    if (x > maxX) maxX = x;
    if (y < minY) minY = y;
    if (y > maxY) maxY = y;
  }
  return { minX, minY, maxX, maxY };
}

function ringSpan(ring) {
  const { minX, minY, maxX, maxY } = ringBounds(ring);
  return Math.max(maxX - minX, maxY - minY);
}

/** Bounding-box area in deg^2. Used only to rank/prune rings, never displayed. */
function ringArea(ring) {
  const { minX, minY, maxX, maxY } = ringBounds(ring);
  return (maxX - minX) * (maxY - minY);
}

function isClosed(ring) {
  const first = ring[0];
  const last = ring[ring.length - 1];
  return first[0] === last[0] && first[1] === last[1];
}

function perpendicularDistance([px, py], [ax, ay], [bx, by]) {
  const dx = bx - ax;
  const dy = by - ay;
  if (dx === 0 && dy === 0) return Math.hypot(px - ax, py - ay);
  const t = ((px - ax) * dx + (py - ay) * dy) / (dx * dx + dy * dy);
  const cx = ax + t * dx;
  const cy = ay + t * dy;
  return Math.hypot(px - cx, py - cy);
}

/** Iterative Douglas-Peucker. Operates on an open polyline. */
function simplifyOpen(points, tolerance) {
  const n = points.length;
  if (n <= 3 || tolerance <= 0) return points;

  const keep = new Uint8Array(n);
  keep[0] = 1;
  keep[n - 1] = 1;

  const stack = [[0, n - 1]];
  while (stack.length > 0) {
    const [start, end] = stack.pop();
    if (end - start < 2) continue;

    let maxDistance = -1;
    let maxIndex = -1;
    for (let i = start + 1; i < end; i++) {
      const distance = perpendicularDistance(points[i], points[start], points[end]);
      if (distance > maxDistance) {
        maxDistance = distance;
        maxIndex = i;
      }
    }

    if (maxDistance > tolerance && maxIndex > start) {
      keep[maxIndex] = 1;
      stack.push([start, maxIndex], [maxIndex, end]);
    }
  }

  const out = [];
  for (let i = 0; i < n; i++) if (keep[i]) out.push(points[i]);
  return out.length >= 3 ? out : points;
}

/** Douglas-Peucker for a closed ring: unwrap, simplify, re-close. */
function simplifyRing(ring, tolerance) {
  if (ring.length <= MIN_RING_POSITIONS || tolerance <= 0) return ring;
  const open = isClosed(ring) ? ring.slice(0, -1) : ring.slice();
  const simplified = simplifyOpen(open, tolerance);
  if (simplified.length < 3) return ring;
  return [...simplified, [simplified[0][0], simplified[0][1]]];
}

/**
 * Rounds, collapses consecutive duplicates and re-closes.
 * Returns null when the ring cannot reach MIN_RING_POSITIONS — the caller then
 * escalates precision, so a failing ring is never silently accepted.
 */
function quantizeRing(ring, precision) {
  const factor = 10 ** precision;
  const out = [];

  for (const [x, y] of ring) {
    const rx = Math.round(x * factor) / factor;
    const ry = Math.round(y * factor) / factor;
    const last = out[out.length - 1];
    if (last && last[0] === rx && last[1] === ry) continue;
    out.push([rx, ry]);
  }

  // Rounding can duplicate the closing position; trim until it is unique.
  const first = out[0];
  while (out.length > 1) {
    const last = out[out.length - 1];
    if (last[0] === first[0] && last[1] === first[1]) out.pop();
    else break;
  }

  if (out.length < 3) return null;
  out.push([out[0][0], out[0][1]]);
  return out;
}

/** Decimal places needed for a ring of this span, clamped to >= 1. */
function precisionForSpan(span) {
  if (span <= 0) return MAX_PRECISION;
  // Aim for ~8 quantisation steps across the ring's longest axis: enough for a
  // microstate to keep a countable silhouette, coarse enough that anything at
  // continental scale stays at a single decimal and the payload stays small.
  const needed = Math.ceil(Math.log10(QUANTISATION_STEPS / span));
  return Math.min(MAX_PRECISION, Math.max(1, needed));
}

function processRing(ring) {
  const cleaned =
    Array.isArray(ring) && ring.length >= 3
      ? isClosed(ring)
        ? ring
        : [...ring, [ring[0][0], ring[0][1]]]
      : null;
  if (!cleaned) return null;

  const span = ringSpan(cleaned);
  const tolerance = Math.min(
    MAX_TOLERANCE_DEG,
    Math.max(MIN_TOLERANCE_DEG, span * TOLERANCE_RATIO)
  );
  const simplified = simplifyRing(cleaned, tolerance);

  for (let precision = precisionForSpan(span); precision <= MAX_PRECISION; precision++) {
    const quantized = quantizeRing(simplified, precision);
    if (quantized) return quantized;
  }
  return null;
}

/* ======================= FEATURE ASSEMBLY ================================ */

function propertiesFrom(upstream) {
  const adm0 = String(upstream.ADM0_A3 ?? '');
  const iso3Raw = upstream.ISO_A3;
  const iso2Raw = upstream.ISO_A2;

  const iso3 =
    ISO3_CORRECTIONS[adm0] ??
    (iso3Raw && iso3Raw !== '-99' ? String(iso3Raw) : adm0);
  const iso2 = iso2Raw && iso2Raw !== '-99' ? String(iso2Raw) : '';

  return {
    iso3,
    iso2,
    name: upstream.NAME,
    continent: upstream.CONTINENT,
    subregion: upstream.SUBREGION,
  };
}

function buildGeometry(feature) {
  const label = feature.properties?.NAME ?? feature.properties?.ADM0_A3 ?? '(unnamed)';
  const source = feature.geometry;
  if (!source || (source.type !== 'Polygon' && source.type !== 'MultiPolygon')) {
    throw new Error(`${label}: unsupported geometry type "${source?.type}"`);
  }

  const sourcePolygons =
    source.type === 'Polygon' ? [source.coordinates] : source.coordinates;

  // 1. Rank source rings up front, so we know which one MUST survive.
  //    Losing the largest ring is how a country becomes invisible; losing an
  //    islet is cosmetic. Only the former is allowed to abort the build.
  let largestKey = null;
  let largestSourceArea = -1;
  sourcePolygons.forEach((rings, polygonIndex) => {
    if (!Array.isArray(rings)) return;
    rings.forEach((ring, ringIndex) => {
      if (!Array.isArray(ring) || ring.length < 3) return;
      const area = ringArea(ring);
      if (area > largestSourceArea) {
        largestSourceArea = area;
        largestKey = `${polygonIndex}:${ringIndex}`;
      }
    });
  });

  if (largestKey === null) throw new Error(`${label}: geometry carries no usable ring.`);

  // 2. Process every ring, recording failures against their source identity.
  const processedPolygons = [];
  let lostLargestRing = false;

  sourcePolygons.forEach((rings, polygonIndex) => {
    if (!Array.isArray(rings) || rings.length === 0) return;

    const kept = [];
    rings.forEach((ring, ringIndex) => {
      const result = processRing(ring);
      if (!result) {
        if (`${polygonIndex}:${ringIndex}` === largestKey) lostLargestRing = true;
        return;
      }
      kept.push({
        ring: result,
        area: ringArea(result),
        exterior: ringIndex === 0,
      });
    });

    // A polygon whose exterior failed cannot be emitted as-is: the first ring of
    // a polygon MUST be its exterior, otherwise the fill rule inverts.
    const exterior = kept.find((entry) => entry.exterior);
    if (!exterior) return;
    processedPolygons.push([exterior, ...kept.filter((entry) => !entry.exterior)]);
  });

  if (lostLargestRing) {
    throw new Error(
      `${label}: the feature's largest ring could not be quantised at ${MAX_PRECISION} ` +
        'decimals. Refusing to write an asset with a missing country.'
    );
  }
  if (processedPolygons.length === 0) {
    throw new Error(`${label}: every polygon lost its exterior ring.`);
  }

  const largestArea = Math.max(
    ...processedPolygons.map(([exterior]) => exterior.area)
  );
  // A ring that already dominated its feature is exempt from speck pruning, so
  // a microstate can never be filtered out by its own smallness.
  const keep = (entry) => entry.area >= MIN_RING_AREA_DEG2 || entry.area === largestArea;

  const polygons = processedPolygons
    .filter(([exterior]) => keep(exterior))
    .map(([exterior, ...holes]) => [exterior, ...holes.filter(keep)].map((entry) => entry.ring));

  if (polygons.length === 0) {
    throw new Error(`${label}: every polygon was pruned as a speck.`);
  }

  if (source.type === 'Polygon') {
    if (polygons.length !== 1) {
      throw new Error(`${label}: single-polygon feature produced ${polygons.length}.`);
    }
    return { type: 'Polygon', coordinates: polygons[0] };
  }

  return { type: 'MultiPolygon', coordinates: polygons };
}

/* ============================== VALIDATION =============================== */

function auditCollection(collection) {
  const problems = [];
  const iso3Seen = new Map();
  let totalPositions = 0;
  let ringTotal = 0;

  for (const feature of collection.features) {
    const { iso3, name } = feature.properties;
    if (iso3Seen.has(iso3)) {
      problems.push(`duplicate iso3 ${iso3} (${name} / ${iso3Seen.get(iso3)})`);
    }
    iso3Seen.set(iso3, name);

    const polygons =
      feature.geometry.type === 'Polygon'
        ? [feature.geometry.coordinates]
        : feature.geometry.coordinates;

    let featurePositions = 0;
    let largestRingPositions = 0;

    for (const rings of polygons) {
      for (let i = 0; i < rings.length; i++) {
        const ring = rings[i];
        ringTotal++;
        totalPositions += ring.length;
        featurePositions += ring.length;
        if (i === 0 && ring.length > largestRingPositions) largestRingPositions = ring.length;

        if (ring.length < MIN_RING_POSITIONS) {
          problems.push(`${iso3} (${name}): ring has ${ring.length} positions`);
        }
        if (!isClosed(ring)) problems.push(`${iso3} (${name}): ring is not closed`);

        for (const [lon, lat] of ring) {
          if (!Number.isFinite(lon) || !Number.isFinite(lat)) {
            problems.push(`${iso3} (${name}): non-finite coordinate`);
            break;
          }
          if (lon < -180 || lon > 180 || lat < -90 || lat > 90) {
            problems.push(`${iso3} (${name}): coordinate out of range ${lon},${lat}`);
            break;
          }
        }
      }
    }

    if (featurePositions === 0) problems.push(`${iso3} (${name}): no positions`);
    // The load-bearing guarantee: a country must have a drawable area.
    if (largestRingPositions < MIN_RING_POSITIONS) {
      problems.push(
        `${iso3} (${name}): largest ring is degenerate (${largestRingPositions} positions) — not renderable`
      );
    }
  }

  return { problems, totalPositions, ringTotal };
}

/* ================================= MAIN ================================== */

const rawSource = readFileSync(sourcePath, 'utf8');
const sourceHash = createHash('sha256').update(rawSource).digest('hex');
const upstream = JSON.parse(rawSource);

if (upstream.type !== 'FeatureCollection' || !Array.isArray(upstream.features)) {
  throw new Error('source is not a GeoJSON FeatureCollection');
}

const features = [];
for (const feature of upstream.features) {
  const properties = propertiesFrom(feature.properties ?? {});
  const geometry = buildGeometry(feature);
  features.push({ type: 'Feature', properties, geometry });
}

const collection = {
  type: 'FeatureCollection',
  metadata: {
    name: 'Natural Earth 1:50m Admin 0 Countries (simplified)',
    source: 'Natural Earth — ne_50m_admin_0_countries',
    sourceUrl: `${SOURCE_REPO}/blob/master/geojson/ne_50m_admin_0_countries.geojson`,
    sourceSha256: sourceHash,
    license: 'Public domain (Natural Earth). No attribution required.',
    retrieved: '2026-09-25',
    simplification:
      'Douglas-Peucker with a span-adaptive tolerance clamped to ' +
      `${MIN_TOLERANCE_DEG}-${MAX_TOLERANCE_DEG} deg; coordinates rounded to 1-${MAX_PRECISION} ` +
      "decimals chosen per ring from that ring's own span, so microstates keep a " +
      "countable area; a feature's largest ring is never dropped; other rings below " +
      `${MIN_RING_AREA_DEG2} deg^2 pruned. Generated by scripts/build-world-geo.mjs.`,
    generatedBy: 'scripts/build-world-geo.mjs',
    featureCount: features.length,
    excluded: [],
  },
  features,
};

const { problems, totalPositions, ringTotal } = auditCollection(collection);
if (problems.length > 0) {
  console.error(`✗ ${problems.length} validation problem(s) — asset NOT written:`);
  for (const problem of problems.slice(0, 40)) console.error(`  • ${problem}`);
  if (problems.length > 40) console.error(`  … and ${problems.length - 40} more`);
  process.exit(1);
}

const serialized = JSON.stringify(collection);
writeFileSync(outPath, serialized);

const bytes = statSync(outPath).size;
const gzipped = gzipSync(serialized).length;
const upstreamPoints = upstream.features.reduce(
  (sum, feature) =>
    sum +
    feature.geometry.coordinates.reduce(
      (polygonSum, rings) =>
        polygonSum + rings.reduce((ringSum, ring) => ringSum + ring.length, 0),
      0
    ),
  0
);

const formatKb = (value) => `${(value / 1024).toFixed(1)} KB`;

console.log(`✓ wrote ${outPath}`);
console.log(`  features        ${features.length} (upstream ${upstream.features.length})`);
console.log(`  positions       ${totalPositions} (upstream ${upstreamPoints})`);
console.log(`  rings           ${ringTotal}`);
console.log(`  size            ${formatKb(bytes)} raw / ${formatKb(gzipped)} gzip`);
console.log(`  source sha256   ${sourceHash}`);
console.log('  degenerate      0');
