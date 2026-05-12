/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ComparisonFactor {
  factor: string;
  optionA: string;
  optionB: string;
}

export interface ComparisonData {
  title: string;
  description: string;
  optionAName: string;
  optionBName: string;
  factors: ComparisonFactor[];
  prosA: string[];
  consA: string[];
  prosB: string[];
  consB: string[];
  verdict: string;
  ctaText: string;
  ctaLink: string;
}

export const COMPARISONS: Record<string, ComparisonData> = {
  'sip-vs-lumpsum': {
    title: 'SIP vs Lumpsum Investment',
    description: 'Compare Systematic Investment Plan (SIP) with one-time Lumpsum investment strategies for mutual funds.',
    optionAName: 'SIP',
    optionBName: 'Lumpsum',
    factors: [
      { factor: 'Investment Style', optionA: 'Periodic (Monthly/Quarterly)', optionB: 'One-time' },
      { factor: 'Risk Mitigation', optionA: 'Rupee Cost Averaging handles volatility', optionB: 'Market timing risk is high' },
      { factor: 'Capital Requirement', optionA: 'Small amounts (Low barrier)', optionB: 'Large surplus required' },
      { factor: 'Discipline', optionA: 'High (Automated)', optionB: 'Subjective to investor mood' }
    ],
    prosA: ['Averages out purchase cost', 'Power of compounding over time', 'Light on wallet'],
    consA: ['May miss out on bull runs', 'Requires discipline over years'],
    prosB: ['High returns if market rises', 'Lower transaction freq', 'Good for windfall gains'],
    consB: ['High timing risk', 'Emotional stress during crashes'],
    verdict: 'SIP is better for regular earners and volatile markets. Lumpsum is effective if you have bulk cash and the market is undervalued.',
    ctaText: 'Calculate SIP Returns',
    ctaLink: '/calculators/sip'
  },
  'home-loan-vs-rent': {
    title: 'Home Loan (EMI) vs Monthly Rent',
    description: 'Decide whether to buy a home with a mortgage or continue living in a rented property.',
    optionAName: 'Buy (EMI)',
    optionBName: 'Rent',
    factors: [
      { factor: 'Asset Creation', optionA: 'Builds equity & ownership', optionB: 'No asset ownership' },
      { factor: 'Flexibility', optionA: 'Low (Tied to location)', optionB: 'High (Easy relocation)' },
      { factor: 'Maintenance', optionA: 'Borne by owner', optionB: 'Borne by landlord' },
      { factor: 'Tax Benefits', optionA: 'Benefits on Interest & Principal', optionB: 'HRA benefits for salaried' }
    ],
    prosA: ['Forced savings', 'Asset appreciation', 'Emotional security'],
    consA: ['High interest cost', 'Property tax & upkeep', 'Illiquid asset'],
    prosB: ['Lower monthly outflow initially', 'Freedom to move', 'Invest surplus in equity'],
    consB: ['Subject to landlord whims', 'No terminal value', 'Uncertain rent hikes'],
    verdict: 'Buy if you plan to stay for 10+ years and want security. Rent if you prioritize career mobility and higher investment returns from liquidity.',
    ctaText: 'Check Mortgage EMI',
    ctaLink: '/calculators/mortgage'
  },
  'fd-vs-mutual-funds': {
    title: 'Fixed Deposit (FD) vs Mutual Funds',
    description: 'Traditional safety vs modern market-linked growth.',
    optionAName: 'Fixed Deposit',
    optionBName: 'Mutual Funds',
    factors: [
      { factor: 'Returns', optionA: 'Fixed (Guaranteed)', optionB: 'Variable (Market-linked)' },
      { factor: 'Risk', optionA: 'Negligible (Bank backed)', optionB: 'Moderate to High' },
      { factor: 'Liquidity', optionA: 'Fixed term (Premature penalty)', optionB: 'High (Anytime exit)' },
      { factor: 'Taxation', optionA: 'Fully taxable at slab rate', optionB: 'Capital Gains tax (Generally lower)' }
    ],
    prosA: ['Predictable income', 'Peace of mind', 'No market monitoring'],
    consA: ['Often doesn\'t beat inflation', 'Low growth potential'],
    prosB: ['High long-term growth', 'Inflation beating returns', 'Tax efficient'],
    consB: ['Risk of capital loss', 'Requires exit strategy'],
    verdict: 'FD is for emergency funds and senior citizens. Mutual Funds are for long-term wealth creation and young professionals.',
    ctaText: 'FD Maturity Calculator',
    ctaLink: '/calculators/fd-rd'
  },
  'ppf-vs-nps': {
    title: 'PPF vs National Pension Scheme (NPS)',
    description: 'Battle of the long-term retirement savings instruments in India.',
    optionAName: 'PPF',
    optionBName: 'NPS',
    factors: [
      { factor: 'Exposure', optionA: 'Debt (Govt Backed)', optionB: 'Equity + Debt mix' },
      { factor: 'Returns', optionA: 'Fixed reset quarterly', optionB: 'Market-linked' },
      { factor: 'Lock-in', optionA: '15 Years', optionB: 'Till Retirement (60)' },
      { factor: 'Taxability', optionA: 'EEE (Exempt-Exempt-Exempt)', optionB: 'Partial tax on annuity' }
    ],
    prosA: ['100% Safety', 'Tax free returns', 'Steady growth'],
    consA: ['Cap on investment (₹1.5L)', 'Lower returns than equity'],
    prosB: ['Professional management', 'Extra tax benefit (80CCD)', 'Customizable risk'],
    consB: ['Annuity purchase mandatory', 'Market volatility'],
    verdict: 'PPF is perfect for safe debt-side allocation. NPS is superior for higher retirement corpus through equity exposure.',
    ctaText: 'Plan Your Retirement',
    ctaLink: '/calculators/retirement'
  },
  'term-insurance-vs-endowment': {
    title: 'Term Insurance vs Endowment Plan',
    description: 'Pure protection vs Investment-cum-Insurance.',
    optionAName: 'Term Insurance',
    optionBName: 'Endowment',
    factors: [
      { factor: 'Purpose', optionA: 'Pure Risk Cover', optionB: 'Saving + Life Cover' },
      { factor: 'Premiums', optionA: 'Low (Affordable)', optionB: 'High (Costly)' },
      { factor: 'Maturity Benefit', optionA: 'Zero (Unless ROP)', optionB: 'Guaranteed Sum + Bonuses' },
      { factor: 'Sum Assured', optionA: 'Very High (Crucial)', optionB: 'Relatively Low' }
    ],
    prosA: ['Highest coverage for lowest cost', 'Simple and transparent', 'Ideal for breadwinners'],
    consA: ['No "money back" if one survives'],
    prosB: ['Disciplined savings', 'Maturity benefit available', 'Combination product'],
    consB: ['Low returns (~4-6%)', 'Insufficient life cover'],
    verdict: 'Term Insurance is mandatory for everyone. Endowment plans are often suboptimal; better to keep Insurance and Investment separate.',
    ctaText: 'Calculate Life Cover',
    ctaLink: '/calculators/loan-eligibility'
  },
  'gold-vs-real-estate': {
    title: 'Gold vs Real Estate Investment',
    description: 'Common physical asset classes compared.',
    optionAName: 'Gold',
    optionBName: 'Real Estate',
    factors: [
      { factor: 'Entry Barrier', optionA: 'Low (Buy 1 gram)', optionB: 'High (Bulk capital)' },
      { factor: 'Liquidity', optionA: 'High (Immediate)', optionB: 'Very Low (Takes months)' },
      { factor: 'Passive Income', optionA: 'Nil', optionB: 'Rental Income' },
      { factor: 'Maintenance', optionA: 'Storage cost/Safety', optionB: 'Tax, Repair, Tenant management' }
    ],
    prosA: ['Hedge against inflation', 'Portfolio diversifier', 'Globally tradable'],
    consA: ['Theft risk', 'Making charges (Physical)'],
    prosB: ['Rental yields', 'Massive long-term appreciation', 'Leverage (Loan available)'],
    consB: ['High transaction cost', 'legal disputes', 'Illiquid environment'],
    verdict: 'Gold is for emergencies and hedging. Real Estate is for long-term wealth and passive income generation.',
    ctaText: 'Lumpsum Growth Tool',
    ctaLink: '/calculators/lumpsum'
  },
  'stocks-vs-bonds': {
    title: 'Stocks vs Bonds',
    description: 'Equity vs Fixed Income for balanced portfolios.',
    optionAName: 'Stocks',
    optionBName: 'Bonds',
    factors: [
      { factor: 'Ownership', optionA: 'Equity share in company', optionB: 'Lending to issuer' },
      { factor: 'Risk Level', optionA: 'High (Market risk)', optionB: 'Lower (Credit risk)' },
      { factor: 'Returns', optionA: 'Dividends + Appreciation', optionB: 'Fixed Interest (Coupon)' },
      { factor: 'Priority', optionA: 'Residual claimant', optionB: 'Priority in liquidation' }
    ],
    prosA: ['Highest growth potential', 'Owners rights', 'Compounding'],
    consA: ['High volatility', 'Possible total loss'],
    prosB: ['Fixed steady income', 'Principal preservation', 'Less volatility'],
    consB: ['Inflation risk', 'Default risk (Corp bonds)'],
    verdict: 'Stocks are for growth years. Bonds are for capital preservation and income near/during retirement.',
    ctaText: 'Mutual Fund Estimator',
    ctaLink: '/calculators/mutual-fund'
  },
  'savings-account-vs-liquid-funds': {
    title: 'Savings Account vs Liquid Funds',
    description: 'Where to park your idle cash?',
    optionAName: 'Savings A/c',
    optionBName: 'Liquid Funds',
    factors: [
      { factor: 'Interest/Returns', optionA: 'Fixed (~3-4%)', optionB: 'Varies (~6-7%)' },
      { factor: 'Instant Access', optionA: 'Immediate (ATM/UPI)', optionB: 'T+1 day (Mostly)' },
      { factor: 'Risk', optionA: 'Zero (upto ₹5L guarantee)', optionB: 'Very low (Debt-based)' },
      { factor: 'Ease', optionA: 'Standard banking', optionB: 'Requires Demat/MF account' }
    ],
    prosA: ['Unmatched accessibility', 'Highly familiar', 'Connected to bills'],
    consA: ['Lowest returns', 'Loses value against inflation'],
    prosB: ['Better yield than savings', 'Professionally managed', 'Tax efficient'],
    consB: ['Not "instant" (usually)', 'NAV can fluctuate slightly'],
    verdict: 'Savings Account for daily expenses. Liquid Funds for emergency corpus and surplus cash parked for short terms.',
    ctaText: 'Check Currency Value',
    ctaLink: '/calculators/currency-converter'
  },
  'credit-card-vs-personal-loan': {
    title: 'Credit Card vs Personal Loan',
    description: 'Managing debt for immediate expenses.',
    optionAName: 'Credit Card',
    optionBName: 'Personal Loan',
    factors: [
      { factor: 'Interest Rate', optionA: 'Very High (36-45% p.a.)', optionB: 'Moderate (10-20% p.a.)' },
      { factor: 'Flexibility', optionA: 'Revolving (Pay min to delay)', optionB: 'Structured (Fixed EMIs)' },
      { factor: 'Collateral', optionA: 'Unsecured', optionB: 'Unsecured' },
      { factor: 'Usage', optionA: 'Lifestyle/Emergency', optionB: 'Major life events/Debt consolidation' }
    ],
    prosA: ['Reward points/Cashbacks', 'Short-term interest free period', 'Convenience'],
    consA: ['Debt trap risk', 'High charges on defaults'],
    prosB: ['Lower interest than cards', 'Fixed repayment schedule', 'Disciplined payoff'],
    consB: ['Processing fees', 'Pre-closure penalties'],
    verdict: 'Credit Card for short-term spends paid in full. Personal Loan for large, planned expenses that require months to repay.',
    ctaText: 'Compare Loan EMI',
    ctaLink: '/calculators/emi'
  },
  'crypto-vs-stocks': {
    title: 'Cryptocurrency vs Stocks',
    description: 'Digital assets vs Traditional equity.',
    optionAName: 'Crypto',
    optionBName: 'Stocks',
    factors: [
      { factor: 'Underlying Value', optionA: 'Decentralized protocol/Utility', optionB: 'Company earnings/Assets' },
      { factor: 'Trading Hours', optionA: '24/7/365', optionB: 'Market hours only' },
      { factor: 'Regulation', optionA: 'Unregulated/Evolving', optionB: 'Highly regulated (SEC/SEBI)' },
      { factor: 'Volatility', optionA: 'Extreme', optionB: 'Moderate' }
    ],
    prosA: ['Massive upside potential', 'New tech frontier', 'Accessible globally'],
    consA: ['Regulatory risk', 'Hack/Wallet loss risk', 'Wild swings'],
    prosB: ['History of steady wealth', 'Legal protections', 'Dividend income'],
    consB: ['Market cycles', 'Selection bias risk'],
    verdict: 'Stocks for core portfolio. Crypto for high-risk speculative allocation (only small percentage).',
    ctaText: 'Lumpsum Profit Calculator',
    ctaLink: '/calculators/lumpsum'
  }
};
