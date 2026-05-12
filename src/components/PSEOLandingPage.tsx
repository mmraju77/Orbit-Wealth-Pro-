/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { REGIONS, CALCULATORS } from '../data/pSEOData';
import { Shield, Globe, Info } from 'lucide-react';

// Import all calculators to render them dynamically
import MortgageCalculator from './MortgageCalculator';
import RetirementCalculator from './RetirementCalculator';
import IncomeTaxCalculator from './IncomeTaxCalculator';
import GSTCalculator from './GSTCalculator';
import FDRDCalculator from './FDRDCalculator';
import SIPCalculator from './SIPCalculator';
import LumpsumCalculator from './LumpsumCalculator';
import EMICalculator from './EMICalculator';
import LoanEligibility from './LoanEligibility';
import BalanceTransfer from './BalanceTransfer';
import GratuityCalculator from './GratuityCalculator';
import CurrencyConverter from './CurrencyConverter';
import MFCalculator from './MFCalculator';

const CALCULATOR_COMPONENTS: Record<string, React.ComponentType> = {
  'mortgage': MortgageCalculator,
  'retirement': RetirementCalculator,
  'income-tax': IncomeTaxCalculator,
  'gst': GSTCalculator,
  'fd-rd': FDRDCalculator,
  'sip': SIPCalculator,
  'lumpsum': LumpsumCalculator,
  'emi': EMICalculator,
  'loan-eligibility': LoanEligibility,
  'home-loan-transfer': BalanceTransfer,
  'gratuity': GratuityCalculator,
  'currency-converter': CurrencyConverter,
  'mutual-fund': MFCalculator,
};

export default function PSEOLandingPage() {
  const { calculator, region } = useParams<{ calculator: string; region: string }>();

  const regionData = region ? REGIONS[region.toLowerCase()] : null;
  const calcData = calculator ? CALCULATORS[calculator.toLowerCase()] : null;
  const CalculatorComponent = calculator ? CALCULATOR_COMPONENTS[calculator.toLowerCase()] : null;

  if (!regionData || !calcData || !CalculatorComponent) {
    return <Navigate to="/" replace />;
  }

  const pageTitle = `${calcData.title} ${regionData.name} - Orbit Wealth Pro`;
  const pageDesc = `${calcData.description} Specifically optimized for financial regulations and norms in ${regionData.name}.`;

  return (
    <div className="space-y-12">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDesc} />
      </Helmet>

      <div className="bg-[#0055FF]/10 border border-[#0055FF]/20 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#0055FF] flex items-center justify-center">
            <Globe className="text-white w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              {calcData.title} for {regionData.name}
            </h2>
            <p className="text-xs text-[#0055FF] font-bold uppercase tracking-widest mt-1">
              {regionData.taxContext || 'Regional FinTech Adaptation'}
            </p>
          </div>
        </div>
        <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-[10px] font-bold text-white/40 uppercase tracking-widest">
            Edition: {regionData.name} v2.4
        </div>
      </div>

      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
        <CalculatorComponent />
      </div>

      <section className="bg-white/[0.02] border border-white/5 rounded-2xl p-8 space-y-6">
        <div className="flex items-center gap-2">
            <Shield className="text-[#0055FF] w-5 h-5" />
            <h3 className="text-xl font-bold text-white">Smart Content: {regionData.name} Financial Norms</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-4">
                <p className="text-sm text-white/40 leading-relaxed">
                    {regionData.smartContent}
                </p>
                <div className="flex items-start gap-3 p-4 bg-white/5 rounded-xl border border-white/5">
                    <Info className="text-[#0055FF] w-4 h-4 shrink-0 mt-0.5" />
                    <p className="text-xs text-white/40 italic">
                        Calculations are adjusted for {regionData.name} standard compounding frequencies and common tax slabs where applicable. Always consult with a local financial advisor for personalized tax planning.
                    </p>
                </div>
            </div>
            
            <div className="space-y-4">
                <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                    <div className="text-[10px] font-bold text-white/20 uppercase tracking-widest mb-1">Local Currency</div>
                    <div className="text-xl font-bold text-white">{regionData.currency}</div>
                </div>
                <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                    <div className="text-[10px] font-bold text-white/20 uppercase tracking-widest mb-1">Tax Engine</div>
                    <div className="text-xl font-bold text-white">Orbit v4.0</div>
                </div>
            </div>
        </div>
      </section>
    </div>
  );
}
