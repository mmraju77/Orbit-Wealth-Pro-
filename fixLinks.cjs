const fs = require('fs');
const path = require('path');
const execSync = require('child_process').execSync;

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

const files = execSync('find src -type f -name "*.tsx"').toString().split('\n').filter(Boolean);

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf-8');
  let changed = false;
  
  for (const [oldPath, newPath] of Object.entries(routeReplacements)) {
    // Replace exact matches in strings, like to="/calculators/sip" or path: "/calculators/sip"
    const escapedOld = oldPath.replace(/\//g, '\\/');
    const regex1 = new RegExp(`'${escapedOld}'`, 'g');
    const regex2 = new RegExp(`"${escapedOld}"`, 'g');
    const regex3 = new RegExp(`\`${escapedOld}\``, 'g');
    
    if (regex1.test(content) || regex2.test(content) || regex3.test(content)) {
      content = content.replace(regex1, `'${newPath}'`);
      content = content.replace(regex2, `"${newPath}"`);
      content = content.replace(regex3, `\`${newPath}\``);
      changed = true;
    }
  }

  if (changed) {
    fs.writeFileSync(file, content, 'utf-8');
    console.log(`Updated links in ${file}`);
  }
});
