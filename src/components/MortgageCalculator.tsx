/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AmortizationPeriod, MortgageInputs, MortgageResult } from '@/src/types';
import { Copy, Check, Download } from 'lucide-react';
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { useLocale } from '@/src/context/LocaleContext';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from 'recharts';
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
  const [results, setResults] = useState<MortgageResult | null>(null);
  const [copied, setCopied] = useState(false);

  const calculateMortgage = () => {
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

    setResults({
      monthlyPayment,
      totalPayment,
      totalInterest: totalInterestPaid,
      amortizationSchedule,
    });
  };

  useEffect(() => {
    calculateMortgage();
  }, [inputs]);

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
    const newInputs = { ...inputs, [field]: value };
    
    if (field === 'downPayment') {
      newInputs.downPaymentPercent = (value / newInputs.homePrice) * 100;
    } else if (field === 'downPaymentPercent') {
      newInputs.downPayment = (value / 100) * newInputs.homePrice;
    } else if (field === 'homePrice') {
      newInputs.downPaymentPercent = (newInputs.downPayment / value) * 100;
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
              <Tooltip content="The total purchase price of the property you are buying.">
                <label className="input-label-editorial">Home Price</label>
              </Tooltip>
              <div className="flex items-center gap-1">
                <span className="text-xl font-light text-white/30">{currencySymbol}</span>
                <input 
                  type="number"
                  value={inputs.homePrice}
                  onChange={(e) => handleInputChange('homePrice', Number(e.target.value))}
                  className="editorial-input text-3xl"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="group">
                <Tooltip content="Percentage of the home price paid upfront.">
                  <label className="input-label-editorial">Down payment (%)</label>
                </Tooltip>
                <div className="flex items-center gap-1">
                  <input 
                    type="number"
                    value={inputs.downPaymentPercent.toFixed(1)}
                    onChange={(e) => handleInputChange('downPaymentPercent', Number(e.target.value))}
                    className="editorial-input"
                  />
                  <span className="text-sm font-light text-white/30">%</span>
                </div>
              </div>
              <div className="group">
                <Tooltip content="Specific monetary amount paid towards the house at closing.">
                  <label className="input-label-editorial">Amount ({currencySymbol})</label>
                </Tooltip>
                <div className="flex items-center gap-1">
                  <span className="text-sm font-light text-white/30">{currencySymbol}</span>
                  <input 
                    type="number"
                    value={Math.round(inputs.downPayment)}
                    onChange={(e) => handleInputChange('downPayment', Number(e.target.value))}
                    className="editorial-input text-white/60"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="group">
                <Tooltip content="The annual interest rate charged by the lender.">
                  <label className="input-label-editorial">Interest Rate</label>
                </Tooltip>
                <div className="flex items-center gap-1">
                  <input 
                    type="number"
                    step="0.1"
                    value={inputs.interestRate}
                    onChange={(e) => handleInputChange('interestRate', Number(e.target.value))}
                    className="editorial-input"
                  />
                  <span className="text-sm font-light text-white/30">%</span>
                </div>
              </div>
              <div className="group">
                <Tooltip content="Total length of the mortgage in years.">
                  <label className="input-label-editorial">{labels.loan} Term</label>
                </Tooltip>
                <select 
                  value={inputs.loanTerm}
                  onChange={(e) => handleInputChange('loanTerm', Number(e.target.value))}
                  className="editorial-input appearance-none bg-transparent cursor-pointer"
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
            onClick={calculateMortgage}
            className="btn-accent mt-4 w-full"
          >
            Recalculate Projections
          </button>
        </Tooltip>

        <Tooltip content="Export a comprehensive PDF summary of this calculation.">
          <button 
            onClick={generatePDF}
            className="flex items-center justify-center gap-2 w-full py-4 rounded border border-white/10 text-[10px] uppercase tracking-widest font-bold hover:bg-white/5 transition-colors mt-2"
          >
            <Download className="w-3 h-3 text-[#0055FF]" />
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
            <span className="text-[10px] uppercase tracking-widest text-white/30">LATEST CALCULATION</span>
            <Tooltip content="Copy a text summary to your clipboard.">
              <button 
                onClick={handleCopy}
                className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-[#0055FF] hover:text-white transition-colors font-bold"
              >
                {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                {copied ? 'Copied' : 'Copy Results'}
              </button>
            </Tooltip>
          </div>
        </div>

        {results && (
          <>
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
              
              <div className="flex-[1.5] h-[200px] relative">
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                   <div className="text-center">
                      <div className="text-[10px] text-white/30 font-bold uppercase tracking-widest">Ratio</div>
                      <div className="text-lg font-bold text-white/80 tracking-tighter">{((results.totalInterest / results.totalPayment) * 100).toFixed(0)}%</div>
                      <div className="text-[8px] text-[#0055FF] font-bold uppercase">Interest</div>
                   </div>
                </div>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'Interest', value: results.totalInterest },
                        { name: 'Principal', value: inputs.homePrice - inputs.downPayment },
                        { name: 'Equity', value: inputs.downPayment },
                      ]}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                      stroke="none"
                    >
                      <Cell fill="#666666" />
                      <Cell fill="#333333" />
                      <Cell fill="#0055FF" />
                    </Pie>
                    <RechartsTooltip 
                      contentStyle={{ backgroundColor: '#111', border: '1px solid #333', fontSize: '10px' }}
                      itemStyle={{ color: '#fff' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* AMORTIZATION TABLE */}
            <div className="flex-1 border-t border-white/10 pt-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-[11px] font-bold tracking-[0.2em] uppercase">Amortization Schedule — Year 01-30</h3>
              </div>
              
              <div className="overflow-hidden">
                <AmortizationTable schedule={results.amortizationSchedule} />
              </div>
            </div>
          </>
        )}
      </section>
    </div>
  );
}
