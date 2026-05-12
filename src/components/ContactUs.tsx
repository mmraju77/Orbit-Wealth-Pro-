/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Mail, Send, MessageCircle, MapPin, Globe } from 'lucide-react';

export default function ContactUs() {
  return (
    <div className="max-w-4xl mx-auto space-y-12 py-12 text-white">
      <header className="space-y-4 text-center">
        <div className="inline-flex p-3 bg-[#0055FF]/10 rounded-2xl border border-[#0055FF]/20 mb-4">
           <Mail className="text-[#0055FF] w-8 h-8" />
        </div>
        <h1 className="text-4xl font-bold tracking-tighter">Contact Us</h1>
        <p className="text-white/40 text-sm uppercase tracking-widest font-bold">Get in touch with our financial experts</p>
      </header>

      <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-8 md:p-12 space-y-8 leading-relaxed text-white/70">
        <section className="space-y-6 text-center">
          <h2 className="text-2xl font-bold text-white tracking-tight">We value your feedback</h2>
          <p className="text-lg max-w-2xl mx-auto">
            Whether you have a suggestion for a new calculator, found a technical issue, or just want to share your experience with Orbit Wealth Pro, we are all ears. Our team is committed to providing the most accurate financial tools globally.
          </p>
          <div className="pt-8">
            <div className="inline-flex items-center gap-4 p-6 bg-[#0055FF]/10 border border-[#0055FF]/20 rounded-2xl">
              <Mail className="text-[#0055FF] w-6 h-6" />
              <div>
                <div className="text-[10px] font-bold text-white/20 uppercase tracking-widest text-left">Official Support Email</div>
                <div className="text-xl font-bold text-white tracking-tight">info@orbitwealthpro.com</div>
              </div>
            </div>
          </div>
          <p className="text-sm opacity-40 pt-4">
            We typically respond to all inquiries within 24-48 business hours.
          </p>
        </section>
      </div>

      <div className="p-8 bg-[#0055FF]/5 rounded-2xl border border-[#0055FF]/10 text-center">
        <p className="text-xs italic text-white/40">
          "Connecting users with financial precision, one email at a time."
        </p>
      </div>
    </div>
  );
}
