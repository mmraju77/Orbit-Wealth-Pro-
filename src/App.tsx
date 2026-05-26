/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState, lazy, Suspense } from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Menu, Wallet, Loader2 } from 'lucide-react';

// Context
import { LocaleProvider, useLocale } from './context/LocaleContext';

// Components
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import OrbitChat from './components/OrbitChat';

// Core Views
const Dashboard = lazy(() => import('./components/Dashboard'));
const TaxGuides = lazy(() => import('./components/TaxGuides'));
const BlogHub = lazy(() => import('./components/BlogHub'));
const AboutUs = lazy(() => import('./components/AboutUs'));
const ContactUs = lazy(() => import('./components/ContactUs'));

// Calculators & Tools
const MortgageCalculator = lazy(() => import('./components/MortgageCalculator'));
const RetirementCalculator = lazy(() => import('./components/RetirementCalculator'));
const IncomeTaxCalculator = lazy(() => import('./components/IncomeTaxCalculator'));
const GSTCalculator = lazy(() => import('./components/GSTCalculator'));
const FDRDCalculator = lazy(() => import('./components/FDRDCalculator'));
const SIPCalculator = lazy(() => import('./components/SIPCalculator'));
const LumpsumCalculator = lazy(() => import('./components/LumpsumCalculator'));
const EMICalculator = lazy(() => import('./components/EMICalculator'));
const MFCalculator = lazy(() => import('./components/MFCalculator'));
const LoanEligibility = lazy(() => import('./components/LoanEligibility'));
const BalanceTransfer = lazy(() => import('./components/BalanceTransfer'));
const GratuityCalculator = lazy(() => import('./components/GratuityCalculator'));
const CurrencyConverter = lazy(() => import('./components/CurrencyConverter'));
const PersonalLoanCalculator = lazy(() => import('./components/PersonalLoanCalculator'));
const AutoLoanCalculator = lazy(() => import('./components/AutoLoanCalculator'));
const StudentLoanCalculator = lazy(() => import('./components/StudentLoanCalculator'));
const CAGRCalculator = lazy(() => import('./components/CAGRCalculator'));
const DividendYieldCalculator = lazy(() => import('./components/DividendYieldCalculator'));
const ChildEducationPlanner = lazy(() => import('./components/ChildEducationPlanner'));
const RentalYieldCalculator = lazy(() => import('./components/RentalYieldCalculator'));
const DebtSnowball = lazy(() => import('./components/DebtSnowball'));
const HLVCalculator = lazy(() => import('./components/HLVCalculator'));
const BreakEvenCalculator = lazy(() => import('./components/BreakEvenCalculator'));
const CreditCardPayoff = lazy(() => import('./components/CreditCardPayoff'));
const TermInsuranceCalculator = lazy(() => import('./components/TermInsuranceCalculator'));
const HealthInsuranceCalculator = lazy(() => import('./components/HealthInsuranceCalculator'));

// Pages
const PSEOLandingPage = lazy(() => import('./components/PSEOLandingPage'));
const ComparePage = lazy(() => import('./components/ComparePage'));
const ComparisonsDirectory = lazy(() => import('./components/ComparisonsDirectory'));
const CitiesDirectory = lazy(() => import('./components/CitiesDirectory'));
const PrivacyPolicy = lazy(() => import('./components/PrivacyPolicy'));
const Disclaimer = lazy(() => import('./components/Disclaimer'));
const TermsOfService = lazy(() => import('./components/TermsOfService'));

// Utils
import { resolveRegion } from './data/pSEOData';

function LoadingFallback() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
      <Loader2 className="w-8 h-8 text-[#D4AF37] animate-spin" />
      <span className="text-white/40 font-mono text-xs tracking-widest uppercase">Initializing Calculation Engine...</span>
    </div>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    const scrollContainer = document.querySelector('.overflow-y-auto');
    if (scrollContainer) scrollContainer.scrollTo(0, 0);
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function RegionSynchronizer() {
  const { pathname } = useLocation();
  const { setCurrency, setNumberSystem } = useLocale();

  useEffect(() => {
    try {
      const hash = window.location.hash || '';
      const parts = hash.split('/').filter(p => p && p !== '#');
      if (parts.length === 0) return;

      const reversedParts = [...parts].reverse();
      for (const part of reversedParts) {
        const cleanPart = part.toLowerCase();
        const data = resolveRegion(cleanPart);
        if (data) {
          setCurrency(data.currency);
          setNumberSystem(data.name === 'India' ? 'Indian' : 'International');
          break;
        }
      }
    } catch (e) {
      console.error('Region Sync Error:', e);
    }
  }, [pathname, setCurrency, setNumberSystem]);

  return null;
}

function MainContent({ sidebarOpen, setSidebarOpen }: { sidebarOpen: boolean; setSidebarOpen: (o: boolean) => void }) {
  const { currency } = useLocale();
  
  return (
    <div key={currency} className="flex bg-[#0B1221] min-h-screen text-white font-sans selection:bg-[#D4AF37] selection:text-black relative">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <main className="flex-1 md:ml-64 min-h-screen flex flex-col relative overflow-hidden">
        {/* Mobile Header */}
        <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-[#0B1221]/80 backdrop-blur-md border-b border-white/10 z-50 flex items-center justify-between px-6">
          <div className="flex items-center gap-2">
             <div className="w-8 h-8 bg-[#D4AF37] rounded-lg flex items-center justify-center">
               <Wallet className="w-5 h-5 text-black" />
             </div>
             <span className="font-display font-black text-sm tracking-tighter uppercase text-white">ORBIT WEALTH PRO</span>
          </div>
          <button 
            onClick={() => setSidebarOpen(true)}
            className="p-2 -mr-2 text-white/60 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-[#D4AF37] rounded-lg"
            aria-label="Open Navigation Menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto overflow-x-hidden pt-16 md:pt-0">
          <div className="px-[20px] py-8 md:p-16 lg:p-24 max-w-7xl mx-auto">
            <Suspense fallback={<LoadingFallback />}>
              <Routes>
                {/* Core Views */}
                <Route path="/" element={<Dashboard />} />
                <Route path="/tax-guides" element={<TaxGuides />} />
                <Route path="/comparisons" element={<ComparisonsDirectory />} />
                <Route path="/cities" element={<CitiesDirectory />} />
                <Route path="/insights" element={<BlogHub />} />
                <Route path="/compare/:pair" element={<ComparePage />} />
                
                {/* Dynamic Calculator Routing - Ensuring DOM efficiency by unmounting inactive views */}
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

                {/* pSEO & Tools */}
                <Route path="/tools/:calculator/:region" element={<PSEOLandingPage />} />
                <Route path="/:region/:calculator" element={<PSEOLandingPage />} />
                
                {/* Legacy Redirects */}
                <Route path="/calculators/tax" element={<Navigate to="/calculators/income-tax" replace />} />
                <Route path="/calculators/eligibility" element={<Navigate to="/calculators/loan-eligibility" replace />} />
                <Route path="/calculators/balance-transfer" element={<Navigate to="/calculators/home-loan-transfer" replace />} />
                <Route path="/calculators/currency" element={<Navigate to="/calculators/currency-converter" replace />} />
                
                {/* Legal & Static */}
                <Route path="/about" element={<AboutUs />} />
                <Route path="/contact" element={<ContactUs />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/disclaimer" element={<Disclaimer />} />
                <Route path="/terms-of-service" element={<TermsOfService />} />
                <Route path="/privacy" element={<Navigate to="/privacy-policy" replace />} />
                <Route path="/terms" element={<Navigate to="/terms-of-service" replace />} />
                
                {/* Fallback */}
                <Route path="*" element={<Dashboard />} />
              </Routes>
            </Suspense>
            <Footer />
          </div>
        </div>
      <OrbitChat />
      </main>
    </div>
  );
}

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <HelmetProvider>
      <HashRouter>
        <LocaleProvider>
          <RegionSynchronizer />
          <ScrollToTop />
          <MainContent sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        </LocaleProvider>
      </HashRouter>
    </HelmetProvider>
  );
}
