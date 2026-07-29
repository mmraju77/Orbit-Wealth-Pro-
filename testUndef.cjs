const fs = require('fs');
const execSync = require('child_process').execSync;
const files = execSync('grep -rl "SEOSection" src/components/ | grep -E "Calculator|Planner|Snowball|Payoff|Transfer|Yield|Eligibility|CurrencyConverter"').toString().split('\n').filter(Boolean);

let undefVars = [];
files.forEach(file => {
  let content = fs.readFileSync(file, 'utf-8');
  if (content.includes('<Breadcrumbs items={breadcrumbItems} />') && !content.includes('const breadcrumbItems')) {
    undefVars.push(`${file} missing breadcrumbItems`);
  }
  if (content.includes('<RelatedTools tools={relatedTools} />') && !content.includes('const relatedTools')) {
    undefVars.push(`${file} missing relatedTools`);
  }
});
console.log(undefVars);
