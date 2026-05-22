/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, TrendingUp, ShieldAlert, ArrowUpRight, CheckCircle2, Activity } from 'lucide-react';

export default function WealthIntelligenceBlock() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 my-8">
      {/* Left Column: AI Wealth Score */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="lg:col-span-4 bg-white/[0.02] backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-8 flex flex-col items-center justify-center relative overflow-hidden group shadow-2xl shadow-black/40"
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-[#D4AF37]/5 via-transparent to-emerald-500/5 opacity-50" />
        
        <div className="relative z-10 w-full text-center space-y-6">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-[#D4AF37] animate-pulse" />
            <span className="text-[10px] font-black text-[#D4AF37] uppercase tracking-[0.4em]">AI Wealth Score</span>
          </div>

          <div className="relative w-40 h-40 mx-auto">
            {/* Background Circle */}
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="80"
                cy="80"
                r="70"
                fill="none"
                stroke="currentColor"
                strokeWidth="10"
                className="text-white/[0.03]"
              />
              {/* Progress Circle */}
              <motion.circle
                cx="80"
                cy="80"
                r="70"
                fill="none"
                stroke="currentColor"
                strokeWidth="10"
                strokeDasharray="440"
                initial={{ strokeDashoffset: 440 }}
                animate={{ strokeDashoffset: 440 - (440 * 78) / 100 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="text-[#D4AF37] drop-shadow-[0_0_12px_rgba(212,175,55,0.4)]"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-5xl font-display font-bold text-white leading-none">78</span>
              <span className="text-[10px] font-black text-white/30 uppercase tracking-widest mt-1">/ 100</span>
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-emerald-400 text-sm font-bold flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4" /> Excellent Health
            </div>
            <p className="text-[10px] text-white/30 uppercase tracking-widest font-medium">Top 5% Tier Globally</p>
          </div>
        </div>
      </motion.div>

      {/* Right Column: AI Smart Insights */}
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="lg:col-span-8 bg-white/[0.02] backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-8 md:p-10 flex flex-col justify-between shadow-2xl shadow-black/40 relative overflow-hidden"
      >
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                <Activity className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <h3 className="text-xl font-display font-bold text-white tracking-tight">AI Smart Insights</h3>
                <p className="text-[10px] text-slate-200 uppercase tracking-widest font-black">Live Intelligence Feed</p>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[8px] font-black text-emerald-500 uppercase tracking-widest">Optimized Target</span>
            </div>
          </div>

          <div className="space-y-4">
            {[
              {
                icon: <TrendingUp className="w-4 h-4 text-emerald-400" />,
                text: "Your current savings rate is 12% above average for your professional bracket.",
                type: "positive"
              },
              {
                icon: <Sparkles className="w-4 h-4 text-[#D4AF37]" />,
                text: "Strategic Tip: Consider moving 5% for high-yield debt payoffs to neutralize interest leakage.",
                type: "action"
              },
              {
                icon: <ShieldAlert className="w-4 h-4 text-rose-400" />,
                text: "Risk Alert: Portfolio exposure to high-volatility assets increased by 2.4% this quarter.",
                type: "warning"
              }
            ].map((insight, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + idx * 0.1 }}
                className="group flex gap-4 p-4 rounded-2xl bg-white/[0.01] border border-white/5 hover:border-white/10 hover:bg-white/[0.03] transition-all cursor-default"
              >
                <div className="flex-shrink-0 mt-0.5">
                  {insight.icon}
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm text-slate-100 leading-relaxed font-bold">
                    {insight.text}
                  </p>
                </div>
                <ArrowUpRight className="w-4 h-4 text-white/10 group-hover:text-white/40 transition-colors" />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
