/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from 'react';
import { Landmark, Download, Share2, TrendingUp, Calendar, Wallet } from 'lucide-react';
import { useLocale } from '../context/LocaleContext';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import jsPDF from 'jspdf';
import SEOSection from './SEOSection';

export default function FDRDCalculator() {
  const { formatCurrency, labels, currency } = useLocale();
  const [type, setType] = useState<'FD' | 'RD'>('FD');
  const [inputs, setInputs] = useState({
    amount: 100000,
    rate: 7,
    tenure: 5,
    compounding: 4, // 4 for Quarterly, 12 for Monthly, 1 for Yearly
  });
  const [isMounted, setIsMounted] = useState(false);

  const results = useMemo(() => {
    const P = inputs.amount;
    const r = inputs.rate / 100;
    const n = inputs.compounding;
    const t = inputs.tenure;

    if (type === 'FD') {
      // Compound Interest Formula: A = P(1 + r/n)^(nt)
      const matValue = P * Math.pow(1 + r / n, n * t);
      const interest = matValue - P;
      return { totalInvestment: P, interest, matValue };
    } else {
      // RD Formula: M = R * [(1 + i)^n - 1] / (1 - (1 + i)^(-1/3))  -- This is complex
      // Simple Monthly RD: M = P * (1 + r/n)^(nt) ... but it's recurring
      // M = R * [(1+i)^n - 1] / (i)  where i = r/1200
      const R = inputs.amount; // Monthly deposit
      const i = inputs.rate / (12 * 100);
      const months = inputs.tenure * 12;
      const matValue = R * (Math.pow(1 + i, months) - 1) / (1 - Math.pow(1 + i, -1/3)) * Math.pow(1+i, 1/3);
      // Wait, more accurate RD: M = P * ((1+i)^n - 1) / (1 - (1+i)^(-1/3))
      // Let's use simple accurate recurring deposit formula for banks
      let totalMaturity = 0;
      let totalInv = R * months;
      for (let m = 0; m < months; m++) {
        totalMaturity += R * Math.pow(1 + inputs.rate / (4 * 100), 4 * (months - m) / 12);
      }
      
      const interest = totalMaturity - totalInv;
      return { totalInvestment: totalInv, interest, matValue: totalMaturity };
    }
  }, [inputs, type]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(22);
    doc.text(`ORBIT WEALTH PRO: ${type} Maturity Analysis`, 20, 20);
    doc.setFontSize(12);
    doc.text(`Investment Type: ${type === 'FD' ? 'Fixed Deposit' : 'Recurring Deposit'}`, 20, 40);
    doc.text(`${type === 'FD' ? 'Principal' : 'Monthly Deposit'}: ${formatCurrency(inputs.amount)}`, 20, 50);
    doc.text(`Interest Rate: ${inputs.rate}%`, 20, 60);
    doc.text(`Tenure: ${inputs.tenure} Years`, 20, 70);
    doc.text(`Total Investment: ${formatCurrency(results.totalInvestment)}`, 20, 80);
    doc.text(`Interest Earned: ${formatCurrency(results.interest)}`, 20, 90);
    doc.text(`Maturity Value: ${formatCurrency(results.matValue)}`, 20, 100);
    doc.save('fd-rd-analysis.pdf');
  };

  const chartData = [
    { name: 'Invested', value: results.totalInvestment },
    { name: 'Interest', value: results.interest },
  ];

  const COLORS = ['#1a1a1a', '#D4AF37'];

  return (
    <div className="space-y-8 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <header className="space-y-2">
          <div className="flex items-center gap-2 mb-4">
             <Landmark className="text-[#D4AF37] w-6 h-6" />
             <h1 className="text-3xl font-bold tracking-tighter text-white">FD & RD Calculator</h1>
          </div>
          <p className="text-white/40 max-w-xl text-sm leading-relaxed">
            Calculate the maturity value of your Fixed Deposits (FD) or Recurring Deposits (RD) with quarterly compounding.
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
              onClick={() => setType('FD')}
              className={`flex-1 py-3 text-xs font-bold rounded-lg transition-all ${type === 'FD' ? 'bg-[#D4AF37] text-white shadow-lg shadow-[#D4AF37]/20' : 'text-white/20 hover:text-white/40'}`}
            >
              Fixed Deposit (FD)
            </button>
            <button
              onClick={() => setType('RD')}
              className={`flex-1 py-3 text-xs font-bold rounded-lg transition-all ${type === 'RD' ? 'bg-[#D4AF37] text-white shadow-lg shadow-[#D4AF37]/20' : 'text-white/20 hover:text-white/40'}`}
            >
              Recurring Deposit (RD)
            </button>
          </div>

          <div className="space-y-6">
             <div className="space-y-4">
               <label className="text-[10px] font-bold text-white/20 uppercase tracking-widest">{type === 'FD' ? 'Total Investment' : 'Monthly Deposit'}</label>
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

             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <label className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Rate of Interest (%)</label>
                  <input 
                    type="number"
                    step="0.1"
                    value={inputs.rate}
                    onChange={(e) => setInputs({ ...inputs, rate: Number(e.target.value) })}
                    className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-[#D4AF37] transition-all font-bold"
                  />
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Tenure (Years)</label>
                  <input 
                    type="number"
                    value={inputs.tenure}
                    onChange={(e) => setInputs({ ...inputs, tenure: Number(e.target.value) })}
                    className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-[#D4AF37] transition-all font-bold"
                  />
                </div>
             </div>
          </div>
        </section>

        <section className="bg-white/[0.02] border border-white/5 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between min-h-[400px] gap-8">
           {isMounted && (
             <>
               <div className="w-full md:w-1/2 h-[300px]">
                 <ResponsiveContainer width="100%" height="100%">
                   <PieChart>
                     <Pie
                       data={chartData}
                       cx="50%"
                       cy="50%"
                       innerRadius={60}
                       outerRadius={80}
                       paddingAngle={5}
                       dataKey="value"
                     >
                       {chartData.map((entry, index) => (
                         <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                       ))}
                     </Pie>
                     <RechartsTooltip contentStyle={{ backgroundColor: '#111', border: '1px solid #333', fontSize: '10px' }} />
                   </PieChart>
                 </ResponsiveContainer>
                 <div className="flex justify-center gap-6 mt-4">
                    <div className="flex items-center gap-2">
                       <div className="w-3 h-3 rounded-full bg-[#1a1a1a]"></div>
                       <span className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Invested</span>
                    </div>
                    <div className="flex items-center gap-2">
                       <div className="w-3 h-3 rounded-full bg-[#D4AF37]"></div>
                       <span className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Returns</span>
                    </div>
                 </div>
               </div>

               <div className="w-full md:w-1/2 space-y-6">
                 <div className="p-6 bg-white/5 rounded-2xl border border-white/5 transition-all hover:bg-white/10 group">
                    <div className="text-[10px] font-bold text-white/20 uppercase tracking-widest mb-1 group-hover:text-[#D4AF37] transition-colors">Total Invested</div>
                    <div className="text-3xl font-bold tracking-tighter text-white">{formatCurrency(results.totalInvestment)}</div>
                 </div>
                 <div className="p-6 bg-white/5 rounded-2xl border border-white/5 transition-all hover:bg-white/10 group">
                    <div className="text-[10px] font-bold text-white/20 uppercase tracking-widest mb-1 group-hover:text-[#D4AF37] transition-colors">Wealth Gained</div>
                    <div className="text-3xl font-bold tracking-tighter text-[#D4AF37]">{formatCurrency(results.interest)}</div>
                 </div>
                 <div className="p-6 bg-[#D4AF37]/10 rounded-2xl border border-[#D4AF37]/20 shadow-xl shadow-[#D4AF37]/5">
                    <div className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-widest mb-1">Maturity Value</div>
                    <div className="text-4xl font-bold tracking-tighter text-white">{formatCurrency(results.matValue)}</div>
                 </div>
               </div>
             </>
           )}
        </section>
      </div>

      <SEOSection 
        title={`${type} Maturity Calculator`}
        howTo={[
          `Choose between Fixed Deposit (FD) or Recurring Deposit (RD) based on your savings pattern.`,
          "Enter the principal amount or monthly contribution you wish to save.",
          "Set the current bank interest rate and designated tenure to see projected growth.",
          "Analyze the returns vs initial investment split through our dynamic visualization engine."
        ]}
        formula={type === 'FD' ? "A = P(1 + r/n)^(nt)" : "Monthly Compounding Accumulation"}
        benefits={[
          "Calculate guaranteed returns on low-risk bank instruments with absolute precision.",
          "Optimized for global compounding standards (Quarterly and Annual).",
          "Compare growth potential between different bank regimes instantly.",
          "Download a complete maturity report to share with your financial advisor."
        ]}
      />
    </div>
  );
}
