'use client';

import { cn } from '@nextui-org/react';
import { motion } from 'framer-motion';
import React from 'react';

interface RevealProps {
  children: React.ReactNode;
  index?: number;
  className?: React.ComponentProps<'div'>['className'];
}

/**
 * Révèle un élément lorsqu'il est visible à l'écran
 * @param children - Element à afficher
 * @param index - Index de l'élément dans la liste
 * @param className - Style à ajouter à l'élément
 */
export default function Reveal({ children, index, className }: RevealProps) {
  const fadeIn = {
    hidden: { opacity: 0, y: 100 },
    visible: () => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: index && index * 0.2,
      },
    }),
  };
  return (
    <motion.div
      className={cn('w-fit', className)}
      initial="hidden"
      variants={fadeIn}
      viewport={{ once: true }}
      whileInView="visible"
    >
      {children}
    </motion.div>
  );
}
