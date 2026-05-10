/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useLocale, CurrencyCode } from '@/src/context/LocaleContext';
import { Globe } from 'lucide-react';

export default function LocaleBar() {
  const { currency, setCurrency } = useLocale();

  const currencies: CurrencyCode[] = ['USD', 'GBP', 'EUR', 'AUD', 'CAD', 'INR'];

  return (
    <div className="bg-[#0f0f0f] border-b border-white/5 py-2 px-10 flex items-center justify-between">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 text-[10px] font-bold tracking-widest text-[#0055FF]">
          <Globe className="w-3 h-3" />
          <span>GLOBAL LOCALE SETTINGS</span>
        </div>
        
        <div className="h-3 w-px bg-white/10"></div>
        
        <div className="flex items-center gap-4">
          <span className="text-[10px] text-white/30 font-bold uppercase tracking-wider">Currency</span>
          <select 
            value={currency}
            onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
            className="bg-transparent text-[10px] text-white font-bold uppercase tracking-widest outline-none cursor-pointer hover:text-[#0055FF] transition-colors"
          >
            {currencies.map(c => (
              <option key={c} value={c} className="bg-[#0A0A0A]">{c}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="hidden md:flex items-center gap-4 text-[9px] font-bold tracking-widest text-white/20 uppercase">
        <span>Region: International (v2.0)</span>
        <div className="w-1 h-1 rounded-full bg-green-500/40"></div>
        <span>Live Exchange Rates Enabled</span>
      </div>
    </div>
  );
}
