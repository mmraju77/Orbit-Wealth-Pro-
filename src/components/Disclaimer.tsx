/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { AlertTriangle } from 'lucide-react';

export default function Disclaimer() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-3xl mx-auto px-10 py-20"
    >
      <div className="editorial-label mb-4">RISK DISCLOSURE</div>
      <h1 className="text-4xl font-extrabold tracking-tighter mb-12 flex items-center gap-4">
        Disclaimer
        <AlertTriangle className="w-8 h-8 text-[#0055FF]" />
      </h1>
      
      <div className="space-y-12 text-white/70 leading-relaxed font-light">
        <section className="bg-white/5 p-8 rounded border border-white/5">
          <h2 className="text-white font-bold text-sm uppercase tracking-widest mb-4">Not Financial Advice</h2>
          <p>
            The content provided by Orbit Wealth Pro, including all calculations, projections, and reports, is for informational and educational purposes only. It does not constitute financial, investment, legal, or tax advice. You should consult with a qualified professional before making any financial decisions.
          </p>
        </section>

        <section>
          <h2 className="text-white font-bold text-sm uppercase tracking-widest mb-4">Estimation Accuracy</h2>
          <p>
            Calculations are based on mathematical models and user-provided inputs. While we strive for precision, actual financial outcomes depend on numerous variables beyond the scope of these tools, including market volatility, legislative changes, and bank-specific fee structures.
          </p>
        </section>

        <section>
          <h2 className="text-white font-bold text-sm uppercase tracking-widest mb-4">Third-Party Data</h2>
          <p>
            Currency exchange rates and market reference data are provided for convenience and may be subject to delays or inaccuracies. Orbit Wealth Pro assumes no liability for losses incurred based on the use of this information.
          </p>
        </section>
      </div>
    </motion.div>
  );
}
