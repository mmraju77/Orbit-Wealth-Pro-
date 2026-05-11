/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { TaxInputs, TaxResult } from '@/src/types';
import { Copy, Check, ArrowRightLeft, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect, useMemo } from 'react';
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
  const [copied, setCopied] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const results = useMemo(() => {
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

    return {
      originalAmount,
      taxAmount,
      totalAmount,
    };
  }, [inputs]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleCopy = () => {
    if (!results) return;
    const mode = inputs.isAddingTax ? 'Add Tax' : 'Remove Tax';
    const text = `Orbit Wealth Pro - ${mode}\nBase Amount: ${formatCurrency(results.originalAmount)}\n${labels.tax} Rate: ${inputs.taxRate}%\n${labels.tax} Amount: ${formatCurrency(results.taxAmount)}\nTotal: ${formatCurrency(results.totalAmount)}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleInputChange = (field: keyof TaxInputs, value: number) => {
    setInputs(prev => ({ ...prev, [field]: Math.max(0, value) }));
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
              <div className="flex justify-between items-end mb-2">
                <Tooltip content="The base monetary value you wish to calculate tax for.">
                  <label htmlFor="base-amount-input" className="input-label-editorial mb-0">Base Amount</label>
                </Tooltip>
                <div className="flex items-center gap-1">
                  <span className="text-xs font-light text-white/30" aria-hidden="true">{currencySymbol}</span>
                  <input 
                    id="base-amount-input"
                    type="number"
                    value={inputs.amount}
                    onChange={(e) => handleInputChange('amount', Number(e.target.value))}
                    className="bg-transparent text-right outline-none text-white font-medium text-lg w-24 focus-visible:ring-1 focus-visible:ring-[#0055FF] rounded"
                    aria-label={`Base Amount in ${currencySymbol}`}
                  />
                </div>
              </div>
              <input 
                id="base-amount-range"
                type="range"
                min={0}
                max={50000}
                step={100}
                value={inputs.amount}
                onChange={(e) => handleInputChange('amount', Number(e.target.value))}
                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#0055FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0055FF] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                aria-label="Adjust Base Amount"
              />
            </div>

            <div className="group">
              <div className="flex justify-between items-end mb-2">
                <Tooltip content="The percentage rate of tax to be applied or backed out.">
                  <label htmlFor="tax-rate-range" className="input-label-editorial mb-0">{labels.tax} Rate</label>
                </Tooltip>
                <span className="text-xs font-bold text-white/80 tabular-nums">{inputs.taxRate}%</span>
              </div>
              <input 
                id="tax-rate-range"
                type="range"
                min={0}
                max={50}
                step={0.5}
                value={inputs.taxRate}
                onChange={(e) => handleInputChange('taxRate', Number(e.target.value))}
                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#0055FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0055FF] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                aria-label={`Adjust ${labels.tax} Rate`}
              />
            </div>

            <div className="pt-4 space-y-4">
              <div className="flex bg-white/5 rounded p-1 p-0.5 border border-white/10">
                <button 
                  onClick={() => setInputs({ ...inputs, isAddingTax: true })}
                  className={`flex-1 py-2 text-[10px] font-bold tracking-widest transition-all rounded ${inputs.isAddingTax ? 'bg-[#0055FF] text-white shadow-lg' : 'text-white/30 hover:text-white/60'}`}
                  aria-pressed={inputs.isAddingTax}
                >
                  ADD {labels.tax.toUpperCase()}
                </button>
                <button 
                  onClick={() => setInputs({ ...inputs, isAddingTax: false })}
                  className={`flex-1 py-2 text-[10px] font-bold tracking-widest transition-all rounded ${!inputs.isAddingTax ? 'bg-[#0055FF] text-white shadow-lg' : 'text-white/30 hover:text-white/60'}`}
                  aria-pressed={!inputs.isAddingTax}
                >
                  REMOVE {labels.tax.toUpperCase()}
                </button>
              </div>
              
              <div className="text-[10px] text-white/30 font-medium leading-relaxed italic px-1">
                {inputs.isAddingTax 
                  ? `Calculating the total amount by adding ${inputs.taxRate}% tax to your base figure.` 
                  : `Extracting ${inputs.taxRate}% tax from your total figure to find the original amount.`}
              </div>
            </div>
          </div>
        </div>

        <Tooltip content={`Perform the ${labels.tax} calculation based on current parameters.`}>
          <button 
            className="btn-accent mt-4 w-full focus-visible:ring-offset-black"
            aria-label={`Calculate ${labels.tax}`}
          >
            Calculate {labels.tax}
          </button>
        </Tooltip>

        <Tooltip content="Generate a PDF document of this tax breakdown.">
          <button 
            onClick={generatePDF}
            className="flex items-center justify-center gap-2 w-full py-4 rounded border border-white/10 text-[10px] uppercase tracking-widest font-bold hover:bg-white/5 transition-colors mt-2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#0055FF]"
            aria-label="Download PDF Report"
          >
            <Download className="w-3 h-3 text-[#0055FF]" aria-hidden="true" />
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
          <div className="flex flex-col items-end gap-3">
            <div className={`px-3 py-1 rounded-full border text-[9px] font-black uppercase tracking-tighter ${inputs.isAddingTax ? 'bg-green-500/10 border-green-500/20 text-green-500' : 'bg-[#0055FF]/10 border-[#0055FF]/20 text-[#0055FF]'}`}>
              {inputs.isAddingTax ? 'Mode: Net to Gross (Adding Tax)' : `Mode: Gross to Net (Removing ${labels.tax})`}
            </div>
            <Tooltip content="Copy these tax results to your clipboard.">
            <button 
              onClick={handleCopy}
              className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-[#0055FF] hover:text-white transition-colors font-bold focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#0055FF] rounded px-1"
              aria-label={copied ? "Results copied to clipboard" : "Copy Results to clipboard"}
            >
              {copied ? <Check className="w-3 h-3" aria-hidden="true" /> : <Copy className="w-3 h-3" aria-hidden="true" />}
                {copied ? 'Copied' : 'Copy Results'}
              </button>
            </Tooltip>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {results && (
            <motion.div
              key="tax-results"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="w-full h-full"
            >
              <div className="space-y-12 mb-12">
                <div className="flex gap-12 overflow-hidden">
                  <div className="flex-[2]">
                    <motion.div 
                      key={`total-${results.totalAmount}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-[64px] font-extrabold tracking-tighter leading-none mb-2 tabular-nums"
                    >
                      {formatCurrency(results.totalAmount).split('.')[0]}
                      <span className="text-xl font-light text-white/30 ml-2">
                        .{formatCurrency(results.totalAmount).split('.')[1] || '00'}
                      </span>
                    </motion.div>
                    <p className="text-sm text-white/50 max-w-[240px]">
                      {inputs.isAddingTax 
                        ? `Gross amount calculated by adding ${labels.tax} to your base figure.` 
                        : `Net amount remaining after extracting the ${labels.tax} component.`}
                    </p>
                  </div>
                  <div className="w-px bg-white/10"></div>
                  <div className="flex-1 flex items-center justify-center bg-white/[0.02] rounded-lg" style={{ width: "250px", height: "250px" }}>
                    {isMounted && (
                      <div className="flex items-center justify-center">
                        <PieChart width={220} height={200}>
                          <Pie
                            data={results ? [
                              { name: 'Net Amount', value: results.originalAmount },
                              { name: labels.tax, value: results.taxAmount },
                            ] : []}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={90}
                            paddingAngle={5}
                            dataKey="value"
                            stroke="none"
                            isAnimationActive={false}
                          >
                            <Cell fill="#333333" />
                            <Cell fill="#0055FF" />
                          </Pie>
                          <RechartsTooltip 
                            contentStyle={{ backgroundColor: '#111', border: '1px solid #333', fontSize: '10px' }}
                            formatter={(val: number) => formatCurrency(val)}
                          />
                        </PieChart>
                      </div>
                    )}
                  </div>
                </div>
              </div>
  
              <div className="grid grid-cols-2 gap-12 border-t border-white/10 pt-12">
                <div className="space-y-2">
                  <div className="text-[10px] font-bold tracking-widest text-white/20 uppercase">
                    {inputs.isAddingTax ? 'Base (Net) Valuation' : 'Resulting (Net) Valuation'}
                  </div>
                  <div className="text-2xl font-light tabular-nums">{formatCurrency(results.originalAmount)}</div>
                  <p className="text-xs text-white/40 leading-relaxed font-medium">
                    {inputs.isAddingTax 
                      ? 'The base taxable value before government surcharges.' 
                      : 'The underlying value after removing the tax component from your total.'}
                  </p>
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
                      <span className={inputs.isAddingTax ? "text-[#0055FF]" : "text-white/40"}>
                        {inputs.isAddingTax ? 'RESULTING GROSS' : 'ORIGINAL GROSS'}
                      </span>
                      <span>{formatCurrency(results.totalAmount)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </div>
  );
}
