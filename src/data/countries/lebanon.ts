import { CountryProfile } from '../../types/country';
import { buildSovereignProfile } from './sovereignDossier';

/**
 * Lebanon — full sovereign dossier (subregion: levant).
 *
 * Seed fields are the country's own; the shared builder in `sovereignDossier.ts`
 * supplies the fields that are still awaiting per-country research.
 */
export const LEBANON: CountryProfile = buildSovereignProfile({
    id: 'lebanon',
    iso2: 'LB',
    iso3: 'LBN',
    unCode: '422',
    name: 'Lebanon',
    officialName: 'Lebanese Republic',
    nativeCommon: 'لبنان',
    nativeOfficial: 'الجمهورية اللبنانية',
    subregionId: 'levant',
    capitalName: 'Beirut',
    capitalCoords: [33.8938, 35.5018],
    majorCities: ['Beirut', 'Tripoli', 'Sidon', 'Tyre', 'Byblos', 'Zahlé', 'Jounieh'],
    flagEmoji: '🇱🇧',
    flagColors: ['#ED1C24', '#FFFFFF', '#00A651'],
    tagline: 'Levantine cultural and academic beacon famed for cedar forests, ancient Phoenician ports, and Mediterranean cuisine.',
    overview: 'Bridging Europe and the Arab world, Lebanon features ancient Phoenician maritime history, vibrant intellectual culture, iconic cedar reserves, and diverse confessional democracy.',
    areaKm2: 10452,
    coastlineKm: 225,
    borders: [
      { iso3: 'SYR', name: 'Syria', lengthKm: 375 },
      { iso3: 'ISR', name: 'Israel', lengthKm: 79 },
    ],
    highestName: 'Qurnat as Sawda’',
    highestElevation: 3088,
    lowestName: 'Mediterranean Sea',
    lowestElevation: 0,
    timezone: 'Asia/Beirut (UTC+2)',
    coordinates: [33.8547, 35.8623],
    population: 5500000,
    medianAge: 30.5,
    urbanizationRate: 89.2,
    lifeExpectancy: 78.8,
    fertilityRate: 2.0,
    gdpNominalUsdBillions: 22.0,
    gdpPppUsdBillions: 72.0,
    gdpPerCapitaPppUsd: 13000,
    currencyCode: 'LBP',
    currencyName: 'Lebanese Pound',
    currencySymbol: 'ل.ل',
    isPegged: false,
    fallbackRate: 89500.0,
    literacyRate: 95.1,
    tertiaryEnrollment: 46.5,
    safetyIndex: 51.5,
    crimeIndex: 48.5,
    peaceIndexRank: 134,
    peaceIndexScore: 2.58,
    koppenCode: 'Csa',
    koppenTitle: 'Mediterranean Coast to Alpine Ridges',
    climateSummary: 'Hot Mediterranean summer along coastlines with snowcapped ski peaks in the Mount Lebanon range.',
    avgTemp: 20.8,
    avgRainfall: 820,
    unescoCount: 6,
    landmarks: [
      { name: 'Baalbek Roman Temples', location: 'Bekaa Valley', description: 'Colossal Roman sanctuary of Jupiter and Bacchus with immense monolithic stone foundations.', imageUrl: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=800&auto=format&fit=crop' },
      { name: 'Byblos (Jbeil)', location: 'Mount Lebanon', description: 'Continuously inhabited Phoenician harbor where the linear alphabet originated.', imageUrl: 'https://images.unsplash.com/photo-1549144511-f099e773c147?w=800&auto=format&fit=crop' },
    ],
    culinaryTraditions: [
      { name: 'Mezze Platter', description: 'Extensive array of cold and hot appetizers: tabbouleh, fattoush, hummus, baba ghanoush, and kibbeh.' },
      { name: 'Manakish Za’atar', description: 'Fresh wood-fired flatbread topped with fragrant wild thyme, sumac, and olive oil.' },
    ],
    languages: [
      { name: 'Arabic', isOfficial: true },
      { name: 'French', isOfficial: false },
      { name: 'English', isOfficial: false },
    ],
    mainIndustries: ['Banking & Financial Services', 'Tourism & Hospitality', 'Food & Beverage Processing', 'Construction & Real Estate', 'Agriculture'],
    topExports: ['Jewellery & precious metals', 'Processed food & beverages', 'Machinery & appliances', 'Paper & printed matter'],
});
