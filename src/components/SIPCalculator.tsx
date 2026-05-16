import React, { useState, useMemo, useEffect } from 'react';
import { TrendingUp, Copy, Check, Download, Share2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLocale } from '../context/LocaleContext';
import { InvestmentInputs, InvestmentResult } from '../types';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip as RechartsTooltip } from 'recharts';
import jsPDF from 'jspdf';
import SEOSection from './SEOSection';
import Tooltip from './Tooltip';
import AIAdvisor from './AIAdvisor';

const INITIAL_INPUTS: InvestmentInputs = {
  investmentAmount: 0, // Not used for base SIP, usually SIP is monthly
  monthlyInvestment: 5000,
  expectedReturn: 12,
  duration: 10
};

export default function SIPCalculator() {
  const { formatCurrency, currencySymbol } = useLocale();
  const [inputs, setInputs] = useState<InvestmentInputs>(INITIAL_INPUTS);
  const [copied, setCopied] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const results = useMemo(() => {
    const monthlyRate = inputs.expectedReturn / 100 / 12;
    const months = inputs.duration * 12;
    const monthlyInvestment = inputs.monthlyInvestment || 0;

    // Formula: M = P × ({[1 + i]^n – 1} / i) × (1 + i)
    const maturityValue = monthlyInvestment * 
      ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * 
      (1 + monthlyRate);

    const totalInvested = monthlyInvestment * months;
    const estimatedReturns = maturityValue - totalInvested;

    const yearlyData = [];
    for (let i = 1; i <= inputs.duration; i++) {
        const monthsCount = i * 12;
        const value = monthlyInvestment * 
            ((Math.pow(1 + monthlyRate, monthsCount) - 1) / monthlyRate) * 
            (1 + monthlyRate);
        yearlyData.push({ year: i, balance: Math.round(value) });
    }

    return {
      investedAmount: Math.round(totalInvested),
      estimatedReturns: Math.round(estimatedReturns),
      totalWealth: Math.round(maturityValue),
      yearlyData
    };
  }, [inputs]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(22);
    doc.text('ORBIT WEALTH PRO: SIP Report', 20, 20);
    doc.setFontSize(12);
    doc.text(`Monthly Investment: ${formatCurrency(inputs.monthlyInvestment || 0)}`, 20, 40);
    doc.text(`Expected Return: ${inputs.expectedReturn}%`, 20, 50);
    doc.text(`Duration: ${inputs.duration} years`, 20, 60);
    doc.text(`Total Invested: ${formatCurrency(results.investedAmount)}`, 20, 80);
    doc.text(`Wealth Gained: ${formatCurrency(results.estimatedReturns)}`, 20, 90);
    doc.text(`Maturity Value: ${formatCurrency(results.totalWealth)}`, 20, 100);
    doc.save('sip-calculation.pdf');
  };

  return (
    <div className="space-y-12 pb-20">
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 pt-8">
        <header className="space-y-4">
          <div className="flex items-center gap-2 mb-2">
             <div className="h-px w-6 bg-[#D4AF37]"></div>
             <span className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-[0.3em]">Capital Growth Analysis</span>
          </div>
          <h1 className="text-5xl font-display font-medium text-white tracking-tight">SIP Intelligence.</h1>
          <p className="text-white/40 max-w-xl text-sm font-light leading-relaxed">
            Project your wealth growth via Systematic Investment Plans using our high-precision compound return engine.
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
        {/* INPUTS */}
        <section className="bg-white/[0.02] border border-white/5 rounded-2xl p-8 space-y-8">
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Monthly Investment</label>
                <div className="text-lg font-bold text-[#D4AF37] tracking-tighter">{formatCurrency(inputs.monthlyInvestment || 0)}</div>
              </div>
              <input 
                type="range" min="500" max="100000" step="500"
                value={inputs.monthlyInvestment}
                onChange={(e) => setInputs({ ...inputs, monthlyInvestment: Number(e.target.value) })}
                className="w-full accent-[#D4AF37]"
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Expected Return (%)</label>
                <div className="text-lg font-bold text-[#D4AF37] tracking-tighter">{inputs.expectedReturn}%</div>
              </div>
              <input 
                type="range" min="1" max="30" step="0.5"
                value={inputs.expectedReturn}
                onChange={(e) => setInputs({ ...inputs, expectedReturn: Number(e.target.value) })}
                className="w-full accent-[#D4AF37]"
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Investment Period (Years)</label>
                <div className="text-lg font-bold text-[#D4AF37] tracking-tighter">{inputs.duration} Yr</div>
              </div>
              <input 
                type="range" min="1" max="40" step="1"
                value={inputs.duration}
                onChange={(e) => setInputs({ ...inputs, duration: Number(e.target.value) })}
                className="w-full accent-[#D4AF37]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-white/5">
            <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                <div className="text-[8px] text-white/20 font-bold uppercase tracking-widest mb-1">Invested Amount</div>
                <div className="text-lg font-bold text-white tracking-tighter">{formatCurrency(results.investedAmount)}</div>
            </div>
            <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                <div className="text-[8px] text-white/20 font-bold uppercase tracking-widest mb-1">Return Amount</div>
                <div className="text-lg font-bold text-[#D4AF37] tracking-tighter">{formatCurrency(results.estimatedReturns)}</div>
            </div>
          </div>
        </section>

        {/* VISUALIZATION */}
        <section className="bg-white/[0.02] border border-white/5 rounded-2xl p-8 flex flex-col items-center justify-center min-h-[400px]">
          {isMounted && (
            <div className="w-full h-full min-h-[300px]">
               <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={results.yearlyData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#D4AF37" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                  <XAxis dataKey="year" stroke="#ffffff10" fontSize={10} tickLine={false} axisLine={false} dy={10} />
                  <YAxis stroke="#ffffff10" fontSize={10} tickLine={false} axisLine={false} tickFormatter={(val) => `${currencySymbol}${(val / 1000).toFixed(0)}k`} />
                  <RechartsTooltip 
                    contentStyle={{ backgroundColor: '#111', border: '1px solid #333', fontSize: '10px' }}
                    labelStyle={{ color: '#white/40', marginBottom: '4px' }}
                  />
                  <Area type="monotone" dataKey="balance" stroke="#D4AF37" strokeWidth={3} fillOpacity={1} fill="url(#colorVal)" isAnimationActive={false} />
                </AreaChart>
              </ResponsiveContainer>
              <div className="mt-8 text-center">
                <div className="text-[10px] text-white/20 font-bold uppercase tracking-widest mb-1">Maturity Value</div>
                <div className="text-4xl font-bold text-white tracking-widest">{formatCurrency(results.totalWealth)}</div>
              </div>
              
              <div className="px-4">
                <AIAdvisor context={`Monthly SIP of ${inputs.monthlyInvestment} at ${inputs.expectedReturn}% for ${inputs.duration} years. Total maturity value: ${results.totalWealth}.`} />
              </div>
            </div>
          )}
        </section>
      </div>

      <SEOSection 
        title="SIP Calculator"
        howTo={[
          "Enter the amount you wish to invest every month.",
          "Select the expected annual rate of return based on your asset class.",
          "Slide to choose the duration for which you want to keep investing.",
          "Our engine will instantly calculate the maturity value and total wealth gained."
        ]}
        formula="M = P × ({[1 + i]^n – 1} / i) × (1 + i)"
        benefits={[
          "Helps in disciplined investing by visualizing future returns.",
          "Takes advantage of rupee-cost averaging in volatile markets.",
          "Enables long-term wealth creation through the power of compounding.",
          "Calculates exact maturity value for specific financial goals."
        ]}
      />
    </div>
  );
}
