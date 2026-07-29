const fs = require('fs');
let content = fs.readFileSync('src/lib/liveFinance.ts', 'utf8');
content = content.replace(
  "fetch('https://api.worldbank.org/v2/country/WLD/indicator/FR.INR.RINR?format=json&mrnev=1')",
  "fetch('/api/finance/rates')"
);
fs.writeFileSync('src/lib/liveFinance.ts', content);
