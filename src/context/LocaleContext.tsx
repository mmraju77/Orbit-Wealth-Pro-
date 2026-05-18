/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { CurrencyCode, NumberSystem } from '../types';
import { resolveRegion } from '../data/pSEOData';

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
  AED: { symbol: 'AED', name: 'AED', locale: 'en-AE' },
  INR: { symbol: '₹', name: 'INR', locale: 'en-IN' },
  CAD: { symbol: '$', name: 'CAD', locale: 'en-CA' },
  AUD: { symbol: '$', name: 'AUD', locale: 'en-AU' },
  NOK: { symbol: 'kr', name: 'NOK', locale: 'nb-NO' },
  SEK: { symbol: 'kr', name: 'SEK', locale: 'sv-SE' },
  DKK: { symbol: 'kr', name: 'DKK', locale: 'da-DK' },
  CHF: { symbol: 'CHF', name: 'CHF', locale: 'de-CH' },
};

export function LocaleProvider({ children }: { children: ReactNode }) {
  // Use a state but sync it from the synchronizer component
  const [currency, setCurrency] = useState<CurrencyCode>('USD');
  const [numberSystem, setNumberSystem] = useState<NumberSystem>('International');

  // Core formatting engine
  const formatCurrency = (val: number) => {
    const localeConfig = CURRENCY_MAP[currency] || CURRENCY_MAP.USD;
    const locale = numberSystem === 'Indian' ? 'en-IN' : localeConfig.locale;
    
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(val);
  };

  const formatValue = (val: number) => {
    const localeConfig = CURRENCY_MAP[currency] || CURRENCY_MAP.USD;
    const locale = numberSystem === 'Indian' ? 'en-IN' : localeConfig.locale;
    
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
      CAD: { loan: 'Mortgage', tax: 'HST/GST', jurisdiction: 'Canada' },
      AUD: { loan: 'Home Loan', tax: 'GST', jurisdiction: 'Australia' },
      NOK: { loan: 'Lån', tax: 'MVA', jurisdiction: 'Norway' },
      SEK: { loan: 'Lån', tax: 'Moms', jurisdiction: 'Sweden' },
      DKK: { loan: 'Lån', tax: 'Moms', jurisdiction: 'Denmark' },
      CHF: { loan: 'Kredit', tax: 'MwSt', jurisdiction: 'Switzerland' },
    };
    return map[currency] || map['USD'];
  };

  return (
    <LocaleContext.Provider value={{ 
      currency, 
      setCurrency, 
      numberSystem,
      setNumberSystem,
      formatCurrency, 
      formatValue,
      currencySymbol: (CURRENCY_MAP[currency] || CURRENCY_MAP.USD).symbol,
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
