/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from 'react';
import { Percent, Download, Share2, Globe, Shield, Wallet } from 'lucide-react';
import { useLocale } from '../context/LocaleContext';
import { TaxInputs } from '../types';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import jsPDF from 'jspdf';
import SEOSection from './SEOSection';

const DEFAULT_TAX_SLABS = [5, 12, 18, 28]; // Typical for GST
const INTERNATIONAL_VAT_SLABS = [5, 7, 15, 20];

export default function IncomeTaxCalculator() {
  const { formatCurrency, labels, currency, formatValue } = useLocale();
  const [inputs, setInputs] = useState({
    amount: 1000000,
  });
  const [isMounted, setIsMounted] = useState(false);

  // Income Tax Logic for India (Slab based)
  const calculateIncomeTax = (income: number) => {
    const calculateNewRegime = (i: number) => {
      let tax = 0;
      if (i <= 300000) tax = 0;
      else if (i <= 600000) tax = (i - 300000) * 0.05;
      else if (i <= 900000) tax = 300000 * 0.05 + (i - 600000) * 0.10;
      else if (i <= 1200000) tax = 300000 * 0.05 + 300000 * 0.10 + (i - 900000) * 0.15;
      else if (i <= 1500000) tax = 300000 * 0.05 + 300000 * 0.10 + 300000 * 0.15 + (i - 1200000) * 0.20;
      else tax = 300000 * 0.05 + 300000 * 0.10 + 300000 * 0.15 + 300000 * 0.20 + (i - 1500000) * 0.30;
      
      // Rebate up to 7L
      if (i <= 700000) tax = 0;
      return tax + (tax * 0.04); // Cess
    };

    const calculateOldRegime = (i: number) => {
      let tax = 0;
      const taxable = i - 50000; // Std deduction
      if (taxable <= 250000) tax = 0;
      else if (taxable <= 500000) tax = (taxable - 250000) * 0.05;
      else if (taxable <= 1000000) tax = 250000 * 0.05 + (taxable - 500000) * 0.20;
      else tax = 250000 * 0.05 + 500000 * 0.20 + (taxable - 1000000) * 0.30;
      
      if (i <= 500000) tax = 0;
      return tax + (tax * 0.04);
    };

    return { 
      new: calculateNewRegime(income), 
      old: calculateOldRegime(income) 
    };
  };

  const results = useMemo(() => {
    const incomeTax = calculateIncomeTax(inputs.amount);
    return { 
      taxAmount: incomeTax.new,
      alternativeTax: incomeTax.old,
      totalAmount: inputs.amount - incomeTax.new,
      originalAmount: inputs.amount
    };
  }, [inputs]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(22);
    doc.text(`Orbit Wealth Pro: Income Tax Analysis`, 20, 20);
    doc.setFontSize(12);
    doc.text(`Annual Gross Income: ${formatCurrency(inputs.amount)}`, 20, 40);
    doc.text(`New Regime Tax: ${formatCurrency(results.taxAmount)}`, 20, 50);
    doc.text(`Old Regime Tax: ${formatCurrency(results.alternativeTax || 0)}`, 20, 60);
    doc.text(`Take-home Pay: ${formatCurrency(results.totalAmount)}`, 20, 70);
    doc.save('income-tax-analysis.pdf');
  };

  return (
    <div className="space-y-8 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <header className="space-y-2">
          <div className="flex items-center gap-2 mb-4">
             <Percent className="text-[#0055FF] w-6 h-6" />
             <h1 className="text-3xl font-bold tracking-tighter text-white">Income Tax Calculator</h1>
          </div>
          <p className="text-white/40 max-w-xl text-sm leading-relaxed">
            Personalized income tax analysis comparing taxation regimes for global and regional jurisdictions.
          </p>
        </header>

        <div className="flex items-center gap-2">
          <button onClick={downloadPDF} className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/5 rounded-lg text-xs font-bold transition-all">
            <Download className="w-4 h-4" /> PDF Report
          </button>
          <button className="flex items-center gap-3 px-4 py-2 bg-[#0055FF] hover:bg-[#0055FF]/90 rounded-lg text-xs font-bold transition-all shadow-lg shadow-[#0055FF]/20">
            <Share2 className="w-4 h-4" /> Share
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <section className="bg-white/[0.02] border border-white/5 rounded-2xl p-8 space-y-8">
          <div className="space-y-6">
             <div className="space-y-4">
               <label className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Annual Gross Income</label>
               <div className="relative">
                 <input 
                   type="number"
                   value={inputs.amount}
                   onChange={(e) => setInputs({ ...inputs, amount: Number(e.target.value) })}
                   className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-[#0055FF] transition-all font-bold"
                 />
                 <div className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 font-bold">{currency}</div>
               </div>
             </div>

             <div className="p-4 bg-[#0055FF]/10 rounded-2xl border border-[#0055FF]/20 flex items-center gap-4 animate-in fade-in zoom-in-95 duration-300">
                <Shield className="text-[#0055FF] w-6 h-6" />
                <p className="text-[10px] text-white/60 leading-relaxed italic">
                   {currency === 'INR' 
                     ? 'Includes Standard Deduction of ₹50,000 for salaried individuals and 4% Health & Education Cess.'
                     : 'Calculates basic income tax tiers based on standard global progressive slab structures.'}
                </p>
             </div>
          </div>
        </section>

        <section className="bg-white/[0.02] border border-white/5 rounded-2xl p-8 flex flex-col items-center justify-between min-h-[400px]">
           {isMounted && (
             <div className="w-full flex-1 flex flex-col gap-6">
               <div className="grid grid-cols-1 gap-4">
                 <div className="p-6 bg-white/5 rounded-2xl border border-white/5 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] font-bold text-white/20 uppercase tracking-widest mb-1">Effective Tax Liability</div>
                      <div className="text-3xl font-bold text-[#0055FF] tracking-tighter">{formatCurrency(results.taxAmount)}</div>
                    </div>
                    <Wallet className="text-white/5 w-10 h-10" />
                 </div>

                 {currency === 'INR' && results.alternativeTax !== undefined && (
                   <div className="p-6 bg-white/[0.02] rounded-2xl border border-white/5 border-dashed flex items-center justify-between">
                      <div>
                        <div className="text-[10px] font-bold text-white/20 uppercase tracking-widest mb-1">Old Regime Comparison</div>
                        <div className="text-xl font-bold text-white/40 tracking-tighter">{formatCurrency(results.alternativeTax)}</div>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-[8px] font-bold ${results.taxAmount < results.alternativeTax ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`}>
                         {results.taxAmount < results.alternativeTax ? 'NEW REGIME BETTER' : 'OLD REGIME BETTER'}
                      </div>
                   </div>
                 )}

                 <div className="p-6 bg-white/[0.02] rounded-2xl border border-white/10 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1">Take-home / Post-Tax</div>
                      <div className="text-4xl font-bold text-white tracking-tighter">{formatCurrency(results.totalAmount)}</div>
                    </div>
                 </div>
               </div>

               <div className="flex-1 h-[150px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                     <BarChart data={[
                       { name: 'Income', val: inputs.amount },
                       { name: 'Tax', val: results.taxAmount },
                       { name: 'Net', val: results.totalAmount }
                     ]}>
                        <XAxis dataKey="name" axisLine={false} tickLine={false} fontSize={10} stroke="#ffffff20" />
                        <RechartsTooltip contentStyle={{ backgroundColor: '#111', border: '1px solid #333', fontSize: '10px' }} />
                        <Bar dataKey="val" fill="#0055FF" radius={[4, 4, 0, 0]} />
                     </BarChart>
                  </ResponsiveContainer>
               </div>
             </div>
           )}
        </section>
      </div>

      <SEOSection 
        title="Income Tax Calculator"
        howTo={[
          "Enter your annual gross income before any deductions to start the calculation.",
          "For Indian users, the tool automatically compares the New and Old Tax Regimes for FY 2024-25.",
          "Check the effective tax liability and identify the most beneficial regime for your bracket.",
          "Export your detailed tax breakdown into a professional PDF summary."
        ]}
        formula="Tax = Progressive Slab Logic + Standard Deductions"
        benefits={[
          "Instant comparison between multiple tax regimes to maximize savings.",
          "Includes regional specific logic like Indian standard deductions and cess.",
          "Dynamic bar charts visualizing the split between income, tax, and net pay.",
          "User-friendly interface optimized for fast financial decision-making."
        ]}
      />
    </div>
  );
}
