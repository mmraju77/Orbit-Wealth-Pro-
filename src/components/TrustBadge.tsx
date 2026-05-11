/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

interface TrustBadgeProps {
  setView: (view: 'MORTGAGE' | 'RETIREMENT' | 'TAX' | 'PRIVACY' | 'DISCLAIMER' | 'CONTACT') => void;
  activeView: string;
}

export default function TrustBadge({ setView, activeView }: TrustBadgeProps) {
  return (
    <footer className="px-10 py-12 border-t border-white/10 bg-[#0A0A0A]">
      <div className="flex flex-col lg:flex-row justify-between items-start gap-12 mb-12">
        <div className="flex items-center gap-12 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded border border-white/20 flex items-center justify-center font-bold text-[10px] text-white/40 italic">FDIC</div>
            <p className="text-[9px] uppercase tracking-[0.2em] text-white/30 leading-tight max-w-[150px] font-bold">
              Insured Institutional Assets Under Management
            </p>
          </div>
          <div className="hidden lg:block h-6 w-px bg-white/10"></div>
          <p className="text-[9px] text-white/20 max-w-[400px] italic leading-relaxed">
            *Calculations are estimates based on standard amortization formulas. Terms and actual APR may vary by lender and individual credit profile. Orbit Wealth Pro is an analytical platform, not a direct lending institution.
          </p>
        </div>
        <div className="text-[10px] font-bold tracking-[0.3em] text-white/10 text-right shrink-0 uppercase">
          SECURED BY ORBIT ARCHITECTURE v2.4
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 gap-6">
        <div className="flex gap-8 text-[10px] font-bold tracking-widest text-white/30 uppercase">
          <button 
            onClick={() => setView('PRIVACY')}
            className={`hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#0055FF] rounded px-1 ${activeView === 'PRIVACY' ? 'text-white' : ''}`}
            aria-current={activeView === 'PRIVACY' ? 'page' : undefined}
          >
            Privacy Policy
          </button>
          <button 
            onClick={() => setView('DISCLAIMER')}
            className={`hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#0055FF] rounded px-1 ${activeView === 'DISCLAIMER' ? 'text-white' : ''}`}
            aria-current={activeView === 'DISCLAIMER' ? 'page' : undefined}
          >
            Legal Disclaimer
          </button>
          <button 
            onClick={() => setView('CONTACT')}
            className={`hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#0055FF] rounded px-1 ${activeView === 'CONTACT' ? 'text-white' : ''}`}
            aria-current={activeView === 'CONTACT' ? 'page' : undefined}
          >
            Contact Us
          </button>
        </div>
        <div className="text-[10px] text-white/10 font-bold tracking-[0.2em]">
          &copy; 2026 ORBIT WEALTH PRO. ALL RIGHTS RESERVED.
        </div>
      </div>
    </footer>
  );
}
