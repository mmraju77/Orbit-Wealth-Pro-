import React from 'react';
import { BadgeInfo, ListChecks, FileText } from 'lucide-react';

interface SEOSectionProps {
  title: string;
  howTo: string[];
  formula: string;
  benefits: string[];
}

export default function SEOSection({ title, howTo, formula, benefits }: SEOSectionProps) {
  return (
    <div className="mt-20 space-y-12 border-t border-white/5 pt-20 pb-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <div className="flex items-center gap-2 mb-4">
            <BadgeInfo className="text-[#D4AF37] w-5 h-5" />
            <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">How to use</span>
          </div>
          <h3 className="text-2xl font-bold text-white tracking-tight">Using the {title}</h3>
          <ul className="space-y-4">
            {howTo.map((step, idx) => (
              <li key={idx} className="flex gap-4 text-sm text-white/40 leading-relaxed">
                <span className="text-[#D4AF37] font-bold">0{idx + 1}.</span>
                {step}
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-6">
          <div className="flex items-center gap-2 mb-4">
            <FileText className="text-[#D4AF37] w-5 h-5" />
            <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">The Mathematics</span>
          </div>
          <h3 className="text-2xl font-bold text-white tracking-tight">Formula Used</h3>
          <div className="p-6 bg-white/[0.02] border border-white/5 rounded-xl font-mono text-xs text-[#D4AF37] leading-relaxed overflow-x-auto whitespace-nowrap">
            {formula}
          </div>
          <p className="text-xs text-white/30 italic">
            *Our engine uses standard compound interest logic with periodic payment integrations.
          </p>
        </div>
      </div>

      <div className="bg-[#D4AF37]/5 border border-[#D4AF37]/10 rounded-2xl p-8">
        <div className="flex items-center gap-2 mb-6">
          <ListChecks className="text-[#D4AF37] w-5 h-5" />
          <h3 className="text-xl font-bold text-white tracking-tight">Key Benefits</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {benefits.map((benefit, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] mt-2 shrink-0"></div>
              <p className="text-sm text-white/40 leading-relaxed">{benefit}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
