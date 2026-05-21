/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Target, Users, Globe, Rocket } from 'lucide-react';

export default function AboutUs() {
  return (
    <div className="max-w-4xl mx-auto space-y-12 py-12 text-white">
      <header className="space-y-4 text-center">
        <div className="inline-flex p-3 bg-[#D4AF37]/10 rounded-2xl border border-[#D4AF37]/20 mb-4">
           <Rocket className="text-[#D4AF37] w-8 h-8" />
        </div>
        <h1 className="text-4xl font-bold tracking-tighter uppercase">About ORBIT WEALTH PRO</h1>
        <p className="text-white/40 text-sm uppercase tracking-widest font-bold">Empowering Global Financial Literacy</p>
      </header>

      <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-8 md:p-12 space-y-12 leading-relaxed text-white/70">
        <section className="space-y-4">
          <div className="flex items-center gap-3 text-white">
            <Globe className="w-5 h-5 text-[#D4AF37]" />
            <h2 className="text-2xl font-bold tracking-tight">Our Mission</h2>
          </div>
          <p className="text-lg">
            ORBIT WEALTH PRO is a global financial tools platform dedicated to providing accurate and highly accessible calculators for users across the world, with a primary focus on the **USA, UAE, and India**.
          </p>
          <p>
            Our mission is simple: to bring financial clarity through data-driven tools. We believe that everyone should have access to professional-grade financial computations without the complexity or cost of proprietary software.
          </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-6 bg-white/5 rounded-2xl border border-white/5 space-y-3">
             <Target className="w-6 h-6 text-[#D4AF37]" />
             <h3 className="text-lg font-bold text-white">Data Precision</h3>
             <p className="text-sm opacity-60">We calibrate our engines against the latest regional tax slabs and banking norms to ensure the most realistic projections.</p>
          </div>
          <div className="p-6 bg-white/5 rounded-2xl border border-white/5 space-y-3">
             <Users className="w-6 h-6 text-emerald-500" />
             <h3 className="text-lg font-bold text-white">User-Centric</h3>
             <p className="text-sm opacity-60">Built for the modern investor, expat, and house-hunter. Our interface is designed for speed, privacy, and clarity.</p>
          </div>
        </section>

        <section className="space-y-4 border-t border-white/5 pt-12">
          <h2 className="text-xl font-bold text-white tracking-tight">Why Choose Us?</h2>
          <p>
            Navigating international finance can be daunting. Whether you are analyzing a 401(k) in the US, evaluating property ROI in Dubai, or comparing tax regimes in India, ORBIT WEALTH PRO provides the context and the numbers you need to make informed decisions.
          </p>
        </section>

        <section className="border-t border-white/5 pt-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-5 flex justify-center md:justify-start">
              <div className="relative p-1 rounded-2xl bg-gradient-to-br from-[#D4AF37] via-blue-500/20 to-[#D4AF37]/40 shadow-2xl shadow-[#D4AF37]/10">
                <div className="relative rounded-xl overflow-hidden aspect-[4/5] w-full max-w-[300px]">
                  <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400&h=500" 
                    alt="Munchangi Matyaraju"
                    className="object-cover w-full h-full grayscale hover:grayscale-0 transition-all duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                </div>
              </div>
            </div>
            
            <div className="md:col-span-7 space-y-6">
              <div className="space-y-1">
                <h2 className="text-3xl font-bold tracking-tight text-white">Meet the Visionary Behind Orbit Wealth Pro</h2>
                <h3 className="text-[#D4AF37] text-lg font-bold tracking-widest uppercase text-sm">Munchangi Matyaraju (mm Raju) — Founder & Chief AI Architect</h3>
              </div>
              
              <div className="space-y-4 text-white/70">
                <p>
                  Driven by a passion for financial literacy and cutting-edge technology, Munchangi Matyaraju 
                  founded Orbit Wealth Pro to bridge the gap between complex wealth management and modern investors. 
                  With extensive experience in building AI-assisted systems and data-driven solutions, he envisions 
                  a world where financial intelligence is personalized, transparent, and completely decentralized.
                </p>
                <p className="italic text-white">
                  "Our mission is simple: to eliminate the guesswork from financial planning and provide global 
                  investors with high-end, intelligent automation tools that compound wealth safely."
                </p>
              </div>

              <div className="pt-4">
                <a 
                  href="https://www.linkedin.com/in/munchangi-matyaraju" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white/[0.03] border border-[#D4AF37]/30 rounded-xl text-[#D4AF37] font-bold hover:bg-[#D4AF37]/10 hover:border-[#D4AF37]/60 transition-all backdrop-blur-sm group"
                >
                  <Globe className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                  Connect with Founder on LinkedIn →
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div className="p-8 bg-[#D4AF37]/5 rounded-2xl border border-[#D4AF37]/10 text-center">
        <p className="text-xs italic text-white/40">
          "Simplicity is the ultimate sophistication in financial planning."
        </p>
      </div>
    </div>
  );
}
