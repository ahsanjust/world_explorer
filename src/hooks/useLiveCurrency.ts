import { useState, useEffect } from 'react';
import { fetchLiveExchangeRates, getExchangeRateForCurrency } from '../services/currencyService';
import { CurrencySourceType } from '../types/currency';

interface LiveCurrencyHookResult {
  rates: Record<string, number>;
  dateStr: string;
  source: CurrencySourceType;
  fetchedAt: number;
  isLoading: boolean;
  error: string | null;
  getRateFor: (currencyCode: string, isPegged?: boolean, peggedRate?: number) => { rate: number; inverseRate: number };
  convert: (amount: number, fromCode: string, toCode: string) => number;
}

export function useLiveCurrency(): LiveCurrencyHookResult {
  const [rates, setRates] = useState<Record<string, number>>({});
  const [dateStr, setDateStr] = useState<string>('2026-09-24');
  const [source, setSource] = useState<CurrencySourceType>('baseline-seed');
  const [fetchedAt, setFetchedAt] = useState<number>(Date.now());
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function loadRates() {
      try {
        setIsLoading(true);
        const result = await fetchLiveExchangeRates();
        if (mounted) {
          setRates(result.rates);
          setDateStr(result.date);
          setSource(result.source);
          setFetchedAt(result.fetchedAt);
          setError(null);
        }
      } catch (err: any) {
        if (mounted) {
          setError(err?.message || 'Failed to fetch rates');
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    }

    loadRates();

    return () => {
      mounted = false;
    };
  }, []);

  const getRateFor = (currencyCode: string, isPegged?: boolean, peggedRate?: number) => {
    return getExchangeRateForCurrency(rates, currencyCode, isPegged, peggedRate);
  };

  const convert = (amount: number, fromCode: string, toCode: string): number => {
    if (fromCode.toUpperCase() === toCode.toUpperCase()) return amount;
    const fromRate = getRateFor(fromCode).rate; // from per 1 USD
    const toRate = getRateFor(toCode).rate; // to per 1 USD
    if (!fromRate || !toRate) return amount;
    // Convert from -> USD -> to
    const amountInUsd = amount / fromRate;
    return amountInUsd * toRate;
  };

  return {
    rates,
    dateStr,
    source,
    fetchedAt,
    isLoading,
    error,
    getRateFor,
    convert,
  };
}
