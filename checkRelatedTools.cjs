const fs = require('fs');
const execSync = require('child_process').execSync;
const files = execSync('grep -rl "RelatedTools" src/components/ | grep -v "RelatedTools.tsx"').toString().split('\n').filter(Boolean);

let missing = [];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf-8');
  if (content.includes('<RelatedTools tools={relatedTools} />') && !content.includes('const relatedTools')) {
    missing.push(file);
  }
});
console.log('Missing relatedTools:', missing);
