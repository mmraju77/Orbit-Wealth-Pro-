const fs = require('fs');
const execSync = require('child_process').execSync;
const files = execSync('grep -rl "useState(null)" src/components/').toString().split('\n').filter(Boolean);

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf-8');
  let lines = content.split('\n');
  let resultsNullCheck = lines.findIndex(l => l.includes('if (!results)'));
  if (resultsNullCheck !== -1) {
    let resultAccesses = [];
    for (let i = 0; i < resultsNullCheck; i++) {
      if (lines[i].includes('results.')) {
        resultAccesses.push(i + 1);
      }
    }
    if (resultAccesses.length > 0) {
      console.log(`${file} has results. access before null check on lines: ${resultAccesses.join(', ')}`);
    }
  }
});
