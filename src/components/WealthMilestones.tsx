/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Target, Home, Shield, ChevronRight, TrendingUp, Sparkles } from 'lucide-react';
import { Goal } from '../types';
import NumericInput from './NumericInput';

interface WealthMilestonesProps {
  goals: Goal[];
  onUpdateGoals: (goals: Goal[]) => void;
}

export default function WealthMilestones({ goals, onUpdateGoals }: WealthMilestonesProps) {
  const [activeGoal, setActiveGoal] = useState<string | null>(null);
  const [results, setResults] = useState<Record<string, number>>({});

  const handleUpdate = (id: string, field: keyof Goal, numValue: number) => {
    const updatedGoals = goals.map(g => g.id === id ? { ...g, [field]: numValue } : g);
    onUpdateGoals(updatedGoals);
  };

  const calculateRoadmap = (goal: Goal) => {
    const FV = goal.target;
    const PV = goal.current;
    const n = goal.years * 12;
    const r = goal.annualReturn / 12;

    // PMT = (FV - PV(1+r)^n) * r / ((1+r)^n - 1)
    const power = Math.pow(1 + r, n);
    const denominator = power - 1;
    
    if (denominator === 0) return 0;
    
    const pmt = (FV - PV * power) * r / denominator;
    setResults(prev => ({ ...prev, [goal.id]: Math.max(0, pmt) }));
  };

  return (
    <section className="space-y-10 py-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="h-[1px] w-8 bg-[#f59e0b]"></div>
            <span className="text-base font-black text-[#f59e0b] uppercase tracking-[0.4em]">Milestone Hub</span>
          </div>
          <h2 className="text-5xl font-display font-bold text-white tracking-tight">
            Personal Wealth Milestones
          </h2>
          <p className="text-lg !text-slate-100 !opacity-100 font-medium max-w-lg">
            Design your fiscal roadmap with unit-accurate precision. Gamify your progress towards 2026 financial independence.
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl backdrop-blur-sm">
            <span className="text-base font-black text-white/70 uppercase tracking-widest block mb-1">Total Goal Progress</span>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#f59e0b]" />
              <span className="text-3xl font-display font-bold text-white">
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
                  <Target className="w-5 h-5 text-white/70 group-hover:text-white/70 transition-colors" />
                </div>

                <div className="space-y-1">
                  <h3 className="text-3xl font-bold text-white group-hover:text-[#f59e0b] transition-colors">
                    {goal.title}
                  </h3>
                  <p className="text-base uppercase tracking-widest font-black text-white/70">
                    {goal.subtitle}
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-end text-base font-black uppercase tracking-tighter">
                    <span className="text-white/70">Milestone Progress</span>
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
                    <span className="text-sm text-white/70 uppercase font-bold">Current Wealth</span>
                    <div className="relative">
                      <NumericInput 
                        value={goal.current}
                        onChange={(val) => handleUpdate(goal.id, 'current', val)}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-lg font-bold text-white focus:outline-none focus:border-[#f59e0b] transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-white/70">$</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <span className="text-sm text-white/70 uppercase font-bold">Target Milestone</span>
                    <div className="relative">
                      <NumericInput 
                        value={goal.target}
                        onChange={(val) => handleUpdate(goal.id, 'target', val)}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-lg font-bold text-[#f59e0b] focus:outline-none focus:border-[#f59e0b] transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-white/70">$</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <span className="text-sm text-white/70 uppercase font-bold">Time Horizon (Years)</span>
                    <div className="relative">
                      <NumericInput 
                        value={goal.years}
                        onChange={(val) => handleUpdate(goal.id, 'years', val)}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-lg font-bold text-white focus:outline-none focus:border-[#f59e0b] transition-colors"
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <span className="text-sm text-white/70 uppercase font-bold">Exp. Return (APR %)</span>
                    <div className="relative">
                      <NumericInput 
                        value={goal.annualReturn * 100}
                        onChange={(val) => handleUpdate(goal.id, 'annualReturn', val / 100)}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-lg font-bold text-emerald-400 focus:outline-none focus:border-[#f59e0b] transition-colors"
                      />
                    </div>
                  </div>
                </div>

                <AnimatePresence>
                  {results[goal.id] && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl space-y-2 overflow-hidden"
                    >
                      <div className="flex justify-between items-center text-base font-black uppercase text-emerald-500">
                        <span>Monthly Savings Required</span>
                        <Sparkles className="w-3 h-3" />
                      </div>
                      <div className="text-4xl font-display font-bold text-white">
                        ${Math.round(results[goal.id]).toLocaleString()} <span className="text-lg font-sans font-medium text-white/70">/ mo</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    calculateRoadmap(goal);
                  }}
                  className={`w-full py-4 rounded-2xl text-base font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 group/btn ${
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
