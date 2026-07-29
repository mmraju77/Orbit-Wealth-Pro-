const fs = require('fs');
const execSync = require('child_process').execSync;
const files = execSync('grep -rl "RelatedTools" src/components/ | grep -v "RelatedTools.tsx"').toString().split('\n').filter(Boolean);

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf-8');
  if (content.includes('<RelatedTools') && !content.includes('import RelatedTools')) {
    console.log(`Missing RelatedTools import: ${file}`);
  }
  if (content.includes('<Breadcrumbs') && !content.includes('import Breadcrumbs')) {
    console.log(`Missing Breadcrumbs import: ${file}`);
  }
});
