import { CalculatorSEO } from '../ui/CalculatorSEO';
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Link } from 'react-router-dom';
import React, { useState, useMemo, useEffect } from 'react';
import Breadcrumbs from '../ui/Breadcrumbs';
import RelatedTools from '../ui/RelatedTools';
import {  Target, Download, TrendingUp, DollarSign, PieChart , Share2 } from 'lucide-react';
import { useLocale } from '../../context/LocaleContext';
import jsPDF from 'jspdf';
import SEOSection from '../ui/SEOSection';
import AIAdvisor from '../ui/AIAdvisor';
import CurrencyInput from '../ui/CurrencyInput';

export default function BreakEvenCalculator() {

  
  const relatedTools = [
    {
      "title": "GST Calculator",
      "path": "/calculators/tax/gst",
      "description": "Include tax implications in your costs."
    },
    {
      "title": "Income Tax",
      "path": "/calculators/tax/income-tax",
      "description": "Estimate post-tax profitability."
    },
    {
      "title": "Personal Loan",
      "path": "/calculators/loans/personal-loan",
      "description": "Plan funding for your business."
    }
  ];
const breadcrumbItems = [
    { label: 'Business' },
    { label: 'Break Even' }
  ];

  const { formatCurrency } = useLocale();
  const [fixedCosts, setFixedCosts] = useState(100000);
  const [variableCostPerUnit, setVariableCostPerUnit] = useState(50);
  const [sellingPricePerUnit, setSellingPricePerUnit] = useState(150);

  const [results, setResults] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      const contributionMargin = sellingPricePerUnit - variableCostPerUnit;
      if (contributionMargin <= 0)
        setResults({ units: 0, revenue: 0 });

      const units = fixedCosts / contributionMargin;
      const revenue = units * sellingPricePerUnit;

      setResults({
        units: Math.ceil(units),
        revenue: Math.round(revenue)
      });
    }, 0);

    return () => clearTimeout(timer);
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

  if (!results) return (
    <div
      className="animate-pulse h-96 bg-white/5 rounded-3xl w-full max-w-7xl mx-auto mt-8" />
  );

  return (
    <div className="space-y-12 pb-20 text-white">
      <Breadcrumbs items={breadcrumbItems} />
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 pt-8">
        <header className="space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="h-px w-6 bg-[#D4AF37]"></div>
            <span className="text-base font-bold text-[#D4AF37] uppercase tracking-[0.3em]">Business Intelligence</span>
          </div>
          <h1 className="text-7xl font-display font-medium text-[#f59e0b] tracking-tight">Break-Even Analysis.</h1>
          <p className="text-white/70 max-w-xl text-lg font-light leading-relaxed">
            Determine the point at which your total revenue equals total costs for a new product or service.
          </p>
        </header>
        <button onClick={downloadPDF} className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/5 rounded-xl text-base font-bold transition-all hover:bg-white/10 shrink-0">
          <Download className="w-4 h-4" /> Export Analysis
        </button>
        <button onClick={handleShare} className="flex items-center gap-2 px-4 py-2 bg-[#D4AF37] hover:bg-[#D4AF37]/90 rounded-lg text-base text-black font-bold transition-all shadow-lg shadow-[#D4AF37]/20">
          <Share2 className="w-4 h-4" /> Share
        </button>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
        <section className="space-y-10 bg-white/[0.01] border border-white/[0.03] p-10 rounded-[2.5rem]">
           <div className="space-y-8">
              <CurrencyInput 
                label="Total Fixed Costs (Monthly/Annual)"
                value={fixedCosts}
                onChange={setFixedCosts}
                min={1000}
                max={10000000}
                step={1000}
                description="Rent, Salaries, Software, Utilities..."
              />
              <div className="grid grid-cols-2 gap-8">
                 <CurrencyInput 
                   label="Variable Cost / Unit"
                   value={variableCostPerUnit}
                   onChange={setVariableCostPerUnit}
                   min={0}
                   max={100000}
                   step={1}
                 />
                 <CurrencyInput 
                   label="Selling Price / Unit"
                   value={sellingPricePerUnit}
                   onChange={setSellingPricePerUnit}
                   min={1}
                   max={200000}
                   step={1}
                 />
              </div>
           </div>
        </section>

        <section className="flex flex-col gap-8">
           <div className="grid grid-cols-2 gap-6">
              <div className="p-10 bg-white/[0.01] border border-white/[0.03] rounded-[2.5rem] text-center space-y-2">
                 <div className="text-base text-white/70 font-bold uppercase tracking-[0.3em]">Units to Neutral</div>
                 <div className="text-xl md:text-2xl font-display font-bold text-white">{results.units}</div>
              </div>
              <div className="p-10 bg-[#D4AF37]/5 border border-[#D4AF37]/10 rounded-[2.5rem] text-center space-y-2">
                 <div className="text-base text-[#D4AF37] font-bold uppercase tracking-[0.3em]">Revenue to Neutral</div>
                 <div className="text-xl md:text-2xl font-display font-bold text-[#D4AF37] tracking-tighter">{formatCurrency(results.revenue)}</div>
              </div>
           </div>

           <div className="p-8 bg-white/[0.01] border border-white/5 rounded-[2rem] flex items-center gap-6">
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0">
                 <DollarSign className="w-6 h-6 text-emerald-500" />
              </div>
              <div className="space-y-1">
                 <div className="text-base text-white/70 font-bold uppercase tracking-widest">Contribution Margin</div>
                 <div className="text-xl md:text-2xl font-bold uppercase font-display">{formatCurrency(sellingPricePerUnit - variableCostPerUnit)} <span className="text-white/70 text-base text-normal">/ unit</span></div>
              </div>
           </div>

           <AIAdvisor context={`Fixed costs of ${fixedCosts}. Selling units for ${sellingPricePerUnit} with a variable cost of ${variableCostPerUnit}. Break-even is ${results.units} units.`} />
        </section>
      </div>
      <RelatedTools tools={relatedTools} />
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

      <CalculatorSEO
        id="BreakEvenCalculator"
        title="Break Even  Calculator"
        description="Calculate your break even  easily and accurately with Orbit Wealth Pro."
        faqs={[{
          question: "What is the Break Even  Calculator?",
          answer: "The Break Even  Calculator is a financial tool designed to help you calculate and estimate your figures accurately."
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
