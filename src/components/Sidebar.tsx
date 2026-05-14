import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  Home, 
  TrendingUp, 
  BarChart3, 
  PieChart, 
  Landmark, 
  Coins, 
  CreditCard, 
  ArrowRightLeft, 
  UserCheck, 
  Percent, 
  ShieldCheck, 
  Gift, 
  Globe, 
  Mail, 
  ChevronRight, 
  ChevronDown,
  RefreshCcw,
  Wallet,
  Car,
  GraduationCap,
  Briefcase,
  Shield,
  Baby,
  Building,
  Target,
  Zap,
  Activity,
  Calculator
} from 'lucide-react';
import { useLocale, CurrencyCode, NumberSystem } from '../context/LocaleContext';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface NavItem {
  label: string;
  path: string;
  icon: any;
}

interface NavSection {
  label: string;
  icon: any;
  items: NavItem[];
}

const NAV_SECTIONS: NavSection[] = [
  {
    label: 'Wealth Management',
    icon: TrendingUp,
    items: [
      { label: 'SIP Manager', path: '/calculators/sip', icon: TrendingUp },
      { label: 'Lumpsum Growth', path: '/calculators/lumpsum', icon: BarChart3 },
      { label: 'Mutual Funds', path: '/calculators/mutual-fund', icon: PieChart },
      { label: 'Investment CAGR', path: '/calculators/cagr', icon: Target },
      { label: 'Dividend Yield', path: '/calculators/dividend-yield', icon: Coins },
      { label: 'FD & RD Plan', path: '/calculators/fd-rd', icon: Landmark },
    ]
  },
  {
    label: 'Debt & Credit',
    icon: Wallet,
    items: [
      { label: 'Debt Snowball', path: '/calculators/debt-snowball', icon: Zap },
      { label: 'Credit Card Payoff', path: '/calculators/credit-card-payoff', icon: CreditCard },
      { label: 'Mortgage / Home', path: '/calculators/mortgage', icon: Landmark },
      { label: 'Personal Loan', path: '/calculators/personal-loan', icon: Wallet },
      { label: 'Auto (Car) Loan', path: '/calculators/auto-loan', icon: Car },
      { label: 'Student Debt', path: '/calculators/student-loan', icon: GraduationCap },
      { label: 'Universal EMI', path: '/calculators/emi', icon: CreditCard },
    ]
  },
  {
    label: 'Insurance',
    icon: Shield,
    items: [
      { label: 'HLV Calculator', path: '/calculators/hlv', icon: Activity },
      { label: 'Term Life', path: '/calculators/term-insurance', icon: Shield },
      { label: 'Health Guard', path: '/calculators/health-insurance', icon: ShieldCheck }
    ]
  },
  {
    label: 'Business Finance',
    icon: Briefcase,
    items: [
       { label: 'Break-Even Analysis', path: '/calculators/break-even', icon: Target },
       { label: 'Rental ROI', path: '/calculators/rental-yield', icon: Building },
       { label: 'Gratuity', path: '/calculators/gratuity', icon: Gift },
    ]
  },
  {
    label: 'Global Taxes',
    icon: Globe,
    items: [
      { label: 'Income Tax', path: '/calculators/income-tax', icon: Percent },
      { label: 'GST / VAT', path: '/calculators/gst', icon: ShieldCheck },
      { label: 'Tax Guides', path: '/tax-guides', icon: Globe },
    ]
  }
];

export default function Sidebar() {
  const { currency, setCurrency, numberSystem, setNumberSystem } = useLocale();
  const location = useLocation();
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    'Wealth Management': true
  });

  const toggleSection = (label: string) => {
    setOpenSections(prev => ({ ...prev, [label]: !prev[label] }));
  };

  return (
    <aside className="w-64 bg-[#0a0a0a] border-r border-white/5 h-screen flex flex-col fixed left-0 top-0 z-50">
      <div className="p-8">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center">
            <ShieldCheck className="text-[#0055FF] w-4 h-4" />
          </div>
          <span className="font-display font-black text-xl tracking-tighter text-white uppercase group flex items-center gap-1">
            <span className="text-[#0055FF]">ORBIT</span>
            <span className="opacity-50">WEALTH</span>
            <span className="text-[#0055FF]">PRO</span>
          </span>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-6 space-y-4 py-4">
        <NavLink
          to="/"
          className={({ isActive }) => cn(
            "flex items-center gap-3 px-3 py-2 rounded-lg text-xs transition-all mb-4",
            isActive ? "bg-white/5 text-[#0055FF]" : "text-white/30 hover:text-white"
          )}
        >
          <Home className="w-4 h-4" />
          Dashboard
        </NavLink>

        {NAV_SECTIONS.map((section) => (
          <div key={section.label} className="space-y-1">
            <button 
              onClick={() => toggleSection(section.label)}
              className="w-full flex items-center justify-between px-3 py-2 text-[10px] font-bold text-white/20 uppercase tracking-[0.2em] hover:text-white/40 transition-colors"
            >
              <div className="flex items-center gap-3">
                <section.icon className="w-3.5 h-3.5" />
                {section.label}
              </div>
              {openSections[section.label] ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
            </button>
            
            {openSections[section.label] && (
              <div className="space-y-1 ml-4 border-l border-white/5 pl-2 mt-2">
                {section.items.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) => cn(
                      "flex items-center gap-3 px-3 py-1.5 rounded-lg text-xs transition-all",
                      isActive ? "text-[#0055FF] font-semibold" : "text-white/30 hover:text-white"
                    )}
                  >
                    <item.icon className="w-3 h-3 opacity-40" />
                    {item.label}
                  </NavLink>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      <div className="p-6 mt-auto border-t border-white/[0.03]">
        <div className="space-y-6">
          <div className="p-3 bg-white/[0.02] border border-white/[0.05] rounded-xl space-y-4">
            <div>
              <label className="text-[8px] font-bold text-white/20 uppercase tracking-widest block mb-2 px-1">Region</label>
              <div className="grid grid-cols-4 gap-1">
                {(['USD', 'EUR', 'GBP', 'INR', 'AUD', 'CAD', 'CHF', 'AED', 'NOK', 'SEK', 'DKK'] as CurrencyCode[]).map((c) => (
                  <button
                    key={c}
                    onClick={() => {
                      setCurrency(c);
                      if (c === 'INR') setNumberSystem('Indian');
                      else setNumberSystem('International');
                    }}
                    className={cn(
                      "h-5 rounded text-[8px] font-bold transition-all",
                      currency === c ? "bg-[#0055FF] text-white" : "bg-white/5 text-white/20 hover:bg-white/10"
                    )}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
