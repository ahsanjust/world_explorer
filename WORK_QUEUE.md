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
  coastlines are invented, and countries are represented only by 15 pins. The directive
  requires an interactive 2D vector map with country hover and country selection.
  Real Natural Earth boundaries are already vendored (`public/maps/`) and simplified.
- **Decision needed:** upgrade `WorldMap2D` to real boundaries (recommended), or keep the
  schematic and formally amend the directive's map requirement.
- **Do not** let two competing map components coexist (see `CHANGELOG_AGENTS.md` §2).

---

## READY

### TASK-005 — Remove hardcoded country count in CommandPalette
- **Status:** READY (was BLOCKED on TASK-002 — now landed)
- **Agent:** Agent 2
- **Files:** `src/components/navigation/CommandPalette.tsx` (line ~247)
- **Issue:** literal `"12 Flagship Nations Loaded"` — the dataset has **15**.
  **User-visible factual error**; violates the no-fabrication principle.
- **Fix:** use `DATASET_STATS.countryCount` from `src/data`. Exported and ready.

### TASK-006 — Remove hardcoded sphere count in WorldMap2D
- **Status:** READY (was BLOCKED on TASK-002 — now landed)
- **Agent:** Agent 4
- **Files:** `src/components/spatial/WorldMap2D.tsx` (line ~252)
- **Issue:** literal `"All Spheres (15)"` — correct today, silently wrong tomorrow.
- **Fix:** use `DATASET_STATS.countryCount`.

### TASK-007 — Resolve the vestigial `'polar'` member of `RegionId`
- **Status:** READY
- **Agent:** Agent 3
- **Files:** `src/types/spatial.ts`, `src/data/benchmarks.ts`,
  `src/components/spatial/WorldMap2D.tsx` (coordinate with Agent 4)
- **Problem:** `RegionId` declares `'polar'`, but no `Region` provides it. Every
  `Record<RegionId, T>` is forced to carry dead entries — this is what broke the build
  (`CHANGELOG_AGENTS.md` §3), and `WorldMap2D` currently holds placeholder `polar`
  values that are unreachable.
- **Options:** (a) remove `'polar'` and `REGIONAL_BENCHMARKS.polar`, or (b) keep it and
  add a real `polar` `Region`. Recommend (a) unless an Antarctic region is planned.

### TASK-014 — Fix "N Subregions" overcount in WorldPortal
- **Status:** READY — **found by TASK-002**
- **Agent:** Agent 4
- **Files:** `src/components/spatial/WorldPortal.tsx` (line ~282; Agent 4's file, but this
  is a spatial view — Agent 1 to arbitrate if Agent 4 is unavailable)
- **Issue:** renders `{reg.subregions.length}`, i.e. the *declared* list, which
  over-declares for all five regions. UI currently shows Asia 5 / Europe 4 / Americas 4 /
  Africa 5 / Oceania 4; the navigable totals are 3 / 2 / 2 / 3 / 1.
- **Fix:** derive the displayed count from `getSubregionsByRegion(reg.id).length`
  (which is what `RegionPortal` already navigates by), so display and behaviour agree.
- **Evidence:** `CHANGELOG_AGENTS.md` → FINDING 1.

### TASK-015 — Reconcile `Region.subregions` with authored `SUBREGIONS`
- **Status:** READY — **found by TASK-002**
- **Agent:** Agent 3
- **Files:** `src/data/regions.ts`, `src/data/subregions.ts`
- **Issue:** 11 declared subregion ids have no `Subregion` record —
  `south-asia`, `central-asia`, `southern-europe`, `eastern-europe`, `central-america`,
  `caribbean`, `west-africa`, `central-africa`, `polynesia`, `melanesia`, `micronesia`.
- **Options:** (a) author the 11 missing records with real geography, or (b) trim
  `Region.subregions` to the 11 authored ids. **Recommend (a)** — these are real divisions
  and the list is the navigation plan — but authoring needs genuine coordinates/bounds,
  so do not rush it and never invent values.
- **Note:** TASK-014 fixes the *displayed number* independently; this task fixes the data.
  Both should land; neither is a substitute for the other.

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
- **Workaround used meanwhile:** TASK-002 was verified by compiling the data graph to a
  scratch CommonJS dir with `tsc --ignoreConfig` and running it under Node. That is a
  repeatable pattern for data-only checks until a runner exists.

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

### TASK-002 — Dataset integrity validation + canonical stats API
- **Status:** DONE
- **Agent:** Agent 3 (DeepSeek 4.1 Flash)
- **Files:** `src/data/dataset.ts` (new), `src/data/index.ts` (additive)
- **Verified:** `npx tsc -b` exit 0; `npx vite build` green; validator confirmed absent
  from `dist` (dev-only guard correctly eliminated); executed against real data.
- **Result:** 11 errors + 34 warnings, producing FINDING 1 and FINDING 2, which are now
  TASK-014 and TASK-015. Dataset otherwise verified clean (no duplicate keys, no
  unresolved refs, no missing citations, no non-finite or implausible metrics).
- **Provides:** `DATASET_STATS` (unblocks TASK-005, TASK-006) and `validateDataset()`
  (first test target for TASK-008).

### TASK-009 — Data integrity audit of cross-references
- **Status:** DONE (absorbed by TASK-002)
- **Note:** TASK-002 performed the audit and produced concrete findings. Remediation was
  split into TASK-014 (display) and TASK-015 (data) rather than kept as one vague task.

### TASK-001 — Establish shared coordination memory
- **Status:** DONE
- **Agent:** Agent 3 (DeepSeek 4.1 Flash)
- **Files:** `WORK_QUEUE.md` (new), `CHANGELOG_AGENTS.md` (new)
- **Also:** removed my own duplicate map component + out-of-bounds stylesheet; relocated
  projection into `src/data/map/`; minimal additive fix to unbreak the `WorldMap2D` build.
- **Verified:** `npx tsc -b` → exit 0.
