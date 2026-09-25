import { CountryProfile } from '../../types/country';
import { buildSovereignProfile } from './sovereignDossier';

/**
 * Yemen — full sovereign dossier (subregion: arabian-peninsula).
 *
 * Seed fields are the country's own; the shared builder in `sovereignDossier.ts`
 * supplies the fields that are still awaiting per-country research.
 */
export const YEMEN: CountryProfile = buildSovereignProfile({
    id: 'yemen',
    iso2: 'YE',
    iso3: 'YEM',
    unCode: '887',
    name: 'Yemen',
    officialName: 'Republic of Yemen',
    nativeCommon: 'اليمن',
    nativeOfficial: 'الجمهورية اليمنية',
    subregionId: 'arabian-peninsula',
    capitalName: "Sana'a",
    capitalCoords: [15.3694, 44.1910],
    majorCities: ["Sana'a", 'Aden', 'Taiz', 'Al Hudaydah', 'Ibb', 'Mukalla'],
    flagEmoji: '🇾🇪',
    flagColors: ['#CE1126', '#FFFFFF', '#000000'],
    tagline: 'Ancient crossroads of the frankincense trade, famous for high-altitude clay skyscrapers and Socotra archipelago.',
    overview: 'Located at the southern tip of the Arabian Peninsula, Yemen possesses thousands of years of architectural heritage, from Sana’a’s multistory ram-earth towers to Socotra’s alien dragon blood trees.',
    areaKm2: 527968,
    coastlineKm: 1906,
    borders: [
      { iso3: 'SAU', name: 'Saudi Arabia', lengthKm: 1458 },
      { iso3: 'OMN', name: 'Oman', lengthKm: 288 },
    ],
    highestName: "Jabal an Nabi Shu'ayb",
    highestElevation: 3666,
    lowestName: 'Arabian Sea',
    lowestElevation: 0,
    timezone: 'Asia/Aden (UTC+3)',
    coordinates: [15.5527, 48.5164],
    population: 34400000,
    medianAge: 20.2,
    urbanizationRate: 39.2,
    lifeExpectancy: 66.1,
    fertilityRate: 3.6,
    gdpNominalUsdBillions: 21.0,
    gdpPppUsdBillions: 69.0,
    gdpPerCapitaPppUsd: 2050,
    currencyCode: 'YER',
    currencyName: 'Yemeni Rial',
    currencySymbol: '﷼',
    isPegged: false,
    fallbackRate: 250.0,
    literacyRate: 70.1,
    tertiaryEnrollment: 10.2,
    safetyIndex: 28.5,
    crimeIndex: 71.5,
    peaceIndexRank: 162,
    peaceIndexScore: 3.44,
    koppenCode: 'BWh',
    koppenTitle: 'Hot Desert to Highland Temperate',
    climateSummary: 'Arid coastal plains; temperate highland plateaus with monsoon rain in summer.',
    avgTemp: 21.0,
    avgRainfall: 120,
    unescoCount: 5,
    landmarks: [
      { name: "Old City of Sana'a", location: "Sana'a", description: 'Centuries-old multi-storey rammed earth tower-houses decorated with geometric plasterwork.', imageUrl: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=800&auto=format&fit=crop' },
      { name: 'Dragon Blood Forest', location: 'Socotra Island', description: 'Endemic umbrella-shaped dragon blood trees on the UNESCO-protected Indian Ocean archipelago.', imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop' },
    ],
    culinaryTraditions: [
      { name: 'Saltah', description: 'Boiled meat stew topped with frothy fenugreek paste (holba) and served bubbling in a stone pot.' },
      { name: 'Mandi', description: 'Slow-roasted spiced meat over aromatic rice cooked in a subterranean tandoor pit.' },
    ],
    languages: [
      { name: 'Arabic', isOfficial: true },
    ],
    mainIndustries: ['Oil & Gas', 'Agriculture (coffee & honey)', 'Port Services', 'Fishing', 'Livestock'],
    topExports: ['Crude oil', 'Coffee', 'Fish & seafood', 'Honey', 'Cotton'],
});
