import { useCallback, useRef, useState } from "react";

export const useSubmitLock = () => {
  const lockRef = useRef(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const tryLock = useCallback(() => {
    if (lockRef.current) {
      return false;
    }
    lockRef.current = true;
    setIsSubmitting(true);
    return true;
  }, []);

  const unlock = useCallback(() => {
    lockRef.current = false;
    setIsSubmitting(false);
  }, []);

  const run = useCallback(
    async (fn: () => Promise<void>) => {
      if (!tryLock()) {
        return;
      }
      try {
        await fn();
      } finally {
        unlock();
      }
    },
    [tryLock, unlock]
  );

  return { isSubmitting, run, tryLock, unlock };
};
