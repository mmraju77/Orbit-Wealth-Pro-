/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface AmortizationPeriod {
  period: number;
  payment: number;
  principal: number;
  interest: number;
  remainingBalance: number;
  totalInterestPaid: number;
}

export interface MortgageResult {
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
  amortizationSchedule: AmortizationPeriod[];
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
}

export interface RetirementResult {
  totalSavings: number;
  totalContributions: number;
  totalInterest: number;
  yearlyData: { year: number; balance: number }[];
}

export interface TaxInputs {
  amount: number;
  taxRate: number;
  isAddingTax: boolean;
}

export interface TaxResult {
  originalAmount: number;
  taxAmount: number;
  totalAmount: number;
}
