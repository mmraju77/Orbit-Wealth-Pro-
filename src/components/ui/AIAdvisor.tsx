/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Sparkles, Loader2, AlertCircle } from 'lucide-react';
import { m as motion , AnimatePresence } from 'motion/react';

interface AIAdvisorProps {
  context: string;
}

export default function AIAdvisor({ context }: AIAdvisorProps) {
  const [insight, setInsight] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const generateFallbackInsight = (ctx: string) => {
    const lower = ctx.toLowerCase();
    if (lower.includes('sip') || lower.includes('lump sum') || lower.includes('investment') || lower.includes('wealth')) {
      if (lower.includes('cagr')) return "Your growth rate indicates strong compounding. Staying invested long-term is key to multiplying wealth.";
      return "Consistent compounding is your greatest asset. Notice how the wealth gained accelerates in the later years of your tenure.";
    }
    if (lower.includes('debt') || lower.includes('credit card') || lower.includes('loan')) {
      if (lower.includes('never paid off')) return "Warning: Your current payment structure is causing a debt trap. You must increase your monthly payload immediately.";
      return "Accelerated payments are crucial. Every extra dollar applied to principal drastically reduces your interest drain and timeline.";
    }
    if (lower.includes('insurance') || lower.includes('term') || lower.includes('health') || lower.includes('sum insured')) {
      return "Adequate coverage is the foundation of wealth preservation. Ensure your sum assured aligns with your future liabilities.";
    }
    if (lower.includes('tax') || lower.includes('gst')) {
      return "Strategic tax planning accelerates wealth creation. Keep track of deductions to optimize your effective tax rate.";
    }
    if (lower.includes('retire') || lower.includes('hlv') || lower.includes('human life value')) {
      return "Your target corpus needs to outpace inflation. Early and aggressive allocation secures your future lifestyle.";
    }
    if (lower.includes('break-even') || lower.includes('property') || lower.includes('yield') || lower.includes('rent')) {
      return "Real estate and business margins thrive on fixed cost optimization. Maximizing net yield is your primary objective.";
    }
    return "Excellent financial discipline. Keep monitoring your variables to ensure your trajectory stays aligned with your goals.";
  };

  const fetchInsight = async () => {
    if (insight || loading) return;

    setLoading(true);
    setError(null);
    
    // Simulate a brief delay for realism even on fallback
    await new Promise(resolve => setTimeout(resolve, 600));

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer mock-user-token"
        },
        body: JSON.stringify({
          message: `As a professional financial advisor at ORBIT WEALTH PRO, provide a 2-line maximum summary/insight based on this calculator state: ${context}. Keep it concise, actionable, and encouraging. Never mention you are an AI.`
        })
      });

      if (!response.ok) {
        throw new Error("Failed to fetch insight");
      }

      const data = await response.json();
      if (data.text) {
        setInsight(data.text);
      } else {
        setInsight(generateFallbackInsight(context));
      }
    } catch (err) {
      console.warn("API unavailable, using dynamic fallback logic:", err);
      setInsight(generateFallbackInsight(context));
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
        className="group flex items-center gap-3 px-4 py-2 bg-white/[0.03] border border-white/10 rounded-full hover:bg-[#D4AF37]/10 hover:border-[#D4AF37]/30 transition-all min-h-[44px]"
      >
        <Sparkles className={`w-3.5 h-3.5 ${isOpen ? 'text-[#D4AF37]' : 'text-white/70 group-hover:text-[#D4AF37]'}`} />
        <span className="text-base font-bold text-white/70 uppercase tracking-widest group-hover:text-white">
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
              <div className="absolute top-0 left-0 w-0.5 h-full bg-[#D4AF37] opacity-50"></div>
              
              {loading ? (
                <div className="flex items-center gap-3 py-2">
                  <Loader2 className="w-5 h-5 text-white/70 animate-spin" />
                  <div className="space-y-1 w-full">
                    <div className="h-2 bg-white/5 rounded-full w-3/4 animate-pulse"></div>
                    <div className="h-2 bg-white/5 rounded-full w-1/2 animate-pulse"></div>
                  </div>
                </div>
              ) : error ? (
                <div className="flex items-center gap-3 text-white/70 text-lg">
                  <AlertCircle className="w-4 h-4 text-orange-500" />
                  <span>{error}</span>
                </div>
              ) : (
                <div className="text-white/80 text-lg leading-relaxed font-medium italic">
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
