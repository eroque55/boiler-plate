import { useEffect, useState, useCallback } from 'react';

export const useDebounce = <T,>(value: T, delay = 1000) => {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  useEffect(
    () => {
      // Update debounced value after delay
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);
      // Cancel the timeout if value changes (also on delay change or unmount)
      // This is how we prevent debounced value from updating if value is changed ...
      // .. within the delay period. Timeout gets cleared and restarted.
      return () => {
        clearTimeout(handler);
      };
    },
    [value, delay], // Only re-call effect if value or delay changes
  );
  return debouncedValue;
};

export const useDisableDelay = (delay = 1000) => {
  const [isLoading, setIsLoading] = useState(false);

  const executeWithDelay = useCallback(
    async (func: () => void | Promise<void>) => {
      if (isLoading) {
        return;
      }

      setIsLoading(true);
      try {
        await func();
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, delay);
      }
    },
    [isLoading, delay],
  );

  return { executeWithDelay, isLoading };
};
