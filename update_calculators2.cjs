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

    // Find the main return statement
    const returnRegex = /(return \(\s*<div[^>]*>)/;
    
    if (content.match(returnRegex)) {
        if (!content.includes('<Breadcrumbs items={breadcrumbItems} />')) {
            content = content.replace(returnRegex, `$1\n        <Breadcrumbs items={breadcrumbItems} />`);
        }
    } else {
        // Look for Fragment return
        const returnFragmentRegex = /(return \(\s*<>)/;
        if (content.match(returnFragmentRegex)) {
             if (!content.includes('<Breadcrumbs items={breadcrumbItems} />')) {
                content = content.replace(returnFragmentRegex, `$1\n        <Breadcrumbs items={breadcrumbItems} />`);
             }
        }
    }

    fs.writeFileSync(filePath, content, 'utf8');
  }
}
