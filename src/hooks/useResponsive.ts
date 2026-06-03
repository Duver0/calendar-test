import { useState, useEffect } from 'react';
import { DESKTOP_BREAKPOINT, WIDE_BREAKPOINT } from '@/constants';

export function useResponsive() {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    setWidth(window.innerWidth);

    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return {
    width,
    isDesktop: width >= DESKTOP_BREAKPOINT,
    isWide: width >= WIDE_BREAKPOINT,
  };
}
