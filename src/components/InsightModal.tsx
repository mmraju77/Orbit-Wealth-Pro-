/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, ArrowRight, ShieldCheck, TrendingUp, Lightbulb, Activity } from 'lucide-react';
import { Insight } from '../types';

interface InsightModalProps {
  insight: Insight | null;
  onClose: () => void;
}

export default function InsightModal({ insight, onClose }: InsightModalProps) {
  if (!insight) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        aria-label="Close insight" onClick={onClose}
        className="absolute inset-0 bg-[#0B0F19]/95 backdrop-blur-2xl"
      />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 30 }}
        className="relative w-full max-w-2xl bg-white rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.6)] overflow-hidden flex flex-col"
      >
        {/* Header - High Contrast Dark */}
        <div className="p-8 pb-10 bg-[#0D121F] border-b border-white/5 flex items-start justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/10 rounded-full blur-3xl -mr-16 -mt-16" />
          <div className="flex gap-5 relative z-10">
            <div className={`p-4 rounded-[1.5rem] shadow-xl ${
              insight.type === 'positive' ? 'bg-emerald-500 text-white shadow-emerald-500/20' : 
              insight.type === 'action' ? 'bg-[#D4AF37] text-[#0B0F19] shadow-[#D4AF37]/20' : 'bg-rose-500 text-white shadow-rose-500/20'
            }`}>
              {insight.icon}
            </div>
            <div>
              <h2 className="text-5xl font-display font-bold text-white tracking-tight leading-none mb-2">
                {insight.title}
              </h2>
              <div className="flex items-center gap-2">
                <Activity className="w-3 h-3 text-[#D4AF37]" />
                <p className="text-base text-white/70 uppercase font-black tracking-widest">
                  Orbit Intelligence Protocol • Active Sync
                </p>
              </div>
            </div>
          </div>
          <button 
            aria-label="Close insight" onClick={onClose}
            className="p-2.5 bg-white/5 border border-white/10 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-all relative z-10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content - Bright White Premium Breakdown */}
        <div className="flex-1 p-8 md:p-10 space-y-10 max-h-[60vh] overflow-y-auto custom-scrollbar bg-slate-50">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-base font-black text-[#D4AF37] uppercase tracking-[0.3em]">
              <Sparkles className="w-4 h-4" />
              Strategic Overview
            </div>
            <p className="text-4xl text-slate-900 leading-snug font-bold tracking-tight">
              {insight.text}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-base font-black text-slate-400 uppercase tracking-widest">
                <ShieldCheck className="w-4 h-4" />
                Quant Analytics
              </div>
              <p className="text-lg text-slate-600 leading-relaxed font-medium">
                {insight.deepDive.analysis}
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2 text-base font-black text-slate-400 uppercase tracking-widest">
                <Lightbulb className="w-4 h-4" />
                Execution Steps
              </div>
              <div className="space-y-3">
                {insight.deepDive.actionSteps.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-4 bg-white border border-slate-200 rounded-2xl shadow-sm">
                    <div className="w-6 h-6 rounded-lg bg-emerald-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <ArrowRight className="w-3 h-3 text-emerald-600" />
                    </div>
                    <span className="text-base text-slate-800 font-bold leading-tight">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="p-6 bg-[#0D121F] rounded-[2rem] border border-white/5 shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-transparent opacity-50" />
            <div className="relative z-10 flex items-center justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-black text-emerald-400 uppercase tracking-[0.2em]">
                  <TrendingUp className="w-4 h-4" />
                  Projected Capital Delta
                </div>
                <p className="text-lg text-white leading-relaxed italic font-medium">
                  {insight.deepDive.projection}
                </p>
              </div>
              <div className="hidden sm:block">
                <div className="w-12 h-12 rounded-full border-2 border-emerald-500/20 flex items-center justify-center">
                  <Activity className="w-6 h-6 text-emerald-500 animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-8 bg-white border-t border-slate-100 flex items-center justify-between">
          <div className="hidden md:block">
            <p className="text-sm font-black text-slate-300 uppercase tracking-widest">
              Data strictly Confidential • Internal Orbit Use Only
            </p>
          </div>
          <button 
            aria-label="Close insight" onClick={onClose}
            className="w-full md:w-auto px-10 py-4 bg-[#0D121F] text-white rounded-2xl font-black text-base uppercase tracking-[0.2em] hover:bg-[#D4AF37] hover:text-[#0B0F19] transition-all shadow-xl"
          >
            Acknowledge Intelligence
          </button>
        </div>
      </motion.div>
    </div>
  );
}
