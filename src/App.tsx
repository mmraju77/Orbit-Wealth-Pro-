/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, lazy, Suspense } from 'react';
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
const PrivacyPolicy = lazy(() => import('./components/PrivacyPolicy'));
const Disclaimer = lazy(() => import('./components/Disclaimer'));
const TermsOfService = lazy(() => import('./components/TermsOfService'));
const ContactUs = lazy(() => import('./components/ContactUs'));
const AboutUs = lazy(() => import('./components/AboutUs'));

const LoadingFallback = () => (
  <div className="flex items-center justify-center p-32">
    <div className="w-8 h-8 border-2 border-[#0055FF] border-t-transparent rounded-full animate-spin"></div>
  </div>
);
import Footer from './components/Footer';

export default function App() {
  return (
    <HelmetProvider>
      <LocaleProvider>
        <BrowserRouter>
          <ScrollToTop />
          <div className="flex bg-[#050505] min-h-screen text-white font-sans selection:bg-[#0055FF] selection:text-white">
            <Sidebar />
            
            <main className="flex-1 ml-64 min-h-screen relative overflow-hidden">
              <div className="absolute inset-0 p-16 md:p-24 lg:p-32 overflow-y-auto overflow-x-hidden">
                <div className="max-w-7xl mx-auto pb-32">
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
                    
                    <Route path="/calculators/term-insurance" element={<div className="p-20 text-center"><h2 className="text-3xl font-bold">Term Life Insurance</h2><p className="text-white/40 mt-4">Security calculation engine launching soon.</p></div>} />
                    <Route path="/calculators/health-insurance" element={<div className="p-20 text-center"><h2 className="text-3xl font-bold">Health Guard Intelligence</h2><p className="text-white/40 mt-4">Premium optimization engine launching soon.</p></div>} />
                  
                  {/* Dynamic pSEO Routes */}
                  <Route path="/tools/:calculator/:region" element={<PSEOLandingPage />} />
                  <Route path="/:region/:calculator" element={<PSEOLandingPage />} />
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
                </Suspense>
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
