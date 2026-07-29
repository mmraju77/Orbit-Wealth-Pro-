import { CalculatorSEO } from "./CalculatorSEO";
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import Breadcrumbs from './Breadcrumbs';
import RelatedTools from './RelatedTools';
import {  TrendingUp, Download, Info , Share2 } from 'lucide-react';
import { useLocale } from '../context/LocaleContext';
import jsPDF from 'jspdf';
import SEOSection from './SEOSection';
import AIAdvisor from './AIAdvisor';
import CurrencyInput from './CurrencyInput';
import NumericInput from './NumericInput';

export default function CAGRCalculator() {

  
  const relatedTools = [
    {
      "title": "SIP Calculator",
      "path": "/calculators/investing/sip",
      "description": "Plan regular mutual fund investments."
    },
    {
      "title": "Mutual Fund",
      "path": "/calculators/investing/mutual-fund",
      "description": "Analyze specific mutual fund returns."
    },
    {
      "title": "Lumpsum Calculator",
      "path": "/calculators/investing/lumpsum",
      "description": "Estimate returns on one-time investments."
    }
  ];
const breadcrumbItems = [
    { label: 'Investing' },
    { label: 'CAGR Calculator' }
  ];

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

  return (
    <div className="space-y-12 pb-20 text-white">
      <Breadcrumbs items={breadcrumbItems} />
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 pt-8">
        <header className="space-y-4">
          <div className="flex items-center gap-2 mb-2">
             <div className="h-px w-6 bg-[#D4AF37]"></div>
             <span className="text-base font-bold text-[#D4AF37] uppercase tracking-[0.3em]">Annualized Performance</span>
          </div>
          <h1 className="text-7xl font-display font-medium text-[#f59e0b] tracking-tight">Compound Annual Growth.</h1>
          <p className="text-white/70 max-w-xl text-lg font-light leading-relaxed">
            Determine the geomtric progression of your assets using institutional growth modeling.
          </p>
        </header>
        <button onClick={downloadPDF} className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/5 rounded-lg text-base font-bold transition-all">
          <Download className="w-4 h-4" /> Download PDF
        </button>
        <button onClick={handleShare} className="flex items-center gap-2 px-4 py-2 bg-[#D4AF37] hover:bg-[#D4AF37]/90 rounded-lg text-base text-black font-bold transition-all shadow-lg shadow-[#D4AF37]/20">
          <Share2 className="w-4 h-4" /> Share
        </button>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <section className="bg-white/[0.02] border border-white/5 rounded-2xl p-8 space-y-8">
          <div className="space-y-6">
            <CurrencyInput 
              label="Initial Investment"
              value={initialValue}
              onChange={setInitialValue}
              min={1000}
              max={10000000}
              step={1000}
            />
            <CurrencyInput 
              label="Final Value"
              value={finalValue}
              onChange={setFinalValue}
              min={1000}
              max={25000000}
              step={1000}
            />
            <div className="space-y-4">
               <div className="flex justify-between items-center">
                  <label className="text-base font-bold text-white/70 uppercase tracking-widest">Duration (Years)</label>
                  <span className="text-[#D4AF37] font-bold">{duration} Yrs</span>
               </div>
               <NumericInput 
                 min={1} max={50} 
                 value={duration} 
                 onChange={setDuration} 
                 className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-3 text-white font-bold outline-none" 
               />
               <input 
                 aria-label="Adjust value" type="range" min="1" max="50"
                 value={duration}
                 onChange={(e) => setDuration(Number(e.target.value))}
                 className="w-full accent-[#D4AF37]"
               />
            </div>
          </div>
        </section>

        <section className="bg-white/[0.02] border border-white/5 rounded-2xl p-8 flex flex-col justify-center items-center text-center">
           <div className="space-y-2">
              <div className="text-base text-white/70 font-bold uppercase tracking-widest mb-1">Compound Annual Growth Rate</div>
              <div className="text-xl md:text-2xl font-bold text-white tracking-tighter">{cagr}%</div>
              <div className="pt-4 flex items-center justify-center gap-2 text-[#D4AF37]">
                 <TrendingUp className="w-4 h-4" />
                 <span className="text-lg font-medium">Growth analysis complete</span>
              </div>
           </div>
           
           <AIAdvisor context={`User's investment grew from ${initialValue} to ${finalValue} over ${duration} years, resulting in a CAGR of ${cagr}%.`} />
        </section>
      </div>
      <RelatedTools tools={relatedTools} />
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

      <CalculatorSEO
        id="CAGRCalculator"
        title="C A G R  Calculator"
        description="Calculate your c a g r  easily and accurately with Orbit Wealth Pro."
        faqs={[{
          question: "What is the C A G R  Calculator?",
          answer: "The C A G R  Calculator is a financial tool designed to help you calculate and estimate your figures accurately."
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
