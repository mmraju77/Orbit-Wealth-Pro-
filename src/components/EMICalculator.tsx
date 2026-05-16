import React, { useState, useMemo, useEffect } from 'react';
import { CreditCard, Download, Share2 } from 'lucide-react';
import { useLocale } from '../context/LocaleContext';
import { MortgageInputs } from '../types';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip } from 'recharts';
import jsPDF from 'jspdf';
import SEOSection from './SEOSection';

const INITIAL_INPUTS: MortgageInputs = {
  homePrice: 500000,
  downPayment: 100000,
  downPaymentPercent: 20,
  interestRate: 6.5,
  loanTerm: 20
};

export default function EMICalculator() {
  const { formatCurrency, labels } = useLocale();
  const [inputs, setInputs] = useState<MortgageInputs>(INITIAL_INPUTS);
  const [isMounted, setIsMounted] = useState(false);

  const results = useMemo(() => {
    const principal = inputs.homePrice - inputs.downPayment;
    const monthlyRate = inputs.interestRate / 100 / 12;
    const months = inputs.loanTerm * 12;

    if (monthlyRate === 0) {
      const emi = principal / months;
      return {
        monthlyPayment: Math.round(emi),
        totalPayment: Math.round(principal),
        totalInterest: 0,
        principal
      };
    }

    const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
    const totalPayment = emi * months;
    const totalInterest = totalPayment - principal;

    return {
      monthlyPayment: Math.round(emi),
      totalPayment: Math.round(totalPayment),
      totalInterest: Math.round(totalInterest),
      principal
    };
  }, [inputs]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(22);
    doc.text('ORBIT WEALTH PRO: EMI Report', 20, 20);
    doc.setFontSize(12);
    doc.text(`Loan Amount: ${formatCurrency(results.principal)}`, 20, 40);
    doc.text(`Interest Rate: ${inputs.interestRate}%`, 20, 50);
    doc.text(`Tenure: ${inputs.loanTerm} years`, 20, 60);
    doc.text(`Monthly EMI: ${formatCurrency(results.monthlyPayment)}`, 20, 80);
    doc.text(`Total Interest: ${formatCurrency(results.totalInterest)}`, 20, 90);
    doc.text(`Total Payable: ${formatCurrency(results.totalPayment)}`, 20, 100);
    doc.save('emi-calculation.pdf');
  };

  return (
    <div className="space-y-8 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <header className="space-y-2">
          <div className="flex items-center gap-2 mb-4">
             <CreditCard className="text-[#D4AF37] w-6 h-6" />
             <h1 className="text-3xl font-bold tracking-tighter text-white">EMI Global Calculator</h1>
          </div>
          <p className="text-white/40 max-w-xl text-sm leading-relaxed">
            Equated Monthly Installment tool for personal, car, or home loans across multiple regions.
          </p>
        </header>

        <div className="flex items-center gap-2">
          <button onClick={downloadPDF} className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/5 rounded-lg text-xs font-bold transition-all">
            <Download className="w-4 h-4" /> PDF
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#D4AF37] hover:bg-[#D4AF37]/90 rounded-lg text-xs font-bold transition-all shadow-lg shadow-[#D4AF37]/20">
            <Share2 className="w-4 h-4" /> Share
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <section className="bg-white/[0.02] border border-white/5 rounded-2xl p-8 space-y-8">
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Loan Amount</label>
                <div className="text-lg font-bold text-[#D4AF37] tracking-tighter">{formatCurrency(inputs.homePrice - inputs.downPayment)}</div>
              </div>
              <input 
                type="range" min="1000" max="10000000" step="1000"
                value={inputs.homePrice - inputs.downPayment}
                onChange={(e) => setInputs({ ...inputs, homePrice: Number(e.target.value) + inputs.downPayment })}
                className="w-full accent-[#D4AF37]"
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Interest Rate (%)</label>
                <div className="text-lg font-bold text-[#D4AF37] tracking-tighter">{inputs.interestRate}%</div>
              </div>
              <input 
                type="range" min="1" max="25" step="0.1"
                value={inputs.interestRate}
                onChange={(e) => setInputs({ ...inputs, interestRate: Number(e.target.value) })}
                className="w-full accent-[#D4AF37]"
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Loan Tenure (Years)</label>
                <div className="text-lg font-bold text-[#D4AF37] tracking-tighter">{inputs.loanTerm} Yr</div>
              </div>
              <input 
                type="range" min="1" max="30" step="1"
                value={inputs.loanTerm}
                onChange={(e) => setInputs({ ...inputs, loanTerm: Number(e.target.value) })}
                className="w-full accent-[#D4AF37]"
              />
            </div>
          </div>
        </section>

        <section className="bg-white/[0.02] border border-white/5 rounded-2xl p-8 flex flex-col items-center justify-center min-h-[400px]">
          {isMounted && (
            <div className="w-full flex-col flex items-center justify-center gap-12">
               <div className="relative w-[250px] h-[250px]">
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 flex-col">
                    <div className="text-[10px] text-white/30 font-bold uppercase tracking-widest">Monthly EMI</div>
                    <div className="text-2xl font-bold text-white tracking-tighter">{formatCurrency(results.monthlyPayment)}</div>
                  </div>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          { name: 'Principal', value: results.principal },
                          { name: 'Interest', value: results.totalInterest },
                        ]}
                        cx="50%" cy="50%" innerRadius={80} outerRadius={110} paddingAngle={5} dataKey="value" stroke="none" isAnimationActive={false}
                      >
                        <Cell fill="#FFFFFF" />
                        <Cell fill="#D4AF37" />
                      </Pie>
                      <RechartsTooltip contentStyle={{ backgroundColor: '#111', border: '1px solid #333', fontSize: '10px' }} />
                    </PieChart>
                  </ResponsiveContainer>
               </div>
               
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-8 w-full border-t border-white/5 pt-8 px-4">
                 <div className="text-center">
                    <div className="text-[10px] text-white/20 font-bold uppercase tracking-widest mb-1">Total Interest</div>
                    <div className="text-xl font-bold text-[#D4AF37]">{formatCurrency(results.totalInterest)}</div>
                 </div>
                 <div className="text-center">
                    <div className="text-[10px] text-white/20 font-bold uppercase tracking-widest mb-1">Total Payable</div>
                    <div className="text-xl font-bold text-white">{formatCurrency(results.totalPayment)}</div>
                 </div>
               </div>
            </div>
          )}
        </section>
      </div>

      <SEOSection 
        title="EMI Global Calculator"
        howTo={[
          "Select the total loan amount you intend to borrow.",
          "Input the annual interest rate offered by your bank.",
          "Choose the repayment tenure in years or months.",
          "Our engine calculates the Equated Monthly Installment (EMI) instantaneously."
        ]}
        formula="E = [P x R x (1+R)^N] / [((1+R)^N)-1]"
        benefits={[
          "Helps in planning monthly cash flows with exact payment data.",
          "Optimize your loan tenure to minimize interest burden.",
          "Easily compare different landing offers from multiple institutions.",
          "Includes a breakdown of total interest versus principal amount."
        ]}
      />
    </div>
  );
}
