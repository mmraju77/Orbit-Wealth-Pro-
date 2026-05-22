/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Linkedin, ShieldCheck, Award, User } from 'lucide-react';

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-transparent text-gray-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-[#F3C64F] mb-4 tracking-tight uppercase">
            The Vision Behind Orbit Wealth Pro
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Empowering global investors with AI-driven wealth intelligence and institutional-grade analytics.
          </p>
        </div>

        {/* Founder Profile Card */}
        <div className="bg-white/[0.03] backdrop-blur-md border border-white/5 rounded-2xl p-8 md:p-12 shadow-2xl flex flex-col md:flex-row gap-8 items-center">
          
          {/* Left Side: Avatar/Photo */}
          <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-[#F3C64F] shadow-lg flex-shrink-0 bg-[#0B0F19]">
              <img 
                src="/founder.jpg" 
                alt="Munchangi Matyaraju" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                onError={(e) => {
                  e.currentTarget.classList.add('hidden');
                  const fallback = e.currentTarget.nextElementSibling;
                  if (fallback) fallback.classList.remove('hidden');
                }}
                referrerPolicy="no-referrer"
              />
              <div className="hidden w-full h-full flex flex-col items-center justify-center animate-pulse">
                <User className="w-16 h-16 text-gray-600" />
                <span className="text-xs font-bold text-gray-500 mt-2 uppercase tracking-widest">MM Raju</span>
              </div>
          </div>

          {/* Right Side: Bio Content */}
          <div className="flex-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
              <h2 className="text-2xl font-bold text-white">Munchangi Matyaraju</h2>
              <ShieldCheck className="text-blue-400 w-5 h-5" />
            </div>
            <p className="text-[#F3C64F] text-sm font-medium mb-4">Founder & Chief AI Architect</p>
            
            <p className="text-gray-300 text-base leading-relaxed mb-6">
              Driven by a deep passion for technological innovation and personal finance automation, 
              Munchangi Matyaraju (mm Raju) built Orbit Wealth Pro to decentralize financial intelligence. 
              By integrating advanced compounding algorithms with automated data frameworks, he created 
              a platform that simplifies complex wealth metrics for users in 11+ jurisdictions.
            </p>

            {/* LinkedIn Connection Button */}
            <a 
              href="https://www.linkedin.com/in/munchangi-matyaraju" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#F3C64F]/10 hover:bg-[#F3C64F]/20 border border-[#F3C64F]/30 text-[#F3C64F] px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300"
            >
              <Linkedin className="w-4 h-4" />
              Connect with Founder on LinkedIn
            </a>
          </div>
        </div>

        {/* Core Values / Authority Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          <div className="bg-white/[0.03] backdrop-blur-md border border-white/5 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-2 text-white font-semibold">
              <Award className="text-[#F3C64F] w-5 h-5" /> Our Commitment
            </div>
            <p className="text-gray-400 text-sm">
              We provide 100% computational accuracy across all local tax limits, inflation projections, and investment rules.
            </p>
          </div>
          <div className="bg-white/[0.03] backdrop-blur-md border border-white/5 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-2 text-white font-semibold">
              <ShieldCheck className="text-blue-400 w-5 h-5" /> Privacy First
            </div>
            <p className="text-gray-400 text-sm">
              Your financial calculations happen client-side or securely inside our zero-maintenance architecture. We never sell user data.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
