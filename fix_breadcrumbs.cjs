const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, 'src/components');

const config = {
  AutoLoanCalculator: true, BalanceTransfer: true, BreakEvenCalculator: true, CAGRCalculator: true, ChildEducationPlanner: true, CreditCardPayoff: true, CurrencyConverter: true, DebtSnowball: true, DividendYieldCalculator: true, EMICalculator: true, FDRDCalculator: true, GratuityCalculator: true, GSTCalculator: true, HealthInsuranceCalculator: true, HLVCalculator: true, IncomeTaxCalculator: true, LoanEligibility: true, LumpsumCalculator: true, MFCalculator: true, MortgageCalculator: true, PersonalLoanCalculator: true, RentalYieldCalculator: true, RetirementCalculator: true, SIPCalculator: true, StudentLoanCalculator: true, TermInsuranceCalculator: true
};

const components = Object.keys(config);
for (const comp of components) {
  const filePath = path.join(dir, `${comp}.tsx`);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');

    // Remove incorrectly placed breadcrumbs
    content = content.replace(/className="animate-pulse h-96 bg-white\/5 rounded-3xl w-full max-w-7xl mx-auto mt-8" \/>\s*<Breadcrumbs items=\{breadcrumbItems\} \/>/, 'className="animate-pulse h-96 bg-white/5 rounded-3xl w-full max-w-7xl mx-auto mt-8" />');

    // Add exactly after `return (\n    <div className="space-y-8 pb-20 text-white">`
    const targetReturn = /(return \(\s*<div className="space-y-8[^>]*>)/;
    if (content.match(targetReturn)) {
        if (!content.match(/return \(\s*<div className="space-y-8[^>]*>\s*<Breadcrumbs items=\{breadcrumbItems\} \/>/)) {
            content = content.replace(targetReturn, `$1\n      <Breadcrumbs items={breadcrumbItems} />`);
        }
    }
    fs.writeFileSync(filePath, content, 'utf8');
  }
}
