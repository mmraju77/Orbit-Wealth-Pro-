/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { RetirementInputs, RetirementResult } from '@/src/types';
import { Copy, Check, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState, useMemo } from 'react';
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
  const [copied, setCopied] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const results = useMemo(() => {
    const yearsToRetirement = inputs.retirementAge - inputs.currentAge;
    if (yearsToRetirement <= 0) {
      return null;
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

    return {
      totalSavings: balance,
      totalContributions,
      totalInterest: balance - totalContributions,
      yearlyData,
    };
  }, [inputs]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleCopy = () => {
    if (!results) return;
    const text = `Orbit Wealth Pro - Retirement Projection\nTarget Age: ${inputs.retirementAge}\nTotal Savings: ${formatCurrency(results.totalSavings)}\nTotal Contributions: ${formatCurrency(results.totalContributions)}\nInterest Earned: ${formatCurrency(results.totalInterest)}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleInputChange = (field: keyof RetirementInputs, value: number) => {
    const sanitizedValue = Math.max(0, value);
    const newInputs = { ...inputs, [field]: sanitizedValue };

    if (field === 'currentAge') {
      if (sanitizedValue >= inputs.retirementAge) {
        newInputs.retirementAge = sanitizedValue + 1;
      }
    } else if (field === 'retirementAge') {
      if (sanitizedValue <= inputs.currentAge) {
        newInputs.currentAge = Math.max(18, sanitizedValue - 1);
      }
    }

    setInputs(newInputs);
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
            <div className="group">
              <div className="flex justify-between items-end mb-2">
                <Tooltip content="Your current age and the age you wish to retire.">
                  <label className="input-label-editorial mb-0">Age Configuration</label>
                </Tooltip>
                <div className="text-[10px] font-bold text-white/40 tabular-nums">
                  {inputs.currentAge} → {inputs.retirementAge} ({inputs.retirementAge - inputs.currentAge}y)
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="text-[9px] font-bold text-white/20 w-4" aria-hidden="true">NOW</span>
                  <input 
                    id="current-age-range"
                    type="range"
                    min={18}
                    max={80}
                    value={inputs.currentAge}
                    onChange={(e) => handleInputChange('currentAge', Number(e.target.value))}
                    className="flex-1 h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#0055FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0055FF] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                    aria-label="Adjust Current Age"
                  />
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[9px] font-bold text-white/20 w-4" aria-hidden="true">OFF</span>
                  <input 
                    id="retirement-age-range"
                    type="range"
                    min={inputs.currentAge + 1}
                    max={100}
                    value={inputs.retirementAge}
                    onChange={(e) => handleInputChange('retirementAge', Number(e.target.value))}
                    className="flex-1 h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#0055FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0055FF] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                    aria-label="Adjust Retirement Age"
                  />
                </div>
              </div>
            </div>

            <div className="group">
              <div className="flex justify-between items-end mb-2">
                <Tooltip content="The total amount of money you have saved specifically for retirement today.">
                  <label htmlFor="current-savings-range" className="input-label-editorial mb-0">Initial Capital</label>
                </Tooltip>
                <div className="text-xs font-bold text-white/80 tabular-nums">{formatCurrency(inputs.currentSavings)}</div>
              </div>
              <input 
                id="current-savings-range"
                type="range"
                min={0}
                max={1000000}
                step={1000}
                value={inputs.currentSavings}
                onChange={(e) => handleInputChange('currentSavings', Number(e.target.value))}
                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#0055FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0055FF] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                aria-label="Adjust Initial Capital"
              />
            </div>

            <div className="group">
              <div className="flex justify-between items-end mb-2">
                <Tooltip content="How much you plan to add to your savings every month until retirement.">
                  <label htmlFor="monthly-contribution-range" className="input-label-editorial mb-0">Monthly Deposit</label>
                </Tooltip>
                <div className="text-xs font-bold text-white/80 tabular-nums">{formatCurrency(inputs.monthlyContribution)}</div>
              </div>
              <input 
                id="monthly-contribution-range"
                type="range"
                min={0}
                max={20000}
                step={100}
                value={inputs.monthlyContribution}
                onChange={(e) => handleInputChange('monthlyContribution', Number(e.target.value))}
                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#0055FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0055FF] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                aria-label="Adjust Monthly Deposit"
              />
            </div>

            <div className="group">
              <div className="flex justify-between items-end mb-2">
                <Tooltip content="Annual interest rate or growth rate you expect from your investments.">
                  <label htmlFor="expected-yield-range" className="input-label-editorial mb-0">Expected Yield</label>
                </Tooltip>
                <div className="text-xs font-bold text-white/80 tabular-nums">{inputs.expectedReturn}%</div>
              </div>
              <input 
                id="expected-yield-range"
                type="range"
                min={1}
                max={15}
                step={0.1}
                value={inputs.expectedReturn}
                onChange={(e) => handleInputChange('expectedReturn', Number(e.target.value))}
                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#0055FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0055FF] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                aria-label="Adjust Expected Yield"
              />
            </div>
          </div>
        </div>

        <Tooltip content="Run the simulation based on your investment profile.">
          <button 
            className="btn-accent mt-4 w-full focus-visible:ring-offset-black"
            aria-label="Project Retirement Growth"
          >
            Project Growth
          </button>
        </Tooltip>

        <Tooltip content="Download a detailed PDF report of your retirement forecast.">
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
            <div className="editorial-label mb-1">02 — PROJECTED WEALTH</div>
            <h2 className="text-2xl font-semibold tracking-tight">Retirement Summary</h2>
          </div>
          <Tooltip content="Copy the summary stats to your clipboard.">
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

        <AnimatePresence mode="wait">
          {results ? (
            <motion.div
              key="retirement-results"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="flex-1 flex flex-col"
            >
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
                <div className="flex-1 relative w-full overflow-x-auto bg-white/[0.02] rounded-lg" style={{ width: "100%", height: "500px", minWidth: 0 }}>
                  {isMounted && results?.yearlyData && (
                    <div className="flex items-center justify-center min-w-[850px] h-full py-4">
                      <AreaChart 
                        width={800} 
                        height={400} 
                        data={results.yearlyData} 
                        margin={{ top: 20, right: 30, left: 40, bottom: 20 }}
                      >
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
                          tickFormatter={(val) => `${currencySymbol}${(val / 1000).toFixed(0)}k`}
                        />
                        <RechartsTooltip 
                          contentStyle={{ backgroundColor: '#111', border: '1px solid #333', fontSize: '10px' }}
                          formatter={(val: number) => [formatCurrency(val), 'Balance']}
                        />
                        <Area 
                          type="monotone" 
                          dataKey="balance" 
                          stroke="#0055FF" 
                          strokeWidth={3}
                          fillOpacity={1} 
                          fill="url(#colorBalance)" 
                          isAnimationActive={false}
                        />
                      </AreaChart>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="retirement-empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-white/5 rounded-lg"
            >
              <p className="text-xl font-bold tracking-tighter">Insufficient Parameters</p>
              <p className="text-[11px] uppercase tracking-widest font-medium">Target age must exceed current age for growth projection.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </div>
  );
}
