import { CountryProfile } from '../types/country';

/**
 * Fills in the peer navigator for dossiers whose twin lists were never authored
 * by hand. Both lists are *derived from the dataset's own figures* — never
 * invented — so the section can be populated without asserting anything new:
 *
 *   - `economicTwins` — the closest peers by GDP per capita (PPP), the same
 *     measure the dossier's headline gauge leads with.
 *   - `climaticTwins` — peers sharing the Köppen class, ordered by how close
 *     their mean annual temperature is.
 *
 * A curated list always wins: a dossier that already names its twins is returned
 * untouched. `regionalNeighbors` is never synthesised, because sharing a border
 * is a fact while "closest country" is not.
 */
const TWIN_LIMIT = 3;

/** The `TWIN_LIMIT` profiles whose `value` sits closest to `target`. */
function nearest(country: CountryProfile, candidates: CountryProfile[], value: (c: CountryProfile) => number, target: number): string[] {
  return candidates
    .map((candidate) => ({ id: candidate.id, distance: Math.abs(value(candidate) - target) }))
    .sort((a, b) => a.distance - b.distance)
    .slice(0, TWIN_LIMIT)
    .map((entry) => entry.id);
}

export function withDerivedPeers(profiles: CountryProfile[]): CountryProfile[] {
  return profiles.map((country) => {
    const { economicTwins, climaticTwins } = country.analyticalPeers;
    if (economicTwins.length > 0 && climaticTwins.length > 0) return country;

    const others = profiles.filter((p) => p.id !== country.id);
    const sameClimateClass = others.filter((p) => p.climate.koppenCode === country.climate.koppenCode);

    return {
      ...country,
      analyticalPeers: {
        ...country.analyticalPeers,
        economicTwins:
          economicTwins.length > 0
            ? economicTwins
            : nearest(country, others, (c) => c.economy.gdpPerCapitaPppUsd, country.economy.gdpPerCapitaPppUsd),
        climaticTwins:
          climaticTwins.length > 0
            ? climaticTwins
            : nearest(
                country,
                // Prefer a shared Köppen class; a country with a class of its own
                // still gets the closest mean temperature rather than a blank card.
                sameClimateClass.length > 0 ? sameClimateClass : others,
                (c) => c.climate.averageAnnualTempCelsius,
                country.climate.averageAnnualTempCelsius,
              ),
      },
    };
  });
}
