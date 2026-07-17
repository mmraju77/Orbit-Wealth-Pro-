/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { COMPARISONS } from '../data/comparisonData';
import { ArrowRightLeft, ArrowRight, TrendingUp, ShieldCheck, Scale, Zap } from 'lucide-react';
import { motion } from 'motion/react';

export default function ComparisonsDirectory() {
  const comparisonKeys = Object.keys(COMPARISONS);

  return (
    <div className="space-y-12 pb-20">
      <Helmet>
        <title>Financial Comparisons & Side-by-Side Analysis - ORBIT WEALTH PRO</title>
        <meta name="description" content="Explore deep-dive comparisons between popular financial assets, investment strategies, and debt management tools." />
      </Helmet>

      {/* Hero Header */}
      <header className="space-y-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="h-[1px] w-12 bg-[#D4AF37]"></div>
          <span className="text-sm font-black text-[#D4AF37] uppercase tracking-[0.4em] drop-shadow-[0_0_8px_rgba(212,175,55,0.3)]">Intelligence Directory</span>
        </div>
        <h1 className="text-6xl md:text-7xl font-display font-bold tracking-tight text-white max-w-4xl leading-[1.1]">
          Side-by-Side <br />
          <span className="text-[#D4AF37]">Wealth Comparisons</span>
        </h1>
        <p className="text-white/70 text-xl leading-relaxed max-w-2xl">
          Data-driven breakdowns to help you navigate the complex landscape of global finance, asset allocation, and strategic wealth preservation.
        </p>
      </header>

      {/* Directory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {comparisonKeys.map((key, idx) => {
          const data = COMPARISONS[key];
          return (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
            >
              <Link
                to={`/compare/${key}`}
                className="group block h-full bg-white/[0.02] border border-white/5 rounded-3xl p-8 hover:bg-white/[0.04] hover:border-[#D4AF37]/30 transition-all relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-10 transition-opacity">
                  <ArrowRightLeft className="w-24 h-24 text-[#D4AF37]" />
                </div>
                
                <div className="space-y-6 relative z-10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] border border-[#D4AF37]/20">
                      {idx % 3 === 0 ? <Scale className="w-5 h-5" /> : idx % 3 === 1 ? <TrendingUp className="w-5 h-5" /> : <ShieldCheck className="w-5 h-5" />}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-white group-hover:text-[#D4AF37] transition-colors">
                      {data.optionAName} <span className="text-white/70 px-1">Vs</span> {data.optionBName}
                    </h3>
                    <p className="text-base text-white/70 line-clamp-2 leading-relaxed">
                      {data.description}
                    </p>
                  </div>

                  <div className="pt-4 flex items-center gap-2 text-sm font-black text-[#D4AF37] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0">
                    Detailed Core Analysis <Zap className="w-3 h-3" />
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* Featured Insights Section */}
      <section className="bg-gradient-to-tr from-[#D4AF37]/10 to-emerald-500/10 border border-white/5 rounded-[40px] p-10 md:p-16 relative overflow-hidden">
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-white tracking-tight">The Asset Intelligence Engine</h2>
            <p className="text-white/70 leading-relaxed">
              Our programmatic comparison engine analyzes thousands of data points across global markets to provide clear, actionable intelligence. We factor in risk profiles, historical yields, and tax implications specific to your jurisdiction.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <div className="px-6 py-3 bg-white/5 border border-white/10 rounded-2xl text-sm font-bold text-white/70">Real-time Yields</div>
              <div className="px-6 py-3 bg-white/5 border border-white/10 rounded-2xl text-sm font-bold text-white/70">Risk Volatility Maps</div>
              <div className="px-6 py-3 bg-white/5 border border-white/10 rounded-2xl text-sm font-bold text-white/70">Tax Optimization</div>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="w-full max-w-sm aspect-square rounded-full border border-white/10 flex items-center justify-center p-8 relative">
              <div className="absolute inset-0 bg-[#D4AF37]/5 animate-pulse rounded-full" />
              <ArrowRightLeft className="w-32 h-32 text-[#D4AF37]/20" />
              <div className="absolute top-1/4 left-1/4 p-4 bg-[#0B1221] border border-white/10 rounded-2xl shadow-2xl">
                <TrendingUp className="w-6 h-6 text-emerald-400" />
              </div>
              <div className="absolute bottom-1/4 right-1/4 p-4 bg-[#0B1221] border border-white/10 rounded-2xl shadow-2xl">
                <ShieldCheck className="w-6 h-6 text-blue-400" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
