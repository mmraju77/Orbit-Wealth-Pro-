/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface RegionData {
  name: string;
  currency: string;
  smartContent: string;
  taxContext?: string;
  localInsights: string[];
}

export interface CalculatorSEOData {
  title: string;
  description: string;
  keywords: string;
}

export const REGIONS: Record<string, RegionData> = {
  usa: {
    name: 'USA',
    currency: 'USD',
    smartContent: 'In the United States, financial planning often revolves around IRS regulations. Retirement savings are typically managed through 401(k) or IRA accounts. Mortgage rates are influenced by the Federal Reserve, and taxation follows a progressive federal bracket system along with state taxes where applicable.',
    taxContext: 'IRS & 401(k) Optimized',
    localInsights: [
      'Maximize your 401(k) employer matching—it is essentially a 100% return on investment.',
      'Consider the tax-free growth benefits of a Roth IRA if you expect to be in a higher tax bracket later.',
      'Monitor your Credit Score (FICO) as it significantly impacts your mortgage APR.',
      'Be aware of State Income Taxes which vary from 0% in Florida/Texas to over 13% in California.',
      'Federal student loans in the US often have fixed interest rates and income-driven repayment plans.'
    ]
  },
  india: {
    name: 'India',
    currency: 'INR',
    smartContent: 'India has a unique two-regime income tax system (Old vs New). Investments like PPF, ELSS, and NPS are popular for tax savings under Section 80C. Bank FDs and RDs are staple low-risk instruments, while GST (Goods and Services Tax) governs indirect taxation across most sectors.',
    taxContext: 'Income Tax Act & GST Compliant',
    localInsights: [
      'The 80C limit allows deductions up to ₹1.5 Lakhs per year across standard instruments.',
      'Comparison between Old and New regimes is critical following recent Union Budget changes.',
      'EPF interest is tax-free up to specific annual contribution limits.'
    ]
  },
  uae: {
    name: 'UAE',
    currency: 'AED',
    smartContent: 'The UAE is known for its tax-favorable environment, with zero personal income tax. Corporate tax was recently introduced at 9% for certain brackets. VAT is standardized at 5%. Financial planning here focuses on wealth preservation and real estate investments in major hubs like Dubai and Abu Dhabi.',
    taxContext: 'Zero Income Tax & 5% VAT',
    localInsights: [
      'Enjoy 0% personal income tax on salaries and investment returns.',
      'Dubai and Abu Dhabi offer Golden Visa opportunities for significant property investors.',
      'UAE Dirham (AED) is pegged firmly to the US Dollar ($1 = 3.6725 AED), ensuring stability for expats.',
      'Gratuity payments under the UAE Labour Law act as a significant end-of-service benefit.'
    ]
  },
  uk: {
    name: 'United Kingdom',
    currency: 'GBP',
    smartContent: 'Financial norms in the UK include ISAs for tax-free savings and the State Pension system. Income tax is calculated through HMRC PAYE or Self Assessment. Mortgage products often involve fixed-rate periods followed by variable rates linked to the Bank of England base rate.',
    taxContext: 'HMRC & ISA Integration',
    localInsights: [
      'Utilize the £20,000 annual ISA limit for tax-free savings and investments.',
      'Pension auto-enrolment ensures employer contributions to your retirement pot.',
      'Stamp Duty Land Tax (SDLT) thresholds apply differently for first-time buyers.',
      'UK Student Loans (Plan 2, 5, etc.) are repaid via the PAYE system once your income exceeds a threshold.'
    ]
  },
  canada: {
    name: 'Canada',
    currency: 'CAD',
    smartContent: 'Canada utilizes TFSA (Tax-Free Savings Account) and RRSP (Registered Retirement Savings Plan) for long-term wealth building. Taxation is handled by the CRA at both federal and provincial levels. Housing loans are typically amortized over 25 years with varying term lengths.',
    taxContext: 'CRA & TFSA/RRSP Standards',
    localInsights: [
      'TFSA contributions are not tax-deductible, but withdrawals are completely tax-free.',
      'RRSP contributions reduce your taxable income for the current year.',
      'First-Time Home Buyer Incentive can help lower monthly mortgage costs.'
    ]
  },
  australia: {
    name: 'Australia',
    currency: 'AUD',
    smartContent: 'The Australian financial system is built on Superannuation for retirement. Negative gearing is a common strategy in property investment. Goods and Services Tax (GST) is at 10%, and the ATO enforces a progressive income tax scale.',
    taxContext: 'ATO & Superannuation Ready',
    localInsights: [
      'Superannuation Guarantee (SG) is currently 11% and scheduled to increase.',
      'Negative gearing allows you to offset investment losses against your taxable income.',
      'Medicare Levy of 2.0% applies to help fund the national healthcare system.',
      'HECS-HELP loans in Australia are indexation-linked and repaid through the tax system based on your income.'
    ]
  }
};

export const CALCULATORS: Record<string, CalculatorSEOData> = {
  'mortgage': {
    title: 'Mortgage Calculator',
    description: 'Estimate your monthly mortgage payments, including principal and interest.',
    keywords: 'home loan, mortgage estimator, amortization schedule'
  },
  'retirement': {
    title: 'Retirement Planner',
    description: 'Plan your future corpus by considering current savings, inflation, and expected returns.',
    keywords: 'pension plan, retirement savings, future wealth'
  },
  'income-tax': {
    title: 'Income Tax Calculator',
    description: 'Calculate your annual tax liability and compare different taxation regimes.',
    keywords: 'income tax, tax return, salary net pay'
  },
  'gst': {
    title: 'GST / VAT Calculator',
    description: 'Quickly compute Goods and Services Tax or Value Added Tax for any price.',
    keywords: 'tax calculation, business tax, invoice vat'
  },
  'fd-rd': {
    title: 'FD & RD Calculator',
    description: 'Analyze maturity values for Fixed Deposits and Recurring Deposits with compounding.',
    keywords: 'fixed deposit, recurring deposit, bank interest'
  },
  'sip': {
    title: 'SIP Calculator',
    description: 'Forecast the wealth generated via Systematic Investment Plans in Mutual Funds.',
    keywords: 'systematic investment, mutual fund, wealth building'
  },
  'lumpsum': {
    title: 'Lumpsum Return Calculator',
    description: 'Estimate returns on one-time investments over long durations.',
    keywords: 'one time investment, compound interest, return estimator'
  },
  'emi': {
    title: 'EMI Calculator',
    description: 'Calculate Equated Monthly Installments for any loan type with ease.',
    keywords: 'loan emi, car loan, personal loan emi'
  },
  'loan-eligibility': {
    title: 'Loan Eligibility Checker',
    description: 'Determine the maximum loan amount you can borrow based on income.',
    keywords: 'borrowing power, loan capacity, credit check'
  },
  'home-loan-transfer': {
    title: 'Home Loan Balance Transfer',
    description: 'See how much you can save by switching your loan to a lower interest rate.',
    keywords: 'loan refinancing, interest savings, balance transfer'
  },
  'gratuity': {
    title: 'Gratuity Calculator',
    description: 'Calculate the gratuity amount payable at the end of your employment.',
    keywords: 'labor law, end of service, employee benefit'
  },
  'currency-converter': {
    title: 'Currency Converter',
    description: 'Convert between global currencies with real-time exchange rate trends.',
    keywords: 'forex conversion, exchange rate, currency pairs'
  },
  'mutual-fund': {
    title: 'Mutual Fund Return Calculator',
    description: 'Determine the maturity value of your mutual fund investments.',
    keywords: 'mf returns, equity investment, fund growth'
  },
  'savings': {
    title: 'Savings & Growth Calculator',
    description: 'Calculate the growth of your savings account or fixed deposits over time with compound interest.',
    keywords: 'savings growth, compound interest, deposit return'
  },
  '401k-analyzer': {
    title: '401(k) Retirement Analyzer',
    description: 'Evaluate your 401(k) growth and employer matching benefits for retirement planning.',
    keywords: '401k matching, retirement tool USA, employer benefits'
  },
  'roth-ira-limit': {
    title: 'Roth IRA Contribution Tool',
    description: 'Determine your Roth IRA eligibility and potential tax-free growth over time.',
    keywords: 'Roth IRA USA, tax-free growth, retirement eligibility'
  },
  'irs-tax-brackets': {
    title: 'IRS Tax Bracket Estimator',
    description: 'Calculate your federal tax liability using the latest IRS progressive tax slabs.',
    keywords: 'federal tax, US tax brackets, IRS estimator'
  },
  'dubai-property-roi': {
    title: 'Dubai Real Estate ROI tool',
    description: 'Calculate rental yields and capital appreciation for property investments in Dubai.',
    keywords: 'Dubai property investment, real estate ROI, UAE mortgage'
  },
  'tax-free-savings': {
    title: 'Tax-Free Savings Analysis',
    description: 'Analyze how much you save with 0% personal income tax in tax-free jurisdictions like the UAE.',
    keywords: 'tax free Dubai, 0% income tax, offshore savings'
  },
  'us-mortgage-rates': {
    title: 'US Mortgage APR Analyzer',
    description: 'Understand how credit scores and interest rates impact your US mortgage payments.',
    keywords: 'US home loan, FICO score impact, mortgage rates'
  },
  'abu-dhabi-investment': {
    title: 'Abu Dhabi Wealth Forecaster',
    description: 'Project your long-term wealth growth in Abu Dhabi with tax-efficient strategies.',
    keywords: 'Abu Dhabi investment, wealth management UAE, expat savings'
  },
  'personal-loan': {
    title: 'Personal Loan & Early Payoff Calculator',
    description: 'Calculate monthly payments for personal loans and simulate how extra payments reduce your interest.',
    keywords: 'unsecured loan, personal finance, early payoff simulation'
  },
  'auto-loan': {
    title: 'Auto (Car) Loan Calculator',
    description: 'Estimate monthly car payments including sales tax, trade-ins, and down payments.',
    keywords: 'car loan, vehicle finance, auto loan estimator'
  },
  'student-loan': {
    title: 'Student Loan Repayment Calculator',
    description: 'Analyze your educational debt including grace periods and interest capitalization.',
    keywords: 'education loan, student debt, loan deferment planner'
  },
  'cagr': {
    title: 'CAGR Calculator',
    description: 'Calculate the Compound Annual Growth Rate of your investments over any period.',
    keywords: 'cagr, investment growth, annualized return'
  },
  'dividend-yield': {
    title: 'Dividend Yield Calculator',
    description: 'Analyze stock dividend yields and projected annual passive income.',
    keywords: 'dividend yield, passive income, stock dividends'
  },
  'child-education': {
    title: 'Child Education Planner',
    description: 'Plan for future education costs with inflation adjustments and SIP requirements.',
    keywords: 'education fund, child savings, college inflation'
  },
  'rental-yield': {
    title: 'Rental Yield Calculator',
    description: 'Evaluate real estate profitability with gross and net rental yield metrics.',
    keywords: 'rental yield, real estate roi, property investment'
  }
};
