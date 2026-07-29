const fs = require('fs');
const path = require('path');

const src = path.join(__dirname, 'src');
const components = path.join(src, 'components');

const folders = {
  ui: ['Breadcrumbs', 'CalculatorSEO', 'CurrencyInput', 'NumericInput', 'RelatedTools', 'SEOSection', 'StructuredData', 'Tooltip', 'TrustBadge', 'ArticleModal', 'InsightModal', 'AIAdvisor', 'MarketTicker', 'WealthIntelligenceBlock', 'DebugPanel', 'AmortizationTable'],
  layout: ['Footer', 'Sidebar', 'OrbitChat'],
  pages: ['AboutUs', 'BlogHub', 'BlogPreview', 'CitiesDirectory', 'ComparePage', 'ComparisonsDirectory', 'ContactUs', 'Dashboard', 'Disclaimer', 'PrivacyPolicy', 'PSEOLandingPage', 'TaxGuides', 'TermsOfService'],
  calculators: ['AutoLoanCalculator', 'BalanceTransfer', 'BreakEvenCalculator', 'CAGRCalculator', 'ChildEducationPlanner', 'CreditCardPayoff', 'CurrencyConverter', 'DebtSnowball', 'DividendYieldCalculator', 'EMICalculator', 'FDRDCalculator', 'GratuityCalculator', 'GSTCalculator', 'HealthInsuranceCalculator', 'HLVCalculator', 'IncomeTaxCalculator', 'LoanEligibility', 'LumpsumCalculator', 'MFCalculator', 'MortgageCalculator', 'PersonalLoanCalculator', 'RentalYieldCalculator', 'RetirementCalculator', 'SIPCalculator', 'StudentLoanCalculator', 'TermInsuranceCalculator', 'WealthMilestones']
};

// 1. Create Directories
Object.keys(folders).forEach(f => {
  const p = path.join(components, f);
  if (!fs.existsSync(p)) fs.mkdirSync(p);
});

const fileMap = {};
Object.entries(folders).forEach(([folder, names]) => {
  names.forEach(n => fileMap[n] = folder);
});

// Helper to update imports
function updateImports(content, currentFolder) {
  let newContent = content;

  if (currentFolder !== 'app') {
      // Fix src/ imports: change '../' to '../../' (since files moved one level deeper)
      newContent = newContent.replace(/from\s+['"]\.\.\//g, "from '../../");
      newContent = newContent.replace(/import\(['"]\.\.\//g, "import('../../");
  }

  // Update component cross-imports
  Object.keys(fileMap).forEach(targetName => {
    const targetFolder = fileMap[targetName];

    if (currentFolder === 'app') {
       const r1 = new RegExp(`from\\s+['"]\\.\\/components\\/${targetName}['"]`, 'g');
       const r_import = new RegExp(`import\\(['"]\\.\\/components\\/${targetName}['"]\\)`, 'g');
       newContent = newContent.replace(r1, `from './components/${targetFolder}/${targetName}'`);
       newContent = newContent.replace(r_import, `import('./components/${targetFolder}/${targetName}')`);
    } else {
       // Component was originally imported as './TargetName'
       const r2 = new RegExp(`from\\s+['"]\\.\\/${targetName}['"]`, 'g');
       let newPath = currentFolder === targetFolder ? `./${targetName}` : `../${targetFolder}/${targetName}`;
       newContent = newContent.replace(r2, `from '${newPath}'`);
    }
  });

  return newContent;
}

// 2. Process App.tsx (Switch to BrowserRouter & Update Imports)
let appPath = path.join(src, 'App.tsx');
if (fs.existsSync(appPath)) {
  let appContent = fs.readFileSync(appPath, 'utf8');
  appContent = updateImports(appContent, 'app');
  appContent = appContent.replace(/HashRouter/g, 'BrowserRouter');
  fs.writeFileSync(appPath, appContent, 'utf8');
  console.log('App.tsx optimized (BrowserRouter + Lazy Imports mapped).');
}

// 3. Process all components (Move, Update Imports, Optimize Hooks)
fs.readdirSync(components).forEach(file => {
  const filePath = path.join(components, file);
  if (fs.statSync(filePath).isDirectory()) return;
  if (!file.endsWith('.tsx') && !file.endsWith('.ts')) return;
  
  const baseName = file.replace(/\.tsx?$/, '');
  const folder = fileMap[baseName];
  if (!folder) return;

  let content = fs.readFileSync(filePath, 'utf8');

  // Update Imports
  content = updateImports(content, folder);

  // Memory Leak Fix (add clearTimeout)
  if (content.includes('const timer = setTimeout') && !content.includes('clearTimeout(timer)')) {
      content = content.replace(/(const timer = setTimeout[\s\S]*?)(},\s*\[)/g, '$1  return () => clearTimeout(timer);\n$2');
  }

  // Optimize generic Re-renders: UseMemo for complex inline arrays
  if (content.match(/const chartData = results \? \[/)) {
      content = content.replace(/const chartData = results \? (\[[\s\S]*?\]) : \[\];/g, 'const chartData = React.useMemo(() => results ? $1 : [], [results]);');
  }

  const newPath = path.join(components, folder, file);
  fs.writeFileSync(newPath, content, 'utf8');
  fs.unlinkSync(filePath);
  console.log(`Moved and optimized ${file} -> ${folder}/${file}`);
});

console.log('Architecture optimization complete.');
