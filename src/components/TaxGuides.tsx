/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Globe, ShieldCheck, Percent, Info, ExternalLink } from 'lucide-react';

const TAX_GUIDES = [
  {
    country: 'USA',
    flag: '🇺🇸',
    instruments: [
      { name: '401(k) / 403(b)', desc: 'Employer-sponsored retirement plans with pre-tax contributions.' },
      { name: 'Traditional & Roth IRA', desc: 'Individual retirement accounts with tax-deferred or tax-free growth.' },
      { name: 'HSA (Health Savings Account)', desc: 'Triple tax advantage for medical expenses.' },
      { name: '529 Plans', desc: 'Tax-advantaged savings for education.' }
    ]
  },
  {
    country: 'UK',
    flag: '🇬🇧',
    instruments: [
      { name: 'ISA (Individual Savings Account)', desc: 'Save up to £20,000 annually tax-free.' },
      { name: 'SIPP', desc: 'Self-Invested Personal Pension with government tax relief.' },
      { name: 'LISA', desc: 'Lifetime ISA for first-time buyers with 25% government bonus.' },
      { name: 'Premium Bonds', desc: 'Winnings are 100% tax-free.' }
    ]
  },
  {
    country: 'Australia',
    flag: '🇦🇺',
    instruments: [
      { name: 'Superannuation', desc: 'Main retirement savings vehicle with 15% concessional tax rate.' },
      { name: 'Negative Gearing', desc: 'Offset investment property losses against taxable income.' },
      { name: 'Franking Credits', desc: 'Avoid double taxation on corporate dividends.' },
      { name: 'Salary Sacrificing', desc: 'Redirect pre-tax salary into your Super.' }
    ]
  },
  {
    country: 'India',
    flag: '🇮🇳',
    instruments: [
      { name: 'ELSS Mutual Funds', desc: 'Equity-linked savings with 3-year lock-in under 80C.' },
      { name: 'PPF (Public Provident Fund)', desc: 'Government-backed long term debt with EEE tax status.' },
      { name: 'NPS (National Pension System)', desc: 'Additional deduction of ₹50,000 under 80CCD(1B).' },
      { name: 'HRA Exemption', desc: 'Tax relief on house rent paid for salaried employees.' }
    ]
  }
];

export default function TaxGuides() {
  return (
    <div className="space-y-8 pb-20 text-white">
      <header className="space-y-2">
        <div className="flex items-center gap-2 mb-4">
           <Globe className="text-[#D4AF37] w-6 h-6" />
           <h1 className="text-3xl font-bold tracking-tighter">Global Tax Cheat Sheets</h1>
        </div>
        <p className="text-white/40 max-w-xl text-sm leading-relaxed">
          Quick reference guides for tax-saving instruments across major global regions. Maximize your take-home pay.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {TAX_GUIDES.map((guide, idx) => (
          <div key={idx} className="bg-white/[0.02] border border-white/5 rounded-2xl overflow-hidden hover:border-[#D4AF37]/30 transition-all group">
            <div className="p-6 border-b border-white/5 bg-white/[0.01] flex justify-between items-center">
               <div className="flex items-center gap-3">
                  <span className="text-2xl">{guide.flag}</span>
                  <h2 className="text-xl font-bold tracking-tight">{guide.country} Tax Strategies</h2>
               </div>
               <ShieldCheck className="w-5 h-5 text-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="p-6 space-y-4">
               {guide.instruments.map((ins, i) => (
                 <div key={i} className="space-y-1">
                    <div className="flex items-center gap-2 font-bold text-sm">
                       <div className="w-1 h-1 rounded-full bg-[#D4AF37]"></div>
                       {ins.name}
                    </div>
                    <p className="text-xs text-white/40 leading-relaxed ml-3">{ins.desc}</p>
                 </div>
               ))}
            </div>
            <div className="p-4 bg-white/[0.01] flex justify-center border-t border-white/5">
                <button className="text-[10px] font-bold text-white/20 uppercase tracking-widest hover:text-[#D4AF37] transition-colors flex items-center gap-2">
                   <ExternalLink className="w-3 h-3" /> Detailed Guide
                </button>
            </div>
          </div>
        ))}
      </div>

      <div className="p-8 bg-[#D4AF37]/5 border border-[#D4AF37]/10 rounded-2xl flex flex-col md:flex-row items-center gap-6">
         <div className="w-12 h-12 bg-[#D4AF37] rounded-full flex items-center justify-center shrink-0">
            <Percent className="text-white w-6 h-6" />
         </div>
         <div className="space-y-1 text-center md:text-left">
            <h3 className="font-bold text-lg">Need a custom tax plan?</h3>
            <p className="text-sm text-white/40">Our professional advisors can help you optimize your global tax liabilities across residency shifts.</p>
         </div>
         <button className="ml-auto px-6 py-3 bg-[#D4AF37] rounded-xl text-xs font-bold hover:bg-[#0044DD] transition-all">
            Consult Advisor
         </button>
      </div>
    </div>
  );
}
