const fs = require('fs');
const execSync = require('child_process').execSync;
const files = execSync('grep -rl "useState(null)" src/components/').toString().split('\n').filter(Boolean);

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf-8');
  let lines = content.split('\n');
  let resultsNullCheck = lines.findIndex(l => l.includes('if (!results)'));
  if (resultsNullCheck !== -1) {
    let accesses = [];
    let insideFunc = false;
    let braceCount = 0;
    for (let i = 0; i < resultsNullCheck; i++) {
      let line = lines[i];
      if (line.match(/const [a-zA-Z0-9]+ = (\([^)]*\))?(\s*=>\s*)/) || line.match(/function [a-zA-Z0-9]+\(/) || line.match(/useEffect\(/) || line.match(/useMemo\(/)) {
        insideFunc = true;
      }
      if (insideFunc) {
        if (line.includes('{')) braceCount += (line.match(/\{/g) || []).length;
        if (line.includes('}')) braceCount -= (line.match(/\}/g) || []).length;
        if (braceCount <= 0) insideFunc = false;
      }
      if (!insideFunc && line.includes('results.')) {
        accesses.push({ line: i + 1, content: line.trim() });
      }
    }
    if (accesses.length > 0) {
      console.log(`\n${file} null check is on line ${resultsNullCheck + 1}. Suspect lines before it:`);
      accesses.forEach(a => console.log(`  ${a.line}: ${a.content}`));
    }
  }
});
