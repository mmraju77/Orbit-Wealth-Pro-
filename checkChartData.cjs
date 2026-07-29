const fs = require('fs');
const execSync = require('child_process').execSync;
const files = execSync('grep -rl "useState(null)" src/components/').toString().split('\n').filter(Boolean);

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf-8');
  let lines = content.split('\n');
  let resultsNullCheck = lines.findIndex(l => l.includes('if (!results)'));
  if (resultsNullCheck !== -1) {
    for (let i = 0; i < resultsNullCheck; i++) {
      if (lines[i].includes('results.') && !lines[i].includes('results.yearlyData') && !lines[i].includes('results.monthlyData') && !lines[i].includes('results.amortization') && !lines[i].includes('results.schedule')) {
        // Let's print out the exact lines. We want to see if they are inside a function or not.
        // It's easier to just move `if (!results)` up in all these files!
      }
    }
  }
});
