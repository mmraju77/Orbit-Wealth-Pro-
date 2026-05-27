/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface NumericInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
  value: number;
  onChange: (val: number) => void;
  className?: string;
  wrapperClassName?: string;
}

/**
 * A robust numeric input component that handles leading zeros, 
 * sticky zeros, and automatic selection on focus.
 */
const NumericInput: React.FC<NumericInputProps> = ({ 
  value, 
  onChange, 
  className = "", 
  wrapperClassName = "",
  ...props 
}) => {
  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    // Zero-delay timeout bypasses browser race conditions for selection
    const target = e.target;
    setTimeout(() => target.select(), 0);
    if (props.onFocus) props.onFocus(e);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    // Strict number parsing: empty string defaults to 0, otherwise native Number()
    const numValue = rawValue === '' ? 0 : Number(rawValue);
    
    // Prevent NaN if somehow a non-number slips through
    if (!isNaN(numValue)) {
      onChange(numValue);
    }
  };

  return (
    <div className={wrapperClassName}>
      <input
        {...props}
        type="number"
        // Force the rendered value to strip leading zeros via String(Number())
        value={String(Number(value || 0))}
        onFocus={handleFocus}
        onChange={handleChange}
        className={className}
      />
    </div>
  );
};

export default NumericInput;
