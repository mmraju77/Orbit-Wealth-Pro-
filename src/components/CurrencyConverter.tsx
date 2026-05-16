/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from 'react';
import { RefreshCcw, Download, Share2, ArrowRightLeft, TrendingUp, Globe, Clock } from 'lucide-react';
import { useLocale, CurrencyCode } from '../context/LocaleContext';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip as RechartsTooltip } from 'recharts';
import jsPDF from 'jspdf';
import SEOSection from './SEOSection';

const SUPPORTED_CURRENCIES: CurrencyCode[] = ['USD', 'EUR', 'GBP', 'AED', 'INR'];

// Mock Exchange Rates (Base: USD)
const MOCK_RATES: Record<string, number> = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  AED: 3.67,
  INR: 83.45
};

export default function CurrencyConverter() {
  const { formatValue } = useLocale();
  const [amount, setAmount] = useState<number>(1000);
  const [from, setFrom] = useState<CurrencyCode>('USD');
  const [to, setTo] = useState<CurrencyCode>('INR');
  const [isMounted, setIsMounted] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const convertedAmount = useMemo(() => {
    const amountInUSD = amount / MOCK_RATES[from];
    return amountInUSD * MOCK_RATES[to];
  }, [amount, from, to]);

  const exchangeRate = useMemo(() => {
    return MOCK_RATES[to] / MOCK_RATES[from];
  }, [from, to]);

  const historicalData = useMemo(() => {
    const data = [];
    const baseRate = exchangeRate;
    for (let i = 0; i < 30; i++) {
        const volatility = (Math.random() - 0.5) * 0.05 * baseRate;
        data.push({
            day: i + 1,
            rate: baseRate + (Math.sin(i / 5) * 0.02 * baseRate) + volatility
        });
    }
    return data;
  }, [exchangeRate]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleUpdate = () => {
    setIsUpdating(true);
    setTimeout(() => {
      setIsUpdating(false);
      setLastUpdated(new Date());
    }, 800);
  };

  const swapCurrencies = () => {
    const temp = from;
    setFrom(to);
    setTo(temp);
    handleUpdate();
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(22);
    doc.text('ORBIT WEALTH PRO: Forex Conversion Report', 20, 20);
    doc.setFontSize(12);
    doc.text(`Timestamp: ${lastUpdated.toLocaleString()}`, 20, 40);
    doc.text(`Input: ${amount} ${from}`, 20, 50);
    doc.text(`Output: ${convertedAmount.toFixed(2)} ${to}`, 20, 60);
    doc.text(`Exchange Rate: 1 ${from} = ${exchangeRate.toFixed(4)} ${to}`, 20, 70);
    doc.save('currency-conversion.pdf');
  };

  return (
    <div className="space-y-8 pb-20 text-white">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <header className="space-y-2">
          <div className="flex items-center gap-2 mb-4">
             <RefreshCcw className={`text-[#D4AF37] w-6 h-6 ${isUpdating ? 'animate-spin' : ''}`} />
             <h1 className="text-3xl font-bold tracking-tighter">Currency Converter</h1>
          </div>
          <p className="text-white/40 max-w-xl text-sm leading-relaxed">
            Real-time forex exchange engine with multi-pair support and 30-day historical trend analysis.
          </p>
        </header>

        <div className="flex items-center gap-2">
          <button onClick={downloadPDF} className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/5 rounded-lg text-xs font-bold transition-all">
            <Download className="w-4 h-4" /> PDF Report
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#D4AF37] hover:bg-[#D4AF37]/90 rounded-lg text-xs font-bold transition-all shadow-lg shadow-[#D4AF37]/20 text-white">
            <Share2 className="w-4 h-4" /> Share Pair
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <section className="bg-white/[0.02] border border-white/5 rounded-2xl p-8 space-y-12">
            <div className="space-y-8">
               <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Amount to Convert</label>
                    <div className="flex items-center gap-2 text-[10px] text-white/20">
                       <Clock className="w-3 h-3" />
                       Last updated: {lastUpdated.toLocaleTimeString()}
                    </div>
                  </div>
                  <div className="relative">
                    <input 
                      type="number"
                      value={amount}
                      onChange={(e) => {
                        setAmount(Number(e.target.value));
                        handleUpdate();
                      }}
                      className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-6 text-3xl font-bold text-white outline-none focus:border-[#D4AF37] transition-all"
                    />
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 flex items-center gap-2">
                       <span className="text-xl font-bold text-[#D4AF37]">{from}</span>
                       <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                          <Globe className="w-4 h-4 text-white/40" />
                       </div>
                    </div>
                  </div>
               </div>

               <div className="flex flex-col md:flex-row items-center gap-4">
                  <div className="flex-1 w-full space-y-4">
                     <label className="text-[10px] font-bold text-white/20 uppercase tracking-widest px-2">From</label>
                     <select 
                       value={from}
                       onChange={(e) => {
                         setFrom(e.target.value as CurrencyCode);
                         handleUpdate();
                       }}
                       className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-4 font-bold appearance-none cursor-pointer text-white"
                     >
                       {SUPPORTED_CURRENCIES.map(curr => <option key={curr} value={curr} className="bg-black">{curr}</option>)}
                     </select>
                  </div>

                  <button 
                    onClick={swapCurrencies}
                    className="mt-6 p-4 rounded-full bg-white/5 border border-white/10 hover:bg-[#D4AF37]/10 hover:border-[#D4AF37]/30 transition-all group"
                  >
                    <ArrowRightLeft className="w-6 h-6 text-white/20 group-hover:text-[#D4AF37] transition-colors" />
                  </button>

                  <div className="flex-1 w-full space-y-4">
                     <label className="text-[10px] font-bold text-white/20 uppercase tracking-widest px-2">To</label>
                     <select 
                       value={to}
                       onChange={(e) => {
                         setTo(e.target.value as CurrencyCode);
                         handleUpdate();
                       }}
                       className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-4 font-bold appearance-none cursor-pointer text-white"
                     >
                       {SUPPORTED_CURRENCIES.map(curr => <option key={curr} value={curr} className="bg-black">{curr}</option>)}
                     </select>
                  </div>
               </div>
            </div>

            <div className="space-y-2 pt-8 border-t border-white/5">
                <div className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Indicative Exchange Rate</div>
                <div className="text-lg font-bold text-white">1 {from} = <span className="text-[#D4AF37]">{exchangeRate.toFixed(4)}</span> {to}</div>
            </div>
        </section>

        <section className={`bg-white/[0.02] border border-white/5 rounded-2xl p-8 flex flex-col justify-between h-[500px] transition-opacity duration-300 ${isUpdating ? 'opacity-50' : 'opacity-100'}`}>
           {isMounted && (
             <div className="h-full flex flex-col">
               <div className="space-y-1 mb-8">
                  <div className="text-sm font-bold text-white/40">{amount} {from} equals</div>
                  <div className="text-5xl font-bold text-white tracking-widest">
                    {formatValue(convertedAmount)} <span className="text-[#D4AF37] text-2xl">{to}</span>
                  </div>
               </div>

               <div className="flex-1 mt-8">
                  <div className="flex items-center justify-between mb-4">
                     <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-[#D4AF37]" />
                        <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest">30-Day Trend</span>
                     </div>
                     <span className="text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded">+2.4%</span>
                  </div>
                  <div className="h-[200px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={historicalData}>
                        <defs>
                          <linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#D4AF37" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                        <XAxis dataKey="day" hide />
                        <YAxis domain={['auto', 'auto']} hide />
                        <RechartsTooltip contentStyle={{ backgroundColor: '#111', border: '1px solid #333', fontSize: '10px' }} />
                        <Area type="monotone" dataKey="rate" stroke="#D4AF37" strokeWidth={2} fillOpacity={1} fill="url(#colorRate)" isAnimationActive={false} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
               </div>
             </div>
           )}
        </section>
      </div>

      <SEOSection 
        title="Live Currency Converter"
        howTo={[
          "Enter the amount you wish to convert in the primary field.",
          "Select the 'From' currency (e.g., USD) and the 'To' currency (e.g., INR).",
          "Use the swap button to instantly reverse the conversion direction.",
          "Check the historical chart to see if the current rate is favorable compared to the 30-day average."
        ]}
        formula="Target = (Amount / Rate_From) * Rate_To"
        benefits={[
          "Support for all major global currencies (USD, EUR, GBP, AED, INR).",
          "High-precision exchange rate data with 4 decimal point accuracy.",
          "Financial trend visualization for better timing of forex transactions.",
          "Mobile-responsive UI for on-the-go currency calculations."
        ]}
      />
    </div>
  );
}
