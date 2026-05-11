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

export default function TaxCalculator() {
  const { formatCurrency, labels, currency, formatValue } = useLocale();
  const [mode, setMode] = useState<'indirect' | 'income'>('indirect');
  const [inputs, setInputs] = useState<TaxInputs>({
    amount: 1000000,
    taxRate: currency === 'INR' ? 18 : 20,
    isAddingTax: true,
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
    if (mode === 'indirect') {
      const rate = inputs.taxRate / 100;
      let originalAmount, taxAmount, totalAmount;
      if (inputs.isAddingTax) {
        originalAmount = inputs.amount;
        taxAmount = originalAmount * rate;
        totalAmount = originalAmount + taxAmount;
      } else {
        totalAmount = inputs.amount;
        originalAmount = totalAmount / (1 + rate);
        taxAmount = totalAmount - originalAmount;
      }
      return { originalAmount, taxAmount, totalAmount };
    } else {
      const incomeTax = calculateIncomeTax(inputs.amount);
      return { 
        taxAmount: incomeTax.new,
        alternativeTax: incomeTax.old,
        totalAmount: inputs.amount - incomeTax.new,
        originalAmount: inputs.amount
      };
    }
  }, [inputs, mode]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(22);
    doc.text(`Orbit Wealth Pro: ${mode === 'income' ? 'Income Tax' : labels.tax} Analysis`, 20, 20);
    doc.setFontSize(12);
    doc.text(`Base Amount: ${formatCurrency(inputs.amount)}`, 20, 40);
    if (mode === 'indirect') {
      doc.text(`Tax Rate: ${inputs.taxRate}%`, 20, 50);
      doc.text(`Total Value: ${formatCurrency(results.totalAmount)}`, 20, 60);
    } else {
      doc.text(`New Regime Tax: ${formatCurrency(results.taxAmount)}`, 20, 50);
      doc.text(`Old Regime Tax: ${formatCurrency(results.alternativeTax || 0)}`, 20, 60);
    }
    doc.save('tax-analysis.pdf');
  };

  const currentSlabs = currency === 'INR' ? DEFAULT_TAX_SLABS : INTERNATIONAL_VAT_SLABS;

  return (
    <div className="space-y-8 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <header className="space-y-2">
          <div className="flex items-center gap-2 mb-4">
             <Percent className="text-[#0055FF] w-6 h-6" />
             <h1 className="text-3xl font-bold tracking-tighter text-white">Tax Calculator</h1>
          </div>
          <p className="text-white/40 max-w-xl text-sm leading-relaxed">
            Switch between {currency === 'INR' ? 'Direct Income Tax (FY 2024-25)' : 'Direct Tax'} and Indirect {labels.tax} modes.
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
          <div className="flex gap-1 p-1 bg-white/5 rounded-xl border border-white/5">
            <button
              onClick={() => setMode('indirect')}
              className={`flex-1 py-3 text-xs font-bold rounded-lg transition-all ${mode === 'indirect' ? 'bg-[#0055FF] text-white shadow-lg shadow-[#0055FF]/20' : 'text-white/20 hover:text-white/40'}`}
            >
              {labels.tax} (GST/VAT)
            </button>
            <button
              onClick={() => setMode('income')}
              className={`flex-1 py-3 text-xs font-bold rounded-lg transition-all ${mode === 'income' ? 'bg-[#0055FF] text-white shadow-lg shadow-[#0055FF]/20' : 'text-white/20 hover:text-white/40'}`}
            >
              Income Tax {currency === 'INR' && '(India)'}
            </button>
          </div>

          <div className="space-y-6">
             <div className="space-y-4">
               <label className="text-[10px] font-bold text-white/20 uppercase tracking-widest">{mode === 'income' ? 'Annual Gross Income' : 'Base Amount'}</label>
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

             {mode === 'indirect' ? (
                <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <div className="flex gap-1 p-1 bg-white/5 rounded-xl border border-white/5 mb-4">
                    <button
                      onClick={() => setInputs({ ...inputs, isAddingTax: true })}
                      className={`flex-1 py-2 text-[10px] font-bold rounded-lg transition-all ${inputs.isAddingTax ? 'bg-white/10 text-white' : 'text-white/20'}`}
                    >
                      ADD TAX
                    </button>
                    <button
                      onClick={() => setInputs({ ...inputs, isAddingTax: false })}
                      className={`flex-1 py-2 text-[10px] font-bold rounded-lg transition-all ${!inputs.isAddingTax ? 'bg-white/10 text-white' : 'text-white/20'}`}
                    >
                      REMOVE TAX
                    </button>
                  </div>
                  <label className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Tax Slab (%)</label>
                  <div className="grid grid-cols-4 gap-2 text-center">
                    {currentSlabs.map(slab => (
                      <button
                        key={slab}
                        onClick={() => setInputs({ ...inputs, taxRate: slab })}
                        className={`py-3 rounded-xl border transition-all text-xs font-bold ${inputs.taxRate === slab ? 'bg-[#0055FF]/20 border-[#0055FF] text-white' : 'bg-white/5 border-white/5 text-white/40'}`}
                      >
                        {slab}%
                      </button>
                    ))}
                  </div>
                </div>
             ) : (
                <div className="p-4 bg-[#0055FF]/10 rounded-2xl border border-[#0055FF]/20 flex items-center gap-4 animate-in fade-in zoom-in-95 duration-300">
                   <Shield className="text-[#0055FF] w-6 h-6" />
                   <p className="text-[10px] text-white/60 leading-relaxed italic">
                      {currency === 'INR' 
                        ? 'Includes Standard Deduction of ₹50,000 for salaried individuals and 4% Health & Education Cess.'
                        : 'Calculates basic income tax tiers based on standard global progressive slab structures.'}
                   </p>
                </div>
             )}
          </div>
        </section>

        <section className="bg-white/[0.02] border border-white/5 rounded-2xl p-8 flex flex-col items-center justify-between min-h-[400px]">
           {isMounted && (
             <div className="w-full flex-1 flex flex-col gap-6">
               <div className="grid grid-cols-1 gap-4">
                 <div className="p-6 bg-white/5 rounded-2xl border border-white/5 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] font-bold text-white/20 uppercase tracking-widest mb-1">Effective {mode === 'income' ? 'New Tax' : 'Tax Amount'}</div>
                      <div className="text-3xl font-bold text-[#0055FF] tracking-tighter">{formatCurrency(results.taxAmount)}</div>
                    </div>
                    {mode === 'income' ? <Wallet className="text-white/5 w-10 h-10" /> : <Globe className="w-10 h-10 text-white/5" />}
                 </div>

                 {mode === 'income' && results.alternativeTax !== undefined && (
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
                      <div className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1">{mode === 'income' ? 'Take-home / Post-Tax' : 'Total Billing Value'}</div>
                      <div className="text-4xl font-bold text-white tracking-tighter">{formatCurrency(results.totalAmount)}</div>
                    </div>
                 </div>
               </div>

               {mode === 'income' && (
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
               )}
             </div>
           )}
        </section>
      </div>

      <SEOSection 
        title={`${mode === 'income' ? 'Income Tax' : labels.tax} Calculator`}
        howTo={[
          `Choose between ${labels.tax} (VAT/GST) or Income Tax mode based on your financial tracking needs.`,
          "Enter your gross income or base transaction amount to begin analysis.",
          "Compare tax regimes if applicable (India specific) to optimize your tax savings and take-home pay.",
          "Instantly export your calculation results into a professional PDF summary for tax filing."
        ]}
        formula={mode === 'income' ? "Tax = Progressive Slab Logic + 4% Cess" : "Total = Amount ± (Amount × Rate%)"}
        benefits={[
          "Global compatibility for VAT/GST across Europe, GCC, and North America.",
          "Direct comparison between Tax Regimes to maximize post-tax income.",
          "User-friendly slab selection grid for high-speed value extraction.",
          "Dynamic visualization of income vs tax vs net liquidity."
        ]}
      />
    </div>
  );
}
