/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    const scrollContainer = document.querySelector('.overflow-y-auto');
    if (scrollContainer) scrollContainer.scrollTo(0, 0);
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}
import { HelmetProvider } from 'react-helmet-async';
import { LocaleProvider, useLocale } from './context/LocaleContext';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Footer from './components/Footer';
import OrbitChat from './components/OrbitChat';
import { resolveRegion } from './data/pSEOData';

import MortgageCalculator from './components/MortgageCalculator';
import RetirementCalculator from './components/RetirementCalculator';
import IncomeTaxCalculator from './components/IncomeTaxCalculator';
import GSTCalculator from './components/GSTCalculator';
import FDRDCalculator from './components/FDRDCalculator';
import SIPCalculator from './components/SIPCalculator';
import LumpsumCalculator from './components/LumpsumCalculator';
import EMICalculator from './components/EMICalculator';
import MFCalculator from './components/MFCalculator';
import LoanEligibility from './components/LoanEligibility';
import BalanceTransfer from './components/BalanceTransfer';
import GratuityCalculator from './components/GratuityCalculator';
import CurrencyConverter from './components/CurrencyConverter';
import PersonalLoanCalculator from './components/PersonalLoanCalculator';
import AutoLoanCalculator from './components/AutoLoanCalculator';
import StudentLoanCalculator from './components/StudentLoanCalculator';
import CAGRCalculator from './components/CAGRCalculator';
import DividendYieldCalculator from './components/DividendYieldCalculator';
import ChildEducationPlanner from './components/ChildEducationPlanner';
import RentalYieldCalculator from './components/RentalYieldCalculator';
import DebtSnowball from './components/DebtSnowball';
import HLVCalculator from './components/HLVCalculator';
import BreakEvenCalculator from './components/BreakEvenCalculator';
import CreditCardPayoff from './components/CreditCardPayoff';
import TaxGuides from './components/TaxGuides';
import PSEOLandingPage from './components/PSEOLandingPage';
import ComparePage from './components/ComparePage';
import ComparisonsDirectory from './components/ComparisonsDirectory';
import CitiesDirectory from './components/CitiesDirectory';
import BlogHub from './components/BlogHub';
import TermInsuranceCalculator from './components/TermInsuranceCalculator';
import HealthInsuranceCalculator from './components/HealthInsuranceCalculator';
import PrivacyPolicy from './components/PrivacyPolicy';
import Disclaimer from './components/Disclaimer';
import TermsOfService from './components/TermsOfService';
import ContactUs from './components/ContactUs';
import AboutUs from './components/AboutUs';

import { Menu, Wallet } from 'lucide-react';

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
