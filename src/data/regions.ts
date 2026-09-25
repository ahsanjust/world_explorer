import { Region } from '../types/spatial';

/* =============================================================================
   THE APP'S REGIONS
   =============================================================================
   Exactly one. The product explores the Middle East, so the world → region step
   of the spatial hierarchy resolves to a single sphere and the real navigation
   happens one level down, in the four Middle East subregions.

   `WorldPortal` iterates this array, so it stays correct automatically if a
   second region is ever added back. Nothing here is hardcoded to "1 region".
   ============================================================================= */

export const REGIONS: Region[] = [
  {
    id: 'middle-east',
    name: 'Middle East',
    code: 'ME',
    hemisphere: 'Northern',
    // Coverage target: 21 sovereign states, per the union of the subregions
    // declared in `src/data/subregions.ts`. Independent of how many dossiers are
    // authored — compare with `DATASET_STATS.countryCount`.
    countryCount: 26,
    totalPopulation: 590000000, // ~590 Million across the 26 sovereign states (UN 2024)
    totalGdpTrillionUsd: 4.8, // ~$4.8 Trillion combined nominal GDP (IMF World Economic Outlook 2024)
    overview:
      'The crossroads of three continents: the Arabian Peninsula and its Gulf, the Levant, Anatolia, Mesopotamia and Iran, North Africa and the Nile valley, and the Caucasus with Afghanistan. A region whose energy wealth, chokepoint shipping lanes and young, urbanising populations give it influence far beyond its land area.',
    subregions: [
      'arabian-peninsula',
      'levant',
      'anatolia-mesopotamia-iran',
      'north-africa',
      'caucasus-afghanistan',
    ],
    // Derived as the centre of the union of all 26 member states' bounding boxes
    // in the boundary asset: 8.7°N–43.6°N, 17.0°W–74.9°E. The west edge is
    // Morocco's Atlantic coast, the east edge Afghanistan's border with Pakistan,
    // the south edge Sudan's border with South Sudan.
    focalCoordinates: [26.15, 28.95],
    // ⚠️ The scope spans **91.9° of longitude** (17.0°W–74.9°E) and 34.9° of
    // Algeria, Tunisia, Libya and Afghanistan.
    // 360 / 91.9 ≈ 3.9 is the zoom at which the extent fills a 360°-wide plate.
    focalZoom: 3.9,
    color: '#E5B558', // Gold — the region's accent across the design system
  },
];
