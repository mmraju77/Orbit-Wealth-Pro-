/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from 'react';
import { Shield, Download, Share2, Info, User, Activity } from 'lucide-react';
import { useLocale } from '../context/LocaleContext';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip } from 'recharts';
import SEOSection from './SEOSection';
import NumericInput from './NumericInput';
import AIAdvisor from './AIAdvisor';
import CurrencyInput from './CurrencyInput';

interface TermInputs {
  age: number;
  coverage: number;
  term: number;
  isSmoker: boolean;
  gender: 'male' | 'female';
}

const INITIAL_INPUTS: TermInputs = {
  age: 30,
  coverage: 1000000,
  term: 30,
  isSmoker: false,
  gender: 'male'
};

export default function TermInsuranceCalculator() {
  const { formatCurrency } = useLocale();
  const [inputs, setInputs] = useState<TermInputs>(INITIAL_INPUTS);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const results = useMemo(() => {
    // Simplified Actuarial logic for demo purposes
    // Base rate per $1000 sum assured
    let baseRate = 0.08; 
    
    // Age adjustments
    if (inputs.age > 40) baseRate *= 2.5;
    else if (inputs.age > 30) baseRate *= 1.5;
    
    // Smoker loading (usually 50% - 100% higher)
    if (inputs.isSmoker) baseRate *= 1.8;
    
    // Gender adjustment (females often have lower mortality rates)
    if (inputs.gender === 'female') baseRate *= 0.85;

    // Term loading (longer terms are slightly more expensive per year)
    const termFactor = 1 + (inputs.term / 100);
    
    const annualPremium = (inputs.coverage / 1000) * baseRate * termFactor;
    const monthlyPremium = annualPremium / 12;

    return {
      annualPremium: Math.round(annualPremium),
      monthlyPremium: Math.round(monthlyPremium),
      totalPremium: Math.round(annualPremium * inputs.term)
    };
  }, [inputs]);

  return (
    <div className="space-y-12 pb-20 text-white">
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-8">
        <header className="space-y-4">
          <div className="flex items-center gap-2 mb-2">
             <div className="h-px w-6 bg-[#D4AF37]"></div>
             <span className="text-sm font-bold text-[#D4AF37] uppercase tracking-[0.3em]">Life Protection</span>
          </div>
          <h1 className="text-6xl font-display font-medium text-[#f59e0b] tracking-tight">Term Insurance.</h1>
          <p className="text-white/70 max-w-xl text-base font-light leading-relaxed">
            Secure your family's future with precision-calculated life coverage estimates based on global mortality trends.
          </p>
        </header>

        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/5 rounded-lg text-sm font-bold transition-all">
            <Download className="w-4 h-4" /> Download Quote
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#D4AF37] hover:bg-[#D4AF37]/90 rounded-lg text-sm font-bold transition-all shadow-lg shadow-[#D4AF37]/20 text-white">
            <Share2 className="w-4 h-4" /> Share Estimate
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <section className="bg-white/[0.02] border border-white/5 rounded-2xl p-8 space-y-8">
          <div className="space-y-8">
             <CurrencyInput 
                label="Coverage Amount (Sum Assured)"
                value={inputs.coverage}
                onChange={(val) => setInputs({ ...inputs, coverage: val })}
                min={100000}
                max={10000000}
                step={100000}
             />

             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-8">
               <div className="space-y-4">
                  <label className="text-sm font-bold text-white/70 uppercase tracking-widest">Current Age</label>
                  <div className="flex items-center gap-2 bg-black/40 p-3 rounded-xl border border-white/5">
                    <User className="w-4 h-4 text-[#D4AF37]" />
                    <NumericInput 
                      min={18} max={65} 
                      value={inputs.age}
                      onChange={(val) => setInputs({ ...inputs, age: val })}
                      className="bg-transparent border-none text-white font-bold w-full outline-none"
                    />
                  </div>
               </div>
               <div className="space-y-4">
                  <label className="text-sm font-bold text-white/70 uppercase tracking-widest">Policy Term (Years)</label>
                  <div className="space-y-4">
                    <NumericInput 
                      min={5} max={50} 
                      value={inputs.term}
                      onChange={(val) => setInputs({ ...inputs, term: val })}
                      className="bg-black/40 p-3 rounded-xl border border-white/5 text-white font-bold w-full outline-none"
                    />
                    <div className="flex items-center gap-2 bg-black/40 p-3 rounded-xl border border-white/5">
                      <select 
                        value={inputs.term}
                        onChange={(e) => setInputs({ ...inputs, term: Number(e.target.value) })}
                        className="bg-transparent border-none text-white font-bold w-full outline-none appearance-none"
                      >
                        {[10, 15, 20, 25, 30, 35, 40].map(yr => <option key={yr} value={yr} className="bg-black">{yr} Years</option>)}
                      </select>
                    </div>
                  </div>
               </div>
             </div>

             <div className="grid grid-cols-2 gap-4">
                <button 
                  onClick={() => setInputs({...inputs, gender: 'male'})}
                  className={`py-3 rounded-xl border text-sm font-bold uppercase tracking-widest transition-all ${inputs.gender === 'male' ? 'bg-[#D4AF37] border-[#D4AF37] text-white' : 'bg-white/5 border-white/5 text-white/70'}`}
                >
                  Male
                </button>
                <button 
                  onClick={() => setInputs({...inputs, gender: 'female'})}
                  className={`py-3 rounded-xl border text-sm font-bold uppercase tracking-widest transition-all ${inputs.gender === 'female' ? 'bg-[#D4AF37] border-[#D4AF37] text-white' : 'bg-white/5 border-white/5 text-white/70'}`}
                >
                  Female
                </button>
             </div>

             <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                <div className="flex items-center gap-3">
                   <Activity className="w-4 h-4 text-orange-500" />
                   <div>
                      <div className="text-sm font-bold text-white uppercase tracking-widest">Tobacco/Smoking</div>
                      <div className="text-[9px] text-white/70 uppercase">Do you consume tobacco?</div>
                   </div>
                </div>
                <button 
                  onClick={() => setInputs({ ...inputs, isSmoker: !inputs.isSmoker })}
                  className={`w-12 h-6 rounded-full transition-all relative ${inputs.isSmoker ? 'bg-orange-500' : 'bg-white/10'}`}
                >
                  <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${inputs.isSmoker ? 'left-7' : 'left-1'}`}></div>
                </button>
             </div>
          </div>

          <div className="p-6 bg-[#D4AF37]/5 rounded-2xl border border-[#D4AF37]/10 flex items-center justify-between">
             <div className="space-y-1">
                <div className="text-sm text-[#D4AF37] font-bold uppercase tracking-widest">Estimated Monthly Premium</div>
                <div className="text-4xl font-bold text-white tracking-tighter">{formatCurrency(results.monthlyPremium)}</div>
             </div>
             <div className="text-right">
                <div className="text-sm text-white/70 font-bold uppercase tracking-widest">Annual Total</div>
                <div className="text-2xl font-bold text-white/70 tracking-tighter">{formatCurrency(results.annualPremium)}</div>
             </div>
          </div>
        </section>

        <section className="bg-white/[0.02] border border-white/5 rounded-2xl p-8 flex flex-col items-center justify-center space-y-8 overflow-hidden relative">
           <div className="absolute top-0 right-0 p-8 opacity-[0.02]">
              <Shield className="w-64 h-64" />
           </div>

           {isMounted && (
             <>
               <div className="text-center space-y-4 relative z-10">
                  <div className="w-20 h-20 bg-[#D4AF37]/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-[#D4AF37]/20">
                     <Shield className="w-10 h-10 text-[#D4AF37]" />
                  </div>
                  <h3 className="text-3xl font-display font-medium">Protection Analysis.</h3>
                  <p className="text-white/70 text-sm italic max-w-xs mx-auto">
                    "Based on your profile, we recommend a minimum death benefit of 10-15x your annual income."
                  </p>
               </div>

               <div className="w-full space-y-4 pt-8 border-t border-white/5">
                  <div className="flex justify-between items-center text-sm uppercase font-bold tracking-widest">
                     <span className="text-white/70">Total Benefit</span>
                     <span className="text-white">{formatCurrency(inputs.coverage)}</span>
                  </div>
                  <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                     <div className="h-full bg-[#D4AF37] w-full"></div>
                  </div>

                  <div className="flex justify-between items-center text-sm uppercase font-bold tracking-widest pt-4">
                     <span className="text-white/70">Value of Security</span>
                     <span className="text-emerald-500">Priceless</span>
                  </div>
                  <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                     <div className="h-full bg-emerald-500 w-[85%]"></div>
                  </div>
               </div>

               <AIAdvisor context={`Term Insurance Estimate: Sum Assured ${inputs.coverage}, Age ${inputs.age}, Smoker: ${inputs.isSmoker}, Annual Premium ${results.annualPremium}`} />
             </>
           )}
        </section>
      </div>

      <SEOSection 
        title="Term Insurance Calculator"
        howTo={[
          "Select the desired sum assured (death benefit) based on your liabilities.",
          "Enter your current age (premiums increase as you get older).",
          "Specify your smoking status and gender for actuarial adjustment.",
          "Choose a policy term that covers your active working years."
        ]}
        formula="Annual Premium ≈ (Base Premium Rate x Sum Assured / 1000) x Mortality Loaders x Health Factors"
        benefits={[
          "Understand the financial cost of family protection.",
          "Compare smoker vs non-smoker premium differentials.",
          "Calculate the ideal coverage amount needed to clear debts.",
          "Optimize your policy term to match your financial goals."
        ]}
      />
    </div>
  );
}
