import React, { useState, useMemo, useEffect } from 'react';
import { PieChart as PieIcon, Download, Share2, TrendingUp, Info, Activity } from 'lucide-react';
import { useLocale } from '../context/LocaleContext';
import { MutualFundInputs } from '../types';
import { ResponsiveContainer, Tooltip as RechartsTooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import jsPDF from 'jspdf';
import SEOSection from './SEOSection';

const INITIAL_INPUTS: MutualFundInputs = {
  investmentAmount: 100000,
  expectedReturn: 12,
  duration: 10,
  expenseRatio: 1.5
};

export default function MFCalculator() {
  const { formatCurrency, currencySymbol, formatValue } = useLocale();
  const [inputs, setInputs] = useState<MutualFundInputs>(INITIAL_INPUTS);
  const [mode, setMode] = useState<'lumpsum' | 'sip'>('sip');
  const [isMounted, setIsMounted] = useState(false);

  const results = useMemo(() => {
    const rate = inputs.expectedReturn / 100;
    const netRate = (inputs.expectedReturn - inputs.expenseRatio) / 100;
    const duration = inputs.duration;
    const amount = inputs.investmentAmount;

    let totalWealth = 0;
    let wealthAfterExpense = 0;
    let investedAmount = 0;
    const yearlyData = [];

    if (mode === 'sip') {
      const monthlyNetRate = netRate / 12;
      const monthlyGrossRate = rate / 12;
      const months = duration * 12;
      investedAmount = amount * months;
      
      wealthAfterExpense = amount * ((Math.pow(1 + monthlyNetRate, months) - 1) / monthlyNetRate) * (1 + monthlyNetRate);
      totalWealth = amount * ((Math.pow(1 + monthlyGrossRate, months) - 1) / monthlyGrossRate) * (1 + monthlyGrossRate);

      for (let i = 0; i <= duration; i++) {
        const m = i * 12;
        const bal = i === 0 ? 0 : amount * ((Math.pow(1 + monthlyNetRate, m) - 1) / monthlyNetRate) * (1 + monthlyNetRate);
        const gBal = i === 0 ? 0 : amount * ((Math.pow(1 + monthlyGrossRate, m) - 1) / monthlyGrossRate) * (1 + monthlyGrossRate);
        yearlyData.push({ year: i, balance: Math.round(bal), grossBalance: Math.round(gBal) });
      }
    } else {
      investedAmount = amount;
      wealthAfterExpense = amount * Math.pow(1 + netRate, duration);
      totalWealth = amount * Math.pow(1 + rate, duration);

      for (let i = 0; i <= duration; i++) {
        yearlyData.push({
          year: i,
          balance: Math.round(amount * Math.pow(1 + netRate, i)),
          grossBalance: Math.round(amount * Math.pow(1 + rate, i))
        });
      }
    }

    return {
      investedAmount,
      totalWealth: Math.round(wealthAfterExpense),
      estimatedReturns: Math.round(wealthAfterExpense - investedAmount),
      expenseRatioImpact: Math.round(totalWealth - wealthAfterExpense),
      yearlyData
    };
  }, [inputs, mode]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(22);
    doc.text('Orbit Wealth Pro: Mutual Fund Analysis', 20, 20);
    doc.setFontSize(12);
    doc.text(`Mode: ${mode.toUpperCase()}`, 20, 40);
    doc.text(`Investment: ${formatCurrency(inputs.investmentAmount)} / ${mode === 'sip' ? 'Month' : 'Lumpsum'}`, 20, 50);
    doc.text(`Expected Return: ${inputs.expectedReturn}%`, 20, 60);
    doc.text(`Duration: ${inputs.duration} Years`, 20, 70);
    doc.text(`Expense Ratio: ${inputs.expenseRatio}%`, 20, 80);
    doc.text(`Total Wealth: ${formatCurrency(results.totalWealth)}`, 20, 100);
    doc.text(`Impact of Expense Ratio: ${formatCurrency(results.expenseRatioImpact)}`, 20, 110);
    doc.save('mutual-fund-analysis.pdf');
  };

  return (
    <div className="space-y-8 pb-20 text-white">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <header className="space-y-2">
          <div className="flex items-center gap-2 mb-4">
             <PieIcon className="text-[#0055FF] w-6 h-6" />
             <h1 className="text-3xl font-bold tracking-tighter">Mutual Fund Calculator</h1>
          </div>
          <p className="text-white/40 max-w-xl text-sm leading-relaxed">
            Analyze mutual fund performance with detailed expense ratio impact and {mode.toUpperCase()} growth projections.
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
        <section className="bg-white/[0.02] border border-white/5 rounded-2xl p-8 space-y-8">
           <div className="flex p-1 bg-white/5 rounded-xl border border-white/5 w-fit">
              {(['sip', 'lumpsum'] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => {
                    setMode(m);
                    setInputs({ ...inputs, investmentAmount: m === 'sip' ? 5000 : 100000 });
                  }}
                  className={`px-6 py-2 rounded-lg text-xs font-bold transition-all ${mode === m ? 'bg-[#0055FF] text-white shadow-lg shadow-[#0055FF]/20' : 'text-white/20 hover:text-white/40'}`}
                >
                  {m.toUpperCase()}
                </button>
              ))}
           </div>

           <div className="space-y-6">
              <div className="space-y-4">
                 <div className="flex justify-between items-center">
                    <label className="text-[10px] font-bold text-white/20 uppercase tracking-widest">{mode === 'sip' ? 'Monthly SIP' : 'Initial Investment'}</label>
                    <div className="text-lg font-bold text-white tracking-tighter">{formatCurrency(inputs.investmentAmount)}</div>
                 </div>
                 <input 
                   type="range" min={mode === 'sip' ? 500 : 1000} max={mode === 'sip' ? 100000 : 10000000} step={mode === 'sip' ? 500 : 10000}
                   value={inputs.investmentAmount}
                   onChange={(e) => setInputs({ ...inputs, investmentAmount: Number(e.target.value) })}
                   className="w-full accent-[#0055FF]"
                 />
              </div>

              <div className="grid grid-cols-2 gap-8">
                 <div className="space-y-4">
                    <label className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Expected Return (%)</label>
                    <input 
                      type="number" step="0.5" value={inputs.expectedReturn}
                      onChange={(e) => setInputs({ ...inputs, expectedReturn: Number(e.target.value) })}
                      className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-3 text-white font-bold outline-none focus:border-[#0055FF]"
                    />
                 </div>
                 <div className="space-y-4">
                    <label className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Expense Ratio (%)</label>
                    <input 
                      type="number" step="0.1" value={inputs.expenseRatio}
                      onChange={(e) => setInputs({ ...inputs, expenseRatio: Number(e.target.value) })}
                      className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-3 text-white font-bold outline-none focus:border-[#0055FF]"
                    />
                 </div>
              </div>

              <div className="space-y-4">
                 <div className="flex justify-between items-center">
                    <label className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Duration (Years)</label>
                    <div className="text-lg font-bold text-[#0055FF] tracking-tighter">{inputs.duration} Yrs</div>
                 </div>
                 <input 
                   type="range" min="1" max="40" step="1"
                   value={inputs.duration}
                   onChange={(e) => setInputs({ ...inputs, duration: Number(e.target.value) })}
                   className="w-full accent-[#0055FF]"
                 />
              </div>
           </div>

           <div className="p-6 bg-[#0055FF]/10 rounded-2xl border border-[#0055FF]/20 flex items-center gap-4">
              <Activity className="text-[#0055FF] w-8 h-8" />
              <div>
                 <div className="text-[10px] font-bold text-[#0055FF] uppercase tracking-widest mb-1">Expense Ratio Impact</div>
                 <div className="text-xl font-bold text-white tracking-tighter">-{formatCurrency(results.expenseRatioImpact)}</div>
                 <p className="text-[10px] text-white/40 mt-1">Wealth lost due to {inputs.expenseRatio}% TER over {inputs.duration} years.</p>
              </div>
           </div>
        </section>

        <section className="bg-white/[0.02] border border-white/5 rounded-2xl p-8 flex flex-col justify-between min-h-[500px]">
           {isMounted && (
             <div className="flex-1 flex flex-col">
               <div className="space-y-8 mb-8">
                 <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                        <div className="text-[10px] text-white/20 font-bold uppercase tracking-widest mb-1">Total Invested</div>
                        <div className="text-xl font-bold text-white/40">{formatCurrency(results.investedAmount)}</div>
                    </div>
                    <div className="p-4 bg-[#0055FF]/20 rounded-xl border border-[#0055FF]/30">
                        <div className="text-[10px] text-[#0055FF] font-bold uppercase tracking-widest mb-1">Total Wealth</div>
                        <div className="text-xl font-bold text-white">{formatCurrency(results.totalWealth)}</div>
                    </div>
                 </div>

                 <div className="h-[250px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={results.yearlyData} margin={{ top: 20, right: 0, left: 0, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                        <XAxis dataKey="year" stroke="#ffffff10" fontSize={10} tickLine={false} axisLine={false} />
                        <YAxis stroke="#ffffff10" fontSize={10} tickLine={false} axisLine={false} tickFormatter={(val) => `${currencySymbol}${formatValue(val / 1000)}k`} />
                        <RechartsTooltip contentStyle={{ backgroundColor: '#111', border: '1px solid #333', fontSize: '10px' }} />
                        <Bar dataKey="balance" fill="#0055FF" radius={[4, 4, 0, 0]} isAnimationActive={false} />
                      </BarChart>
                    </ResponsiveContainer>
                 </div>
               </div>
               
               <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/5 mt-auto">
                  <Info className="w-4 h-4 text-[#0055FF]" />
                  <p className="text-[10px] text-white/40 leading-relaxed italic">
                    The calculation considers the Total Expense Ratio (TER) deducted annually from the Net Asset Value (NAV).
                  </p>
               </div>
             </div>
           )}
        </section>
      </div>

      <SEOSection 
        title="Mutual Fund Return Calculator"
        howTo={[
          "Choose between SIP (Monthly) or Lumpsum (One-time) investment mode.",
          "Enter your investment amount and expected annual CAGR returns.",
          "Specify the duration of your investment in completed years.",
          "Input the fund's expense ratio to understand the true net wealth after asset management fees."
        ]}
        formula="FV = P × (1 + r)^n | Net r = Gross r - Expense Ratio"
        benefits={[
          "Analyze the long-term impact of direct vs regular mutual fund fees.",
          "Compare SIP and Lumpsum performance within a single interface.",
          "Professional grade charts visualizing wealth vs expense impact.",
          "Support for global currency and local number system formatting."
        ]}
      />
    </div>
  );
}
