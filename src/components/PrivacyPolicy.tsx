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
        <p className="text-white/40 text-sm uppercase tracking-widest font-bold">Last Updated: May 2026</p>
      </header>

      <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-8 md:p-12 space-y-8 leading-relaxed text-white/70">
        <section className="space-y-4">
          <div className="flex items-center gap-3 text-white">
            <Lock className="w-5 h-5 text-[#0055FF]" />
            <h2 className="text-xl font-bold tracking-tight">Information Collection</h2>
          </div>
          <p>
            Like many other websites, Orbit Wealth Pro makes use of log files. These files merely log visitors to the site – usually a standard procedure for hosting companies and a part of hosting services' analytics. The information inside the log files includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date/time stamp, referring/exit pages, and possibly the number of clicks.
          </p>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-3 text-white">
            <Eye className="w-5 h-5 text-[#0055FF]" />
            <h2 className="text-xl font-bold tracking-tight">Google Analytics (GA4)</h2>
          </div>
          <p>
            We use Google Analytics (GA4) to monitor and analyze the use of our website. Google Analytics is a web analytics service offered by Google that tracks and reports website traffic. Google uses the data collected to track and monitor the use of our Service. This data is shared with other Google services.
          </p>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-3 text-white">
            <Cookie className="w-5 h-5 text-[#0055FF]" />
            <h2 className="text-xl font-bold tracking-tight">Google AdSense & DoubleClick</h2>
          </div>
          <p>
            Google, as a third-party vendor, uses cookies to serve ads on Orbit Wealth Pro. Google's use of the DoubleClick DART cookie enables it to serve ads to our users based on their visit to our site and other sites on the Internet.
          </p>
          <p>
            Users may opt-out of the use of the DART cookie by visiting the Google ad and content network privacy policy at the following URL: <a href="https://www.google.com/privacy_ads.html" className="text-[#0055FF] hover:underline">https://www.google.com/privacy_ads.html</a>
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white tracking-tight">Data Protection</h2>
          <p>
            Your financial data entered into our calculators is processed client-side and is not stored on our databases. We prioritize your privacy and do not sell or trade your personal information to outside parties.
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
