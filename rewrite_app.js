import fs from 'fs/promises';

async function main() {
  let content = await fs.readFile('src/App.tsx', 'utf8');

  const newMainContent = `
function MainContent({ sidebarOpen, setSidebarOpen }: { sidebarOpen: boolean; setSidebarOpen: (o: boolean) => void }) {
  const { currency } = useLocale();
  
  useEffect(() => {
    const handleFocus = (e: FocusEvent) => {
      if (e.target instanceof HTMLInputElement) {
        const target = e.target;
        requestAnimationFrame(() => target.select());
      }
    };
    window.addEventListener('focusin', handleFocus);
    return () => window.removeEventListener('focusin', handleFocus);
  }, []);

  return (
    <div key={currency} className="flex h-screen w-full bg-[#0B1221] text-white font-sans selection:bg-[#D4AF37] selection:text-black overflow-hidden relative">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <main className="flex-1 flex flex-col min-w-0 md:pl-64 h-full relative">
        <div className="md:hidden flex-none h-16 bg-[#0B1221]/80 backdrop-blur-md border-b border-white/10 z-50 flex items-center justify-between px-6">
          <div className="flex items-center gap-2">
             <div className="w-8 h-8 bg-[#D4AF37] rounded-lg flex items-center justify-center">
               <Wallet className="w-5 h-5 text-black" />
             </div>
             <span className="font-display font-black text-lg tracking-tighter uppercase text-white">ORBIT WEALTH PRO</span>
          </div>
          <button 
            onClick={() => setSidebarOpen(true)}
            className="p-2 -mr-2 text-white/70 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-[#D4AF37] rounded-lg"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto w-full h-full relative">
          <div className="px-4 py-8 md:p-12 lg:p-16 max-w-7xl mx-auto w-full">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/tax-guides" element={<TaxGuides />} />
                <Route path="/comparisons" element={<ComparisonsDirectory />} />
                <Route path="/cities" element={<CitiesDirectory />} />
                <Route path="/insights" element={<BlogHub />} />
                <Route path="/compare/:pair" element={<ComparePage />} />
                
                <Route path="/calculators/mortgage" element={<MortgageCalculator />} />
                <Route path="/calculators/retirement" element={<RetirementCalculator />} />
                <Route path="/calculators/income-tax" element={<IncomeTaxCalculator />} />
                <Route path="/calculators/gst" element={<GSTCalculator />} />
                <Route path="/calculators/fd-rd" element={<FDRDCalculator />} />
                <Route path="/calculators/sip" element={<SIPCalculator />} />
                <Route path="/calculators/lumpsum" element={<LumpsumCalculator />} />
                <Route path="/calculators/emi" element={<EMICalculator />} />
                <Route path="/calculators/mutual-fund" element={<MFCalculator />} />
                <Route path="/calculators/loan-eligibility" element={<LoanEligibility />} />
                <Route path="/calculators/home-loan-transfer" element={<BalanceTransfer />} />
                <Route path="/calculators/gratuity" element={<GratuityCalculator />} />
                <Route path="/calculators/currency-converter" element={<CurrencyConverter />} />
                <Route path="/calculators/personal-loan" element={<PersonalLoanCalculator />} />
                <Route path="/calculators/auto-loan" element={<AutoLoanCalculator />} />
                <Route path="/calculators/student-loan" element={<StudentLoanCalculator />} />
                <Route path="/calculators/cagr" element={<CAGRCalculator />} />
                <Route path="/calculators/dividend-yield" element={<DividendYieldCalculator />} />
                <Route path="/calculators/child-education" element={<ChildEducationPlanner />} />
                <Route path="/calculators/rental-yield" element={<RentalYieldCalculator />} />
                <Route path="/calculators/debt-snowball" element={<DebtSnowball />} />
                <Route path="/calculators/hlv" element={<HLVCalculator />} />
                <Route path="/calculators/break-even" element={<BreakEvenCalculator />} />
                <Route path="/calculators/credit-card-payoff" element={<CreditCardPayoff />} />
                <Route path="/calculators/term-insurance" element={<TermInsuranceCalculator />} />
                <Route path="/calculators/health-insurance" element={<HealthInsuranceCalculator />} />

                <Route path="/tools/:calculator/:region" element={<PSEOLandingPage />} />
                <Route path="/:region/:calculator" element={<PSEOLandingPage />} />
                
                <Route path="/calculators/tax" element={<Navigate to="/calculators/income-tax" replace />} />
                <Route path="/calculators/eligibility" element={<Navigate to="/calculators/loan-eligibility" replace />} />
                <Route path="/calculators/balance-transfer" element={<Navigate to="/calculators/home-loan-transfer" replace />} />
                <Route path="/calculators/currency" element={<Navigate to="/calculators/currency-converter" replace />} />
                
                <Route path="/about" element={<AboutUs />} />
                <Route path="/contact" element={<ContactUs />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/disclaimer" element={<Disclaimer />} />
                <Route path="/terms-of-service" element={<TermsOfService />} />
                <Route path="/privacy" element={<Navigate to="/privacy-policy" replace />} />
                <Route path="/terms" element={<Navigate to="/terms-of-service" replace />} />
                
                <Route path="*" element={<Dashboard />} />
              </Routes>
            <Footer />
          </div>
        </div>
      
        <OrbitChat />
      </main>
    </div>
  );
}
`;

  content = content.replace(/function MainContent[\s\S]*?export default function App/m, newMainContent + '\n\nexport default function App');
  await fs.writeFile('src/App.tsx', content);
}
main();
