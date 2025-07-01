import {
  useCallback,
  useState,
} from 'react';

export const useDisableDelay = (delay = 1000) => {
  const [isLoading, setIsLoading] = useState(false);

  const executeWithDelay = useCallback(
    async (func: () => void | Promise<void>) => {
      if (isLoading) {
        return;
      }

      setIsLoading(true);
      await func();

      setTimeout(() => {
        setIsLoading(false);
      }, delay);
    },
    [isLoading, delay],
  );

  return { executeWithDelay, isLoading };
};
