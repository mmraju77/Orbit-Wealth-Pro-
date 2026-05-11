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
  expectedInflation: number;
}

export interface RetirementResult {
  totalSavings: number;
  totalContributions: number;
  totalInterest: number;
  inflationAdjustedCorpus: number;
  yearlyData: { year: number; balance: number; inflatedBalance: number }[];
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

export interface InvestmentInputs {
  investmentAmount: number;
  monthlyInvestment?: number;
  expectedReturn: number;
  duration: number;
  compoundingFrequency?: 'Monthly' | 'Quarterly' | 'Yearly';
}

export interface InvestmentResult {
  investedAmount: number;
  estimatedReturns: number;
  totalWealth: number;
  yearlyData: { year: number; balance: number }[];
}

export interface LoanEligibilityInputs {
  monthlyIncome: number;
  monthlyObligations: number;
  interestRate: number;
  loanTerm: number;
  maxFOIR: number; // Fixed Obligation to Income Ratio
}

export interface LoanEligibilityResult {
  eligibleLoanAmount: number;
  monthlyEMI: number;
  totalPayable: number;
}

export interface MutualFundInputs {
  investmentAmount: number;
  expectedReturn: number;
  duration: number;
  expenseRatio: number;
}

export interface MutualFundResult {
  investedAmount: number;
  estimatedReturns: number;
  totalWealth: number;
  expenseRatioImpact: number;
  yearlyData: { year: number; balance: number }[];
}

export interface BalanceTransferInputs {
  outstandingPrincipal: number;
  existingRate: number;
  newRate: number;
  remainingTerm: number;
  processingFees: number;
}

export interface BalanceTransferResult {
  existingEMI: number;
  newEMI: number;
  monthlySavings: number;
  totalSavings: number;
  breakEvenMonths: number;
}

export interface GratuityInputs {
  monthlySalary: number; // Basic + DA
  yearsOfService: number;
  isCoveredUnderGratuityAct: boolean;
}

export interface GratuityResult {
  gratuityAmount: number;
}

export interface CurrencyConverterInputs {
  amount: number;
  from: string;
  to: string;
}

export interface GSTInputs {
  amount: number;
  taxSlab: number;
  isInclusive: boolean;
}

export interface GSTResult {
  netAmount: number;
  gstAmount: number;
  cgst?: number;
  sgst?: number;
  igst?: number;
  totalAmount: number;
}
