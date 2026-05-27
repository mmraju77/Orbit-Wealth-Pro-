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
    // Zero-delay timeout ensures the focus event is fully processed before selection
    const target = e.target;
    setTimeout(() => target.select(), 0);
    if (props.onFocus) props.onFocus(e);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    // Strip leading zeros while allowing for '0' as a single digit
    const cleanVal = rawValue === '' ? '' : rawValue.replace(/^0+(?!$)/, '');
    
    const numValue = cleanVal === '' ? 0 : Number(cleanVal);
    if (!isNaN(numValue)) {
      onChange(numValue);
    }
  };

  const displayValue = String(value);
  const formattedValue = displayValue.startsWith('0') && displayValue.length > 1 
    ? displayValue.replace(/^0+/, '') 
    : displayValue;

  return (
    <div className={wrapperClassName}>
      <input
        {...props}
        type="number"
        value={value === 0 && props.placeholder ? '' : formattedValue}
        onFocus={handleFocus}
        onChange={handleChange}
        className={className}
      />
    </div>
  );
};

export default NumericInput;
