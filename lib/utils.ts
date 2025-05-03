import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useMemo } from 'react';

/**
 * Combines and merges CSS classes with Tailwind support
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Type-safe object memoization hook
 * 
 * Use this to prevent unnecessary re-renders when passing objects to child components
 */
export function useMemoObject<T extends Record<string, any>>(obj: T): T {
  return useMemo(() => obj, Object.values(obj));
}

/**
 * Type-safe function memoization hook
 * 
 * Use this to prevent unnecessary re-renders when passing functions to child components
 * @param fn The function to memoize
 * @param deps The dependencies array
 */
export function useMemoFn<T extends (...args: any[]) => any>(
  fn: T,
  deps: React.DependencyList
): T {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(() => fn, deps);
}

/**
 * Creates a throttled function that only runs once within the specified timeout period
 * 
 * Use this for performance-sensitive event handlers like scroll, resize, etc.
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  timeFrame: number
): (...args: Parameters<T>) => void {
  let lastTime = 0;
  let throttleTimeout: NodeJS.Timeout | undefined;

  return function (this: any, ...args: Parameters<T>) {
    const context = this;
    const now = Date.now();

    if (now - lastTime >= timeFrame) {
      if (throttleTimeout) {
        clearTimeout(throttleTimeout);
        throttleTimeout = undefined;
      }
      
      func.apply(context, args);
      lastTime = now;
    } else if (!throttleTimeout) {
      throttleTimeout = setTimeout(() => {
        lastTime = Date.now();
        throttleTimeout = undefined;
        func.apply(context, args);
      }, timeFrame - (now - lastTime));
    }
  };
}

/**
 * Creates a debounced function that delays execution until after wait milliseconds
 * 
 * Use this for performance-sensitive event handlers like search input, etc.
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | undefined;

  return function (this: any, ...args: Parameters<T>) {
    const context = this;
    
    if (timeout) {
      clearTimeout(timeout);
    }
    
    timeout = setTimeout(() => {
      func.apply(context, args);
    }, wait);
  };
}
