/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, User, Clock, Share2, Sparkles } from 'lucide-react';
import Markdown from 'react-markdown';
import { Article } from '../data/blogData';

interface ArticleModalProps {
  article: Article | null;
  onClose: () => void;
}

export default function ArticleModal({ article, onClose }: ArticleModalProps) {
  if (!article) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
      <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          aria-label="Close Article" onClick={onClose}
          className="absolute inset-0 bg-[#0B0F19]/90 backdrop-blur-xl"
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-4xl max-h-[90vh] bg-[#0D121F] border border-white/10 rounded-[2.5rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col"
        >
          {/* Header Actions */}
          <div className="absolute top-6 right-6 z-20 flex gap-2">
            <button 
              className="p-2 bg-white/5 border border-white/10 rounded-full text-white/70 hover:text-white transition-colors"
              aria-label="Share Article" title="Share Article"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button 
              aria-label="Close Article" onClick={onClose}
              className="p-2 bg-white/5 border border-white/10 rounded-full text-white/70 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar">
            {/* Hero Section */}
            <div className="w-full relative px-12 pt-24 pb-16 border-b border-white/10">
              <div className="space-y-8">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded-full">
                  <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                  <span className="text-base font-black text-[#D4AF37] uppercase tracking-widest">{article.category}</span>
                </div>
                <h2 className="text-5xl md:text-7xl font-display font-bold text-white tracking-tight max-w-3xl leading-[1.1] pb-4">
                  {article.title}
                </h2>
              </div>
            </div>

            {/* Content Container */}
            <div className="px-12 py-16 relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
                {/* Meta Sidebar */}
                <div className="lg:col-span-1 space-y-8">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-white/5 border border-white/10 rounded-xl">
                        <User className="w-4 h-4 text-[#D4AF37]" />
                      </div>
                      <div>
                        <p className="text-base text-white/70 uppercase font-bold tracking-widest">Author</p>
                        <p className="text-lg font-bold text-white">{article.author}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-white/5 border border-white/10 rounded-xl">
                        <Calendar className="w-4 h-4 text-[#D4AF37]" />
                      </div>
                      <div>
                        <p className="text-base text-white/70 uppercase font-bold tracking-widest">Published</p>
                        <p className="text-lg font-bold text-white">{article.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-white/5 border border-white/10 rounded-xl">
                        <Clock className="w-4 h-4 text-[#D4AF37]" />
                      </div>
                      <div>
                        <p className="text-base text-white/70 uppercase font-bold tracking-widest">Est. Reading</p>
                        <p className="text-lg font-bold text-white">{article.readTime}</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-8 border-t border-white/5">
                    <p className="text-base text-white/70 uppercase font-bold tracking-widest mb-4">Core Themes</p>
                    <div className="flex flex-wrap gap-2">
                      {article.tags.map(tag => (
                        <span key={tag} className="px-2 py-1 bg-white/5 border border-white/5 rounded text-sm text-white/70 font-bold uppercase">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Article Body */}
                <div className="lg:col-span-3 space-y-8">
                  <div className="markdown-body prose prose-invert prose-emerald max-w-none">
                    <p className="text-3xl text-slate-100 leading-relaxed font-medium">
                      {article.excerpt}
                    </p>
                    <div className="h-px w-24 bg-[#D4AF37]/30 my-8" />
                    <div className="text-slate-300 leading-huge text-2xl space-y-6">
                      <p>
                        In the current global fiscal landscape, precision-driven strategies are no longer optional—they are foundational. 
                        As we navigate the complexities of 2026, the architecture of wealth distribution is shifting towards 
                        automated, algorithm-first intelligence models.
                      </p>
                      <p>
                        Historical benchmarks indicate that consistent methodology outpaces opportunistic timing in 94% of long-term cycles. 
                        This deep dive explores the psychological and mathematical frameworks required to maintain high-authority 
                        portfolios amidst shifting interest rate trajectories and evolving digital asset classes.
                      </p>
                      <h3 className="text-4xl font-bold text-white mt-12 mb-6">The New Standard of Intelligence</h3>
                      <p>
                        Automation in wealth management isn't just about efficiency; it's about eliminating the high-entropy friction 
                        of human bias. By implementing zero-maintenance intelligence loops, investors can ensure that their 
                        capital distribution remains optimized across multiple jurisdictions simultaneously.
                      </p>
                    </div>
                  </div>

                  <div className="mt-12 p-8 bg-gradient-to-br from-emerald-500/10 to-transparent border border-emerald-500/20 rounded-[2rem]">
                    <div className="flex items-center gap-4 mb-4">
                      <Sparkles className="w-6 h-6 text-emerald-400" />
                      <h4 className="text-2xl font-bold text-white">Chief AI Architect Insight</h4>
                    </div>
                    <p className="text-emerald-300 text-lg leading-relaxed italic">
                      "The future of wealth belongs to those who view their portfolios as living codebases—dynamic systems that 
                      self-correct against market volatility. Our mission at Orbit Wealth Pro is to provide the operational 
                      syntax for that future."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
  );
}
