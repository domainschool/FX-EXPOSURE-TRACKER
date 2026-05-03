import { useState, useEffect, useCallback } from 'react';

export interface ExchangeRateResponse {
  result: string;
  provider: string;
  documentation: string;
  terms_of_use: string;
  time_last_update_unix: number;
  time_last_update_utc: string;
  time_next_update_unix: number;
  time_next_update_utc: string;
  base_code: string;
  rates: {
    [key: string]: number;
  };
}

export interface HistoricalData {
  date: string;
  rate: number;
}

export interface FXData {
  rate: number | null;
  lastUpdated: string | null;
  history: HistoricalData[];
  loading: boolean;
  error: string | null;
  refresh: () => void;
}

export const useFXData = (base: string = 'EUR', target: string = 'USD'): FXData => {
  const [data, setData] = useState<number | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [history, setHistory] = useState<HistoricalData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://open.er-api.com/v6/latest/${base}`);
      if (!response.ok) {
        throw new Error('Failed to fetch exchange rate data');
      }
      const result: ExchangeRateResponse = await response.json();
      
      if (result.result === 'success' && result.rates[target]) {
        const currentRate = result.rates[target];
        setData(currentRate);
        setLastUpdated(new Date(result.time_last_update_unix * 1000).toLocaleString());

        // Generate 7 days of historical data (mocked for MVP)
        const mockHistory: HistoricalData[] = [];
        const now = new Date();
        for (let i = 6; i >= 0; i--) {
          const date = new Date(now);
          date.setDate(date.getDate() - i);
          
          // Generate a slightly random rate around the current rate for the past days
          // On day 0 (today), use the actual current rate
          const variance = i === 0 ? 0 : (Math.random() - 0.5) * 0.05;
          mockHistory.push({
            date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            rate: currentRate + variance
          });
        }
        setHistory(mockHistory);
      } else {
        throw new Error('Invalid data received from API');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  }, [base, target]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    rate: data,
    lastUpdated,
    history,
    loading,
    error,
    refresh: fetchData
  };
};
