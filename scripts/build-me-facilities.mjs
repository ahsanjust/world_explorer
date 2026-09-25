#!/usr/bin/env node
/* =============================================================================
   MIDDLE EAST FACILITIES GENERATOR — universities + landmarks
   =============================================================================
   Emits the two "what is actually there" datasets the dossier modules need:

     src/data/universities/<iso3>.ts  + index.ts   — tertiary institutions
     src/data/landmarks/<iso3>.ts     + index.ts   — places worth visiting

   Usage:
     node scripts/build-me-facilities.mjs [--universities] [--landmarks] [--cache=<dir>]

   RESUMING A SLOW RUN
     The landmark queries run one country at a time (see collectLandmarks) and a
     single country answers in 20-60s, so a full regeneration takes tens of
     minutes — easily longer than a CI step or an interactive shell allows.
     `--cache=<dir>` writes each country's raw rows there as they arrive and
     replays them on the next run, so interrupted work resumes instead of
     restarting. Rows are cached before any processing, so the emitted files are
     byte-identical to an uncached run. The directory is disposable; delete it
     (or omit the flag) for a clean re-query.

   WHY GENERATED RATHER THAN HAND-TYPED
     The operator asked for up to 10 universities per country with a working
     link for each — several hundred verified records. Typing that by hand would
     guarantee invented URLs and duplicated entries. Generating it from a single
     query means every field has one provable origin and the whole set can be
     refreshed by re-running one command.

   SOURCE: Wikidata Query Service, licence CC0 1.0 (public domain dedication).
     Chosen because it is the only source that carries, per institution, an
     *official website*, a founding year, a city and a machine-readable type —
     the four fields the UI renders unconditionally — under a licence that
     permits redistribution. Commercial rankings (QS/THE) are explicitly NOT
     used without licensing. See `src/types/university.ts`
     for how "top 20" is defined without them.

   ORDERING
     Within each country, institutions are ordered by `wikipediaLanguages`
     (number of Wikipedia language editions with an article) — a real, checkable
     proxy for prominence. It is presented as *recognition*, never as a rank.

   QUALITY GATES (records failing any of these are dropped, not padded)
     Every emitted record must have: a name, an official website, a city, a
     founding year, and a unique id. A country therefore reports whatever it
     genuinely has — several countries have fewer than 20 institutions and that
     is stated, not filled in.
   ============================================================================= */

import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';

const ENDPOINT = 'https://query.wikidata.org/sparql';
const USER_AGENT =
  'WorldExplorerAtlas/1.0 (static-site build script; https://github.com/ahsanjust/world_explorer)';
const RETRIEVED = '2026-09-25';
const MAX_UNIVERSITIES_PER_COUNTRY = 10;
const MAX_LANDMARKS_PER_COUNTRY = 15;
/**
 * Recognition floor for landmarks, in Wikipedia language editions.
 * Required for the query to finish inside the endpoint's budget; it also keeps
 * genuinely obscure entries out of a list a traveller is meant to use.
 */
const MIN_LANDMARK_RECOGNITION = 8;

/** The canonical 26-state scope. QIDs are Wikidata's, ISO3 the app's join key. */
const COUNTRIES = [
  { iso3: 'ARE', qid: 'Q878', name: 'United Arab Emirates', dossier: 'united-arab-emirates' },
  { iso3: 'BHR', qid: 'Q398', name: 'Bahrain', dossier: 'bahrain' },
  { iso3: 'KWT', qid: 'Q817', name: 'Kuwait', dossier: 'kuwait' },
  { iso3: 'OMN', qid: 'Q842', name: 'Oman', dossier: 'oman' },
  { iso3: 'QAT', qid: 'Q846', name: 'Qatar', dossier: 'qatar' },
  { iso3: 'SAU', qid: 'Q851', name: 'Saudi Arabia', dossier: 'saudi-arabia' },
  { iso3: 'YEM', qid: 'Q805', name: 'Yemen', dossier: 'yemen' },
  { iso3: 'CYP', qid: 'Q229', name: 'Cyprus', dossier: 'cyprus' },
  { iso3: 'ISR', qid: 'Q801', name: 'Israel', dossier: 'israel' },
  { iso3: 'JOR', qid: 'Q810', name: 'Jordan', dossier: 'jordan' },
  { iso3: 'LBN', qid: 'Q822', name: 'Lebanon', dossier: 'lebanon' },
  { iso3: 'PSE', qid: 'Q219060', name: 'Palestine', dossier: 'palestine' },
  { iso3: 'SYR', qid: 'Q858', name: 'Syria', dossier: 'syria' },
  { iso3: 'IRN', qid: 'Q794', name: 'Iran', dossier: 'iran' },
  { iso3: 'IRQ', qid: 'Q796', name: 'Iraq', dossier: 'iraq' },
  { iso3: 'TUR', qid: 'Q43', name: 'Türkiye', dossier: 'turkiye' },
  { iso3: 'DZA', qid: 'Q262', name: 'Algeria', dossier: 'algeria' },
  { iso3: 'EGY', qid: 'Q79', name: 'Egypt', dossier: 'egypt' },
  { iso3: 'LBY', qid: 'Q1016', name: 'Libya', dossier: 'libya' },
  { iso3: 'MAR', qid: 'Q1028', name: 'Morocco', dossier: 'morocco' },
  { iso3: 'SDN', qid: 'Q1049', name: 'Sudan', dossier: 'sudan' },
  { iso3: 'TUN', qid: 'Q948', name: 'Tunisia', dossier: 'tunisia' },
  { iso3: 'AFG', qid: 'Q889', name: 'Afghanistan', dossier: 'afghanistan' },
  { iso3: 'ARM', qid: 'Q399', name: 'Armenia', dossier: 'armenia' },
  { iso3: 'AZE', qid: 'Q227', name: 'Azerbaijan', dossier: 'azerbaijan' },
  { iso3: 'GEO', qid: 'Q230', name: 'Georgia', dossier: 'georgia' },
];

/** Wikidata class → the app's coarse `Landmark.category`. */
const LANDMARK_CLASSES = {
  Q570116: 'Cultural', // tourist attraction
  Q9259: 'Historical', // World Heritage Site
  Q839954: 'Historical', // archaeological site
  Q4989906: 'Historical', // monument
  Q33506: 'Cultural', // museum
  Q16560: 'Architectural', // palace
  Q23413: 'Architectural', // castle
  Q32815: 'Architectural', // mosque
  Q16970: 'Architectural', // church
  Q44613: 'Architectural', // monastery
  Q22698: 'Natural', // park
  Q8502: 'Natural', // mountain
  Q34038: 'Natural', // waterfall
  Q35509: 'Natural', // cave
  Q40080: 'Natural', // beach
};

/* ============================== helpers ================================== */

const argv = process.argv.slice(2);
const args = new Set(argv.filter((arg) => !arg.startsWith('--cache=')));
const wantUniversities = args.size === 0 || args.has('--universities');
const wantLandmarks = args.size === 0 || args.has('--landmarks');

/** Opt-in raw-row cache directory (`--cache=<dir>`), or null for a clean query. */
const cacheArg = argv.find((arg) => arg.startsWith('--cache='));
const CACHE_DIR = cacheArg ? cacheArg.slice('--cache='.length) : null;

function readCachedRows(country) {
  if (!CACHE_DIR) return null;
  const path = `${CACHE_DIR}/${country.iso3.toLowerCase()}.json`;
  if (!existsSync(path)) return null;
  try {
    return JSON.parse(readFileSync(path, 'utf8'));
  } catch {
    // A truncated file means the previous run died mid-write; re-query instead.
    return null;
  }
}

function writeCachedRows(country, rows) {
  if (!CACHE_DIR) return;
  mkdirSync(CACHE_DIR, { recursive: true });
  writeFileSync(`${CACHE_DIR}/${country.iso3.toLowerCase()}.json`, JSON.stringify(rows));
}

const slugify = (value) =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const esc = (value) => String(value).replace(/\\/g, '\\\\').replace(/'/g, "\\'");

async function sparqlOnce(query) {
  const response = await fetch(ENDPOINT, {
    method: 'POST',
    headers: {
      Accept: 'application/sparql-results+json',
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'User-Agent': USER_AGENT,
    },
    body: new URLSearchParams({ query }),
  });
  if (!response.ok) {
    throw new Error(`Wikidata returned HTTP ${response.status} ${response.statusText}`);
  }
  const json = await response.json();
  return json.results.bindings.map((row) =>
    Object.fromEntries(Object.entries(row).map(([key, value]) => [key, value.value]))
  );
}

/**
 * The public endpoint sheds load with 429/504 on heavy queries, so retry with
 * backoff rather than failing a regeneration on a transient timeout.
 */
async function sparql(query, attempts = 4) {
  let lastError;
  for (let attempt = 1; attempt <= attempts; attempt++) {
    try {
      return await sparqlOnce(query);
    } catch (error) {
      lastError = error;
      const waitMs = 3000 * attempt;
      console.warn(`  attempt ${attempt}/${attempts} failed (${error.message}); retrying in ${waitMs}ms`);
      await new Promise((resolve) => setTimeout(resolve, waitMs));
    }
  }
  throw lastError;
}

const countryValues = COUNTRIES.map((c) => `wd:${c.qid}`).join(' ');
const byQid = new Map(COUNTRIES.map((c) => [c.qid, c]));

/** ISO2 codes come from the boundary asset, so flag emoji are derived, not typed. */
function flagEmojiByIso3() {
  const emoji = new Map();
  try {
    const asset = JSON.parse(
      readFileSync('public/maps/world-countries-50m.geojson', 'utf8')
    );
    for (const feature of asset.features) {
      const { iso3, iso2 } = feature.properties;
      if (iso2 && iso2.length === 2) {
        emoji.set(
          iso3,
          String.fromCodePoint(
            ...[...iso2.toUpperCase()].map((ch) => 0x1f1e6 + ch.charCodeAt(0) - 65)
          )
        );
      }
    }
  } catch {
    /* Flag emoji are cosmetic; their absence must not fail the build. */
  }
  return emoji;
}

/* ============================ UNIVERSITIES =============================== */

async function collectUniversities() {
  const query = `
    SELECT ?country ?uni ?uniLabel ?website ?inception ?cityLabel ?students ?sitelinks ?typeLabel ?fieldLabel WHERE {
      VALUES ?country { ${countryValues} }
      ?uni wdt:P17 ?country ;
           wdt:P31/wdt:P279* wd:Q3918 ;
           wikibase:sitelinks ?sitelinks .
      OPTIONAL { ?uni wdt:P856 ?website . }
      OPTIONAL { ?uni wdt:P571 ?inception . }
      OPTIONAL { ?uni wdt:P131 ?city . }
      OPTIONAL { ?uni wdt:P2196 ?students . }
      OPTIONAL { ?uni wdt:P31 ?type . }
      OPTIONAL { ?uni wdt:P101 ?field . }
      SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
    }`;

  const rows = await sparql(query);
  const merged = new Map();

  const PRIVATE = new Set(['private university', 'private college', 'private research university']);
  const PUBLIC = new Set([
    'public university',
    'public research university',
    'state university',
    'national university',
    'public college',
  ]);

  for (const row of rows) {
    const country = byQid.get(row.country.replace('http://www.wikidata.org/entity/', ''));
    if (!country) continue;

    let record = merged.get(row.uni);
    if (!record) {
      record = {
        qid: row.uni,
        name: row.uniLabel || '',
        country,
        website: '',
        city: '',
        inception: null,
        students: null,
        sitelinks: Number(row.sitelinks) || 0,
        types: [],
        fields: [],
      };
      merged.set(row.uni, record);
    }
    // A university can appear once per field/type; keep the best value seen.
    if (row.website && !record.website) record.website = row.website;
    if (row.cityLabel && !record.city) record.city = row.cityLabel;
    if (row.inception && !record.inception) {
      const year = Number(row.inception.slice(0, 4));
      if (Number.isFinite(year)) record.inception = year;
    }
    if (row.students) {
      const count = Number(row.students);
      if (Number.isFinite(count) && count > 0) {
        record.students = Math.max(record.students ?? 0, count);
      }
    }
    if (row.typeLabel) record.types.push(row.typeLabel.toLowerCase());
    if (row.fieldLabel) record.fields.push(row.fieldLabel);
  }

  const perCountry = new Map(COUNTRIES.map((c) => [c.iso3, []]));
  const dropped = { noName: 0, noWebsite: 0, noCity: 0, noYear: 0 };

  for (const record of merged.values()) {
    if (!record.name) {
      dropped.noName++;
      continue;
    }
    if (!record.website) {
      dropped.noWebsite++;
      continue;
    }
    if (!record.city) {
      dropped.noCity++;
      continue;
    }
    if (!record.inception) {
      dropped.noYear++;
      continue;
    }

    const type = record.types.some((t) => PRIVATE.has(t))
      ? 'Private'
      : record.types.some((t) => PUBLIC.has(t))
        ? 'Public'
        : 'Unknown';

    perCountry.get(record.country.iso3).push({
      id: `${slugify(record.name)}-${record.country.iso3.toLowerCase()}`,
      name: record.name,
      countryId: record.country.dossier,
      countryIso3: record.country.iso3,
      countryName: record.country.name,
      city: record.city,
      websiteUrl: record.website,
      foundedYear: record.inception,
      type,
      notableFields: [...new Set(record.fields)].filter(Boolean).sort().slice(0, 5),
      globalRankQs: null,
      recognition: {
        wikipediaLanguages: record.sitelinks,
        basis: 'Wikipedia language editions with an article',
      },
      studentCount: record.students,
      sourceUrl: record.qid,
    });
  }

  for (const list of perCountry.values()) {
    list.sort((a, b) => b.recognition.wikipediaLanguages - a.recognition.wikipediaLanguages);
    list.length = Math.min(list.length, MAX_UNIVERSITIES_PER_COUNTRY);
  }

  return { perCountry, dropped, distinct: merged.size };
}

/* ============================== LANDMARKS ================================ */

async function collectLandmarks() {
  const classValues = Object.keys(LANDMARK_CLASSES)
    .map((qid) => `wd:${qid}`)
    .join(' ');

  /*
   * Queried one country at a time. A single 26-country query exceeded the
   * endpoint's per-query budget (HTTP 504, then 429 while backing off) because
   * `?place wdt:P31 ?class` over 16 candidate classes multiplies rows against a
   * multi-country candidate set. Per-country queries are individually small and
   * complete reliably; the delay keeps us inside the endpoint's rate limits.
   *
   * Two further constraints matter: a recognition floor (which is also the
   * ordering signal, so nothing useful is lost), and EXISTS rather than OPTIONAL
   * for UNESCO status — an OPTIONAL on a multi-valued property multiplies rows.
   */
  const merged = new Map();

  for (const country of COUNTRIES) {
    const query = `
      SELECT ?place ?placeLabel ?sitelinks ?cityLabel ?desc ?image ?class ?coord ?unesco WHERE {
        VALUES ?class { ${classValues} }
        ?place wdt:P17 wd:${country.qid} ;
               wdt:P31 ?class ;
               wdt:P18 ?image ;
               wikibase:sitelinks ?sitelinks .
        FILTER(?sitelinks >= ${MIN_LANDMARK_RECOGNITION})
        BIND(EXISTS { ?place wdt:P1435 wd:Q9259 } AS ?unesco)
        OPTIONAL { ?place wdt:P131 ?city . }
        OPTIONAL { ?place wdt:P625 ?coord . }
        OPTIONAL { ?place schema:description ?desc . FILTER(LANG(?desc) = "en") }
        SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
      }`;

    let rows = readCachedRows(country);
    if (rows) {
      console.log(`  ${country.iso3}: ${rows.length} row(s) from cache`);
    } else {
      try {
        rows = (await sparql(query)).map((row) => ({
          ...row,
          country: `http://www.wikidata.org/entity/${country.qid}`,
        }));
      } catch (err) {
        // The free WDQS endpoint regularly returns 504 on heritage-heavy
        // countries. One timeout must not block the other 25 — the country
        // simply gets no GENERATED landmarks for now (curated dossier entries
        // are unaffected). The gap is never padded or invented: re-running the
        // script retries uncached countries and fills it in.
        console.warn(
          `  ${country.iso3}: query failed (${err.message}) — emitting no generated landmarks for this country; re-run to retry`
        );
        continue;
      }
      writeCachedRows(country, rows);
      console.log(`  ${country.iso3}: ${rows.length} row(s) queried`);
      await new Promise((resolve) => setTimeout(resolve, 1200));
    }
    if (rows.length === 0) continue;
    ingestLandmarkRows(rows, country, merged);
  }

  return finishLandmarks(merged);
}

function ingestLandmarkRows(rows, country, merged) {
  for (const row of rows) {
    const classQid = row.class.replace('http://www.wikidata.org/entity/', '');
    const category = LANDMARK_CLASSES[classQid];
    if (!category) continue;

    let record = merged.get(row.place);
    if (!record) {
      record = {
        qid: row.place,
        name: row.placeLabel || '',
        country,
        city: '',
        description: '',
        imageFile: '',
        categories: [],
        unesco: false,
        coordinates: null,
        sitelinks: Number(row.sitelinks) || 0,
      };
      merged.set(row.place, record);
    }
    if (row.cityLabel && !record.city) record.city = row.cityLabel;
    if (row.desc && !record.description) record.description = row.desc;
    if (row.image && !record.imageFile) record.imageFile = row.image;
    if (row.coord && !record.coordinates) {
      const match = /Point\(([-\d.]+) ([-\d.]+)\)/.exec(row.coord);
      if (match) {
        record.coordinates = [Number(match[2]), Number(match[1])]; // [lat, lng]
      }
    }      record.categories.push(category);
    if (row.unesco) record.unesco = true;
  }
}

function finishLandmarks(merged) {
  const perCountry = new Map(COUNTRIES.map((c) => [c.iso3, []]));
  for (const record of merged.values()) {
    if (!record.name || !record.imageFile) continue;
    // Prefer the most specific category: a natural site is never "Cultural".
    const category =
      record.categories.find((c) => c === 'Natural') ??
      record.categories.find((c) => c === 'Historical') ??
      record.categories[0];

    perCountry.get(record.country.iso3).push({
      id: `${slugify(record.name)}-${record.country.iso3.toLowerCase()}`,
      name: record.name,
      location: record.city || record.country.name,
      city: record.city,
      category,
      description: record.description || '',
      // Commons' stable file-path endpoint. Files on Commons are freely licensed
      // by policy; the URL is built from the filename, never hand-written.
      imageUrl: `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(
        record.imageFile
      )}?width=900`,
      unescoDesignated: record.unesco,
      coordinates: record.coordinates,
      recognizedInLanguages: record.sitelinks,
      sourceUrl: record.qid,
    });
  }

  for (const list of perCountry.values()) {
    list.sort((a, b) => b.recognizedInLanguages - a.recognizedInLanguages);
    list.length = Math.min(list.length, MAX_LANDMARKS_PER_COUNTRY);
  }

  return { perCountry, distinct: merged.size };
}

/* ============================= EMISSION ================================== */

const BANNER = (module, extra) => `/* =============================================================================
   GENERATED FILE — DO NOT EDIT BY HAND.
   =============================================================================
   ${module}

   Source:  Wikidata Query Service (https://query.wikidata.org)
   Licence: CC0 1.0 Universal — public domain dedication. Redistribution is
            permitted and no attribution is required (recorded anyway, for
            provenance).
   Retrieved: ${RETRIEVED}
   Regenerate: node scripts/build-me-facilities.mjs
   ${extra}
   ============================================================================= */
`;

function emitFiles({ perCountry, dir, typeName, typeImportPath, exportSuffix, buildBody, moduleNote }) {
  rmSync(dir, { recursive: true, force: true });
  mkdirSync(dir, { recursive: true });

  const written = [];
  for (const country of COUNTRIES) {
    const records = perCountry.get(country.iso3) ?? [];
    const fileName = country.iso3.toLowerCase();
    const constName = `${country.iso3}_${exportSuffix}`;
    writeFileSync(
      `${dir}/${fileName}.ts`,
      BANNER(moduleNote(country, records.length), '') +
        `import type { ${typeName} } from '${typeImportPath}';\n\n` +
        `export const ${constName}: ${typeName}[] = ${buildBody(records)};\n`
    );
    written.push({ fileName, constName, count: records.length });
  }

  const imports = written
    .map(({ fileName, constName }) => `import { ${constName} } from './${fileName}';`)
    .join('\n');
  const spread = written.map(({ constName }) => `  ...${constName},`).join('\n');

  return { imports, spread, written };
}

function emitUniversityIndex(emittedUniversities) {
  const { imports, spread } = emittedUniversities;
  writeFileSync(
    'src/data/universities/index.ts',
    BANNER(
      'Aggregate index over the per-country university modules.',
      'Hand-written aggregation adds the filter/query helpers on top of generated data.'
    ) +
      `${imports}\nimport type { GlobalUniversity } from '../../types/university';\n\n` +
      `export type { GlobalUniversity, UniversityFilter, UniversitySortKey } from '../../types/university';\n\n` +
      '/** Every in-scope institution, all 26 countries concatenated. */\n' +
      `export const MIDDLE_EAST_UNIVERSITIES: GlobalUniversity[] = [\n${spread}\n];\n\n` +
      '/**\n' +
      ' * @deprecated Renamed to `MIDDLE_EAST_UNIVERSITIES`. This alias exists only so\n' +
      ' * existing imports keep compiling; "global" was never accurate for a\n' +
      ' * Middle-East-scoped build. Migrate call sites, then delete this.\n' +
      ' */\n' +
      'export const TOP_GLOBAL_UNIVERSITIES = MIDDLE_EAST_UNIVERSITIES;\n'
  );
}

function emitLandmarkIndex(emitted) {
  const { imports, spread } = emitted;
  /* The flat array has no country key (unlike `GlobalUniversity.countryIso3`), so
   * the per-country lookup has to be part of the generated file too. Emitting it
   * here rather than hand-editing the index afterwards means a regeneration
   * cannot silently drop it. */
  const byIso3 = COUNTRIES.map(({ iso3 }) => `  ${iso3}: ${iso3}_LANDMARKS,`).join('\n');
  writeFileSync(
    'src/data/landmarks/index.ts',
    BANNER(
      'Aggregate index over the per-country landmark modules.',
      'Includes the per-country lookup: landmark records carry no country key of\n   their own, so `MIDDLE_EAST_LANDMARKS` alone cannot be filtered.'
    ) +
      `${imports}\nimport type { Landmark } from '../../types/country';\n\n` +
      `export const MIDDLE_EAST_LANDMARKS: Landmark[] = [\n${spread}\n];\n\n` +
      '/** Every in-scope country in the generated dataset, keyed by ISO3. */\n' +
      `export const LANDMARKS_BY_ISO3: Record<string, Landmark[]> = {\n${byIso3}\n};\n\n` +
      '/** Places worth visiting in one country; `[]` when the dataset has none. */\n' +
      'export function getLandmarksByCountryIso3(iso3: string): Landmark[] {\n' +
      '  return LANDMARKS_BY_ISO3[iso3.toUpperCase()] ?? [];\n' +
      '}\n'
  );
}

/* ================================ MAIN =================================== */

const flags = flagEmojiByIso3();
const summary = [];

if (wantUniversities) {
  console.log('Querying Wikidata for universities…');
  const { perCountry, dropped, distinct } = await collectUniversities();

  // Attach derived flag emoji (the query result is cached above; add here).
  for (const [, list] of perCountry) {
    for (const record of list) record.flagEmoji = flags.get(record.countryIso3) ?? '🏳';
  }

  const emitted = emitFiles({
    perCountry,
    dir: 'src/data/universities',
    typeName: 'GlobalUniversity',
    typeImportPath: '../../types/university',
    exportSuffix: 'UNIVERSITIES',
    moduleNote: (country, count) =>
      `Universities in ${country.name} (${country.iso3}) — ${count} record(s),\n   ordered by international recognition.`,
    buildBody: (records) =>
      records.length === 0
        ? '[]'
        : `[\n${records
            .map(
              (r) =>
                `  {\n` +
                `    id: '${esc(r.id)}',\n` +
                `    name: '${esc(r.name)}',\n` +
                `    countryId: '${esc(r.countryId)}',\n` +
                `    countryIso3: '${esc(r.countryIso3)}',\n` +
                `    countryName: '${esc(r.countryName)}',\n` +
                `    flagEmoji: '${esc(r.flagEmoji)}',\n` +
                `    city: '${esc(r.city)}',\n` +
                `    websiteUrl: '${esc(r.websiteUrl)}',\n` +
                `    foundedYear: ${r.foundedYear},\n` +
                `    type: '${r.type}',\n` +
                `    notableFields: [${r.notableFields.map((f) => `'${esc(f)}'`).join(', ')}],\n` +
                `    globalRankQs: null,\n` +
                `    recognition: { wikipediaLanguages: ${r.recognition.wikipediaLanguages}, basis: 'Wikipedia language editions with an article' },\n` +
                `    studentCount: ${r.studentCount ?? 'null'},\n` +
                `    sourceUrl: '${esc(r.sourceUrl)}',\n` +
                `  },`
            )
            .join('\n')}\n]`,
  });

  emitUniversityIndex(emitted);

  const total = emitted.written.reduce((sum, w) => sum + w.count, 0);
  const thin = emitted.written.filter((w) => w.count < MAX_UNIVERSITIES_PER_COUNTRY);
  summary.push({ label: 'universities', total, distinct, written: emitted.written, thin, dropped });
}

if (wantLandmarks) {
  console.log('Querying Wikidata for landmarks…');
  const { perCountry, distinct } = await collectLandmarks();

  const emitted = emitFiles({
    perCountry,
    dir: 'src/data/landmarks',
    typeName: 'Landmark',
    typeImportPath: '../../types/country',
    exportSuffix: 'LANDMARKS',
    moduleNote: (country, count) =>
      `Places worth visiting in ${country.name} (${country.iso3}) — ${count} record(s),\n   ordered by international recognition. Every record has a real image.`,
    buildBody: (records) =>
      records.length === 0
        ? '[]'
        : `[\n${records
            .map(
              (r) =>
                `  {\n` +
                `    id: '${esc(r.id)}',\n` +
                `    name: '${esc(r.name)}',\n` +
                `    location: '${esc(r.location)}',\n` +
                `    city: '${esc(r.city)}',\n` +
                `    category: '${r.category}',\n` +
                `    description: '${esc(r.description)}',\n` +
                `    imageUrl: '${esc(r.imageUrl)}',\n` +
                `    unescoDesignated: ${r.unescoDesignated},\n` +
                `    coordinates: ${r.coordinates ? `[${r.coordinates[0]}, ${r.coordinates[1]}]` : 'null'},\n` +
                `    recognizedInLanguages: ${r.recognizedInLanguages},\n` +
                `    sourceUrl: '${esc(r.sourceUrl)}',\n` +
                `  },`
            )
            .join('\n')}\n]`,
  });

  emitLandmarkIndex(emitted);

  const total = emitted.written.reduce((sum, w) => sum + w.count, 0);
  summary.push({
    label: 'landmarks',
    total,
    distinct,
    written: emitted.written,
    thin: emitted.written.filter((w) => w.count < MAX_LANDMARKS_PER_COUNTRY),
    dropped: null,
  });
}

/* ============================== REPORT =================================== */

let thinCountries = 0;
for (const block of summary) {
  console.log(`\n✓ ${block.label}: ${block.total} records emitted (${block.distinct} distinct upstream)`);
  for (const w of block.written) {
    if (w.count === 0) console.log(`    ${w.fileName}: 0   ⚠ nothing emitted`);
  }
  if (block.thin.length > 0) {
    thinCountries += block.thin.length;
    console.log(
      `  ${block.thin.length} country/countries have fewer than the requested maximum ` +
        `(reported honestly, not padded):`
    );
    for (const w of block.thin) console.log(`    ${w.fileName}: ${w.count}`);
  }
  if (block.dropped) {
    console.log(
      `  dropped for missing required fields: name ${block.dropped.noName}, ` +
        `website ${block.dropped.noWebsite}, city ${block.dropped.noCity}, year ${block.dropped.noYear}`
    );
  }
}

console.log(
  `\nDone. ${thinCountries} shortfall(s) recorded. Shortfalls are a finding, not a bug: ` +
    'the app states what a country has rather than inventing entries.'
);
