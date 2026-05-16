import React, { useState, useMemo, useEffect } from 'react';
import { BarChart3, Download, Share2 } from 'lucide-react';
import { useLocale } from '../context/LocaleContext';
import { InvestmentInputs } from '../types';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip as RechartsTooltip } from 'recharts';
import jsPDF from 'jspdf';
import SEOSection from './SEOSection';

const INITIAL_INPUTS: InvestmentInputs = {
  investmentAmount: 100000,
  expectedReturn: 12,
  duration: 10
};

export default function LumpsumCalculator() {
  const { formatCurrency, currencySymbol } = useLocale();
  const [inputs, setInputs] = useState<InvestmentInputs>(INITIAL_INPUTS);
  const [isMounted, setIsMounted] = useState(false);

  const results = useMemo(() => {
    const rate = inputs.expectedReturn / 100;
    const duration = inputs.duration;
    const p = inputs.investmentAmount;

    // Formula: A = P(1 + r)^t
    const totalWealth = p * Math.pow(1 + rate, duration);
    const estimatedReturns = totalWealth - p;

    const yearlyData = [];
    for (let i = 1; i <= duration; i++) {
        const val = p * Math.pow(1 + rate, i);
        yearlyData.push({ year: i, balance: Math.round(val) });
    }

    return {
      investedAmount: p,
      estimatedReturns: Math.round(estimatedReturns),
      totalWealth: Math.round(totalWealth),
      yearlyData
    };
  }, [inputs]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(22);
    doc.text('ORBIT WEALTH PRO: Lumpsum Report', 20, 20);
    doc.setFontSize(12);
    doc.text(`Total Investment: ${formatCurrency(inputs.investmentAmount)}`, 20, 40);
    doc.text(`Expected Return: ${inputs.expectedReturn}%`, 20, 50);
    doc.text(`Duration: ${inputs.duration} years`, 20, 60);
    doc.text(`Wealth Gained: ${formatCurrency(results.estimatedReturns)}`, 20, 80);
    doc.text(`Maturity Value: ${formatCurrency(results.totalWealth)}`, 20, 90);
    doc.save('lumpsum-calculation.pdf');
  };

  return (
    <div className="space-y-8 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <header className="space-y-2">
          <div className="flex items-center gap-2 mb-4">
             <BarChart3 className="text-[#D4AF37] w-6 h-6" />
             <h1 className="text-3xl font-bold tracking-tighter text-white">Lumpsum Calculator</h1>
          </div>
          <p className="text-white/40 max-w-xl text-sm leading-relaxed">
            Determine the future value of a one-time fixed investment based on your target return rate and timeframe.
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
                <label className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Total Investment</label>
                <div className="text-lg font-bold text-[#D4AF37] tracking-tighter">{formatCurrency(inputs.investmentAmount)}</div>
              </div>
              <input 
                type="range" min="10000" max="10000000" step="10000"
                value={inputs.investmentAmount}
                onChange={(e) => setInputs({ ...inputs, investmentAmount: Number(e.target.value) })}
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
                <label className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Duration (Years)</label>
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
                <div className="text-[8px] text-white/20 font-bold uppercase tracking-widest mb-1">Invested Principal</div>
                <div className="text-lg font-bold text-white tracking-tighter">{formatCurrency(results.investedAmount)}</div>
            </div>
            <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                <div className="text-[8px] text-white/20 font-bold uppercase tracking-widest mb-1">Total Returns</div>
                <div className="text-lg font-bold text-[#D4AF37] tracking-tighter">{formatCurrency(results.estimatedReturns)}</div>
            </div>
          </div>
        </section>

        <section className="bg-white/[0.02] border border-white/5 rounded-2xl p-8 flex flex-col items-center justify-center min-h-[400px]">
          {isMounted && (
            <div className="w-full h-full min-h-[300px]">
               <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={results.yearlyData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorLum" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#D4AF37" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                  <XAxis dataKey="year" stroke="#ffffff10" fontSize={10} tickLine={false} axisLine={false} dy={10} />
                  <YAxis stroke="#ffffff10" fontSize={10} tickLine={false} axisLine={false} tickFormatter={(val) => `${currencySymbol}${(val / 1000).toFixed(0)}k`} />
                  <RechartsTooltip contentStyle={{ backgroundColor: '#111', border: '1px solid #333', fontSize: '10px' }} />
                  <Area type="monotone" dataKey="balance" stroke="#D4AF37" strokeWidth={3} fillOpacity={1} fill="url(#colorLum)" isAnimationActive={false} />
                </AreaChart>
              </ResponsiveContainer>
              <div className="mt-8 text-center">
                <div className="text-[10px] text-white/20 font-bold uppercase tracking-widest mb-1">Maturity Value</div>
                <div className="text-4xl font-bold text-white tracking-widest">{formatCurrency(results.totalWealth)}</div>
              </div>
            </div>
          )}
        </section>
      </div>

      <SEOSection 
        title="Lumpsum Calculator"
        howTo={[
          "Enter your initial one-time investment corpus.",
          "Adjust the expected annual return rate based on your risk appetite.",
          "Select the investment horizon in years.",
          "Instantly view the projected future value and wealth accumulation."
        ]}
        formula="A = P(1 + r)^t"
        benefits={[
          "Ideal for calculating returns on FDs, Mutual Fund lumpsums, or Real Estate.",
          "Visualize the effect of compound interest over long durations.",
          "Make informed decisions about asset allocation.",
          "Compare different investment scenarios side-by-side."
        ]}
      />
    </div>
  );
}
