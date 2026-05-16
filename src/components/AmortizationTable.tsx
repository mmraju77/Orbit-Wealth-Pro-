/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AmortizationPeriod } from '@/src/types';
import { motion } from 'motion/react';
import { useLocale } from '@/src/context/LocaleContext';

interface AmortizationTableProps {
  schedule: AmortizationPeriod[];
}

export default function AmortizationTable({ schedule }: AmortizationTableProps) {
  const { formatCurrency } = useLocale();

  return (
    <div className="w-full">
      <table className="w-full text-left">
        <thead>
          <tr className="text-[10px] uppercase tracking-widest text-white/20 border-b border-white/5">
            <th className="py-3 font-medium">Period</th>
            <th className="py-3 font-medium text-right transition-colors">Principal</th>
            <th className="py-3 font-medium text-right">Interest</th>
            <th className="py-3 font-medium text-right text-white/40">Total Interest</th>
            <th className="py-3 font-medium text-right text-[#D4AF37]">Balance</th>
          </tr>
        </thead>
        <tbody className="text-[13px] font-light tabular-nums divide-y divide-white/5">
          {schedule.filter((_, i) => i % 12 === 0 || i === schedule.length - 1).map((period, i) => (
            <motion.tr 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 + (i * 0.02) }}
              key={period.period} 
              className="group hover:bg-white/[0.02] transition-colors"
            >
              <td className="py-3 text-white/40">Year {Math.floor(period.period / 12) + 1}</td>
              <td className="py-3 text-right">{formatCurrency(period.principal)}</td>
              <td className="py-3 text-right">{formatCurrency(period.interest)}</td>
              <td className="py-3 text-right text-white/30">{formatCurrency(period.totalInterestPaid)}</td>
              <td className="py-3 text-right text-[#D4AF37] font-medium">{formatCurrency(period.remainingBalance)}</td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
