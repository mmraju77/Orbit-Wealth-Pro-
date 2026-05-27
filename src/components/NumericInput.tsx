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
    // User logic: clean conversion to number, treating empty as 0
    const numValue = rawValue === '' ? 0 : Number(rawValue);
    if (!isNaN(numValue)) {
      onChange(numValue);
    }
  };

  return (
    <div className={wrapperClassName}>
      <input
        {...props}
        type="number"
        // Placeholder Trick: if 0, show empty string to let placeholder "0" appear
        value={value === 0 ? '' : value}
        placeholder={props.placeholder || "0"}
        onFocus={handleFocus}
        onChange={handleChange}
        className={className}
      />
    </div>
  );
};

export default NumericInput;
