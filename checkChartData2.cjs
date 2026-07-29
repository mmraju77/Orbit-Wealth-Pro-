const fs = require('fs');
const execSync = require('child_process').execSync;
const files = execSync('grep -rl "useState(null)" src/components/').toString().split('\n').filter(Boolean);

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf-8');
  
  if (content.match(/const [a-zA-Z0-9]+Data = \[.*?\];/s)) {
    let match = content.match(/const [a-zA-Z0-9]+Data = \[.*?\];/s)[0];
    if (match.includes('results.')) {
      console.log(`\n${file} has array with results: \n${match.substring(0, 150)}`);
    }
  }
});
