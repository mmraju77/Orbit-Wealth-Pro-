const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, 'src', 'App.tsx');
let content = fs.readFileSync(file, 'utf-8');

// Add LazyMotion and domAnimation import
if (!content.includes('LazyMotion')) {
    content = "import { LazyMotion, domAnimation } from 'motion/react';\n" + content;
}

// Update GoogleAnalytics script to defer
content = content.replace(/script\.async = true;/, 'script.defer = true;');

// Wrap the HashRouter with LazyMotion
content = content.replace(/<HashRouter>/, '<LazyMotion features={domAnimation}>\n      <HashRouter>');
content = content.replace(/<\/HashRouter>/, '<\/HashRouter>\n      </LazyMotion>');

fs.writeFileSync(file, content, 'utf-8');
console.log('Fixed App.tsx');
