/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from 'react';
import { GraduationCap, Download, Calendar, ArrowRight } from 'lucide-react';
import { useLocale } from '../context/LocaleContext';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip as RechartsTooltip } from 'recharts';
import jsPDF from 'jspdf';
import SEOSection from './SEOSection';

export default function StudentLoanCalculator() {
  const { formatCurrency, currencySymbol } = useLocale();
  const [loanAmount, setLoanAmount] = useState(50000);
  const [interestRate, setInterestRate] = useState(4.8);
  const [tenure, setTenure] = useState(10); // Years
  const [gracePeriod, setGracePeriod] = useState(6); // Months
  const [isMounted, setIsMounted] = useState(false);

  const results = useMemo(() => {
    // During grace period, interest usually accrues (capitalization)
    const monthlyRate = interestRate / 100 / 12;
    
    // Capitalized principal after grace period
    const capitalizedPrincipal = loanAmount * Math.pow(1 + monthlyRate, gracePeriod);
    const months = tenure * 12;

    let emi = 0;
    if (monthlyRate === 0) {
      emi = capitalizedPrincipal / months;
    } else {
      emi = (capitalizedPrincipal * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
    }

    const totalPayment = emi * months;
    const totalInterest = totalPayment - loanAmount;

    // Projection Data
    const projection = [];
    let currentBalance = loanAmount;
    
    // Grace Period phase
    for (let i = 1; i <= gracePeriod; i++) {
        currentBalance *= (1 + monthlyRate);
        projection.push({ month: i, balance: Math.round(currentBalance), phase: 'Grace' });
    }
    
    // Repayment phase
    for (let i = 1; i <= months; i += 6) { // step by 6 months for chart performance
        const interest = currentBalance * (Math.pow(1 + monthlyRate, 6) - 1);
        const totalPaid = emi * 6;
        currentBalance = currentBalance + interest - totalPaid;
        projection.push({ month: gracePeriod + i, balance: Math.max(0, Math.round(currentBalance)), phase: 'Repayment' });
    }

    return {
      emi: Math.round(emi),
      totalPayable: Math.round(totalPayment),
      totalInterest: Math.round(totalInterest),
      capitalizedPrincipal: Math.round(capitalizedPrincipal),
      projection
    };
  }, [loanAmount, interestRate, tenure, gracePeriod]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(22);
    doc.text('ORBIT WEALTH PRO: Student Loan Forecast', 20, 20);
    doc.setFontSize(12);
    doc.text(`Initial Loan: ${formatCurrency(loanAmount)}`, 20, 40);
    doc.text(`Interest Rate: ${interestRate}%`, 20, 50);
    doc.text(`Grace Period: ${gracePeriod} months`, 20, 60);
    doc.text(`Effective Principal: ${formatCurrency(results.capitalizedPrincipal)}`, 20, 70);
    doc.text(`Monthly Payment: ${formatCurrency(results.emi)}`, 20, 90);
    doc.text(`Total Cost: ${formatCurrency(results.totalPayable)}`, 20, 100);
    doc.save('student-loan-report.pdf');
  };

  return (
    <div className="space-y-8 pb-20 text-white">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <header className="space-y-2">
          <div className="flex items-center gap-2 mb-4">
             <GraduationCap className="text-[#D4AF37] w-6 h-6" />
             <h1 className="text-3xl font-bold tracking-tighter">Student Loan Calculator</h1>
          </div>
          <p className="text-white/40 max-w-xl text-sm leading-relaxed">
            Estimate your future educational debt repayments including interest capitalization during grace periods or deferment.
          </p>
        </header>

        <button onClick={downloadPDF} className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/5 rounded-lg text-xs font-bold transition-all">
          <Download className="w-4 h-4" /> Export Forecast
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <section className="bg-white/[0.02] border border-white/5 rounded-2xl p-8 space-y-8">
           <div className="space-y-8">
              <div className="space-y-4">
                 <div className="flex justify-between items-center text-[10px] font-bold text-white/20 uppercase tracking-widest">
                    <span>Total Borrowed</span>
                    <span className="text-white text-lg">{formatCurrency(loanAmount)}</span>
                 </div>
                 <input 
                   type="range" min="5000" max="500000" step="5000"
                   value={loanAmount}
                   onChange={(e) => setLoanAmount(Number(e.target.value))}
                   className="w-full accent-[#D4AF37]"
                 />
              </div>

              <div className="grid grid-cols-2 gap-8">
                 <div className="space-y-4">
                    <label className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Interest Rate (%)</label>
                    <input 
                      type="number" step="0.1" value={interestRate}
                      onChange={(e) => setInterestRate(Number(e.target.value))}
                      className="w-full bg-black/40 p-3 rounded-xl border border-white/5 text-white font-bold outline-none"
                    />
                 </div>
                 <div className="space-y-4">
                    <label className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Repayment Term</label>
                    <select 
                      value={tenure}
                      onChange={(e) => setTenure(Number(e.target.value))}
                      className="w-full bg-black/40 p-3 rounded-xl border border-white/5 text-white font-bold outline-none cursor-pointer"
                    >
                      {[5, 10, 15, 20, 25].map(yr => <option key={yr} value={yr} className="bg-black">{yr} Years</option>)}
                    </select>
                 </div>
              </div>

              <div className="pt-6 border-t border-white/5 space-y-4">
                 <div className="flex justify-between items-center text-[10px] font-bold text-[#D4AF37] uppercase tracking-widest">
                    <div className="flex items-center gap-2">
                       <Calendar className="w-3 h-3" />
                       <span>Grace Period (Months)</span>
                    </div>
                    <span>{gracePeriod} Months</span>
                 </div>
                 <input 
                   type="range" min="0" max="48" step="6"
                   value={gracePeriod}
                   onChange={(e) => setGracePeriod(Number(e.target.value))}
                   className="w-full accent-[#D4AF37]"
                 />
              </div>
           </div>
        </section>

        <section className="bg-white/[0.02] border border-white/5 rounded-2xl p-8 space-y-6">
           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-6 bg-[#D4AF37]/10 rounded-2xl border border-[#D4AF37]/20 text-center">
                 <div className="text-[10px] text-[#D4AF37] font-bold uppercase tracking-widest mb-1">Monthly Payment</div>
                 <div className="text-3xl font-bold text-white">{formatCurrency(results.emi)}</div>
              </div>
              <div className="p-6 bg-white/5 rounded-2xl border border-white/5 text-center">
                 <div className="text-[10px] text-white/20 font-bold uppercase tracking-widest mb-1">Total Interest</div>
                 <div className="text-3xl font-bold text-white/60">{formatCurrency(results.totalInterest)}</div>
              </div>
           </div>

           <div className="flex-1 min-h-[250px]">
             {isMounted && (
                <ResponsiveContainer width="100%" height="100%">
                   <AreaChart data={results.projection}>
                      <defs>
                        <linearGradient id="colorBal" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#D4AF37" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                      <XAxis hide dataKey="month" />
                      <YAxis hide domain={['dataMin - 1000', 'dataMax + 1000']} />
                      <RechartsTooltip 
                        contentStyle={{ backgroundColor: '#111', border: '1px solid #333', fontSize: '10px' }}
                        formatter={(val: number) => [formatCurrency(val), 'Balance']}
                        labelFormatter={(label) => `Month: ${label}`}
                      />
                      <Area type="monotone" dataKey="balance" stroke="#D4AF37" fillOpacity={1} fill="url(#colorBal)" isAnimationActive={false} />
                   </AreaChart>
                </ResponsiveContainer>
             )}
           </div>

           <div className="flex items-center justify-between text-[10px] uppercase font-bold tracking-widest pt-4 border-t border-white/5">
              <div className="flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-[#D4AF37]/40"></div>
                 <span className="text-white/40 line-through">{formatCurrency(loanAmount)} Borrowed</span>
              </div>
              <ArrowRight className="w-3 h-3 text-white/20" />
              <div className="flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-[#D4AF37]"></div>
                 <span className="text-white">{formatCurrency(results.totalPayable)} Total Paid</span>
              </div>
           </div>
        </section>
      </div>

      <SEOSection 
        title="Student & Educational Loan Calculator"
        howTo={[
          "Enter the total amount expected to be borrowed for your studies.",
          "Specify the interest rate. If you have government-subsidized loans, it might be 0% during study.",
          "Define the grace period (deferment) before you start working and paying back.",
          "Check the capitalized interest impact if your grace period doesn't have an interest freeze."
        ]}
        formula="Capitalized Principal = P x (1 + r)^g; EMI = [CP x r x (1+r)^N] / [((1+r)^N)-1]"
        benefits={[
          "Forecast long-term debt impact before signing your student loan agreement.",
          "Factor in the 'HECS' (Australia) or 'PAYE' (UK) style considerations of loan growth.",
          "Understand how interest accrues while you are still studying.",
          "Optimize your repayment strategy with exact monthly installment figures."
        ]}
      />
    </div>
  );
}
