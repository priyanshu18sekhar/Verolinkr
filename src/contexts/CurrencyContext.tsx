'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Currency = 'INR' | 'USD';
type CurrencySymbol = '₹' | '$';

interface CurrencyContextType {
  currency: Currency;
  symbol: CurrencySymbol;
  setCurrency: (currency: Currency) => void;
  formatAmount: (amount: number) => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>('INR');

  useEffect(() => {
    // Load saved currency preference from localStorage
    const savedCurrency = localStorage.getItem('preferredCurrency') as Currency;
    if (savedCurrency && (savedCurrency === 'INR' || savedCurrency === 'USD')) {
      setCurrencyState(savedCurrency);
    } else {
      // Default to INR for Indian market
      setCurrencyState('INR');
    }
  }, []);

  const setCurrency = (newCurrency: Currency) => {
    setCurrencyState(newCurrency);
    localStorage.setItem('preferredCurrency', newCurrency);
  };

  const formatAmount = (amount: number): string => {
    if (currency === 'INR') {
      return `₹${amount.toLocaleString('en-IN')}`;
    } else {
      return `$${amount.toLocaleString('en-US')}`;
    }
  };

  const symbol: CurrencySymbol = currency === 'INR' ? '₹' : '$';

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        symbol,
        setCurrency,
        formatAmount,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
}

