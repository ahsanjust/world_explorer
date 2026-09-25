import { CountryProfile } from '../../types/country';
import { buildSovereignProfile } from './sovereignDossier';

/**
 * Palestine — full sovereign dossier (subregion: levant).
 *
 * Seed fields are the country's own; the shared builder in `sovereignDossier.ts`
 * supplies the fields that are still awaiting per-country research.
 */
export const PALESTINE: CountryProfile = buildSovereignProfile({
    id: 'palestine',
    iso2: 'PS',
    iso3: 'PSE',
    unCode: '275',
    name: 'Palestine',
    officialName: 'State of Palestine',
    nativeCommon: 'فلسطين',
    nativeOfficial: 'دولة فلسطين',
    subregionId: 'levant',
    capitalName: 'East Jerusalem',
    capitalCoords: [31.7683, 35.2137],
    majorCities: ['East Jerusalem', 'Ramallah', 'Gaza City', 'Hebron', 'Nablus', 'Bethlehem', 'Jenin'],
    flagEmoji: '🇵🇸',
    flagColors: ['#000000', '#FFFFFF', '#007A3D', '#E4312B'],
    tagline: 'Historic Levantine heartland of ancient olive groves, stone architecture, and profound cultural resilience.',
    overview: 'Centred in the historic Levant, Palestine is defined by its deep cultural heritage, ancient olive farming, biblical cities including Bethlehem and Hebron, and stone craft.',
    areaKm2: 6020,
    coastlineKm: 40,
    borders: [
      { iso3: 'ISR', name: 'Israel', lengthKm: 358 },
      { iso3: 'JOR', name: 'Jordan', lengthKm: 148 },
      { iso3: 'EGY', name: 'Egypt', lengthKm: 13 },
    ],
    highestName: 'Mount Nabi Yunis',
    highestElevation: 1030,
    lowestName: 'Dead Sea',
    lowestElevation: -430,
    timezone: 'Asia/Gaza (UTC+2)',
    coordinates: [31.9522, 35.2332],
    population: 5480000,
    medianAge: 20.8,
    urbanizationRate: 77.2,
    lifeExpectancy: 73.5,
    fertilityRate: 3.4,
    gdpNominalUsdBillions: 18.0,
    gdpPppUsdBillions: 30.0,
    gdpPerCapitaPppUsd: 5700,
    currencyCode: 'ILS',
    currencyName: 'Israeli New Shekel',
    currencySymbol: '₪',
    isPegged: false,
    fallbackRate: 3.75,
    literacyRate: 97.5,
    tertiaryEnrollment: 43.0,
    safetyIndex: 44.0,
    crimeIndex: 56.0,
    peaceIndexRank: 151,
    peaceIndexScore: 3.10,
    koppenCode: 'Csa',
    koppenTitle: 'Mediterranean to Semi-Arid',
    climateSummary: 'Mediterranean climate with warm, dry summers and mild, rainy winters; desert conditions in the Jordan Valley.',
    avgTemp: 18.5,
    avgRainfall: 520,
    unescoCount: 4,
    landmarks: [
      { name: 'Church of the Nativity', location: 'Bethlehem', description: 'Grotto venerated as the birthplace of Jesus, commissioned by Constantine in 327 AD.', imageUrl: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&auto=format&fit=crop' },
      { name: 'Old City of Hebron (Al-Khalil)', location: 'Hebron', description: 'Mamluk-era limestone architecture and Sanctuary of Abraham (Ibrahimi Mosque).', imageUrl: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=800&auto=format&fit=crop' },
    ],
    culinaryTraditions: [
      { name: 'Musakhan', description: 'Roasted sumac-spiced chicken baked over taboon flatbread with caramelized onions and pine nuts.' },
      { name: 'Maqluba', description: 'Layered meat, fried eggplant, cauliflower, and spiced rice inverted onto a platter.' },
    ],
    languages: [
      { name: 'Arabic', isOfficial: true },
    ],
    mainIndustries: ['Construction', 'Services & Public Sector', 'Agriculture (olives & citrus)', 'Stone & Marble', 'Handicrafts & Textiles'],
    topExports: ['Stone & marble', 'Olives & olive oil', 'Processed food', 'Textiles'],
});
