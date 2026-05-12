/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { COMPARISONS } from '../data/comparisonData';
import { 
  ArrowRightLeft, 
  CheckCircle2, 
  XCircle, 
  Lightbulb, 
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Target
} from 'lucide-react';

export default function ComparePage() {
  const { pair } = useParams<{ pair: string }>();
  const data = pair ? COMPARISONS[pair.toLowerCase()] : null;

  if (!data) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="space-y-12 pb-20">
      <Helmet>
        <title>{data.title} Comparison - Orbit Wealth Pro</title>
        <meta name="description" content={data.description} />
      </Helmet>

      {/* Hero Header */}
      <header className="space-y-6 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0055FF]/10 border border-[#0055FF]/20 text-[#0055FF] text-[10px] font-bold uppercase tracking-widest shadow-lg shadow-[#0055FF]/5 mb-4">
          <ArrowRightLeft className="w-3 h-3" /> Side-by-Side Analysis
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-white">
          {data.optionAName} <span className="text-white/20">vs</span> {data.optionBName}
        </h1>
        <p className="text-white/40 text-lg leading-relaxed">
          {data.description}
        </p>
      </header>

      {/* Comparison Table */}
      <section className="bg-white/[0.02] border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
        <div className="grid grid-cols-1 md:grid-cols-3 bg-white/5 border-b border-white/5">
          <div className="p-6 md:p-8 text-[10px] font-bold text-white/20 uppercase tracking-widest flex items-center">Key Factor</div>
          <div className="p-6 md:p-8 text-xl font-bold text-[#0055FF] flex items-center justify-between border-t md:border-t-0 md:border-l border-white/5">
             <span className="text-white/20 mr-2 text-sm italic">01</span> {data.optionAName}
          </div>
          <div className="p-6 md:p-8 text-xl font-bold text-emerald-500 flex items-center justify-between border-t md:border-t-0 md:border-l border-white/5">
             <span className="text-white/20 mr-2 text-sm italic">02</span> {data.optionBName}
          </div>
        </div>

        {data.factors.map((f, idx) => (
          <div key={idx} className="grid grid-cols-1 md:grid-cols-3 border-b border-white/5 last:border-0 hover:bg-white/[0.01] transition-colors group">
            <div className="p-6 md:p-8 text-sm font-bold text-white/60 flex items-center bg-white/[0.02]">
                <div className="w-1.5 h-1.5 rounded-full bg-[#0055FF] mr-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                {f.factor}
            </div>
            <div className="p-6 md:p-8 text-sm text-white/40 border-t md:border-t-0 md:border-l border-white/5 flex items-center">
                {f.optionA}
            </div>
            <div className="p-6 md:p-8 text-sm text-white/40 border-t md:border-t-0 md:border-l border-white/5 flex items-center">
                {f.optionB}
            </div>
          </div>
        ))}
      </section>

      {/* Pros and Cons */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Option A Analysis */}
        <section className="bg-white/[0.02] border border-white/5 rounded-3xl p-8 space-y-8 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
            <TrendingUp className="w-48 h-48" />
          </div>
          
          <div className="flex items-center gap-4">
             <div className="w-12 h-12 rounded-2xl bg-[#0055FF]/10 flex items-center justify-center text-[#0055FF] font-bold border border-[#0055FF]/20">A</div>
             <h3 className="text-2xl font-bold text-white">{data.optionAName} In-depth</h3>
          </div>

          <div className="space-y-6">
            <div className="space-y-4">
              <h4 className="text-[10px] font-bold text-emerald-500/50 uppercase tracking-widest flex items-center gap-2">
                <CheckCircle2 className="w-3 h-3" /> The Advantages
              </h4>
              <ul className="space-y-3">
                {data.prosA.map((p, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-white/40 leading-relaxed">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4 pt-4 border-t border-white/5">
              <h4 className="text-[10px] font-bold text-red-500/50 uppercase tracking-widest flex items-center gap-2">
                <XCircle className="w-3 h-3" /> Limitations
              </h4>
              <ul className="space-y-3">
                {data.consA.map((c, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-white/40 leading-relaxed italic">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500/40 mt-1.5 shrink-0" />
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Option B Analysis */}
        <section className="bg-white/[0.02] border border-white/5 rounded-3xl p-8 space-y-8 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
            <ShieldCheck className="w-48 h-48 text-emerald-500" />
          </div>

          <div className="flex items-center gap-4">
             <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 font-bold border border-emerald-500/20">B</div>
             <h3 className="text-2xl font-bold text-white">{data.optionBName} In-depth</h3>
          </div>

          <div className="space-y-6">
            <div className="space-y-4">
              <h4 className="text-[10px] font-bold text-emerald-500/50 uppercase tracking-widest flex items-center gap-2">
                <CheckCircle2 className="w-3 h-3" /> The Advantages
              </h4>
              <ul className="space-y-3">
                {data.prosB.map((p, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-white/40 leading-relaxed">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4 pt-4 border-t border-white/5">
              <h4 className="text-[10px] font-bold text-red-500/50 uppercase tracking-widest flex items-center gap-2">
                <XCircle className="w-3 h-3" /> Limitations
              </h4>
              <ul className="space-y-3">
                {data.consB.map((c, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-white/40 leading-relaxed italic">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500/40 mt-1.5 shrink-0" />
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </div>

      {/* The Verdict */}
      <section className="bg-[#0055FF]/10 border border-[#0055FF]/20 rounded-3xl p-10 space-y-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 m-12 opacity-5">
            <Target className="w-32 h-32" />
        </div>
        
        <div className="flex items-center gap-3">
            <Lightbulb className="text-[#0055FF] w-6 h-6" />
            <h3 className="text-2xl font-bold text-white">The Orbit Verdict</h3>
        </div>
        <p className="text-xl text-white/80 leading-relaxed max-w-4xl relative z-10">
            {data.verdict}
        </p>
        
        <div className="pt-8">
            <Link 
                to={data.ctaLink}
                className="inline-flex items-center gap-4 px-8 py-4 bg-[#0055FF] hover:bg-[#0055FF]/90 text-white rounded-2xl font-bold transition-all shadow-xl shadow-[#0055FF]/20 group"
            >
                {data.ctaText}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
        </div>
      </section>

      {/* Internal Linking / Secondary CTAs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
         <div className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl flex items-center justify-between group hover:bg-white/[0.04] transition-all">
            <div className="text-xs font-bold text-white/40 uppercase tracking-widest">Plan your retirement smarter</div>
            <Link to="/calculators/retirement" className="text-[#0055FF] font-bold text-sm flex items-center gap-2 group-hover:gap-3 transition-all">
                Retirement Tool <ArrowRight className="w-4 h-4" />
            </Link>
         </div>
         <div className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl flex items-center justify-between group hover:bg-white/[0.04] transition-all">
            <div className="text-xs font-bold text-white/40 uppercase tracking-widest">Optimize your tax liability</div>
            <Link to="/calculators/income-tax" className="text-[#0055FF] font-bold text-sm flex items-center gap-2 group-hover:gap-3 transition-all">
                Tax Analyzer <ArrowRight className="w-4 h-4" />
            </Link>
         </div>
      </div>
    </div>
  );
}
