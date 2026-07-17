/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Scale, AlertTriangle, CheckCircle2, Info } from 'lucide-react';

export default function Disclaimer() {
  return (
    <div className="max-w-4xl mx-auto space-y-12 py-12 text-white">
      <header className="space-y-4 text-center">
        <div className="inline-flex p-3 bg-amber-500/10 rounded-2xl border border-amber-500/20 mb-4">
           <Scale className="text-amber-500 w-8 h-8" />
        </div>
        <h1 className="text-5xl font-bold tracking-tighter text-[#f59e0b]">Financial Disclaimer</h1>
        <p className="text-white/70 text-base uppercase tracking-widest font-bold">Important Notice to Our Users</p>
      </header>

      <div className="bg-white/[0.03] backdrop-blur-md border border-white/5 rounded-2xl p-8 md:p-12 space-y-8 leading-relaxed text-white/70">
        <div className="p-6 bg-amber-500/10 border border-amber-500/20 rounded-2xl flex items-start gap-4">
           <AlertTriangle className="w-6 h-6 text-amber-500 shrink-0 mt-1" />
           <div className="space-y-4">
             <p className="text-amber-500 font-bold text-xl leading-tight tracking-tight">
               Orbit Wealth Pro is an AI-powered personal wealth intelligence platform designed for educational, informational, and analytical purposes only. We do not provide personalized investment, legal, tax, or financial advice.
             </p>
           </div>
        </div>

        <section className="space-y-4">
          <div className="flex items-center gap-3 text-white">
            <CheckCircle2 className="w-5 h-5 text-[#D4AF37]" />
            <h2 className="text-2xl font-bold tracking-tight">Market Risk & Model Accuracy</h2>
          </div>
          <p>
            Financial markets carry inherent risks, and past performance is not indicative of future results. All automated tools, interactive calculators, and AI insights are simulated models.
          </p>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-3 text-white">
            <Info className="w-5 h-5 text-[#D4AF37]" />
            <h2 className="text-2xl font-bold tracking-tight">Consult Professionals</h2>
          </div>
          <p>
            Please consult with a certified financial advisor or tax professional before making any high-ticket financial decisions. Orbit Wealth Pro assumes no responsibility for losses resulting from the use of its analytical outputs.
          </p>
        </section>

        <section className="space-y-4 border-t border-white/5 pt-8 text-center text-white/70 text-base italic">
          <p>
            © 2026 Orbit Wealth Pro. All Rights Reserved. Built with 0-maintenance edge tech for global scale.
          </p>
        </section>
      </div>
    </div>
  );
}
