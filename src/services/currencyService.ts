import { CachedExchangeData, LiveRateRecord, CurrencySourceType } from '../types/currency';

const CACHE_KEY = 'world_explorer_fx_cache_v1';
const CACHE_TTL_MS = 6 * 60 * 60 * 1000; // 6 hours

// In-memory cache for fast repeated lookups during runtime
let memoryRates: Record<string, number> | null = null;
let memoryMeta: { date: string; fetchedAt: number; source: CurrencySourceType } | null = null;

// Baseline seed fallback in case both CDNs fail (offline mode)
const BASELINE_SEED_RATES: Record<string, number> = {
  usd: 1.0,
  qar: 3.64, // Pegged Qatari Riyal
  aed: 3.6725, // Pegged UAE Dirham
  sar: 3.75, // Pegged Saudi Riyal
  kwd: 0.307, // Kuwaiti Dinar
  bhd: 0.376, // Pegged Bahraini Dinar
  omr: 0.385, // Pegged Omani Rial
  jod: 0.709, // Pegged Jordanian Dinar
  try: 34.2, // Turkish Lira
  egp: 48.6, // Egyptian Pound
  mad: 9.85, // Moroccan Dirham
  dzd: 134.5, // Algerian Dinar
  tnd: 3.08, // Tunisian Dinar
  ils: 3.72, // Israeli Shekel
  iqd: 1310.0, // Iraqi Dinar
  gel: 2.73, // Georgian Lari
  azn: 1.70, // Pegged Azerbaijani Manat
  amd: 387.0, // Armenian Dram
  afn: 69.5, // Afghan Afghani
  lbp: 89500.0, // Lebanese Pound
  syp: 13000.0, // Syrian Pound
  yer: 250.0, // Yemeni Rial
  sdg: 601.0, // Sudanese Pound
  lyd: 4.82, // Libyan Dinar
  irr: 42000.0, // Iranian Rial
  eur: 0.92, // Euro (Cyprus)
  bdt: 121.5, // Bangladeshi Taka
  gbp: 0.79,
  jpy: 153.4,
};

/**
 * Reads valid cached exchange rates from localStorage
 */
function getCachedRates(): CachedExchangeData | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw) as CachedExchangeData;
    const isExpired = Date.now() - data.fetchedAt > CACHE_TTL_MS;
    if (isExpired) {
      return null;
    }
    return data;
  } catch (err) {
    console.warn('[CurrencyService] Failed to parse localStorage cache:', err);
    return null;
  }
}

/**
 * Saves exchange rates to localStorage
 */
function setCachedRates(rates: Record<string, number>, date: string, source: CurrencySourceType) {
  try {
    const data: CachedExchangeData = {
      base: 'USD',
      date,
      rates,
      fetchedAt: Date.now(),
      source,
    };
    localStorage.setItem(CACHE_KEY, JSON.stringify(data));
    memoryRates = rates;
    memoryMeta = { date, fetchedAt: data.fetchedAt, source };
  } catch (err) {
    console.warn('[CurrencyService] Failed to write localStorage cache:', err);
  }
}

/**
 * Fetches latest exchange rates using multi-tier strategy:
 * 1. jsDelivr @fawazahmed0/currency-api (200+ currencies, CDN cached, keyless)
 * 2. Frankfurter API (European Central Bank reference rates)
 * 3. LocalStorage expired cache
 * 4. Hardcoded seed rates
 */
export async function fetchLiveExchangeRates(): Promise<{
  rates: Record<string, number>;
  date: string;
  source: CurrencySourceType;
  fetchedAt: number;
}> {
  // 1. Check memory cache
  if (memoryRates && memoryMeta && Date.now() - memoryMeta.fetchedAt < CACHE_TTL_MS) {
    return {
      rates: memoryRates,
      date: memoryMeta.date,
      source: memoryMeta.source,
      fetchedAt: memoryMeta.fetchedAt,
    };
  }

  // 2. Check localStorage cache
  const cached = getCachedRates();
  if (cached) {
    memoryRates = cached.rates;
    memoryMeta = { date: cached.date, fetchedAt: cached.fetchedAt, source: cached.source };
    return {
      rates: cached.rates,
      date: cached.date,
      source: cached.source,
      fetchedAt: cached.fetchedAt,
    };
  }

  // 3. Primary Network Request: jsDelivr open CDN
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000); // 4s timeout

    const res = await fetch('https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.min.json', {
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      const json = await res.json();
      if (json && json.usd) {
        const rates = json.usd as Record<string, number>;
        const date = json.date || new Date().toISOString().split('T')[0];
        setCachedRates(rates, date, 'central-bank-live');
        return { rates, date, source: 'central-bank-live', fetchedAt: Date.now() };
      }
    }
  } catch (err) {
    console.warn('[CurrencyService] Primary jsDelivr CDN failed, falling back to Frankfurter:', err);
  }

  // 4. Secondary Fallback: Frankfurter API (ECB rates)
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);

    const res = await fetch('https://api.frankfurter.dev/v1/latest?base=USD', {
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      const json = await res.json();
      if (json && json.rates) {
        const frankfurterRates: Record<string, number> = { usd: 1.0 };
        for (const [key, val] of Object.entries(json.rates)) {
          frankfurterRates[key.toLowerCase()] = Number(val);
        }
        // Merge with seed to ensure non-ECB currencies still exist
        const merged = { ...BASELINE_SEED_RATES, ...frankfurterRates };
        const date = json.date || new Date().toISOString().split('T')[0];
        setCachedRates(merged, date, 'ecb-fallback');
        return { rates: merged, date, source: 'ecb-fallback', fetchedAt: Date.now() };
      }
    }
  } catch (err) {
    console.warn('[CurrencyService] Secondary Frankfurter fallback failed:', err);
  }

  // 5. Stale cache fallback if available
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (raw) {
      const staleData = JSON.parse(raw) as CachedExchangeData;
      return {
        rates: staleData.rates,
        date: staleData.date,
        source: 'cached-local',
        fetchedAt: staleData.fetchedAt,
      };
    }
  } catch {
    // ignore
  }

  // 6. Final Offline Fallback: Baseline seed
  return {
    rates: BASELINE_SEED_RATES,
    date: '2026-09-24',
    source: 'baseline-seed',
    fetchedAt: Date.now(),
  };
}

/**
 * Resolves live exchange rate for a specific currency code relative to USD
 */
export function getExchangeRateForCurrency(
  rates: Record<string, number>,
  targetCode: string,
  isPegged?: boolean,
  peggedRate?: number
): { rate: number; inverseRate: number } {
  const codeLower = targetCode.toLowerCase();

  // If hard-pegged to USD (e.g. QAR = 3.64), provide official peg
  if (isPegged && peggedRate) {
    return {
      rate: peggedRate,
      inverseRate: 1 / peggedRate,
    };
  }

  if (rates[codeLower]) {
    const r = rates[codeLower];
    return {
      rate: r,
      inverseRate: r !== 0 ? 1 / r : 0,
    };
  }

  // Fallback to baseline or 1.0
  const baseline = BASELINE_SEED_RATES[codeLower] || 1.0;
  return {
    rate: baseline,
    inverseRate: 1 / baseline,
  };
}
