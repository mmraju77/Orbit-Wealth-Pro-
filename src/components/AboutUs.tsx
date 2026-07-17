/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Linkedin, ShieldCheck, Award, User, TrendingUp, Sparkles, Globe, BrainCircuit } from 'lucide-react';
import StructuredData from './StructuredData';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" as any }
  }
};

export default function AboutUs() {
  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-transparent text-gray-100 py-12 px-4 sm:px-6 lg:px-8"
    >
      <StructuredData 
        type="FinancialProduct"
        data={{
          name: "ORBIT WEALTH PRO",
          description: "Elite AI-driven wealth intelligence platform for institutional-grade financial analytics and cross-regional investment tools.",
          url: "/about"
        }}
      />
      <div className="max-w-5xl mx-auto">
        
        {/* Header Section */}
        <motion.div variants={itemVariants} className="mb-20 space-y-6">
          <div className="flex items-center gap-3">
             <div className="h-[2px] w-12 bg-amber-500/50"></div>
             <span className="text-[11px] font-black text-amber-500 uppercase tracking-[0.4em]">Corporate Genesis</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-[0.9] max-w-3xl">
            Architecting the future of <span className="text-amber-500">Wealth Intelligence.</span>
          </h1>
          <p className="text-white/40 text-lg max-w-2xl leading-relaxed font-light">
            Orbit Wealth Pro was engineered to bridge the gap between complex quantitative finance and personal wealth management through high-performance AI automation.
          </p>
        </motion.div>

        {/* Founder Institutional Profile */}
        <motion.div variants={itemVariants} className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-amber-500/20 to-transparent rounded-[3rem] blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative bg-[#0D121F] border border-white/10 rounded-[3rem] p-8 md:p-16 overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/[0.03] rounded-full blur-[100px] -mr-64 -mt-64 transition-all duration-700 group-hover:bg-amber-500/[0.07]"></div>
            
            <div className="flex flex-col lg:flex-row gap-16 items-center lg:items-start relative z-10">
              
              {/* Profile Visual */}
              <div className="flex-shrink-0">
                <div className="relative w-72 h-[420px] rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl bg-black group/img">
                    <img 
                      src="https://i.ibb.co/B5m9W7Dt/founder-jpg.jpg" 
                      alt="Munchangi Matyaraju (mm Raju)" 
                      className="w-full h-full object-cover grayscale brightness-90 group-hover/img:grayscale-0 group-hover/img:brightness-100 transition-all duration-1000 scale-[1.05] group-hover/img:scale-100"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
                    <div className="absolute bottom-8 left-8 right-8">
                       <div className="text-[10px] font-black text-amber-500 uppercase tracking-[0.3em] mb-2 italic">Verified Identity</div>
                       <div className="h-[2px] w-12 bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]"></div>
                    </div>
                </div>
              </div>

              {/* Bio Data */}
              <div className="flex-1 space-y-10 text-center lg:text-left pt-4">
                <div className="space-y-4">
                  <div className="flex flex-col lg:flex-row items-center lg:items-end gap-3 lg:gap-4">
                    <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">Munchangi Matyaraju</h2>
                    <span className="text-white/20 font-black text-2xl tracking-tighter hidden lg:block">/</span>
                    <span className="text-white/40 font-display text-xl tracking-tight">(mm Raju)</span>
                  </div>
                  <div className="flex items-center justify-center lg:justify-start gap-3">
                    <div className="p-2 bg-amber-500/10 rounded-lg">
                      <BrainCircuit className="text-amber-500 w-5 h-5" />
                    </div>
                    <span className="text-xs font-black text-amber-500 uppercase tracking-[0.4em]">Chief AI Architect & Founder</span>
                  </div>
                </div>
                
                <div className="space-y-8 text-white/50 text-base leading-relaxed font-medium">
                  <p>
                    A quantitative systems visionary and financial technologist, <span className="text-white font-bold">Munchangi Matyaraju (mm Raju)</span> founded Orbit Wealth Pro to dismantle the barriers of traditional retail finance. His philosophy centers on <span className="text-amber-500 font-bold decoration-amber-500/30 underline decoration-2 underline-offset-4">Mathematical Sovereignty</span>—providing individuals with the same rigorous computational accuracy utilized by elite hedge funds and institutional private banks.
                  </p>
                  <p>
                    By integrating neural-proximal interest models with real-time fiscal policy frameworks across 11+ global jurisdictions, Raju has architected a platform that autonomously handles the heavy quantitative overhead of wealth compounding, tax optimization, and capital allocation.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-8 pt-6">
                  <a 
                    href="https://www.linkedin.com/in/munchangi-matyaraju" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-4 bg-white text-black px-10 py-5 rounded-full text-xs font-black uppercase tracking-[0.2em] hover:bg-amber-500 hover:text-black hover:scale-105 transition-all duration-500 shadow-2xl shadow-white/5 active:scale-95"
                  >
                    <Linkedin className="w-5 h-5 fill-current" />
                    Connect via LinkedIn
                  </a>
                  <div className="flex flex-col items-start gap-1">
                     <span className="text-[10px] uppercase tracking-widest font-black text-white/20">Security Clearance</span>
                     <span className="text-[10px] font-mono text-amber-500/40">ID: OWP-SYS-GEN-2026-MMR</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Mission Statement */}
        <motion.div variants={itemVariants} className="mt-32 p-12 bg-white/[0.02] border border-white/5 rounded-[3rem] text-center space-y-6 relative overflow-hidden">
           <div className="relative z-10">
              <Sparkles className="w-8 h-8 text-amber-500 mx-auto mb-6 opacity-50" />
              <h3 className="text-2xl font-bold text-white tracking-tight">Our Mission</h3>
              <p className="text-white/40 max-w-2xl mx-auto leading-relaxed text-sm">
                To democratize global financial intelligence by providing autonomous, multi-currency, and tax-aware simulation engines that empower the modern investor.
              </p>
           </div>
        </motion.div>

        {/* Core Values / Authority Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 pb-20">
          <motion.div variants={itemVariants} className="p-10 bg-white/5 border border-white/10 rounded-[2.5rem] space-y-4 hover:border-amber-500/30 transition-colors">
            <TrendingUp className="text-amber-500 w-8 h-8 mb-2" />
            <h4 className="text-sm font-black text-white uppercase tracking-widest">Quant Accuracy</h4>
            <p className="text-xs text-white/40 leading-relaxed font-medium">
              Every engine is tested against rigorous financial benchmark models to ensure 100% calculation integrity for global tax and debt regimes.
            </p>
          </motion.div>
          <motion.div variants={itemVariants} className="p-10 bg-[#0D121F] border border-white/10 rounded-[2.5rem] space-y-4 hover:border-amber-500/30 transition-colors">
            <Globe className="text-amber-500 w-8 h-8 mb-2" />
            <h4 className="text-sm font-black text-white uppercase tracking-widest">Global Reach</h4>
            <p className="text-xs text-white/40 leading-relaxed font-medium">
              Supporting cross-regional financial intelligence for 11+ major economies, adjusting dynamically for local currency and fiscal policy.
            </p>
          </motion.div>
          <motion.div variants={itemVariants} className="p-10 bg-white/5 border border-white/10 rounded-[2.5rem] space-y-4 hover:border-amber-500/30 transition-colors">
            <ShieldCheck className="text-amber-500 w-8 h-8 mb-2" />
            <h4 className="text-sm font-black text-white uppercase tracking-widest">Zero Tracking</h4>
            <p className="text-xs text-white/40 leading-relaxed font-medium">
              We operate on an edge-compute principle. Your capital data is processed in real-time without persistent server-side logging.
            </p>
          </motion.div>
        </div>

      </div>
    </motion.div>
  );
}
