/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'motion/react';
import { COMPARISONS } from '../data/comparisonData';
import { useLocale } from '../context/LocaleContext';
import { Region } from '../types';
import { 
  ArrowRightLeft, 
  CheckCircle2, 
  XCircle, 
  Lightbulb, 
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Target,
  Activity,
  Sparkles,
  Globe,
  MapPin,
  Zap,
  Info
} from 'lucide-react';

const REGIONS: { id: Region; name: string; icon: React.ReactNode }[] = [
  { id: 'Global', name: 'Global', icon: <Globe className="w-3 h-3" /> },
  { id: 'India', name: 'India', icon: <span className="text-sm font-bold">IN</span> },
  { id: 'USA', name: 'USA', icon: <span className="text-sm font-bold">US</span> },
  { id: 'UK', name: 'UK', icon: <span className="text-sm font-bold">UK</span> },
];

export default function ComparePage() {
  const { pair } = useParams<{ pair: string }>();
  const { currency, setCurrency, labels } = useLocale();
  const data = pair ? COMPARISONS[pair.toLowerCase()] : null;
  const [activeRegion, setActiveRegion] = useState<Region>(data?.region || 'Global');

  useEffect(() => {
    if (data?.currency) {
      setCurrency(data.currency);
    }
  }, [data, setCurrency]);

  if (!data) {
    return <Navigate to="/" replace />;
  }

  // Filter other comparisons based on region
  const relatedComparisons = Object.entries(COMPARISONS)
    .filter(([key, val]) => key !== pair?.toLowerCase() && (val.region === activeRegion || val.region === 'Global'))
    .slice(0, 4);

  return (
    <div className="space-y-12 pb-20">
      <Helmet>
        <title>{data.title} Comparison - ORBIT WEALTH PRO</title>
        <meta name="description" content={data.description} />
      </Helmet>

      {/* Region Selector & Context Header */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-4 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-500/10 rounded-lg">
            <MapPin className="w-4 h-4 text-emerald-400" />
          </div>
          <div>
            <p className="text-sm text-white/70 font-black uppercase tracking-widest leading-none mb-1">Market Jurisdiction</p>
            <p className="text-base text-white font-bold">{activeRegion} Market Context</p>
          </div>
        </div>

        <div className="bg-[#0D121F] p-1.5 rounded-2xl border border-white/5 flex gap-1">
          {REGIONS.map((reg) => (
            <button
              key={reg.id}
              onClick={() => setActiveRegion(reg.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                activeRegion === reg.id 
                  ? 'bg-[#D4AF37] text-[#0B0F19] shadow-lg' 
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              {reg.icon}
              {reg.name}
            </button>
          ))}
        </div>
      </div>

      {/* Hero Header */}
      <header className="space-y-6 text-center max-w-3xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-bold uppercase tracking-widest shadow-lg shadow-emerald-500/5 mb-4"
        >
          <Zap className="w-3 h-3" /> AI-Augmented Comparison Framework
        </motion.div>
        <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tighter text-white leading-[0.9]">
          {data.optionAName} <span className="text-[#D4AF37] italic">vs</span> {data.optionBName}
        </h1>
        <p className="text-slate-400 text-xl leading-relaxed max-w-2xl mx-auto font-medium">
          {data.description}
        </p>
      </header>

      {/* Asset Efficiency Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        <div className="p-6 bg-white/[0.02] border border-white/5 rounded-3xl space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
               <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center border border-[#D4AF37]/20">
                  <TrendingUp className="w-4 h-4 text-[#D4AF37]" />
               </div>
               <span className="text-sm font-bold text-white/70">Asset Efficiency (A)</span>
            </div>
            <span className="text-sm font-black text-[#D4AF37] font-mono tracking-tighter">SCORE: 8.4/10</span>
          </div>
          <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: '84%' }}
              className="h-full bg-[#D4AF37] shadow-[0_0_10px_rgba(212,175,55,0.4)]"
            />
          </div>
        </div>
        <div className="p-6 bg-white/[0.02] border border-white/5 rounded-3xl space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
               <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
               </div>
               <span className="text-sm font-bold text-white/70">Stability Index (B)</span>
            </div>
            <span className="text-sm font-black text-emerald-400 font-mono tracking-tighter">SCORE: 9.1/10</span>
          </div>
          <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: '91%' }}
              className="h-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.4)]"
            />
          </div>
        </div>
      </div>

      {/* Comparison Table */}
      <section className="bg-white/[0.02] border border-white/5 rounded-[3rem] overflow-hidden shadow-2xl relative">
        <div className="absolute top-0 left-1/3 bottom-0 w-px bg-white/5 hidden md:block" />
        <div className="absolute top-0 left-2/3 bottom-0 w-px bg-white/5 hidden md:block" />
        
        <div className="grid grid-cols-1 md:grid-cols-3 bg-white/[0.03] border-b border-white/5">
          <div className="p-8 text-sm font-black text-white/70 uppercase tracking-[0.3em] flex items-center">
            <Info className="w-4 h-4 mr-2" /> Comparative Dimension
          </div>
          <div className="p-8 text-3xl font-display font-bold text-[#D4AF37] flex items-center border-t md:border-t-0 border-white/5">
             <div className="w-8 h-8 rounded-full bg-[#D4AF37]/10 flex items-center justify-center text-sm mr-3 border border-[#D4AF37]/20">01</div>
             {data.optionAName}
          </div>
          <div className="p-8 text-3xl font-display font-bold text-emerald-400 flex items-center border-t md:border-t-0 border-white/5">
             <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center text-sm mr-3 border border-emerald-500/20">02</div>
             {data.optionBName}
          </div>
        </div>

        {data.factors.map((f, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 border-b border-white/5 last:border-0 hover:bg-white/[0.01] transition-all group"
          >
            <div className="p-8 text-sm font-black text-white/70 flex items-center bg-white/[0.01] uppercase tracking-widest">
                <div className="w-1 h-1 rounded-full bg-[#f59e0b] mr-4 shadow-[0_0_8px_rgba(245,158,11,0.4)] opacity-50 group-hover:opacity-100 transition-opacity" />
                {f.factor}
            </div>
            <div className="p-8 text-base text-slate-100 border-t md:border-t-0 border-white/5 flex items-center font-bold tracking-tight">
                {f.optionA}
            </div>
            <div className="p-8 text-base text-slate-100 border-t md:border-t-0 border-white/5 flex items-center font-bold tracking-tight bg-emerald-500/[0.01]">
                {f.optionB}
            </div>
          </motion.div>
        ))}
      </section>

      {/* Visual Health Bar Comparison */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <Activity className="w-4 h-4 text-[#D4AF37]" />
          <h3 className="text-sm font-black text-white/70 uppercase tracking-[0.4em]">Asset Efficiency Mapping</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 bg-white/[0.01] border border-white/5 rounded-3xl space-y-4">
             <div className="flex justify-between text-sm font-black uppercase tracking-[0.2em] text-[#D4AF37]">
                <span>Capital Appreciation Velocity</span>
                <span>Tier Alpha [High]</span>
             </div>
             <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: '85%' }}
                  transition={{ duration: 1.2, ease: 'easeOut' }}
                  className="h-full bg-gradient-to-r from-amber-600 to-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.4)]"
                />
             </div>
          </div>
          <div className="p-8 bg-white/[0.01] border border-white/5 rounded-3xl space-y-4">
             <div className="flex justify-between text-sm font-black uppercase tracking-[0.2em] text-emerald-400">
                <span>Principal Security Metric</span>
                <span>Tier Prime [Maximum]</span>
             </div>
             <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: '92%' }}
                  transition={{ duration: 1.2, ease: 'easeOut', delay: 0.2 }}
                  className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.4)]"
                />
             </div>
          </div>
        </div>
      </section>

      {/* Analysis Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Option A Analysis */}
        <section className="bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-10 space-y-8 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity">
            <TrendingUp className="w-56 h-56" />
          </div>
          
          <div className="flex items-center gap-5">
             <div className="w-14 h-14 rounded-2xl bg-[#D4AF37]/5 flex items-center justify-center text-[#D4AF37] font-black text-2xl border border-[#D4AF37]/10 shadow-[0_0_20px_rgba(212,175,55,0.1)]">A</div>
             <div>
               <h3 className="text-3xl font-display font-bold text-white tracking-tight">{data.optionAName}</h3>
               <p className="text-sm text-white/70 uppercase font-black tracking-widest mt-1 italic">Structural Analysis</p>
             </div>
          </div>

          <div className="space-y-10">
            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-lg bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                </div>
                <h4 className="text-sm font-black text-emerald-400 uppercase tracking-widest">Growth Catalysts</h4>
              </div>
              <ul className="grid grid-cols-1 gap-4">
                {data.prosA.map((p, i) => (
                  <li key={i} className="flex items-start gap-4 p-4 bg-white/[0.01] border border-white/5 rounded-2xl group/item hover:bg-white/[0.03] transition-colors">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0 group-hover/item:scale-150 transition-transform" />
                    <span className="text-base text-slate-300 leading-snug font-medium">{p}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-5 pt-8 border-t border-white/5">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-lg bg-rose-500/10 flex items-center justify-center border border-rose-500/20">
                  <XCircle className="w-3.5 h-3.5 text-rose-400" />
                </div>
                <h4 className="text-sm font-black text-rose-400 uppercase tracking-widest">Strategic Risks</h4>
              </div>
              <ul className="grid grid-cols-1 gap-4">
                {data.consA.map((c, i) => (
                  <li key={i} className="flex items-start gap-4 p-4 bg-white/[0.01] border border-white/5 rounded-2xl opacity-60 group/item hover:opacity-100 transition-opacity">
                    <div className="w-1.5 h-1.5 rounded-full bg-rose-500/40 mt-2 shrink-0" />
                    <span className="text-base text-slate-400 leading-snug font-medium italic">{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Option B Analysis */}
        <section className="bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-10 space-y-8 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity">
            <ShieldCheck className="w-56 h-56 text-emerald-500" />
          </div>

          <div className="flex items-center gap-5">
             <div className="w-14 h-14 rounded-2xl bg-emerald-500/5 flex items-center justify-center text-emerald-500 font-black text-2xl border border-emerald-500/10 shadow-[0_0_20px_rgba(16,185,129,0.1)]">B</div>
             <div>
               <h3 className="text-3xl font-display font-bold text-white tracking-tight">{data.optionBName}</h3>
               <p className="text-sm text-white/70 uppercase font-black tracking-widest mt-1 italic">Stability Profile</p>
             </div>
          </div>

          <div className="space-y-10">
            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-lg bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                </div>
                <h4 className="text-sm font-black text-emerald-400 uppercase tracking-widest">Preservation Factors</h4>
              </div>
              <ul className="grid grid-cols-1 gap-4">
                {data.prosB.map((p, i) => (
                  <li key={i} className="flex items-start gap-4 p-4 bg-white/[0.01] border border-white/5 rounded-2xl group/item hover:bg-white/[0.03] transition-colors">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0 group-hover/item:scale-150 transition-transform" />
                    <span className="text-base text-slate-300 leading-snug font-medium">{p}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-5 pt-8 border-t border-white/5">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-lg bg-rose-500/10 flex items-center justify-center border border-rose-500/20">
                  <XCircle className="w-3.5 h-3.5 text-rose-400" />
                </div>
                <h4 className="text-sm font-black text-rose-400 uppercase tracking-widest">Market Exposure</h4>
              </div>
              <ul className="grid grid-cols-1 gap-4">
                {data.consB.map((c, i) => (
                  <li key={i} className="flex items-start gap-4 p-4 bg-white/[0.01] border border-white/5 rounded-2xl opacity-60 group/item hover:opacity-100 transition-opacity">
                    <div className="w-1.5 h-1.5 rounded-full bg-rose-500/40 mt-2 shrink-0" />
                    <span className="text-base text-slate-400 leading-snug font-medium italic">{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </div>

      {/* The Verdict */}
      <section className="bg-white/[0.02] border border-white/10 rounded-[3rem] p-10 md:p-16 relative overflow-hidden group shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)]">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-[100px] -mr-48 -mt-48 transition-all group-hover:bg-[#D4AF37]/10" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] -ml-48 -mb-48 opacity-30" />
        
        <div className="relative z-10 space-y-12">
          <div className="flex items-center gap-5">
             <div className="p-4 bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded-[1.5rem] shadow-[0_0_30px_rgba(212,175,55,0.1)]">
              <Sparkles className="text-[#D4AF37] w-8 h-8" />
             </div>
             <div>
              <h3 className="text-5xl font-display font-bold text-white tracking-tight leading-none mb-2">The Orbit Intelligence Verdict</h3>
              <div className="flex items-center gap-2">
                <Activity className="w-3 h-3 text-[#D4AF37]" />
                <p className="text-sm text-white/70 font-black uppercase tracking-[0.4em]">Synthetic Logic Protocol • {activeRegion} Context</p>
              </div>
             </div>
          </div>

          <div className="p-10 bg-white/[0.03] border-l-4 border-[#D4AF37] rounded-3xl relative backdrop-blur-sm">
            <p className="text-4xl text-slate-100 leading-snug font-bold tracking-tight italic">
                "{data.verdict}"
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row items-center gap-6 pt-6">
              <Link 
                  to={data.ctaLink}
                  className="w-full md:w-auto inline-flex items-center justify-center gap-5 px-12 py-6 bg-[#D4AF37] hover:bg-[#f59e0b] text-[#0B1221] rounded-2xl font-black text-sm uppercase tracking-[0.3em] transition-all shadow-[0_25px_60px_-10px_rgba(212,175,55,0.3)] hover:scale-105 active:scale-95 group"
              >
                  {data.ctaText}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link 
                  to="/"
                  className="w-full md:w-auto inline-flex items-center justify-center gap-5 px-12 py-6 bg-white/5 hover:bg-white/10 text-white rounded-2xl font-black text-sm uppercase tracking-[0.3em] transition-all border border-white/10 backdrop-blur-xl"
              >
                  Return to Milestones Hub
              </Link>
          </div>
        </div>
      </section>

      {/* Region-Specific Contextual Discovery */}
      <section className="space-y-8">
        <div className="flex items-center justify-between">
           <div className="space-y-1">
             <h4 className="text-2xl font-display font-bold text-white">Explore {activeRegion} Comparisons</h4>
             <p className="text-sm text-white/70 font-medium tracking-wide">AI-Generated intelligence for local market dynamics.</p>
           </div>
           <div className="hidden sm:block text-sm font-black text-white/70 uppercase tracking-[0.3em]">
             Section AI Context: Competitive Alpha
           </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
           {relatedComparisons.map(([key, val]) => (
             <Link 
                key={key}
                to={`/compare/${key}`}
                className="group p-6 bg-white/[0.02] border border-white/5 rounded-2xl flex flex-col gap-4 hover:bg-[#D4AF37]/5 hover:border-[#D4AF37]/30 transition-all"
             >
                <div className="flex items-center justify-between">
                  <div className="p-2 bg-white/5 rounded-lg group-hover:bg-[#D4AF37]/20 transition-colors">
                    <ArrowRightLeft className="w-3 h-3 text-white/70 group-hover:text-[#D4AF37]" />
                  </div>
                  <span className="text-[9px] font-black text-white/70 uppercase tracking-widest">{val.region}</span>
                </div>
                <div>
                  <p className="text-base font-bold text-white group-hover:text-[#D4AF37] transition-colors line-clamp-1">{val.title}</p>
                  <p className="text-sm text-white/70 font-medium mt-1 line-clamp-2 leading-relaxed">{val.description}</p>
                </div>
                <div className="flex items-center gap-2 text-sm font-black text-[#D4AF37] opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0">
                  ANALYZE NOW <ArrowRight className="w-3 h-3" />
                </div>
             </Link>
           ))}
        </div>
      </section>
    </div>
  );
}
