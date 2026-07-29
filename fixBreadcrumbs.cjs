const fs = require('fs');
const execSync = require('child_process').execSync;

const files = execSync('grep -rl "SEOSection" src/components/ | grep -E "Calculator|Planner|Snowball|Payoff|Transfer|Yield|Eligibility|CurrencyConverter"').toString().split('\n').filter(Boolean);

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf-8');
  let changed = false;

  // First, remove all existing <Breadcrumbs items={breadcrumbItems} />
  if (content.includes('<Breadcrumbs items={breadcrumbItems} />')) {
    content = content.replace(/\s*<Breadcrumbs items=\{breadcrumbItems\} \/>/g, '');
    changed = true;
  }

  // Now, we need to insert it correctly.
  // The correct return is the main return of the component.
  // We can look for `return (` and then the first `div` that is NOT followed by `animate-pulse` or similar.
  // Or better, we can inject it right before `<StructuredData` or before `<div className="flex flex-col md:flex-row`.
  // Let's see what's common.
  
  // Is <StructuredData common?
  // Let's just find the last `return (` or the one that is at the outer level.
  // We can do it by finding:
  // return (
  //   <div className="...something...">
  //     <div className="flex flex-col md:flex-row ...
  
  if (changed) {
    fs.writeFileSync(file, content, 'utf-8');
  }
});
