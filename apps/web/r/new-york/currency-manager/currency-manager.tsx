"use client"

import { createContext, useContext, useState, ReactNode, useEffect, ComponentType, useCallback } from 'react'
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Loader, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

export type Currency = {
  code: string
  name: string
}

const CURRENCY_NAMES_API_URL = "https://cdn.jsdelivr.net/npm/@fgrreloaded/currencies@latest/v1/currencies.json";

const CURRENCY_CACHE_KEY = 'rigidui_currency_names';
const SELECTED_CURRENCY_KEY = 'rigidui_selected_currency';
const RATES_CACHE_KEY = 'rigidui_exchange_rates';
const CURRENCY_CACHE_DURATION = 24 * 60 * 60 * 1000;

interface CachedRates {
  rates: Record<string, number>;
  timestamp: number;
  baseCurrency: string;
}

interface CachedCurrencies {
  data: Currency[];
  timestamp: number;
}

const safeLocalStorage = {
  getItem: (key: string): string | null => {
    try {
      return typeof window !== 'undefined' ? localStorage.getItem(key) : null;
    } catch {
      return null;
    }
  },
  setItem: (key: string, value: string): void => {
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem(key, value);
      }
    } catch {
    }
  },
  removeItem: (key: string): void => {
    try {
      if (typeof window !== 'undefined') {
        localStorage.removeItem(key);
      }
    } catch {
    }
  }
};

const getCachedCurrencies = (): Currency[] | null => {
  try {
    const cached = safeLocalStorage.getItem(CURRENCY_CACHE_KEY);
    if (!cached) return null;

    const { data, timestamp }: CachedCurrencies = JSON.parse(cached);
    if (Date.now() - timestamp > CURRENCY_CACHE_DURATION) {
      safeLocalStorage.removeItem(CURRENCY_CACHE_KEY);
      return null;
    }
    return data;
  } catch {
    return null;
  }
};

const setCachedCurrencies = (currencies: Currency[]) => {
  try {
    safeLocalStorage.setItem(CURRENCY_CACHE_KEY, JSON.stringify({
      data: currencies,
      timestamp: Date.now()
    }));
  } catch {
  }
};

const getStoredCurrency = (): string | null => {
  return safeLocalStorage.getItem(SELECTED_CURRENCY_KEY);
};

const setStoredCurrency = (currencyCode: string) => {
  safeLocalStorage.setItem(SELECTED_CURRENCY_KEY, currencyCode);
};

const getCachedRates = (baseCurrency: string): { rates: Record<string, number>, timestamp: number } | null => {
  try {
    const cached = safeLocalStorage.getItem(RATES_CACHE_KEY);
    if (!cached) return null;

    const { rates, timestamp, baseCurrency: cachedBase }: CachedRates = JSON.parse(cached);

    if (cachedBase !== baseCurrency) return null;

    return { rates, timestamp };
  } catch {
    return null;
  }
};

const setCachedRates = (rates: Record<string, number>, baseCurrency: string) => {
  try {
    safeLocalStorage.setItem(RATES_CACHE_KEY, JSON.stringify({
      rates,
      timestamp: Date.now(),
      baseCurrency
    }));
  } catch {
  }
};

const shouldRefetchRates = (refetchIntervalMs?: number, lastFetchTimestamp?: number): boolean => {
  if (!refetchIntervalMs || !lastFetchTimestamp) return true;
  return Date.now() - lastFetchTimestamp > refetchIntervalMs;
};

const DefaultLoader = () => <Loader className='w-4 h-4 animate-spin dark:text-gray-300' />;

type CurrencyContextType = {
  currency: Currency | undefined
  setCurrency: (currency: Currency) => void
  formatValue: (value: number) => string
  convertValue: (value: number, fromCurrencyCode?: string) => number
  rates: Record<string, number>
  loadingRates: boolean
  ratesError: string | null
  LoaderComponent: ComponentType
  availableCurrencies: Currency[]
  loadingCurrencies: boolean
  currenciesError: string | null
  fixedBaseCurrencyCode: string
  lastRatesUpdate: number | null
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined)

interface CurrencyProviderProps {
  children: ReactNode;
  loaderComponent?: ComponentType;
  fixedBaseCurrencyCode: string;
  initialRates?: Record<string, number>;
  fetchRatesFunction?: () => Promise<Record<string, number>>;
  refetchIntervalMs?: number;
  defaultSelectedCurrencyCode?: string;
}

export function CurrencyProvider({
  children,
  loaderComponent = DefaultLoader,
  fixedBaseCurrencyCode,
  initialRates,
  fetchRatesFunction,
  refetchIntervalMs,
  defaultSelectedCurrencyCode = "inr",
}: CurrencyProviderProps) {
  const [availableCurrencies, setAvailableCurrencies] = useState<Currency[]>([])
  const [loadingCurrencies, setLoadingCurrencies] = useState(true);
  const [currenciesError, setCurrenciesError] = useState<string | null>(null);

  const [currency, setCurrency] = useState<Currency | undefined>(undefined)
  const [rates, setRates] = useState<Record<string, number>>(initialRates || {})
  const [loadingRates, setLoadingRates] = useState(false)
  const [ratesError, setRatesError] = useState<string | null>(null)
  const [lastRatesUpdate, setLastRatesUpdate] = useState<number | null>(null)

  useEffect(() => {
    const fetchCurrencyNames = async () => {
      setLoadingCurrencies(true);
      setCurrenciesError(null);

      const cachedCurrencies = getCachedCurrencies();
      if (cachedCurrencies && cachedCurrencies.length > 0) {
        setAvailableCurrencies(cachedCurrencies);

        const storedCurrencyCode = getStoredCurrency();
        const targetCurrency = storedCurrencyCode || defaultSelectedCurrencyCode;
        const selectedCurrency = cachedCurrencies.find(c => c.code === targetCurrency) || cachedCurrencies[0];
        setCurrency(selectedCurrency);

        setLoadingCurrencies(false);
        return;
      }

      try {
        const response = await fetch(CURRENCY_NAMES_API_URL);
        if (!response.ok) {
          throw new Error(`Failed to fetch currency names: ${response.statusText}`);
        }
        const data: Record<string, string> = await response.json();
        const loadedCurrencies: Currency[] = Object.entries(data)
          .map(([code, name]) => ({ code, name }))
          .sort((a, b) => a.name.localeCompare(b.name));

        setAvailableCurrencies(loadedCurrencies);
        setCachedCurrencies(loadedCurrencies);

        if (loadedCurrencies.length > 0) {
          const storedCurrencyCode = getStoredCurrency();
          const targetCurrency = storedCurrencyCode || defaultSelectedCurrencyCode;
          const selectedCurrency = loadedCurrencies.find(c => c.code === targetCurrency) || loadedCurrencies[0];
          setCurrency(selectedCurrency);
        } else {
          setCurrency(undefined);
        }

      } catch (err) {
        console.error("Currency names API error:", err);
        setCurrenciesError(err instanceof Error ? err.message : "Failed to fetch currency names");
        setAvailableCurrencies([]);
        setCurrency(undefined);
      } finally {
        setLoadingCurrencies(false);
      }
    };

    fetchCurrencyNames();
  }, [defaultSelectedCurrencyCode]);


  const handleFetchRates = useCallback(async () => {
    const cachedData = getCachedRates(fixedBaseCurrencyCode);
    if (cachedData && !shouldRefetchRates(refetchIntervalMs, cachedData.timestamp)) {
      setRates(cachedData.rates);
      setLastRatesUpdate(cachedData.timestamp);
      return;
    }

    if (!fetchRatesFunction) {
      if (initialRates) {
        setRates(initialRates);
        setCachedRates(initialRates, fixedBaseCurrencyCode);
        setLastRatesUpdate(Date.now());
      }
      return;
    }

    setLoadingRates(true);
    setRatesError(null);
    try {
      const newRates = await fetchRatesFunction();
      const timestamp = Date.now();
      setRates(newRates);
      setLastRatesUpdate(timestamp);
      setCachedRates(newRates, fixedBaseCurrencyCode);
      console.log(`Fetched new rates relative to base: ${fixedBaseCurrencyCode}`, newRates);
    } catch (err) {
      console.error("User provided fetchRatesFunction error:", err);
      setRatesError(err instanceof Error ? err.message : "Failed to fetch exchange rates via provided function");

      if (cachedData) {
        setRates(cachedData.rates);
        setLastRatesUpdate(cachedData.timestamp);
        console.log("Using cached rates as fallback");
      }
    } finally {
      setLoadingRates(false);
    }
  }, [fetchRatesFunction, fixedBaseCurrencyCode, initialRates, refetchIntervalMs]);

  useEffect(() => {
    handleFetchRates();

    if (fetchRatesFunction && refetchIntervalMs && refetchIntervalMs > 0) {
      const intervalId = setInterval(() => {
        if (shouldRefetchRates(refetchIntervalMs, lastRatesUpdate ?? undefined)) {
          handleFetchRates();
        }
      }, refetchIntervalMs);
      return () => clearInterval(intervalId);
    }
  }, [handleFetchRates, refetchIntervalMs, fetchRatesFunction, lastRatesUpdate]);


  const convertValue = useCallback((value: number, fromCurrencyCode?: string) => {
    if (!currency || Object.keys(rates).length === 0) return value;

    const toCurrencyCode = currency.code;
    const sourceCurrencyCode = fromCurrencyCode || fixedBaseCurrencyCode;

    if (sourceCurrencyCode === toCurrencyCode) return value;

    const effectiveRates = { ...rates, [fixedBaseCurrencyCode]: 1.0 };

    const fromRate = effectiveRates[sourceCurrencyCode];
    const toRate = effectiveRates[toCurrencyCode];

    if (typeof fromRate !== 'number' || typeof toRate !== 'number') {
      console.warn(`Cannot convert: Missing rate for ${sourceCurrencyCode} or ${toCurrencyCode}. Rates available:`, effectiveRates);
      return value;
    }

    const valueInBase = value / fromRate;
    return valueInBase * toRate;

  }, [currency, rates, fixedBaseCurrencyCode]);


  const formatValue = (value: number) => {
    if (!currency) return String(value);
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency.code,
      currencyDisplay: 'symbol',
    }).format(value)
  }

  const handleCurrencyChange = (newCurrency: Currency) => {
    setCurrency(newCurrency);
    setStoredCurrency(newCurrency.code);
  };

  const LoaderToShow = loaderComponent;

  if (loadingCurrencies) {
    return <div className="flex justify-center items-center min-h-[200px] p-4"><LoaderToShow /> <span className="ml-2">Loading currencies...</span></div>;
  }

  if (currenciesError) {
    return <div className="text-red-500 p-4">Error loading currencies: {currenciesError}</div>;
  }

  if (ratesError && Object.keys(rates).length === 0) {
    return (
      <div className="bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
        <p className="text-yellow-800 dark:text-yellow-200">
          <strong>Warning:</strong> Failed to fetch exchange rates: {ratesError}
          {initialRates && Object.keys(initialRates).length > 0 && (
            <span className="block mt-1 text-sm">Using initial rates as fallback.</span>
          )}
        </p>
      </div>
    );
  }

  return (
    <CurrencyContext.Provider value={{
      currency,
      setCurrency: handleCurrencyChange,
      formatValue,
      convertValue,
      rates,
      loadingRates,
      ratesError,
      LoaderComponent: loaderComponent,
      availableCurrencies,
      loadingCurrencies,
      currenciesError,
      fixedBaseCurrencyCode,
      lastRatesUpdate,
    }}>
      {children}
    </CurrencyContext.Provider>
  )
}

function useCurrency() {
  const context = useContext(CurrencyContext)
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider')
  }
  return context
}

export function CurrencySelector({ className }: { className?: string }) {
  const { currency, setCurrency, loadingRates, availableCurrencies, loadingCurrencies } = useCurrency()
  const [open, setOpen] = useState(false)

  if (loadingCurrencies || !currency) {
    return (
      <Button
        variant="outline"
        role="combobox"
        disabled={true}
        className={cn("w-[200px] justify-between", className)}
      >
        Loading currencies...
        <Loader className="ml-2 h-4 w-4 animate-spin" />
      </Button>
    )
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-fit justify-between", className)}
          disabled={loadingRates || availableCurrencies.length === 0}
        >
          {currency ? `${currency.code} - ${currency.name.slice(0, 20)}` : "Select currency..."}
          {/* <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" /> */}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput placeholder="Search currencies..." className="h-9" />
          <CommandList>
            <CommandEmpty>No currency found.</CommandEmpty>
            <CommandGroup>
              {availableCurrencies.map((c) => (
                <CommandItem
                  key={c.code}
                  value={`${c.code} ${c.name}`}
                  onSelect={() => {
                    setCurrency(c)
                    setOpen(false)
                  }}
                >
                  <div className="flex flex-col">
                    <span className="font-medium">{c.code}</span>
                    <span className="text-sm text-muted-foreground">{c.name}</span>
                  </div>
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      currency?.code === c.code ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

interface CurrencyDisplayProps {
  value: number
  className?: string
  sourceCurrency?: string
}

export function CurrencyDisplay({
  value,
  className,
  sourceCurrency
}: CurrencyDisplayProps) {
  const {
    formatValue,
    convertValue,
    loadingRates,
    LoaderComponent,
    currency,
    fixedBaseCurrencyCode
  } = useCurrency()

  const actualSourceCurrency = sourceCurrency || fixedBaseCurrencyCode;

  const convertedValue = currency ? convertValue(value, actualSourceCurrency) : value;

  return (
    <span className={cn("dark:text-gray-100", className)}>
      {loadingRates ? <span className='inline dark:text-gray-300'><LoaderComponent /></span> : formatValue(convertedValue)}
    </span>
  );
}
