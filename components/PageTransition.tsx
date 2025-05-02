'use client';

import { ReactNode, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

interface PageTransitionProps {
  children: ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const [isFirstMount, setIsFirstMount] = useState(true);

  // Only animate after the initial mount
  useEffect(() => {
    if (isFirstMount) setIsFirstMount(false);
  }, [isFirstMount]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={isFirstMount ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{
          type: 'spring',
          stiffness: 260,
          damping: 20,
          duration: 0.15
        }}
        className="w-full min-h-[calc(100vh-3.5rem)]"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
} 