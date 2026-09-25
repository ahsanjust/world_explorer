import { Subregion } from '../types/spatial';

/* =============================================================================
   MIDDLE EAST SUBREGIONS — THE APP'S CANONICAL COUNTRY LIST (26 STATES)
   =============================================================================
   This file is the single source of truth for **which countries the product
   covers**. `Region.countryCount`, `MIDDLE_EAST_ISO3` (the map's in-scope set),
   `PENDING_DOSSIERS` and `validateDataset()` all derive from it, so a country
   cannot be present in one place and missing from another.

   Never re-type this list anywhere else. A duplicate copy is precisely how a
   country gets silently dropped. It is the central authority for in-scope states.

   SCOPE DEFINITION — Greater Middle East:
     MENA on a geographic basis (the common "Middle East / West Asia" political
     definition ∪ North Africa per the UN geoscheme) **plus** the South Caucasus
     and Afghanistan, which is the standard "Greater Middle East" framing.

     The rule is **geographic, not institutional**. That is why the World Bank's
     operational MENA grouping is not copied wholesale — it also contains
     Djibouti (Horn of Africa) and historically Malta (Southern Europe).

   GEOMETRY
     `centerCoordinates` and `bounds` are **derived**, not estimated: each
     subregion's box is the union of its member states' geometry in
     `public/maps/world-countries-50m.geojson`. Nothing in this file is a guess.
   ============================================================================= */

export const SUBREGIONS: Subregion[] = [
  {
    id: 'arabian-peninsula',
    regionId: 'middle-east',
    name: 'Arabian Peninsula & Gulf',
    description:
      'The peninsula and its Gulf littoral: the birthplace of Islam, the world’s largest hydrocarbon reserves, and the Gulf Cooperation Council economies that converted energy rents into sovereign wealth funds and hyper-modern cities.',
    countries: ['ARE', 'BHR', 'KWT', 'OMN', 'QAT', 'SAU', 'YEM'],
    centerCoordinates: [22.2, 47.2],
    bounds: [
      [12.3, 34.6],
      [32.1, 59.8],
    ],
  },
  {
    id: 'levant',
    regionId: 'middle-east',
    name: 'Levant & Eastern Mediterranean',
    description:
      'The eastern Mediterranean seaboard and its hinterland — the land bridge between Egypt, Anatolia and Mesopotamia, home to some of the oldest continuously inhabited cities on Earth and to the origins of three major world faiths.',
    countries: ['CYP', 'ISR', 'JOR', 'LBN', 'PSE', 'SYR'],
    centerCoordinates: [33.3, 37.4],
    bounds: [
      [29.2, 32.3],
      [37.3, 42.4],
    ],
  },
  {
    id: 'anatolia-mesopotamia-iran',
    regionId: 'middle-east',
    name: 'Anatolia, Mesopotamia & Iran',
    description:
      'The Anatolian plateau between the Black Sea and the Mediterranean, the Tigris–Euphrates basin that cradled the first cities and writing systems, and the Iranian plateau bridging the Middle East to Central and South Asia.',
    countries: ['IRN', 'IRQ', 'TUR'],
    centerCoordinates: [33.6, 44.5],
    bounds: [
      [25.1, 25.7],
      [42.1, 63.3],
    ],
  },
  {
    id: 'north-africa',
    regionId: 'middle-east',
    name: 'North Africa & Nile Valley',
    description:
      'The Mediterranean littoral of Africa, the Nile valley and the Sahara: the Maghreb, Egypt, and Sudan on the Sahelian edge of the desert — Amazigh and Arab cultures whose trade routes and migrations have bound them to the eastern Mediterranean for millennia.',
    countries: ['DZA', 'EGY', 'LBY', 'MAR', 'SDN', 'TUN'],
    centerCoordinates: [23.0, 10.8],
    bounds: [
      [8.7, -17.0],
      [37.3, 38.6],
    ],
  },
  {
    id: 'caucasus-afghanistan',
    regionId: 'middle-east',
    name: 'Caucasus & Afghanistan',
    description:
      'The northern rim of the region: the South Caucasus between the Black and Caspian seas, sitting on the historic Silk Road corridor, and Afghanistan, the mountain crossroads between the Iranian plateau, Central Asia and the Indian subcontinent.',
    countries: ['AFG', 'ARM', 'AZE', 'GEO'],
    centerCoordinates: [36.5, 57.5],
    bounds: [
      [29.4, 40.0],
      [43.6, 74.9],
    ],
  },
];

/**
 * Every ISO3 code the product covers, flattened from `SUBREGIONS`.
 *
 * Derived rather than re-typed, so the map, the validator and the coverage
 * notices can never disagree about who is in scope.
 */
export const MIDDLE_EAST_COUNTRY_ISO3: readonly string[] = SUBREGIONS.flatMap(
  (subregion) => subregion.countries
);

/** Index for O(1) membership tests (the map calls this per territory per render). */
const MIDDLE_EAST_ISO3_SET: ReadonlySet<string> = new Set(MIDDLE_EAST_COUNTRY_ISO3);

/**
 * True when `iso3` is one of the Middle East states the product covers.
 *
 * This is the *scope* test and is deliberately separate from "does a dossier
 * exist": the map must draw all 26 in-scope states as the subject while only a
 * subset have profiles authored so far.
 *
 * Note it cannot be answered from `continent` — Egypt is in Africa and in scope,
 * Kenya is in Africa and out of scope.
 */
export function isMiddleEastCountry(iso3: string | undefined | null): boolean {
  return !!iso3 && MIDDLE_EAST_ISO3_SET.has(iso3);
}

/** In-scope ISO3 codes that still have no authored dossier. Roadmap, not a defect. */
export function findCountriesWithoutDossiers(compiledIso3: readonly string[]): string[] {
  const compiled = new Set(compiledIso3);
  return MIDDLE_EAST_COUNTRY_ISO3.filter((iso3) => !compiled.has(iso3));
}
