/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Target, Home, Shield, ChevronRight, TrendingUp, Sparkles } from 'lucide-react';

interface Goal {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  target: number;
  current: number;
  color: string;
  accent: string;
}

const INITIAL_GOALS: Goal[] = [
  {
    id: 'fire',
    title: 'Retire Early (FIRE Plan)',
    subtitle: 'Financial Independence Architecture',
    icon: <TrendingUp className="w-6 h-6" />,
    target: 2500000,
    current: 450000,
    color: 'emerald',
    accent: '#10b981'
  },
  {
    id: 'real-estate',
    title: 'Acquire Real Estate',
    subtitle: 'Strategic Property Portfolio',
    icon: <Home className="w-6 h-6" />,
    target: 800000,
    current: 125000,
    color: 'amber',
    accent: '#f59e0b'
  },
  {
    id: 'emergency',
    title: 'Emergency Fund',
    subtitle: 'Liquidity & Risk Mitigation',
    icon: <Shield className="w-6 h-6" />,
    target: 50000,
    current: 35000,
    color: 'sky',
    accent: '#0ea5e9'
  }
];

export default function WealthMilestones() {
  const [goals, setGoals] = useState(INITIAL_GOALS);
  const [activeGoal, setActiveGoal] = useState<string | null>(null);

  const handleUpdateCurrent = (id: string, value: string) => {
    const numValue = parseFloat(value.replace(/[^0-9.]/g, '')) || 0;
    setGoals(prev => prev.map(g => g.id === id ? { ...g, current: numValue } : g));
  };

  return (
    <section className="space-y-10 py-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="h-[1px] w-8 bg-[#f59e0b]"></div>
            <span className="text-[10px] font-black text-[#f59e0b] uppercase tracking-[0.4em]">Milestone Hub</span>
          </div>
          <h2 className="text-3xl font-display font-bold text-white tracking-tight">
            Personal Wealth Milestones
          </h2>
          <p className="text-sm !text-slate-100 !opacity-100 font-medium max-w-lg">
            Design your fiscal roadmap with unit-accurate precision. Gamify your progress towards 2026 financial independence.
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl backdrop-blur-sm">
            <span className="text-[10px] font-black text-white/40 uppercase tracking-widest block mb-1">Total Goal Progress</span>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#f59e0b]" />
              <span className="text-xl font-display font-bold text-white">
                {Math.round((goals.reduce((acc, g) => acc + g.current, 0) / goals.reduce((acc, g) => acc + g.target, 0)) * 100)}%
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {goals.map((goal) => {
          const progress = (goal.current / goal.target) * 100;
          return (
            <motion.div
              key={goal.id}
              layoutId={goal.id}
              className={`relative group bg-[#0B0F19] border-2 rounded-[2rem] p-8 transition-all duration-500 overflow-hidden ${
                activeGoal === goal.id ? 'border-[#f59e0b] ring-4 ring-[#f59e0b]/10' : 'border-white/5 hover:border-white/20'
              }`}
              onClick={() => setActiveGoal(goal.id)}
            >
              {/* Background Glow */}
              <div 
                className="absolute -top-24 -right-24 w-48 h-48 blur-[80px] opacity-20 transition-opacity group-hover:opacity-40"
                style={{ backgroundColor: goal.accent }}
              />

              <div className="relative z-10 space-y-6">
                <div className="flex items-center justify-between">
                  <div 
                    className="p-3 rounded-2xl bg-white/5 border border-white/10"
                    style={{ color: goal.accent }}
                  >
                    {goal.icon}
                  </div>
                  <Target className="w-5 h-5 text-white/10 group-hover:text-white/40 transition-colors" />
                </div>

                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-white group-hover:text-[#f59e0b] transition-colors">
                    {goal.title}
                  </h3>
                  <p className="text-[10px] uppercase tracking-widest font-black text-white/40">
                    {goal.subtitle}
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-end text-[10px] font-black uppercase tracking-tighter">
                    <span className="text-white/60">Milestone Progress</span>
                    <span className="text-white">{Math.min(100, Math.round(progress))}%</span>
                  </div>
                  <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-emerald-500 to-[#f59e0b]"
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(100, progress)}%` }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <span className="text-[9px] text-white/30 uppercase font-bold">Current</span>
                    <div className="relative">
                      <input 
                        type="text"
                        value={goal.current.toLocaleString()}
                        onChange={(e) => handleUpdateCurrent(goal.id, e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm font-bold text-white focus:outline-none focus:border-[#f59e0b] transition-colors"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[9px] text-white/20">$</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[9px] text-white/30 uppercase font-bold">Target</span>
                    <div className="w-full bg-white/[0.02] border border-white/5 rounded-lg px-3 py-2 text-sm font-bold text-white/60">
                      ${goal.target.toLocaleString()}
                    </div>
                  </div>
                </div>

                <button 
                  className={`w-full py-4 rounded-2xl text-xs font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 group/btn ${
                    activeGoal === goal.id 
                    ? 'bg-gradient-to-r from-emerald-500 to-amber-500 text-[#0B0F19] shadow-[0_0_30px_rgba(245,158,11,0.3)] hover:scale-[1.02]' 
                    : 'bg-white/5 text-white border border-white/10 hover:bg-white/10'
                  }`}
                >
                  Calculate Roadmap <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
