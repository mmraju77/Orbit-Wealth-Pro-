/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Sparkles, Loader2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AIAdvisorProps {
  context: string;
}

export default function AIAdvisor({ context }: AIAdvisorProps) {
  const [insight, setInsight] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const fetchInsight = async () => {
    if (insight || loading) return; // Only fetch once or if not already loading
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer mock-user-token"
        },
        body: JSON.stringify({
          message: `As a professional financial advisor at Orbit Wealth Pro, provide a 2-line maximum summary/insight based on this calculator state: ${context}. Keep it concise, actionable, and encouraging. Never mention you are an AI.`
        })
      });

      if (!response.ok) {
        throw new Error("Failed to fetch insight");
      }

      const data = await response.json();
      setInsight(data.text || "Calculation looks solid. Keep monitoring your goals.");
    } catch (err) {
      console.error("AI Advisor Error:", err);
      setError("Failed to generate insight.");
    } finally {
      setLoading(false);
    }
  };

  const toggleInsight = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    if (newState && !insight) {
      fetchInsight();
    }
  };

  return (
    <div className="mt-8">
      <button 
        onClick={toggleInsight}
        className="group flex items-center gap-3 px-4 py-2 bg-white/[0.03] border border-white/10 rounded-full hover:bg-[#0055FF]/10 hover:border-[#0055FF]/30 transition-all"
      >
        <Sparkles className={`w-3.5 h-3.5 ${isOpen ? 'text-[#0055FF]' : 'text-white/20 group-hover:text-[#0055FF]'}`} />
        <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest group-hover:text-white">
          {isOpen ? 'Close Insight' : 'Get AI Insight'}
        </span>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: 'auto', marginTop: 16 }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            className="overflow-hidden"
          >
            <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-6 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-0.5 h-full bg-[#0055FF] opacity-50"></div>
              
              {loading ? (
                <div className="flex items-center gap-3 py-2">
                  <Loader2 className="w-5 h-5 text-white/20 animate-spin" />
                  <div className="space-y-1 w-full">
                    <div className="h-2 bg-white/5 rounded-full w-3/4 animate-pulse"></div>
                    <div className="h-2 bg-white/5 rounded-full w-1/2 animate-pulse"></div>
                  </div>
                </div>
              ) : error ? (
                <div className="flex items-center gap-3 text-white/40 text-sm">
                  <AlertCircle className="w-4 h-4 text-orange-500" />
                  <span>{error}</span>
                </div>
              ) : (
                <div className="text-white/80 text-sm leading-relaxed font-medium italic">
                  "{insight || 'Analyzing your data...'}"
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
