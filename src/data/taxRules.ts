/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface TaxBracket {
  limit: number | null; // null means infinity
  rate: number;
}

export interface CountryTaxRules {
  currency: string;
  brackets: TaxBracket[];
  standardDeduction: number;
  additionalTaxes?: {
    name: string;
    rate: number;
    type: 'income_percent' | 'tax_percent';
  }[];
}

export const REGIONAL_TAX_RULES: Record<string, CountryTaxRules> = {
  usa: {
    currency: 'USD',
    brackets: [
      { limit: 11600, rate: 0.10 },
      { limit: 47150, rate: 0.12 },
      { limit: 100525, rate: 0.22 },
      { limit: 191950, rate: 0.24 },
      { limit: 243725, rate: 0.32 },
      { limit: 609350, rate: 0.35 },
      { limit: null, rate: 0.37 },
    ],
    standardDeduction: 14600,
  },
  india: {
    currency: 'INR',
    brackets: [
      { limit: 300000, rate: 0 },
      { limit: 600000, rate: 0.05 },
      { limit: 900000, rate: 0.10 },
      { limit: 1200000, rate: 0.15 },
      { limit: 1500000, rate: 0.20 },
      { limit: null, rate: 0.30 },
    ],
    standardDeduction: 50000,
    additionalTaxes: [{ name: 'Cess', rate: 0.04, type: 'tax_percent' }]
  },
  uk: {
    currency: 'GBP',
    brackets: [
      { limit: 12570, rate: 0 },
      { limit: 50270, rate: 0.20 },
      { limit: 125140, rate: 0.40 },
      { limit: null, rate: 0.45 },
    ],
    standardDeduction: 0,
    additionalTaxes: [{ name: 'National Insurance', rate: 0.08, type: 'income_percent' }] // Simplified Class 1
  },
  canada: {
    currency: 'CAD',
    brackets: [
      { limit: 55867, rate: 0.15 },
      { limit: 111733, rate: 0.205 },
      { limit: 173205, rate: 0.26 },
      { limit: 246752, rate: 0.29 },
      { limit: null, rate: 0.33 },
    ],
    standardDeduction: 15705,
    additionalTaxes: [{ name: 'Provincial Tax (Avg)', rate: 0.10, type: 'income_percent' }]
  },
  australia: {
    currency: 'AUD',
    brackets: [
      { limit: 18200, rate: 0 },
      { limit: 45000, rate: 0.16 },
      { limit: 135000, rate: 0.30 },
      { limit: 190000, rate: 0.37 },
      { limit: null, rate: 0.45 },
    ],
    standardDeduction: 0,
    additionalTaxes: [{ name: 'Medicare Levy', rate: 0.02, type: 'income_percent' }]
  },
  germany: {
    currency: 'EUR',
    brackets: [
      { limit: 11604, rate: 0 },
      { limit: 66760, rate: 0.24 }, // Simplified linear
      { limit: 277825, rate: 0.42 },
      { limit: null, rate: 0.45 },
    ],
    standardDeduction: 1230,
    additionalTaxes: [{ name: 'Solidarity Surcharge', rate: 0.055, type: 'tax_percent' }]
  },
  netherlands: {
    currency: 'EUR',
    brackets: [
      { limit: 75518, rate: 0.3697 },
      { limit: null, rate: 0.4950 },
    ],
    standardDeduction: 0,
  },
  norway: {
    currency: 'NOK',
    brackets: [
      { limit: 208050, rate: 0.22 }, // Base tax
      { limit: 292850, rate: 0.237 }, // Base + Step 1
      { limit: 670000, rate: 0.26 }, // Base + Step 2
      { limit: 937900, rate: 0.355 }, // Base + Step 3
      { limit: 1350000, rate: 0.385 }, // Base + Step 4
      { limit: null, rate: 0.395 }, // Base + Step 5
    ],
    standardDeduction: 104450,
  },
  sweden: {
    currency: 'SEK',
    brackets: [
      { limit: 615300, rate: 0.32 }, // Municipal only
      { limit: null, rate: 0.52 }, // Municipal + State
    ],
    standardDeduction: 16800,
  },
  denmark: {
    currency: 'DKK',
    brackets: [
      { limit: 50000, rate: 0.08 }, // AM-bidrag approx
      { limit: 588900, rate: 0.37 },
      { limit: null, rate: 0.52 },
    ],
    standardDeduction: 49700,
  },
  switzerland: {
    currency: 'CHF',
    brackets: [
      { limit: 14800, rate: 0 },
      { limit: 32200, rate: 0.02 },
      { limit: 42500, rate: 0.04 },
      { limit: 56900, rate: 0.06 },
      { limit: 106000, rate: 0.08 },
      { limit: 179000, rate: 0.10 },
      { limit: null, rate: 0.115 },
    ],
    standardDeduction: 0,
  },
  uae: {
    currency: 'AED',
    brackets: [{ limit: null, rate: 0 }],
    standardDeduction: 0,
  }
};
