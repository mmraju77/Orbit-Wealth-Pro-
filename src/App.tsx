/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import MortgageCalculator from '@/src/components/MortgageCalculator';
import RetirementCalculator from '@/src/components/RetirementCalculator';
import TaxCalculator from '@/src/components/TaxCalculator';
import PrivacyPolicy from '@/src/components/PrivacyPolicy';
import Disclaimer from '@/src/components/Disclaimer';
import ContactUs from '@/src/components/ContactUs';
import TrustBadge from '@/src/components/TrustBadge';
import LocaleBar from '@/src/components/LocaleBar';
import { LocaleProvider, useLocale } from '@/src/context/LocaleContext';
import { useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';

type ViewType = 'MORTGAGE' | 'RETIREMENT' | 'TAX' | 'PRIVACY' | 'DISCLAIMER' | 'CONTACT';

function AppContent() {
  const [activeView, setActiveView] = useState<ViewType>('MORTGAGE');
  const { labels, currency } = useLocale();

  const getSEOTitle = () => {
    switch (activeView) {
      case 'MORTGAGE':
        return `Best ${labels.loan} Calculator for ${currency} - Orbit Wealth Pro`;
      case 'RETIREMENT':
        return `Investment & Retirement Growth Planner (${currency}) - Orbit Wealth Pro`;
      case 'TAX':
        return `Global ${labels.tax} & VAT Calculator - Precise ${currency} Calculations`;
      case 'PRIVACY':
        return 'Privacy Policy - Data Sovereignty & Security - Orbit Wealth';
      case 'DISCLAIMER':
        return 'Disclaimer & Risk Disclosure - Orbit Wealth';
      case 'CONTACT':
        return 'Contact Us - Advisor Desk - Orbit Wealth';
      default:
        return 'Orbit Wealth Pro - Global Finance Suite';
    }
  };

  const getSEODescription = () => {
    switch (activeView) {
      case 'MORTGAGE':
        return `Calculate your ${labels.loan.toLowerCase()} payments instantly in ${currency}. See total interest and amortization schedules with Swiss precision.`;
      case 'RETIREMENT':
        return `Plan your financial future with our investment growth calculator. Visualize compound interest and savings projections for ${currency} markets.`;
      case 'TAX':
        return `Universal ${labels.tax.toLowerCase()} and VAT calculator. Add or remove tax with custom percentage inputs for global financial compliance.`;
      case 'PRIVACY':
        return 'Learn about our commitment to data sovereignty and privacy. Orbit Wealth Pro uses zero-knowledge architecture.';
      case 'DISCLAIMER':
        return 'Important financial risk disclosures and tool accuracy limitations for the Orbit Wealth suite.';
      case 'CONTACT':
        return 'Reach out to the Orbit Wealth intelligence team for feature requests, partnership inquiries, or technical support.';
      default:
        return 'Premium Global Finance Suite featuring advanced mortgage and loan calculations with a Swiss-style minimalist design.';
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#0A0A0A] text-[#F5F5F5] selection:bg-[#0055FF] selection:text-white">
      <Helmet>
        <title>{getSEOTitle()}</title>
        <meta name="description" content={getSEODescription()} />
        <meta name="keywords" content={`finance, calculator, ${labels.loan}, ${labels.tax}, investment, retirement, ${currency}, wealth management`} />
      </Helmet>

      {/* Locale Settings Bar */}
      <LocaleBar />

      {/* Navigation Header */}
      <header className="flex justify-between items-end border-b border-white/10 pb-6 px-10 pt-8">
        <button 
          onClick={() => setActiveView('MORTGAGE')}
          className="flex flex-col text-left outline-none"
        >
          <span className="editorial-label">ORBIT WEALTH PRO</span>
          <h1 className="text-4xl font-extrabold tracking-tighter leading-none">
            GLOBAL FINANCE <span className="font-light text-white/40">SUITE</span>
          </h1>
        </button>
        <div className="flex items-center gap-8">
          <nav className="flex gap-6 text-[11px] font-medium tracking-widest text-white/50">
            <button 
              onClick={() => setActiveView('MORTGAGE')}
              className={`uppercase tracking-widest transition-colors font-bold ${activeView === 'MORTGAGE' ? 'text-white border-b border-white' : 'hover:text-white'}`}
            >
              {labels.loan}
            </button>
            <button 
              onClick={() => setActiveView('RETIREMENT')}
              className={`uppercase tracking-widest transition-colors font-bold ${activeView === 'RETIREMENT' ? 'text-white border-b border-white' : 'hover:text-white'}`}
            >
              Retirement
            </button>
            <button 
              onClick={() => setActiveView('TAX')}
              className={`uppercase tracking-widest transition-colors font-bold ${activeView === 'TAX' ? 'text-white border-b border-white' : 'hover:text-white'}`}
            >
              {labels.tax}
            </button>
          </nav>
          <div className="flex bg-white/5 p-1 rounded-full border border-white/10">
            <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center">
              <div className="w-2 h-2 bg-black rounded-full"></div>
            </div>
            <div className="w-6 h-6"></div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1">
        {activeView === 'MORTGAGE' && <MortgageCalculator />}
        {activeView === 'RETIREMENT' && <RetirementCalculator />}
        {activeView === 'TAX' && <TaxCalculator />}
        {activeView === 'PRIVACY' && <PrivacyPolicy />}
        {activeView === 'DISCLAIMER' && <Disclaimer />}
        {activeView === 'CONTACT' && <ContactUs />}
      </main>

      {/* Trust Footer */}
      <TrustBadge setView={setActiveView} activeView={activeView} />
    </div>
  );
}

export default function App() {
  return (
    <HelmetProvider>
      <LocaleProvider>
        <AppContent />
      </LocaleProvider>
    </HelmetProvider>
  );
}
