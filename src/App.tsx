/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Menu, Wallet } from 'lucide-react';

// Context
import { LocaleProvider, useLocale } from './context/LocaleContext';

// Components
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import OrbitChat from './components/OrbitChat';

// Core Views
import Dashboard from './components/Dashboard';
import TaxGuides from './components/TaxGuides';
import BlogHub from './components/BlogHub';
import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactUs';

// Calculators & Tools
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
import TermInsuranceCalculator from './components/TermInsuranceCalculator';
import HealthInsuranceCalculator from './components/HealthInsuranceCalculator';

// Pages
import PSEOLandingPage from './components/PSEOLandingPage';
import ComparePage from './components/ComparePage';
import ComparisonsDirectory from './components/ComparisonsDirectory';
import CitiesDirectory from './components/CitiesDirectory';
import PrivacyPolicy from './components/PrivacyPolicy';
import Disclaimer from './components/Disclaimer';
import TermsOfService from './components/TermsOfService';

// Utils
import { resolveRegion } from './data/pSEOData';

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
  
  useEffect(() => {
    const handleFocus = (e: FocusEvent) => {
      if (e.target instanceof HTMLInputElement && e.target.type === 'number') {
        const input = e.target;
        setTimeout(() => input.select(), 0);
      }
    };
    document.addEventListener('focus', handleFocus, true);
    return () => document.removeEventListener('focus', handleFocus, true);
  }, []);

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
