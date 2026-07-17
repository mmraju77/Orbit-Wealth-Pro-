/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { CreditCard, Download, AlertTriangle, ArrowRight, Zap } from 'lucide-react';
import { useLocale } from '../context/LocaleContext';
import jsPDF from 'jspdf';
import SEOSection from './SEOSection';
import AIAdvisor from './AIAdvisor';
import CurrencyInput from './CurrencyInput';
import NumericInput from './NumericInput';

export default function CreditCardPayoff() {
  const { formatCurrency } = useLocale();
  const [balance, setBalance] = useState(50000);
  const [interestRate, setInterestRate] = useState(24);
  const [monthlyPayment, setMonthlyPayment] = useState(2500);

  const results = useMemo(() => {
    let currentBalance = balance;
    let months = 0;
    let totalInterest = 0;
    const monthlyRate = (interestRate / 100) / 12;

    if (monthlyPayment <= currentBalance * monthlyRate) return null;

    while (currentBalance > 0 && months < 360) {
      const interest = currentBalance * monthlyRate;
      totalInterest += interest;
      currentBalance = (currentBalance + interest) - monthlyPayment;
      months++;
    }

    return {
      months,
      totalInterest: Math.round(totalInterest),
      years: Number((months / 12).toFixed(1))
    };
  }, [balance, interestRate, monthlyPayment]);

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(22);
    doc.text('Credit Card Payoff Analysis', 20, 20);
    doc.setFontSize(12);
    doc.text(`Current Balance: ${formatCurrency(balance)}`, 20, 40);
    doc.text(`Interest Rate (APR): ${interestRate}%`, 20, 50);
    doc.text(`Planned Monthly Payment: ${formatCurrency(monthlyPayment)}`, 20, 60);
    if (results) {
      doc.text(`Time to Payoff: ${results.months} Months (${results.years} Years)`, 20, 80);
      doc.text(`Total Interest to be Paid: ${formatCurrency(results.totalInterest)}`, 20, 90);
    }
    doc.save('credit-card-report.pdf');
  };

  return (
    <div className="space-y-12 pb-20 text-white">
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 pt-8">
        <header className="space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="h-px w-6 bg-[#D4AF37]"></div>
            <span className="text-base font-bold text-[#D4AF37] uppercase tracking-[0.3em]">Debt Liquidation Engine</span>
          </div>
          <h1 className="text-7xl font-display font-medium text-[#f59e0b] tracking-tight">CC Payoff.</h1>
          <p className="text-white/70 max-w-xl text-lg font-light leading-relaxed">
            Simulate your credit card debt repayment and visualize the true cost of interest over time.
          </p>
        </header>
        <button onClick={downloadPDF} className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/5 rounded-xl text-base font-bold transition-all hover:bg-white/10 shrink-0">
          <Download className="w-4 h-4" /> Export Report
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
        <section className="space-y-10 bg-white/[0.01] border border-white/[0.03] p-10 rounded-[2.5rem]">
           <div className="space-y-8">
              <CurrencyInput 
                label="Card Balance"
                value={balance}
                onChange={setBalance}
                min={500}
                max={1000000}
                step={500}
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                 <div className="space-y-4">
                    <div className="flex justify-between items-center text-base font-bold text-white/70 uppercase tracking-widest">
                       <span>APR (%)</span>
                       <span className="text-[#D4AF37]">{interestRate}%</span>
                    </div>
                    <NumericInput 
                      min={1} max={48} step="1" 
                      value={interestRate} 
                      onChange={setInterestRate} 
                      className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-3 text-white font-bold outline-none mb-4" 
                    />
                    <input aria-label="Adjust value" type="range" min="1" max="48" step="1" value={interestRate} onChange={e => setInterestRate(Number(e.target.value))} className="w-full accent-[#D4AF37]" />
                 </div>
                 <CurrencyInput 
                   label="Monthly Payment"
                   value={monthlyPayment}
                   onChange={setMonthlyPayment}
                   min={100}
                   max={100000}
                   step={100}
                 />
              </div>
           </div>
        </section>

        <section className="flex flex-col gap-8">
           {!results ? (
             <div className="p-10 bg-rose-500/10 border border-rose-500/20 rounded-[2.5rem] flex items-center gap-4 text-rose-500">
                <AlertTriangle className="w-6 h-6 shrink-0" />
                <p className="text-lg font-medium">Warning: Your monthly payment is lower than the interest accruing. Balance will never be paid off.</p>
             </div>
           ) : (
             <>
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="p-10 bg-white/[0.01] border border-white/[0.03] rounded-[2.5rem] text-center space-y-2">
                     <div className="text-base text-white/70 font-bold uppercase tracking-[0.3em]">Months to Payoff</div>
                     <div className="text-7xl font-display font-medium text-white">{results.months}</div>
                  </div>
                  <div className="p-10 bg-rose-500/5 border border-rose-500/10 rounded-[2.5rem] text-center space-y-2">
                     <div className="text-base text-rose-500 font-bold uppercase tracking-[0.3em]">Interest Drain</div>
                     <div className="text-7xl font-display font-medium text-rose-500 tracking-tighter">{formatCurrency(results.totalInterest)}</div>
                  </div>
               </div>

               <div className="p-8 bg-white/[0.01] border border-white/5 rounded-[2rem] flex items-center justify-between">
                  <div className="flex items-center gap-4">
                     <div className="w-10 h-10 rounded-full bg-[#D4AF37]/10 flex items-center justify-center">
                        <Zap className="w-5 h-5 text-[#D4AF37]" />
                     </div>
                     <div className="space-y-1">
                        <div className="text-sm text-white/70 font-bold uppercase">Repayment Duration</div>
                        <div className="text-2xl font-bold">{results.years} Years</div>
                     </div>
                  </div>
                  <ArrowRight className="text-white/5 w-8 h-8" />
               </div>
             </>
           )}

           <AIAdvisor context={`Credit card balance of ${balance} at ${interestRate}% APR. User is paying ${monthlyPayment} monthly. Results: ${results ? results.months + ' months' : 'Never paid off'}.`} />
        </section>
      </div>

      <SEOSection 
        title="Credit Card Payoff Calculator - Save on Interest"
        howTo={[
          "Enter your current credit card balance from your statement.",
          "Identify your APR (Annual Percentage Rate). Note: This is usually much higher than personal loans.",
          "Set your planned monthly payment amount.",
          "Analyze how long it takes and exactly how much you're 'throwing away' in interest."
        ]}
        formula="New Balance = (Current Balance * (1 + Monthly Rate)) - Payment"
        benefits={[
          "Understand the 'Minimum Payment Trap'.",
          "Visualize the benefit of adding even $50 extra to your payment.",
          "Strategize balance transfers by seeing current interest drain.",
          "Essential tool for debt consolidation planning."
        ]}
      />
    </div>
  );
}
