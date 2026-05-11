/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from 'react';
import { Landmark, Download, Share2, Info } from 'lucide-react';
import { useLocale } from '../context/LocaleContext';
import { MortgageInputs, AmortizationPeriod } from '../types';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, LineChart, Line, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';
import jsPDF from 'jspdf';
import SEOSection from './SEOSection';

const INITIAL_INPUTS: MortgageInputs = {
  homePrice: 500000,
  downPayment: 100000,
  downPaymentPercent: 20,
  interestRate: 6.5,
  loanTerm: 30
};

export default function MortgageCalculator() {
  const { formatCurrency, currencySymbol } = useLocale();
  const [inputs, setInputs] = useState<MortgageInputs>(INITIAL_INPUTS);
  const [isMounted, setIsMounted] = useState(false);

  const results = useMemo(() => {
    const principal = inputs.homePrice - inputs.downPayment;
    const monthlyRate = inputs.interestRate / 100 / 12;
    const numberOfPayments = inputs.loanTerm * 12;

    let monthlyPayment = 0;
    if (monthlyRate === 0) {
      monthlyPayment = principal / numberOfPayments;
    } else {
      monthlyPayment = (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    }

    const amortizationSchedule: AmortizationPeriod[] = [];
    let remainingBalance = principal;
    let totalInterestPaid = 0;

    for (let i = 1; i <= numberOfPayments; i++) {
      const interestPayment = remainingBalance * monthlyRate;
      const principalPayment = monthlyPayment - interestPayment;
      remainingBalance -= principalPayment;
      totalInterestPaid += interestPayment;

      if (i % 12 === 0) {
          amortizationSchedule.push({
            period: i,
            payment: monthlyPayment,
            principal: principalPayment,
            interest: interestPayment,
            remainingBalance: Math.max(0, remainingBalance),
            totalInterestPaid: totalInterestPaid
          });
      }
    }

    return {
      monthlyPayment: Math.round(monthlyPayment),
      totalPayment: Math.round(monthlyPayment * numberOfPayments),
      totalInterest: Math.round(totalInterestPaid),
      amortizationSchedule
    };
  }, [inputs]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(22);
    doc.text('Orbit Wealth Pro: Mortgage Report', 20, 20);
    doc.setFontSize(12);
    doc.text(`Home Price: ${formatCurrency(inputs.homePrice)}`, 20, 40);
    doc.text(`Down Payment: ${formatCurrency(inputs.downPayment)} (${inputs.downPaymentPercent}%)`, 20, 50);
    doc.text(`Interest Rate: ${inputs.interestRate}%`, 20, 60);
    doc.text(`Loan Term: ${inputs.loanTerm} years`, 20, 70);
    doc.text(`Monthly Payment: ${formatCurrency(results.monthlyPayment)}`, 20, 90);
    doc.text(`Total Interest: ${formatCurrency(results.totalInterest)}`, 20, 100);
    doc.text(`Total Cost: ${formatCurrency(results.totalPayment)}`, 20, 110);
    doc.save('mortgage-calculation.pdf');
  };

  return (
    <div className="space-y-8 pb-20 text-white">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <header className="space-y-2">
          <div className="flex items-center gap-2 mb-4">
             <Landmark className="text-[#0055FF] w-6 h-6" />
             <h1 className="text-3xl font-bold tracking-tighter">Mortgage Calculator</h1>
          </div>
          <p className="text-white/40 max-w-xl text-sm leading-relaxed">
            Professional-grade mortgage projection engine with full amortization scheduling and equity tracking.
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
        {/* INPUTS PANEL */}
        <section className="bg-white/[0.02] border border-white/5 rounded-2xl p-8 space-y-8">
          <div className="space-y-8">
             <div className="space-y-4">
                <div className="flex justify-between items-center">
                   <label className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Home Price</label>
                   <div className="text-lg font-bold text-white tracking-tighter">{formatCurrency(inputs.homePrice)}</div>
                </div>
                <input 
                  type="range" min="50000" max="5000000" step="10000"
                  value={inputs.homePrice}
                  onChange={(e) => setInputs({ ...inputs, homePrice: Number(e.target.value) })}
                  className="w-full accent-[#0055FF]"
                />
             </div>

             <div className="space-y-4">
               <div className="flex justify-between items-center">
                  <label className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Down Payment (%)</label>
                  <div className="text-lg font-bold text-[#0055FF] tracking-tighter">{inputs.downPaymentPercent}%</div>
               </div>
               <input 
                  type="range" min="0" max="100" step="1"
                  value={inputs.downPaymentPercent}
                  onChange={(e) => {
                    const percent = Number(e.target.value);
                    setInputs({ ...inputs, downPaymentPercent: percent, downPayment: (inputs.homePrice * percent) / 100 });
                  }}
                  className="w-full accent-[#0055FF]"
               />
             </div>

             <div className="grid grid-cols-2 gap-8">
               <div className="space-y-4">
                  <label className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Interest Rate</label>
                  <div className="flex items-center gap-2 bg-black/40 p-3 rounded-xl border border-white/5">
                    <input 
                      type="number" step="0.1" value={inputs.interestRate}
                      onChange={(e) => setInputs({ ...inputs, interestRate: Number(e.target.value) })}
                      className="bg-transparent border-none text-white font-bold w-full outline-none"
                    />
                    <span className="text-[#0055FF] font-bold">%</span>
                  </div>
               </div>
               <div className="space-y-4">
                  <label className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Loan Term</label>
                  <div className="flex items-center gap-2 bg-black/40 p-3 rounded-xl border border-white/5">
                    <select 
                      value={inputs.loanTerm}
                      onChange={(e) => setInputs({ ...inputs, loanTerm: Number(e.target.value) })}
                      className="bg-transparent border-none text-white font-bold w-full outline-none appearance-none cursor-pointer"
                    >
                      {[10, 15, 20, 25, 30].map(yr => <option key={yr} value={yr} className="bg-black">{yr} Years</option>)}
                    </select>
                  </div>
               </div>
             </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
            <div className="p-4 bg-[#0055FF]/5 rounded-xl border border-[#0055FF]/10">
                <div className="text-[8px] text-[#0055FF] font-bold uppercase tracking-widest mb-1">Monthly Payment</div>
                <div className="text-2xl font-bold text-white tracking-tighter">{formatCurrency(results.monthlyPayment)}</div>
            </div>
            <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                <div className="text-[8px] text-white/20 font-bold uppercase tracking-widest mb-1">Total Loan Amount</div>
                <div className="text-2xl font-bold text-white/40 tracking-tighter">{formatCurrency(inputs.homePrice - inputs.downPayment)}</div>
            </div>
          </div>
        </section>

        {/* VISUALIZATION PANEL */}
        <section className="bg-white/[0.02] border border-white/5 rounded-2xl p-8 flex flex-col justify-between overflow-hidden">
          {isMounted && (
            <>
              <div className="flex items-start justify-between mb-8">
                 <div>
                   <h3 className="font-bold text-white">Payment Distribution</h3>
                   <p className="text-[10px] text-white/20 uppercase tracking-widest font-bold">Principal vs Interest Analysis</p>
                 </div>
                 <div className="p-2 bg-[#0055FF]/10 rounded-lg">
                   <Info className="w-4 h-4 text-[#0055FF]" />
                 </div>
              </div>

              <div className="flex-1 flex items-center justify-center">
                  <ResponsiveContainer width={240} height={240}>
                    <PieChart>
                      <Pie
                        data={[
                          { name: 'Principal', value: inputs.homePrice - inputs.downPayment },
                          { name: 'Interest', value: results.totalInterest },
                        ]}
                        cx="50%" cy="50%" innerRadius={70} outerRadius={90} paddingAngle={5} dataKey="value" stroke="none" isAnimationActive={false}
                      >
                        <Cell fill="#FFFFFF" />
                        <Cell fill="#0055FF" />
                      </Pie>
                      <RechartsTooltip contentStyle={{ backgroundColor: '#111', border: '1px solid #333', fontSize: '10px' }} />
                    </PieChart>
                  </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="text-center">
                   <div className="text-[10px] text-white/20 font-bold uppercase tracking-widest">Total Interest</div>
                   <div className="text-lg font-bold text-[#0055FF] tracking-tighter">{formatCurrency(results.totalInterest)}</div>
                </div>
                <div className="text-center">
                   <div className="text-[10px] text-white/20 font-bold uppercase tracking-widest">Total Payable</div>
                   <div className="text-lg font-bold text-white tracking-tighter">{formatCurrency(results.totalPayment)}</div>
                </div>
              </div>
            </>
          )}
        </section>
      </div>

      {/* AMORTIZATION CHART */}
      <section className="bg-white/[0.02] border border-white/5 rounded-2xl p-8 overflow-hidden h-[450px]">
        <div className="flex items-center justify-between mb-8">
          <h3 className="font-bold text-white">Amortization Projection</h3>
          <div className="flex items-center gap-4">
             <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#0055FF]"></div>
                <span className="text-[10px] font-bold text-white/40 uppercase">Balance</span>
             </div>
             <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-white"></div>
                <span className="text-[10px] font-bold text-white/40 uppercase">Equity</span>
             </div>
          </div>
        </div>
        
        {isMounted && (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={results.amortizationSchedule} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
              <XAxis 
                dataKey="period" stroke="#ffffff10" fontSize={10} tickLine={false} axisLine={false} dy={10} 
                tickFormatter={(val) => `Yr ${val / 12}`}
              />
              <YAxis stroke="#ffffff10" fontSize={10} tickLine={false} axisLine={false} tickFormatter={(val) => `${currencySymbol}${(val / 1000).toFixed(0)}k`} />
              <RechartsTooltip contentStyle={{ backgroundColor: '#111', border: '1px solid #333', fontSize: '10px' }} />
              <Line type="monotone" dataKey="remainingBalance" stroke="#0055FF" strokeWidth={3} dot={false} isAnimationActive={false} />
              <Line type="monotone" dataKey="totalInterestPaid" stroke="#FFFFFF20" strokeWidth={2} dot={false} isAnimationActive={false} />
            </LineChart>
          </ResponsiveContainer>
        )}
      </section>

      <SEOSection 
        title="Mortgage Calculator"
        howTo={[
          "Enter total home price and your down payment amount.",
          "Input current bank interest rates (e.g. 6.5%).",
          "Select the loan tenure (default is typically 30 years).",
          "Review the amortization schedule to see how equity builds over time."
        ]}
        formula="M = P [ i(1 + i)^n ] / [ (1 + i)^n – 1 ]"
        benefits={[
          "Understand the long-term cost of borrowing.",
          "Visualize the impact of extra payments on your loan term.",
          "Compare different down payment scenarios to avoid PMI.",
          "Download a full bank-ready amortization schedule."
        ]}
      />
    </div>
  );
}
