const fs = require('fs');
const path = require('path');
const execSync = require('child_process').execSync;

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

            // Add loading="lazy" if not present and decoding="async"
            content = content.replace(/<img\s+([^>]*?)>/g, (match, attrs) => {
                let newAttrs = attrs;
                if (!newAttrs.includes('loading=')) {
                    newAttrs += ' loading="lazy"';
                }
                if (!newAttrs.includes('decoding=')) {
                    newAttrs += ' decoding="async"';
                }
                return `<img ${newAttrs}>`;
            });

            if (content !== originalContent) {
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log(`Optimized images in ${fullPath}`);
            }
        }
    }
}

processDirectory(path.join(__dirname, 'src', 'components'));
