import { CalculatorSEO } from "./CalculatorSEO";
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from 'react';
import Breadcrumbs from './Breadcrumbs';
import RelatedTools from './RelatedTools';
import { ShieldCheck, Download, Share2, Info, Plus, Minus, HeartPulse, Users } from 'lucide-react';
import { useLocale } from '../context/LocaleContext';
import SEOSection from './SEOSection';
import AIAdvisor from './AIAdvisor';
import CurrencyInput from './CurrencyInput';
import NumericInput from './NumericInput';

interface HealthInputs {
  sumInsured: number;
  oldestAge: number;
  adults: number;
  children: number;
  includesOPD: boolean;
  includesCriticalIllness: boolean;
}

const INITIAL_INPUTS: HealthInputs = {
  sumInsured: 500000,
  oldestAge: 35,
  adults: 2,
  children: 2,
  includesOPD: false,
  includesCriticalIllness: false
};

export default function HealthInsuranceCalculator() {

  const breadcrumbItems = [
    { label: 'Insurance' },
    { label: 'Health Insurance' }
  ];

  const { formatCurrency } = useLocale();
  const [inputs, setInputs] = useState<HealthInputs>(INITIAL_INPUTS);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const [results, setResults] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      // Base premium logic per member based on age groups
      const getBaseMemberPremium = (age: number) => {
        if (age < 25) return 3000;
        if (age < 35) return 5000;
        if (age < 45) return 8000;
        if (age < 55) return 14000;
        if (age < 65) return 22000;
        return 35000;
      };

      const oldestPremium = getBaseMemberPremium(inputs.oldestAge);

      // Multi-member discounts or loadings
      let baseAnnual = oldestPremium;
      if (inputs.adults > 1) baseAnnual += (oldestPremium * 0.7); // 30% discount for second adult
      baseAnnual += (inputs.children * 2500); // Child flat rate

      // Sum Insured multiplier
      const sumInsuredFactor = inputs.sumInsured / 500000;
      let finalPremium = baseAnnual * (0.8 + (sumInsuredFactor * 0.2));

      // Add-on loaders
      if (inputs.includesOPD) finalPremium *= 1.4;
      if (inputs.includesCriticalIllness) finalPremium *= 1.25;

      setResults({
        annualPremium: Math.round(finalPremium),
        monthlyPremium: Math.round(finalPremium / 12),
        sumInsured: inputs.sumInsured
      });
    }, 0);

    return () => clearTimeout(timer);
  }, [inputs]);


  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Orbit Wealth Pro Calculator',
          text: 'Check out this financial calculator!',
          url: window.location.href,
        });
      } catch (error) {
        if (error.name !== 'AbortError') {
          navigator.clipboard.writeText(window.location.href);
          alert('Calculator link copied to clipboard!');
        }
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Calculator link copied to clipboard!');
    }
  };

  if (!results) return (
    <div
      className="animate-pulse h-96 bg-white/5 rounded-3xl w-full max-w-7xl mx-auto mt-8" />
  );

  return (
    <div className="space-y-12 pb-20 text-white">
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-8">
        <header className="space-y-4">
          <div className="flex items-center gap-2 mb-2">
             <div className="h-px w-6 bg-[#D4AF37]"></div>
             <span className="text-base font-bold text-[#D4AF37] uppercase tracking-[0.3em]">Healthcare Shield</span>
          </div>
          <h1 className="text-7xl font-display font-medium text-[#f59e0b] tracking-tight">Health Insurance.</h1>
          <p className="text-white/70 max-w-xl text-lg font-light leading-relaxed">
            Optimize your health coverage with our intelligent premium estimation engine using actuarial risk modeling.
          </p>
        </header>

        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/5 rounded-lg text-base font-bold transition-all">
            <Download className="w-4 h-4" /> Export Quote
          </button>
          <button onClick={handleShare} className="flex items-center gap-2 px-4 py-2 bg-[#D4AF37] hover:bg-[#D4AF37]/90 rounded-lg text-base font-bold transition-all shadow-lg shadow-[#D4AF37]/20 text-white">
            <Share2 className="w-4 h-4" /> Share Plan
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <section className="bg-white/[0.02] border border-white/5 rounded-2xl p-8 space-y-8">
          <div className="space-y-8">
             <CurrencyInput 
                label="Sum Insured (Coverage)"
                value={inputs.sumInsured}
                onChange={(val) => setInputs({ ...inputs, sumInsured: val })}
                min={100000}
                max={5000000}
                step={100000}
             />

             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-8">
               <div className="space-y-4">
                  <label className="text-base font-bold text-white/70 uppercase tracking-widest">Age of Oldest Member</label>
                  <div className="flex items-center gap-2 bg-black/40 p-3 rounded-xl border border-white/5">
                    <HeartPulse className="w-4 h-4 text-[#D4AF37]" />
                    <NumericInput 
                      min={18} max={100} 
                      value={inputs.oldestAge}
                      onChange={(val) => setInputs({ ...inputs, oldestAge: val })}
                      className="bg-transparent border-none text-white font-bold w-full outline-none"
                    />
                  </div>
               </div>
               <div className="space-y-4">
                  <label className="text-base font-bold text-white/70 uppercase tracking-widest">Family Composition</label>
                  <div className="flex items-center gap-4">
                     <div className="flex-1 flex items-center justify-between bg-black/40 p-3 rounded-xl border border-white/5">
                        <span className="text-base font-bold text-white/70 uppercase">Adults</span>
                        <div className="flex items-center gap-3">
                           <button aria-label="Decrease adults" onClick={() => setInputs({...inputs, adults: Math.max(1, inputs.adults - 1)})}><Minus className="w-3 h-3 text-[#D4AF37]" /></button>
                           <span className="text-lg font-bold text-white w-4 text-center">{inputs.adults}</span>
                           <button aria-label="Increase adults" onClick={() => setInputs({...inputs, adults: Math.min(4, inputs.adults + 1)})}><Plus className="w-3 h-3 text-[#D4AF37]" /></button>
                        </div>
                     </div>
                     <div className="flex-1 flex items-center justify-between bg-black/40 p-3 rounded-xl border border-white/5">
                        <span className="text-base font-bold text-white/70 uppercase">Kids</span>
                        <div className="flex items-center gap-3">
                           <button aria-label="Decrease children" onClick={() => setInputs({...inputs, children: Math.max(0, inputs.children - 1)})}><Minus className="w-3 h-3 text-[#D4AF37]" /></button>
                           <span className="text-lg font-bold text-white w-4 text-center">{inputs.children}</span>
                           <button aria-label="Increase children" onClick={() => setInputs({...inputs, children: Math.min(4, inputs.children + 1)})}><Plus className="w-3 h-3 text-[#D4AF37]" /></button>
                        </div>
                     </div>
                  </div>
               </div>
             </div>

             <div className="space-y-4">
                <label className="text-base font-bold text-white/70 uppercase tracking-widest">Premium Riders & Add-ons</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                   <button 
                     onClick={() => setInputs({...inputs, includesOPD: !inputs.includesOPD})}
                     className={`p-4 rounded-xl border flex items-center justify-between transition-all ${inputs.includesOPD ? 'bg-[#D4AF37]/10 border-[#D4AF37]/30 text-white' : 'bg-white/5 border-white/5 text-white/70'}`}
                   >
                     <span className="text-base font-bold uppercase tracking-widest">OPD Cover</span>
                     <div className={`w-3 h-3 rounded-full ${inputs.includesOPD ? 'bg-[#D4AF37]' : 'bg-white/10'}`}></div>
                   </button>
                   <button 
                     onClick={() => setInputs({...inputs, includesCriticalIllness: !inputs.includesCriticalIllness})}
                     className={`p-4 rounded-xl border flex items-center justify-between transition-all ${inputs.includesCriticalIllness ? 'bg-[#D4AF37]/10 border-[#D4AF37]/30 text-white' : 'bg-white/5 border-white/5 text-white/70'}`}
                   >
                     <span className="text-base font-bold uppercase tracking-widest">Critical Illness</span>
                     <div className={`w-3 h-3 rounded-full ${inputs.includesCriticalIllness ? 'bg-[#D4AF37]' : 'bg-white/10'}`}></div>
                   </button>
                </div>
             </div>
          </div>

          <div className="p-6 bg-[#D4AF37]/5 rounded-2xl border border-[#D4AF37]/10 flex items-center justify-between">
             <div className="space-y-1">
                <div className="text-base text-[#D4AF37] font-bold uppercase tracking-widest">Estimated Annual Premium</div>
                <div className="text-xl md:text-2xl font-bold text-white tracking-tighter">{formatCurrency(results.annualPremium)}</div>
             </div>
             <div className="text-right">
                <div className="text-base text-white/70 font-bold uppercase tracking-widest">Monthly Split</div>
                <div className="text-xl md:text-2xl font-bold text-white/70 tracking-tighter">{formatCurrency(results.monthlyPremium)}</div>
             </div>
          </div>
        </section>

        <section className="bg-white/[0.02] border border-white/5 rounded-2xl p-8 flex flex-col items-center justify-center space-y-8 overflow-hidden relative">
           <div className="absolute top-0 right-0 p-8 opacity-[0.02]">
              <Users className="w-64 h-64" />
           </div>

           {isMounted && (
             <>
               <div className="text-center space-y-4 relative z-10">
                  <div className="w-20 h-20 bg-[#D4AF37]/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-[#D4AF37]/20">
                     <ShieldCheck className="w-10 h-10 text-[#D4AF37]" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-display font-bold">Coverage Score.</h3>
                  <p className="text-white/70 text-base italic max-w-xs mx-auto">
                    "Your family of {inputs.adults + inputs.children} is being modeled for comprehensive medical risk coverage."
                  </p>
               </div>

               <div className="w-full grid grid-cols-2 gap-8 pt-8 border-t border-white/5">
                  <div className="space-y-2">
                     <div className="text-base font-bold text-white/70 uppercase tracking-widest">Oldest Member</div>
                     <div className="text-2xl font-bold">{inputs.oldestAge} Years</div>
                  </div>
                  <div className="space-y-2">
                     <div className="text-base font-bold text-white/70 uppercase tracking-widest">Policy Type</div>
                     <div className="text-2xl font-bold">{inputs.adults > 1 ? 'Family Floater' : 'Individual'}</div>
                  </div>
               </div>

               <AIAdvisor context={`Health Insurance Estimate: Sum Insured ${inputs.sumInsured}, Adults ${inputs.adults}, Kids ${inputs.children}, Oldest Age ${inputs.oldestAge}, Annual Premium ${results.annualPremium}`} />
             </>
           )}
        </section>
      </div>
      
        <RelatedTools tools={[{"title":"Term Insurance","path":"/calculators/insurance/term-insurance","description":"Secure your family's future"},{"title":"HLV Calculator","path":"/calculators/insurance/hlv","description":"Calculate human life value"},{"title":"Income Tax","path":"/calculators/tax/income-tax","description":"Calculate 80D tax benefits"}]} />

        <SEOSection 
        title="Health Insurance Calculator"
        howTo={[
          "Select the Sum Insured (Total coverage) you want for your family.",
          "Enter the age of the oldest family member to be insured.",
          "Adjust the number of adults and children in the policy.",
          "Optionally add riders like OPD or Critical Illness for enhanced security."
        ]}
        formula="Premium = Base Group Premium x Member Count Factor x Sum Insured Loading x Rider Multipliers"
        benefits={[
          "Compare individual vs family floater pricing models.",
          "Visualize the impact of age on health insurance premiums.",
          "Calculate values for necessary add-on riders.",
          "Plan your annual medical budget with precision."
        ]}
      />

      <CalculatorSEO
        id="HealthInsuranceCalculator"
        title="Health Insurance  Calculator"
        description="Calculate your health insurance  easily and accurately with Orbit Wealth Pro."
        faqs={[{
          question: "What is the Health Insurance  Calculator?",
          answer: "The Health Insurance  Calculator is a financial tool designed to help you calculate and estimate your figures accurately."
        }, {
          question: "How do I use this calculator?",
          answer: "Simply enter your inputs into the designated fields, and the calculator will automatically process and display the estimated results."
        }, {
          question: "Are the results accurate?",
          answer: "The results are highly accurate estimates based on standard financial formulas, but should be used for informational purposes only."
        }]} />
    </div>
  );
}
