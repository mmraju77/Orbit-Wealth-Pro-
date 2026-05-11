import React from 'react';
import { Link } from 'react-router-dom';
import { 
  TrendingUp, 
  Coins, 
  BarChart3, 
  Landmark, 
  CreditCard, 
  Percent, 
  BadgeInfo,
  ArrowRight,
  PieChart,
  UserCheck,
  ArrowRightLeft,
  Gift,
  RefreshCcw
} from 'lucide-react';
import { motion } from 'motion/react';

const CALCULATOR_CARDS = [
  {
    title: 'SIP Calculator',
    description: 'Calculate maturity value of Systematic Investment Plans (SIP) based on monthly contributions.',
    path: '/calculators/sip',
    icon: TrendingUp,
    color: 'bg-blue-500/10 text-blue-500',
    category: 'Investments'
  },
  {
    title: 'Retirement Planner',
    description: 'Estimate your retirement corpus based on current age, savings, and future goals.',
    path: '/calculators/retirement',
    icon: Coins,
    color: 'bg-purple-500/10 text-purple-500',
    category: 'Investments'
  },
  {
    title: 'Mortgage / Home Loan',
    description: 'Determine monthly payments and view comprehensive amortization schedules.',
    path: '/calculators/mortgage',
    icon: Landmark,
    color: 'bg-emerald-500/10 text-emerald-500',
    category: 'Lending'
  },
  {
    title: 'Tax & VAT / GST',
    description: 'Calculate income tax, VAT, or GST based on regional logic for global jurisdictions.',
    path: '/calculators/tax',
    icon: Percent,
    color: 'bg-orange-500/10 text-orange-500',
    category: 'Compliance'
  },
  {
    title: 'Lumpsum Return',
    description: 'Project the future value of a one-time lump sum investment using compound logic.',
    path: '/calculators/lumpsum',
    icon: BarChart3,
    color: 'bg-indigo-500/10 text-indigo-500',
    category: 'Investments'
  },
  {
    title: 'EMI Calculator',
    description: 'Universal Equated Monthly Installment (EMI) tool for any type of loan.',
    path: '/calculators/emi',
    icon: CreditCard,
    color: 'bg-rose-500/10 text-rose-500',
    category: 'Lending'
  },
  {
    title: 'Mutual Fund Return',
    description: 'Calculate the absolute and annualised returns of your mutual fund investments.',
    path: '/calculators/mutual-fund',
    icon: PieChart,
    color: 'bg-cyan-500/10 text-cyan-500',
    category: 'Investments'
  },
  {
    title: 'Loan Eligibility',
    description: 'Check how much loan you can get based on your income and existing debts.',
    path: '/calculators/eligibility',
    icon: UserCheck,
    color: 'bg-amber-500/10 text-amber-500',
    category: 'Lending'
  },
  {
    title: 'Home Loan Transfer',
    description: 'Calculate savings on your home loan interest by switching to a lower rate.',
    path: '/calculators/balance-transfer',
    icon: ArrowRightLeft,
    color: 'bg-fuchsia-500/10 text-fuchsia-500',
    category: 'Lending'
  },
  {
    title: 'Gratuity Calculator',
    description: 'Calculate your gratuity amount based on years of service and final salary.',
    path: '/calculators/gratuity',
    icon: Gift,
    color: 'bg-sky-500/10 text-sky-500',
    category: 'Compliance'
  },
  {
    title: 'Currency Converter',
    description: 'Live forex conversion for major global currency pairs with historical charts.',
    path: '/calculators/currency',
    icon: RefreshCcw,
    color: 'bg-lime-500/10 text-lime-500',
    category: 'Forex'
  }
];

export default function Dashboard() {
  return (
    <div className="space-y-12">
      <header>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-[10px] font-bold text-[#0055FF] uppercase tracking-[0.2em] bg-[#0055FF]/10 px-2 py-1 rounded">Global Fintech Engine</span>
        </div>
        <h1 className="text-5xl font-bold text-white tracking-tighter mb-4">Financial Dashboard</h1>
        <p className="text-white/40 max-w-2xl leading-relaxed">
          Welcome to Orbit Wealth Pro. Access world-class financial planning tools with multi-jurisdiction 
          tax logic, regional number systems, and real-time computation engines.
        </p>
      </header>

      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-bold text-white tracking-tight">Available Tools</h2>
          <div className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Showing {CALCULATOR_CARDS.length} Calculators</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {CALCULATOR_CARDS.map((card, idx) => (
            <motion.div
              key={card.path}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
            >
              <Link 
                to={card.path}
                className="group block p-6 bg-white/[0.03] border border-white/5 rounded-2xl hover:bg-white/[0.05] hover:border-[#0055FF]/30 transition-all h-full"
              >
                <div className="flex items-start justify-between mb-8">
                  <div className={`p-3 rounded-xl ${card.color}`}>
                    <card.icon className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest bg-white/5 px-2 py-1 rounded">{card.category}</span>
                </div>
                
                <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2 group-hover:text-[#0055FF] transition-colors">
                  {card.title}
                  <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </h3>
                <p className="text-sm text-white/40 leading-relaxed">
                  {card.description}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="bg-[#0055FF]/5 border border-[#0055FF]/10 rounded-2xl p-8 flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-4">
            <BadgeInfo className="text-[#0055FF] w-5 h-5" />
            <span className="font-bold text-white">Programmatic SEO Framework</span>
          </div>
          <p className="text-white/40 text-sm leading-relaxed max-w-xl">
            Orbit Wealth Pro uses a standardized calculation engine to provide accurate results across 5 major 
            jurisdictions. Our reports are fully downloadable and optimized for global compliance standards.
          </p>
        </div>
        <div className="flex gap-4">
           {/* Placeholder for stats or something fun */}
           <div className="text-center">
             <div className="text-2xl font-bold text-white tracking-tighter">100%</div>
             <div className="text-[10px] text-white/40 uppercase font-bold tracking-widest">Accuracy</div>
           </div>
           <div className="w-px h-10 bg-white/10 self-center"></div>
           <div className="text-center">
             <div className="text-2xl font-bold text-white tracking-tighter">Instant</div>
             <div className="text-[10px] text-white/40 uppercase font-bold tracking-widest">Latency</div>
           </div>
        </div>
      </section>
    </div>
  );
}
