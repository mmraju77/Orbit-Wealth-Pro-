const fs = require('fs');
const path = require('path');

function processDirectory(dir) {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            processDirectory(fullPath);
        } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let originalContent = content;

            // Fix the botched replacement: "/ decoding="async">" to "decoding="async" />"
            content = content.replace(/\/ decoding="async">/g, 'decoding="async" />');
            content = content.replace(/\/ loading="lazy" decoding="async">/g, 'loading="lazy" decoding="async" />');

            if (content !== originalContent) {
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log(`Fixed images in ${fullPath}`);
            }
        }
    }
}

processDirectory(path.join(__dirname, 'src', 'components'));
