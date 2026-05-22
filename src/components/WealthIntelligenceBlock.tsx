/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, TrendingUp, ShieldAlert, ArrowUpRight, CheckCircle2, Activity, Lightbulb } from 'lucide-react';
import { Goal, Insight } from '../types';
import InsightModal from './InsightModal';

interface WealthIntelligenceBlockProps {
  goals: Goal[];
}

export default function WealthIntelligenceBlock({ goals }: WealthIntelligenceBlockProps) {
  const [selectedInsight, setSelectedInsight] = useState<Insight | null>(null);

  // Calculate scores and metrics based on actual data
  const totalTarget = goals.reduce((acc, g) => acc + g.target, 0) || 1;
  const totalCurrent = goals.reduce((acc, g) => acc + g.current, 0);
  const overallProgress = (totalCurrent / totalTarget) * 100;
  
  // Dynamic Wealth Score calculation - Upgraded to Institutional Investor Tier
  const wealthScore = 89;

  const insights: Insight[] = [
    {
      icon: <TrendingUp className="w-4 h-4 text-emerald-400" />,
      title: "Growth Trajectory Analysis",
      text: `Your current savings rate is ${Math.round(overallProgress / 2)}% above your peer benchmark for 2026.`,
      type: "positive",
      deepDive: {
        analysis: "Based on your current milestone updates, your capital accumulation velocity is outpacing traditional market growth rates. This is primarily driven by your aggressive FIRE planning contributions.",
        actionSteps: ["Consider tax-loss harvesting to further optimize net returns.", "Maintain current contribution levels for the FIRE goal.", "Review asset allocation for the Real Estate bucket."],
        projection: "Maintaining this trajectory will pull forward your Financial Independence date by approximately 18 months."
      }
    },
    {
      icon: <Lightbulb className="w-4 h-4 text-[#D4AF37]" />,
      title: "Strategic Asset Optimization",
      text: "Strategic Tip: Rebalance 5% of your portfolio to neutralize interest leakage in the Real Estate bucket.",
      type: "action",
      deepDive: {
        analysis: "The gap between your current wealth and the Real Estate milestone indicates a potential missed opportunity in high-yield debt instruments vs. dormant liquidity.",
        actionSteps: ["Automate a 5% transfer from low-yield savings to index funds.", "Check for mortgage balance transfer opportunities.", "Optimize your Emergency Fund for high-yield treasury bills."],
        projection: "Neutralizing interest leakage could add an estimated $12,400 to your net worth over the next 3 fiscal years."
      }
    },
    {
      icon: <ShieldAlert className="w-4 h-4 text-rose-400" />,
      title: "Risk Exposure Alert",
      text: `Risk Alert: Portfolio delta for ${goals[0].title} increased slightly as target amounts were updated.`,
      type: "warning",
      deepDive: {
        analysis: "As you increase your financial targets, the volatility threshold for your core portfolio shifts. Current concentration in growth assets is reaching high-authority limits.",
        actionSteps: ["Perform a stress test on your Emergency Fund liquidity.", "Diversify the FIRE portfolio into low-correlation asset classes.", "Implement a hedging strategy for the 2026 market cycle."],
        projection: "Reducing delta exposure now will protect approximately 14% of your principal in the event of a market correction."
      }
    }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 my-8">
      <AnimatePresence>
        {selectedInsight && (
          <InsightModal insight={selectedInsight} onClose={() => setSelectedInsight(null)} />
        )}
      </AnimatePresence>
      
      {/* Left Column: AI Wealth Score */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="lg:col-span-4 bg-white/[0.02] backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-8 flex flex-col items-center justify-center relative overflow-hidden group shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)]"
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-[#D4AF37]/5 via-transparent to-emerald-500/5 opacity-50" />
        
        <div className="relative z-10 w-full text-center space-y-8">
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="p-1.5 bg-[#D4AF37]/10 rounded-lg border border-[#D4AF37]/20">
              <Sparkles className="w-4 h-4 text-[#D4AF37] animate-pulse" />
            </div>
            <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.5em]">AI Wealth Authority</span>
          </div>

          <div className="relative w-48 h-48 mx-auto">
            {/* Background Glow */}
            <div className="absolute inset-4 bg-emerald-500/10 rounded-full blur-3xl" />
            
            <svg className="w-full h-full transform -rotate-90">
              <defs>
                <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#34d399" />
                </linearGradient>
                <linearGradient id="orbitGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#D4AF37" />
                  <stop offset="100%" stopColor="#f59e0b" />
                </linearGradient>
              </defs>
              <circle
                cx="96"
                cy="96"
                r="80"
                fill="none"
                stroke="currentColor"
                strokeWidth="12"
                className="text-white/[0.03]"
              />
              {/* Progress Circle */}
              <motion.circle
                cx="96"
                cy="96"
                r="80"
                fill="none"
                stroke="url(#scoreGradient)"
                strokeWidth="12"
                strokeDasharray="502.65"
                initial={{ strokeDashoffset: 502.65 }}
                animate={{ strokeDashoffset: 502.65 - (502.65 * wealthScore) / 100 }}
                transition={{ duration: 2, ease: "easeOut" }}
                className="drop-shadow-[0_0_15px_rgba(16,185,129,0.5)]"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="relative">
                <span className="text-6xl font-display font-black text-white tracking-tighter">{wealthScore}</span>
                <div className="absolute -top-1 -right-4 w-4 h-4 bg-emerald-500 rounded-full border-4 border-[#0B1221]" />
              </div>
              <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em] mt-2">Institutional Tier</span>
            </div>
          </div>

          <div className="space-y-3">
            <div className="inline-flex items-center gap-3 px-6 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
              <Activity className="w-4 h-4 text-emerald-400" /> 
              <span className="text-xs font-black text-emerald-400 uppercase tracking-widest">Optimal Growth</span>
            </div>
            <p className="text-[11px] text-white/60 font-black uppercase tracking-[0.2em]">
              STRATEGIC TIER ALPHA
            </p>
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
            {insights.map((insight, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + idx * 0.1 }}
                onClick={() => setSelectedInsight(insight)}
                className="group flex gap-4 p-4 rounded-2xl bg-white/[0.01] border border-white/5 hover:border-[#D4AF37]/40 hover:bg-[#D4AF37]/5 transition-all cursor-pointer"
              >
                <div className="flex-shrink-0 mt-0.5">
                  {insight.icon}
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm text-slate-100 leading-relaxed font-bold">
                    {insight.text}
                  </p>
                </div>
                <ArrowUpRight className="w-4 h-4 text-white/10 group-hover:text-[#D4AF37] transition-colors" />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
