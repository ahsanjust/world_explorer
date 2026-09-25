# World Explorer

**An interactive digital atlas and intelligence platform of the Greater Middle East.**

World Explorer is a country-intelligence web application covering the **26 countries of the Greater Middle East** — the Arabian Peninsula, the Levant, Anatolia & Mesopotamia & Iran, North Africa & the Nile, and the Caucasus & Afghanistan. Descend from the region into its five subregions, open country dossiers, browse 460 verified higher-education institutions with live search and filters, and compare nations side by side on a 2D vector map and a 3D orthographic globe.

- **Live Site:** https://ahsanjust.github.io/world_explorer/
- **Repository:** https://github.com/ahsanjust/world_explorer

---

## Scope & Geographic Coverage

The app covers the Greater Middle East and nothing else. Countries outside the set are still drawn as muted geographic context on the 2D map and 3D globe so the cartography reads correctly.

### The 26 Sovereign Countries

| Subregion | Countries |
|---|---|
| **Arabian Peninsula** (7) | Bahrain · Kuwait · Oman · Qatar · Saudi Arabia · United Arab Emirates · Yemen |
| **Levant & Eastern Mediterranean** (6) | Cyprus · Israel · Jordan · Lebanon · Palestine · Syria |
| **Anatolia, Mesopotamia & Iran** (3) | Iran · Iraq · Turkey |
| **North Africa & the Nile** (6) | Algeria · Egypt · Libya · Morocco · Sudan · Tunisia |
| **Caucasus & Afghanistan** (4) | Afghanistan · Armenia · Azerbaijan · Georgia |

Navigation follows a `World → Middle East → Subregion → Country Dossier` hierarchy using static hash routing (`#/`, `#/explore/:region/:subregion/:country`, `#/country/:countryId`), which keeps client-side deep links working on GitHub Pages with no server-side routing rewrites.

---

## Data & Provenance

- **Country statistics** come from official sources — World Bank, IMF, UN, UNESCO, UNODC, Numbeo, European Central Bank and Natural Earth. Each dossier records the source of its figures in its citation metadata.
- **Unavailable metrics** are shown as not available rather than filled in with an estimate: the underlying fields stay `null` (or are absent) so the UI can state that a number is missing instead of implying a value.
- **Higher education:** 460 institutions across the 26 countries, each with a city, founding year, institution type and link to its official website. The records are generated from Wikidata (CC0) and ordered by *recognition* — the number of Wikipedia language editions carrying an article about the institution — which is a checkable signal rather than a paid ranking. Commercial ranking data (QS/THE) is not redistributed, so `globalRankQs` stays `null` in generated records and is reserved for a licensed ranking should one be added; institutions without a rank are shown without a rank badge, and rank-tier filters exclude them rather than counting them as unranked winners.
- **Landmarks:** the generated counterpart to the dossiers' hand-written entries, also from Wikidata (CC0) and also ordered by recognition. Every record has a real photo served from Wikimedia Commons, a city, coordinates and a Wikidata `sourceUrl`, and only places reaching eight Wikipedia language editions are included so the list stays usable. Each dossier shows its hand-authored entries first and then fills up to nine cards from this dataset.
- **Dossier coverage:** every country owns its own module under `src/data/countries/`. The ten flagship dossiers carry per-country researched values; the other sixteen are assembled from their own seed data (geography, population, GDP, currency, safety and peace indices, Köppen class, landmarks, cuisine, languages, industries, exports) plus a shared baseline whose remaining fields — growth, inflation, unemployment, debt, Gini, sample prices and the monthly climograph — are single estimates awaiting per-country research and are documented as such in `countries/sovereignDossier.ts`.
- **Boundaries:** `public/maps/world-countries-50m.geojson` is derived from Natural Earth (public domain) and rebuilt by `scripts/build-world-geo.mjs`, so the shipped asset is reproducible from its generator.
- **Currency:** exchange rates resolve through a fallback cascade — in-memory cache → jsDelivr CDN rates → Frankfurter (ECB) API → localStorage cache → baseline seed rates covering USD, EUR, GBP, BDT and the sovereign Middle Eastern currencies. The converter displays which tier supplied the rate it is showing.

---

## Key Features

- **Interactive 2D Vector Map:** Responsive SVG projection over Natural Earth boundaries, with subregion auto-framing, hover telemetry, zoom, pan and country highlighting.
- **3D Orthographic Canvas Globe:** Physics-driven rotation, capital coordinates and spatial pinpoints.
- **Comprehensive Country Dossiers:**
  - Executive overview and sovereign badges
  - Multi-currency converter (USD $, BDT ৳ and the sovereign local currency)
  - Macroeconomics and wealth indicators (GDP, GDP per capita PPP, inflation, key export sectors)
  - Demographics and urbanization
  - Cost of living and sample baskets, relative to a NYC benchmark
  - Safety, governance and Global Peace Index
  - Climate and biome profiles
  - Higher education and top universities, with search, discipline filters and official web portals
  - Culture, heritage and UNESCO landmarks
  - Peer-twin discovery
- **Multi-Criteria Discovery Engine:** Cross-filter nations by subregion, safety index, GDP per capita tier, cost of living, population size and higher-education depth.
- **Universal Command Palette (`⌘K` / `Ctrl+K`):** Keyboard navigation across countries, subregions and analytical modules.
- **Side-by-Side Comparison Lab:** A persistent dock for comparing several nations across economics, peace and demographics.
- **Thematic Discovery Lenses:** Curated perspectives on sovereign wealth, ancient civilizations, high-tech hubs and energy corridors.

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework & Language | React 19 + TypeScript (strict mode) |
| Bundler & Tooling | Vite 8, with `base: './'` for GitHub Pages |
| Icons | Lucide React |
| Styling | Vanilla CSS design system — CSS custom properties, glassmorphism, responsive grid |
| Linter | Oxlint |
| Deployment | Fully client-side static single-page app |

---

## Getting Started

```bash
# Clone the repository
git clone https://github.com/ahsanjust/world_explorer.git
cd world_explorer

# Install dependencies
npm install

# Start local development server
npm run dev

# Build for production (type-checks, then bundles)
npm run build

# Run linter
npm run lint

# Preview production build locally
npm run preview
```

### Regenerating data assets

The datasets under `src/data/universities/` and `public/maps/` are generated, and the generators live in `scripts/` so they can be re-run instead of hand-patched:

```bash
# Rebuild the university and landmark datasets from Wikidata (CC0)
node scripts/build-me-facilities.mjs

# Rebuild the simplified country boundaries from Natural Earth
node scripts/build-world-geo.mjs <path/to/ne_50m_admin_0_countries.geojson>
```

Both scripts need network access and a copy of their upstream source; neither runs as part of `npm run build`.

---

## Project Structure

```
src/
├── main.tsx                # Entry point — mounts the root shell
├── App.tsx                 # Hash router and root shell state
├── types/                  # TypeScript data contracts (country, spatial, university, currency, map)
├── data/
│   ├── countries/          # One dossier module per country (all 26)
│   │   └── sovereignDossier.ts  # Shared seed type + builder for the 16 non-flagship dossiers
│   ├── landmarks/          # Generated per-country places worth visiting + lookup by ISO3
│   ├── peers.ts            # Derives economic/climatic peer twins from the dataset
│   ├── universities/       # Generated per-country institution records and their aggregate index
│   ├── map/                # Boundary loading and projection helpers
│   ├── dataset.ts          # Dataset stats and self-validation
│   ├── regions.ts          # Region definitions
│   ├── subregions.ts       # Subregions + Middle East country membership
│   ├── benchmarks.ts       # Regional benchmark values
│   └── thematic.ts         # Curated thematic discovery lenses
├── hooks/
│   └── useLiveCurrency.ts  # Live exchange-rate hook backing the converter
├── services/
│   └── currencyService.ts  # Exchange-rate service with the multi-tier fallback
├── styles/
│   ├── tokens.css          # Design tokens
│   └── base.css            # Base stylesheet
└── components/
    ├── common/             # Reusable UI primitives (breadcrumbs, badges, loaders)
    ├── spatial/            # 2D SVG vector map and subregion portals
    ├── globe/              # 3D canvas orthographic globe
    ├── dossier/            # Country dossier modules (Hero, Economy, Education, …)
    ├── navigation/         # Header top nav and command palette (⌘K)
    ├── filters/            # Multi-criteria discovery modal
    ├── comparison/         # Comparison dock and analytical comparison modal
    └── thematic/           # Thematic discovery lenses

scripts/                    # Data generators (Natural Earth boundaries, Wikidata facilities)
public/maps/                # Simplified GeoJSON boundaries served to the map and globe
```

---

## Deployment

The app deploys to GitHub Pages through the workflow in `.github/workflows/deploy.yml`, which builds and publishes on every push to `main`.
