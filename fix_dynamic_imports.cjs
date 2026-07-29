const fs = require('fs');
const path = require('path');
const execSync = require('child_process').execSync;

const components = path.join(__dirname, 'src', 'components');

const folders = {
  ui: ['Breadcrumbs', 'CalculatorSEO', 'CurrencyInput', 'NumericInput', 'RelatedTools', 'SEOSection', 'StructuredData', 'Tooltip', 'TrustBadge', 'ArticleModal', 'InsightModal', 'AIAdvisor', 'MarketTicker', 'WealthIntelligenceBlock', 'DebugPanel', 'AmortizationTable'],
  layout: ['Footer', 'Sidebar', 'OrbitChat'],
  pages: ['AboutUs', 'BlogHub', 'BlogPreview', 'CitiesDirectory', 'ComparePage', 'ComparisonsDirectory', 'ContactUs', 'Dashboard', 'Disclaimer', 'PrivacyPolicy', 'PSEOLandingPage', 'TaxGuides', 'TermsOfService'],
  calculators: ['AutoLoanCalculator', 'BalanceTransfer', 'BreakEvenCalculator', 'CAGRCalculator', 'ChildEducationPlanner', 'CreditCardPayoff', 'CurrencyConverter', 'DebtSnowball', 'DividendYieldCalculator', 'EMICalculator', 'FDRDCalculator', 'GratuityCalculator', 'GSTCalculator', 'HealthInsuranceCalculator', 'HLVCalculator', 'IncomeTaxCalculator', 'LoanEligibility', 'LumpsumCalculator', 'MFCalculator', 'MortgageCalculator', 'PersonalLoanCalculator', 'RentalYieldCalculator', 'RetirementCalculator', 'SIPCalculator', 'StudentLoanCalculator', 'TermInsuranceCalculator', 'WealthMilestones']
};

const fileMap = {};
Object.entries(folders).forEach(([folder, names]) => {
  names.forEach(n => fileMap[n] = folder);
});

function processFolder(dir) {
    const currentFolder = path.basename(dir);
    if (!folders[currentFolder]) return; // only process valid component folders

    fs.readdirSync(dir).forEach(file => {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) return;

        let content = fs.readFileSync(fullPath, 'utf8');
        let modified = false;

        Object.keys(fileMap).forEach(targetName => {
            const targetFolder = fileMap[targetName];
            const r_import = new RegExp(`import\\(['"]\\.\\/${targetName}['"]\\)`, 'g');
            
            if (content.match(r_import)) {
                let newPath = currentFolder === targetFolder ? `./${targetName}` : `../${targetFolder}/${targetName}`;
                content = content.replace(r_import, `import('${newPath}')`);
                modified = true;
            }
        });

        if (modified) {
            fs.writeFileSync(fullPath, content, 'utf8');
            console.log(`Fixed dynamic imports in ${fullPath}`);
        }
    });
}

['ui', 'layout', 'pages', 'calculators'].forEach(f => processFolder(path.join(components, f)));

