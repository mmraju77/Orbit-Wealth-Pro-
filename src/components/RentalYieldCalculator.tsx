/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Home, Download, Percent, Briefcase } from 'lucide-react';
import { useLocale } from '../context/LocaleContext';
import jsPDF from 'jspdf';
import SEOSection from './SEOSection';
import AIAdvisor from './AIAdvisor';

export default function RentalYieldCalculator() {
  const { formatCurrency } = useLocale();
  const [propertyValue, setPropertyValue] = useState(5000000);
  const [monthlyRent, setMonthlyRent] = useState(25000);
  const [maintenance, setMaintenance] = useState(2000); // Monthly maintenance
  const [propertyTax, setPropertyTax] = useState(15000); // Annual

  const results = useMemo(() => {
    const annualGrossRent = monthlyRent * 12;
    const annualMaintenance = maintenance * 12;
    const netAnnualIncome = annualGrossRent - annualMaintenance - propertyTax;
    
    const grossYield = (annualGrossRent / propertyValue) * 100;
    const netYield = (netAnnualIncome / propertyValue) * 100;

    return {
      grossYield: Number(grossYield.toFixed(2)),
      netYield: Number(netYield.toFixed(2)),
      netIncome: Math.round(netAnnualIncome)
    };
  }, [propertyValue, monthlyRent, maintenance, propertyTax]);

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(22);
    doc.text('Real Estate Rental Yield Analysis', 20, 20);
    doc.setFontSize(12);
    doc.text(`Property Purchase Value: ${formatCurrency(propertyValue)}`, 20, 40);
    doc.text(`Monthly Rent: ${formatCurrency(monthlyRent)}`, 20, 50);
    doc.text(`Total Annual Expenses: ${formatCurrency(maintenance * 12 + propertyTax)}`, 20, 60);
    doc.text(`Gross Rental Yield: ${results.grossYield}%`, 20, 80);
    doc.text(`Net Rental Yield: ${results.netYield}%`, 20, 90);
    doc.text(`Net Annual Operating Income: ${formatCurrency(results.netIncome)}`, 20, 110);
    doc.save('rental-yield-report.pdf');
  };

  return (
    <div className="space-y-12 pb-20 text-white">
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 pt-8">
        <header className="space-y-4">
          <div className="flex items-center gap-2 mb-2">
             <div className="h-px w-6 bg-[#D4AF37]"></div>
             <span className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-[0.3em]">Capital Yield Logistics</span>
          </div>
          <h1 className="text-5xl font-display font-medium text-white tracking-tight">Property ROI.</h1>
          <p className="text-white/40 max-w-xl text-sm font-light leading-relaxed">
            Evaluate the profitability of your real estate portfolio with precise operating income analysis.
          </p>
        </header>
        <button onClick={downloadPDF} className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/5 rounded-lg text-xs font-bold transition-all">
          <Download className="w-4 h-4" /> Download Report
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <section className="bg-white/[0.02] border border-white/5 rounded-2xl p-8 space-y-8">
           <div className="space-y-6">
              <div className="space-y-2">
                 <label className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Property Purchase Price</label>
                 <input 
                   type="number" value={propertyValue}
                   onChange={(e) => setPropertyValue(Number(e.target.value))}
                   className="w-full bg-black/40 p-4 rounded-xl border border-white/5 text-white font-bold outline-none text-xl"
                 />
              </div>
              <div className="grid grid-cols-2 gap-8">
                 <div className="space-y-2">
                    <label className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Expected Monthly Rent</label>
                    <input 
                      type="number" value={monthlyRent}
                      onChange={(e) => setMonthlyRent(Number(e.target.value))}
                      className="w-full bg-black/40 p-3 rounded-xl border border-white/5 text-white font-bold outline-none"
                    />
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Monthly Maintenance</label>
                    <input 
                      type="number" value={maintenance}
                      onChange={(e) => setMaintenance(Number(e.target.value))}
                      className="w-full bg-black/40 p-3 rounded-xl border border-white/5 text-white font-bold outline-none"
                    />
                 </div>
              </div>
              <div className="space-y-2">
                 <label className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Annual Property Tax</label>
                 <input 
                   type="number" value={propertyTax}
                   onChange={(e) => setPropertyTax(Number(e.target.value))}
                   className="w-full bg-black/40 p-4 rounded-xl border border-white/5 text-white font-bold outline-none"
                 />
              </div>
           </div>
        </section>

        <section className="bg-white/[0.02] border border-white/5 rounded-2xl p-8 flex flex-col justify-between">
           <div className="space-y-8">
              <div className="grid grid-cols-2 gap-4">
                 <div className="p-6 bg-white/5 rounded-2xl border border-white/5 text-center">
                    <div className="text-[10px] text-white/20 font-bold uppercase tracking-widest mb-1">Gross Yield</div>
                    <div className="text-3xl font-bold text-white/60">{results.grossYield}%</div>
                 </div>
                 <div className="p-6 bg-[#D4AF37]/10 rounded-2xl border border-[#D4AF37]/20 text-center">
                    <div className="text-[10px] text-[#D4AF37] font-bold uppercase tracking-widest mb-1">Net Rental Yield</div>
                    <div className="text-4xl font-bold text-[#D4AF37]">{results.netYield}%</div>
                 </div>
              </div>

              <div className="p-6 bg-emerald-500/10 rounded-2xl border border-emerald-500/20 text-center">
                 <div className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest mb-2">Net Annual Operating Income</div>
                 <div className="text-4xl font-bold text-white">{formatCurrency(results.netIncome)}</div>
                 <div className="mt-2 text-xs text-white/40">Income after taxes and maintenance</div>
              </div>
           </div>

           <AIAdvisor context={`Property valued at ${propertyValue} with ${monthlyRent} rent. Gross yield is ${results.grossYield}%, but net yield is ${results.netYield}% after expenses.`} />
        </section>
      </div>

      <SEOSection 
        title="Rental Yield & Property ROI Calculator"
        howTo={[
          "Enter total purchase price including closing costs.",
          "Estimated monthly rent based on current market data.",
          "Factor in regular monthly maintenance and society charges.",
          "Add annual costs like property tax to see the actual 'Net' take-home return."
        ]}
        formula="Net Yield = [(Annual Rent - Expenses) / Property Value] * 100"
        benefits={[
          "Compare buy-to-let investments vs financial assets.",
          "Understand the impact of 'Operating Leakage' (Maintenance/Tax).",
          "Essential for commercial and residential property management.",
          "Decide whether to buy or keep renting based on yield metrics."
        ]}
      />
    </div>
  );
}
