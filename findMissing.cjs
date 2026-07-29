const fs = require('fs');
const execSync = require('child_process').execSync;
const files = execSync('grep -rl "SEOSection" src/components/ | grep -E "Calculator|Planner|Snowball|Payoff|Transfer|Yield|Eligibility|CurrencyConverter"').toString().split('\n').filter(Boolean);

let missingBreadcrumbs = [];
let missingRelatedTools = [];
let missingLink = [];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf-8');
  if (content.includes('<Breadcrumbs') && !content.includes('import Breadcrumbs')) {
    missingBreadcrumbs.push(file);
  }
  if (content.includes('<RelatedTools') && !content.includes('import RelatedTools')) {
    missingRelatedTools.push(file);
  }
  if (content.includes('<Link') && !content.includes('import { Link }')) {
    missingLink.push(file);
  }
});
console.log('Missing Breadcrumbs:', missingBreadcrumbs);
console.log('Missing RelatedTools:', missingRelatedTools);
console.log('Missing Link:', missingLink);
