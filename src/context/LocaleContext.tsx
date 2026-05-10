/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, ReactNode } from 'react';

export type CurrencyCode = 'USD' | 'GBP' | 'EUR' | 'AUD' | 'CAD' | 'INR';

interface LocaleContextType {
  currency: CurrencyCode;
  setCurrency: (code: CurrencyCode) => void;
  formatCurrency: (val: number) => string;
  currencySymbol: string;
  labels: {
    loan: string;
    tax: string;
  };
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

const CURRENCY_MAP: Record<CurrencyCode, { symbol: string; name: string }> = {
  USD: { symbol: '$', name: 'USD' },
  GBP: { symbol: '£', name: 'GBP' },
  EUR: { symbol: '€', name: 'EUR' },
  AUD: { symbol: '$', name: 'AUD' },
  CAD: { symbol: '$', name: 'CAD' },
  INR: { symbol: '₹', name: 'INR' },
};

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrency] = useState<CurrencyCode>('USD');

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      maximumFractionDigits: 0,
    }).format(val);
  };

  const getLabels = () => {
    if (currency === 'USD') return { loan: 'Mortgage', tax: 'Sales Tax' };
    if (currency === 'GBP') return { loan: 'Home Loan', tax: 'VAT' };
    if (currency === 'EUR') return { loan: 'Bank Loan', tax: 'VAT' };
    return { loan: 'Loan', tax: 'Tax / GST' };
  };

  return (
    <LocaleContext.Provider value={{ 
      currency, 
      setCurrency, 
      formatCurrency, 
      currencySymbol: CURRENCY_MAP[currency].symbol,
      labels: getLabels() 
    }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) throw new Error('useLocale must be used within LocaleProvider');
  return context;
}
