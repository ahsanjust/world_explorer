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
