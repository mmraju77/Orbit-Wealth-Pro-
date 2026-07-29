import { CalculatorSEO } from "./CalculatorSEO";
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from 'react';
import Breadcrumbs from './Breadcrumbs';
import RelatedTools from './RelatedTools';
import { Percent, Download, Share2, Globe, Shield, Wallet } from 'lucide-react';
import { useLocale } from '../context/LocaleContext';
import { TaxInputs } from '../types';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import jsPDF from 'jspdf';
import { useParams, Link } from 'react-router-dom';
import SEOSection from './SEOSection';
import { REGIONAL_TAX_RULES } from '../data/taxRules';
import { normalizeRegionKey } from '../data/pSEOData';
import NumericInput from './NumericInput';

export default function IncomeTaxCalculator() {

  
  const relatedTools = [
    {
      "title": "GST Calculator",
      "path": "/calculators/tax/gst",
      "description": "Calculate inclusive or exclusive GST amounts."
    },
    {
      "title": "Gratuity Calculator",
      "path": "/calculators/salary/gratuity",
      "description": "Estimate your gratuity based on tenure."
    },
    {
      "title": "Break Even",
      "path": "/calculators/business/break-even",
      "description": "Calculate the point where costs equal revenue."
    }
  ];
const breadcrumbItems = [
    { label: 'Tax' },
    { label: 'Income Tax' }
  ];

  const { region } = useParams<{ region: string }>();
  const { formatCurrency, labels, currency, formatValue, currencySymbol } = useLocale();
  const [inputs, setInputs] = useState({
    amount: 1000000,
  });
  const [isMounted, setIsMounted] = useState(false);

  const countryKey = useMemo(() => {
    if (region) return normalizeRegionKey(region);
    // Fallback based on currency if no region in URL
    const map: Record<string, string> = {
      INR: 'india', USD: 'usa', GBP: 'uk', CAD: 'canada', AUD: 'australia',
      EUR: 'germany', // Default EUR to Germany for tax logic
      CHF: 'switzerland', NOK: 'norway', SEK: 'sweden', DKK: 'denmark'
    };
    return map[currency] || 'usa';
  }, [region, currency]);

  const taxRules = REGIONAL_TAX_RULES[countryKey] || REGIONAL_TAX_RULES['usa'];

  const calculateTax = (income: number) => {
    const taxableIncome = Math.max(0, income - taxRules.standardDeduction);
    let totalTax = 0;
    let prevLimit = 0;

    for (const bracket of taxRules.brackets) {
      if (taxableIncome <= prevLimit) break;

      const currentLimit = bracket.limit === null ? taxableIncome : bracket.limit;
      const taxableInThisBracket = Math.min(taxableIncome, currentLimit) - prevLimit;

      if (taxableInThisBracket > 0) {
        totalTax += taxableInThisBracket * bracket.rate;
      }

      if (bracket.limit === null) break;
      prevLimit = bracket.limit;
    }

    if (taxRules.additionalTaxes) {
      taxRules.additionalTaxes.forEach(tax => {
        if (tax.type === 'tax_percent') {
          totalTax += totalTax * tax.rate;
        } else if (tax.type === 'income_percent') {
          totalTax += income * tax.rate;
        }
      });
    }

    return totalTax;
  };

  const [results, setResults] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      const tax = calculateTax(inputs.amount);

      setResults({ 
        taxAmount: tax,
        totalAmount: inputs.amount - tax,
        originalAmount: inputs.amount
      });
    }, 0);

    return () => clearTimeout(timer);
  }, [inputs, countryKey]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(22);
    doc.text(`ORBIT WEALTH PRO: Income Tax Analysis (${taxRules.currency})`, 20, 20);
    doc.setFontSize(12);
    doc.text(`Annual Gross Income: ${formatCurrency(inputs.amount)}`, 20, 40);
    doc.text(`Effective Tax: ${formatCurrency(results.taxAmount)}`, 20, 50);
    doc.text(`Take-home Pay: ${formatCurrency(results.totalAmount)}`, 20, 60);
    doc.text(`Jurisdiction: ${countryKey.toUpperCase()}`, 20, 70);
    doc.save(`income-tax-analysis-${countryKey}.pdf`);
  };


  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Orbit Wealth Pro Calculator',
          text: 'Check out this financial calculator!',
          url: window.location.href,
        });
      } catch (error) {
        if (error.name !== 'AbortError') {
          navigator.clipboard.writeText(window.location.href);
          alert('Calculator link copied to clipboard!');
        }
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Calculator link copied to clipboard!');
    }
  };

  if (!results) return (
    <div
      className="animate-pulse h-96 bg-white/5 rounded-3xl w-full max-w-7xl mx-auto mt-8" />
  );

  return (
    <div className="space-y-8 pb-20">
      <Breadcrumbs items={breadcrumbItems} />
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <header className="space-y-2">
          <div className="flex items-center gap-2 mb-4">
             <Percent className="text-[#D4AF37] w-6 h-6" />
             <h1 className="text-5xl font-bold tracking-tighter text-[#f59e0b]">Income Tax Calculator</h1>
          </div>
          <p className="text-white/70 max-w-xl text-lg leading-relaxed">
            Personalized income tax analysis for {countryKey.toUpperCase()} using the latest progressive fiscal logic.
          </p>
        </header>

        <div className="flex items-center gap-2">
          <button onClick={downloadPDF} className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/5 rounded-lg text-base font-bold transition-all">
            <Download className="w-4 h-4" /> PDF Report
          </button>
          <button onClick={handleShare} className="flex items-center gap-3 px-4 py-2 bg-[#D4AF37] hover:bg-[#D4AF37]/90 rounded-lg text-base font-bold transition-all shadow-lg shadow-[#D4AF37]/20">
            <Share2 className="w-4 h-4" /> Share
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <section className="bg-white/[0.02] border border-white/5 rounded-2xl p-8 space-y-8">
          <div className="space-y-6">
             <div className="space-y-4">
               <label className="text-base font-bold text-white/70 uppercase tracking-widest">Annual Gross Income</label>
               <div className="relative">
                 <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#D4AF37] font-bold">{currencySymbol}</div>
                 <NumericInput 
                   value={inputs.amount}
                   onChange={(val) => setInputs({ ...inputs, amount: val })}
                   className="w-full bg-white/5 border border-white/5 rounded-xl pl-10 pr-4 py-4 text-white focus:outline-none focus:border-[#D4AF37] transition-all font-bold"
                 />
               </div>
             </div>

             <div className="p-4 bg-[#D4AF37]/10 rounded-2xl border border-[#D4AF37]/20 flex items-center gap-4 animate-in fade-in zoom-in-95 duration-300">
                <Shield className="text-[#D4AF37] w-6 h-6" />
                <p className="text-base text-white/70 leading-relaxed italic">
                   Adjusted for {countryKey.toUpperCase()} standard deductions and progressive tax slabs. 
                   {taxRules.additionalTaxes?.map(tax => ` Includes ${tax.name} at ${(tax.rate * 100).toFixed(1)}%.`).join(' ')}
                </p>
             </div>
          </div>
        </section>

        <section className="bg-white/[0.02] border border-white/5 rounded-2xl p-8 flex flex-col items-center justify-between min-h-[400px]">
           {isMounted && (
             <div className="w-full flex-1 flex flex-col gap-6">
               <div className="grid grid-cols-1 gap-4">
                 <div className="p-6 bg-white/5 rounded-2xl border border-white/5 flex items-center justify-between">
                    <div>
                      <div className="text-base font-bold text-white/70 uppercase tracking-widest mb-1">Effective Tax Liability</div>
                      <div className="text-xl md:text-2xl font-bold text-[#D4AF37] tracking-tighter">{formatCurrency(results.taxAmount)}</div>
                    </div>
                    <Wallet className="text-white/70 w-10 h-10" />
                 </div>

                 <div className="p-6 bg-white/[0.02] rounded-2xl border border-white/10 flex items-center justify-between">
                    <div>
                      <div className="text-base font-bold text-white/70 uppercase tracking-widest mb-1">Take-home / Post-Tax</div>
                      <div className="text-xl md:text-2xl font-bold text-white tracking-tighter">{formatCurrency(results.totalAmount)}</div>
                    </div>
                 </div>
               </div>

               <div className="flex-1 h-[150px] w-full min-h-[150px] min-w-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                     <BarChart data={[
                       { name: 'Income', val: inputs.amount },
                       { name: 'Tax', val: results.taxAmount },
                       { name: 'Net', val: results.totalAmount }
                     ]}>
                        <XAxis dataKey="name" axisLine={false} tickLine={false} fontSize={10} stroke="#94A3B8" fontWeight="500" />
                        <RechartsTooltip 
                          contentStyle={{ backgroundColor: '#111', border: '1px solid #333', fontSize: '10px', borderRadius: '8px' }} 
                          itemStyle={{ color: '#D4AF37' }}
                          labelStyle={{ color: '#94A3B8' }}
                        />
                        <Bar dataKey="val" fill="#D4AF37" radius={[4, 4, 0, 0]} />
                     </BarChart>
                  </ResponsiveContainer>
               </div>
             </div>
           )}
        </section>
      </div>
      
        <RelatedTools tools={[{"title":"SIP Calculator","path":"/calculators/investing/sip","description":"Invest in ELSS for 80C deductions"},{"title":"Health Insurance","path":"/calculators/insurance/health-insurance","description":"Claim 80D deductions"},{"title":"Home Loan EMI","path":"/calculators/loans/mortgage","description":"Claim Section 24(b) benefits"}]} />

        <RelatedTools tools={relatedTools} />
      <SEOSection 
        title="Income Tax Calculator"
        howTo={[
          "Enter your annual gross income before any deductions to start the calculation.",
          `Our tool automatically applies the latest ${countryKey.toUpperCase()} tax brackets and standard deductions.`,
          "Review the effective tax liability and see the impact on your monthly take-home pay.",
          "Export your detailed tax breakdown into a professional PDF summary."
        ]}
        formula="Tax = Progressive Bracket Logic + Deductions"
        benefits={[
          "Global coverage with region-specific logic for dozens of jurisdictions.",
          "Dynamic visualization of income vs tax using bar charts.",
          "Instant calculation of net pay after all statutory deductions.",
          "User-friendly interface optimized for high-speed financial computation."
        ]}
      />

      <CalculatorSEO
        id="IncomeTaxCalculator"
        title="Income Tax  Calculator"
        description="Calculate your income tax  easily and accurately with Orbit Wealth Pro."
        faqs={[{
          question: "What is the Income Tax  Calculator?",
          answer: "The Income Tax  Calculator is a financial tool designed to help you calculate and estimate your figures accurately."
        }, {
          question: "How do I use this calculator?",
          answer: "Simply enter your inputs into the designated fields, and the calculator will automatically process and display the estimated results."
        }, {
          question: "Are the results accurate?",
          answer: "The results are highly accurate estimates based on standard financial formulas, but should be used for informational purposes only."
        }]} />
    </div>
  );
}
