/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from 'react';
import { Gift, Download, Share2, Info, ShieldCheck } from 'lucide-react';
import { useLocale } from '../context/LocaleContext';
import { GratuityInputs } from '../types';
import jsPDF from 'jspdf';
import SEOSection from './SEOSection';

const INITIAL_INPUTS: GratuityInputs = {
  monthlySalary: 50000,
  yearsOfService: 10,
  isCoveredUnderGratuityAct: true
};

export default function GratuityCalculator() {
  const { formatCurrency, labels, currency } = useLocale();
  const [inputs, setInputs] = useState<GratuityInputs>(INITIAL_INPUTS);
  const [isMounted, setIsMounted] = useState(false);

  const results = useMemo(() => {
    let amount = 0;
    if (currency === 'INR') {
        // Indian Gratuity Formula
        if (inputs.isCoveredUnderGratuityAct) {
            // (15 * Salary * Tenure) / 26
            amount = (15 * inputs.monthlySalary * Math.max(0, inputs.yearsOfService)) / 26;
        } else {
            // (15 * Salary * Tenure) / 30
            amount = (15 * inputs.monthlySalary * Math.max(0, inputs.yearsOfService)) / 30;
        }
    } else {
        // Global standard / End of Service (Approx 21 days for first 5 years, 30 days after)
        // Simple but common: (Salary / 30) * 21 * Tenure
        if (inputs.yearsOfService <= 5) {
            amount = (inputs.monthlySalary / 30) * 21 * inputs.yearsOfService;
        } else {
            const firstFive = (inputs.monthlySalary / 30) * 21 * 5;
            const remaining = (inputs.monthlySalary / 30) * 30 * (inputs.yearsOfService - 5);
            amount = firstFive + remaining;
        }
    }

    return {
      gratuityAmount: Math.round(amount)
    };
  }, [inputs, currency]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(22);
    doc.text('ORBIT WEALTH PRO: Gratuity Projection', 20, 20);
    doc.setFontSize(12);
    doc.text(`Last Drawn Monthly Salary: ${formatCurrency(inputs.monthlySalary)}`, 20, 40);
    doc.text(`Years of Service: ${inputs.yearsOfService}`, 20, 50);
    doc.text(`Jurisdiction: ${currency === 'INR' ? 'India' : 'International'}`, 20, 60);
    doc.text(`Total Gratuity Amount: ${formatCurrency(results.gratuityAmount)}`, 20, 80);
    doc.save('gratuity-calculation.pdf');
  };

  return (
    <div className="space-y-8 pb-20 text-white">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <header className="space-y-2">
          <div className="flex items-center gap-2 mb-4">
             <Gift className="text-[#D4AF37] w-6 h-6" />
             <h1 className="text-3xl font-bold tracking-tighter">Gratuity Calculator</h1>
          </div>
          <p className="text-white/40 max-w-xl text-sm leading-relaxed">
            Calculate your end-of-service benefits based on {currency === 'INR' ? 'Indian Payment of Gratuity Act' : 'International work standards'}.
          </p>
        </header>

        <div className="flex items-center gap-2">
          <button onClick={downloadPDF} className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/5 rounded-lg text-xs font-bold transition-all">
            <Download className="w-4 h-4" /> PDF Report
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#D4AF37] hover:bg-[#D4AF37]/90 rounded-lg text-xs font-bold transition-all shadow-lg shadow-[#D4AF37]/20 text-white">
            <Share2 className="w-4 h-4" /> Share Results
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <section className="bg-white/[0.02] border border-white/5 rounded-2xl p-8 space-y-8">
           <div className="space-y-6">
              <div className="space-y-4">
                 <div className="flex justify-between items-center">
                    <label className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Base Salary + DA (Monthly)</label>
                    <div className="text-lg font-bold text-white tracking-tighter">{formatCurrency(inputs.monthlySalary)}</div>
                 </div>
                 <input 
                   type="range" min="1000" max="1000000" step="1000"
                   value={inputs.monthlySalary}
                   onChange={(e) => setInputs({ ...inputs, monthlySalary: Number(e.target.value) })}
                   className="w-full accent-[#D4AF37]"
                 />
              </div>

              <div className="space-y-4">
                 <div className="flex justify-between items-center">
                    <label className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Years of Service</label>
                    <div className="text-lg font-bold text-[#D4AF37] tracking-tighter">{inputs.yearsOfService} Yrs</div>
                 </div>
                 <input 
                   type="range" min="1" max="50" step="1"
                   value={inputs.yearsOfService}
                   onChange={(e) => setInputs({ ...inputs, yearsOfService: Number(e.target.value) })}
                   className="w-full accent-[#D4AF37]"
                 />
              </div>

              {currency === 'INR' && (
                <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/5">
                   <input 
                    type="checkbox"
                    checked={inputs.isCoveredUnderGratuityAct}
                    onChange={(e) => setInputs({ ...inputs, isCoveredUnderGratuityAct: e.target.checked })}
                    className="w-5 h-5 accent-[#D4AF37]"
                   />
                   <div>
                      <div className="text-xs font-bold text-white">Covered under Gratuity Act?</div>
                      <p className="text-[10px] text-white/20 uppercase tracking-widest font-bold">Enables 15/26 working days ratio</p>
                   </div>
                </div>
              )}
           </div>
        </section>

        <section className="bg-white/[0.02] border border-white/5 rounded-2xl p-8 flex flex-col items-center justify-center min-h-[350px]">
           {isMounted && (
               <div className="text-center space-y-6">
                  <div className="text-[10px] font-bold text-white/20 uppercase tracking-widest mb-1">Estimated Gratuity Amount</div>
                  <div className="text-6xl font-bold text-white tracking-widest">{formatCurrency(results.gratuityAmount)}</div>
                  
                  <div className="flex justify-center flex-wrap gap-4 pt-8">
                     <div className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-emerald-500" />
                        <span className="text-[10px] font-bold text-emerald-500 uppercase">Tax Free (Upto Limit)</span>
                     </div>
                  </div>
               </div>
           )}
        </section>
      </div>

      <SEOSection 
        title="Gratuity Calculator"
        howTo={[
          "Enter your basic salary plus dearness allowance (DA) per month.",
          "Select the total number of completed years of service with your employer.",
          "If in India, specify if you are covered under the Gratuity Act (standard requirement is 5+ years).",
          "Review the total estimated gratuity payout for your retirement or job change."
        ]}
        formula={currency === 'INR' ? "Gratuity = (15 * Salary * Tenure) / 26" : "Gratuity = Monthly Salary * Tenure"}
        benefits={[
          "Calculate legal end-of-service benefits accurately for regional laws.",
          "Simple interface for both covered and non-covered employees in India.",
          "Global module for international companies following standard tenure bonuses.",
          "Download proof of calculation for HR or legal reference."
        ]}
      />
    </div>
  );
}
