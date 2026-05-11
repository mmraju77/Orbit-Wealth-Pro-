/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, ReactNode } from 'react';

export type CurrencyCode = 'USD' | 'EUR' | 'GBP' | 'AED' | 'INR';
export type NumberSystem = 'International' | 'Indian';

interface LocaleContextType {
  currency: CurrencyCode;
  setCurrency: (code: CurrencyCode) => void;
  numberSystem: NumberSystem;
  setNumberSystem: (system: NumberSystem) => void;
  formatCurrency: (val: number) => string;
  formatValue: (val: number) => string;
  currencySymbol: string;
  labels: {
    loan: string;
    tax: string;
    jurisdiction: string;
  };
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

const CURRENCY_MAP: Record<CurrencyCode, { symbol: string; name: string; locale: string }> = {
  USD: { symbol: '$', name: 'USD', locale: 'en-US' },
  EUR: { symbol: '€', name: 'EUR', locale: 'de-DE' },
  GBP: { symbol: '£', name: 'GBP', locale: 'en-GB' },
  AED: { symbol: 'د.إ', name: 'AED', locale: 'ar-AE' },
  INR: { symbol: '₹', name: 'INR', locale: 'en-IN' },
};

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrency] = useState<CurrencyCode>('USD');
  const [numberSystem, setNumberSystem] = useState<NumberSystem>('International');

  const formatCurrency = (val: number) => {
    const locale = numberSystem === 'Indian' ? 'en-IN' : CURRENCY_MAP[currency].locale;
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(val);
  };

  const formatValue = (val: number) => {
    const locale = numberSystem === 'Indian' ? 'en-IN' : CURRENCY_MAP[currency].locale;
    return new Intl.NumberFormat(locale, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(val);
  };

  const getLabels = () => {
    const map: Record<CurrencyCode, any> = {
      USD: { loan: 'Mortgage', tax: 'Sales Tax', jurisdiction: 'Global' },
      EUR: { loan: 'Home Loan', tax: 'VAT', jurisdiction: 'Europe' },
      GBP: { loan: 'Home Loan', tax: 'VAT', jurisdiction: 'UK' },
      AED: { loan: 'Loan', tax: 'VAT', jurisdiction: 'UAE' },
      INR: { loan: 'Housing Loan', tax: 'GST', jurisdiction: 'India' },
    };
    return map[currency];
  };

  return (
    <LocaleContext.Provider value={{ 
      currency, 
      setCurrency, 
      numberSystem,
      setNumberSystem,
      formatCurrency, 
      formatValue,
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
