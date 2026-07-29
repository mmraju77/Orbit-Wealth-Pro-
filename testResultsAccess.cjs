const fs = require('fs');
const execSync = require('child_process').execSync;
const files = execSync('grep -rl "useState(null)" src/components/').toString().split('\n').filter(Boolean);

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf-8');
  let lines = content.split('\n');
  let resultsNullCheck = lines.findIndex(l => l.includes('if (!results)'));
  if (resultsNullCheck !== -1) {
    let badLines = [];
    let insideFunc = false;
    let funcBraces = 0;
    for (let i = 0; i < resultsNullCheck; i++) {
      let line = lines[i];
      if (line.includes('const ') && line.includes(' = () => {')) {
        insideFunc = true;
      }
      if (line.includes('const ') && line.includes(' = () => {')) {
        funcBraces = 0; // rough track
      }
      if (insideFunc) {
        if (line.includes('{')) funcBraces += (line.match(/\{/g) || []).length;
        if (line.includes('}')) funcBraces -= (line.match(/\}/g) || []).length;
        if (funcBraces <= 0) insideFunc = false;
      }
      if (!insideFunc && line.includes('results.')) {
        badLines.push({ num: i + 1, content: line });
      }
    }
    if (badLines.length > 0) {
      console.log(`\n${file}:`);
      badLines.forEach(bl => console.log(`  ${bl.num}: ${bl.content}`));
    }
  }
});
