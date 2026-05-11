/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { FileText, Check, Globe } from 'lucide-react';

export default function TermsOfService() {
  return (
    <div className="max-w-4xl mx-auto space-y-12 py-12 text-white">
      <header className="space-y-4 text-center">
        <div className="inline-flex p-3 bg-white/5 rounded-2xl border border-white/10 mb-4">
           <FileText className="text-[#0055FF] w-8 h-8" />
        </div>
        <h1 className="text-4xl font-bold tracking-tighter">Terms of Service</h1>
        <p className="text-white/40 text-sm uppercase tracking-widest font-bold">Standard Usage Agreement</p>
      </header>

      <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-8 md:p-12 space-y-8 leading-relaxed text-white/70">
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white tracking-tight">1. Acceptance of Terms</h2>
          <p>
            By accessing and using Orbit Wealth Pro, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. If you do not agree, please refrain from using our tools.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white tracking-tight">2. Use License</h2>
          <p>
            Permission is granted to use our financial calculators for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
          </p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
             {[
               "Modify or copy the materials",
               "Use for commercial purposes",
               "Attempt to decompile the logic",
               "Remove any copyright notations"
             ].map((item, i) => (
               <li key={i} className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/5">
                 <Check className="w-4 h-4 text-[#0055FF]" />
                 <span className="text-xs font-bold">{item}</span>
               </li>
             ))}
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white tracking-tight">3. Disclaimer of Accuracy</h2>
          <p>
            The tools on this website are provided on an 'as is' basis. Orbit Wealth Pro makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties of merchantability or fitness for a particular purpose.
          </p>
        </section>

        <section className="space-y-4">
           <div className="flex items-center gap-2 text-white">
              <Globe className="w-5 h-5 text-[#0055FF]" />
              <h2 className="text-xl font-bold tracking-tight">Governing Law</h2>
           </div>
           <p>
             Any claim relating to Orbit Wealth Pro's website shall be governed by the laws of the jurisdiction in which the user resides, without regard to its conflict of law provisions.
           </p>
        </section>
      </div>
    </div>
  );
}
