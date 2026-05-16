/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from 'react';
import { Car, Download, Info, Percent } from 'lucide-react';
import { useLocale } from '../context/LocaleContext';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip } from 'recharts';
import jsPDF from 'jspdf';
import SEOSection from './SEOSection';

export default function AutoLoanCalculator() {
  const { formatCurrency } = useLocale();
  const [carPrice, setCarPrice] = useState(35000);
  const [downPayment, setDownPayment] = useState(5000);
  const [tradeIn, setTradeIn] = useState(2000);
  const [salesTax, setSalesTax] = useState(7); // Percent
  const [interestRate, setInterestRate] = useState(5.5);
  const [tenure, setTenure] = useState(60); // Months
  const [isMounted, setIsMounted] = useState(false);

  const results = useMemo(() => {
    const taxAmount = (carPrice * salesTax) / 100;
    const loanAmount = carPrice + taxAmount - downPayment - tradeIn;
    const monthlyRate = interestRate / 100 / 12;
    
    let emi = 0;
    if (monthlyRate === 0) {
      emi = loanAmount / tenure;
    } else {
      emi = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, tenure)) / (Math.pow(1 + monthlyRate, tenure) - 1);
    }

    const totalPayment = emi * tenure;
    const totalInterest = totalPayment - loanAmount;

    return {
      taxAmount: Math.round(taxAmount),
      loanAmount: Math.round(Math.max(0, loanAmount)),
      emi: Math.round(Math.max(0, emi)),
      totalPayment: Math.round(totalPayment),
      totalInterest: Math.round(totalInterest)
    };
  }, [carPrice, downPayment, tradeIn, salesTax, interestRate, tenure]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(22);
    doc.text('ORBIT WEALTH PRO: Auto Loan Analysis', 20, 20);
    doc.setFontSize(12);
    doc.text(`Car Price: ${formatCurrency(carPrice)}`, 20, 40);
    doc.text(`Sales Tax: ${salesTax}% (${formatCurrency(results.taxAmount)})`, 20, 50);
    doc.text(`Down Payment: ${formatCurrency(downPayment)}`, 20, 60);
    doc.text(`Trade-in Value: ${formatCurrency(tradeIn)}`, 20, 70);
    doc.text(`Loan Amount: ${formatCurrency(results.loanAmount)}`, 20, 80);
    doc.text(`Monthly EMI: ${formatCurrency(results.emi)} over ${tenure} months`, 20, 100);
    doc.text(`Total Interest: ${formatCurrency(results.totalInterest)}`, 20, 110);
    doc.save('auto-loan-report.pdf');
  };

  return (
    <div className="space-y-8 pb-20 text-white">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <header className="space-y-2">
          <div className="flex items-center gap-2 mb-4">
             <Car className="text-[#D4AF37] w-6 h-6" />
             <h1 className="text-3xl font-bold tracking-tighter">Auto Loan Calculator</h1>
          </div>
          <p className="text-white/40 max-w-xl text-sm leading-relaxed">
            Calculate your monthly car payments while accounting for sales tax, trade-ins, and down payments.
          </p>
        </header>

        <button onClick={downloadPDF} className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/5 rounded-lg text-xs font-bold transition-all">
          <Download className="w-4 h-4" /> Download Report
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <section className="bg-white/[0.02] border border-white/5 rounded-2xl p-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <div className="space-y-4">
                <label className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Car Price</label>
                <div className="flex items-center gap-2 bg-black/40 p-3 rounded-xl border border-white/5">
                   <input 
                     type="number" value={carPrice}
                     onChange={(e) => setCarPrice(Number(e.target.value))}
                     className="bg-transparent border-none text-white font-bold w-full outline-none text-lg"
                   />
                </div>
             </div>
             <div className="space-y-4">
                <label className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Sales Tax (%)</label>
                <div className="flex items-center gap-2 bg-black/40 p-3 rounded-xl border border-white/5">
                   <input 
                     type="number" value={salesTax}
                     onChange={(e) => setSalesTax(Number(e.target.value))}
                     className="bg-transparent border-none text-white font-bold w-full outline-none text-lg"
                   />
                   <Percent className="w-4 h-4 text-[#D4AF37]" />
                </div>
             </div>
             <div className="space-y-4">
                <label className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Down Payment</label>
                <div className="flex items-center gap-2 bg-black/40 p-3 rounded-xl border border-white/5">
                   <input 
                     type="number" value={downPayment}
                     onChange={(e) => setDownPayment(Number(e.target.value))}
                     className="bg-transparent border-none text-white font-bold w-full outline-none text-lg"
                   />
                </div>
             </div>
             <div className="space-y-4">
                <label className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Trade-in Value</label>
                <div className="flex items-center gap-2 bg-black/40 p-3 rounded-xl border border-white/5">
                   <input 
                     type="number" value={tradeIn}
                     onChange={(e) => setTradeIn(Number(e.target.value))}
                     className="bg-transparent border-none text-white font-bold w-full outline-none text-lg"
                   />
                </div>
             </div>
          </div>

          <div className="space-y-6 pt-6 border-t border-white/5">
             <div className="space-y-4">
                <div className="flex justify-between items-center text-[10px] font-bold text-white/20 uppercase tracking-widest">
                   <span>Interest Rate</span>
                   <span className="text-[#D4AF37]">{interestRate}%</span>
                </div>
                <input 
                  type="range" min="0" max="20" step="0.1"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full accent-[#D4AF37]"
                />
             </div>
             <div className="space-y-4">
                <div className="flex justify-between items-center text-[10px] font-bold text-white/20 uppercase tracking-widest">
                   <span>Loan Term ({tenure} months)</span>
                   <span className="text-white">{tenure / 12} Years</span>
                </div>
                <input 
                  type="range" min="12" max="84" step="12"
                  value={tenure}
                  onChange={(e) => setTenure(Number(e.target.value))}
                  className="w-full accent-[#D4AF37]"
                />
             </div>
          </div>
        </section>

        <section className="bg-white/[0.02] border border-white/5 rounded-2xl p-8 flex flex-col justify-between">
           <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                 <div className="p-6 bg-[#D4AF37]/10 rounded-2xl border border-[#D4AF37]/20 text-center">
                    <div className="text-[10px] text-[#D4AF37] font-bold uppercase tracking-widest mb-1">Monthly Payment</div>
                    <div className="text-3xl font-bold text-white">{formatCurrency(results.emi)}</div>
                 </div>
                 <div className="p-6 bg-white/5 rounded-2xl border border-white/5 text-center">
                    <div className="text-[10px] text-white/20 font-bold uppercase tracking-widest mb-1">Total Loan</div>
                    <div className="text-3xl font-bold text-white/60">{formatCurrency(results.loanAmount)}</div>
                 </div>
              </div>

              <div className="p-6 bg-white/[0.01] border border-white/5 rounded-2xl space-y-4">
                 <div className="flex items-center gap-2 mb-4">
                    <Info className="w-4 h-4 text-[#D4AF37]" />
                    <h4 className="text-xs font-bold text-white uppercase tracking-widest">Summary Breakdown</h4>
                 </div>
                 <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                       <span className="text-white/40">Vehicle Sales Tax:</span>
                       <span className="text-white font-bold">{formatCurrency(results.taxAmount)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                       <span className="text-white/40">Total Acquisition Cost:</span>
                       <span className="text-white font-bold">{formatCurrency(carPrice + results.taxAmount)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                       <span className="text-white/40">Total Interest Paid:</span>
                       <span className="text-white text-[#D4AF37] font-bold">{formatCurrency(results.totalInterest)}</span>
                    </div>
                    <div className="flex justify-between text-sm pt-3 border-t border-white/5">
                       <span className="text-white font-bold">Total Cost of Ownership:</span>
                       <span className="text-white font-bold">{formatCurrency(results.totalPayment + downPayment + tradeIn)}</span>
                    </div>
                 </div>
              </div>

              <div className="h-32 flex items-center justify-center">
                {isMounted && (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          { name: 'Loan Base', value: results.loanAmount },
                          { name: 'Interest', value: results.totalInterest },
                          { name: 'Tax', value: results.taxAmount },
                        ]}
                        cx="50%" cy="50%" innerRadius={40} outerRadius={60} paddingAngle={5} dataKey="value" stroke="none" isAnimationActive={false}
                      >
                        <Cell fill="#FFFFFF" />
                        <Cell fill="#D4AF37" />
                        <Cell fill="#FFFFFF40" />
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                )}
              </div>
           </div>
        </section>
      </div>

      <SEOSection 
        title="Auto & Car Loan Calculator"
        howTo={[
          "Input the sticker price of the car or vehicle.",
          "Add your local sales tax percentage to get a realistic loan amount.",
          "Enter any Down Payment or Trade-in credit you have.",
          "Check the monthly EMI against your household budget."
        ]}
        formula="Monthly Payment = [P x R x (1+R)^N] / [((1+R)^N)-1]"
        benefits={[
          "Compare dealer financing vs bank loans easily.",
          "Factor in 'Hidden Costs' like sales tax from the start.",
          "Optimize your loan term (e.g. 60 vs 72 months) to balance monthly cost and total interest.",
          "Includes a complete acquisition summary including tax and trade-in value."
        ]}
      />
    </div>
  );
}
