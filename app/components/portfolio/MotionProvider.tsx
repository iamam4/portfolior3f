'use client';

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react';

const MotionContext = createContext({ paused: true });

export function MotionProvider({ children }: { children: ReactNode }) {
  const [paused, setPaused] = useState(true);
  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setPaused(preference.matches);
    sync();
    preference.addEventListener('change', sync);
    return () => preference.removeEventListener('change', sync);
  }, []);
  useEffect(() => { document.documentElement.dataset.motion = paused ? 'paused' : 'active'; }, [paused]);
  return <MotionContext.Provider value={{ paused }}>{children}</MotionContext.Provider>;
}

export const useMotion = () => useContext(MotionContext);

export function useVisibleScene() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const { paused } = useMotion();
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { rootMargin: '80px' });
    if (ref.current) observer.observe(ref.current);
    const handleVisibility = () => setPageVisible(!document.hidden);
    handleVisibility();
    document.addEventListener('visibilitychange', handleVisibility);
    return () => { observer.disconnect(); document.removeEventListener('visibilitychange', handleVisibility); };
  }, []);
  return { ref, visible, active: visible && pageVisible && !paused };
}
