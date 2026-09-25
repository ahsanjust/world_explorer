import { CountryProfile } from '../../types/country';
import { buildSovereignProfile } from './sovereignDossier';

/**
 * Georgia — full sovereign dossier (subregion: caucasus-afghanistan).
 *
 * Seed fields are the country's own; the shared builder in `sovereignDossier.ts`
 * supplies the fields that are still awaiting per-country research.
 */
export const GEORGIA: CountryProfile = buildSovereignProfile({
    id: 'georgia',
    iso2: 'GE',
    iso3: 'GEO',
    unCode: '268',
    name: 'Georgia',
    officialName: 'Georgia',
    nativeCommon: 'საქართველო',
    nativeOfficial: 'საქართველო',
    subregionId: 'caucasus-afghanistan',
    capitalName: 'Tbilisi',
    capitalCoords: [41.7151, 44.8271],
    majorCities: ['Tbilisi', 'Batumi', 'Kutaisi', 'Rustavi', 'Zugdidi', 'Gori'],
    flagEmoji: '🇬🇪',
    flagColors: ['#FFFFFF', '#FF0000'],
    tagline: 'Cradle of 8,000-year qvevri winemaking, soaring Greater Caucasus peaks, and ancient Silk Road crossroads.',
    overview: 'Nestled between the Greater Caucasus mountains and the Black Sea, Georgia is renowned as the birthplace of wine, celebrated for its polyphonic singing, dramatic mountain fortresses, and vibrant culinary culture.',
    areaKm2: 69700,
    coastlineKm: 310,
    borders: [
      { iso3: 'RUS', name: 'Russia', lengthKm: 894 },
      { iso3: 'TUR', name: 'Türkiye', lengthKm: 273 },
      { iso3: 'ARM', name: 'Armenia', lengthKm: 219 },
      { iso3: 'AZE', name: 'Azerbaijan', lengthKm: 322 },
    ],
    highestName: 'Shkhara',
    highestElevation: 5193,
    lowestName: 'Black Sea',
    lowestElevation: 0,
    timezone: 'Asia/Tbilisi (UTC+4)',
    coordinates: [42.3154, 43.3569],
    population: 3700000,
    medianAge: 38.3,
    urbanizationRate: 60.1,
    lifeExpectancy: 74.2,
    fertilityRate: 1.8,
    gdpNominalUsdBillions: 31.0,
    gdpPppUsdBillions: 82.0,
    gdpPerCapitaPppUsd: 22200,
    currencyCode: 'GEL',
    currencyName: 'Georgian Lari',
    currencySymbol: '₾',
    isPegged: false,
    fallbackRate: 2.73,
    literacyRate: 99.6,
    tertiaryEnrollment: 72.0,
    safetyIndex: 78.4,
    crimeIndex: 21.6,
    peaceIndexRank: 89,
    peaceIndexScore: 2.05,
    koppenCode: 'Cfa',
    koppenTitle: 'Humid Subtropical to Continental Alpine',
    climateSummary: 'Humid subtropical along the Black Sea coast; dry continental climate in eastern Georgia.',
    avgTemp: 13.5,
    avgRainfall: 510,
    unescoCount: 4,
    landmarks: [
      { name: 'Svetitskhoveli Cathedral', location: 'Mtskheta', description: 'Ancient 11th-century patriarchal cathedral and burial site of Christ’s mantle.', imageUrl: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=800&auto=format&fit=crop' },
    ],
    culinaryTraditions: [
      { name: 'Khachapuri Adjaruli', description: 'Boat-shaped fresh bread filled with molten cheese, butter, and raw egg yolk.' },
      { name: 'Khinkali', description: 'Spiced minced meat dumplings filled with savory warm broth.' },
    ],
    languages: [
      { name: 'Georgian', isOfficial: true },
      { name: 'Russian', isOfficial: false },
    ],
    mainIndustries: ['Agriculture & Wine Production', 'Tourism', 'Mining (manganese & copper)', 'Transport & Logistics', 'Hydroelectric Power'],
    topExports: ['Copper ores', 'Ferro-alloys', 'Wine', 'Mineral water', 'Motor cars (re-export)'],
});
