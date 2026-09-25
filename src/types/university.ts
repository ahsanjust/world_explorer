/* =============================================================================
   UNIVERSITY RECORDS — SHARED TYPE
   =============================================================================
   Moved out of `src/data/universities.ts` when that module became a generated
   directory (one file per country). Types live in `src/types/*`, generated data
   lives in `src/data/*` — keeping them separate is what stops a regeneration
   from overwriting hand-written logic.
   ============================================================================= */

/**
 * A tertiary institution inside the Middle East scope.
 *
 * ## On rankings — read this before adding a `globalRankQs`
 *
 * This field is **`null` for every generated record, deliberately.**
 *
 * The operator asked for "top 20 universities per country". A *top* list needs an
 * ordering, and the obvious candidates are the commercial global rankings (QS,
 * THE). Proprietary commercial ranking data is not redistributed without licensing,
 * and the project's zero-fabrication rule forbids inventing ranks to fill the gap. So the
 * ordering shipped here is the one signal that is both free and verifiable:
 *
 *   `recognition.wikipediaLanguages` — how many Wikipedia language editions carry
 *   an article about the institution. It correlates strongly with international
 *   prominence, and a reader can check it.
 *
 * The UI must present it as *recognition*, never as a rank, and must not imply
 * that a university is absent because a rank is missing. `globalRankQs` exists so
 * a genuinely licensed ranking can be added later without a schema change.
 */
export interface GlobalUniversity {
  /** Slug, unique across the dataset (e.g. `qatar-university`). */
  id: string;
  name: string;
  /** Dossier id when a profile exists (e.g. `qatar`), else the country slug. */
  countryId: string;
  /** ISO 3166-1 alpha-3 of the country the institution sits in. */
  countryIso3: string;
  countryName: string;
  flagEmoji: string;
  /** City, town or district. Never '' — records without a location are not emitted. */
  city: string;
  /** Official website. Never '' — see `hasWebsite`. */
  websiteUrl: string;
  /** Year of foundation. Never null — records without one are not emitted. */
  foundedYear: number;
  type: 'Public' | 'Private' | 'Unknown';
  /**
   * Subjects the institution is known for.
   *
   * Populated from Wikidata's `field of work` / `industry` statements, so it is
   * **partial by nature** — many institutions have no such statement. An empty
   * array means "not recorded upstream", not "no specialisms". The UI must not
   * filter on this without offering an "any field" option that includes the empties.
   */
  notableFields: string[];
  /** Licensed ranking, when one exists. `null` in the generated dataset. */
  globalRankQs: number | null;
  /** External-recognition signals, the basis for the shipped ordering. */
  recognition: {
    /** Number of Wikipedia language editions with an article. Used to sort. */
    wikipediaLanguages: number;
    /** Human-readable statement of what that number means. */
    basis: string;
  };
  /** Enrolment, when Wikidata records it. `null` = not recorded upstream. */
  studentCount: number | null;
  /** Wikidata entity URL — provenance for every field above. */
  sourceUrl: string;
}

/** How the generated dataset is ordered within each country. */
export type UniversitySortKey =
  | 'recognition'
  | 'name'
  | 'founded-asc'
  | 'founded-desc'
  | 'students-desc';

/** Filter surface for the university explorer. */
export interface UniversityFilter {
  /** Country ISO3, or 'all'. */
  countryIso3?: string;
  /** Case-insensitive substring match on name, city or field. */
  query?: string;
  type?: 'Public' | 'Private' | 'Unknown' | 'all';
  /** Field/subject token; 'all' includes records with no recorded fields. */
  field?: string;
  /** Inclusive lower bound on `foundedYear`. */
  foundedFrom?: number;
  /** Inclusive upper bound on `foundedYear`. */
  foundedTo?: number;
  /** Minimum `recognition.wikipediaLanguages`. */
  minRecognition?: number;
  /** Only institutions with enrolment recorded. */
  hasStudentCount?: boolean;
}
