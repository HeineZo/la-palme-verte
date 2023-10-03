'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

interface HoverSelectProps {
  children: JSX.Element | JSX.Element[];
}

/**
 * Surligne l'élément passé en tant que `children` lorsque l'on passe sa souris dessus
 */
export default function HoverSelect({ children }: HoverSelectProps) {
  const [isHovering, setIsHovering] = useState(false);

  /**
   * Lorsque la souris entre dans l'élément
   */
  const handleOnMouseEnter = () => {
    setIsHovering(true);
  };

  /**
   * Lorsque la souris quitte l'élément
   */
  const handleOnMouseLeave = () => {
    setIsHovering(false);
  };

  return (
    <div
      className="w-fit h-fit relative p-6"
      onMouseEnter={handleOnMouseEnter}
      onMouseLeave={handleOnMouseLeave}
    >
      {isHovering && (
        <motion.span
          layoutId="hover-select"
          className="absolute inset-0 -z-10 bg-highlight ring-2 ring-primary rounded-medium"
          transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
        />
      )}

      {children}
    </div>
  );
}
