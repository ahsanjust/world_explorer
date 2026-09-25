import { CountryProfile } from '../../types/country';
import { buildSovereignProfile } from './sovereignDossier';

/**
 * Azerbaijan — full sovereign dossier (subregion: caucasus-afghanistan).
 *
 * Seed fields are the country's own; the shared builder in `sovereignDossier.ts`
 * supplies the fields that are still awaiting per-country research.
 */
export const AZERBAIJAN: CountryProfile = buildSovereignProfile({
    id: 'azerbaijan',
    iso2: 'AZ',
    iso3: 'AZE',
    unCode: '031',
    name: 'Azerbaijan',
    officialName: 'Republic of Azerbaijan',
    nativeCommon: 'Azərbaycan',
    nativeOfficial: 'Azərbaycan Respublikası',
    subregionId: 'caucasus-afghanistan',
    capitalName: 'Baku',
    capitalCoords: [40.4093, 49.8671],
    majorCities: ['Baku', 'Ganja', 'Sumqayit', 'Mingachevir', 'Shirvan', 'Nakhchivan'],
    flagEmoji: '🇦🇿',
    flagColors: ['#00B5E2', '#ED2939', '#3F9C35'],
    tagline: 'Land of Fire bridging the South Caucasus and the Caspian Sea, combining ancient Zoroastrian flame towers with hyper-modern architecture.',
    overview: 'Located at the boundary of Eastern Europe and Western Asia on the Caspian Sea coast, Azerbaijan possesses historic oil reserves, the medieval walled city of Icherisheher, and dramatic mud volcanoes.',
    areaKm2: 86600,
    coastlineKm: 713,
    borders: [
      { iso3: 'RUS', name: 'Russia', lengthKm: 338 },
      { iso3: 'GEO', name: 'Georgia', lengthKm: 322 },
      { iso3: 'ARM', name: 'Armenia', lengthKm: 996 },
      { iso3: 'IRN', name: 'Iran', lengthKm: 611 },
    ],
    highestName: 'Bazardüzü Dagi',
    highestElevation: 4466,
    lowestName: 'Caspian Sea',
    lowestElevation: -28,
    timezone: 'Asia/Baku (UTC+4)',
    coordinates: [40.1431, 47.5769],
    population: 10200000,
    medianAge: 32.5,
    urbanizationRate: 56.4,
    lifeExpectancy: 73.5,
    fertilityRate: 1.7,
    gdpNominalUsdBillions: 78.5,
    gdpPppUsdBillions: 192.0,
    gdpPerCapitaPppUsd: 18800,
    currencyCode: 'AZN',
    currencyName: 'Azerbaijani Manat',
    currencySymbol: '₼',
    isPegged: true,
    peggedRate: 1.70,
    fallbackRate: 1.70,
    literacyRate: 99.8,
    tertiaryEnrollment: 41.0,
    safetyIndex: 68.2,
    crimeIndex: 31.8,
    peaceIndexRank: 95,
    peaceIndexScore: 2.10,
    koppenCode: 'BSk',
    koppenTitle: 'Semi-Arid Steppe to Alpine Caucasus',
    climateSummary: 'Mild semi-arid Caspian coastal climate; lush alpine meadows in the Greater Caucasus.',
    avgTemp: 15.1,
    avgRainfall: 310,
    unescoCount: 4,
    landmarks: [
      { name: 'Maiden Tower & Shirvanshahs Palace', location: 'Baku', description: 'Ancient 12th-century defensive stone monument in the Walled City of Baku.', imageUrl: 'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?w=800&auto=format&fit=crop' },
    ],
    culinaryTraditions: [
      { name: 'Shah Plov', description: 'Royal rice pilaf wrapped in crisp golden lavash crust filled with meat, dried fruits, and chestnuts.' },
    ],
    languages: [
      { name: 'Azerbaijani', isOfficial: true },
      { name: 'Russian', isOfficial: false },
    ],
    mainIndustries: ['Oil & Gas', 'Petrochemicals', 'Construction', 'Agriculture (cotton & tea)', 'Aluminium & Mining'],
    topExports: ['Crude oil', 'Natural gas', 'Petroleum products', 'Gold', 'Cotton'],
});
