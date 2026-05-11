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
import TaxCalculator from './components/TaxCalculator';
import SIPCalculator from './components/SIPCalculator';
import LumpsumCalculator from './components/LumpsumCalculator';
import EMICalculator from './components/EMICalculator';
import MFCalculator from './components/MFCalculator';
import LoanEligibility from './components/LoanEligibility';
import BalanceTransfer from './components/BalanceTransfer';
import GratuityCalculator from './components/GratuityCalculator';
import CurrencyConverter from './components/CurrencyConverter';
import PrivacyPolicy from './components/PrivacyPolicy';
import Disclaimer from './components/Disclaimer';
import TermsOfService from './components/TermsOfService';
import ContactUs from './components/ContactUs';
import Footer from './components/Footer';

export default function App() {
  return (
    <HelmetProvider>
      <LocaleProvider>
        <BrowserRouter>
          <ScrollToTop />
          <div className="flex bg-[#050505] min-h-screen text-white font-sans selection:bg-[#0055FF] selection:text-white">
            <Sidebar />
            
            <main className="flex-1 ml-64 p-8 md:p-12 lg:p-16 h-screen overflow-y-auto">
              <div className="max-w-6xl mx-auto">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/calculators/mortgage" element={<MortgageCalculator />} />
                  <Route path="/calculators/retirement" element={<RetirementCalculator />} />
                  <Route path="/calculators/tax" element={<TaxCalculator />} />
                  <Route path="/calculators/sip" element={<SIPCalculator />} />
                  <Route path="/calculators/lumpsum" element={<LumpsumCalculator />} />
                  <Route path="/calculators/emi" element={<EMICalculator />} />
                  <Route path="/calculators/mutual-fund" element={<MFCalculator />} />
                  <Route path="/calculators/eligibility" element={<LoanEligibility />} />
                  <Route path="/calculators/balance-transfer" element={<BalanceTransfer />} />
                  <Route path="/calculators/gratuity" element={<GratuityCalculator />} />
                  <Route path="/calculators/currency" element={<CurrencyConverter />} />
                  <Route path="/privacy" element={<PrivacyPolicy />} />
                  <Route path="/disclaimer" element={<Disclaimer />} />
                  <Route path="/terms" element={<TermsOfService />} />
                  <Route path="/contact" element={<ContactUs />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
                <Footer />
              </div>
            </main>
          </div>
        </BrowserRouter>
      </LocaleProvider>
    </HelmetProvider>
  );
}
