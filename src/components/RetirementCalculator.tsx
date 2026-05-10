/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { RetirementInputs, RetirementResult } from '@/src/types';
import { Copy, Check, Download } from 'lucide-react';
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { useLocale } from '@/src/context/LocaleContext';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import Tooltip from './Tooltip';

const INITIAL_INPUTS: RetirementInputs = {
  currentAge: 30,
  retirementAge: 65,
  currentSavings: 50000,
  monthlyContribution: 1000,
  expectedReturn: 7,
};

export default function RetirementCalculator() {
  const { formatCurrency, currencySymbol } = useLocale();
  const [inputs, setInputs] = useState<RetirementInputs>(INITIAL_INPUTS);
  const [results, setResults] = useState<RetirementResult | null>(null);
  const [copied, setCopied] = useState(false);

  const calculateRetirement = () => {
    const yearsToRetirement = inputs.retirementAge - inputs.currentAge;
    if (yearsToRetirement <= 0) {
      setResults(null);
      return;
    }

    const monthlyRate = inputs.expectedReturn / 100 / 12;
    const months = yearsToRetirement * 12;
    
    let balance = inputs.currentSavings;
    let totalContributions = inputs.currentSavings;
    const yearlyData = [{ year: inputs.currentAge, balance }];

    for (let i = 1; i <= months; i++) {
      balance = (balance + inputs.monthlyContribution) * (1 + monthlyRate);
      totalContributions += inputs.monthlyContribution;
      
      if (i % 12 === 0) {
        yearlyData.push({ 
          year: inputs.currentAge + (i / 12), 
          balance 
        });
      }
    }

    setResults({
      totalSavings: balance,
      totalContributions,
      totalInterest: balance - totalContributions,
      yearlyData,
    });
  };

  useEffect(() => {
    calculateRetirement();
  }, [inputs]);

  const handleCopy = () => {
    if (!results) return;
    const text = `Orbit Wealth Pro - Retirement Projection\nTarget Age: ${inputs.retirementAge}\nTotal Savings: ${formatCurrency(results.totalSavings)}\nTotal Contributions: ${formatCurrency(results.totalContributions)}\nInterest Earned: ${formatCurrency(results.totalInterest)}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const generatePDF = () => {
    if (!results) return;
    const doc = new jsPDF();
    
    doc.setFontSize(20);
    doc.text('ORBIT WEALTH PRO - RETIREMENT PROJECTION', 14, 22);
    
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 30);
    
    doc.setTextColor(0);
    doc.setFontSize(14);
    doc.text('Profile Configuration', 14, 45);
    
    const inputData = [
      ['Current Age', String(inputs.currentAge)],
      ['Target Retirement Age', String(inputs.retirementAge)],
      ['Initial Savings', formatCurrency(inputs.currentSavings)],
      ['Monthly Contribution', formatCurrency(inputs.monthlyContribution)],
      ['Expected Annual Return', `${inputs.expectedReturn}%`],
    ];
    
    autoTable(doc, {
      startY: 50,
      head: [['Parameter', 'Value']],
      body: inputData,
      theme: 'grid',
      headStyles: { fillColor: [0, 85, 255] }
    });
    
    doc.setFontSize(14);
    doc.text('Growth Summary', 14, (doc as any).lastAutoTable.finalY + 15);
    
    const resultData = [
      ['Total Savings at Retirement', formatCurrency(results.totalSavings)],
      ['Total Contributions Made', formatCurrency(results.totalContributions)],
      ['Total Interest Accrued', formatCurrency(results.totalInterest)],
    ];
    
    autoTable(doc, {
      startY: (doc as any).lastAutoTable.finalY + 20,
      head: [['Metric', 'Result']],
      body: resultData,
      theme: 'grid',
      headStyles: { fillColor: [0, 85, 255] }
    });
    
    doc.save(`Retirement_Projection_${inputs.retirementAge}.pdf`);
  };

  return (
    <div className="flex px-10 py-10 gap-12 max-w-full">
      <section className="w-[320px] flex flex-col gap-8 shrink-0">
        <div>
          <div className="editorial-label mb-4">01 — GROWTH PARAMETERS</div>
          <h2 className="text-2xl font-semibold tracking-tight mb-8">Investment Profile</h2>
          
          <div className="space-y-8">
            <div className="grid grid-cols-2 gap-6">
              <div className="group">
                <Tooltip content="Your current age in years.">
                  <label className="input-label-editorial">Current Age</label>
                </Tooltip>
                <input 
                  type="number"
                  value={inputs.currentAge}
                  onChange={(e) => setInputs({ ...inputs, currentAge: Number(e.target.value) })}
                  className="editorial-input"
                />
              </div>
              <div className="group">
                <Tooltip content="The age at which you plan to stop working and start using savings.">
                  <label className="input-label-editorial">Retire At</label>
                </Tooltip>
                <input 
                  type="number"
                  value={inputs.retirementAge}
                  onChange={(e) => setInputs({ ...inputs, retirementAge: Number(e.target.value) })}
                  className="editorial-input"
                />
              </div>
            </div>

            <div className="group">
              <Tooltip content="The total amount of money you have saved specifically for retirement today.">
                <label className="input-label-editorial">Initial Savings</label>
              </Tooltip>
              <div className="flex items-center gap-1">
                <span className="text-xl font-light text-white/30">{currencySymbol}</span>
                <input 
                  type="number"
                  value={inputs.currentSavings}
                  onChange={(e) => setInputs({ ...inputs, currentSavings: Number(e.target.value) })}
                  className="editorial-input text-2xl"
                />
              </div>
            </div>

            <div className="group">
              <Tooltip content="How much you plan to add to your savings every month until retirement.">
                <label className="input-label-editorial">Monthly Contribution</label>
              </Tooltip>
              <div className="flex items-center gap-1">
                <span className="text-xl font-light text-white/30">{currencySymbol}</span>
                <input 
                  type="number"
                  value={inputs.monthlyContribution}
                  onChange={(e) => setInputs({ ...inputs, monthlyContribution: Number(e.target.value) })}
                  className="editorial-input text-2xl"
                />
              </div>
            </div>

            <div className="group">
              <Tooltip content="Annual interest rate or growth rate you expect from your investments.">
                <label className="input-label-editorial">Expected Return (%)</label>
              </Tooltip>
              <div className="flex items-center gap-1">
                <input 
                  type="number"
                  step="0.1"
                  value={inputs.expectedReturn}
                  onChange={(e) => setInputs({ ...inputs, expectedReturn: Number(e.target.value) })}
                  className="editorial-input"
                />
                <span className="text-sm font-light text-white/30">%</span>
              </div>
            </div>
          </div>
        </div>

        <Tooltip content="Run the simulation based on your investment profile.">
          <button 
            onClick={calculateRetirement}
            className="btn-accent mt-4 w-full"
          >
            Project Growth
          </button>
        </Tooltip>

        <Tooltip content="Download a detailed PDF report of your retirement forecast.">
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
            <div className="editorial-label mb-1">02 — PROJECTED WEALTH</div>
            <h2 className="text-2xl font-semibold tracking-tight">Retirement Summary</h2>
          </div>
          <Tooltip content="Copy the summary stats to your clipboard.">
            <button 
              onClick={handleCopy}
              className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-[#0055FF] hover:text-white transition-colors font-bold"
            >
              {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
              {copied ? 'Copied' : 'Copy Results'}
            </button>
          </Tooltip>
        </div>

        {results ? (
          <>
            <div className="flex gap-12 mb-10 overflow-hidden">
              <div className="flex-1">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-[64px] font-extrabold tracking-tighter leading-none mb-2 tabular-nums"
                >
                  {formatCurrency(results.totalSavings).split('.')[0]}
                  <span className="text-xl font-light text-white/30 ml-2">
                    .{formatCurrency(results.totalSavings).split('.')[1] || '00'}
                  </span>
                </motion.div>
                <p className="text-sm text-white/50 max-w-[200px]">Estimated total nest egg at age {inputs.retirementAge}.</p>
              </div>
              <div className="w-px bg-white/10"></div>
              <div className="flex-1 space-y-4">
                <div>
                  <div className="text-[24px] font-bold tracking-tighter tabular-nums text-white/80">
                    {formatCurrency(results.totalInterest)}
                  </div>
                  <p className="text-[10px] uppercase tracking-wider text-white/40 font-semibold">Compound Interest Earned</p>
                </div>
                <div>
                  <div className="text-[24px] font-bold tracking-tighter tabular-nums text-white/80">
                    {formatCurrency(results.totalContributions)}
                  </div>
                  <p className="text-[10px] uppercase tracking-wider text-white/40 font-semibold">Total Contributions</p>
                </div>
              </div>
            </div>

            <div className="flex-1 border-t border-white/10 pt-8 flex flex-col min-h-0">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-[11px] font-bold tracking-[0.2em] uppercase">Growth Timeline — Projected Balance</h3>
              </div>
              
              <div className="flex-1 min-h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={results.yearlyData}>
                    <defs>
                      <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0055FF" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#0055FF" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                    <XAxis 
                      dataKey="year" 
                      stroke="#ffffff30" 
                      fontSize={10} 
                      tickLine={false} 
                      axisLine={false}
                      dy={10}
                    />
                    <YAxis 
                      stroke="#ffffff30" 
                      fontSize={10} 
                      tickLine={false} 
                      axisLine={false}
                      tickFormatter={(val) => `${currencySymbol}${val / 1000}k`}
                    />
                    <RechartsTooltip 
                      contentStyle={{ backgroundColor: '#111', border: '1px solid #333', fontSize: '10px' }}
                      formatter={(val: number) => [formatCurrency(val), 'Balance']}
                      itemStyle={{ color: '#0055FF' }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="balance" 
                      stroke="#0055FF" 
                      strokeWidth={2}
                      fillOpacity={1} 
                      fill="url(#colorBalance)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-white/5 rounded-lg opacity-40">
            <p className="text-xl font-bold tracking-tighter">Insufficient Parameters</p>
            <p className="text-[11px] uppercase tracking-widest font-medium">Target age must exceed current age for growth projection.</p>
          </div>
        )}
      </section>
    </div>
  );
}
