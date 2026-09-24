# WORLD EXPLORER — MULTI-AGENT DEVELOPMENT ARCHITECTURE & SOURCE OF TRUTH (AGENTS.md)

> **MASTER SYSTEM DOCUMENT**  
> *All development agents (Agent 1: Lead Architect, Agent 2: UI/UX & Visual System, Agent 3: Data & Intelligence, Agent 4: Map & Analytics/QA) must read and comply with this document before making changes.*

---

## 1. Project Vision & Identity

**World Explorer** is a premium, interactive, immersive world-exploration and country-intelligence web application. It is designed to feel like an **"interactive digital atlas meets a sovereign planetary observatory."**

- **Not** a generic SaaS dashboard or plain admin template.
- **Not** an encyclopedia or card-dump clone.
- Hierarchical descent: `World` → `Region` → `Subregion` → `Country Profile (Dossier)`, paired with non-linear discovery (universal search, multi-criteria filtering, interactive 2D map & 3D globe, thematic lenses, peer twin navigation, and analytical comparison).

---

## 2. Technology Stack & Deployment Target

- **Runtime Target**: Static Web (100% Client-side).
- **Deployment**: **GitHub Pages** (`https://<username>.github.io/<repo>/`).
  - Base path configured as `./` in `vite.config.ts`.
  - Hash-based static routing (`#/`, `#/explore/:regionId`, `#/explore/:regionId/:subregionId`, `#/explore/:regionId/:subregionId/:countryId`, `#/country/:countryId`).
  - No custom backend/server; APIs must be CORS-friendly CDN or client-side fetch with verified fallback data.
- **Framework & Libraries**:
  - React 19 + TypeScript (strict mode).
  - Vite 8.
  - Lucide React (clean, semantic vector iconography).
  - Vanilla CSS design system (`src/styles/tokens.css`, `src/styles/base.css`) with CSS custom properties, glassmorphism, responsive grids, and typography tokens.
  - Oxlint for linting.

---

## 3. Directory & File Ownership Matrix

To prevent merge conflicts and unauthorized architectural rewrites:

| Domain | Responsible Agent | Files / Directories | Rules & Protocols |
|---|---|---|---|
| **Architecture & Shell** | **Agent 1** (Lead Architect) | `App.tsx`, `main.tsx`, `index.html`, `vite.config.ts`, `AGENTS.md` | Owns routing, top-level state, dock coordination, build pipeline. |
| **UI/UX & Design System** | **Agent 2** (Visual System) | `src/styles/*`, `src/components/common/*`, `src/components/dossier/*`, `src/components/navigation/*` | Owns typography, color tokens, animations, responsive layouts, accessibility. Must consume data contracts without altering schemas. |
| **Data & Intelligence** | **Agent 3** (Data & Intelligence) | `src/types/*`, `src/data/*`, `src/services/*`, `src/hooks/*` | Owns country profiles, schemas, regional benchmarks, currency service with fallbacks. Zero fabrication policy. |
| **Cartography & Analytics/QA**| **Agent 4** (Map/Analytics/QA) | `src/components/spatial/*`, `src/components/globe/*`, `src/components/comparison/*`, `src/components/thematic/*`, `src/components/filters/*` | Owns 2D vector map, 3D canvas globe, multi-filter engine, comparison lab, QA test suite. |

---

## 4. Coding Conventions & Standards

1. **Strict TypeScript**: No `any` without explicit justification. Use defined interfaces in `src/types/country.ts`, `src/types/spatial.ts`, and `src/types/currency.ts`.
2. **Design System Adherence**: Use CSS variables (`var(--accent-gold)`, `var(--bg-space)`, `var(--font-display)`, `var(--text-sm)`). Avoid inline magic color codes where tokens exist.
3. **Responsive First**: Every view must test cleanly across mobile (360px), tablet (768px), and desktop (1280px+). Use scroll containers, wrapping flexboxes, and clamp() typography.
4. **Accessibility (a11y)**:
   - Proper `aria-label`, `role`, and focus rings (`:focus-visible`).
   - Semantic HTML tags (`<header>`, `<main>`, `<section>`, `<nav>`, `<article>`).
   - Contrast ratio compliant with WCAG AA on dark theme.
   - Reduced motion queries respected (`@media (prefers-reduced-motion: reduce)`).

---

## 5. Absolute Data Quality & Provenance Principles

- **Zero Fabrication**: If a statistic is unavailable, use `null`, `undefined`, or omit the field. Never generate fake numbers.
- **Authoritative Provenance**: World Bank, IMF, UN, UNODC, UNESCO, Numbeo, ECB, or Natural Earth.
- **Explicit Metadata**: Every country profile must include `metadata.citations` with domain, source name, and reference URL.
- **Currency System**:
  - Multi-tier fallback: Memory cache → jsDelivr CDN rates → Frankfurter (ECB) API → localStorage cache → Hardcoded baseline seed rates.
  - Transparent status pill indicating whether rates are live, cached, or fallback.

---

## 6. Implementation Status & Progress Log

### Phase 1: Foundation (Completed)
- [x] Initial Vite + React 19 + TypeScript scaffolding.
- [x] Design token system (`tokens.css`, `base.css`) with celestial dark theme and gold/cyan/emerald accents.
- [x] Hash-based static routing for GitHub Pages compatibility.
- [x] Shared `AGENTS.md` established.

### Phase 2: Spatial Exploration (In Progress / Refined)
- [x] Continental Macro Spheres (`WorldPortal.tsx`) and Subregion Portals (`RegionPortal.tsx`, `SubregionPortal.tsx`).
- [x] Orthographic Canvas 3D Globe (`GlobeCanvas.tsx`) with lat/lng raycasting and rotation physics.
- [x] Interactive 2D Vector World Map (`WorldMap2D.tsx`) with SVG projection, zoom/pan controls, country hovering, and spatial highlights.
- [x] Universal Search Command Palette (`CommandPalette.tsx`) with `Cmd+K` / `Ctrl+K`.

### Phase 3: Country Intelligence (Completed for Launch Set)
- [x] Country dossier modules: Hero, Demographics, Economy, Currency & Converter, Cost of Living, Safety & Governance, Climate & Climograph, Education & QS Universities, Culture & Heritage, Peer Twin Navigator.
- [x] 15 Flagship Country Profiles across all 5 Continental Spheres:
  - **Asia**: Qatar, Japan, Singapore, UAE
  - **Europe**: Switzerland, Norway, Germany, United Kingdom
  - **Americas**: United States, Brazil, Canada
  - **Africa**: Kenya, Egypt, South Africa
  - **Oceania**: Australia

### Phase 4: Filtering & Analytics (In Progress)
- [x] Thematic discovery lenses (`ThematicModal.tsx`).
- [x] Multi-country persistent comparison dock (`ComparisonDock.tsx`) and lab modal (`ComparisonModal.tsx`).
- [x] Multi-criteria filtering engine (`MultiFilterExplorer.tsx`) combining Region, Safety, GDP per capita, Population, and Climate.

---

## 7. Known Decisions & Limitations

- **Map Technology**: A lightweight, self-contained SVG 2D vector map is prioritized over heavy multi-megabyte tiles for instant GitHub Pages load times without API tokens or mapbox keys.
- **Routing**: Must strictly adhere to URL hash navigation (`window.location.hash`) because standard HTML5 pushState triggers 404s on GitHub Pages without custom 404 redirect hacks.
- **Multi-Agent Protocol**: Before modifying any shared component, inspect existing code and verify build with `npm run build`. Update this document when new features or datasets are integrated.
