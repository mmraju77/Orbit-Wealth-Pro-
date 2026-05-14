/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export type CurrencyCode = 'USD' | 'EUR' | 'GBP' | 'AED' | 'INR' | 'CAD' | 'AUD' | 'NOK' | 'SEK' | 'DKK' | 'CHF';
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
  CAD: { symbol: 'C$', name: 'CAD', locale: 'en-CA' },
  AUD: { symbol: 'A$', name: 'AUD', locale: 'en-AU' },
  NOK: { symbol: 'kr', name: 'NOK', locale: 'nb-NO' },
  SEK: { symbol: 'kr', name: 'SEK', locale: 'sv-SE' },
  DKK: { symbol: 'kr', name: 'DKK', locale: 'da-DK' },
  CHF: { symbol: 'CHF', name: 'CHF', locale: 'de-CH' },
};

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrency] = useState<CurrencyCode>(() => {
    const saved = localStorage.getItem('user-currency');
    return (saved as CurrencyCode) || 'USD';
  });
  const [numberSystem, setNumberSystem] = useState<NumberSystem>(() => {
    const saved = localStorage.getItem('user-number-system');
    return (saved as NumberSystem) || 'International';
  });

  useEffect(() => {
    localStorage.setItem('user-currency', currency);
  }, [currency]);

  useEffect(() => {
    localStorage.setItem('user-number-system', numberSystem);
  }, [numberSystem]);

  useEffect(() => {
    // Only auto-detect if no preference is saved
    if (!localStorage.getItem('user-currency')) {
      const detectRegion = async () => {
        try {
          const res = await fetch('https://ipapi.co/json/');
          const data = await res.json();
          const countryCode = data.country_code;

          if (countryCode === 'IN') {
            setCurrency('INR');
            setNumberSystem('Indian');
          } else if (countryCode === 'AE') {
            setCurrency('AED');
          } else if (['GB', 'UK'].includes(countryCode)) {
            setCurrency('GBP');
          } else if (['NO', 'SE', 'DK', 'CH'].includes(countryCode)) {
            const map: any = { NO: 'NOK', SE: 'SEK', DK: 'DKK', CH: 'CHF' };
            setCurrency(map[countryCode]);
          } else if (countryCode === 'CA') {
            setCurrency('CAD');
          } else if (countryCode === 'AU') {
            setCurrency('AUD');
          } else if (['DE', 'FR', 'ES', 'IT', 'NL', 'BE', 'AT'].includes(countryCode)) {
            setCurrency('EUR');
          } else {
            setCurrency('USD');
          }
        } catch (error) {
          console.error('Failed to auto-detect region:', error);
        }
      };
      detectRegion();
    }
  }, []);

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
