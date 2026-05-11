/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from 'react';
import { UserCheck, Download, Share2, Info, Landmark } from 'lucide-react';
import { useLocale } from '../context/LocaleContext';
import { LoanEligibilityInputs } from '../types';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip } from 'recharts';
import jsPDF from 'jspdf';
import SEOSection from './SEOSection';

const INITIAL_INPUTS: LoanEligibilityInputs = {
  monthlyIncome: 75000,
  monthlyObligations: 10000,
  interestRate: 8.5,
  loanTerm: 20,
  maxFOIR: 50
};

export default function LoanEligibility() {
  const { formatCurrency, labels } = useLocale();
  const [inputs, setInputs] = useState<LoanEligibilityInputs>(INITIAL_INPUTS);
  const [isMounted, setIsMounted] = useState(false);

  const results = useMemo(() => {
    const monthlyIncome = inputs.monthlyIncome;
    const existingObligations = inputs.monthlyObligations;
    const foir = inputs.maxFOIR / 100;
    
    const availableEMI = (monthlyIncome * foir) - existingObligations;
    const effectiveEMI = Math.max(0, availableEMI);

    const r = inputs.interestRate / 12 / 100;
    const n = inputs.loanTerm * 12;
    
    // Formula for Loan Principal based on EMI
    // P = EMI * [ (1+r)^n - 1 ] / [ r * (1+r)^n ]
    let maxLoanAmount = 0;
    if (r > 0) {
        maxLoanAmount = effectiveEMI * (Math.pow(1 + r, n) - 1) / (r * Math.pow(1 + r, n));
    } else {
        maxLoanAmount = effectiveEMI * n;
    }

    return {
      eligibleLoanAmount: Math.round(maxLoanAmount),
      monthlyEMI: Math.round(effectiveEMI),
      totalPayable: Math.round(effectiveEMI * n)
    };
  }, [inputs]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(22);
    doc.text(`Orbit Wealth Pro: ${labels.loan} Eligibility`, 20, 20);
    doc.setFontSize(12);
    doc.text(`Monthly Income: ${formatCurrency(inputs.monthlyIncome)}`, 20, 40);
    doc.text(`Existing Obligations: ${formatCurrency(inputs.monthlyObligations)}`, 20, 50);
    doc.text(`Interest Rate: ${inputs.interestRate}%`, 20, 60);
    doc.text(`Loan Tenure: ${inputs.loanTerm} Years`, 20, 70);
    doc.text(`Max Eligible EMI: ${formatCurrency(results.monthlyEMI)}`, 20, 90);
    doc.text(`Max Eligible Loan: ${formatCurrency(results.eligibleLoanAmount)}`, 20, 100);
    doc.save('loan-eligibility.pdf');
  };

  return (
    <div className="space-y-8 pb-20 text-white">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <header className="space-y-2">
          <div className="flex items-center gap-2 mb-4">
             <UserCheck className="text-[#0055FF] w-6 h-6" />
             <h1 className="text-3xl font-bold tracking-tighter">Loan Eligibility Calculator</h1>
          </div>
          <p className="text-white/40 max-w-xl text-sm leading-relaxed">
            Check your maximum borrowing capacity based on income, current debt obligations, and bank FOIR standards.
          </p>
        </header>

        <div className="flex items-center gap-2">
          <button onClick={downloadPDF} className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/5 rounded-lg text-xs font-bold transition-all">
            <Download className="w-4 h-4" /> PDF Report
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#0055FF] hover:bg-[#0055FF]/90 rounded-lg text-xs font-bold transition-all shadow-lg shadow-[#0055FF]/20 text-white">
            <Share2 className="w-4 h-4" /> Share Results
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <section className="bg-white/[0.02] border border-white/5 rounded-2xl p-8 space-y-8">
           <div className="space-y-6">
              <div className="space-y-4">
                 <div className="flex justify-between items-center">
                    <label className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Monthly Income</label>
                    <div className="text-lg font-bold text-white tracking-tighter">{formatCurrency(inputs.monthlyIncome)}</div>
                 </div>
                 <input 
                   type="range" min="10000" max="1000000" step="5000"
                   value={inputs.monthlyIncome}
                   onChange={(e) => setInputs({ ...inputs, monthlyIncome: Number(e.target.value) })}
                   className="w-full accent-[#0055FF]"
                 />
              </div>

              <div className="space-y-4">
                 <div className="flex justify-between items-center">
                    <label className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Existing EMI Obligations</label>
                    <div className="text-lg font-bold text-white/40 tracking-tighter">{formatCurrency(inputs.monthlyObligations)}</div>
                 </div>
                 <input 
                   type="range" min="0" max="500000" step="1000"
                   value={inputs.monthlyObligations}
                   onChange={(e) => setInputs({ ...inputs, monthlyObligations: Number(e.target.value) })}
                   className="w-full accent-[#0055FF]"
                 />
              </div>

              <div className="grid grid-cols-3 gap-4">
                 <div className="space-y-4">
                    <label className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Rate (%)</label>
                    <input 
                      type="number" step="0.1" value={inputs.interestRate}
                      onChange={(e) => setInputs({ ...inputs, interestRate: Number(e.target.value) })}
                      className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-3 text-white font-bold outline-none"
                    />
                 </div>
                 <div className="space-y-4">
                    <label className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Term (Yrs)</label>
                    <input 
                      type="number" value={inputs.loanTerm}
                      onChange={(e) => setInputs({ ...inputs, loanTerm: Number(e.target.value) })}
                      className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-3 text-white font-bold outline-none"
                    />
                 </div>
                 <div className="space-y-4">
                    <label className="text-[10px] font-bold text-white/20 uppercase tracking-widest">FOIR (%)</label>
                    <input 
                      type="number" value={inputs.maxFOIR}
                      onChange={(e) => setInputs({ ...inputs, maxFOIR: Number(e.target.value) })}
                      className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-3 text-[#0055FF] font-bold outline-none"
                    />
                 </div>
              </div>
           </div>
        </section>

        <section className="bg-white/[0.02] border border-white/5 rounded-2xl p-8 flex flex-col items-center justify-center min-h-[400px]">
           {isMounted && (
             <div className="w-full space-y-8">
               <div className="text-center space-y-2">
                  <h3 className="text-white/20 font-bold uppercase tracking-widest text-[10px]">Maximum Eligible {labels.loan} Amount</h3>
                  <div className="text-6xl font-bold text-white tracking-widest">{formatCurrency(results.eligibleLoanAmount)}</div>
               </div>

               <div className="grid grid-cols-2 gap-4">
                 <div className="p-6 bg-[#0055FF]/10 rounded-2xl border border-[#0055FF]/20 text-center">
                    <div className="text-[10px] font-bold text-[#0055FF] uppercase tracking-widest mb-1">Max EMI Possible</div>
                    <div className="text-2xl font-bold text-white">{formatCurrency(results.monthlyEMI)}</div>
                 </div>
                 <div className="p-6 bg-white/5 rounded-2xl border border-white/10 text-center">
                    <div className="text-[10px] font-bold text-white/20 uppercase tracking-widest mb-1">FOIR Limit</div>
                    <div className="text-2xl font-bold text-white">{inputs.maxFOIR}%</div>
                 </div>
               </div>

               <div className="flex items-center gap-4 p-4 bg-white/[0.02] rounded-xl border border-white/5">
                  <Info className="w-5 h-5 text-white/20 shrink-0" />
                  <p className="text-[10px] text-white/40 leading-relaxed">
                    Financial institutions typically set FOIR (Fixed Obligation to Income Ratio) between 40% to 60%. 
                    This calculation assumes standard bank policies for {labels.jurisdiction}.
                  </p>
               </div>
             </div>
           )}
        </section>
      </div>

      <SEOSection 
        title="Loan Eligibility Calculator"
        howTo={[
          "Enter your gross monthly income before taxes.",
          "List all existing monthly debt obligations (EMIs, Credit Card dues).",
          "Set the expected interest rate for the new loan.",
          "Select the desired loan tenure in years.",
          "Adjust the FOIR percentage based on bank requirements (usually 50%)."
        ]}
        formula="Principal = EMI * [ (1+r)^n - 1 ] / [ r * (1+r)^n ]"
        benefits={[
          "Understand your borrowing power before approaching a bank.",
          "Optimize your loan structure by adjusting tenure or interest rates.",
          "Plan your home or car purchase based on realistic eligibility.",
          "Reduce the risk of loan rejection by checking FOIR limits beforehand."
        ]}
      />
    </div>
  );
}
