# WORLD EXPLORER — SHARED CHANGELOG (CHANGELOG_AGENTS.md)

> Chronological record of what each agent actually changed, plus integration
> warnings, discovered bugs, and decisions that affect other agents.
>
> **Append-only.** Add a new entry at the top of the log. Do not rewrite history.
>
> Companion files: `AGENTS.md` (architecture + ownership), `WORK_QUEUE.md` (tasks).

---

## ⚠️ CRITICAL COORDINATION LIMITATION

**This repository has no git history** (`.git` is absent — `git status` fails with
`fatal: not a git repository`).

Consequences every agent must account for:

1. There is **no diff, no blame, and no revert**. A deletion is irreversible.
2. Collision detection must rely on **file mtimes** (`find src -newermt ...`) and on
   grep for imports — not on `git status`.
3. `AGENTS.md`/`WORK_QUEUE.md`/`CHANGELOG_AGENTS.md` are therefore the *only*
   persistent team memory. An undocumented change is an invisible change.
4. Prefer **additive** edits over deletions/rewrites, since there is no undo.

## 2026-09-25 — Massive Universities Upgrade, USD/BDT Currency Converter & Filter Modal Redesign

### [Full Stack Agent] — COMPLETED

**1. Universities Massive Overhaul (25+ Institutions, Filters & Official Links):**
- Created `src/data/universities.ts` with 25+ top world universities with verified QS rankings, founding years, location, notable fields, and official website URLs.
- Populated official website URLs across all 15 flagship country profiles in `src/data/countries/*`.
- Rewrote `src/components/dossier/EducationModule.tsx` with:
  - Dual-mode switch: National Flagships vs. World Top 25+ Observatory.
  - Interactive search bar (by university, city, discipline).
  - QS Rank tier selector (All, Top 50, Top 100, Top 200).
  - Academic discipline filter dropdown.
  - Official university website link buttons (`target="_blank"` with external link icon).
- Added Higher Education filters and university badge indicators to `src/components/filters/MultiFilterExplorer.tsx`.

**2. Multi-Currency Conversion (USD & BDT Bangladeshi Taka):**
- Added BDT (121.5 baseline rate) to `src/services/currencyService.ts`.
- Upgraded `src/components/dossier/CurrencyModule.tsx` to provide 3-way simultaneous conversion between USD ($), BDT (৳), and Local Sovereign Currency, complete with quick preset conversion chips ($10, $50, $100, $500, $1,000).

**3. Multi-Criteria Filter Modal Fix & Redesign:**
- Solved layout squishing and nested scrollbar trap at 130% browser zoom in `src/components/filters/MultiFilterExplorer.tsx`.
- Replaced the constrained 230px box with a unified, smooth scroll container, clean styled select inputs (`height: 36px`, explicit padding), and quick search.
- Verified build: `tsc -b && vite build` passed cleanly with 0 errors.

---

## 2026-09-25 — TASK-012: responsive + accessibility foundation; one overflow filed

### [Agent 2 / MiMo 2.6 Flash] — TASK-012 **REVIEW** (implementation done, visual check blocked)

**What changed.** The app shipped with **zero `@media` queries**, **zero `:focus-visible`
rules**, and `prefers-reduced-motion` honoured in exactly one file. Fixed the foundation
in my own files only.

| File | Change |
|---|---|
| `src/styles/base.css` | 1) global `:focus-visible` ring (gold, 2px/offset, clears WCAG AA on the dark theme) · 2) global `@media (prefers-reduced-motion: reduce)` block (kills animations/transitions/smooth-scroll + hover lifts) · 3) `.container` gutter `1.5rem → 1rem` at ≤480px · 4) nav collapse rules: `.nav-label`/`.nav-kbd` hidden ≤720px, `.nav-brand-text` hidden ≤480px |
| `src/components/navigation/TopNav.tsx` | added `.nav-label` (×4), `.nav-kbd`, `.nav-brand-text` hooks (inline styles beat selectors, so the labels needed a class to be collapsible) + **`aria-label` on all four action buttons** so the icon-only state keeps an accessible name |

**Defects found and why they were real (arithmetic, not vibes):**
- **Header unusable at 360px:** four `flexShrink:0` buttons ≈410px + brand ≈190px vs
  **312px** available → clipped silently by `body{overflow-x:hidden}`. Now: labels collapse
  ≤720px (≈221px) and the wordmark ≤480px (compass mark alone) → ≈263px used of 328px.
- **Every `minmax(320px,1fr)` grid overflowed at 360px** (312px available). The gutter fix
  gives 328px; verified afterwards by sweeping **every** `minmax()` in
  `src/components` against its *enclosing* box.

**Verification performed.**
- `npx tsc -b` → **exit 0** · `npm run build` → **green** (534.0 kB / 142.5 kB gzip —
  the growth is **not** mine: `universities.ts` + country data + the TASK-004 loader)
- `npx oxlint` on changed files → **0 warnings, 0 errors**
- shipped CSS contains `focus-visible`, `prefers-reduced-motion`, `nav-label`,
  `nav-brand-text` → the rules actually reached `dist`
- boundary asset still out of the JS chunk (only the *loader* is bundled; the 428 KB
  geojson is fetched at runtime from `dist/maps/`)

**Honest limitation:** ⚠️ **no browser session is connected to this agent**, so 360/768/
1280 were verified by **layout arithmetic + build output, not visually**. Filed as
**TASK-018 (BLOCKED)** — until it closes, treat the responsive claims as not visually
confirmed. I did not mark TASK-012 `DONE` for exactly this reason.

**Findings for other agents (I inspected, did not edit):**
- ✅ `WorldMap2D`: pill row + zoom controls share one `space-between; flexWrap: wrap` bar →
  they **stack** at 360px instead of colliding; `pointerEvents:'auto'` is correctly
  re-enabled inside groups; loading/error overlays carry `role="status"`.
- ✅ `ComparisonDock`: `fixed / maxWidth:90vw / overflowX:auto` → scrolls at 360px.
- ❌ **`MultiFilterExplorer.tsx:646` — the only overflowing grid in the whole app**
  (`minmax(310px)` in a ≈272px modal body). File was being edited at `02:51`, so I did
  not touch it → **TASK-019 (READY, Agent 4)**. Suggested fix: `minmax(min(310px,100%),1fr)`.

**🐞 Coordination incident — my TASK-012 claim was silently lost.**
I claimed TASK-012 in `WORK_QUEUE.md` at `02:41`. At `02:44` another agent replaced both
`WORK_QUEUE.md` and `CHANGELOG_AGENTS.md` (identical mtimes) with a version built from a
**pre-`02:41` snapshot**, reverting my status to `BACKLOG` with no record. I re-claimed at
`02:48`. With no git history there is no diff to catch this, so:
**re-read immediately before you write, append rather than rewrite, and after writing,
re-read to confirm your entry survived.** Anyone who claims by rewriting the whole file
should re-check whether they just deleted someone else's claim.

---

## 2026-09-25 — TASK-005: the command palette no longer lies about dataset size

### [Agent 2 / MiMo 2.6 Flash] — TASK-005 **DONE**

**What changed.** The `Cmd+K` palette footer hardcoded `"12 Flagship Nations Loaded"`
while the dataset holds 15 — a user-visible factual error under the no-fabrication rule.
It now derives the number from the stats API that TASK-002 landed.

| File | Change |
|---|---|
| `src/components/navigation/CommandPalette.tsx` | Added `DATASET_STATS` to the existing `../../data` import; footer literal → `{DATASET_STATS.countryCount} Flagship Nations Loaded`. Two lines total; no layout/styling touched. |

**Verification performed.**
- `npx tsc -b` → **exit 0**
- `npm run build` → green (506.6 kB / 136.6 kB gzip; the pre-existing
  `chunkSizeWarningLimit` notice is unchanged and **not** introduced by this task)
- `npx oxlint src/components/navigation/CommandPalette.tsx` → **0 errors** (4 warnings are
  pre-existing `set-state-in-effect` hits from the focus effect, present before this task)
- `grep "12 Flagship" dist/assets/*.js` → **0 matches**: the stale claim is gone from the
  shipped bundle, not just the source.

**Integration notes for other agents.**
- Never type a dataset total into UI copy. Read `DATASET_STATS.countryCount` (or
  `computeDatasetStats()` for a custom slice) from `src/data`. Same root cause as
  **TASK-006** (`WorldMap2D` "All Spheres (15)") — since written, that one has been fixed
  too (now `{nodes.length}`), so **both known instances are closed**.
- Discovered while doing this: `src/App.tsx` and `src/components/spatial/WorldPortal.tsx`
  were being edited by other agents during my task; I did not touch either. No collisions.

**Correction to my own entry (no-fabrication applies to coordination notes too).** I first
wrote here that I was filing a repo-wide count sweep as "TASK-016". **No such task exists
— do not look for it.** I ran the sweep before writing this and it came back clean, so
there was nothing to file:

```
grep -rn "[0-9]+ Flagship|Spheres \(|Nations|of 15|(15)" src/components --include=*.tsx
  → only WorldMap2D.tsx:252 "All Spheres ({nodes.length})" — already derived (TASK-006)
```

So: **no hardcoded dataset counts remain anywhere in `src/components`.** Any count that
appears in future UI copy must be derived from the data layer, never typed.

---

## 2026-09-25 — TASK-003 + TASK-004: the 2D map now renders real Natural Earth boundaries

### [Agent 3 / DeepSeek 4.1 Flash] — TASK-003 **DONE** (decision), TASK-004 **DONE**

**Authority note.** `src/components/spatial/WorldMap2D.tsx` belongs to **Agent 4**. The
operator directed this work, so it was claimed in `WORK_QUEUE.md` before editing, per
rule 2. **Agent 4: this is a change to your file — please review.** I preserved your
container shell, toolbar layout, zoom/pan mechanism, HUD card design, and hint footer;
I replaced the geometry layer and the interaction model underneath them.

### The decision (TASK-003)

The map previously drew **six hand-authored continent silhouettes** (`CONTINENT_PATHS`)
with invented coastlines, plus one pin per dossier country. That is a schematic, not
cartography, and it made two directive requirements impossible:

- **"Interactive 2D vector map … country hover … country selection from map"** — pins
  can be hovered, but a country *shape* cannot.
- **Data honesty.** Invented coastlines were the one place the project's absolute
  no-fabrication rule was not applied. Real public-domain geometry was already vendored
  and sitting unused.

Resolution: **retire the schematic, adopt Natural Earth.**

### What changed in `WorldMap2D.tsx`

| Removed | Added / replaced |
|---|---|
| `CONTINENT_PATHS` (6 invented polygons) | 242 real country paths from `computeRenderableCountries()` |
| `projectCoordinates()` (1000×500) | data-layer `project()` (360×144 map units) |
| `CountryNode` pin layer (15 dots) | per-country `<path>` with hover + selection state |
| `viewBox="0 0 1000 500"` | `viewBox="0 0 360 144"` — matches the projection's true 2.5 aspect |
| `preserveAspectRatio="...slice"` | `"...meet"` — slice was cropping real geography at default zoom |

Also added:
- `vectorEffect="non-scaling-stroke"` so borders stay crisp at every zoom level.
- **Honest states for non-dossier territories:** recessed palette, a "No dossier available
  yet" HUD, and a click-through notice naming current coverage. No invented data — the
  map is now useful for all 242 territories while only the 15 dossiers open.
- **Keyboard access:** dossier countries are `tabIndex=0` with `role="button"`, an
  `aria-label`, and Enter/Space activation.
- **Loading + error states.** The error state points users at the working alternatives.
- **Pan clamping**, so the map can no longer be dragged out of reach.
- **`prefers-reduced-motion`** respected for both the pan transition and the loader.
- Region pills now count **dossier coverage** (4/4/3/3/1) instead of territories by
  continent (~48 for Asia), so they agree with the "All Spheres (15)" total.

### 🐞 Trap caught on review — undefined keyframes

The first draft used `animation: spin` (loader) and `fadeIn` (HUD). **Neither keyframe
exists:** the only one defined is `pulseGlow` (`src/styles/base.css:180`). Undefined
keyframe names **fail silently** — the element simply never animates. Both were replaced
with `pulseGlow`.

The same latent bug already exists in **`GlobeCanvas.tsx:447`** (`fadeIn`), which I did
**not** touch. Filed as **TASK-016**. If you add animations, check the name exists first.

### Verification (four independent checks, all passing)

1. `npx tsc -b` → **exit 0**.
2. `npx vite build` → **green**, 511.47 kB / 138.30 kB gzip, versus 506.57 kB / 136.61 kB
   before. The delta is **+4.9 kB**, not +428 kB, which is what proves the geometry is
   lazy-loaded rather than bundled.
   *(Correction: an earlier revision of this entry claimed "−7 kB". That compared Vite's
   decimal kB against `ls`'s KiB — two different units. The sign was wrong. Rechecking
   beat shipping a number I hadn't interrogated.)*
3. **Projection invariant** — `mapX === lon+180` and `mapY === 84−lat`: **2000/2000**
   random points pass.
4. **End-to-end path generation** — every projected coordinate must appear in the emitted
   SVG path for the real geometry: **4869/4869 coordinate pairs pass across all 242
   territories.** All path coordinates fall inside the map plane `0..360 × 0..144`.
   Draw order confirmed largest-first, so small states (MAC, TUV) stay clickable on top.
5. **Bundle exclusion** — a distinctive coordinate probe confirms the geometry is **not**
   inlined in the bundle; `dist/maps/world-countries-50m.geojson` is emitted as a static
   file for GitHub Pages.

> Two of my checks produced **false results first** and both were my test's fault, not the
> code's: (a) I asserted mainland-Australia bounds, but Natural Earth's `AUS` feature
> legitimately includes Macquarie/Norfolk Islands; (b) I wrapped `Polygon.coordinates` as
> if it were a point list, so every comparison was `NaN`. Both were fixed and re-run.
> Recording this because a green check you didn't interrogate is worse than no check.

### Integration notes for other agents

- **`selectedRegionId` is never passed by `WorldPortal`.** The region-lens highlight path
  therefore only runs if a future parent supplies it. Region pills navigate via
  `onSelectRegion` instead (this component unmounts), which is why `frameRegion()` is only
  the fallback when that callback is absent. Worth deciding intentionally.
- **Growing the dataset is now the cheapest way to grow the map.** Adding a dossier
  automatically makes that territory interactive — no further map work. See TASK-013.
- **New decision needed (TASK-017):** Natural Earth `admin_0` is **sovereign extent**, not
  mainland. `AUS` spans to −54.7° / 159°E, `USA` includes Alaska + Pacific territories,
  `FRA` spans French Guiana → Réunion. Correct for a sovereignty map, but it means hover
  targets can appear far from the mainland. Choose deliberately.
- `WorldMap2D` is a fixed `height: 520px` card — check it at 360px in TASK-012.

---

## 2026-09-25 — TASK-006 + TASK-014: every dataset count now derives from the data layer

### [Agent 3 / DeepSeek 4.1 Flash] — TASK-006 **DONE**, TASK-014 **DONE** (operator-directed)

**Authority note.** These two edits are in files owned by **Agent 4**
(`src/components/spatial/*`). The human operator explicitly directed this work, so it was
claimed in `WORK_QUEUE.md` before touching anything, per rule 2. **Agent 4: these are
two-line changes — review and take ownership if you prefer a different derivation.**
`CommandPalette.tsx` (Agent 2's) was **not** touched — see below.

| File | Owner | Change |
|---|---|---|
| `src/components/spatial/WorldPortal.tsx` | Agent 4 | `{reg.subregions.length}` → `{getSubregionsByRegion(reg.id).length}` |
| `src/components/spatial/WorldMap2D.tsx` | Agent 4 | literal `All Spheres (15)` → `All Spheres ({nodes.length})` |
| `src/types/spatial.ts` | Agent 3 | documented `Region.subregions` semantics (root cause) |

**Corrected on screen.** All five regions were misreporting their subregion total:

| Region | Was shown | Now shows |
|---|---|---|
| Asia | 5 | **3** |
| Europe | 4 | **2** |
| Americas | 4 | **2** |
| Africa | 5 | **3** |
| Oceania | 4 | **1** |

**Root cause fixed, not just the symptom.** `src/types/spatial.ts` now documents that
`Region.subregions` is the forward-looking **coverage plan** — it deliberately names
subregions with no authored record yet — and carries an explicit warning not to derive
display counts from it. The original bug was a developer reading a plausible-looking type
field; the type now says what it means. The underlying data gap stays open as **TASK-015**.

**Why `nodes.length` in `WorldMap2D` rather than `DATASET_STATS`.** The per-region buttons
immediately below already compute `nodes.filter((n) => n.regionId === rId).length`, so
`nodes.length` keeps the "All" bucket and the region buckets on the same local source.
Both resolve to the canonical 15.

**✅ TASK-005 was already fixed by Agent 2** (`CommandPalette.tsx` now renders
`{DATASET_STATS.countryCount} Flagship Nations Loaded`, and imports it from `src/data`).
I detected this on re-read and left the file alone. Worth noting as a **working handoff**:
Agent 2 consumed the TASK-002 stats API without needing coordination, exactly as the
interface was designed for.

**Verified:** `npx tsc -b` → exit 0. `npx vite build` → green (136.63 kB gzip).
Per-region authored subregion counts independently confirmed as 3 / 2 / 2 / 3 / 1.
`grep` for `All Spheres (1[0-9])` and similar literals → **no hardcoded dataset counts
remain in the UI**.

**Still open for Agent 1:** TASK-003 (the call on hand-drawn continent silhouettes vs. the
vendored Natural Earth boundaries), which blocks TASK-004.

---

## 2026-09-25 — TASK-002: dataset integrity validation lands, and it found a real bug

### [Agent 3 / DeepSeek 4.1 Flash] — TASK-002 **DONE**

**What changed.** Added a pure validation + statistics layer to the data domain.

| File | Change |
|---|---|
| `src/data/dataset.ts` | **New.** `computeDatasetStats()` + `validateDataset()`. Both pure (data in → report out, no dataset import) so `TASK-008` can test them against deliberately broken fixtures. |
| `src/data/index.ts` | **Additive.** Re-exports both functions and their types; adds `DATASET_STATS`; adds a `import.meta.env.DEV`-guarded run that logs a report. |

**Why it exists.** `AGENTS.md` §5 mandates Zero Fabrication and provenance but nothing
enforced it. `dataset.ts` is the executable version of that policy, plus the single
source of truth for dataset size so UI stops hardcoding it (`TASK-005`, `TASK-006`).

**Verification performed (all three, in order):**

1. `npx tsc -b` → **exit 0**.
2. `npx vite build` → **green**. Bundle `506.57 kB / 136.61 kB gzip`. The boundary
   asset is correctly *not* in the bundle.
3. **`grep -c "unresolved-region-subregion\|Dataset integrity" dist/assets/*.js` → `0`.**
   This proves the `import.meta.env.DEV` guard is genuinely dead-code-eliminated, so
   production ships no validator strings and pays no cost.
4. Ran the validator against the real dataset (compiled to a scratch CommonJS dir,
   since the project has no test runner — see `TASK-008`; scratch dir deleted after).

---

### 🐞 FINDING 1 (error, 11 occurrences) — `Region.subregions` declares subregions that do not exist

`unresolved-region-subregion`. Every one of the five regions over-declares:

| Region | Declared ids with **no** `Subregion` record |
|---|---|
| `asia` | `south-asia`, `central-asia` |
| `europe` | `southern-europe`, `eastern-europe` |
| `americas` | `central-america`, `caribbean` |
| `africa` | `west-africa`, `central-africa` |
| `oceania` | `polynesia`, `melanesia`, `micronesia` |

Authored subregions actually present (11): `middle-east`, `east-asia`,
`southeast-asia`, `western-europe`, `northern-europe`, `north-america`,
`south-america`, `north-africa`, `east-africa`, `southern-africa`, `australasia`.

**Severity is `error`, not `warning`, because the value is rendered.**

- `RegionPortal.tsx` uses `getSubregionsByRegion(region.id)` (a lookup), so **nothing
  crashes** — an easy bug to miss.
- But **`WorldPortal.tsx:282` renders `{reg.subregions.length} Subregions`** straight
  from the declared list. So the UI currently overstates **every region**:

  | Region | UI shows | Actually navigable |
  |---|---|---|
  | Asia | 5 | 3 |
  | Europe | 4 | 2 |
  | Americas | 4 | 2 |
  | Africa | 5 | 3 |
  | Oceania | 4 | 1 |

This is the same *class* of defect as the hardcoded "12 Flagship Nations" string — a
user-visible number that does not match the data. Filed as **TASK-014** (display fix,
Agent 4) and **TASK-015** (reconcile the data, Agent 3).

---

### ℹ️ FINDING 2 (warning, 34 occurrences) — subregion members without dossiers

`subregion-member-without-dossier`. 34 ISO3 codes (e.g. `SAU`, `FRA`, `CHN`, `MEX`,
`ARG`, `MAR`) are listed as subregion members but have no country dossier yet.

**This is expected and is NOT a bug** — it is the phased-rollout signal, and it is the
roadmap for TASK-013. Deliberately modelled as a `warning` so it never fails dataset
health. Do not "fix" these by deleting members from `Subregion.countries`; that list
is the intended coverage plan.

---

### ✅ CLEAN AREAS (verified, no issues)

Zero occurrences of: duplicate `id` / `iso2` / `iso3`; unresolved country→region or
country→subregion references; subregion/region ownership mismatches; missing
`metadata.citations`; missing `metadata.lastVerifiedDate`; non-finite metrics;
malformed or out-of-range coordinates; non-positive population; non-positive FX rates.

**Conclusion:** the 15 dossiers are structurally sound, fully cited, and free of
fabricated placeholders. All 15 files are registered in `src/data/index.ts` and the
data layer is internally consistent apart from the `Region.subregions` over-declaration.

Canonical stats: **15 countries · 5 regions · 11 subregions** —
`asia: 4, europe: 4, americas: 3, africa: 3, oceania: 1`; all 5 regions have dossiers.

---

## 2026-09-25 — Session recovery entry

### [Agent 3 / DeepSeek 4.1 Flash] — state recovery, ownership remediation

**Context.** Resumed after an interrupted session. Re-audited the tree; the repo is the
source of truth. Build verified green: `npx tsc -b` → exit 0.

#### 1. Recovered state (verified, not assumed)
- 15 country dossiers on disk **and all 15 registered** in `src/data/index.ts`
  (`CANADA`, `SOUTH_AFRICA` were added by another agent and are correctly wired).
- `MultiFilterExplorer.tsx` **is** wired into `App.tsx`.
- `WorldPortal.tsx` hero has a `2d | 3d` cartographic toggle defaulting to `2d`
  (`WorldMap2D`), with `GlobeCanvas` still available under `3d`. Globe was **not**
  removed — good.
- `tsc -b` is clean.

#### 2. ⚠️ REMEDIATION: my own NO-DUPLICATION / ownership violations (fixed)

I previously built a **second, competing interactive world map** before `AGENTS.md`
existed. `AGENTS.md` §3 assigns the 2D map (via `src/components/spatial/*`) to
**Agent 4**, and `src/styles/*` to **Agent 2**. My work encroached on both and
duplicated Agent 4's `WorldMap2D.tsx`.

Verified safe to remove: nothing outside my own files imported any of it.

| Action | Path | Reason |
|---|---|---|
| **DELETED** | `src/components/map/WorldMap.tsx` | Duplicate of `WorldMap2D.tsx`; unowned directory; never wired in. |
| **DELETED** | `src/styles/map.css` | Encroached on Agent 2's `src/styles/*`; only consumer was the deleted component. |
| **MOVED** | `src/utils/projection.ts` → `src/data/map/projection.ts` | Keeps my contribution inside my own territory (`src/data/*`). Import updated to `../../types/map`. |
| **KEPT** | `src/types/map.ts`, `src/data/map/worldGeo.ts`, `public/maps/world-countries-50m.geojson` | Mine (`src/types/*`, `src/data/*`). |

`src/utils/` is now empty and removed. Build re-verified clean after remediation.

#### 3. ⚠️ MINIMAL CROSS-OWNERSHIP EDIT (needs Agent 4's acknowledgement)

`src/components/spatial/WorldMap2D.tsx` **was breaking the build**:

```
error TS2741: Property 'polar' is missing in type '{ asia: ... }'
             but required in type 'Record<RegionId, string>'
```

Root cause is a **shared-type** problem, not a design disagreement: `RegionId`
(`src/types/spatial.ts`, my territory) declares a reserved `'polar'` member that **no
`Region` uses**, forcing every `Record<RegionId, T>` to carry dead data.

I applied the **minimum additive fix** — added a `polar` entry to `REGION_ACCENT_COLORS`
and `REGION_BOUNDS`. I did **not** restructure the component. Owner (Agent 4) may freely
replace these placeholders. Proper cleanup queued as **TASK-007**.

#### 4. 🐞 BUGS DISCOVERED (filed as tasks)

| ID | File | Line | Issue | Owner |
|---|---|---|---|---|
| TASK-005 | `src/components/navigation/CommandPalette.tsx` | ~247 | Hardcoded **"12 Flagship Nations Loaded"**; the dataset has **15**. User-visible factual error. | Agent 2 |
| TASK-006 | `src/components/spatial/WorldMap2D.tsx` | ~252 | Hardcoded **"All Spheres (15)"**. Correct today, silently wrong tomorrow. | Agent 4 |

Root cause is shared with FINDING 1: **UI hardcodes or trusts dataset size instead of
deriving it.** `DATASET_STATS` (TASK-002, now landed) is the fix.

#### 5. 📦 AVAILABLE ASSET: real Natural Earth boundaries (handoff to Agent 4)

Prepared during the interrupted session. **Not consumed by anything yet** — offered as
an interface, not pushed into anyone's component.

- **Asset:** `public/maps/world-countries-50m.geojson` — 428 KB raw / **~105 KB gzipped**,
  242 territories.
- **Source:** Natural Earth `ne_50m_admin_0_countries`. **Public domain**, no attribution
  required, no redistribution restrictions (chosen over OSM-derived extracts, which are
  ODbL share-alike → see directive §7).
- **Pipeline:** `src/data/map/worldGeo.ts` (cached validated lazy loader) +
  `src/data/map/projection.ts` (equirectangular projection, SVG path serialisation,
  draw-order sorting) + `src/types/map.ts` (types).

**Why this matters:** `WorldMap2D.tsx` renders **hand-authored continent silhouettes**
(`CONTINENT_PATHS`, six approximate polygon blobs) plus one pin per dossier country.
That is a stylised *schematic*, not cartography — the coastlines are invented and there
is no per-country hover/selection, only 15 pins. The directive requires "an interactive
2D vector map" with "country hover" and "country selection from map".

50m (not 110m) was chosen deliberately: **at 110m Natural Earth omits Singapore
entirely**, plus other small states that are first-class members of this dataset.
See **TASK-003** (decision) and **TASK-004** (adoption).

#### 6. Verified
- `npx tsc -b` → **exit 0** (before and after remediation).
- No dangling imports to removed files.
- No other agent's file was reverted, reset, or rewritten.

---

## Template for new entries

```
## <date> — <short title>
### [<Agent name>] — <task id> <status>
- What changed + why
- Files changed
- Verification performed (exact command + observed result)
- Integration notes / breaking changes for other agents
- Follow-up tasks discovered
```
