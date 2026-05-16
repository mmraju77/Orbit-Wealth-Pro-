/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from 'react';
import { Percent, Download, Share2, Globe, Shield, Wallet } from 'lucide-react';
import { useLocale } from '../context/LocaleContext';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import jsPDF from 'jspdf';
import { useParams } from 'react-router-dom';
import SEOSection from './SEOSection';
import { normalizeRegionKey } from '../data/pSEOData';

const REGIONAL_TAX_SLABS: Record<string, number[]> = {
  india: [5, 12, 18, 28],
  usa: [0, 4, 6, 8], // Sales tax varies by state
  uae: [5],
  uk: [5, 20],
  canada: [5, 13, 15],
  australia: [10],
  germany: [7, 19],
  netherlands: [9, 21],
  switzerland: [2.6, 8.1],
  norway: [12, 15, 25],
  sweden: [6, 12, 25],
  denmark: [25],
};

export default function GSTCalculator() {
  const { region } = useParams<{ region: string }>();
  const { formatCurrency, labels, currency } = useLocale();

  const countryKey = useMemo(() => {
    if (region) return normalizeRegionKey(region);
    const map: Record<string, string> = {
      INR: 'india', USD: 'usa', GBP: 'uk', CAD: 'canada', AUD: 'australia',
      EUR: 'germany', CHF: 'switzerland', NOK: 'norway', SEK: 'sweden', DKK: 'denmark'
    };
    return map[currency] || 'usa';
  }, [region, currency]);

  const slabs = REGIONAL_TAX_SLABS[countryKey] || [5, 12, 18, 28];

  const [inputs, setInputs] = useState({
    amount: 100000,
    taxRate: slabs[0],
    isAddingTax: true,
  });

  useEffect(() => {
    setInputs(prev => ({ ...prev, taxRate: slabs[0] }));
  }, [countryKey]);

  const [isMounted, setIsMounted] = useState(false);

  const results = useMemo(() => {
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
  }, [inputs]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(22);
    doc.text(`ORBIT WEALTH PRO: GST / VAT Analysis`, 20, 20);
    doc.setFontSize(12);
    doc.text(`Base Amount: ${formatCurrency(inputs.amount)}`, 20, 40);
    doc.text(`Tax Rate: ${inputs.taxRate}%`, 20, 50);
    doc.text(`Tax Amount: ${formatCurrency(results.taxAmount)}`, 20, 60);
    doc.text(`Total Value: ${formatCurrency(results.totalAmount)}`, 20, 70);
    doc.save('gst-analysis.pdf');
  };

  return (
    <div className="space-y-8 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <header className="space-y-2">
          <div className="flex items-center gap-2 mb-4">
             <Percent className="text-[#D4AF37] w-6 h-6" />
             <h1 className="text-3xl font-bold tracking-tighter text-white">GST / VAT Calculator</h1>
          </div>
          <p className="text-white/40 max-w-xl text-sm leading-relaxed">
            Calculate Goods and Services Tax (GST) or Value Added Tax (VAT) for your business transactions.
          </p>
        </header>

        <div className="flex items-center gap-2">
          <button onClick={downloadPDF} className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/5 rounded-lg text-xs font-bold transition-all">
            <Download className="w-4 h-4" /> PDF Report
          </button>
          <button className="flex items-center gap-3 px-4 py-2 bg-[#D4AF37] hover:bg-[#D4AF37]/90 rounded-lg text-xs font-bold transition-all shadow-lg shadow-[#D4AF37]/20">
            <Share2 className="w-4 h-4" /> Share
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <section className="bg-white/[0.02] border border-white/5 rounded-2xl p-8 space-y-8">
          <div className="flex gap-1 p-1 bg-white/5 rounded-xl border border-white/5">
            <button
              onClick={() => setInputs({ ...inputs, isAddingTax: true })}
              className={`flex-1 py-3 text-xs font-bold rounded-lg transition-all ${inputs.isAddingTax ? 'bg-[#D4AF37] text-white shadow-lg shadow-[#D4AF37]/20' : 'text-white/20 hover:text-white/40'}`}
            >
              Add GST
            </button>
            <button
              onClick={() => setInputs({ ...inputs, isAddingTax: false })}
              className={`flex-1 py-3 text-xs font-bold rounded-lg transition-all ${!inputs.isAddingTax ? 'bg-[#D4AF37] text-white shadow-lg shadow-[#D4AF37]/20' : 'text-white/20 hover:text-white/40'}`}
            >
              Remove GST
            </button>
          </div>

          <div className="space-y-6">
             <div className="space-y-4">
               <label className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Amount</label>
               <div className="relative">
                 <input 
                   type="number"
                   value={inputs.amount}
                   onChange={(e) => setInputs({ ...inputs, amount: Number(e.target.value) })}
                   className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-[#D4AF37] transition-all font-bold"
                 />
                 <div className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 font-bold">{currency}</div>
               </div>
             </div>

             <div className="space-y-4">
                <label className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Tax Slab (%)</label>
                <div className="grid grid-cols-4 gap-2 text-center">
                  {slabs.map(slab => (
                    <button
                      key={slab}
                      onClick={() => setInputs({ ...inputs, taxRate: slab })}
                      className={`py-3 rounded-xl border transition-all text-xs font-bold ${inputs.taxRate === slab ? 'bg-[#D4AF37]/20 border-[#D4AF37] text-white' : 'bg-white/5 border-white/5 text-white/40'}`}
                    >
                      {slab}%
                    </button>
                  ))}
                  <div className="col-span-4 mt-2">
                     <input 
                       type="number"
                       placeholder="Custom Rate %"
                       value={inputs.taxRate}
                       onChange={(e) => setInputs({ ...inputs, taxRate: Number(e.target.value) })}
                       className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                     />
                  </div>
                </div>
             </div>
          </div>
        </section>

        <section className="bg-white/[0.02] border border-white/5 rounded-2xl p-8 flex flex-col items-center justify-center min-h-[400px]">
           {isMounted && (
             <div className="w-full space-y-6">
                <div className="p-6 bg-white/5 rounded-2xl border border-white/5 flex items-center justify-between">
                   <div>
                     <div className="text-[10px] font-bold text-white/20 uppercase tracking-widest mb-1">Tax Amount</div>
                     <div className="text-3xl font-bold text-[#D4AF37] tracking-tighter">{formatCurrency(results.taxAmount)}</div>
                   </div>
                   <Percent className="text-white/5 w-10 h-10" />
                </div>

                <div className="p-6 bg-white/[0.02] rounded-2xl border border-white/5 flex items-center justify-between">
                   <div>
                     <div className="text-[10px] font-bold text-white/20 uppercase tracking-widest mb-1">{inputs.isAddingTax ? 'Net Price (Before Tax)' : 'Base Price'}</div>
                     <div className="text-xl font-bold text-white/60 tracking-tighter">{formatCurrency(results.originalAmount)}</div>
                   </div>
                </div>

                <div className="p-8 bg-[#D4AF37]/10 rounded-2xl border border-[#D4AF37]/20 shadow-xl shadow-[#D4AF37]/5">
                   <div className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-widest mb-1">{inputs.isAddingTax ? 'Total Billing Value' : 'Net Price'}</div>
                   <div className="text-4xl font-bold tracking-tighter text-white">{formatCurrency(results.totalAmount)}</div>
                </div>
             </div>
           )}
        </section>
      </div>

      <SEOSection 
        title="GST / VAT Calculator"
        howTo={[
          "Enter the base amount of the product or service you are calculating for.",
          "Select the applicable GST or VAT slab from the pre-defined options or enter a custom rate.",
          "Toggle between 'Add Tax' for calculating total billing value and 'Remove Tax' for finding internal base price.",
          "Instantly view the distributed tax amount and total invoice value."
        ]}
        formula="Total = Amount ± (Amount × Rate%)"
        benefits={[
          "Calculate business compliance taxes instantly with 100% accuracy.",
          "Supports both inclusive and exclusive tax calculation modes.",
          "Professional PDF export for business reporting and accounting.",
          "Optimized for global VAT and regional GST standards."
        ]}
      />
    </div>
  );
}
