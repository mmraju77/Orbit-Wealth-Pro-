/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Coins, Download, Info, Percent } from 'lucide-react';
import { useLocale } from '../context/LocaleContext';
import jsPDF from 'jspdf';
import SEOSection from './SEOSection';
import AIAdvisor from './AIAdvisor';

export default function DividendYieldCalculator() {
  const { formatCurrency } = useLocale();
  const [stockPrice, setStockPrice] = useState(150);
  const [annualDividend, setAnnualDividend] = useState(4.5);
  const [sharesOwned, setSharesOwned] = useState(100);

  const results = useMemo(() => {
    const yieldPercentage = (annualDividend / stockPrice) * 100;
    const totalIncome = annualDividend * sharesOwned;
    return {
      yield: Number(yieldPercentage.toFixed(2)),
      totalIncome: Math.round(totalIncome)
    };
  }, [stockPrice, annualDividend, sharesOwned]);

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(22);
    doc.text('Dividend Yield Report', 20, 20);
    doc.setFontSize(12);
    doc.text(`Stock Price: ${formatCurrency(stockPrice)}`, 20, 40);
    doc.text(`Annual Dividend per Share: ${formatCurrency(annualDividend)}`, 20, 50);
    doc.text(`Dividend Yield: ${results.yield}%`, 20, 60);
    doc.text(`Estimated Annual Income: ${formatCurrency(results.totalIncome)}`, 20, 80);
    doc.save('dividend-report.pdf');
  };

  return (
    <div className="space-y-12 pb-20 text-white">
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 pt-8">
        <header className="space-y-4">
          <div className="flex items-center gap-2 mb-2">
             <div className="h-px w-6 bg-[#0055FF]"></div>
             <span className="text-[10px] font-bold text-[#0055FF] uppercase tracking-[0.3em]">Passive Income Analytics</span>
          </div>
          <h1 className="text-5xl font-display font-medium text-white tracking-tight">Dividend Yields.</h1>
          <p className="text-white/40 max-w-xl text-sm font-light leading-relaxed">
            Project and optimize your cash flow using our institutional-grade yield computation engine.
          </p>
        </header>
        <button onClick={downloadPDF} className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/5 rounded-lg text-xs font-bold transition-all">
          <Download className="w-4 h-4" /> Export Data
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <section className="bg-white/[0.02] border border-white/5 rounded-2xl p-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <div className="space-y-2">
                <label className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Share Price</label>
                <input 
                  type="number" value={stockPrice}
                  onChange={(e) => setStockPrice(Number(e.target.value))}
                  className="w-full bg-black/40 p-3 rounded-xl border border-white/5 text-white font-bold outline-none"
                />
             </div>
             <div className="space-y-2">
                <label className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Annual Dividend / Share</label>
                <input 
                  type="number" step="0.01" value={annualDividend}
                  onChange={(e) => setAnnualDividend(Number(e.target.value))}
                  className="w-full bg-black/40 p-3 rounded-xl border border-white/5 text-white font-bold outline-none"
                />
             </div>
          </div>
          <div className="space-y-4">
             <div className="flex justify-between items-center text-[10px] font-bold text-white/20 uppercase tracking-widest">
                <span>Shares Owned</span>
                <span className="text-white">{sharesOwned} Shares</span>
             </div>
             <input 
               type="range" min="1" max="10000" step="10"
               value={sharesOwned}
               onChange={(e) => setSharesOwned(Number(e.target.value))}
               className="w-full accent-[#0055FF]"
             />
          </div>
        </section>

        <section className="bg-white/[0.02] border border-white/5 rounded-2xl p-8 flex flex-col justify-between">
           <div className="grid grid-cols-2 gap-4">
              <div className="p-6 bg-[#0055FF]/10 rounded-2xl border border-[#0055FF]/20 text-center">
                 <div className="text-[10px] text-[#0055FF] font-bold uppercase tracking-widest mb-1">Dividend Yield</div>
                 <div className="text-4xl font-bold text-white">{results.yield}%</div>
              </div>
              <div className="p-6 bg-emerald-500/10 rounded-2xl border border-emerald-500/20 text-center">
                 <div className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest mb-1">Annual Passive Income</div>
                 <div className="text-3xl font-bold text-white">{formatCurrency(results.totalIncome)}</div>
              </div>
           </div>

           <AIAdvisor context={`User owns ${sharesOwned} shares at ${stockPrice} each, with a ${annualDividend} annual dividend. Yield is ${results.yield}%.`} />
        </section>
      </div>

      <SEOSection 
        title="Dividend Yield & Income Calculator"
        howTo={[
          "Input the current market price of the stock.",
          "Enter the total annual dividend paid per share (Sum of all quarterly/semi-annual payouts).",
          "Specify the number of shares in your portfolio to calculate total income.",
          "The Result shows the percentage return relative to the current price."
        ]}
        formula="Dividend Yield = (Annual Dividend per Share / Price per Share) * 100"
        benefits={[
          "Compare high-yield stocks vs growth stocks.",
          "Plan your retirement cash flow accurately.",
          "Evaluate the risk/reward of 'dividend traps'.",
          "Track total portfolio income generation."
        ]}
      />
    </div>
  );
}
