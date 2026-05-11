/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Shield, Lock, Eye, Cookie } from 'lucide-react';

export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto space-y-12 py-12 text-white">
      <header className="space-y-4 text-center">
        <div className="inline-flex p-3 bg-[#0055FF]/10 rounded-2xl border border-[#0055FF]/20 mb-4">
           <Shield className="text-[#0055FF] w-8 h-8" />
        </div>
        <h1 className="text-4xl font-bold tracking-tighter">Privacy Policy</h1>
        <p className="text-white/40 text-sm uppercase tracking-widest font-bold">Last Updated: May 2024</p>
      </header>

      <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-8 md:p-12 space-y-8 leading-relaxed text-white/70">
        <section className="space-y-4">
          <div className="flex items-center gap-3 text-white">
            <Lock className="w-5 h-5 text-[#0055FF]" />
            <h2 className="text-xl font-bold tracking-tight">Data Sovereignty</h2>
          </div>
          <p>
            At Orbit Wealth Pro, your financial data belongs to you. Our calculators are strictly client-side or transient in nature. We do not store any numbers, inputs, or results you enter into our financial engines on our servers.
          </p>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-3 text-white">
            <Eye className="w-5 h-5 text-[#0055FF]" />
            <h2 className="text-xl font-bold tracking-tight">AdSense & Advertising</h2>
          </div>
          <p>
            We use third-party advertising companies to serve ads when you visit our website. These companies may use information about your visits to this and other websites in order to provide advertisements about goods and services of interest to you.
          </p>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-3 text-white">
            <Cookie className="w-5 h-5 text-[#0055FF]" />
            <h2 className="text-xl font-bold tracking-tight">Cookie Usage</h2>
          </div>
          <p>
            Orbit Wealth Pro uses cookies to store information about visitors' preferences, to record user-specific information on which pages the site visitor accesses or visits, and to personalize or customize our web page content based upon visitors' browser type or other information that the visitor sends via their browser.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white tracking-tight">Analytical Data</h2>
          <p>
            We may use standard web analytics tools to monitor site traffic. This data is aggregated and anonymized, tracking metrics like page views and session duration to help us improve the calculator's performance and accuracy.
          </p>
        </section>
      </div>

      <div className="p-8 bg-[#0055FF]/5 rounded-2xl border border-[#0055FF]/10 text-center">
        <p className="text-xs italic text-white/40">
          "Your financial privacy is our engineering priority. We build tools, not databases."
        </p>
      </div>
    </div>
  );
}
