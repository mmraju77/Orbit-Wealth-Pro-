/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Linkedin, ShieldCheck, Award, User, TrendingUp } from 'lucide-react';
import StructuredData from './StructuredData';

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-transparent text-gray-100 py-12 px-4 sm:px-6 lg:px-8">
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
        <div className="mb-20 space-y-6">
          <div className="flex items-center gap-3">
             <div className="h-[2px] w-12 bg-amber-500/50"></div>
             <span className="text-[11px] font-black text-amber-500 uppercase tracking-[0.4em]">Corporate Genesis</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-white tracking-tighter leading-[0.9] max-w-3xl">
            Architecting the future of <span className="text-amber-500">Wealth Intelligence.</span>
          </h1>
          <p className="text-white/40 text-lg max-w-2xl leading-relaxed font-light">
            Orbit Wealth Pro was engineered to bridge the gap between complex quantitative finance and personal wealth management through high-performance AI automation.
          </p>
        </div>

        {/* Founder Institutional Profile */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-amber-500/20 to-transparent rounded-[3rem] blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative bg-[#0D121F] border border-white/10 rounded-[3rem] p-8 md:p-16 overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl -mr-48 -mt-48 transition-all duration-700 group-hover:bg-amber-500/10"></div>
            
            <div className="flex flex-col lg:flex-row gap-16 items-center lg:items-start relative z-10">
              
              {/* Profile Visual */}
              <div className="flex-shrink-0">
                <div className="relative w-64 h-80 rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl bg-black">
                    <img 
                      src="https://i.ibb.co/B5m9W7Dt/founder-jpg.jpg" 
                      alt="Munchangi Matyaraju (mm Raju)" 
                      className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 scale-105 hover:scale-100"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
                    <div className="absolute bottom-6 left-6 right-6">
                       <div className="text-[10px] font-black text-amber-500 uppercase tracking-widest mb-1 italic">Verified Identity</div>
                       <div className="h-0.5 w-8 bg-amber-500"></div>
                    </div>
                </div>
              </div>

              {/* Bio Data */}
              <div className="flex-1 space-y-8 text-center lg:text-left">
                <div className="space-y-2">
                  <div className="flex flex-col lg:flex-row items-center lg:items-end gap-3 lg:gap-4">
                    <h2 className="text-4xl font-black text-white tracking-tight">Munchangi Matyaraju</h2>
                    <span className="text-white/20 font-black text-2xl tracking-tighter hidden lg:block">/</span>
                    <span className="text-white/40 font-display text-lg tracking-tight">(mm Raju)</span>
                  </div>
                  <div className="flex items-center justify-center lg:justify-start gap-3 mt-4">
                    <ShieldCheck className="text-amber-500 w-5 h-5" />
                    <span className="text-xs font-black text-amber-500 uppercase tracking-[0.3em]">Chief AI Architect & Founder</span>
                  </div>
                </div>
                
                <div className="space-y-6 text-white/50 text-sm leading-8 font-medium">
                  <p>
                    A quantitative systems visionary and financial technologist, Munchangi Matyaraju (mm Raju) founded Orbit Wealth Pro to dismantle the barriers of traditional retail finance. His philosophy centers on <span className="text-white/80">Mathematical Sovereignty</span>—providing individuals with the same rigorous computational accuracy utilized by elite hedge funds and institutional private banks.
                  </p>
                  <p>
                    By integrating neural-proximal interest models with real-time fiscal policy frameworks across 11+ global jurisdictions, Raju has architected a platform that autonomously handles the heavy quantitative overhead of wealth compounding, tax optimization, and capital allocation.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-6 pt-4">
                  <a 
                    href="https://www.linkedin.com/in/munchangi-matyaraju" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-white text-black px-8 py-4 rounded-full text-xs font-black uppercase tracking-widest hover:bg-amber-500 hover:text-black transition-all duration-500 shadow-xl shadow-white/5"
                  >
                    <Linkedin className="w-4 h-4 fill-current" />
                    LinkedIn Profile
                  </a>
                  <div className="flex items-center gap-3 text-white/20">
                     <div className="w-8 h-[1px] bg-white/10 text-[10px]"></div>
                     <span className="text-[10px] uppercase tracking-widest font-bold">ID: SEC-MMR-GEN-1</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Core Values / Authority Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
          <div className="p-10 bg-white/5 border border-white/10 rounded-[2.5rem] space-y-4">
            <TrendingUp className="text-amber-500 w-8 h-8 mb-2" />
            <h4 className="text-sm font-black text-white uppercase tracking-widest">Quant Accuracy</h4>
            <p className="text-xs text-white/40 leading-relaxed font-medium">
              Every engine is tested against rigorous financial benchmark models to ensure 100% calculation integrity for global tax and debt regimes.
            </p>
          </div>
          <div className="p-10 bg-[#0D121F] border border-white/10 rounded-[2.5rem] space-y-4">
            <Award className="text-amber-500 w-8 h-8 mb-2" />
            <h4 className="text-sm font-black text-white uppercase tracking-widest">Global Reach</h4>
            <p className="text-xs text-white/40 leading-relaxed font-medium">
              Supporting cross-regional financial intelligence for 11+ major economies, adjusting dynamically for local currency and fiscal policy.
            </p>
          </div>
          <div className="p-10 bg-white/5 border border-white/10 rounded-[2.5rem] space-y-4">
            <ShieldCheck className="text-amber-500 w-8 h-8 mb-2" />
            <h4 className="text-sm font-black text-white uppercase tracking-widest">Zero Tracking</h4>
            <p className="text-xs text-white/40 leading-relaxed font-medium">
              We operate on an edge-compute principle. Your capital data is processed in real-time without persistent server-side logging.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
