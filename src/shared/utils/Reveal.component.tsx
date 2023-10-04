'use client';

import { motion } from 'framer-motion';
import React from 'react';

interface Props {
  children: React.ReactNode;
  index?: number;
}

/**
 * Révèle un élément lorsqu'il est visible à l'écran
 * @param children Element à afficher
 * @param index Index de l'élément dans la liste
 */
export default function Reveal({ children, index }: Props) {
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
      className="w-fit"
      variants={fadeIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {children}
    </motion.div>
  );
}
