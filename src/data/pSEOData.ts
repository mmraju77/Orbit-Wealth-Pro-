/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface RegionData {
  name: string;
  currency: string;
  smartContent: string;
  taxContext?: string;
}

export interface CalculatorSEOData {
  title: string;
  description: string;
}

export const REGIONS: Record<string, RegionData> = {
  usa: {
    name: 'USA',
    currency: 'USD',
    smartContent: 'In the United States, financial planning often revolves around IRS regulations. Retirement savings are typically managed through 401(k) or IRA accounts. Mortgage rates are influenced by the Federal Reserve, and taxation follows a progressive federal bracket system along with state taxes where applicable.',
    taxContext: 'IRS & 401(k) Optimized'
  },
  india: {
    name: 'India',
    currency: 'INR',
    smartContent: 'India has a unique two-regime income tax system (Old vs New). Investments like PPF, ELSS, and NPS are popular for tax savings under Section 80C. Bank FDs and RDs are staple low-risk instruments, while GST (Goods and Services Tax) governs indirect taxation across most sectors.',
    taxContext: 'Income Tax Act & GST Compliant'
  },
  uae: {
    name: 'UAE',
    currency: 'AED',
    smartContent: 'The UAE is known for its tax-favorable environment, with zero personal income tax. Corporate tax was recently introduced at 9% for certain brackets. VAT is standardized at 5%. Financial planning here focuses on wealth preservation and real estate investments in major hubs like Dubai and Abu Dhabi.',
    taxContext: 'Zero Income Tax & 5% VAT'
  },
  uk: {
    name: 'United Kingdom',
    currency: 'GBP',
    smartContent: 'Financial norms in the UK include ISAs for tax-free savings and the State Pension system. Income tax is calculated through HMRC PAYE or Self Assessment. Mortgage products often involve fixed-rate periods followed by variable rates linked to the Bank of England base rate.',
    taxContext: 'HMRC & ISA Integration'
  },
  canada: {
    name: 'Canada',
    currency: 'CAD',
    smartContent: 'Canada utilizes TFSA (Tax-Free Savings Account) and RRSP (Registered Retirement Savings Plan) for long-term wealth building. Taxation is handled by the CRA at both federal and provincial levels. Housing loans are typically amortized over 25 years with varying term lengths.',
    taxContext: 'CRA & TFSA/RRSP Standards'
  },
  australia: {
    name: 'Australia',
    currency: 'AUD',
    smartContent: 'The Australian financial system is built on Superannuation for retirement. Negative gearing is a common strategy in property investment. Goods and Services Tax (GST) is at 10%, and the ATO enforces a progressive income tax scale.',
    taxContext: 'ATO & Superannuation Ready'
  }
};

export const CALCULATORS: Record<string, CalculatorSEOData> = {
  'mortgage': {
    title: 'Mortgage Calculator',
    description: 'Estimate your monthly mortgage payments, including principal and interest.'
  },
  'retirement': {
    title: 'Retirement Planner',
    description: 'Plan your future corpus by considering current savings, inflation, and expected returns.'
  },
  'income-tax': {
    title: 'Income Tax Calculator',
    description: 'Calculate your annual tax liability and compare different taxation regimes.'
  },
  'gst': {
    title: 'GST / VAT Calculator',
    description: 'Quickly compute Goods and Services Tax or Value Added Tax for any price.'
  },
  'fd-rd': {
    title: 'FD & RD Calculator',
    description: 'Analyze maturity values for Fixed Deposits and Recurring Deposits with compounding.'
  },
  'sip': {
    title: 'SIP Calculator',
    description: 'Forecast the wealth generated via Systematic Investment Plans in Mutual Funds.'
  },
  'lumpsum': {
    title: 'Lumpsum Return Calculator',
    description: 'Estimate returns on one-time investments over long durations.'
  },
  'emi': {
    title: 'EMI Calculator',
    description: 'Calculate Equated Monthly Installments for any loan type with ease.'
  },
  'loan-eligibility': {
    title: 'Loan Eligibility Checker',
    description: 'Determine the maximum loan amount you can borrow based on income.'
  },
  'home-loan-transfer': {
    title: 'Home Loan Balance Transfer',
    description: 'See how much you can save by switching your loan to a lower interest rate.'
  },
  'gratuity': {
    title: 'Gratuity Calculator',
    description: 'Calculate the gratuity amount payable at the end of your employment.'
  },
  'currency-converter': {
    title: 'Currency Converter',
    description: 'Convert between global currencies with real-time exchange rate trends.'
  },
  'mutual-fund': {
    title: 'Mutual Fund Return Calculator',
    description: 'Determine the maturity value of your mutual fund investments.'
  }
};
