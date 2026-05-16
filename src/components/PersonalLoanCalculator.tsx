/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from 'react';
import { Wallet, Download, Share2, Info, TrendingDown } from 'lucide-react';
import { useLocale } from '../context/LocaleContext';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip } from 'recharts';
import jsPDF from 'jspdf';
import SEOSection from './SEOSection';

export default function PersonalLoanCalculator() {
  const { formatCurrency } = useLocale();
  const [principal, setPrincipal] = useState(20000);
  const [interestRate, setInterestRate] = useState(10.5);
  const [tenure, setTenure] = useState(3); // Years
  const [extraPayment, setExtraPayment] = useState(0); // Monthly extra payment
  const [isMounted, setIsMounted] = useState(false);

  const results = useMemo(() => {
    const monthlyRate = interestRate / 100 / 12;
    const months = tenure * 12;

    // Standard EMI
    const emi = monthlyRate === 0 
      ? principal / months 
      : (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);

    // Early Payoff Simulation
    let remainingBalance = principal;
    let totalInterestWithExtra = 0;
    let totalMonthsWithExtra = 0;
    const totalExtraPayment = extraPayment;

    while (remainingBalance > 0 && totalMonthsWithExtra < 600) {
      const interest = remainingBalance * monthlyRate;
      const principalPaid = (emi - interest) + totalExtraPayment;
      
      remainingBalance -= principalPaid;
      totalInterestWithExtra += interest;
      totalMonthsWithExtra++;
      
      if (remainingBalance < 0) {
        // Adjust for final month overpayment
        totalInterestWithExtra += remainingBalance; // subtract the negative overflow from interest
        break;
      }
    }

    const timeSaved = months - totalMonthsWithExtra;
    const interestSaved = (emi * months - principal) - totalInterestWithExtra;

    return {
      emi: Math.round(emi),
      totalPayable: Math.round(emi * months),
      totalInterest: Math.round(emi * months - principal),
      earlyPayoff: {
        months: totalMonthsWithExtra,
        totalInterest: Math.round(totalInterestWithExtra),
        timeSaved: Math.max(0, timeSaved),
        interestSaved: Math.max(0, interestSaved)
      }
    };
  }, [principal, interestRate, tenure, extraPayment]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(22);
    doc.text('ORBIT WEALTH PRO: Personal Loan Report', 20, 20);
    doc.setFontSize(12);
    doc.text(`Principal: ${formatCurrency(principal)}`, 20, 40);
    doc.text(`Interest Rate: ${interestRate}%`, 20, 50);
    doc.text(`Tenure: ${tenure} years`, 20, 60);
    doc.text(`Monthly EMI: ${formatCurrency(results.emi)}`, 20, 80);
    
    if (extraPayment > 0) {
        doc.text(`Extra Monthly Payment: ${formatCurrency(extraPayment)}`, 20, 95);
        doc.text(`New Duration: ${results.earlyPayoff.months} months`, 20, 105);
        doc.text(`Interest Saved: ${formatCurrency(results.earlyPayoff.interestSaved)}`, 20, 115);
    }
    
    doc.save('personal-loan-calc.pdf');
  };

  return (
    <div className="space-y-8 pb-20 text-white">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <header className="space-y-2">
          <div className="flex items-center gap-2 mb-4">
             <Wallet className="text-[#D4AF37] w-6 h-6" />
             <h1 className="text-3xl font-bold tracking-tighter">Personal Loan Calculator</h1>
          </div>
          <p className="text-white/40 max-w-xl text-sm leading-relaxed">
            Plan your personal finances with our smart calculator. Simulate early payoffs to see how much interest you can save.
          </p>
        </header>

        <div className="flex items-center gap-2">
          <button onClick={downloadPDF} className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/5 rounded-lg text-xs font-bold transition-all">
            <Download className="w-4 h-4" /> PDF Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <section className="bg-white/[0.02] border border-white/5 rounded-2xl p-8 space-y-8">
          <div className="space-y-6">
            <div className="space-y-4">
               <div className="flex justify-between items-center">
                  <label className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Loan Amount</label>
                  <div className="text-lg font-bold text-white tracking-tighter">{formatCurrency(principal)}</div>
               </div>
               <input 
                 type="range" min="1000" max="250000" step="1000"
                 value={principal}
                 onChange={(e) => setPrincipal(Number(e.target.value))}
                 className="w-full accent-[#D4AF37]"
               />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
               <div className="space-y-4">
                  <label className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Interest Rate (%)</label>
                  <input 
                    type="number" step="0.1" value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="w-full bg-black/40 p-3 rounded-xl border border-white/5 text-white font-bold outline-none"
                  />
               </div>
               <div className="space-y-4">
                  <label className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Tenure (Years)</label>
                  <select 
                    value={tenure}
                    onChange={(e) => setTenure(Number(e.target.value))}
                    className="w-full bg-black/40 p-3 rounded-xl border border-white/5 text-white font-bold outline-none appearance-none cursor-pointer"
                  >
                    {[1, 2, 3, 4, 5, 7, 10].map(yr => <option key={yr} value={yr} className="bg-black">{yr} Years</option>)}
                  </select>
               </div>
            </div>

            <div className="pt-6 border-t border-white/5 space-y-4">
                <div className="flex justify-between items-center">
                   <div className="flex items-center gap-2">
                      <TrendingDown className="text-emerald-500 w-4 h-4" />
                      <label className="text-[10px] font-bold text-white/60 uppercase tracking-widest">Extra Monthly Payment</label>
                   </div>
                   <div className="text-lg font-bold text-emerald-500 tracking-tighter">{formatCurrency(extraPayment)}</div>
                </div>
                <input 
                  type="range" min="0" max="5000" step="50"
                  value={extraPayment}
                  onChange={(e) => setExtraPayment(Number(e.target.value))}
                  className="w-full accent-emerald-500"
                />
            </div>
          </div>
        </section>

        <section className="bg-white/[0.02] border border-white/5 rounded-2xl p-8 flex flex-col justify-between">
          <div className="space-y-8">
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-6 bg-[#D4AF37]/5 rounded-2xl border border-[#D4AF37]/10 text-center">
                   <div className="text-[10px] text-[#D4AF37] font-bold uppercase tracking-widest mb-1">Standard EMI</div>
                   <div className="text-3xl font-bold text-white">{formatCurrency(results.emi)}</div>
                </div>
                <div className="p-6 bg-white/5 rounded-2xl border border-white/5 text-center">
                   <div className="text-[10px] text-white/20 font-bold uppercase tracking-widest mb-1">Total Interest</div>
                   <div className="text-3xl font-bold text-white/60">{formatCurrency(results.totalInterest)}</div>
                </div>
             </div>

             {extraPayment > 0 && (
                <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-6 space-y-4">
                   <h3 className="text-sm font-bold text-emerald-500 uppercase tracking-widest">Early Payoff Impact</h3>
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                         <div className="text-[10px] text-white/40 font-bold">New Duration</div>
                         <div className="text-xl font-bold text-white">{results.earlyPayoff.months} Months</div>
                         <div className="text-[10px] text-emerald-500">Save {results.earlyPayoff.timeSaved} months</div>
                      </div>
                      <div>
                         <div className="text-[10px] text-white/40 font-bold">Interest Savings</div>
                         <div className="text-xl font-bold text-white">{formatCurrency(results.earlyPayoff.interestSaved)}</div>
                         <div className="text-[10px] text-emerald-500">Money kept in your pocket</div>
                      </div>
                   </div>
                </div>
             )}

             <div className="h-48 flex items-center justify-center">
               {isMounted && (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          { name: 'Principal', value: principal },
                          { name: 'Interest', value: extraPayment > 0 ? results.earlyPayoff.totalInterest : results.totalInterest },
                        ]}
                        cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value" stroke="none" isAnimationActive={false}
                      >
                        <Cell fill="#FFFFFF" />
                        <Cell fill="#D4AF37" />
                      </Pie>
                      <RechartsTooltip contentStyle={{ backgroundColor: '#111', border: '1px solid #333', fontSize: '10px' }} />
                    </PieChart>
                  </ResponsiveContainer>
               )}
             </div>
          </div>
        </section>
      </div>

      <SEOSection 
        title="Personal Loan & Early Payoff Calculator"
        howTo={[
          "Enter your total loan amount (Principal).",
          "Specify the interest rate agreed with your lender.",
          "Select the loan tenure in years.",
          "Use the 'Extra Payment' slider to see how paying more monthly can significantly reduce your interest burden and loan duration."
        ]}
        formula="Standard EMI: E = [P x R x (1+R)^N] / [((1+R)^N)-1]"
        benefits={[
          "Analyze the cost of unsecured borrowing.",
          "Empower yourself with early payoff strategies.",
          "Understand the 'Time Value of Money' in your debt reduction.",
          "Visual breakdown of principal vs interest components."
        ]}
      />
    </div>
  );
}
