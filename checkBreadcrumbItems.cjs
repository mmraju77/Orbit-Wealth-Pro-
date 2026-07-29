const fs = require('fs');
const execSync = require('child_process').execSync;
const files = execSync('grep -rl "Breadcrumbs" src/components/ | grep -v "Breadcrumbs.tsx"').toString().split('\n').filter(Boolean);

let missing = [];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf-8');
  if (content.includes('<Breadcrumbs items={breadcrumbItems} />') && !content.includes('const breadcrumbItems')) {
    missing.push(file);
  }
});
console.log('Missing breadcrumbItems:', missing);
