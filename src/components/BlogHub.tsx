/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { ARTICLES, Article } from '../data/blogData';
import { Clock, User, ArrowRight, BookOpen, Filter, Search, Sparkles, TrendingUp, ShieldCheck, Wallet, Landmark, CheckCircle2, Mail, Loader2, ShieldAlert } from 'lucide-react';
import ArticleModal from './ArticleModal';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

const CATEGORIES = [
  { name: 'All', icon: <BookOpen className="w-4 h-4" /> },
  { name: 'Investing', icon: <TrendingUp className="w-4 h-4" /> },
  { name: 'Wealth Savings', icon: <Wallet className="w-4 h-4" /> },
  { name: 'Tax Optimization', icon: <ShieldCheck className="w-4 h-4" /> },
  { name: 'Retirement Planning', icon: <Landmark className="w-4 h-4" /> },
];

export default function BlogHub() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const filteredArticles = ARTICLES.filter(article => {
    const matchesCategory = activeCategory === 'All' || article.category === activeCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      if (!isSupabaseConfigured) {
        throw new Error('Database service is currently offline. Please try again later.');
      }

      const { error } = await supabase
        .from('subscribers')
        .insert([{ email, created_at: new Date().toISOString() }]);

      if (error) throw error;

      setIsSubscribed(true);
      setEmail('');
    } catch (err: any) {
      console.error('Subscription error:', err);
      setSubmitError(err.message || 'Failed to subscribe. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-12 pb-20">
      <AnimatePresence>
        {selectedArticle && (
          <ArticleModal article={selectedArticle} onClose={() => setSelectedArticle(null)} />
        )}
      </AnimatePresence>
      <Helmet>
        <title>Insights & Financial Intelligence - ORBIT WEALTH PRO</title>
        <meta name="description" content="Expert financial analysis, wealth strategies, and market insights by mm Raju and the Orbit AI team." />
      </Helmet>

      {/* Hero Section */}
      <header className="space-y-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="h-[1px] w-12 bg-[#D4AF37]"></div>
          <span className="text-base font-black text-[#D4AF37] uppercase tracking-[0.4em] drop-shadow-[0_0_8px_rgba(212,175,55,0.3)]">Knowledge Base</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-4">
            <h1 className="text-7xl md:text-8xl font-display font-bold tracking-tight text-white leading-[1.1]">
              Wealth <br />
              <span className="text-[#D4AF37]">Intelligence Feed</span>
            </h1>
            <p className="text-slate-100 text-2xl leading-relaxed max-w-xl font-medium">
              Precision-engineered insights on asset allocation, fiscal strategy, and the future of global wealth architecture.
            </p>
          </div>
          
          {/* Search Bar */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/70" />
            <input 
              aria-label="Search insights"
              type="text"
              placeholder="Search insights..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/[0.02] border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-lg text-white placeholder:text-white/70 focus:outline-none focus:ring-1 focus:ring-[#D4AF37]/50 focus:border-[#D4AF37]/50 transition-all"
            />
          </div>
        </div>
      </header>

      {/* Categories Bar */}
      <div className="flex flex-wrap gap-3 overflow-x-auto pb-2 scrollbar-none">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.name}
            onClick={() => setActiveCategory(cat.name)}
            className={`flex items-center gap-2 px-6 py-3 rounded-2xl text-base font-black uppercase tracking-widest transition-all whitespace-nowrap border ${
              activeCategory === cat.name 
                ? 'bg-[#D4AF37] text-[#0B0F19] border-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.3)] scale-105' 
                : 'bg-white/[0.03] text-white/70 border-white/5 hover:border-[#D4AF37]/30 hover:bg-white/[0.05] hover:text-[#D4AF37]'
            }`}
          >
            {cat.icon}
            {cat.name}
          </button>
        ))}
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredArticles.map((article, idx) => (
            <motion.article
              key={article.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: idx * 0.05 }}
              onClick={() => setSelectedArticle(article)}
              className="group flex flex-col bg-white/[0.02] border border-white/5 rounded-[2.5rem] overflow-hidden hover:bg-white/[0.04] hover:border-[#D4AF37]/30 transition-all shadow-2xl shadow-black/40 cursor-pointer"
            >
            {/* Image Placeholder with Category Badge */}
            <div className="aspect-[16/9] w-full bg-white/5 relative overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/10 to-transparent opacity-50" />
               <div className="absolute top-6 left-6 px-3 py-1 bg-[#0B0F19]/80 backdrop-blur-md rounded-full border border-white/10">
                  <span className="text-base font-black text-[#D4AF37] uppercase tracking-widest leading-none">
                    {article.category}
                  </span>
               </div>
               <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-12 h-12 rounded-full bg-[#D4AF37] flex items-center justify-center text-[#0B0F19] transform scale-90 group-hover:scale-100 transition-transform">
                     <BookOpen className="w-5 h-5" />
                  </div>
               </div>
            </div>

            <div className="p-8 flex-1 flex flex-col">
              <div className="flex items-center gap-4 mb-4 text-base font-bold text-white/70 uppercase tracking-widest">
                <span className="flex items-center gap-1.5"><Clock className="w-3 h-3" /> {article.readTime}</span>
                <span>{article.date}</span>
              </div>

              <h3 className="text-3xl font-bold text-white mb-4 line-clamp-2 leading-snug group-hover:text-[#D4AF37] transition-colors">
                {article.title}
              </h3>

              <p className="text-lg !text-white !opacity-100 leading-relaxed line-clamp-3 mb-8 font-medium">
                {article.excerpt}
              </p>

              <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center">
                    <User className="w-5 h-5 text-[#D4AF37]" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white">{article.author}</h4>
                    <p className="text-sm text-[#D4AF37] font-black uppercase tracking-widest">{article.authorTitle}</p>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/70 group-hover:bg-[#D4AF37] group-hover:text-[#0B0F19] group-hover:border-[#D4AF37] transition-all">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </motion.article>
        ))}
        </AnimatePresence>
      </div>

      {/* Featured Newsletter Block */}
      <section className="bg-gradient-to-tr from-[#D4AF37]/10 via-[#0B0F19] to-emerald-500/10 border border-white/5 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none" />
        <div className="relative z-10 max-w-2xl mx-auto space-y-8">
          <div className="w-16 h-16 bg-[#D4AF37]/10 rounded-2xl flex items-center justify-center mx-auto border border-[#D4AF37]/20 shadow-[0_0_20px_rgba(212,175,55,0.1)]">
            <Sparkles className="w-8 h-8 text-[#D4AF37]" />
          </div>
          <h2 className="text-6xl font-display font-bold text-white tracking-tight">The Executive Insight <br /><span className="text-[#D4AF37]">Newsletter</span></h2>
          <p className="text-slate-100 leading-relaxed font-medium">
            Join 50,000+ high-net-worth individuals who receive our weekly deep-dives into interest rate cycles, tax-law changes, and emerging asset classes.
          </p>
          
          <div className="max-w-md mx-auto space-y-4">
            <AnimatePresence mode="wait">
              {isSubscribed ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-8 bg-emerald-500/10 border border-emerald-500/20 rounded-[2.5rem] flex flex-col items-center gap-4"
                >
                  <CheckCircle2 className="w-12 h-12 text-emerald-400" />
                  <div className="text-center">
                    <h4 className="text-3xl font-bold text-white">Welcome to the Inner Circle!</h4>
                    <p className="text-emerald-300 font-medium mb-4">Your wealth blueprint is on the way.</p>
                    <button 
                      onClick={() => setIsSubscribed(false)}
                      className="text-base font-black text-[#D4AF37] uppercase tracking-[0.2em] hover:text-white transition-colors"
                    >
                      Subscribe another email
                    </button>
                  </div>
                </motion.div>
              ) : (
                <div className="space-y-4">
                  <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/70" />
                      <input 
                        aria-label="Email address"
                        type="email" 
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Your professional email..."
                        className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-lg text-white focus:outline-none focus:ring-1 focus:ring-[#D4AF37]/50"
                      />
                    </div>
                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className="px-8 py-4 bg-[#D4AF37] text-[#0B0F19] rounded-2xl font-black text-base uppercase tracking-widest hover:bg-[#F3C64F] transition-all shadow-[0_0_20px_rgba(212,175,55,0.3)] disabled:opacity-50 flex items-center justify-center gap-2 min-w-[140px]"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Processing
                        </>
                      ) : 'Subscribe'}
                    </button>
                  </form>
                  
                  {submitError && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-2 text-rose-400 text-base font-bold bg-rose-500/10 border border-rose-500/20 p-3 rounded-xl"
                    >
                      <ShieldAlert className="w-4 h-4" />
                      {submitError}
                    </motion.div>
                  )}
                </div>
              )}
            </AnimatePresence>
          </div>
          <p className="text-base text-white/70 uppercase font-black tracking-widest pt-4">No Spam • High Signal • Professional Only</p>
        </div>
      </section>
    </div>
  );
}
