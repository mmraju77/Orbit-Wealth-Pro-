/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AmortizationPeriod, MortgageInputs, MortgageResult } from '@/src/types';
import { Copy, Check, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState, useMemo } from 'react';
import { useLocale } from '@/src/context/LocaleContext';
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend } from 'recharts';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import AmortizationTable from './AmortizationTable';
import Tooltip from './Tooltip';

const INITIAL_INPUTS: MortgageInputs = {
  homePrice: 450000,
  downPayment: 90000,
  downPaymentPercent: 20,
  interestRate: 6.5,
  loanTerm: 30,
};

export default function MortgageCalculator() {
  const { formatCurrency, labels, currencySymbol } = useLocale();
  const [inputs, setInputs] = useState<MortgageInputs>(INITIAL_INPUTS);
  const [copied, setCopied] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const results = useMemo(() => {
    const principal = inputs.homePrice - inputs.downPayment;
    const monthlyRate = inputs.interestRate / 100 / 12;
    const numberOfPayments = inputs.loanTerm * 12;

    const monthlyPayment =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

    const amortizationSchedule: AmortizationPeriod[] = [];
    let remainingBalance = principal;
    let totalInterestPaid = 0;
    let totalPayment = 0;

    for (let i = 1; i <= numberOfPayments; i++) {
      const interest = remainingBalance * monthlyRate;
      const principalPaid = monthlyPayment - interest;
      remainingBalance -= principalPaid;
      totalInterestPaid += interest;
      totalPayment += monthlyPayment;

      amortizationSchedule.push({
        period: i,
        payment: monthlyPayment,
        principal: principalPaid,
        interest: interest,
        remainingBalance: Math.max(0, remainingBalance),
        totalInterestPaid: totalInterestPaid,
      });
    }

    return {
      monthlyPayment,
      totalPayment,
      totalInterest: totalInterestPaid,
      amortizationSchedule,
    };
  }, [inputs]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleCopy = () => {
    if (!results) return;
    const text = `Orbit Wealth Pro - ${labels.loan} Estimate\nHome Price: ${formatCurrency(inputs.homePrice)}\n${labels.loan} Term: ${inputs.loanTerm} Years\nMonthly Payment: ${formatCurrency(results.monthlyPayment)}\nTotal Interest: ${formatCurrency(results.totalInterest)}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const generatePDF = () => {
    if (!results) return;
    const doc = new jsPDF();
    
    doc.setFontSize(20);
    doc.text(`ORBIT WEALTH PRO - ${labels.loan.toUpperCase()} REPORT`, 14, 22);
    
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 30);
    
    doc.setTextColor(0);
    doc.setFontSize(14);
    doc.text('Configuration', 14, 45);
    
    const inputData = [
      ['Home Price', formatCurrency(inputs.homePrice)],
      ['Down Payment', `${formatCurrency(inputs.downPayment)} (${inputs.downPaymentPercent.toFixed(1)}%)`],
      ['Interest Rate', `${inputs.interestRate}%`],
      ['Loan Term', `${inputs.loanTerm} Years`],
    ];
    
    autoTable(doc, {
      startY: 50,
      head: [['Parameter', 'Value']],
      body: inputData,
      theme: 'grid',
      headStyles: { fillColor: [0, 85, 255] }
    });
    
    doc.setFontSize(14);
    doc.text('Impact Summary', 14, (doc as any).lastAutoTable.finalY + 15);
    
    const resultData = [
      ['Monthly Payment', formatCurrency(results.monthlyPayment)],
      ['Total Principal Paid', formatCurrency(inputs.homePrice - inputs.downPayment)],
      ['Total Interest Paid', formatCurrency(results.totalInterest)],
      ['Total Cost of Loan', formatCurrency(results.totalPayment)],
    ];
    
    autoTable(doc, {
      startY: (doc as any).lastAutoTable.finalY + 20,
      head: [['Impact Metric', 'Value']],
      body: resultData,
      theme: 'grid',
      headStyles: { fillColor: [0, 85, 255] }
    });
    
    doc.save(`Orbit_Financial_Report.pdf`);
  };

  const handleInputChange = (field: keyof MortgageInputs, value: number) => {
    const sanitizedValue = Math.max(0, value);
    const newInputs = { ...inputs, [field]: sanitizedValue };
    
    if (field === 'downPayment') {
      newInputs.downPaymentPercent = (sanitizedValue / newInputs.homePrice) * 100;
    } else if (field === 'downPaymentPercent') {
      const clampedPercent = Math.min(100, sanitizedValue);
      newInputs.downPaymentPercent = clampedPercent;
      newInputs.downPayment = (clampedPercent / 100) * newInputs.homePrice;
      newInputs[field] = clampedPercent;
    } else if (field === 'homePrice') {
      const safePrice = Math.max(1000, sanitizedValue);
      newInputs.homePrice = safePrice;
      newInputs.downPayment = (newInputs.downPaymentPercent / 100) * safePrice;
      newInputs[field] = safePrice;
    }

    setInputs(newInputs);
  };

  return (
    <div className="flex px-10 py-10 gap-12 max-w-full">
      {/* Left Column: Inputs */}
      <section className="w-[320px] flex flex-col gap-8 shrink-0">
        <div>
          <div className="editorial-label mb-4">01 — PARAMETERS</div>
          <h2 className="text-2xl font-semibold tracking-tight mb-8">{labels.loan} Profile</h2>
          
          <div className="space-y-8">
            <div className="group">
              <div className="flex justify-between items-end mb-2">
                <Tooltip content="The total purchase price of the property you are buying.">
                  <label htmlFor="home-price-input" className="input-label-editorial mb-0">Home Price</label>
                </Tooltip>
                <div className="flex items-center gap-1">
                  <span className="text-xs font-light text-white/30" aria-hidden="true">{currencySymbol}</span>
                  <input 
                    id="home-price-input"
                    type="number"
                    value={inputs.homePrice}
                    onChange={(e) => handleInputChange('homePrice', Number(e.target.value))}
                    className="bg-transparent text-right outline-none text-white font-medium text-lg w-24 focus-visible:ring-1 focus-visible:ring-[#0055FF] rounded"
                    aria-label={`Home Price in ${currencySymbol}`}
                  />
                </div>
              </div>
              <input 
                id="home-price-range"
                type="range"
                min={50000}
                max={2000000}
                step={5000}
                value={inputs.homePrice}
                onChange={(e) => handleInputChange('homePrice', Number(e.target.value))}
                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#0055FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0055FF] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                aria-label="Adjust Home Price"
              />
            </div>
            
            <div className="space-y-6">
              <div className="group">
                <div className="flex justify-between items-end mb-2">
                  <Tooltip content="Percentage of the home price paid upfront.">
                    <label htmlFor="down-payment-range" className="input-label-editorial mb-0">Down Payment</label>
                  </Tooltip>
                  <div className="text-xs font-bold text-white/60 tabular-nums">
                    {formatCurrency(inputs.downPayment)} ({inputs.downPaymentPercent.toFixed(1)}%)
                  </div>
                </div>
                <input 
                  id="down-payment-range"
                  type="range"
                  min={0}
                  max={90}
                  step={0.5}
                  value={inputs.downPaymentPercent}
                  onChange={(e) => handleInputChange('downPaymentPercent', Number(e.target.value))}
                  className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#0055FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0055FF] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                  aria-label="Adjust Down Payment Percentage"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 pt-2">
              <div className="group">
                <div className="flex justify-between items-center mb-2">
                  <Tooltip content="The annual interest rate charged by the lender.">
                    <label htmlFor="interest-rate-range" className="input-label-editorial mb-0">Rate</label>
                  </Tooltip>
                  <span className="text-xs font-bold text-white/80 tabular-nums">{inputs.interestRate}%</span>
                </div>
                <input 
                  id="interest-rate-range"
                  type="range"
                  min={0.1}
                  max={15}
                  step={0.1}
                  value={inputs.interestRate}
                  onChange={(e) => handleInputChange('interestRate', Number(e.target.value))}
                  className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#0055FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0055FF] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                  aria-label="Adjust Interest Rate"
                />
              </div>
              <div className="group">
                <Tooltip content="Total length of the mortgage in years.">
                  <label htmlFor="loan-term-select" className="input-label-editorial">Term (Years)</label>
                </Tooltip>
                <select 
                  id="loan-term-select"
                  value={inputs.loanTerm}
                  onChange={(e) => handleInputChange('loanTerm', Number(e.target.value))}
                  className="editorial-input appearance-none bg-transparent cursor-pointer w-full focus-visible:ring-1 focus-visible:ring-[#0055FF]"
                  aria-label="Select Loan Term"
                >
                  <option value={10} className="bg-[#0A0A0A]">10 Years</option>
                  <option value={15} className="bg-[#0A0A0A]">15 Years</option>
                  <option value={20} className="bg-[#0A0A0A]">20 Years</option>
                  <option value={30} className="bg-[#0A0A0A]">30 Years</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <Tooltip content="Update the calculations based on current inputs.">
          <button 
            className="btn-accent mt-4 w-full focus-visible:ring-offset-black"
            aria-label="Recalculate Projections"
          >
            Recalculate Projections
          </button>
        </Tooltip>

        <Tooltip content="Export a comprehensive PDF summary of this calculation.">
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

      {/* Right Column: Results */}
      <section className="flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-6">
          <div>
            <div className="editorial-label mb-1">02 — ESTIMATED OBLIGATION</div>
            <h2 className="text-2xl font-semibold tracking-tight">Monthly Summary</h2>
          </div>
          <div className="flex flex-col items-end gap-2">
            <span className="text-[10px] uppercase tracking-widest text-white/30" aria-label="Status">LATEST CALCULATION</span>
            <Tooltip content="Copy a text summary to your clipboard.">
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
              key="mortgage-results"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="flex-1 flex flex-col"
            >
              <div className="flex gap-12 mb-10 overflow-hidden">
                <div className="flex-[2]">
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-[64px] font-extrabold tracking-tighter leading-none mb-2 tabular-nums text-white"
                  >
                    {formatCurrency(results.monthlyPayment).split('.')[0]}
                    <span className="text-xl font-light text-white/30 ml-2">
                      .{formatCurrency(results.monthlyPayment).split('.')[1] || '00'}
                    </span>
                  </motion.div>
                  <p className="text-sm text-white/50 max-w-[200px]">Principal & Interest combined monthly payment.</p>
                  
                  <div className="mt-8 grid grid-cols-2 gap-4">
                     <div className="p-4 rounded bg-white/5 border border-white/5">
                        <div className="text-sm font-bold tabular-nums text-white/80">{formatCurrency(results.totalInterest)}</div>
                        <div className="text-[9px] uppercase tracking-wider text-white/30 font-bold">Total Interest</div>
                     </div>
                     <div className="p-4 rounded bg-white/5 border border-white/5">
                        <div className="text-sm font-bold tabular-nums text-white/80">{formatCurrency(results.totalPayment)}</div>
                        <div className="text-[9px] uppercase tracking-wider text-white/30 font-bold">Total Cost</div>
                     </div>
                  </div>
                </div>
                
                <div className="w-px bg-white/10"></div>
                <div className="flex-[1.5] flex items-center justify-center bg-white/[0.02] rounded-lg" style={{ width: "350px", height: "350px" }}>
                  {isMounted && results && (
                    <div className="relative">
                      {/* Centered Stats Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                        <div className="text-center">
                          <div className="text-[10px] text-white/30 font-bold uppercase tracking-widest">Ratio</div>
                          <div className="text-lg font-bold text-white/80 tracking-tighter">
                            {((results.totalInterest / results.totalPayment) * 100).toFixed(0)}%
                          </div>
                          <div className="text-[8px] text-[#0055FF] font-bold uppercase">Interest</div>
                        </div>
                      </div>
  
                      <PieChart width={350} height={350}>
                        <Pie
                          data={[
                            { name: 'Interest', value: results.totalInterest },
                            { name: 'Principal', value: inputs.homePrice - inputs.downPayment },
                            { name: 'Equity', value: inputs.downPayment },
                          ]}
                          cx="50%"
                          cy="50%"
                          innerRadius={80}
                          outerRadius={110}
                          paddingAngle={5}
                          dataKey="value"
                          stroke="none"
                          isAnimationActive={false}
                        >
                          <Cell fill="#0055FF" />
                          <Cell fill="#FFFFFF" />
                          <Cell fill="#333333" />
                        </Pie>
                        <RechartsTooltip 
                          contentStyle={{ backgroundColor: '#111', border: '1px solid #333', fontSize: '10px' }}
                          itemStyle={{ color: '#fff' }}
                        />
                      </PieChart>
                    </div>
                  )}
                </div>
              </div>
  
              {/* AMORTIZATION TABLE */}
              <div className="flex-1 border-t border-white/10 pt-8">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-[11px] font-bold tracking-[0.2em] uppercase">Amortization Schedule — Year 01-30</h3>
                </div>
                
                <div className="mb-10 relative w-full overflow-x-auto bg-white/[0.02] rounded-lg" style={{ width: "100%", height: "500px", minWidth: 0 }}>
                  {isMounted && results?.amortizationSchedule && (
                    <div className="flex items-center justify-center min-w-[850px] h-full py-4">
                      <LineChart 
                        width={800} 
                        height={400} 
                        data={results.amortizationSchedule.filter((_, i) => i % 12 === 0)} 
                        margin={{ top: 20, right: 30, left: 40, bottom: 20 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                        <XAxis 
                          dataKey="period" 
                          stroke="#ffffff30" 
                          fontSize={10} 
                          tickLine={false} 
                          axisLine={false}
                          tickFormatter={(val) => `Year ${Math.floor(val / 12)}`}
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
                        />
                        <Legend verticalAlign="top" height={36}/>
                        <Line 
                          type="monotone" 
                          name="Remaining Balance"
                          dataKey="remainingBalance" 
                          stroke="#0055FF" 
                          strokeWidth={3}
                          dot={false}
                          isAnimationActive={false}
                        />
                        <Line 
                          type="monotone" 
                          name="Principal"
                          dataKey="principal" 
                          stroke="#FFFFFF" 
                          strokeWidth={2}
                          dot={false}
                          isAnimationActive={false}
                        />
                        <Line 
                          type="monotone" 
                          name="Interest"
                          dataKey="interest" 
                          stroke="#666666" 
                          strokeWidth={2}
                          dot={false}
                          isAnimationActive={false}
                        />
                      </LineChart>
                    </div>
                  )}
                </div>
  
                <div className="overflow-hidden">
                  <AmortizationTable schedule={results.amortizationSchedule} />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </div>
  );
}
