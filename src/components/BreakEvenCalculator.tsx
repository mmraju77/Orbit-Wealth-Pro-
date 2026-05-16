/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Target, Download, TrendingUp, DollarSign, PieChart } from 'lucide-react';
import { useLocale } from '../context/LocaleContext';
import jsPDF from 'jspdf';
import SEOSection from './SEOSection';
import AIAdvisor from './AIAdvisor';

export default function BreakEvenCalculator() {
  const { formatCurrency } = useLocale();
  const [fixedCosts, setFixedCosts] = useState(100000);
  const [variableCostPerUnit, setVariableCostPerUnit] = useState(50);
  const [sellingPricePerUnit, setSellingPricePerUnit] = useState(150);

  const results = useMemo(() => {
    const contributionMargin = sellingPricePerUnit - variableCostPerUnit;
    if (contributionMargin <= 0) return { units: 0, revenue: 0 };
    
    const units = fixedCosts / contributionMargin;
    const revenue = units * sellingPricePerUnit;
    
    return {
      units: Math.ceil(units),
      revenue: Math.round(revenue)
    };
  }, [fixedCosts, variableCostPerUnit, sellingPricePerUnit]);

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(22);
    doc.text('Break-Even Point Analysis', 20, 20);
    doc.setFontSize(12);
    doc.text(`Total Fixed Costs: ${formatCurrency(fixedCosts)}`, 20, 40);
    doc.text(`Variable Cost per Unit: ${formatCurrency(variableCostPerUnit)}`, 20, 50);
    doc.text(`Selling Price per Unit: ${formatCurrency(sellingPricePerUnit)}`, 20, 60);
    doc.text(`Break-Even Units: ${results.units}`, 20, 80);
    doc.text(`Break-Even Revenue: ${formatCurrency(results.revenue)}`, 20, 90);
    doc.save('break-even-report.pdf');
  };

  return (
    <div className="space-y-12 pb-20 text-white">
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 pt-8">
        <header className="space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="h-px w-6 bg-[#D4AF37]"></div>
            <span className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-[0.3em]">Business Intelligence</span>
          </div>
          <h1 className="text-5xl font-display font-medium text-white tracking-tight">Break-Even Analysis.</h1>
          <p className="text-white/40 max-w-xl text-sm font-light leading-relaxed">
            Determine the point at which your total revenue equals total costs for a new product or service.
          </p>
        </header>
        <button onClick={downloadPDF} className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/5 rounded-xl text-xs font-bold transition-all hover:bg-white/10 shrink-0">
          <Download className="w-4 h-4" /> Export Analysis
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
        <section className="space-y-10 bg-white/[0.01] border border-white/[0.03] p-10 rounded-[2.5rem]">
           <div className="space-y-8">
              <div className="space-y-2">
                 <label className="text-[9px] font-bold text-white/20 uppercase tracking-widest">Total Fixed Costs (Monthly/Annual)</label>
                 <input type="number" value={fixedCosts} onChange={e => setFixedCosts(Number(e.target.value))} className="w-full bg-black/40 p-4 rounded-xl border border-white/5 text-white font-bold outline-none text-xl" />
                 <p className="text-[10px] text-white/20 px-2 italic">Rent, Salaries, Software, Utilities...</p>
              </div>
              <div className="grid grid-cols-2 gap-8">
                 <div className="space-y-2">
                    <label className="text-[9px] font-bold text-white/20 uppercase tracking-widest">Variable Cost / Unit</label>
                    <input type="number" value={variableCostPerUnit} onChange={e => setVariableCostPerUnit(Number(e.target.value))} className="w-full bg-black/40 p-4 rounded-xl border border-white/5 text-white font-bold outline-none" />
                 </div>
                 <div className="space-y-2">
                    <label className="text-[9px] font-bold text-white/20 uppercase tracking-widest">Selling Price / Unit</label>
                    <input type="number" value={sellingPricePerUnit} onChange={e => setSellingPricePerUnit(Number(e.target.value))} className="w-full bg-black/40 p-4 rounded-xl border border-white/5 text-white font-bold outline-none" />
                 </div>
              </div>
           </div>
        </section>

        <section className="flex flex-col gap-8">
           <div className="grid grid-cols-2 gap-6">
              <div className="p-10 bg-white/[0.01] border border-white/[0.03] rounded-[2.5rem] text-center space-y-2">
                 <div className="text-[10px] text-white/20 font-bold uppercase tracking-[0.3em]">Units to Neutral</div>
                 <div className="text-5xl font-display font-medium text-white">{results.units}</div>
              </div>
              <div className="p-10 bg-[#D4AF37]/5 border border-[#D4AF37]/10 rounded-[2.5rem] text-center space-y-2">
                 <div className="text-[10px] text-[#D4AF37] font-bold uppercase tracking-[0.3em]">Revenue to Neutral</div>
                 <div className="text-5xl font-display font-medium text-[#D4AF37] tracking-tighter">{formatCurrency(results.revenue)}</div>
              </div>
           </div>

           <div className="p-8 bg-white/[0.01] border border-white/5 rounded-[2rem] flex items-center gap-6">
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0">
                 <DollarSign className="w-6 h-6 text-emerald-500" />
              </div>
              <div className="space-y-1">
                 <div className="text-[9px] text-white/20 font-bold uppercase tracking-widest">Contribution Margin</div>
                 <div className="text-xl font-bold uppercase font-display">{formatCurrency(sellingPricePerUnit - variableCostPerUnit)} <span className="text-white/20 text-xs text-normal">/ unit</span></div>
              </div>
           </div>

           <AIAdvisor context={`Fixed costs of ${fixedCosts}. Selling units for ${sellingPricePerUnit} with a variable cost of ${variableCostPerUnit}. Break-even is ${results.units} units.`} />
        </section>
      </div>

      <SEOSection 
        title="Business Break-Even Point Calculator"
        howTo={[
          "Identify your Fixed Costs (Expenses that don't change with production volume).",
          "Calculate your Variable Cost per Unit (Material, Direct Labor, Shipping).",
          "Set your target Selling Price per Unit.",
          "The calculator determines how many units you must sell to cover all costs before profit begins."
        ]}
        formula="Break-Even Units = Fixed Costs / (Selling Price - Variable Cost)"
        benefits={[
          "Assess the viability of a new business model.",
          "Optimize pricing strategies based on volume goals.",
          "Identify when a product becomes profitable.",
          "Crucial for startup pitch decks and internal budgeting."
        ]}
      />
    </div>
  );
}
