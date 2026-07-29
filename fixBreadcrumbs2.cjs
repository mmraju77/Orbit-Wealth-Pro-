const fs = require('fs');
const execSync = require('child_process').execSync;

const files = execSync('grep -rl "SEOSection" src/components/ | grep -E "Calculator|Planner|Snowball|Payoff|Transfer|Yield|Eligibility|CurrencyConverter"').toString().split('\n').filter(Boolean);

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf-8');
  let changed = false;

  // First, verify we don't have stray Breadcrumbs
  content = content.replace(/\s*<Breadcrumbs items=\{breadcrumbItems\} \/>/g, '');

  let returns = [...content.matchAll(/return\s*\(\s*(<div[^>]*>)/g)];
  if (returns.length > 0) {
    let lastReturnMatch = returns[returns.length - 1];
    let index = lastReturnMatch.index;
    let matchStr = lastReturnMatch[0];
    let divTag = lastReturnMatch[1];
    
    // We want to replace `matchStr` with `matchStr + '\n      <Breadcrumbs items={breadcrumbItems} />'`
    
    // So if matchStr is `return (\n    <div className="space-y-12 pb-20">`
    // We replace it with `return (\n    <div className="space-y-12 pb-20">\n      <Breadcrumbs items={breadcrumbItems} />`
    
    let replacement = `return (\n    ${divTag}\n      <Breadcrumbs items={breadcrumbItems} />`;
    
    content = content.substring(0, index) + replacement + content.substring(index + matchStr.length);
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(file, content, 'utf-8');
    console.log(`Fixed ${file}`);
  }
});
