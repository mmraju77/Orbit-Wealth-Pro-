/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import NumericInput from './NumericInput';
import { useLocale } from '../context/LocaleContext';

interface CurrencyInputProps {
  label: string;
  value: number;
  onChange: (val: number) => void;
  min?: number;
  max?: number;
  step?: number;
  showSlider?: boolean;
  description?: string;
  placeholder?: string;
}

export default function CurrencyInput({ 
  label, 
  value, 
  onChange, 
  min = 0, 
  max = 10000000, 
  step = 1000,
  showSlider = true,
  description,
  placeholder
}: CurrencyInputProps) {
  const { currencySymbol, formatCurrency } = useLocale();

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <label className="text-xs font-bold text-slate-300 uppercase tracking-widest">{label}</label>
        <div className="text-lg font-bold text-white tracking-tighter">{formatCurrency(value)}</div>
      </div>
      
      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#D4AF37] font-bold z-10 pointer-events-none">{currencySymbol}</div>
        <NumericInput 
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          aria-label={label}
          className="w-full bg-black/40 border border-white/5 rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:border-[#D4AF37] transition-all font-bold"
        />
      </div>

      {description && <p className="text-sm text-white/50 px-2 italic">{description}</p>}

      {showSlider && (
        <input 
          aria-label="Adjust value" type="range" min={min} max={max} step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full accent-[#D4AF37]"
          aria-label={`Adjust ${label}`}
        />
      )}
    </div>
  );
}
