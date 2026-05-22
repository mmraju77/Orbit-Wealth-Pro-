/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, ArrowRight, ShieldCheck, TrendingUp, Lightbulb } from 'lucide-react';
import { Insight } from '../types';

interface InsightModalProps {
  insight: Insight | null;
  onClose: () => void;
}

export default function InsightModal({ insight, onClose }: InsightModalProps) {
  if (!insight) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 md:p-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-[#0B0F19]/90 backdrop-blur-xl"
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-2xl bg-[#0D121F] border border-white/10 rounded-[2.5rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] overflow-hidden"
        >
          {/* Header */}
          <div className="p-8 border-b border-white/5 flex items-start justify-between">
            <div className="flex gap-4">
              <div className={`p-4 rounded-2xl bg-white/5 border border-white/10 ${
                insight.type === 'positive' ? 'text-emerald-400' : 
                insight.type === 'action' ? 'text-[#D4AF37]' : 'text-rose-400'
              }`}>
                {insight.icon}
              </div>
              <div>
                <h2 className="text-2xl font-display font-bold text-white tracking-tight">
                  {insight.title}
                </h2>
                <p className="text-[10px] text-white/30 uppercase font-bold tracking-widest mt-1">
                  AI Financial Analysis • 2026 Q2
                </p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="p-2 bg-white/5 border border-white/10 rounded-full text-white/40 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-8 space-y-8 max-h-[60vh] overflow-y-auto custom-scrollbar">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold text-[#D4AF37] uppercase tracking-widest">
                <Sparkles className="w-3 h-3" />
                Executive Summary
              </div>
              <p className="text-lg text-slate-100 leading-relaxed font-medium italic">
                "{insight.text}"
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold text-white/30 uppercase tracking-widest">
                <ShieldCheck className="w-3 h-3" />
                Deep-Dive Analysis
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                {insight.deepDive.analysis}
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold text-white/30 uppercase tracking-widest">
                <Lightbulb className="w-3 h-3" />
                Actionable Next Steps
              </div>
              <div className="grid grid-cols-1 gap-3">
                {insight.deepDive.actionSteps.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-4 bg-white/[0.02] border border-white/5 rounded-2xl">
                    <div className="w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <ArrowRight className="w-3 h-3 text-emerald-400" />
                    </div>
                    <span className="text-sm text-slate-200 font-medium">{step}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 bg-gradient-to-br from-emerald-500/10 to-transparent border border-emerald-500/20 rounded-[2rem] space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-widest text-[9px]">
                <TrendingUp className="w-3 h-3" />
                Projected Impact
              </div>
              <p className="text-sm text-emerald-100/60 leading-relaxed italic">
                {insight.deepDive.projection}
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="p-8 border-t border-white/5 bg-white/[0.01] flex justify-end">
            <button 
              onClick={onClose}
              className="px-8 py-3 bg-[#f59e0b] text-[#0B0F19] rounded-2xl font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-all shadow-[0_0_20px_rgba(245,158,11,0.2)]"
            >
              Acknowledged
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
