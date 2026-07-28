const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src/components');

const config = {
  AutoLoanCalculator: { path: '/calculators/loans/auto-loan', category: 'Loans', label: 'Auto Loan', tools: [
    { title: 'Personal Loan EMI', path: '/calculators/loans/personal-loan', description: 'Calculate EMI for personal loans' },
    { title: 'Home Loan EMI', path: '/calculators/loans/mortgage', description: 'Plan your home loan repayment' },
    { title: 'Loan Eligibility', path: '/calculators/loans/eligibility', description: 'Check how much you can borrow' }
  ]},
  BalanceTransfer: { path: '/calculators/loans/home-loan-transfer', category: 'Loans', label: 'Balance Transfer', tools: [
    { title: 'Home Loan EMI', path: '/calculators/loans/mortgage', description: 'Calculate home loan EMI' },
    { title: 'Personal Loan EMI', path: '/calculators/loans/personal-loan', description: 'Plan your personal loan' },
    { title: 'Debt Snowball', path: '/calculators/loans/debt-snowball', description: 'Strategy to pay off debts faster' }
  ]},
  BreakEvenCalculator: { path: '/calculators/business/break-even', category: 'Business', label: 'Break Even', tools: [
    { title: 'GST Calculator', path: '/calculators/tax/gst', description: 'Calculate GST on your products' },
    { title: 'Income Tax', path: '/calculators/tax/income-tax', description: 'Plan your corporate or personal taxes' },
    { title: 'CAGR Calculator', path: '/calculators/investing/cagr', description: 'Measure business growth rate' }
  ]},
  CAGRCalculator: { path: '/calculators/investing/cagr', category: 'Investing', label: 'CAGR Calculator', tools: [
    { title: 'SIP Calculator', path: '/calculators/investing/sip', description: 'Plan your systematic investments' },
    { title: 'Lumpsum Calculator', path: '/calculators/investing/lumpsum', description: 'Calculate one-time investment returns' },
    { title: 'Mutual Fund Returns', path: '/calculators/investing/mutual-fund', description: 'Analyze mutual fund performance' }
  ]},
  ChildEducationPlanner: { path: '/calculators/investing/child-education', category: 'Investing', label: 'Child Education Planner', tools: [
    { title: 'SIP Calculator', path: '/calculators/investing/sip', description: 'Start investing for education early' },
    { title: 'Retirement Planner', path: '/calculators/investing/retirement', description: 'Plan your own retirement alongside' },
    { title: 'HLV Calculator', path: '/calculators/insurance/hlv', description: 'Secure your child\'s future' }
  ]},
  CreditCardPayoff: { path: '/calculators/loans/credit-card-payoff', category: 'Loans', label: 'Credit Card Payoff', tools: [
    { title: 'Debt Snowball', path: '/calculators/loans/debt-snowball', description: 'Pay off multiple debts efficiently' },
    { title: 'Personal Loan', path: '/calculators/loans/personal-loan', description: 'Consolidate debt with a personal loan' },
    { title: 'Balance Transfer', path: '/calculators/loans/home-loan-transfer', description: 'Transfer balances to lower rates' }
  ]},
  CurrencyConverter: { path: '/calculators/forex/currency-converter', category: 'Forex', label: 'Currency Converter', tools: [
    { title: 'Income Tax Calculator', path: '/calculators/tax/income-tax', description: 'Calculate taxes on foreign income' },
    { title: 'GST Calculator', path: '/calculators/tax/gst', description: 'Check GST for international transactions' },
    { title: 'SIP Calculator', path: '/calculators/investing/sip', description: 'Plan your global investments' }
  ]},
  DebtSnowball: { path: '/calculators/loans/debt-snowball', category: 'Loans', label: 'Debt Snowball', tools: [
    { title: 'Credit Card Payoff', path: '/calculators/loans/credit-card-payoff', description: 'Focus on paying off credit cards' },
    { title: 'Personal Loan EMI', path: '/calculators/loans/personal-loan', description: 'Consolidate debt' },
    { title: 'Home Loan Transfer', path: '/calculators/loans/home-loan-transfer', description: 'Reduce your mortgage rate' }
  ]},
  DividendYieldCalculator: { path: '/calculators/investing/dividend-yield', category: 'Investing', label: 'Dividend Yield', tools: [
    { title: 'CAGR Calculator', path: '/calculators/investing/cagr', description: 'Calculate overall portfolio growth' },
    { title: 'SIP Calculator', path: '/calculators/investing/sip', description: 'Reinvest dividends via SIP' },
    { title: 'Retirement Planner', path: '/calculators/investing/retirement', description: 'Plan passive income for retirement' }
  ]},
  EMICalculator: { path: '/calculators/loans/emi', category: 'Loans', label: 'EMI Calculator', tools: [
    { title: 'Home Loan EMI', path: '/calculators/loans/mortgage', description: 'Detailed home loan planning' },
    { title: 'Personal Loan EMI', path: '/calculators/loans/personal-loan', description: 'Plan short term loans' },
    { title: 'Loan Eligibility', path: '/calculators/loans/eligibility', description: 'Check your borrowing capacity' }
  ]},
  FDRDCalculator: { path: '/calculators/investing/fd-rd', category: 'Investing', label: 'FD / RD Calculator', tools: [
    { title: 'SIP Calculator', path: '/calculators/investing/sip', description: 'Compare with equity investments' },
    { title: 'Lumpsum Calculator', path: '/calculators/investing/lumpsum', description: 'Alternative one-time investments' },
    { title: 'Retirement Planner', path: '/calculators/investing/retirement', description: 'Plan safe retirement corpus' }
  ]},
  GratuityCalculator: { path: '/calculators/salary/gratuity', category: 'Salary', label: 'Gratuity Calculator', tools: [
    { title: 'Income Tax', path: '/calculators/tax/income-tax', description: 'Calculate tax on your gratuity' },
    { title: 'Retirement Planner', path: '/calculators/investing/retirement', description: 'Include gratuity in retirement planning' },
    { title: 'Lumpsum Calculator', path: '/calculators/investing/lumpsum', description: 'Invest your gratuity amount' }
  ]},
  GSTCalculator: { path: '/calculators/tax/gst', category: 'Tax', label: 'GST Calculator', tools: [
    { title: 'Income Tax', path: '/calculators/tax/income-tax', description: 'Calculate business or personal tax' },
    { title: 'Break Even Calculator', path: '/calculators/business/break-even', description: 'Plan business profitability' },
    { title: 'Currency Converter', path: '/calculators/forex/currency-converter', description: 'Convert prices for imports/exports' }
  ]},
  HealthInsuranceCalculator: { path: '/calculators/insurance/health-insurance', category: 'Insurance', label: 'Health Insurance', tools: [
    { title: 'Term Insurance', path: '/calculators/insurance/term-insurance', description: 'Secure your family\'s future' },
    { title: 'HLV Calculator', path: '/calculators/insurance/hlv', description: 'Calculate human life value' },
    { title: 'Income Tax', path: '/calculators/tax/income-tax', description: 'Calculate 80D tax benefits' }
  ]},
  HLVCalculator: { path: '/calculators/insurance/hlv', category: 'Insurance', label: 'Human Life Value', tools: [
    { title: 'Term Insurance', path: '/calculators/insurance/term-insurance', description: 'Get adequate coverage' },
    { title: 'Health Insurance', path: '/calculators/insurance/health-insurance', description: 'Protect against medical emergencies' },
    { title: 'Retirement Planner', path: '/calculators/investing/retirement', description: 'Plan for the long term' }
  ]},
  IncomeTaxCalculator: { path: '/calculators/tax/income-tax', category: 'Tax', label: 'Income Tax', tools: [
    { title: 'SIP Calculator', path: '/calculators/investing/sip', description: 'Invest in ELSS for 80C deductions' },
    { title: 'Health Insurance', path: '/calculators/insurance/health-insurance', description: 'Claim 80D deductions' },
    { title: 'Home Loan EMI', path: '/calculators/loans/mortgage', description: 'Claim Section 24(b) benefits' }
  ]},
  LoanEligibility: { path: '/calculators/loans/eligibility', category: 'Loans', label: 'Loan Eligibility', tools: [
    { title: 'Home Loan EMI', path: '/calculators/loans/mortgage', description: 'Calculate your monthly payments' },
    { title: 'Personal Loan EMI', path: '/calculators/loans/personal-loan', description: 'Plan personal expenses' },
    { title: 'Balance Transfer', path: '/calculators/loans/home-loan-transfer', description: 'Lower your existing loan rate' }
  ]},
  LumpsumCalculator: { path: '/calculators/investing/lumpsum', category: 'Investing', label: 'Lumpsum Calculator', tools: [
    { title: 'SIP Calculator', path: '/calculators/investing/sip', description: 'Compare with systematic investing' },
    { title: 'Mutual Fund Returns', path: '/calculators/investing/mutual-fund', description: 'Analyze MF performance' },
    { title: 'FD / RD Calculator', path: '/calculators/investing/fd-rd', description: 'Compare with safe returns' }
  ]},
  MFCalculator: { path: '/calculators/investing/mutual-fund', category: 'Investing', label: 'Mutual Fund Returns', tools: [
    { title: 'SIP Calculator', path: '/calculators/investing/sip', description: 'Plan regular MF investments' },
    { title: 'Lumpsum Calculator', path: '/calculators/investing/lumpsum', description: 'Calculate one-time investments' },
    { title: 'CAGR Calculator', path: '/calculators/investing/cagr', description: 'Measure annualized returns' }
  ]},
  MortgageCalculator: { path: '/calculators/loans/mortgage', category: 'Loans', label: 'Home Loan EMI', tools: [
    { title: 'Loan Eligibility', path: '/calculators/loans/eligibility', description: 'Check your borrowing capacity' },
    { title: 'Balance Transfer', path: '/calculators/loans/home-loan-transfer', description: 'Reduce existing loan rate' },
    { title: 'EMI Calculator', path: '/calculators/loans/emi', description: 'General EMI planning' }
  ]},
  PersonalLoanCalculator: { path: '/calculators/loans/personal-loan', category: 'Loans', label: 'Personal Loan', tools: [
    { title: 'EMI Calculator', path: '/calculators/loans/emi', description: 'Plan your monthly outgo' },
    { title: 'Credit Card Payoff', path: '/calculators/loans/credit-card-payoff', description: 'Consolidate credit card debt' },
    { title: 'Loan Eligibility', path: '/calculators/loans/eligibility', description: 'Check how much you can borrow' }
  ]},
  RentalYieldCalculator: { path: '/calculators/investing/rental-yield', category: 'Investing', label: 'Rental Yield', tools: [
    { title: 'Home Loan EMI', path: '/calculators/loans/mortgage', description: 'Calculate property purchase costs' },
    { title: 'Dividend Yield', path: '/calculators/investing/dividend-yield', description: 'Compare with stock dividends' },
    { title: 'CAGR Calculator', path: '/calculators/investing/cagr', description: 'Measure long-term property appreciation' }
  ]},
  RetirementCalculator: { path: '/calculators/investing/retirement', category: 'Investing', label: 'Retirement Planner', tools: [
    { title: 'SIP Calculator', path: '/calculators/investing/sip', description: 'Build your retirement corpus' },
    { title: 'Child Education', path: '/calculators/investing/child-education', description: 'Plan for major life goals' },
    { title: 'HLV Calculator', path: '/calculators/insurance/hlv', description: 'Protect your family\'s future' }
  ]},
  SIPCalculator: { path: '/calculators/investing/sip', category: 'Investing', label: 'SIP Calculator', tools: [
    { title: 'Lumpsum Calculator', path: '/calculators/investing/lumpsum', description: 'Calculate one-time investments' },
    { title: 'Mutual Fund Returns', path: '/calculators/investing/mutual-fund', description: 'Analyze MF performance' },
    { title: 'Retirement Planner', path: '/calculators/investing/retirement', description: 'Plan for the long term' }
  ]},
  StudentLoanCalculator: { path: '/calculators/loans/student-loan', category: 'Loans', label: 'Student Loan', tools: [
    { title: 'EMI Calculator', path: '/calculators/loans/emi', description: 'Plan your monthly outgo' },
    { title: 'Personal Loan', path: '/calculators/loans/personal-loan', description: 'Alternative financing options' },
    { title: 'Debt Snowball', path: '/calculators/loans/debt-snowball', description: 'Strategy to pay off early' }
  ]},
  TermInsuranceCalculator: { path: '/calculators/insurance/term-insurance', category: 'Insurance', label: 'Term Insurance', tools: [
    { title: 'HLV Calculator', path: '/calculators/insurance/hlv', description: 'Calculate exact coverage needed' },
    { title: 'Health Insurance', path: '/calculators/insurance/health-insurance', description: 'Get medical coverage' },
    { title: 'Income Tax', path: '/calculators/tax/income-tax', description: 'Calculate 80C tax benefits' }
  ]}
};

const components = Object.keys(config);

for (const comp of components) {
  const filePath = path.join(dir, `${comp}.tsx`);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');

    // Add imports if they don't exist
    if (!content.includes('Breadcrumbs')) {
      content = content.replace(/(import React.*?;\n)/, `$1import Breadcrumbs from './Breadcrumbs';\nimport RelatedTools from './RelatedTools';\n`);
    }

    const { category, label, tools } = config[comp];
    const breadcrumbData = `
  const breadcrumbItems = [
    { label: '${category}' },
    { label: '${label}' }
  ];
`;

    // Find the export default function and insert breadcrumbData at the beginning
    const functionRegex = /(export default function \w+\(.*?\)\s*\{)/;
    if (content.match(functionRegex)) {
        if (!content.includes('const breadcrumbItems = [')) {
            content = content.replace(functionRegex, `$1\n${breadcrumbData}`);
        }
    }

    // Insert the Breadcrumb UI
    // Usually it goes right after `<div className="max-w-7xl mx-auto">` or similar
    // We'll look for `<div className="max-w-7xl mx-auto">` or the first main container.
    // Try some variants
    const mainContainerRegex = /(<div className="max-w-7xl mx-auto[^>]*>|<div className="w-full max-w-7xl mx-auto[^>]*>)/;
    if (content.match(mainContainerRegex)) {
        if (!content.includes('<Breadcrumbs items={breadcrumbItems} />')) {
            content = content.replace(mainContainerRegex, `$1\n        <Breadcrumbs items={breadcrumbItems} />`);
        }
    } else {
        // fallback to standard wrapping if no max-w-7xl exists
        const alternativeRegex = /(<div className="[^"]*min-h-screen[^"]*">\s*<div className="[^"]*">)/;
        if (content.match(alternativeRegex) && !content.includes('<Breadcrumbs items={breadcrumbItems} />')) {
             content = content.replace(alternativeRegex, `$1\n        <Breadcrumbs items={breadcrumbItems} />`);
        }
    }

    // Insert Related Tools just before the final closing tag of the main container, or before `<Footer />` or before `</CalculatorSEO>` or before `<SEOSection />`
    const seoSectionRegex = /(<SEOSection[^\/]*\/>)/;
    const toolsCode = `
        <RelatedTools tools={${JSON.stringify(tools)}} />
`;
    if (content.match(seoSectionRegex)) {
        if (!content.includes('<RelatedTools')) {
            content = content.replace(seoSectionRegex, `${toolsCode}\n        $1`);
        }
    } else {
        // Fallback, find the last closing div
        const lastDivRegex = /(<\/div>\s*)$/;
        if (content.match(lastDivRegex) && !content.includes('<RelatedTools')) {
            content = content.replace(lastDivRegex, `${toolsCode}\n      $1`);
        }
    }

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${comp}.tsx`);
  }
}
