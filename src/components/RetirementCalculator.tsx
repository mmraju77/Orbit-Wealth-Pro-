/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from 'react';
import { Coins, Download, Share2, Info } from 'lucide-react';
import { useLocale } from '../context/LocaleContext';
import { RetirementInputs, RetirementResult } from '../types';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip as RechartsTooltip } from 'recharts';
import jsPDF from 'jspdf';
import { useParams } from 'react-router-dom';
import SEOSection from './SEOSection';

const REGIONAL_DEFAULTS: Record<string, { retirementAge: number; inflation: number }> = {
  india: { retirementAge: 60, inflation: 6 },
  usa: { retirementAge: 67, inflation: 3 },
  uk: { retirementAge: 67, inflation: 2.5 },
  canada: { retirementAge: 65, inflation: 2.5 },
  australia: { retirementAge: 67, inflation: 3 },
  germany: { retirementAge: 67, inflation: 2 },
  netherlands: { retirementAge: 67, inflation: 2 },
  switzerland: { retirementAge: 65, inflation: 1.5 },
  norway: { retirementAge: 67, inflation: 2 },
  sweden: { retirementAge: 67, inflation: 2 },
  denmark: { retirementAge: 67, inflation: 2 },
};

export default function RetirementCalculator() {
  const { region } = useParams<{ region: string }>();
  const { formatCurrency, currencySymbol, formatValue, currency } = useLocale();

  const countryKey = useMemo(() => {
    if (region) return region.toLowerCase();
    const map: Record<string, string> = {
      INR: 'india', USD: 'usa', GBP: 'uk', CAD: 'canada', AUD: 'australia',
      EUR: 'germany', CHF: 'switzerland', NOK: 'norway', SEK: 'sweden', DKK: 'denmark',
      NL: 'netherlands'
    };
    return map[currency] || 'usa';
  }, [region, currency]);

  const labels = useMemo(() => {
    switch(countryKey) {
      case 'australia': return { contribution: 'Super Contribution', savings: 'Current Super Balance' };
      case 'canada': return { contribution: 'RRSP/TFSA Contribution', savings: 'Current RRSP Balance' };
      case 'uk': return { contribution: 'Pension Contribution', savings: 'Current Pension Pot' };
      default: return { contribution: 'Monthly Contribution', savings: 'Initial Corpus' };
    }
  }, [countryKey]);

  const defaults = REGIONAL_DEFAULTS[countryKey] || REGIONAL_DEFAULTS['usa'];

  const [inputs, setInputs] = useState<RetirementInputs>({
    currentAge: 30,
    retirementAge: defaults.retirementAge,
    currentSavings: 100000,
    monthlyContribution: 10000,
    expectedReturn: 12,
    expectedInflation: defaults.inflation
  });

  useEffect(() => {
    setInputs(prev => ({
      ...prev,
      retirementAge: defaults.retirementAge,
      expectedInflation: defaults.inflation
    }));
  }, [countryKey]);

  const [isMounted, setIsMounted] = useState(false);

  const results = useMemo(() => {
    const yearsToRetire = inputs.retirementAge - inputs.currentAge;
    const monthsToRetire = Math.max(0, yearsToRetire * 12);
    const monthlyRate = inputs.expectedReturn / 100 / 12;
    const inflationRate = inputs.expectedInflation / 100;

    let totalSavings = inputs.currentSavings;
    const yearlyData = [{ 
      year: inputs.currentAge, 
      balance: Math.round(totalSavings),
      inflatedBalance: Math.round(totalSavings)
    }];

    for (let i = 1; i <= monthsToRetire; i++) {
        totalSavings = (totalSavings * (1 + monthlyRate)) + inputs.monthlyContribution;
        if (i % 12 === 0) {
            const yearIndex = i / 12;
            const purchasingPower = totalSavings / Math.pow(1 + inflationRate, yearIndex);
            yearlyData.push({ 
              year: inputs.currentAge + yearIndex, 
              balance: Math.round(totalSavings),
              inflatedBalance: Math.round(purchasingPower)
            });
        }
    }

    const inflationAdjustedCorpus = totalSavings / Math.pow(1 + inflationRate, yearsToRetire);
    const totalContributions = (inputs.monthlyContribution * monthsToRetire) + inputs.currentSavings;

    return {
      totalSavings: Math.round(totalSavings),
      totalContributions: Math.round(totalContributions),
      totalInterest: Math.round(totalSavings - totalContributions),
      inflationAdjustedCorpus: Math.round(inflationAdjustedCorpus),
      yearlyData
    };
  }, [inputs]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(22);
    doc.text('Orbit Wealth Pro: Retirement Strategy', 20, 20);
    doc.setFontSize(10);
    doc.text(`Retirement Age: ${inputs.retirementAge} | Current Age: ${inputs.currentAge}`, 20, 35);
    doc.text(`Monthly Contribution: ${formatCurrency(inputs.monthlyContribution)}`, 20, 45);
    doc.text(`Exp. Return: ${inputs.expectedReturn}% | Inflation: ${inputs.expectedInflation}%`, 20, 55);
    doc.setFontSize(14);
    doc.text(`Projected Corpus: ${formatCurrency(results.totalSavings)}`, 20, 75);
    doc.text(`Purchasing Power: ${formatCurrency(results.inflationAdjustedCorpus)}`, 20, 85);
    doc.save('retirement-strategy.pdf');
  };

  return (
    <div className="space-y-12 pb-20 text-white">
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-8">
        <header className="space-y-4">
          <div className="flex items-center gap-2 mb-2">
             <div className="h-px w-6 bg-[#0055FF]"></div>
             <span className="text-[10px] font-bold text-[#0055FF] uppercase tracking-[0.3em]">Retirement Logistics</span>
          </div>
          <h1 className="text-5xl font-display font-medium text-white tracking-tight">Sunset Provisions.</h1>
          <p className="text-white/40 max-w-xl text-sm font-light leading-relaxed">
            Architect your post-career financial state with inflation-adjusted corpus modeling.
          </p>
        </header>

        <div className="flex items-center gap-2">
          <button onClick={downloadPDF} className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/5 rounded-lg text-xs font-bold transition-all">
            <Download className="w-4 h-4" /> PDF Strategy
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#0055FF] hover:bg-[#0055FF]/90 rounded-lg text-xs font-bold transition-all shadow-lg shadow-[#0055FF]/20 text-white">
            <Share2 className="w-4 h-4" /> Share Corpus
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <section className="bg-white/[0.02] border border-white/5 rounded-2xl p-8 space-y-8">
           <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-8">
                 <div className="space-y-4">
                    <label className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Current Age</label>
                    <input 
                      type="number" value={inputs.currentAge}
                      onChange={(e) => setInputs({ ...inputs, currentAge: Number(e.target.value) })}
                      className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-3 text-white font-bold outline-none"
                    />
                 </div>
                 <div className="space-y-4">
                    <label className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Retirement Age</label>
                    <input 
                      type="number" value={inputs.retirementAge}
                      onChange={(e) => setInputs({ ...inputs, retirementAge: Number(e.target.value) })}
                      className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-3 text-[#0055FF] font-bold outline-none"
                    />
                 </div>
              </div>

              <div className="space-y-4">
                 <div className="flex justify-between items-center">
                    <label className="text-[10px] font-bold text-white/20 uppercase tracking-widest">{labels.savings}</label>
                    <div className="text-lg font-bold text-white tracking-tighter">{formatCurrency(inputs.currentSavings)}</div>
                 </div>
                 <input 
                   type="range" min="0" max="10000000" step="50000"
                   value={inputs.currentSavings}
                   onChange={(e) => setInputs({ ...inputs, currentSavings: Number(e.target.value) })}
                   className="w-full accent-[#0055FF]"
                 />
              </div>

              <div className="space-y-4">
                 <div className="flex justify-between items-center">
                    <label className="text-[10px] font-bold text-white/20 uppercase tracking-widest">{labels.contribution}</label>
                    <div className="text-lg font-bold text-white tracking-tighter">{formatCurrency(inputs.monthlyContribution)}</div>
                 </div>
                 <input 
                   type="range" min="1000" max="250000" step="1000"
                   value={inputs.monthlyContribution}
                   onChange={(e) => setInputs({ ...inputs, monthlyContribution: Number(e.target.value) })}
                   className="w-full accent-[#0055FF]"
                 />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-8">
                 <div className="space-y-4">
                    <label className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Expected Return (%)</label>
                    <input 
                      type="number" step="0.5" value={inputs.expectedReturn}
                      onChange={(e) => setInputs({ ...inputs, expectedReturn: Number(e.target.value) })}
                      className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-3 text-white font-bold outline-none"
                    />
                 </div>
                 <div className="space-y-4">
                    <label className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Inflation Rate (%)</label>
                    <input 
                      type="number" step="0.1" value={inputs.expectedInflation}
                      onChange={(e) => setInputs({ ...inputs, expectedInflation: Number(e.target.value) })}
                      className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-3 text-white font-bold outline-none"
                    />
                 </div>
              </div>
           </div>
        </section>

        <section className="bg-white/[0.02] border border-white/5 rounded-2xl p-8 flex flex-col justify-between min-h-[500px]">
           {isMounted && (
             <div className="flex-1 flex flex-col">
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  <div className="p-4 md:p-6 bg-white/5 rounded-2xl border border-white/10 text-center">
                     <div className="text-[10px] font-bold text-white/20 uppercase tracking-widest mb-1">Raw Corpus</div>
                     <div className="text-xl md:text-2xl font-bold text-white">{formatCurrency(results.totalSavings)}</div>
                  </div>
                  <div className="p-4 md:p-6 bg-[#0055FF]/20 rounded-2xl border border-[#0055FF]/30 text-center ring-2 ring-[#0055FF]/50 ring-offset-4 ring-offset-black">
                     <div className="text-[10px] font-bold text-[#0055FF] uppercase tracking-widest mb-1">Purchasing Power</div>
                     <div className="text-xl md:text-2xl font-bold text-white">{formatCurrency(results.inflationAdjustedCorpus)}</div>
                  </div>
               </div>

               <div className="flex-1 h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={results.yearlyData}>
                      <defs>
                        <linearGradient id="colorBal" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#0055FF" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#0055FF" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorInf" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#ffffff" stopOpacity={0.1}/>
                          <stop offset="95%" stopColor="#ffffff" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                      <XAxis dataKey="year" stroke="#ffffff10" fontSize={10} tickLine={false} axisLine={false} dy={10} />
                      <YAxis stroke="#ffffff10" fontSize={10} tickLine={false} axisLine={false} tickFormatter={(val) => `${currencySymbol}${formatValue(val / 1000)}k`} />
                      <RechartsTooltip contentStyle={{ backgroundColor: '#111', border: '1px solid #333', fontSize: '10px' }} />
                      <Area type="monotone" dataKey="balance" stroke="#0055FF" strokeWidth={3} fillOpacity={1} fill="url(#colorBal)" name="Raw Corpus" isAnimationActive={false} />
                      <Area type="monotone" dataKey="inflatedBalance" stroke="#ffffff20" strokeWidth={2} strokeDasharray="5 5" fillOpacity={1} fill="url(#colorInf)" name="Purchasing Power" isAnimationActive={false} />
                    </AreaChart>
                  </ResponsiveContainer>
               </div>

               <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/5 mt-4">
                  <Info className="w-5 h-5 text-white/20 shrink-0" />
                  <div className="space-y-1">
                    <p className="text-[10px] text-white/40 leading-relaxed">
                      Purchasing power represents what your future corpus would be worth in today's currency value, 
                      accounting for a {inputs.expectedInflation}% annual cost-of-living increase.
                    </p>
                    {countryKey === 'australia' && (
                      <p className="text-[10px] text-[#0055FF] font-bold">
                        Tip: Employer Super Guarantee is currently 11.5% in Australia. Ensure this is factored into contributions.
                      </p>
                    )}
                    {countryKey === 'canada' && (
                      <p className="text-[10px] text-[#0055FF] font-bold">
                        Note: RRSP contribution limits are strictly 18% of earned income up to a maximum annual cap.
                      </p>
                    )}
                    {countryKey === 'uk' && (
                      <p className="text-[10px] text-[#0055FF] font-bold">
                        Hint: Tax relief on pension contributions can significantly boost your effective savings rate in the UK.
                      </p>
                    )}
                  </div>
               </div>
             </div>
           )}
        </section>
      </div>

      <SEOSection 
        title="Retirement Corpus Calculator"
        howTo={[
          "Enter your current age and targeted retirement age.",
          "Input existing savings and your planned monthly contribution.",
          "Set expected annual returns and average inflation rate.",
          "View the purchasing power to understand if your goal stays ahead of inflation."
        ]}
        formula="FV = P × [((1 + r)ⁿ - 1) / r] | Real FV = FV / (1 + inf)ⁿ"
        benefits={[
          "Inflation-aware projections for realistic retirement planning.",
          "High-precision compound interest and depreciation tracking.",
          "Instant visualization of the 'purchasing power gap'.",
          "Mobile-responsive reports for on-the-go financial checking."
        ]}
      />
    </div>
  );
}
