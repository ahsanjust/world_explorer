import { CountryProfile } from '../../types/country';
import { buildSovereignProfile } from './sovereignDossier';

/**
 * Cyprus — full sovereign dossier (subregion: levant).
 *
 * Seed fields are the country's own; the shared builder in `sovereignDossier.ts`
 * supplies the fields that are still awaiting per-country research.
 */
export const CYPRUS: CountryProfile = buildSovereignProfile({
    id: 'cyprus',
    iso2: 'CY',
    iso3: 'CYP',
    unCode: '196',
    name: 'Cyprus',
    officialName: 'Republic of Cyprus',
    nativeCommon: 'Κύπρος',
    nativeOfficial: 'Κυπριακή Δημοκρατία',
    subregionId: 'levant',
    capitalName: 'Nicosia',
    capitalCoords: [35.1856, 33.3823],
    majorCities: ['Nicosia', 'Limassol', 'Larnaca', 'Paphos', 'Famagusta', 'Kyrenia'],
    flagEmoji: '🇨🇾',
    flagColors: ['#FFFFFF', '#D57800', '#4E5B31'],
    tagline: 'Eastern Mediterranean island crossroads blending Greco-Roman antiquities, high-tech finance, and sunny maritime coasts.',
    overview: 'The third-largest island in the Mediterranean, Cyprus occupies a strategic junction between Europe, the Levant, and North Africa. An EU member state, Cyprus is celebrated for ancient Byzantine frescoed churches, sunny coasts, and international shipping.',
    areaKm2: 9251,
    coastlineKm: 648,
    borders: [],
    highestName: 'Mount Olympus (Troodos)',
    highestElevation: 1952,
    lowestName: 'Mediterranean Sea',
    lowestElevation: 0,
    timezone: 'Asia/Nicosia (UTC+2)',
    coordinates: [35.1264, 33.4299],
    population: 1250000,
    medianAge: 38.0,
    urbanizationRate: 67.2,
    lifeExpectancy: 81.5,
    fertilityRate: 1.3,
    gdpNominalUsdBillions: 34.0,
    gdpPppUsdBillions: 47.0,
    gdpPerCapitaPppUsd: 54600,
    currencyCode: 'EUR',
    currencyName: 'Euro',
    currencySymbol: '€',
    isPegged: false,
    fallbackRate: 0.92,
    literacyRate: 99.1,
    tertiaryEnrollment: 88.0,
    safetyIndex: 71.5,
    crimeIndex: 28.5,
    peaceIndexRank: 64,
    peaceIndexScore: 1.91,
    koppenCode: 'Csa',
    koppenTitle: 'Warm Mediterranean Insular',
    climateSummary: 'Subtropical Mediterranean with hot dry summers and mild winters with snow in the Troodos mountains.',
    avgTemp: 19.5,
    avgRainfall: 480,
    unescoCount: 3,
    landmarks: [
      { name: 'Paphos Archaeological Park', location: 'Paphos', description: 'Spectacular Roman villas with intricate floor mosaics depicting Greek mythology.', imageUrl: 'https://images.unsplash.com/photo-1527668752968-14dc70a27c95?w=800&auto=format&fit=crop' },
    ],
    culinaryTraditions: [
      { name: 'Halloumi', description: 'Iconic semi-hard unripened brined cheese made from goat and sheep milk, grilled to golden perfection.' },
    ],
    languages: [
      { name: 'Greek', isOfficial: true },
      { name: 'Turkish', isOfficial: true },
      { name: 'English', isOfficial: false },
    ],
    mainIndustries: ['Tourism & Hospitality', 'Shipping & Maritime Services', 'Financial & Professional Services', 'Higher Education', 'Agriculture (citrus & dairy)'],
    topExports: ['Refined petroleum products', 'Pharmaceuticals', 'Halloumi & dairy', 'Citrus fruit', 'Ships & boats'],
});
