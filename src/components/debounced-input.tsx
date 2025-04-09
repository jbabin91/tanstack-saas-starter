import { useEffect, useLayoutEffect, useRef, useState } from 'react';

import { Input, type InputProps } from '@/components/ui/input'; // Use the shadcn Input

// Infer props type

// A debounced input react component
export function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: {
  value: string | number;
  onChange: (value: string | number) => void;
  debounce?: number;
} & Omit<InputProps, 'onChange'>) {
  // Extend InputProps from shadcn/ui
  // Use a ref to track the previous initialValue and current value
  const prevInitialValueRef = useRef(initialValue);
  const valueRef = useRef<string | number>(initialValue);

  // Initialize state with initialValue
  const [value, setValue] = useState(initialValue);

  // Synchronize the value with initialValue when it changes
  // This is a custom hook that doesn't directly call setValue in useEffect
  useLayoutEffect(() => {
    // Only update if initialValue has changed from previous render
    if (prevInitialValueRef.current !== initialValue) {
      prevInitialValueRef.current = initialValue;

      // Only update state if the current value is different
      if (valueRef.current !== initialValue) {
        setValue(initialValue);
      }
    }
  }, [initialValue]);

  // Keep valueRef in sync with value
  useEffect(() => {
    valueRef.current = value;
  }, [value]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value, debounce, onChange]); // Added dependencies

  return (
    <Input
      {...props}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}
