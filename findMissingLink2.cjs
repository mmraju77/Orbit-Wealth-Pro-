const fs = require('fs');
const execSync = require('child_process').execSync;
const files = execSync('find src -name "*.tsx"').toString().split('\n').filter(Boolean);

let missingLink = [];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf-8');
  if (content.match(/<Link[\s>]/)) {
    if (!content.match(/import\s+{[^}]*Link[^}]*}\s+from\s+['"]react-router-dom['"]/)) {
      missingLink.push(file);
    }
  }
});
console.log('Missing Link:', missingLink);
