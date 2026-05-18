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

const getInitialLocale = () => {
  try {
    const hash = window.location.hash || '';
    const path = window.location.pathname || '';
    const allParts = [...hash.split('/'), ...path.split('/')].filter(Boolean);
    
    // We need normalizeRegionKey and resolveRegion but they are in pSEOData
    // To avoid circular dependency if we import pSEOData into Context while App imports both
    // Let's just do a quick check here or move normalization logic
    const aliasMap: Record<string, { currency: CurrencyCode; system: NumberSystem }> = {
      'usa': { currency: 'USD', system: 'International' },
      'us': { currency: 'USD', system: 'International' },
      'india': { currency: 'INR', system: 'Indian' },
      'in': { currency: 'INR', system: 'Indian' },
      'uae': { currency: 'AED', system: 'International' },
      'uk': { currency: 'GBP', system: 'International' },
      'germany': { currency: 'EUR', system: 'International' },
      'de': { currency: 'EUR', system: 'International' },
      'switzerland': { currency: 'CHF', system: 'International' },
      'ch': { currency: 'CHF', system: 'International' },
      'norway': { currency: 'NOK', system: 'International' },
      'no': { currency: 'NOK', system: 'International' },
      'sweden': { currency: 'SEK', system: 'International' },
      'se': { currency: 'SEK', system: 'International' },
      'denmark': { currency: 'DKK', system: 'International' },
      'dk': { currency: 'DKK', system: 'International' },
      'netherlands': { currency: 'EUR', system: 'International' },
      'nl': { currency: 'EUR', system: 'International' },
      'canada': { currency: 'CAD', system: 'International' },
      'ca': { currency: 'CAD', system: 'International' },
      'australia': { currency: 'AUD', system: 'International' },
      'au': { currency: 'AUD', system: 'International' },
    };

    for (const part of allParts.reverse()) {
      const cleanPart = part.toLowerCase().replace('#', '');
      if (aliasMap[cleanPart]) {
        return aliasMap[cleanPart];
      }
    }
  } catch (e) {
    // SSR or other issues
  }
  return { currency: 'USD' as CurrencyCode, system: 'International' as NumberSystem };
};

export function LocaleProvider({ children }: { children: ReactNode }) {
  const initial = getInitialLocale();
  const [currency, setCurrency] = useState<CurrencyCode>(initial.currency);
  const [numberSystem, setNumberSystem] = useState<NumberSystem>(initial.system);

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
