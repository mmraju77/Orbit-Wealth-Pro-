const fs = require('fs');
const path = require('path');
const execSync = require('child_process').execSync;

const componentsDir = path.join(__dirname, 'src', 'components');

function applyMemo(file) {
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');
        if (content.includes('export default function') && !content.includes('React.memo(')) {
            content = content.replace(/export default function ([A-Za-z0-9_]+)\s*\(/, 'export default React.memo(function $1(');
            // Close the parenthesis at the very end
            // Usually the file ends with }\n or }
            // Let's replace the last } with });
            let lastBrace = content.lastIndexOf('}');
            if (lastBrace !== -1) {
               content = content.substring(0, lastBrace) + '});' + content.substring(lastBrace + 1);
            }
            fs.writeFileSync(file, content, 'utf8');
            console.log(`Applied React.memo to ${file}`);
        }
    }
}

['layout/Sidebar.tsx', 'layout/Footer.tsx', 'ui/Breadcrumbs.tsx', 'ui/CalculatorSEO.tsx', 'ui/SEOSection.tsx', 'ui/TrustBadge.tsx'].forEach(f => applyMemo(path.join(componentsDir, f)));

