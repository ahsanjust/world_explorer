# WORLD EXPLORER — WORK QUEUE (WORK_QUEUE.md)

> Shared task memory for all agents. **The repository is the source of truth.**
> Read this file before starting anything; update it before starting anything else.
>
> Companion files: `AGENTS.md` (architecture + ownership), `CHANGELOG_AGENTS.md` (history).

## Rules of engagement (restated, binding)

1. **One task at a time.** Finish → verify → document → *then* pick the next.
2. **Claim before you touch.** A task is claimed only when this file records its ID,
   agent, `IN_PROGRESS` status, and files.
3. **Never edit a file owned by another agent** without an explicit task that says so.
   If blocked, mark `BLOCKED` — do not "just fix it quietly".
4. **No duplication.** Search before building (`CHANGELOG_AGENTS.md` §"no git" explains
   how, given there is no history to diff against).
5. **Keep it buildable.** `npx tsc -b` must stay at exit 0. If it is already red,
   document the exact blocker rather than "fixing" someone else's half-finished work.

### Status vocabulary
`BACKLOG` · `READY` · `CLAIMED` · `IN_PROGRESS` · `BLOCKED` · `REVIEW` · `DONE`

### Agent identities
| Shorthand | Role per `AGENTS.md` §3 | Owns |
|---|---|---|
| **Agent 1** (Gemini 3.8 Flash) | Lead Architect / Integration | `App.tsx`, `main.tsx`, `index.html`, `vite.config.ts`, `AGENTS.md` |
| **Agent 2** (MiMo 2.6 Flash) | UI/UX & Visual System | `src/styles/*`, `src/components/common/*`, `src/components/dossier/*`, `src/components/navigation/*` |
| **Agent 3** (DeepSeek 4.1 Flash) | Data & Intelligence / QA | `src/types/*`, `src/data/*`, `src/services/*`, `src/hooks/*` |
| **Agent 4** | Map / Analytics / QA | `src/components/spatial/*`, `src/components/globe/*`, `src/components/comparison/*`, `src/components/thematic/*`, `src/components/filters/*` |

**Current build state:** `npx tsc -b` → exit 0. `npx vite build` → green (511.47 kB / 138.30 kB gzip).

---

## READY

### TASK-007 — Resolve the vestigial `'polar'` member of `RegionId`
- **Status:** READY
- **Agent:** Agent 3
- **Files:** `src/types/spatial.ts`, `src/data/benchmarks.ts`,
  `src/components/spatial/WorldMap2D.tsx` (coordinate with Agent 4)
- **Problem:** `RegionId` declares `'polar'`, but no `Region` provides it. Every
  `Record<RegionId, T>` is forced to carry dead entries — this is what broke the build,
  and both `WorldMap2D` and `types/map.ts` now hold placeholder `polar` values that are
  unreachable. **TASK-004 added two more such placeholders** (`REGION_ZOOM`), so the cost
  of leaving this is growing.
- **Options:** (a) remove `'polar'` and `REGIONAL_BENCHMARKS.polar`, or (b) keep it and
  add a real `polar` `Region`. Recommend (a) unless an Antarctic region is planned.

### TASK-015 — Reconcile `Region.subregions` with authored `SUBREGIONS`
- **Status:** READY — **found by TASK-002** (display half fixed in TASK-014)
- **Agent:** Agent 3
- **Files:** `src/data/regions.ts`, `src/data/subregions.ts`
- **Issue:** 11 declared subregion ids have no `Subregion` record —
  `south-asia`, `central-asia`, `southern-europe`, `eastern-europe`, `central-america`,
  `caribbean`, `west-africa`, `central-africa`, `polynesia`, `melanesia`, `micronesia`.
- **Options:** (a) author the 11 missing records with real geography, or (b) trim
  `Region.subregions` to the 11 authored ids. **Recommend (a)** — these are real divisions
  and the list is the navigation plan — but authoring needs genuine coordinates/bounds,
  so do not rush it and never invent values.
- **Note:** TASK-014 stopped the UI from misreporting this. The data gap remains, which
  is why `validateDataset()` still reports 11 errors.

### TASK-010 — Currency provenance & staleness audit
- **Status:** READY
- **Agent:** Agent 3
- **Files:** `src/services/currencyService.ts`, `src/hooks/useLiveCurrency.ts`,
  `src/components/dossier/CurrencyModule.tsx` (Agent 2 — coordinate, do not edit)
- **Scope:** verify the 4-tier fallback surfaces honest labelling and that no stale rate
  is ever presented as authoritative. The baseline seed is dated `2026-09-24`; confirm
  every UI path showing it visibly marks it as a fallback (directive §8).

### TASK-016 — `GlobeCanvas` references an undefined animation keyframe
- **Status:** READY — **found during TASK-004**
- **Agent:** Agent 4
- **Files:** `src/components/globe/GlobeCanvas.tsx` (line ~447)
- **Issue:** `animation: 'fadeIn 0.2s ease-out'` — **`@keyframes fadeIn` does not exist.**
  The only keyframe the design system defines is `pulseGlow` (`src/styles/base.css:180`).
  Undefined keyframe names fail silently: the element simply never animates, so this is
  invisible in review but is dead code.
- **Fix:** use `pulseGlow`, or ask Agent 2 to add `fadeIn` to `src/styles/base.css`
  (Agent 2 owns that file — do not add it yourself).
- **Related:** TASK-004 hit the same trap and worked around it the same way.

### TASK-017 — Decide overseas-territory extents on the map
- **Status:** READY (low priority) — **found during TASK-004**
- **Agent:** Agent 1 (decision) / Agent 4 (implementation)
- **Files:** `src/components/spatial/WorldMap2D.tsx`
- **Context:** Natural Earth `admin_0` features are **sovereign extents**, not mainland
  shapes. Verified examples: `AUS` spans to lat −54.7° and lon 159°E (Macquarie +
  Norfolk Islands), `USA` includes Alaska/Hawaii/Pacific territories, `FRA` spans French
  Guiana → Réunion, `NLD` includes Caribbean islands.
- **Why it matters:** it is *correct* for a sovereignty map, but it means a country's
  clickable silhouette is much larger than its mainland, and hover targets can appear in
  unexpected places (e.g. hovering the Indian Ocean can select Australia).
- **Decision:** keep sovereign extent (current) or filter to mainland only. Either is
  defensible; it must be a choice, not an accident.

### TASK-019 — Filter modal results grid overflows at 360px
- **Status:** READY — **found by TASK-012** (Agent 2 inspected read-only, did not edit)
- **Agent:** Agent 4 (file was being actively edited at `02:51`, so no cross-edit)
- **Files:** `src/components/filters/MultiFilterExplorer.tsx` (~line 646)
- **Issue:** results grid uses `repeat(auto-fill, minmax(310px, 1fr))` inside a modal
  body padded `1.25rem 1.75rem` within an outer `1rem` shell → ≈**272px** available at a
  360px viewport, so the 310px track overflows by ~38px and is clipped. This is the **only**
  overflowing grid found in a sweep of every `minmax()` in `src/components`.
- **Fix:** `minmax(min(310px, 100%), 1fr)` (never overflows at any width), or reduce the
  modal's horizontal padding at ≤480px. First option is width-proof.
- **Context:** Agent 2's `.container` gutter fix does **not** apply — the modal body
  carries its own inline padding.

---

## BACKLOG

### TASK-008 — Establish a test runner + first smoke tests
- **Status:** BACKLOG
- **Agent:** Agent 4 (QA per `AGENTS.md`)
- **Blocker:** `package.json` has no test script and the project has **zero test files**.
  Adding a runner is a dependency decision → needs Agent 1 sign-off.
- **Ready-made targets:** `validateDataset()` (pure, dependency-free) and
  `computeRenderableCountries()` / `geometryToPath()` — TASK-004 verified the latter with
  a throwaway script that asserted the projection invariant across all 242 territories;
  that script is the obvious first thing to make permanent.
- **Workaround used meanwhile:** compile the target to a scratch CommonJS dir with
  `tsc --ignoreConfig ... --module commonjs --moduleResolution node10 --ignoreDeprecations 6.0`
  plus a `{"type":"commonjs"}` marker file, then run under Node. Repeatable until a
  runner exists.

### TASK-011 — Accessibility pass: map keyboard access + focus visibility
- **Status:** BACKLOG
- **Agent:** Agent 1 (shared components) + Agent 2 (visual)
- **Scope:** `prefers-reduced-motion` honoured in all animated views (TASK-004 did this
  for the 2D map), visible focus rings, focus order through map/dock/modals,
  screen-reader names for map affordances.

### TASK-012 — Phase 5 responsive & performance pass
- **Status:** REVIEW — implementation complete + statically verified by
  **Agent 2 (MiMo 2.6 Flash)**; visual confirmation pending → **TASK-018**
  - ⚠️ **Claim lost once already:** I claimed this at `02:41`; a full-file rewrite of
    `WORK_QUEUE.md` at `02:44` was built from a pre-`02:41` snapshot and reverted it to
    `BACKLOG`. Re-claimed `02:48`. **Please append to this file rather than rewriting it
    from an older copy** — see `CHANGELOG_AGENTS.md` "claim loss" incident.
- **Agent:** Agent 2
- **Files (mine):**
  - `src/styles/base.css` — ✅ done: global `:focus-visible` ring, global
    `prefers-reduced-motion` block, `.container` gutter fix at ≤480px, nav collapse rules
  - `src/components/navigation/TopNav.tsx` — ✅ done: `.nav-label` / `.nav-kbd` /
    `.nav-brand-text` hooks + `aria-label` on all four action buttons (icon-only state
    keeps its accessible name)
- **Read-only inspection (no edits):** other agents' files — any finding becomes a new
  task, not a quiet fix.
- **Scope:** verify 360 / 768 / 1280 breakpoints; confirm dossier modules and the
  comparison dock lay out intentionally on mobile rather than being shrunk desktop.
  Confirm the boundary asset stays out of the initial bundle.
- **Specific to TASK-004:** `WorldMap2D` is a fixed `height: 520px` card. Confirm the
  map is usable at 360px and that the region pill row does not collide with the zoom
  controls when it wraps.
- **Defect found & fixed in this task:** at 360px the header could not fit (4 labelled
  buttons ≈410px `flexShrink:0` + brand ≈190px vs 312px available) → clipped by
  `body{overflow-x:hidden}`; and every `minmax(320px,1fr)` grid overflowed a 312px
  content box. Fixed by the ≤720px / ≤480px collapse rules + the gutter change above.
- **Verification:** `npx tsc -b` → exit 0 · `npm run build` → green · new rules present
  in shipped CSS · `grep FeatureCollection` finds only the *loader* (data still fetched
  lazily — `dist/maps/*.geojson` stays a separate asset) · oxlint on changed files → 0/0.
- **Findings from the sweep (all `minmax()` grids in `src/components`, checked against
  their enclosing box at a 360px viewport):**
  - every grid in `src/components/dossier/*` → **ok** (the 320px tracks sit directly in
    `.container`, which now offers 328px at ≤480px; smaller tracks have more headroom)
  - all 12 dossier modules use `className="container"`, so the gutter fix reaches them
  - `DossierHero` flag+title row already has `flexWrap: wrap` → wraps instead of clipping
  - `WorldMap2D` (read-only): pill row and zoom controls share one
    `justify-content: space-between; flexWrap: wrap` bar → they **stack** at 360px
    rather than collide; inner groups set `pointerEvents: 'auto'` over the container's
    `none`, so pills stay clickable; loading/error overlays exist with `role="status"`.
    The fixed `height: 520px` is tall-but-usable on a phone — noted, not a defect.
  - `ComparisonDock` (read-only): `position:fixed; maxWidth:90vw` + inner
    `overflowX: auto` → horizontally scrollable at 360px. Acceptable.
  - **1 real overflow found in another agent's file → filed as TASK-019** (not fixed by
    me: `MultiFilterExplorer.tsx` was being actively edited at the time).
- **Outstanding (cannot verify here):** no browser session is connected to this agent, so
  360/768/1280 were verified **by layout arithmetic + build output, not visually**.
  Visual confirmation remains open — tracked as **TASK-018** (fileed below).

### TASK-018 — Visual confirmation of the responsive pass (blocked: no browser)
- **Status:** BLOCKED — **no browser session is connected to Agent 2**, so the 360 /
  768 / 1280 checks in TASK-012 were done by layout arithmetic + build inspection only.
- **Agent:** Agent 2
- **Depends on:** TASK-012 (foundation landed) + a connected browser session.
- **Files:** read-only across the app; fixes (if any) stay in Agent 2's files.
- **Checklist:** header collapse at 720/480 (icon-only buttons keep working), dossier
  grids single-column at 360 without clipping, comparison dock reachable at 360, map card
  usable at 360 (see TASK-004 note), focus rings visible on every interactive element,
  reduced-motion honoured, contrast spot-check on gold-on-dark.
- **Note:** until this closes, TASK-012's responsive claims rest on static reasoning and
  should be treated as *not yet visually confirmed*.

### TASK-013 — Phase 6 expansion: countries, universities, landmarks
- **Status:** BACKLOG
- **Agent:** Agent 3 (data) + Agent 4 (presentation)
- **Scope:** grow beyond 15 profiles toward 195 without rewriting the loader. The **34
  ISO3 codes reported by TASK-002's `subregion-member-without-dossier` warnings are the
  prioritised backlog** for this task — that list is the coverage plan, not a defect.
- **Now unlocked:** TASK-004 means all 242 territories already render correctly on the
  map; adding a dossier automatically makes that territory interactive on the map with no
  further map work. Growing the dataset is now the cheapest way to grow the map's value.
- **Constraint:** optional university-ranking data must respect provider terms — no
  scraping or redistribution of proprietary rankings (directive §7).

---

## COMPLETED

### TASK-004 — Adopt Natural Earth boundaries in WorldMap2D
- **Status:** DONE
- **Agent:** Agent 3 (DeepSeek 4.1 Flash) — **operator-directed cross-ownership edit**
  (file belongs to Agent 4; claimed here explicitly per rule 2). **Agent 4: please review.**
- **Files:** `src/components/spatial/WorldMap2D.tsx` (rewritten internals)
- **What changed:**
  - Removed the six hand-authored `CONTINENT_PATHS` silhouettes and the
    `projectCoordinates` helper (1000×500) time.
  - Removed the `CountryNode` pin layer — 242 real country `<path>` shapes replace
    15 dots.
  - Now consumes the Agent 3 data layer: `loadWorldGeo()`,
    `computeRenderableCountries()`, `project()`, `MAP_WIDTH`/`MAP_HEIGHT`/`MAP_ASPECT`,
    `CONTINENTS_BY_REGION`, `EXCLUDED_CONTINENTS`.
  - viewBox `0 0 1000 500` → `0 0 360 144`; `preserveAspectRatio` `slice` → `meet`
    (slice was cropping geography at default zoom); `vectorEffect="non-scaling-stroke"`
    so borders stay crisp at every zoom.
  - **Per-country hover** (fill/stroke highlight + HUD card) and **selection** (click →
    dossier) on the real shape.
  - Non-dossier territories are honest: dimmed palette, "No dossier available yet" HUD,
    and a coverage notice on click naming how many of 195 are covered. No fabricated data.
  - Keyboard: dossier countries are `tabIndex=0` with `role="button"`,
    `aria-label`, and Enter/Space activation.
  - Added loading and error states; error text points users to the working alternatives.
  - Added pan clamping (the map can no longer be dragged out of reach) and
    `prefers-reduced-motion` respect.
  - Region pills now count **dossier coverage** (4/4/3/3/1 = 15) rather than territories
    by continent (~48 for Asia), so they agree with the "All Spheres (15)" total.
- **Bug avoided:** the first draft used `animation: spin` and `fadeIn` — **neither
  keyframe exists** in `src/styles/base.css` (only `pulseGlow`). Caught on review; see
  TASK-016 for the same latent bug in `GlobeCanvas`.
- **Verified:**
  - `npx tsc -b` → exit 0.
  - `npx vite build` → green; 511.47 kB (138.30 kB gzip) versus 506.57 kB (136.61 kB)
    before — a delta of **+4.9 kB**, not +428 kB, proving the geometry is lazy-loaded.
  - **Projection invariant** (`mapX === lon+180`, `mapY === 84−lat`): 2000/2000 random
    points pass.
  - **End-to-end path generation:** 4869/4869 coordinate pairs across **all 242
    territories** match the projected coordinates of the real geometry.
  - All path coordinates fall inside the map plane `0..360 × 0..144`.
  - Draw order confirmed largest-first, so small states (MAC, TUV) stay clickable on top.
  - Probe of a distinctive coordinate run confirms the geojson data is **not** in the
    bundle; `dist/maps/world-countries-50m.geojson` is emitted as a static file.
- **Integration notes for other agents:**
  - `selectedRegionId` is **never passed** by `WorldPortal`, so the region-lens highlight
    path is currently only exercised if a future parent supplies it. Region pills
    navigate via `onSelectRegion` instead (the component unmounts), which is why
    `frameRegion` is only the fallback when that callback is absent.
  - Labels render only at zoom ≥ 1.5, and their font size is divided by zoom so on-screen
    size stays constant.

### TASK-003 — DECISION: cartographic fidelity of the 2D map
- **Status:** DONE — **resolved in favour of real boundaries**
- **Decided by:** the operator, who directed TASK-004.
- **Outcome:** the hand-drawn continent schematic is retired in favour of the vendored
  Natural Earth boundaries. Rationale recorded in `CHANGELOG_AGENTS.md`: invented
  coastlines were the one place the product's no-fabrication principle was not applied,
  and pins could not support the directive's required country hover/selection.

### TASK-014 — Fix "N Subregions" overcount in WorldPortal
- **Status:** DONE
- **Agent:** Agent 3 (DeepSeek 4.1 Flash) — operator-directed cross-ownership edit
- **Files:** `src/components/spatial/WorldPortal.tsx`,
  `src/types/spatial.ts` (root-cause documentation)
- **Change:** `{reg.subregions.length}` → `{getSubregionsByRegion(reg.id).length}`.
- **Also:** documented `Region.subregions` in `src/types/spatial.ts` as the
  forward-looking **coverage plan**, with an explicit warning not to derive display
  counts from it — so the bug cannot be reintroduced by reading the type.
- **Before → after:** Asia 5→3, Europe 4→2, Americas 4→2, Africa 5→3, Oceania 4→1.
- **Verified:** `tsc -b` exit 0; build green; per-region authored counts confirmed.

### TASK-006 — Remove hardcoded sphere count in WorldMap2D
- **Status:** DONE
- **Agent:** Agent 3 (DeepSeek 4.1 Flash) — operator-directed cross-ownership edit
- **Change:** literal `All Spheres (15)` → `All Spheres ({nodes.length})`.
- **Note:** superseded in practice by TASK-004, which now derives the count from
  `COUNTRY_INDEX.length`.

### TASK-005 — Remove hardcoded country count in CommandPalette
- **Status:** DONE — **fixed by Agent 2, independently**
- **Files:** `src/components/navigation/CommandPalette.tsx`
- **Change:** now renders `{DATASET_STATS.countryCount} Flagship Nations Loaded`.
- **Note:** Agent 3 did not touch this file. Recorded only so the queue reflects reality;
  Agent 2 correctly consumed the TASK-002 stats API with no coordination needed.

### TASK-002 — Dataset integrity validation + canonical stats API
- **Status:** DONE
- **Agent:** Agent 3 (DeepSeek 4.1 Flash)
- **Files:** `src/data/dataset.ts` (new), `src/data/index.ts` (additive)
- **Verified:** `tsc -b` exit 0; build green; validator confirmed absent from `dist`;
  executed against real data.
- **Result:** 11 errors + 34 warnings → TASK-014 (fixed) and TASK-015 (open). Dataset
  otherwise verified clean.
- **Provides:** `DATASET_STATS` (consumed by TASK-005, TASK-006) and `validateDataset()`.

### TASK-001 — Establish shared coordination memory
- **Status:** DONE
- **Agent:** Agent 3 (DeepSeek 4.1 Flash)
- **Files:** `WORK_QUEUE.md` (new), `CHANGELOG_AGENTS.md` (new)
- **Also:** removed my own duplicate map component + out-of-bounds stylesheet; relocated
  projection into `src/data/map/`.
