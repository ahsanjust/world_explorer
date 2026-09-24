export interface CurrencySpec {
  code: string; // e.g. "QAR", "JPY", "CHF", "USD"
  name: string; // e.g. "Qatari Riyal"
  symbol: string; // e.g. "ر.ق", "¥", "CHF", "$"
  fractionalUnit?: string; // "Dirham", "Cent", "Sen"
  isPegged: boolean;
  peggedToCurrency?: string; // "USD"
  peggedRate?: number; // 3.64
  fallbackUsdRate: number; // Baseline exchange rate per 1 USD
}

export type CurrencySourceType = 'central-bank-live' | 'ecb-fallback' | 'cached-local' | 'baseline-seed';

export interface LiveRateRecord {
  base: string; // "USD"
  targetCode: string;
  rate: number; // 1 USD = rate units of targetCode
  inverseRate: number; // 1 targetCode = inverseRate USD
  timestamp: number;
  dateStr: string; // "2026-09-24"
  source: CurrencySourceType;
  sourceAttribution: string;
}

export interface CachedExchangeData {
  base: string; // "USD"
  date: string;
  rates: Record<string, number>;
  fetchedAt: number; // Date.now()
  source: CurrencySourceType;
}
