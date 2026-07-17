import CurrencyInput from "./CurrencyInput";
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Download, Heart, Shield, Info, ShieldCheck } from 'lucide-react';
import { useLocale } from '../context/LocaleContext';
import jsPDF from 'jspdf';
import SEOSection from './SEOSection';
import AIAdvisor from './AIAdvisor';
import NumericInput from './NumericInput';

export default function HLVCalculator() {
  const { formatCurrency } = useLocale();
  const [age, setAge] = useState(30);
  const [retirementAge, setRetirementAge] = useState(60);
  const [annualIncome, setAnnualIncome] = useState(1200000);
  const [personalExpenses, setPersonalExpenses] = useState(300000); // Annual expenses for self
  const [expectedReturn, setExpectedReturn] = useState(7); // Inflation-adjusted return

  const hlv = useMemo(() => {
    const netIncome = annualIncome - personalExpenses;
    const workingYears = retirementAge - age;
    if (workingYears <= 0) return 0;
    
    // Present Value of an Annuity formula: PV = PMT * [(1 - (1 + r)^-n) / r]
    const r = expectedReturn / 100;
    const n = workingYears;
    const pv = netIncome * ((1 - Math.pow(1 + r, -n)) / r);
    
    return Math.round(pv);
  }, [age, retirementAge, annualIncome, personalExpenses, expectedReturn]);

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(22);
    doc.text('Human Life Value (HLV) Report', 20, 20);
    doc.setFontSize(12);
    doc.text(`Current Age: ${age}`, 20, 40);
    doc.text(`Retirement Age: ${retirementAge}`, 20, 50);
    doc.text(`Annual Net Contribution to Family: ${formatCurrency(annualIncome - personalExpenses)}`, 20, 60);
    doc.text(`Estimated Human Life Value: ${formatCurrency(hlv)}`, 20, 80);
    doc.text('This value represent the ideal insurance coverage needed to protect your dependents.', 20, 95);
    doc.save('hlv-report.pdf');
  };

  return (
    <div className="space-y-12 pb-20 text-white">
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 pt-8">
        <header className="space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="h-px w-6 bg-[#D4AF37]"></div>
            <span className="text-base font-bold text-[#D4AF37] uppercase tracking-[0.3em]">Protection Intelligence</span>
          </div>
          <h1 className="text-7xl font-display font-medium text-[#f59e0b] tracking-tight">HLV Calculator.</h1>
          <p className="text-white/70 max-w-xl text-lg font-light leading-relaxed">
            Quantify your economic value to your family and determine the optimal life insurance coverage.
          </p>
        </header>
        <button onClick={downloadPDF} className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/5 rounded-xl text-base font-bold transition-all hover:bg-white/10 shrink-0">
          <Download className="w-4 h-4" /> Export HLV Audit
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
        <section className="space-y-10 bg-white/[0.01] border border-white/[0.03] p-10 rounded-[2.5rem]">
           <div className="grid grid-cols-2 gap-8">
              <div className="space-y-4">
                 <div className="flex justify-between items-center text-base font-bold text-white/70 uppercase tracking-widest">
                    <span>Current Age</span>
                 </div>
                 <NumericInput 
                   min={18} max={75} 
                   value={age} 
                   onChange={setAge} 
                   className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-3 text-white font-bold outline-none" 
                 />
                 <input aria-label="Adjust value" type="range" min="18" max="75" value={age} onChange={e => setAge(Number(e.target.value))} className="w-full accent-[#D4AF37]" />
              </div>
              <div className="space-y-4">
                 <div className="flex justify-between items-center text-base font-bold text-white/70 uppercase tracking-widest">
                    <span>Retirement Age</span>
                 </div>
                 <NumericInput 
                   min={40} max={85} 
                   value={retirementAge} 
                   onChange={setRetirementAge} 
                   className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-3 text-white font-bold outline-none" 
                 />
                 <input aria-label="Adjust value" type="range" min="40" max="85" value={retirementAge} onChange={e => setRetirementAge(Number(e.target.value))} className="w-full accent-[#D4AF37]" />
              </div>
           </div>

           <div className="space-y-6">
              <CurrencyInput 
                label="Annual Gross Income"
                value={annualIncome}
                onChange={setAnnualIncome}
                min={100000}
                max={50000000}
                step={50000}
              />
              <CurrencyInput 
                label="Personal Annual Expenses"
                value={personalExpenses}
                onChange={setPersonalExpenses}
                min={10000}
                max={10000000}
                step={10000}
              />
           </div>
        </section>

        <section className="flex flex-col gap-12">
           <div className="p-12 bg-[#D4AF37]/5 border border-[#D4AF37]/10 rounded-[3rem] text-center space-y-4 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5">
                 <Shield className="w-32 h-32" />
              </div>
              <div className="text-base text-[#D4AF37] font-bold uppercase tracking-[0.4em]">Economic Protection Value</div>
              <div className="text-8xl font-display font-medium text-white tracking-tighter">{formatCurrency(hlv)}</div>
              <div className="pt-4 flex items-center justify-center gap-3">
                 <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
                 <span className="text-base text-white/70 italic">Necessary coverage for your dependents</span>
              </div>
           </div>

           <AIAdvisor context={`User is ${age} years old, earning ${annualIncome} annually and spending ${personalExpenses} on self. Retirement target is ${retirementAge}. Calculated HLV is ${hlv}.`} />
        </section>
      </div>

      <SEOSection 
        title="Human Life Value (HLV) Calculator for Term Life Insurance"
        howTo={[
          "Calculate your total annual income including bonuses.",
          "Subtract your personal expenses (what the family wouldn't need in your absence).",
          "Estimate your remaining productive years until retirement.",
          "Adjust the discount rate to account for inflation and safe investment returns."
        ]}
        formula="HLV = Net Annual Contribution * [(1 - (1 + r)^-n) / r]"
        benefits={[
          "Avoid the common '10x Income' rule-of-thumb which is often inaccurate.",
          "Ensure your children's education and lifestyle are 100% secured.",
          "Provide an actual empirical number for insurance policy discussions.",
          "Plan for the erosion of purchasing power over the next 20-40 years."
        ]}
      />
    </div>
  );
}
