/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, lazy, Suspense } from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation, useParams } from 'react-router-dom';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    const scrollContainer = document.querySelector('.overflow-y-auto');
    if (scrollContainer) scrollContainer.scrollTo(0, 0);
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { LocaleProvider, useLocale } from './context/LocaleContext';
import { CurrencyCode } from './types';
import { resolveRegion } from './data/pSEOData';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';

// Optimized Components (Lazy Loaded)
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
const TaxGuides = lazy(() => import('./components/TaxGuides'));
const PSEOLandingPage = lazy(() => import('./components/PSEOLandingPage'));
const ComparePage = lazy(() => import('./components/ComparePage'));
const ComparisonsDirectory = lazy(() => import('./components/ComparisonsDirectory'));
const CitiesDirectory = lazy(() => import('./components/CitiesDirectory'));
const BlogHub = lazy(() => import('./components/BlogHub'));
const TermInsuranceCalculator = lazy(() => import('./components/TermInsuranceCalculator'));
const HealthInsuranceCalculator = lazy(() => import('./components/HealthInsuranceCalculator'));
const PrivacyPolicy = lazy(() => import('./components/PrivacyPolicy'));
const Disclaimer = lazy(() => import('./components/Disclaimer'));
const TermsOfService = lazy(() => import('./components/TermsOfService'));
const ContactUs = lazy(() => import('./components/ContactUs'));
const AboutUs = lazy(() => import('./components/AboutUs'));

const LoadingFallback = () => (
  <div className="flex items-center justify-center p-32">
    <div className="w-8 h-8 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin"></div>
  </div>
);
import Footer from './components/Footer';
import OrbitChat from './components/OrbitChat';

import { Menu, X, ShieldCheck, Wallet } from 'lucide-react';

function RegionSynchronizer() {
  const { pathname } = useLocation();
  const { setCurrency, setNumberSystem, currency: currentCurrency } = useLocale();

  useEffect(() => {
    // Specifically parse window.location.hash as per user request for HashRouter compliance
    // In HashRouter, pathname matches the part after #, but we'll use hash explicitly to be sure
    const hash = window.location.hash || '';
    const parts = hash.split('/').filter(p => p && p !== '#');
    
    if (parts.length === 0) return;

    let regionData = null;
    const reversedParts = [...parts].reverse();
    for (const part of reversedParts) {
      const decodedPart = decodeURIComponent(part).toLowerCase().replace(/-/g, ' ');
      const cleanPart = part.toLowerCase();
      const data = resolveRegion(cleanPart) || resolveRegion(decodedPart);
      if (data) {
        regionData = data;
        break;
      }
    }

    if (regionData) {
      if (regionData.currency !== currentCurrency) {
        setCurrency(regionData.currency);
        setNumberSystem(regionData.name === 'India' ? 'Indian' : 'International');
      }
    }
  }, [pathname, setCurrency, setNumberSystem, currentCurrency]);

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
            className="p-2 -mr-2 text-white/60 hover:text-white transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto overflow-x-hidden pt-16 md:pt-0">
          <div className="px-[20px] py-8 md:p-16 lg:p-24 max-w-7xl mx-auto">
            <Suspense fallback={<LoadingFallback />}>
              <Routes>
                <Route path="/" element={<Dashboard />} />
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
              <Route path="/tax-guides" element={<TaxGuides />} />
              
              <Route path="/calculators/term-insurance" element={<TermInsuranceCalculator />} />
              <Route path="/calculators/health-insurance" element={<HealthInsuranceCalculator />} />
            
            {/* Dynamic pSEO Routes */}
            <Route path="/tools/:calculator/:region" element={<PSEOLandingPage />} />
            <Route path="/:region/:calculator" element={<PSEOLandingPage />} />
            <Route path="/compare/:pair" element={<ComparePage />} />
            <Route path="/comparisons" element={<ComparisonsDirectory />} />
            <Route path="/cities" element={<CitiesDirectory />} />
            <Route path="/insights" element={<BlogHub />} />
            
            {/* Legacy redirects/backwards compatibility if needed, but here we strictly follow sitemap */}
            <Route path="/calculators/tax" element={<Navigate to="/calculators/income-tax" replace />} />
            <Route path="/calculators/eligibility" element={<Navigate to="/calculators/loan-eligibility" replace />} />
            <Route path="/calculators/balance-transfer" element={<Navigate to="/calculators/home-loan-transfer" replace />} />
            <Route path="/calculators/currency" element={<Navigate to="/calculators/currency-converter" replace />} />
            
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/disclaimer" element={<Disclaimer />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/privacy" element={<Navigate to="/privacy-policy" replace />} />
            <Route path="/terms" element={<Navigate to="/terms-of-service" replace />} />
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
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

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
