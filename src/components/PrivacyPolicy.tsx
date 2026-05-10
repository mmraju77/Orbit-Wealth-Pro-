/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';

export default function PrivacyPolicy() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-3xl mx-auto px-10 py-20"
    >
      <div className="editorial-label mb-4">LEGAL FRAMEWORK</div>
      <h1 className="text-4xl font-extrabold tracking-tighter mb-12">Privacy Policy</h1>
      
      <div className="space-y-12 text-white/70 leading-relaxed font-light">
        <section>
          <h2 className="text-white font-bold text-sm uppercase tracking-widest mb-4">01 — Data Sovereignty</h2>
          <p>
            Orbit Wealth Pro operates on a "Zero-Knowledge" principle. All financial calculations, inputs, and projections are processed locally within your browser. We do not transmit your financial data to our servers, nor do we store any of your inputs in a persistent database.
          </p>
        </section>

        <section>
          <h2 className="text-white font-bold text-sm uppercase tracking-widest mb-4">02 — Information Collection</h2>
          <p>
            We do not require account creation, email registration, or any form of personal identification to use our suite of calculators. Your anonymity is maintained by default.
          </p>
        </section>

        <section>
          <h2 className="text-white font-bold text-sm uppercase tracking-widest mb-4">03 — Local Storage & Cookies</h2>
          <p>
            We may use minimal local storage to remember your currency preferences (via the Global Locale Bar) to provide a consistent experience across sessions. This data never leaves your device.
          </p>
        </section>

        <section>
          <div className="pt-8 border-t border-white/10 uppercase text-[10px] tracking-widest font-bold">
            Last Updated: May 2026
          </div>
        </section>
      </div>
    </motion.div>
  );
}
