'use client';

import useIsVisible from '@/hook/useIsVisible.hook';
import { cn } from '@nextui-org/react';
import { MotionValue, motion, useSpring, useTransform } from 'framer-motion';
import React, { useEffect, useRef } from 'react';

const fontSize = 30;
const padding = 15;
const height = fontSize + padding;

type CounterProps = {
  value: number;
  fontStyle?: React.ComponentProps<'h1'>['className'];
  className?: React.ComponentProps<'div'>['className'];
  prefix?: string;
  suffix?: string;
};

/**
 * Affiche un compteur de chiffre animé
 * @param value Valeur à afficher
 * @param className Style à ajouter au compteur
 * @param fontStyle Style à ajouter aux chiffres du compteur
 * @param prefix Texte à afficher avant le compteur
 * @param suffix Texte à afficher après le compteur
 */
export default function Counter({
  value,
  className,
  fontStyle,
  suffix,
  prefix,
}: CounterProps) {
  const ref = useRef(null);
  const isVisible = useIsVisible(ref);

  /**
   * Affiche les chiffres du compteur
   * @returns Chiffres du compteur à afficher
   */
  const displayNumbers = () => {
    const ret: React.ReactNode[] = [];
    for (let i = 1; i <= value; i *= 10) {
      ret.push(
        <Digit
          place={i}
          key={i}
          value={isVisible ? value : 0}
          className={fontStyle}
        />,
      );
    }
    return ret.reverse();
  };

  return (
    <div
      ref={ref}
      style={{ fontSize }}
      className={cn('flex overflow-hidden rounded', className)}
    >
      <small>{prefix}</small>
      {displayNumbers()}
      <small>{suffix}</small>
    </div>
  );
}

type DigitProps = {
  place: number;
  value: number;
  className?: React.ComponentProps<'h1'>['className'];
};

/**
 * Créer une case pour afficher un chiffre dans le compteur
 * @param place Ordre de grandeur du chiffre à afficher (centaine, dizaine, unité)
 * @param value Valeur à afficher
 * @param className Style à ajouter à la case
 */
function Digit({ place, value, className }: DigitProps) {
  const valueRoundedToPlace = Math.floor(value / place);
  const animatedValue = useSpring(valueRoundedToPlace);

  useEffect(() => {
    animatedValue.set(valueRoundedToPlace);
  }, [animatedValue, valueRoundedToPlace]);

  return (
    <div
      style={{ height }}
      className={cn('relative w-[1ch] tabular-nums', className)}
    >
      {Array.from({ length: 10 }, (_, i) => (
        <Number key={i} mv={animatedValue} number={i} />
      ))}
    </div>
  );
}

type NumberProps = {
  mv: MotionValue;
  number: number;
};

/**
 * Affiche un chiffre dans le compteur
 * @param mv Valeur du chiffre à animer
 * @param number Chiffre à afficher
 */
function Number({ mv, number }: NumberProps) {
  const y = useTransform(mv, (latest) => {
    const placeValue = latest % 10;
    const offset = (10 + number - placeValue) % 10;

    let memo = offset * height;

    if (offset > 5) {
      memo -= 10 * height;
    }

    return memo;
  });

  return (
    <motion.span
      style={{ y }}
      className="absolute inset-0 flex items-center justify-center"
    >
      {number}
    </motion.span>
  );
}
