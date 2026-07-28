const fs = require('fs');
const path = require('path');

const routeReplacements = {
  '/calculators/mortgage': '/calculators/loans/mortgage',
  '/calculators/retirement': '/calculators/investing/retirement',
  '/calculators/income-tax': '/calculators/tax/income-tax',
  '/calculators/gst': '/calculators/tax/gst',
  '/calculators/fd-rd': '/calculators/investing/fd-rd',
  '/calculators/sip': '/calculators/investing/sip',
  '/calculators/lumpsum': '/calculators/investing/lumpsum',
  '/calculators/emi': '/calculators/loans/emi',
  '/calculators/mutual-fund': '/calculators/investing/mutual-fund',
  '/calculators/loan-eligibility': '/calculators/loans/eligibility',
  '/calculators/home-loan-transfer': '/calculators/loans/home-loan-transfer',
  '/calculators/gratuity': '/calculators/salary/gratuity',
  '/calculators/currency-converter': '/calculators/forex/currency-converter',
  '/calculators/personal-loan': '/calculators/loans/personal-loan',
  '/calculators/auto-loan': '/calculators/loans/auto-loan',
  '/calculators/student-loan': '/calculators/loans/student-loan',
  '/calculators/cagr': '/calculators/investing/cagr',
  '/calculators/dividend-yield': '/calculators/investing/dividend-yield',
  '/calculators/child-education': '/calculators/investing/child-education',
  '/calculators/rental-yield': '/calculators/investing/rental-yield',
  '/calculators/debt-snowball': '/calculators/loans/debt-snowball',
  '/calculators/hlv': '/calculators/insurance/hlv',
  '/calculators/break-even': '/calculators/business/break-even',
  '/calculators/credit-card-payoff': '/calculators/loans/credit-card-payoff',
  '/calculators/term-insurance': '/calculators/insurance/term-insurance',
  '/calculators/health-insurance': '/calculators/insurance/health-insurance'
};

const baseUrl = 'https://ais-pre-ppujhwp7woa7petjzv7ac3-338496262969.asia-east1.run.app';
const currentDate = new Date().toISOString();

let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
`;

for (const newPath of Object.values(routeReplacements)) {
  xml += `  <url>
    <loc>${baseUrl}${newPath}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>\n`;
}

xml += `</urlset>`;

fs.writeFileSync(path.join(__dirname, 'public', 'sitemap.xml'), xml, 'utf-8');
console.log('Generated sitemap.xml');
