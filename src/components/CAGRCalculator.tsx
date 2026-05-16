/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { TrendingUp, Download, Info } from 'lucide-react';
import { useLocale } from '../context/LocaleContext';
import jsPDF from 'jspdf';
import SEOSection from './SEOSection';
import AIAdvisor from './AIAdvisor';

export default function CAGRCalculator() {
  const { formatCurrency } = useLocale();
  const [initialValue, setInitialValue] = useState(100000);
  const [finalValue, setFinalValue] = useState(250000);
  const [duration, setDuration] = useState(5); // Years

  const cagr = useMemo(() => {
    if (initialValue <= 0 || duration <= 0) return 0;
    const rate = (Math.pow(finalValue / initialValue, 1 / duration) - 1) * 100;
    return Number(rate.toFixed(2));
  }, [initialValue, finalValue, duration]);

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(22);
    doc.text('CAGR Analysis Report', 20, 20);
    doc.setFontSize(12);
    doc.text(`Initial Value: ${formatCurrency(initialValue)}`, 20, 40);
    doc.text(`Final Value: ${formatCurrency(finalValue)}`, 20, 50);
    doc.text(`Duration: ${duration} Years`, 20, 60);
    doc.text(`CAGR: ${cagr}%`, 20, 80);
    doc.save('cagr-report.pdf');
  };

  return (
    <div className="space-y-12 pb-20 text-white">
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 pt-8">
        <header className="space-y-4">
          <div className="flex items-center gap-2 mb-2">
             <div className="h-px w-6 bg-[#D4AF37]"></div>
             <span className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-[0.3em]">Annualized Performance</span>
          </div>
          <h1 className="text-5xl font-display font-medium text-white tracking-tight">Compound Annual Growth.</h1>
          <p className="text-white/40 max-w-xl text-sm font-light leading-relaxed">
            Determine the geomtric progression of your assets using institutional growth modeling.
          </p>
        </header>
        <button onClick={downloadPDF} className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/5 rounded-lg text-xs font-bold transition-all">
          <Download className="w-4 h-4" /> Download PDF
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <section className="bg-white/[0.02] border border-white/5 rounded-2xl p-8 space-y-8">
          <div className="space-y-6">
            <div className="space-y-2">
               <label className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Initial Investment</label>
               <input 
                 type="number" value={initialValue}
                 onChange={(e) => setInitialValue(Number(e.target.value))}
                 className="w-full bg-black/40 p-4 rounded-xl border border-white/5 text-white font-bold outline-none text-xl"
               />
            </div>
            <div className="space-y-2">
               <label className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Final Value</label>
               <input 
                 type="number" value={finalValue}
                 onChange={(e) => setFinalValue(Number(e.target.value))}
                 className="w-full bg-black/40 p-4 rounded-xl border border-white/5 text-white font-bold outline-none text-xl"
               />
            </div>
            <div className="space-y-4">
               <div className="flex justify-between items-center">
                  <label className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Duration (Years)</label>
                  <span className="text-[#D4AF37] font-bold">{duration} Yrs</span>
               </div>
               <input 
                 type="range" min="1" max="50"
                 value={duration}
                 onChange={(e) => setDuration(Number(e.target.value))}
                 className="w-full accent-[#D4AF37]"
               />
            </div>
          </div>
        </section>

        <section className="bg-white/[0.02] border border-white/5 rounded-2xl p-8 flex flex-col justify-center items-center text-center">
           <div className="space-y-2">
              <div className="text-[10px] text-white/20 font-bold uppercase tracking-widest mb-1">Compound Annual Growth Rate</div>
              <div className="text-7xl font-bold text-white tracking-tighter">{cagr}%</div>
              <div className="pt-4 flex items-center justify-center gap-2 text-[#D4AF37]">
                 <TrendingUp className="w-4 h-4" />
                 <span className="text-sm font-medium">Growth analysis complete</span>
              </div>
           </div>
           
           <AIAdvisor context={`User's investment grew from ${initialValue} to ${finalValue} over ${duration} years, resulting in a CAGR of ${cagr}%.`} />
        </section>
      </div>

      <SEOSection 
        title="CAGR Calculator - Compound Annual Growth Rate"
        howTo={[
          "Enter your initial purchase price or investment value.",
          "Enter the current market value or final sale price.",
          "Specify the number of years the investment was held.",
          "The calculator instantly provides the geometric progress rate."
        ]}
        formula="CAGR = [(Final Value / Initial Value)^(1 / Years)] - 1"
        benefits={[
          "Analyze stock market portfolio performance.",
          "Compare different investment assets (Real Estate vs Equity).",
          "Understand the 'smoothed' growth of volatile assets.",
          "Essential for business revenue growth tracking."
        ]}
      />
    </div>
  );
}
