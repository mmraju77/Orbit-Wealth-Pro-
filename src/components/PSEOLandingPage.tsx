/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, lazy, Suspense } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { resolveRegion, resolveCalculatorKey, resolveCalculatorData, REGIONS, CALCULATORS } from '../data/pSEOData';
import { Shield, Globe, Info, CheckCircle2 } from 'lucide-react';
import { useLocale, CurrencyCode } from '../context/LocaleContext';

// Dynamic components with lazy loading
const MortgageCalculator = lazy(() => import('./MortgageCalculator'));
const RetirementCalculator = lazy(() => import('./RetirementCalculator'));
const IncomeTaxCalculator = lazy(() => import('./IncomeTaxCalculator'));
const GSTCalculator = lazy(() => import('./GSTCalculator'));
const FDRDCalculator = lazy(() => import('./FDRDCalculator'));
const SIPCalculator = lazy(() => import('./SIPCalculator'));
const LumpsumCalculator = lazy(() => import('./LumpsumCalculator'));
const EMICalculator = lazy(() => import('./EMICalculator'));
const LoanEligibility = lazy(() => import('./LoanEligibility'));
const BalanceTransfer = lazy(() => import('./BalanceTransfer'));
const GratuityCalculator = lazy(() => import('./GratuityCalculator'));
const CurrencyConverter = lazy(() => import('./CurrencyConverter'));
const MFCalculator = lazy(() => import('./MFCalculator'));
const PersonalLoanCalculator = lazy(() => import('./PersonalLoanCalculator'));
const AutoLoanCalculator = lazy(() => import('./AutoLoanCalculator'));
const StudentLoanCalculator = lazy(() => import('./StudentLoanCalculator'));
const CAGRCalculator = lazy(() => import('./CAGRCalculator'));
const DividendYieldCalculator = lazy(() => import('./DividendYieldCalculator'));
const ChildEducationPlanner = lazy(() => import('./ChildEducationPlanner'));
const RentalYieldCalculator = lazy(() => import('./RentalYieldCalculator'));
const DebtSnowball = lazy(() => import('./DebtSnowball'));
const HLVCalculator = lazy(() => import('./HLVCalculator'));
const BreakEvenCalculator = lazy(() => import('./BreakEvenCalculator'));
const CreditCardPayoff = lazy(() => import('./CreditCardPayoff'));

const CALCULATOR_COMPONENTS: Record<string, React.LazyExoticComponent<React.ComponentType>> = {
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
  'savings': FDRDCalculator,
  '401k-analyzer': RetirementCalculator,
  'roth-ira-limit': RetirementCalculator,
  'irs-tax-brackets': IncomeTaxCalculator,
  'us-mortgage-rates': MortgageCalculator,
  'dubai-property-roi': LumpsumCalculator,
  'tax-free-savings': IncomeTaxCalculator,
  'abu-dhabi-investment': RetirementCalculator,
  'personal-loan': PersonalLoanCalculator,
  'auto-loan': AutoLoanCalculator,
  'student-loan': StudentLoanCalculator,
  'cagr': CAGRCalculator,
  'dividend-yield': DividendYieldCalculator,
  'child-education': ChildEducationPlanner,
  'rental-yield': RentalYieldCalculator,
  'debt-snowball': DebtSnowball,
  'hlv': HLVCalculator,
  'break-even': BreakEvenCalculator,
  'credit-card-payoff': CreditCardPayoff,
};

export default function PSEOLandingPage() {
  const { calculator, region } = useParams<{ calculator: string; region: string }>();
  const { setCurrency, setNumberSystem } = useLocale();

  // Robust resolution logic to handle parameter swapping
  let regionData = resolveRegion(region);
  let calcData = resolveCalculatorData(calculator);
  let resolvedCalcKey = resolveCalculatorKey(calculator);

  if (!regionData || !calcData) {
    // Try swapping params
    const swappedRegionData = resolveRegion(calculator);
    const swappedCalcData = resolveCalculatorData(region);
    const swappedCalcKey = resolveCalculatorKey(region);

    if (swappedRegionData && swappedCalcData) {
      regionData = swappedRegionData;
      calcData = swappedCalcData;
      resolvedCalcKey = swappedCalcKey;
    }
  }
  
  const CalculatorComponent = resolvedCalcKey ? CALCULATOR_COMPONENTS[resolvedCalcKey] : null;

  useEffect(() => {
    if (regionData) {
      setCurrency(regionData.currency as CurrencyCode);
      if (regionData.name === 'India') {
        setNumberSystem('Indian');
      } else {
        setNumberSystem('International');
      }
    }
  }, [regionData, setCurrency, setNumberSystem]);

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
        <meta name="keywords" content={`${calcData.keywords}, ${regionData.name} finance, ${regionData.taxContext}`} />
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

      {regionData.localInsights && regionData.localInsights.length > 0 && (
        <section className="bg-[#0055FF]/5 border border-[#0055FF]/10 rounded-2xl p-8 space-y-6">
          <div className="flex items-center gap-2 text-[#0055FF]">
            <CheckCircle2 className="w-5 h-5" />
            <h3 className="text-xl font-bold text-white">Local Financial Insights: {regionData.name}</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {regionData.localInsights.map((insight, idx) => (
              <div key={idx} className="p-4 bg-white/5 border border-white/5 rounded-xl flex items-start gap-3 group hover:border-[#0055FF]/40 transition-colors">
                <div className="w-1.5 h-1.5 rounded-full bg-[#0055FF] mt-1.5 shrink-0 group-hover:scale-125 transition-transform" />
                <p className="text-sm text-white/60 leading-relaxed">
                   {insight}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

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
