const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, 'src', 'App.tsx');
let content = fs.readFileSync(file, 'utf-8');

const routeReplacements = {
  '/calculators/mortgage': '/calculators/loans/mortgage',
  '/calculators/retirement': '/calculators/investing/retirement',
  '/calculators/income-tax': '/calculators/tax/income-tax',
  '/calculators/gst': '/calculators/tax/gst',
  '/calculators/fd-rd': '/calculators/investing/fd-rd',
  '/calculators/sip': '/calculators/investing/sip',
  '/calculators/lumpsum': '/calculators/investing/lumpsum',
  '/calculators/emi': '/calculators/loans/emi',
  '/calculators/mutual-fund': '/calculators/investing/mutual-fund',
  '/calculators/loan-eligibility': '/calculators/loans/eligibility',
  '/calculators/home-loan-transfer': '/calculators/loans/home-loan-transfer',
  '/calculators/gratuity': '/calculators/salary/gratuity',
  '/calculators/currency-converter': '/calculators/forex/currency-converter',
  '/calculators/personal-loan': '/calculators/loans/personal-loan',
  '/calculators/auto-loan': '/calculators/loans/auto-loan',
  '/calculators/student-loan': '/calculators/loans/student-loan',
  '/calculators/cagr': '/calculators/investing/cagr',
  '/calculators/dividend-yield': '/calculators/investing/dividend-yield',
  '/calculators/child-education': '/calculators/investing/child-education',
  '/calculators/rental-yield': '/calculators/investing/rental-yield',
  '/calculators/debt-snowball': '/calculators/loans/debt-snowball',
  '/calculators/hlv': '/calculators/insurance/hlv',
  '/calculators/break-even': '/calculators/business/break-even',
  '/calculators/credit-card-payoff': '/calculators/loans/credit-card-payoff',
  '/calculators/term-insurance': '/calculators/insurance/term-insurance',
  '/calculators/health-insurance': '/calculators/insurance/health-insurance'
};

for (const [oldPath, newPath] of Object.entries(routeReplacements)) {
  const regex = new RegExp(`path="${oldPath}"`, 'g');
  content = content.replace(regex, `path="${newPath}"`);
}

fs.writeFileSync(file, content, 'utf-8');
console.log('Fixed Routes in App.tsx');
