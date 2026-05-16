/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { GraduationCap, Download, Calculator, TrendingUp } from 'lucide-react';
import { useLocale } from '../context/LocaleContext';
import jsPDF from 'jspdf';
import SEOSection from './SEOSection';
import AIAdvisor from './AIAdvisor';

export default function ChildEducationPlanner() {
  const { formatCurrency } = useLocale();
  const [currentCost, setCurrentCost] = useState(500000);
  const [inflation, setInflation] = useState(8);
  const [yearsUntilUni, setYearsUntilUni] = useState(15);
  const [expectedReturn, setExpectedReturn] = useState(12);

  const results = useMemo(() => {
    // Future Cost calculation
    const futureCost = currentCost * Math.pow(1 + inflation / 100, yearsUntilUni);
    
    // Monthly SIP needed to reach future cost
    // FV = [P x ((1+i)^n - 1) / i] x (1+i)
    const monthlyRate = expectedReturn / 100 / 12;
    const months = yearsUntilUni * 12;
    const monthlySIP = (futureCost * monthlyRate) / ((Math.pow(1 + monthlyRate, months) - 1) * (1 + monthlyRate));
    
    return {
      futureCost: Math.round(futureCost),
      monthlySIP: Math.round(monthlySIP)
    };
  }, [currentCost, inflation, yearsUntilUni, expectedReturn]);

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(22);
    doc.text('Child Education Planning Report', 20, 20);
    doc.setFontSize(12);
    doc.text(`Current Cost of Degree: ${formatCurrency(currentCost)}`, 20, 40);
    doc.text(`Estimated Inflation: ${inflation}%`, 20, 50);
    doc.text(`Years to College: ${yearsUntilUni}`, 20, 60);
    doc.text(`Future Value of Goal: ${formatCurrency(results.futureCost)}`, 20, 80);
    doc.text(`Required Monthly SIP: ${formatCurrency(results.monthlySIP)}`, 20, 95);
    doc.save('education-plan.pdf');
  };

  return (
    <div className="space-y-12 pb-20 text-white">
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 pt-8">
        <header className="space-y-4">
          <div className="flex items-center gap-2 mb-2">
             <div className="h-px w-6 bg-[#D4AF37]"></div>
             <span className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-[0.3em]">Institutional Heritage</span>
          </div>
          <h1 className="text-5xl font-display font-medium text-white tracking-tight">Academic Funding.</h1>
          <p className="text-white/40 max-w-xl text-sm font-light leading-relaxed">
            Provision for future educational excellence with high-fidelity inflation modeling.
          </p>
        </header>
        <button onClick={downloadPDF} className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/5 rounded-lg text-xs font-bold transition-all">
          <Download className="w-4 h-4" /> Export Plan
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <section className="bg-white/[0.02] border border-white/5 rounded-2xl p-8 space-y-8">
           <div className="space-y-6">
              <div className="space-y-2">
                 <label className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Current Cost of Education</label>
                 <input 
                   type="number" value={currentCost}
                   onChange={(e) => setCurrentCost(Number(e.target.value))}
                   className="w-full bg-black/40 p-4 rounded-xl border border-white/5 text-white font-bold outline-none text-xl"
                 />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                 <div className="space-y-2">
                    <label className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Education Inflation (%)</label>
                    <input 
                      type="number" value={inflation}
                      onChange={(e) => setInflation(Number(e.target.value))}
                      className="w-full bg-black/40 p-3 rounded-xl border border-white/5 text-white font-bold outline-none"
                    />
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Expected Returns (%)</label>
                    <input 
                      type="number" value={expectedReturn}
                      onChange={(e) => setExpectedReturn(Number(e.target.value))}
                      className="w-full bg-black/40 p-3 rounded-xl border border-white/5 text-white font-bold outline-none"
                    />
                 </div>
              </div>
              <div className="space-y-4">
                 <div className="flex justify-between items-center text-[10px] font-bold text-white/20 uppercase tracking-widest">
                    <span>Years until admission</span>
                    <span className="text-[#D4AF37]">{yearsUntilUni} Years</span>
                 </div>
                 <input 
                   type="range" min="1" max="25"
                   value={yearsUntilUni}
                   onChange={(e) => setYearsUntilUni(Number(e.target.value))}
                   className="w-full accent-[#D4AF37]"
                 />
              </div>
           </div>
        </section>

        <section className="bg-white/[0.02] border border-white/5 rounded-2xl p-8 flex flex-col justify-between">
           <div className="space-y-8">
              <div className="p-8 bg-white/5 rounded-2xl border border-white/5 text-center">
                 <div className="text-[10px] text-white/40 font-bold uppercase tracking-widest mb-2">Estimated Future Cost</div>
                 <div className="text-5xl font-bold text-white tracking-tighter">{formatCurrency(results.futureCost)}</div>
              </div>
              
              <div className="p-8 bg-[#D4AF37]/10 rounded-2xl border border-[#D4AF37]/20 text-center">
                 <div className="text-[10px] text-[#D4AF37] font-bold uppercase tracking-widest mb-2">Required Monthly Investment</div>
                 <div className="text-5xl font-bold text-[#D4AF37] tracking-tighter">{formatCurrency(results.monthlySIP)}</div>
                 <div className="mt-4 text-xs text-white/40">Assuming {expectedReturn}% annual compounded returns</div>
              </div>
           </div>

           <AIAdvisor context={`Planning for kid's college in ${yearsUntilUni} years. Current cost ${currentCost}, inflated to ${results.futureCost}. User needs to save ${results.monthlySIP} monthly.`} />
        </section>
      </div>

      <SEOSection 
        title="Comprehensive Child Education Planning"
        howTo={[
          "Research current tuition and living costs for your desired degree.",
          "Estimated education inflation typically runs higher than CPI (8-10% is common).",
          "Specify the years remaining until your child starts university.",
          "Check the Monthly SIP required to bridge the gap between today and tomorrow."
        ]}
        formula="Future Value = C * (1 + inflation)^years; Monthly SIP = (FV * r) / [((1 + r)^n - 1) * (1 + r)]"
        benefits={[
          "Secure your child's academic future without debt.",
          "Combat the aggressive nature of education inflation.",
          "Optimize your asset allocation based on the 'Years to College'.",
          "Visualizes the 'Sticker Shock' of future tuition early enough to act."
        ]}
      />
    </div>
  );
}
