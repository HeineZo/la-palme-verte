'use client';

import { useState, useEffect } from 'react';

/**
 * Détermine si l'élément passé en ref est visible ou non
 * @param ref Elément à observer
 * @returns True si l'élément est visible, false sinon
 */
export default function useIsVisible(ref: React.RefObject<HTMLElement>) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref]);

  return isVisible;
}
