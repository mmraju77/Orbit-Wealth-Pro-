const fs = require('fs');
const path = require('path');
const execSync = require('child_process').execSync;

const files = execSync('grep -rn "motion/react" src/ | cut -d: -f1').toString().split('\n').filter(Boolean);
files.forEach(file => {
  let content = fs.readFileSync(file, 'utf-8');
  content = content.replace(/import\s+\{\s*motion\s*(,\s*AnimatePresence)?\s*\}\s*from\s*'motion\/react';/g, "import { m as motion $1 } from 'motion/react';");
  fs.writeFileSync(file, content, 'utf-8');
});
console.log('Fixed motion imports');
