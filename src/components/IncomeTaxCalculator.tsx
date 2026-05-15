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
import { useParams } from 'react-router-dom';
import SEOSection from './SEOSection';
import { REGIONAL_TAX_RULES } from '../data/taxRules';
import { normalizeRegionKey } from '../data/pSEOData';

export default function IncomeTaxCalculator() {
  const { region } = useParams<{ region: string }>();
  const { formatCurrency, labels, currency, formatValue } = useLocale();
  const [inputs, setInputs] = useState({
    amount: 1000000,
  });
  const [isMounted, setIsMounted] = useState(false);

  const countryKey = useMemo(() => {
    if (region) return normalizeRegionKey(region);
    // Fallback based on currency if no region in URL
    const map: Record<string, string> = {
      INR: 'india', USD: 'usa', GBP: 'uk', CAD: 'canada', AUD: 'australia',
      EUR: 'germany', // Default EUR to Germany for tax logic
      CHF: 'switzerland', NOK: 'norway', SEK: 'sweden', DKK: 'denmark'
    };
    return map[currency] || 'usa';
  }, [region, currency]);

  const taxRules = REGIONAL_TAX_RULES[countryKey] || REGIONAL_TAX_RULES['usa'];

  const calculateTax = (income: number) => {
    const taxableIncome = Math.max(0, income - taxRules.standardDeduction);
    let totalTax = 0;
    let prevLimit = 0;

    for (const bracket of taxRules.brackets) {
      if (taxableIncome <= prevLimit) break;

      const currentLimit = bracket.limit === null ? taxableIncome : bracket.limit;
      const taxableInThisBracket = Math.min(taxableIncome, currentLimit) - prevLimit;

      if (taxableInThisBracket > 0) {
        totalTax += taxableInThisBracket * bracket.rate;
      }

      if (bracket.limit === null) break;
      prevLimit = bracket.limit;
    }

    if (taxRules.additionalTaxes) {
      taxRules.additionalTaxes.forEach(tax => {
        if (tax.type === 'tax_percent') {
          totalTax += totalTax * tax.rate;
        } else if (tax.type === 'income_percent') {
          totalTax += income * tax.rate;
        }
      });
    }

    return totalTax;
  };

  const results = useMemo(() => {
    const tax = calculateTax(inputs.amount);
    return { 
      taxAmount: tax,
      totalAmount: inputs.amount - tax,
      originalAmount: inputs.amount
    };
  }, [inputs, countryKey]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(22);
    doc.text(`Orbit Wealth Pro: Income Tax Analysis (${taxRules.currency})`, 20, 20);
    doc.setFontSize(12);
    doc.text(`Annual Gross Income: ${formatCurrency(inputs.amount)}`, 20, 40);
    doc.text(`Effective Tax: ${formatCurrency(results.taxAmount)}`, 20, 50);
    doc.text(`Take-home Pay: ${formatCurrency(results.totalAmount)}`, 20, 60);
    doc.text(`Jurisdiction: ${countryKey.toUpperCase()}`, 20, 70);
    doc.save(`income-tax-analysis-${countryKey}.pdf`);
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
            Personalized income tax analysis for {countryKey.toUpperCase()} using the latest progressive fiscal logic.
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
                   Adjusted for {countryKey.toUpperCase()} standard deductions and progressive tax slabs. 
                   {taxRules.additionalTaxes?.map(tax => ` Includes ${tax.name} at ${(tax.rate * 100).toFixed(1)}%.`).join(' ')}
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
          `Our tool automatically applies the latest ${countryKey.toUpperCase()} tax brackets and standard deductions.`,
          "Review the effective tax liability and see the impact on your monthly take-home pay.",
          "Export your detailed tax breakdown into a professional PDF summary."
        ]}
        formula="Tax = Progressive Bracket Logic + Deductions"
        benefits={[
          "Global coverage with region-specific logic for dozens of jurisdictions.",
          "Dynamic visualization of income vs tax using bar charts.",
          "Instant calculation of net pay after all statutory deductions.",
          "User-friendly interface optimized for high-speed financial computation."
        ]}
      />
    </div>
  );
}
