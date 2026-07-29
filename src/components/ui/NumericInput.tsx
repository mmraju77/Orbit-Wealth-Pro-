/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';

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
  const [internalStr, setInternalStr] = useState<string>(value.toString());
  const lastEmittedValue = useRef<number>(value);

  useEffect(() => {
    // If the external value changes and it differs from the last emitted value,
    // it means the parent updated the value programmatically (e.g. reset form, API load).
    // In this case, we sync our internal string state.
    if (value !== lastEmittedValue.current) {
      setInternalStr(value.toString());
      lastEmittedValue.current = value;
    }
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    setInternalStr(rawValue);
    
    // User logic: clean conversion to number, treating empty as 0
    const numValue = rawValue === '' ? 0 : Number(rawValue);
    if (!isNaN(numValue)) {
      lastEmittedValue.current = numValue;
      onChange(numValue);
    }
  };

  return (
    <div className={wrapperClassName}>
      <input
        {...props}
        type="number"
        value={internalStr}
        onChange={handleChange}
        className={className}
        aria-label={props['aria-label'] || "Numeric input"}
      />
    </div>
  );
};

export default NumericInput;
