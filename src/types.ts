/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

export type CurrencyCode = 'USD' | 'EUR' | 'GBP' | 'INR' | 'AUD' | 'CAD' | 'CHF' | 'AED' | 'NOK' | 'SEK' | 'DKK' | 'SGD';
export type NumberSystem = 'Indian' | 'International';

export interface Goal {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  target: number;
  current: number;
  years: number;
  annualReturn: number;
  color: string;
  accent: string;
}

export interface Insight {
  icon: React.ReactNode;
  title: string;
  text: string;
  type: 'positive' | 'action' | 'warning';
  deepDive: {
    analysis: string;
    actionSteps: string[];
    projection: string;
  };
}

export interface AmortizationPeriod {
  period: number;
  payment: number;
  principal: number;
  interest: number;
  remainingBalance: number;
  totalInterestPaid: number;
}

export interface MortgageInputs {
  homePrice: number;
  downPayment: number;
  downPaymentPercent: number;
  interestRate: number;
  loanTerm: number;
}

export interface RetirementInputs {
  currentAge: number;
  retirementAge: number;
  currentSavings: number;
  monthlyContribution: number;
  expectedReturn: number;
  expectedInflation: number;
}

export interface RetirementResult {
  totalSavings: number;
  totalContributions: number;
  totalInterest: number;
  inflationAdjustedCorpus: number;
  yearlyData: Array<{
    year: number;
    balance: number;
    inflatedBalance: number;
  }>;
}

export interface InvestmentInputs {
  investmentAmount?: number;
  monthlyInvestment?: number;
  expectedReturn: number;
  duration: number;
}

export interface InvestmentResult {
  investedAmount: number;
  estimatedReturns: number;
  totalWealth: number;
  yearlyData: Array<{
    year: number;
    balance: number;
  }>;
}

export interface BalanceTransferInputs {
  outstandingPrincipal: number;
  existingRate: number;
  newRate: number;
  remainingTerm: number;
  processingFees: number;
}

export interface MutualFundInputs {
  investmentAmount: number;
  expectedReturn: number;
  duration: number;
  expenseRatio: number;
  monthlyInvestment?: number;
}

export interface GratuityInputs {
  monthlySalary: number;
  yearsOfService: number;
  isCoveredUnderGratuityAct: boolean;
}

export interface TaxInputs {
  annualIncome: number;
  deductions: number;
  age: number;
}

export interface LoanEligibilityInputs {
  monthlyIncome: number;
  monthlyObligations: number;
  interestRate: number;
  loanTerm: number;
  maxFOIR: number;
  currentEMI?: number;
  tenure?: number;
}
