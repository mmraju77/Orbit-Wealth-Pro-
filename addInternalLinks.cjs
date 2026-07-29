const fs = require('fs');
const path = require('path');
const execSync = require('child_process').execSync;

const relatedToolsMap = {
  'MortgageCalculator': [
    { title: 'EMI Calculator', path: '/calculators/loans/emi', description: 'Calculate equal monthly installments for any loan.' },
    { title: 'Loan Eligibility', path: '/calculators/loans/eligibility', description: 'Check your borrowing capacity based on income.' },
    { title: 'Home Loan Transfer', path: '/calculators/loans/home-loan-transfer', description: 'See how much you save by transferring your mortgage.' }
  ],
  'RetirementCalculator': [
    { title: 'SIP Calculator', path: '/calculators/investing/sip', description: 'Plan your mutual fund investments with ease.' },
    { title: 'Child Education', path: '/calculators/investing/child-education', description: 'Estimate costs and plan for higher education.' },
    { title: 'CAGR Calculator', path: '/calculators/investing/cagr', description: 'Calculate compounded annual growth rate.' }
  ],
  'IncomeTaxCalculator': [
    { title: 'GST Calculator', path: '/calculators/tax/gst', description: 'Calculate inclusive or exclusive GST amounts.' },
    { title: 'Gratuity Calculator', path: '/calculators/salary/gratuity', description: 'Estimate your gratuity based on tenure.' },
    { title: 'Break Even', path: '/calculators/business/break-even', description: 'Calculate the point where costs equal revenue.' }
  ],
  'GSTCalculator': [
    { title: 'Income Tax', path: '/calculators/tax/income-tax', description: 'Calculate your annual tax liability.' },
    { title: 'Break Even', path: '/calculators/business/break-even', description: 'Calculate business break-even points.' },
    { title: 'Currency Converter', path: '/calculators/forex/currency-converter', description: 'Convert between global currencies.' }
  ],
  'FDRDCalculator': [
    { title: 'SIP Calculator', path: '/calculators/investing/sip', description: 'Compare fixed returns vs market returns.' },
    { title: 'Lumpsum Calculator', path: '/calculators/investing/lumpsum', description: 'Estimate returns on one-time investments.' },
    { title: 'Dividend Yield', path: '/calculators/investing/dividend-yield', description: 'Calculate returns from dividend paying stocks.' }
  ],
  'SIPCalculator': [
    { title: 'Lumpsum Calculator', path: '/calculators/investing/lumpsum', description: 'Estimate returns on one-time investments.' },
    { title: 'Mutual Fund', path: '/calculators/investing/mutual-fund', description: 'Analyze comprehensive mutual fund returns.' },
    { title: 'CAGR Calculator', path: '/calculators/investing/cagr', description: 'Calculate compounded annual growth rate.' }
  ],
  'LumpsumCalculator': [
    { title: 'SIP Calculator', path: '/calculators/investing/sip', description: 'Plan your mutual fund investments via SIP.' },
    { title: 'Mutual Fund', path: '/calculators/investing/mutual-fund', description: 'Analyze comprehensive mutual fund returns.' },
    { title: 'CAGR Calculator', path: '/calculators/investing/cagr', description: 'Calculate compounded annual growth rate.' }
  ],
  'EMICalculator': [
    { title: 'Mortgage Calculator', path: '/calculators/loans/mortgage', description: 'Plan your home purchase and down payment.' },
    { title: 'Personal Loan', path: '/calculators/loans/personal-loan', description: 'Calculate EMI for personal expenses.' },
    { title: 'Auto Loan', path: '/calculators/loans/auto-loan', description: 'Plan your vehicle purchase.' }
  ],
  'MFCalculator': [
    { title: 'SIP Calculator', path: '/calculators/investing/sip', description: 'Plan your mutual fund investments via SIP.' },
    { title: 'Lumpsum Calculator', path: '/calculators/investing/lumpsum', description: 'Estimate returns on one-time investments.' },
    { title: 'Dividend Yield', path: '/calculators/investing/dividend-yield', description: 'Calculate returns from dividend paying stocks.' }
  ],
  'LoanEligibility': [
    { title: 'Mortgage Calculator', path: '/calculators/loans/mortgage', description: 'Plan your home purchase and down payment.' },
    { title: 'EMICalculator', path: '/calculators/loans/emi', description: 'Calculate equal monthly installments for any loan.' },
    { title: 'Debt Snowball', path: '/calculators/loans/debt-snowball', description: 'Plan a strategy to pay off existing debts.' }
  ],
  'BalanceTransfer': [
    { title: 'Mortgage Calculator', path: '/calculators/loans/mortgage', description: 'Plan your home purchase and down payment.' },
    { title: 'EMI Calculator', path: '/calculators/loans/emi', description: 'Calculate EMI on your transferred amount.' },
    { title: 'Loan Eligibility', path: '/calculators/loans/eligibility', description: 'Check your borrowing capacity based on income.' }
  ],
  'GratuityCalculator': [
    { title: 'Income Tax', path: '/calculators/tax/income-tax', description: 'Calculate tax implications on your gratuity.' },
    { title: 'Retirement Planner', path: '/calculators/investing/retirement', description: 'Plan your post-retirement corpus.' },
    { title: 'SIP Calculator', path: '/calculators/investing/sip', description: 'Invest your gratuity for wealth creation.' }
  ],
  'CurrencyConverter': [
    { title: 'Income Tax', path: '/calculators/tax/income-tax', description: 'Plan taxes for foreign income.' },
    { title: 'Mortgage Calculator', path: '/calculators/loans/mortgage', description: 'Calculate mortgage for overseas properties.' },
    { title: 'CAGR Calculator', path: '/calculators/investing/cagr', description: 'Evaluate foreign investment growth.' }
  ],
  'PersonalLoanCalculator': [
    { title: 'EMI Calculator', path: '/calculators/loans/emi', description: 'Calculate standard EMIs.' },
    { title: 'Credit Card Payoff', path: '/calculators/loans/credit-card-payoff', description: 'Compare loan vs credit card payoff.' },
    { title: 'Debt Snowball', path: '/calculators/loans/debt-snowball', description: 'Optimize your debt repayment strategy.' }
  ],
  'AutoLoanCalculator': [
    { title: 'EMI Calculator', path: '/calculators/loans/emi', description: 'Calculate standard EMIs.' },
    { title: 'Personal Loan', path: '/calculators/loans/personal-loan', description: 'Compare auto loan vs personal loan rates.' },
    { title: 'Loan Eligibility', path: '/calculators/loans/eligibility', description: 'Check your maximum borrowing limit.' }
  ],
  'StudentLoanCalculator': [
    { title: 'Child Education', path: '/calculators/investing/child-education', description: 'Plan ahead for education costs.' },
    { title: 'Personal Loan', path: '/calculators/loans/personal-loan', description: 'Compare student loan vs personal loan rates.' },
    { title: 'Debt Snowball', path: '/calculators/loans/debt-snowball', description: 'Optimize your debt repayment strategy.' }
  ],
  'CAGRCalculator': [
    { title: 'SIP Calculator', path: '/calculators/investing/sip', description: 'Plan regular mutual fund investments.' },
    { title: 'Mutual Fund', path: '/calculators/investing/mutual-fund', description: 'Analyze specific mutual fund returns.' },
    { title: 'Lumpsum Calculator', path: '/calculators/investing/lumpsum', description: 'Estimate returns on one-time investments.' }
  ],
  'DividendYieldCalculator': [
    { title: 'CAGR Calculator', path: '/calculators/investing/cagr', description: 'Evaluate overall investment growth.' },
    { title: 'Retirement Planner', path: '/calculators/investing/retirement', description: 'Plan dividend income for retirement.' },
    { title: 'SIP Calculator', path: '/calculators/investing/sip', description: 'Reinvest dividends via SIP.' }
  ],
  'ChildEducationPlanner': [
    { title: 'SIP Calculator', path: '/calculators/investing/sip', description: 'Plan monthly investments for the goal.' },
    { title: 'Student Loan', path: '/calculators/loans/student-loan', description: 'Estimate future education loan EMIs.' },
    { title: 'Retirement Planner', path: '/calculators/investing/retirement', description: 'Balance education with retirement goals.' }
  ],
  'RentalYieldCalculator': [
    { title: 'Mortgage Calculator', path: '/calculators/loans/mortgage', description: 'Calculate mortgage for rental properties.' },
    { title: 'Home Loan Transfer', path: '/calculators/loans/home-loan-transfer', description: 'Optimize interest rates on investment properties.' },
    { title: 'Break Even', path: '/calculators/business/break-even', description: 'Calculate break even for property investments.' }
  ],
  'DebtSnowball': [
    { title: 'Credit Card Payoff', path: '/calculators/loans/credit-card-payoff', description: 'Focus on high-interest credit cards.' },
    { title: 'Personal Loan', path: '/calculators/loans/personal-loan', description: 'Consolidate debts with a personal loan.' },
    { title: 'EMI Calculator', path: '/calculators/loans/emi', description: 'Calculate EMIs for debt consolidation.' }
  ],
  'HLVCalculator': [
    { title: 'Term Insurance', path: '/calculators/insurance/term-insurance', description: 'Find the right coverage for your family.' },
    { title: 'Child Education', path: '/calculators/investing/child-education', description: 'Secure your child\'s future.' },
    { title: 'Retirement Planner', path: '/calculators/investing/retirement', description: 'Protect your retirement corpus.' }
  ],
  'BreakEvenCalculator': [
    { title: 'GST Calculator', path: '/calculators/tax/gst', description: 'Include tax implications in your costs.' },
    { title: 'Income Tax', path: '/calculators/tax/income-tax', description: 'Estimate post-tax profitability.' },
    { title: 'Personal Loan', path: '/calculators/loans/personal-loan', description: 'Plan funding for your business.' }
  ],
  'CreditCardPayoff': [
    { title: 'Debt Snowball', path: '/calculators/loans/debt-snowball', description: 'Tackle multiple credit cards systematically.' },
    { title: 'Personal Loan', path: '/calculators/loans/personal-loan', description: 'Consolidate high-interest card debt.' },
    { title: 'EMI Calculator', path: '/calculators/loans/emi', description: 'Calculate EMI for balance transfers.' }
  ],
  'TermInsuranceCalculator': [
    { title: 'HLV Calculator', path: '/calculators/insurance/hlv', description: 'Calculate your exact Human Life Value.' },
    { title: 'Health Insurance', path: '/calculators/insurance/health-insurance', description: 'Ensure comprehensive medical coverage.' },
    { title: 'Child Education', path: '/calculators/investing/child-education', description: 'Protect your child\'s education goals.' }
  ],
  'HealthInsuranceCalculator': [
    { title: 'Term Insurance', path: '/calculators/insurance/term-insurance', description: 'Ensure life coverage along with health.' },
    { title: 'HLV Calculator', path: '/calculators/insurance/hlv', description: 'Calculate your exact Human Life Value.' },
    { title: 'Retirement Planner', path: '/calculators/investing/retirement', description: 'Plan for medical costs post-retirement.' }
  ]
};

const defaultRelated = [
  { title: 'SIP Calculator', path: '/calculators/investing/sip', description: 'Plan regular mutual fund investments.' },
  { title: 'EMI Calculator', path: '/calculators/loans/emi', description: 'Calculate equal monthly installments for any loan.' },
  { title: 'Income Tax', path: '/calculators/tax/income-tax', description: 'Calculate your annual tax liability.' }
];

const files = execSync('grep -rl "SEOSection" src/components/ | grep -E "Calculator|Planner|Snowball|Payoff|Transfer|Yield|Eligibility|CurrencyConverter"').toString().split('\n').filter(Boolean);

files.forEach(file => {
  const componentNameMatch = file.match(/([a-zA-Z0-9_]+)\.tsx$/);
  if (!componentNameMatch) return;
  const componentName = componentNameMatch[1];
  
  let content = fs.readFileSync(file, 'utf-8');
  let changed = false;

  const tools = relatedToolsMap[componentName] || defaultRelated;
  
  // Inject const relatedTools if not present
  if (!content.includes('const relatedTools = [')) {
    // find 'const breadcrumbItems = [' or a place near the top of the component
    const breadcrumbIndex = content.indexOf('const breadcrumbItems = [');
    if (breadcrumbIndex !== -1) {
      const injectionStr = `\n  const relatedTools = ${JSON.stringify(tools, null, 2).replace(/\n/g, '\n  ')};\n`;
      content = content.slice(0, breadcrumbIndex) + injectionStr + content.slice(breadcrumbIndex);
      changed = true;
    }
  }

  // Inject Breadcrumbs
  // We want to insert <Breadcrumbs items={breadcrumbItems} /> right after the first <div ... space-y-12> or similar top-level div.
  // Wait, let's look for `return (` and then the next `<div`.
  if (!content.includes('<Breadcrumbs items={breadcrumbItems} />')) {
    const returnRegex = /return\s*\(\s*(<div[^>]*>)/;
    if (returnRegex.test(content)) {
      content = content.replace(returnRegex, `return (\n    $1\n      <Breadcrumbs items={breadcrumbItems} />`);
      changed = true;
    }
  }

  // Inject RelatedTools
  // We want to insert <RelatedTools tools={relatedTools} /> right before <SEOSection
  if (!content.includes('<RelatedTools tools={relatedTools} />') && content.includes('<SEOSection')) {
    content = content.replace(/<SEOSection/g, `<RelatedTools tools={relatedTools} />\n      <SEOSection`);
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(file, content, 'utf-8');
    console.log(`Updated ${file}`);
  }
});
