/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    const main = document.querySelector('main');
    if (main) main.scrollTo(0, 0);
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { LocaleProvider } from './context/LocaleContext';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';

// Existing Components
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
import MarketTicker from './components/MarketTicker';
import PSEOLandingPage from './components/PSEOLandingPage';
import ComparePage from './components/ComparePage';
import PrivacyPolicy from './components/PrivacyPolicy';
import Disclaimer from './components/Disclaimer';
import TermsOfService from './components/TermsOfService';
import ContactUs from './components/ContactUs';
import AboutUs from './components/AboutUs';
import Footer from './components/Footer';

export default function App() {
  return (
    <HelmetProvider>
      <LocaleProvider>
        <BrowserRouter>
          <ScrollToTop />
          <div className="flex bg-[#050505] min-h-screen text-white font-sans selection:bg-[#0055FF] selection:text-white">
            <Sidebar />
            
            <main className="flex-1 ml-64 min-h-screen">
              <MarketTicker />
              <div className="p-8 md:p-12 lg:p-16 h-[calc(100vh-32px)] overflow-y-auto">
                <div className="max-w-7xl mx-auto">
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
                    
                    <Route path="/calculators/term-insurance" element={<div className="p-20 text-center"><h2 className="text-3xl font-bold">Term Life Insurance</h2><p className="text-white/40 mt-4">Security calculation engine launching soon.</p></div>} />
                    <Route path="/calculators/health-insurance" element={<div className="p-20 text-center"><h2 className="text-3xl font-bold">Health Guard Intelligence</h2><p className="text-white/40 mt-4">Premium optimization engine launching soon.</p></div>} />
                  
                  {/* Dynamic pSEO Routes */}
                  <Route path="/tools/:calculator/:region" element={<PSEOLandingPage />} />
                  <Route path="/compare/:pair" element={<ComparePage />} />
                  
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
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
                <Footer />
              </div>
            </div>
          </main>
          </div>
        </BrowserRouter>
      </LocaleProvider>
    </HelmetProvider>
  );
}
