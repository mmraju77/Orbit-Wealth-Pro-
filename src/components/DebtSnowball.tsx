/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Zap, Download, Plus, Trash2, List } from 'lucide-react';
import { useLocale } from '../context/LocaleContext';
import jsPDF from 'jspdf';
import SEOSection from './SEOSection';
import AIAdvisor from './AIAdvisor';

interface Debt {
  id: string;
  name: string;
  balance: number;
  rate: number;
  minPayment: number;
}

export default function DebtSnowball() {
  const { formatCurrency } = useLocale();
  const [debts, setDebts] = useState<Debt[]>([
    { id: '1', name: 'Credit Card A', balance: 50000, rate: 24, minPayment: 1500 },
    { id: '2', name: 'Personal Loan', balance: 200000, rate: 12, minPayment: 5000 },
  ]);
  const [extraPayment, setExtraPayment] = useState(2000);

  const addDebt = () => {
    setDebts([...debts, { id: Date.now().toString(), name: 'New Debt', balance: 0, rate: 0, minPayment: 0 }]);
  };

  const removeDebt = (id: string) => {
    setDebts(debts.filter(d => d.id !== id));
  };

  const updateDebt = (id: string, field: keyof Debt, value: any) => {
    setDebts(debts.map(d => d.id === id ? { ...d, [field]: value } : d));
  };

  const sortedDebts = useMemo(() => {
    // Snowball: Smallest balance first
    return [...debts].sort((a, b) => a.balance - b.balance);
  }, [debts]);

  const totalMinPayment = useMemo(() => debts.reduce((sum, d) => sum + d.minPayment, 0), [debts]);
  const totalBalance = useMemo(() => debts.reduce((sum, d) => sum + d.balance, 0), [debts]);

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(22);
    doc.text('Debt Snowball Strategy Report', 20, 20);
    doc.setFontSize(12);
    doc.text(`Total Debt: ${formatCurrency(totalBalance)}`, 20, 40);
    doc.text(`Monthly Minimum Payments: ${formatCurrency(totalMinPayment)}`, 20, 50);
    doc.text(`Extra Monthly Snowball: ${formatCurrency(extraPayment)}`, 20, 60);
    doc.text('Payment Priority:', 20, 80);
    sortedDebts.forEach((d, i) => {
      doc.text(`${i + 1}. ${d.name}: ${formatCurrency(d.balance)} (${d.rate}%)`, 30, 90 + (i * 10));
    });
    doc.save('debt-snowball-report.pdf');
  };

  return (
    <div className="space-y-12 pb-20 text-white">
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 pt-8">
        <header className="space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="h-px w-6 bg-[#0055FF]"></div>
            <span className="text-[10px] font-bold text-[#0055FF] uppercase tracking-[0.3em]">Debt Freedom Strategy</span>
          </div>
          <h1 className="text-5xl font-display font-medium text-white tracking-tight">Debt Snowball.</h1>
          <p className="text-white/40 max-w-xl text-sm font-light leading-relaxed">
            Eliminate debt systematically by targeting the smallest balances first to build momentum.
          </p>
        </header>
        <button onClick={downloadPDF} className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/5 rounded-xl text-xs font-bold transition-all hover:bg-white/10 shrink-0">
          <Download className="w-4 h-4" /> Export Strategy
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
        <section className="space-y-8 bg-white/[0.01] border border-white/[0.03] p-10 rounded-[2.5rem]">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-display font-medium">Your Debts</h2>
            <button onClick={addDebt} className="flex items-center gap-2 px-3 py-1.5 bg-[#0055FF]/10 text-[#0055FF] rounded-lg text-xs font-bold hover:bg-[#0055FF]/20 transition-all">
              <Plus className="w-3.5 h-3.5" /> Add Debt
            </button>
          </div>

          <div className="space-y-4">
            {debts.map((debt) => (
              <div key={debt.id} className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-white/[0.02] border border-white/5 rounded-xl relative group">
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-white/20 uppercase tracking-widest">Name</label>
                  <input value={debt.name} onChange={e => updateDebt(debt.id, 'name', e.target.value)} className="w-full bg-transparent border-none outline-none text-xs text-white" />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-white/20 uppercase tracking-widest">Balance</label>
                  <input type="number" value={debt.balance} onChange={e => updateDebt(debt.id, 'balance', Number(e.target.value))} className="w-full bg-transparent border-none outline-none text-xs text-white font-mono" />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-white/20 uppercase tracking-widest">Min PMT</label>
                  <input type="number" value={debt.minPayment} onChange={e => updateDebt(debt.id, 'minPayment', Number(e.target.value))} className="w-full bg-transparent border-none outline-none text-xs text-white font-mono" />
                </div>
                <div className="flex items-end justify-between">
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-white/20 uppercase tracking-widest">Rate %</label>
                    <input type="number" value={debt.rate} onChange={e => updateDebt(debt.id, 'rate', Number(e.target.value))} className="w-full bg-transparent border-none outline-none text-xs text-white" />
                  </div>
                  <button onClick={() => removeDebt(debt.id)} className="p-1 text-white/10 hover:text-rose-500 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-4 pt-8 border-t border-white/5">
             <div className="flex justify-between items-center text-[10px] font-bold text-white/20 uppercase tracking-widest">
                <span>Extra Monthly Contribution</span>
                <span className="text-[#0055FF]">{formatCurrency(extraPayment)}</span>
             </div>
             <input type="range" min="0" max="50000" step="500" value={extraPayment} onChange={e => setExtraPayment(Number(e.target.value))} className="w-full accent-[#0055FF]" />
          </div>
        </section>

        <section className="space-y-8 flex flex-col">
           <div className="grid grid-cols-2 gap-6 mb-auto">
              <div className="p-10 bg-white/[0.01] border border-white/[0.03] rounded-[2.5rem] text-center space-y-2">
                 <div className="text-[10px] text-white/20 font-bold uppercase tracking-[0.2em]">Total Outstanding</div>
                 <div className="text-4xl font-display font-medium text-white">{formatCurrency(totalBalance)}</div>
              </div>
              <div className="p-10 bg-[#0055FF]/5 border border-[#0055FF]/10 rounded-[2.5rem] text-center space-y-2">
                 <div className="text-[10px] text-[#0055FF] font-bold uppercase tracking-[0.2em]">Monthly Payload</div>
                 <div className="text-4xl font-display font-medium text-[#0055FF]">{formatCurrency(totalMinPayment + extraPayment)}</div>
              </div>
           </div>

           <div className="bg-white/[0.01] border border-white/[0.03] p-10 rounded-[2.5rem] space-y-6">
              <h3 className="text-lg font-display font-medium flex items-center gap-3">
                 <List className="text-[#0055FF] w-5 h-5" />
                 Snowball Order
              </h3>
              <div className="space-y-3">
                 {sortedDebts.map((debt, idx) => (
                   <div key={debt.id} className={`flex items-center justify-between p-4 rounded-xl border ${idx === 0 ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-white/[0.01] border-white/5'}`}>
                      <div className="flex items-center gap-4">
                         <span className="text-[10px] font-bold text-white/20">#{idx + 1}</span>
                         <span className="font-medium text-sm">{debt.name}</span>
                      </div>
                      <div className="flex items-center gap-6">
                         <span className="text-xs text-white/40">{formatCurrency(debt.balance)}</span>
                         {idx === 0 && <span className="text-[9px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded">PRIORITY</span>}
                      </div>
                   </div>
                 ))}
              </div>
           </div>

           <AIAdvisor context={`User has ${debts.length} debts totaling ${totalBalance}. Smallest debt is ${sortedDebts[0]?.name} at ${sortedDebts[0]?.balance}. User is paying an extra ${extraPayment} monthly.`} />
        </section>
      </div>

      <SEOSection 
        title="Debt Snowball Calculator - Financial Freedom Engine"
        howTo={[
          "List all your debts from smallest balance to largest balance.",
          "Keep making minimum payments on all debts except the smallest one.",
          "Throw every extra dollar (The Snowball) at the smallest debt.",
          "Once the smallest is paid off, roll its entire payment into the next smallest debt."
        ]}
        formula="Effective Payment = Minimum PMT + Extra + Successive Roll-overs"
        benefits={[
          "Psychological wins fuel long-term consistency.",
          "Simplifies multiple loan accounts into a single strategy.",
          "Reduces the number of open accounts quickly.",
          "Proven method popularized by major financial coaches."
        ]}
      />
    </div>
  );
}
