const fs = require('fs');
const execSync = require('child_process').execSync;
const files = execSync('grep -rl "SEOSection" src/components/ | grep -E "Calculator|Planner|Snowball|Payoff|Transfer|Yield|Eligibility|CurrencyConverter"').toString().split('\n').filter(Boolean);

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf-8');
  let returns = [...content.matchAll(/return\s*\(\s*<div/g)];
  if (returns.length > 0) {
    let lastReturn = returns[returns.length - 1];
    let index = lastReturn.index;
    let snippet = content.substring(index, index + 100);
    console.log(file, '=>', snippet.replace(/\n/g, '\\n'));
  }
});
