/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { TaxInputs, TaxResult } from '@/src/types';
import { Copy, Check, ArrowRightLeft, Download } from 'lucide-react';
import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { useLocale } from '@/src/context/LocaleContext';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip } from 'recharts';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import Tooltip from './Tooltip';

export default function TaxCalculator() {
  const { labels, formatCurrency, currencySymbol } = useLocale();
  const [inputs, setInputs] = useState<TaxInputs>({
    amount: 1000,
    taxRate: 20,
    isAddingTax: true,
  });
  const [results, setResults] = useState<TaxResult | null>(null);
  const [copied, setCopied] = useState(false);

  const calculateTax = () => {
    const rate = inputs.taxRate / 100;
    let originalAmount, taxAmount, totalAmount;

    if (inputs.isAddingTax) {
      originalAmount = inputs.amount;
      taxAmount = originalAmount * rate;
      totalAmount = originalAmount + taxAmount;
    } else {
      // Amount is already inclusive of tax
      totalAmount = inputs.amount;
      originalAmount = totalAmount / (1 + rate);
      taxAmount = totalAmount - originalAmount;
    }

    setResults({
      originalAmount,
      taxAmount,
      totalAmount,
    });
  };

  useEffect(() => {
    calculateTax();
  }, [inputs]);

  const handleCopy = () => {
    if (!results) return;
    const mode = inputs.isAddingTax ? 'Add Tax' : 'Remove Tax';
    const text = `Orbit Wealth Pro - ${mode}\nBase Amount: ${formatCurrency(results.originalAmount)}\n${labels.tax} Rate: ${inputs.taxRate}%\n${labels.tax} Amount: ${formatCurrency(results.taxAmount)}\nTotal: ${formatCurrency(results.totalAmount)}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const generatePDF = () => {
    if (!results) return;
    const doc = new jsPDF();
    
    doc.setFontSize(20);
    doc.text(`ORBIT WEALTH PRO - ${labels.tax.toUpperCase()} REPORT`, 14, 22);
    
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 30);
    
    doc.setTextColor(0);
    doc.setFontSize(14);
    doc.text('Calculation Detail', 14, 45);
    
    const inputData = [
      ['Input Amount', formatCurrency(inputs.amount)],
      ['Operation', inputs.isAddingTax ? 'Add Tax (Gross Result)' : 'Remove Tax (Net Result)'],
      [`${labels.tax} Rate`, `${inputs.taxRate}%`],
    ];
    
    autoTable(doc, {
      startY: 50,
      head: [['Parameter', 'Value']],
      body: inputData,
      theme: 'grid',
      headStyles: { fillColor: [0, 85, 255] }
    });
    
    doc.setFontSize(14);
    doc.text('Economic Impact', 14, (doc as any).lastAutoTable.finalY + 15);
    
    const resultData = [
      ['Base (Net) Amount', formatCurrency(results.originalAmount)],
      [`${labels.tax} Amount`, formatCurrency(results.taxAmount)],
      ['Total (Gross) Amount', formatCurrency(results.totalAmount)],
    ];
    
    autoTable(doc, {
      startY: (doc as any).lastAutoTable.finalY + 20,
      head: [['Metric', 'Value']],
      body: resultData,
      theme: 'grid',
      headStyles: { fillColor: [0, 85, 255] }
    });
    
    doc.save(`Orbit_Tax_Calculation.pdf`);
  };

  return (
    <div className="flex px-10 py-10 gap-12 max-w-full">
      <section className="w-[320px] flex flex-col gap-8 shrink-0">
        <div>
          <div className="editorial-label mb-4">01 — {labels.tax.toUpperCase()} CONFIGURATION</div>
          <h2 className="text-2xl font-semibold tracking-tight mb-8">Base Parameters</h2>
          
          <div className="space-y-8">
            <div className="group">
              <Tooltip content="The base monetary value you wish to calculate tax for.">
                <label className="input-label-editorial">Amount to Calculate</label>
              </Tooltip>
              <div className="flex items-center gap-1">
                <span className="text-xl font-light text-white/30">{currencySymbol}</span>
                <input 
                  type="number"
                  value={inputs.amount}
                  onChange={(e) => setInputs({ ...inputs, amount: Number(e.target.value) })}
                  className="editorial-input text-3xl"
                />
              </div>
            </div>

            <div className="group">
              <Tooltip content="The percentage rate of tax to be applied or backed out.">
                <label className="input-label-editorial">{labels.tax} Rate (%)</label>
              </Tooltip>
              <div className="flex items-center gap-1">
                <input 
                  type="number"
                  value={inputs.taxRate}
                  onChange={(e) => setInputs({ ...inputs, taxRate: Number(e.target.value) })}
                  className="editorial-input text-xl"
                />
                <span className="text-sm font-light text-white/30">%</span>
              </div>
            </div>

            <div className="pt-4">
              <Tooltip content="Toggle between calculating tax on top of an amount, or extracting it from a total.">
                <button 
                  onClick={() => setInputs({ ...inputs, isAddingTax: !inputs.isAddingTax })}
                  className="flex items-center gap-3 text-[10px] font-bold tracking-widest text-white/60 hover:text-white transition-colors group"
                >
                  <div className="w-8 h-8 rounded border border-white/20 flex items-center justify-center group-hover:border-[#0055FF] transition-colors">
                    <ArrowRightLeft className="w-4 h-4" />
                  </div>
                  <span>SWITCH TO {inputs.isAddingTax ? `REMOVE ${labels.tax.toUpperCase()} (NET FROM GROSS)` : `ADD ${labels.tax.toUpperCase()} (GROSS FROM NET)`}</span>
                </button>
              </Tooltip>
            </div>
          </div>
        </div>

        <Tooltip content={`Perform the ${labels.tax} calculation based on current parameters.`}>
          <button 
            onClick={calculateTax}
            className="btn-accent mt-4 w-full"
          >
            Calculate {labels.tax}
          </button>
        </Tooltip>

        <Tooltip content="Generate a PDF document of this tax breakdown.">
          <button 
            onClick={generatePDF}
            className="flex items-center justify-center gap-2 w-full py-4 rounded border border-white/10 text-[10px] uppercase tracking-widest font-bold hover:bg-white/5 transition-colors mt-2"
          >
            <Download className="w-3 h-3 text-[#0055FF]" />
            Download PDF Report
          </button>
        </Tooltip>
      </section>

      <section className="flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-6">
          <div>
            <div className="editorial-label mb-1">02 — {labels.tax.toUpperCase()} BREAKDOWN</div>
            <h2 className="text-2xl font-semibold tracking-tight">Financial Impact</h2>
          </div>
          <Tooltip content="Copy these tax results to your clipboard.">
            <button 
              onClick={handleCopy}
              className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-[#0055FF] hover:text-white transition-colors font-bold"
            >
              {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
              {copied ? 'Copied' : 'Copy Results'}
            </button>
          </Tooltip>
        </div>

        {results && (
          <div className="space-y-12">
            <div className="flex gap-12 overflow-hidden">
              <div className="flex-[2]">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-[64px] font-extrabold tracking-tighter leading-none mb-2 tabular-nums"
                >
                  {formatCurrency(results.totalAmount).split('.')[0]}
                  <span className="text-xl font-light text-white/30 ml-2">
                    .{formatCurrency(results.totalAmount).split('.')[1] || '00'}
                  </span>
                </motion.div>
                <p className="text-sm text-white/50 max-w-[200px]">Total amount {inputs.isAddingTax ? 'after' : 'before'} taxation.</p>
              </div>
              <div className="w-px bg-white/10"></div>
              <div className="flex-1 h-[140px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'Net Amount', value: results.originalAmount },
                        { name: labels.tax, value: results.taxAmount },
                      ]}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={55}
                      paddingAngle={5}
                      dataKey="value"
                      stroke="none"
                    >
                      <Cell fill="#333333" />
                      <Cell fill="#0055FF" />
                    </Pie>
                    <RechartsTooltip 
                      contentStyle={{ backgroundColor: '#111', border: '1px solid #333', fontSize: '10px' }}
                      itemStyle={{ color: '#fff' }}
                      formatter={(val: number) => formatCurrency(val)}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-12 border-t border-white/10 pt-12">
              <div className="space-y-2">
                <div className="text-[10px] font-bold tracking-widest text-white/20 uppercase">Core Valuation</div>
                <div className="text-2xl font-light tabular-nums">{formatCurrency(results.originalAmount)}</div>
                <p className="text-xs text-white/40 leading-relaxed font-medium">The base economic value of the transaction before any government surcharges are applied.</p>
              </div>
              
              <div className="space-y-4">
                <div className="text-[10px] font-bold tracking-widest text-white/20 uppercase">Quick Reference</div>
                <div className="space-y-3">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-white/30 whitespace-nowrap">Net Amount</span>
                    <span className="border-b border-white/5 flex-grow mx-2 h-2"></span>
                    <span>{formatCurrency(results.originalAmount)}</span>
                  </div>
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-white/30 whitespace-nowrap">Tax Surcharge</span>
                    <span className="border-b border-white/5 flex-grow mx-2 h-2"></span>
                    <span>{formatCurrency(results.taxAmount)}</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold pt-2 border-t border-white/10">
                    <span className="text-[#0055FF]">GROSS TOTAL</span>
                    <span>{formatCurrency(results.totalAmount)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
