/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from 'react';
import { ArrowRightLeft, Download, Share2, TrendingDown, Landmark } from 'lucide-react';
import { useLocale } from '../context/LocaleContext';
import { BalanceTransferInputs } from '../types';
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip as RechartsTooltip, CartesianGrid } from 'recharts';
import jsPDF from 'jspdf';
import SEOSection from './SEOSection';

const INITIAL_INPUTS: BalanceTransferInputs = {
  outstandingPrincipal: 2500000,
  existingRate: 10.5,
  newRate: 8.5,
  remainingTerm: 15,
  processingFees: 5000
};

export default function BalanceTransfer() {
  const { formatCurrency, labels, currencySymbol } = useLocale();
  const [inputs, setInputs] = useState<BalanceTransferInputs>(INITIAL_INPUTS);
  const [isMounted, setIsMounted] = useState(false);

  const results = useMemo(() => {
    const calculateEMI = (p: number, r: number, n: number) => {
      const monthlyRate = r / 12 / 100;
      const numPayments = n * 12;
      return (p * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1);
    };

    const existingEMI = calculateEMI(inputs.outstandingPrincipal, inputs.existingRate, inputs.remainingTerm);
    const newEMI = calculateEMI(inputs.outstandingPrincipal, inputs.newRate, inputs.remainingTerm);
    
    const monthlySavings = existingEMI - newEMI;
    const totalSavings = (monthlySavings * inputs.remainingTerm * 12) - inputs.processingFees;
    
    const breakEvenMonths = inputs.processingFees / monthlySavings;

    return {
      existingEMI: Math.round(existingEMI),
      newEMI: Math.round(newEMI),
      monthlySavings: Math.round(monthlySavings),
      totalSavings: Math.round(totalSavings),
      breakEvenMonths: Math.round(breakEvenMonths * 10) / 10
    };
  }, [inputs]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(22);
    doc.text('Orbit Wealth Pro: Home Loan Balance Transfer', 20, 20);
    doc.setFontSize(12);
    doc.text(`Outstanding Principal: ${formatCurrency(inputs.outstandingPrincipal)}`, 20, 40);
    doc.text(`Existing Rate: ${inputs.existingRate}%`, 20, 50);
    doc.text(`New Rate: ${inputs.newRate}%`, 20, 60);
    doc.text(`Remaining Tenure: ${inputs.remainingTerm} Years`, 20, 70);
    doc.text(`Monthly Savings: ${formatCurrency(results.monthlySavings)}`, 20, 90);
    doc.text(`Total Lifetime Savings: ${formatCurrency(results.totalSavings)}`, 20, 100);
    doc.text(`Break-even Point: ${results.breakEvenMonths} Months`, 20, 110);
    doc.save('balance-transfer-savings.pdf');
  };

  return (
    <div className="space-y-8 pb-20 text-white">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <header className="space-y-2">
          <div className="flex items-center gap-2 mb-4">
             <ArrowRightLeft className="text-[#0055FF] w-6 h-6" />
             <h1 className="text-3xl font-bold tracking-tighter">Home Loan Transfer</h1>
          </div>
          <p className="text-white/40 max-w-xl text-sm leading-relaxed">
            Switch your existing high-interest home loan to a lower rate and calculate your total interest savings and break-even point.
          </p>
        </header>

        <div className="flex items-center gap-2">
          <button onClick={downloadPDF} className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/5 rounded-lg text-xs font-bold transition-all">
            <Download className="w-4 h-4" /> PDF Analysis
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#0055FF] hover:bg-[#0055FF]/90 rounded-lg text-xs font-bold transition-all shadow-lg shadow-[#0055FF]/20 text-white">
            <Share2 className="w-4 h-4" /> Share Savings
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <section className="bg-white/[0.02] border border-white/5 rounded-2xl p-8 space-y-8">
           <div className="space-y-6">
              <div className="space-y-4">
                 <div className="flex justify-between items-center">
                    <label className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Outstanding Principal</label>
                    <div className="text-lg font-bold text-white tracking-tighter">{formatCurrency(inputs.outstandingPrincipal)}</div>
                 </div>
                 <input 
                   type="range" min="100000" max="50000000" step="100000"
                   value={inputs.outstandingPrincipal}
                   onChange={(e) => setInputs({ ...inputs, outstandingPrincipal: Number(e.target.value) })}
                   className="w-full accent-[#0055FF]"
                 />
              </div>

              <div className="grid grid-cols-2 gap-8">
                 <div className="space-y-4">
                    <label className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Existing Rate (%)</label>
                    <input 
                      type="number" step="0.1" value={inputs.existingRate}
                      onChange={(e) => setInputs({ ...inputs, existingRate: Number(e.target.value) })}
                      className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-3 text-white font-bold outline-none"
                    />
                 </div>
                 <div className="space-y-4">
                    <label className="text-[10px] font-bold text-white/20 uppercase tracking-widest">New Rate (%)</label>
                    <input 
                      type="number" step="0.1" value={inputs.newRate}
                      onChange={(e) => setInputs({ ...inputs, newRate: Number(e.target.value) })}
                      className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-3 text-[#0055FF] font-bold outline-none"
                    />
                 </div>
              </div>

              <div className="grid grid-cols-2 gap-8">
                 <div className="space-y-4">
                    <label className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Remaining Tenure (Yrs)</label>
                    <input 
                      type="number" value={inputs.remainingTerm}
                      onChange={(e) => setInputs({ ...inputs, remainingTerm: Number(e.target.value) })}
                      className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-3 text-white font-bold outline-none"
                    />
                 </div>
                 <div className="space-y-4">
                    <label className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Processing Fees</label>
                    <input 
                      type="number" value={inputs.processingFees}
                      onChange={(e) => setInputs({ ...inputs, processingFees: Number(e.target.value) })}
                      className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-3 text-white font-bold outline-none"
                    />
                 </div>
              </div>
           </div>
        </section>

        <section className="bg-white/[0.02] border border-white/5 rounded-2xl p-8 flex flex-col justify-between">
           {isMounted && (
             <div className="space-y-8 h-full flex flex-col">
               <div className="grid grid-cols-1 gap-4">
                 <div className="p-6 bg-[#0055FF]/10 rounded-2xl border border-[#0055FF]/20 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] font-bold text-[#0055FF] uppercase tracking-widest mb-1">Total Interest Savings</div>
                      <div className="text-4xl font-bold text-white tracking-widest">{formatCurrency(results.totalSavings)}</div>
                    </div>
                    <TrendingDown className="w-10 h-10 text-[#0055FF]/20" />
                 </div>

                 <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                        <div className="text-[10px] text-white/20 font-bold uppercase tracking-widest mb-1">Monthly Savings</div>
                        <div className="text-xl font-bold text-white/60">{formatCurrency(results.monthlySavings)}</div>
                    </div>
                    <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                        <div className="text-[10px] text-white/20 font-bold uppercase tracking-widest mb-1">Break-even Point</div>
                        <div className="text-xl font-bold text-white/60">{results.breakEvenMonths} Months</div>
                    </div>
                 </div>
               </div>

               <div className="flex-1 min-h-[150px] mt-8 bg-black/20 rounded-2xl border border-white/5 p-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={[
                      { name: 'Existing EMI', value: results.existingEMI },
                      { name: 'New EMI', value: results.newEMI },
                    ]} layout="vertical" margin={{ left: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" horizontal={false} />
                      <XAxis type="number" hide />
                      <YAxis dataKey="name" type="category" stroke="#ffffff20" fontSize={10} axisLine={false} tickLine={false} />
                      <RechartsTooltip contentStyle={{ backgroundColor: '#111', border: '1px solid #333', fontSize: '10px' }} />
                      <Bar dataKey="value" fill="#0055FF" radius={[0, 4, 4, 0]} barSize={20} isAnimationActive={false} />
                    </BarChart>
                  </ResponsiveContainer>
               </div>
             </div>
           )}
        </section>
      </div>

      <SEOSection 
        title="Home Loan Balance Transfer Calculator"
        howTo={[
          "Enter your currently outstanding principal amount on your home loan.",
          "Input your current interest rate and the new lower rate offered by another bank.",
          "Specify the remaining tenure of your loan in years.",
          "Include any processing fees or legal costs associated with the transfer.",
          "View your monthly savings, lifetime savings, and the break-even period."
        ]}
        formula="Savings = (EMI_old - EMI_new) * months - Fees"
        benefits={[
          "Identifies the actual financial benefit of switching lenders.",
          "Calculates the exact month when your savings will cover the transfer costs.",
          "Helps negotiate better rates with your existing bank by showing clear math.",
          "Universal compatibility with global mortgage switching standards."
        ]}
      />
    </div>
  );
}
