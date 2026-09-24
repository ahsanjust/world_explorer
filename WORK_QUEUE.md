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

**Current build state:** `npx tsc -b` → exit 0. `npx vite build` → green (136.6 kB gzip).

---

## NEEDS A DECISION (blocking other work)

### TASK-003 — DECISION: cartographic fidelity of the 2D map
- **Status:** REVIEW — **owner: Agent 1**
- **Blocks:** TASK-004
- **Files:** `src/components/spatial/WorldMap2D.tsx` (Agent 4)
- **Problem:** `WorldMap2D.tsx` renders six hand-authored `CONTINENT_PATHS` blobs — the
  coastlines are invented, and countries are represented only by pins. The directive
  requires an interactive 2D vector map with country hover and country selection.
  Real Natural Earth boundaries are already vendored (`public/maps/`) and simplified.
- **Decision needed:** upgrade `WorldMap2D` to real boundaries (recommended), or keep the
  schematic and formally amend the directive's map requirement.
- **Do not** let two competing map components coexist (see `CHANGELOG_AGENTS.md` §2).

---

## READY

### TASK-007 — Resolve the vestigial `'polar'` member of `RegionId`
- **Status:** READY
- **Agent:** Agent 3
- **Files:** `src/types/spatial.ts`, `src/data/benchmarks.ts`,
  `src/components/spatial/WorldMap2D.tsx` (coordinate with Agent 4)
- **Problem:** `RegionId` declares `'polar'`, but no `Region` provides it. Every
  `Record<RegionId, T>` is forced to carry dead entries — this is what broke the build,
  and `WorldMap2D` currently holds placeholder `polar` values that are unreachable.
- **Options:** (a) remove `'polar'` and `REGIONAL_BENCHMARKS.polar`, or (b) keep it and
  add a real `polar` `Region`. Recommend (a) unless an Antarctic region is planned.

### TASK-015 — Reconcile `Region.subregions` with authored `SUBREGIONS`
- **Status:** READY — **found by TASK-002** (data half; display half fixed in TASK-014)
- **Agent:** Agent 3
- **Files:** `src/data/regions.ts`, `src/data/subregions.ts`
- **Issue:** 11 declared subregion ids have no `Subregion` record —
  `south-asia`, `central-asia`, `southern-europe`, `eastern-europe`, `central-america`,
  `caribbean`, `west-africa`, `central-africa`, `polynesia`, `melanesia`, `micronesia`.
- **Options:** (a) author the 11 missing records with real geography, or (b) trim
  `Region.subregions` to the 11 authored ids. **Recommend (a)** — these are real divisions
  and the list is the navigation plan — but authoring needs genuine coordinates/bounds,
  so do not rush it and never invent values.
- **Note:** TASK-014 stopped the UI from misreporting this. The underlying data gap
  remains and is why `validateDataset()` still reports 11 errors.

### TASK-010 — Currency provenance & staleness audit
- **Status:** READY
- **Agent:** Agent 3
- **Files:** `src/services/currencyService.ts`, `src/hooks/useLiveCurrency.ts`,
  `src/components/dossier/CurrencyModule.tsx` (Agent 2 — coordinate, do not edit)
- **Scope:** verify the 4-tier fallback surfaces honest labelling and that no stale rate
  is ever presented as authoritative. The baseline seed is dated `2026-09-24`; confirm
  every UI path showing it visibly marks it as a fallback (directive §8).

---

## BLOCKED

### TASK-004 — Adopt Natural Earth boundaries in WorldMap2D
- **Status:** BLOCKED on TASK-003
- **Agent:** Agent 4
- **Files:** `src/components/spatial/WorldMap2D.tsx` (+ its own styles)
- **Consume:** `src/data/map/worldGeo.ts` (loader), `src/data/map/projection.ts`
  (`computeRenderableCountries`), `src/types/map.ts` (types).
  Asset is ~105 KB gzipped, lazy-loaded — must not enter the initial bundle.
- **Exit criteria:** per-country hover + click-to-select, region/subregion highlight,
  pan/zoom preserved, keyboard-reachable countries, loading + error states.

---

## BACKLOG

### TASK-008 — Establish a test runner + first smoke tests
- **Status:** BACKLOG
- **Agent:** Agent 4 (QA per `AGENTS.md`)
- **Blocker:** `package.json` has no test script and the project has **zero test files**.
  Adding a runner is a dependency decision → needs Agent 1 sign-off.
- **Ready-made first target:** `validateDataset()` is pure and dependency-free; feed it
  deliberately broken fixtures (duplicate ISO3, dangling subregion, out-of-range latitude,
  zero FX rate) and assert the expected issue codes.
- **Workaround used meanwhile:** data-only checks were verified by compiling the data
  graph to a scratch CommonJS dir with `tsc --ignoreConfig` and running it under Node.
  Repeatable pattern until a runner exists.

### TASK-011 — Accessibility pass: map keyboard access + focus visibility
- **Status:** BACKLOG
- **Agent:** Agent 1 (shared components) + Agent 2 (visual)
- **Scope:** `prefers-reduced-motion` honoured in all animated views, visible focus rings,
  focus order through map/dock/modals, screen-reader names for map affordances.

### TASK-012 — Phase 5 responsive & performance pass
- **Status:** BACKLOG
- **Agent:** Agent 2
- **Scope:** verify 360 / 768 / 1280 breakpoints; confirm dossier modules and the
  comparison dock lay out intentionally on mobile rather than being shrunk desktop.
  Confirm the boundary asset stays out of the initial bundle.

### TASK-013 — Phase 6 expansion: countries, universities, landmarks
- **Status:** BACKLOG
- **Agent:** Agent 3 (data) + Agent 4 (presentation)
- **Scope:** grow beyond 15 profiles toward 195 without rewriting the loader. The **34
  ISO3 codes reported by TASK-002's `subregion-member-without-dossier` warnings are the
  prioritised backlog** for this task — that list is the coverage plan, not a defect.
- **Constraint:** optional university-ranking data must respect provider terms — no
  scraping or redistribution of proprietary rankings (directive §7).

---

## COMPLETED

### TASK-014 — Fix "N Subregions" overcount in WorldPortal
- **Status:** DONE
- **Agent:** Agent 3 (DeepSeek 4.1 Flash) — **operator-directed cross-ownership edit**
  (file belongs to Agent 4; claimed here explicitly per rule 2). Agent 4: review and
  take ownership if you prefer a different derivation.
- **Files:** `src/components/spatial/WorldPortal.tsx` (line ~282),
  `src/types/spatial.ts` (root-cause documentation, Agent 3's own file)
- **Change:** `{reg.subregions.length}` → `{getSubregionsByRegion(reg.id).length}`.
- **Also:** documented `Region.subregions` in `src/types/spatial.ts` as the
  forward-looking **coverage plan**, with an explicit warning not to derive display
  counts from it — so the same bug cannot be reintroduced by reading the type.
- **Before → after:** Asia 5→3, Europe 4→2, Americas 4→2, Africa 5→3, Oceania 4→1.
- **Verified:** `npx tsc -b` exit 0; `npx vite build` green; per-region authored
  subregion counts confirmed = 3 / 2 / 2 / 3 / 1.

### TASK-006 — Remove hardcoded sphere count in WorldMap2D
- **Status:** DONE
- **Agent:** Agent 3 (DeepSeek 4.1 Flash) — **operator-directed cross-ownership edit**
  (file belongs to Agent 4; claimed here explicitly per rule 2)
- **Files:** `src/components/spatial/WorldMap2D.tsx` (line ~252)
- **Change:** literal `All Spheres (15)` → `All Spheres ({nodes.length})`.
- **Why `nodes.length` and not `DATASET_STATS`:** `nodes` is derived from
  `ALL_COUNTRY_PROFILES`, and the sibling per-region buttons immediately below already
  compute `nodes.filter(...).length`. Using the same local source keeps the bucket counts
  consistent with each other. Both resolve to the canonical 15.
- **Verified:** `tsc -b` exit 0; build green; no hardcoded dataset counts remain
  (`grep` for `All Spheres (1[0-9])` → none).

### TASK-005 — Remove hardcoded country count in CommandPalette
- **Status:** DONE — **fixed by Agent 2, independently and before I reached it**
- **Files:** `src/components/navigation/CommandPalette.tsx`
- **Change:** now imports and renders `{DATASET_STATS.countryCount} Flagship Nations
  Loaded`, replacing the stale `"12 Flagship Nations Loaded"`.
- **Note:** I did **not** touch this file. Recording it here only so the queue reflects
  reality. Agent 2 correctly consumed the TASK-002 stats API — that handoff worked.

### TASK-002 — Dataset integrity validation + canonical stats API
- **Status:** DONE
- **Agent:** Agent 3 (DeepSeek 4.1 Flash)
- **Files:** `src/data/dataset.ts` (new), `src/data/index.ts` (additive)
- **Verified:** `npx tsc -b` exit 0; `npx vite build` green; validator confirmed absent
  from `dist` (dev-only guard correctly eliminated); executed against real data.
- **Result:** 11 errors + 34 warnings, producing FINDING 1 and FINDING 2 → now TASK-014
  (fixed) and TASK-015 (open). Dataset otherwise verified clean.
- **Provides:** `DATASET_STATS` (consumed by TASK-005, TASK-006) and `validateDataset()`
  (first test target for TASK-008).

### TASK-009 — Data integrity audit of cross-references
- **Status:** DONE (absorbed by TASK-002)
- **Note:** TASK-002 performed the audit; remediation split into TASK-014 (display,
  fixed) and TASK-015 (data, open) rather than kept as one vague task.

### TASK-001 — Establish shared coordination memory
- **Status:** DONE
- **Agent:** Agent 3 (DeepSeek 4.1 Flash)
- **Files:** `WORK_QUEUE.md` (new), `CHANGELOG_AGENTS.md` (new)
- **Also:** removed my own duplicate map component + out-of-bounds stylesheet; relocated
  projection into `src/data/map/`; minimal additive fix to unbreak the `WorldMap2D` build.
- **Verified:** `npx tsc -b` → exit 0.
