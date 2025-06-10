'use client';

import { useState, useEffect, useCallback } from 'react';

const throttle = <T extends (...args: any[]) => void>(func: T, delay: number) => {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<T>) => {
    if (!timeoutId) {
      timeoutId = setTimeout(() => {
        func(...args);
        timeoutId = null;
      }, delay);
    }
  };
};

export const useScrollThreshold = (threshold = 20) => {
  const [isScrolled, setScrolled] = useState(false);

  const handleScroll = useCallback(() => {
    const scrollPosition = window.scrollY;
    setScrolled(scrollPosition > threshold);
  }, [threshold]);

  const throttledHandleScroll = useCallback(throttle(handleScroll, 100), [handleScroll]);

  useEffect(() => {
    window.addEventListener('scroll', throttledHandleScroll, { passive: true });

    handleScroll();

    return () => {
      window.removeEventListener('scroll', throttledHandleScroll);
    };
  }, [throttledHandleScroll, handleScroll]);

  return isScrolled;
};
