import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  BarChart3, 
  Home, 
  Settings, 
  Calculator, 
  CreditCard, 
  TrendingUp, 
  Landmark, 
  Globe, 
  ChevronRight,
  ShieldCheck,
  MessageSquare,
  Percent,
  Coins,
  ArrowRightLeft,
  UserCheck,
  PieChart,
  Gift,
  RefreshCcw
} from 'lucide-react';
import { useLocale, CurrencyCode, NumberSystem } from '../context/LocaleContext';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const NAV_ITEMS = [
  { icon: Home, label: 'Dashboard', path: '/' },
  { 
    label: 'Investment', 
    items: [
      { label: 'SIP Calculator', path: '/calculators/sip', icon: TrendingUp },
      { label: 'Retirement', path: '/calculators/retirement', icon: Coins },
      { label: 'Lumpsum', path: '/calculators/lumpsum', icon: BarChart3 },
      { label: 'Mutual Fund', path: '/calculators/mutual-fund', icon: PieChart }
    ]
  },
  { 
    label: 'Loans', 
    items: [
      { label: 'Mortgage / Home', path: '/calculators/mortgage', icon: Landmark },
      { label: 'EMI Global', path: '/calculators/emi', icon: CreditCard },
      { label: 'Loan Eligibility', path: '/calculators/eligibility', icon: UserCheck },
      { label: 'Balance Transfer', path: '/calculators/balance-transfer', icon: ArrowRightLeft }
    ]
  },
  { 
    label: 'Compliance & More', 
    items: [
      { label: 'Tax / VAT / GST', path: '/calculators/tax', icon: Percent },
      { label: 'Gratuity', path: '/calculators/gratuity', icon: Gift },
      { label: 'Currency', path: '/calculators/currency', icon: RefreshCcw }
    ]
  }
];

export default function Sidebar() {
  const { currency, setCurrency, numberSystem, setNumberSystem } = useLocale();

  return (
    <aside className="w-64 bg-[#0a0a0a] border-r border-white/5 h-screen flex flex-col fixed left-0 top-0 z-50">
      <div className="p-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#0055FF] rounded-lg flex items-center justify-center">
            <ShieldCheck className="text-white w-5 h-5" />
          </div>
          <span className="font-bold text-xl tracking-tighter text-white uppercase">ORBIT WEALTH <span className="text-white/40">PRO</span></span>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-4 space-y-6 py-4">
        {NAV_ITEMS.map((section, idx) => (
          <div key={idx} className="space-y-1">
            {section.label && !section.path && (
              <h3 className="px-2 text-[10px] font-bold text-white/20 uppercase tracking-[0.2em] mb-2">{section.label}</h3>
            )}
            {section.path ? (
              <NavLink
                to={section.path}
                className={({ isActive }) => cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all",
                  isActive ? "bg-white/5 text-[#0055FF]" : "text-white/40 hover:text-white hover:bg-white/[0.02]"
                )}
              >
                <section.icon className="w-4 h-4" />
                {section.label}
              </NavLink>
            ) : (
              section.items?.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) => cn(
                    "flex items-center justify-between group px-3 py-2 rounded-lg text-sm transition-all",
                    isActive ? "bg-white/5 text-[#0055FF]" : "text-white/40 hover:text-white hover:bg-white/[0.02]"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="w-4 h-4" />
                    {item.label}
                  </div>
                  <ChevronRight className="w-3 h-3 text-white/10 group-hover:text-white/40 transition-colors" />
                </NavLink>
              ))
            )}
          </div>
        ))}
      </nav>

      <div className="p-4 mt-auto border-t border-white/5 bg-black/20">
        <div className="space-y-4">
          <div>
            <label className="text-[10px] font-bold text-white/20 uppercase block mb-2">Currency</label>
            <div className="grid grid-cols-5 gap-1">
              {(['USD', 'EUR', 'GBP', 'AED', 'INR'] as CurrencyCode[]).map((c) => (
                <button
                  key={c}
                  onClick={() => setCurrency(c)}
                  className={cn(
                    "h-6 rounded text-[10px] font-bold transition-all",
                    currency === c ? "bg-[#0055FF] text-white" : "bg-white/5 text-white/40 hover:bg-white/10"
                  )}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-[10px] font-bold text-white/20 uppercase block mb-2">Number System</label>
            <div className="flex gap-1 p-1 bg-white/5 rounded-lg">
              {(['International', 'Indian'] as NumberSystem[]).map((s) => (
                <button
                  key={s}
                  onClick={() => setNumberSystem(s)}
                  className={cn(
                    "flex-1 h-6 rounded text-[10px] font-bold transition-all",
                    numberSystem === s ? "bg-white/10 text-white" : "text-white/20 hover:text-white/40"
                  )}
                >
                  {s === 'International' ? 'INT' : 'IND'}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
