'use client';

import { cn } from '@nextui-org/react';
import React, { useEffect, useState, useRef } from 'react';

interface InfiniteMovingCardsProps {
  row: JSX.Element[];
  direction?: 'left' | 'right';
  speed?: 'fast' | 'normal' | 'slow';
  className?: string;
}

/**
 * Composant permettant de faire défiler des éléments JSX à l'infini
 *
 * @param row JSX.Element[] : tableau d'éléments JSX à afficher, par exemple des <Avatar> ou des <MemberCard>
 * @param direction "left" | "right" : direction de défilement des éléments
 * @param speed "fast" | "normal" | "slow" : vitesse de défilement des éléments
 * @param className string : classes tailwind à ajouter
 */
export default function InfiniteMovingCards({
  row,
  direction = 'left',
  speed = 'fast',
  className,
}: InfiniteMovingCardsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLUListElement>(null);

  // procesus de démarrage de l'animation
  useEffect(() => {
    addAnimation();
  }, []);
  const [start, setStart] = useState(false);
  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }
  const getDirection = () => {
    if (containerRef.current) {
      if (direction === 'left') {
        containerRef.current.style.setProperty(
          '--animation-direction',
          'forwards',
        );
      } else {
        containerRef.current.style.setProperty(
          '--animation-direction',
          'reverse',
        );
      }
    }
  };

  // fonction pour définir la vitesse de défilement en fonction de la pops speed passé en paramètre
  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === 'fast') {
        containerRef.current.style.setProperty('--animation-duration', '20s');
      } else if (speed === 'normal') {
        containerRef.current.style.setProperty('--animation-duration', '40s');
      } else {
        containerRef.current.style.setProperty('--animation-duration', '120s');
      }
    }
  };
  return (
    <div
      ref={containerRef}
      className={cn(
        'scroller relative z-20 overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]',
        className,
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          ' flex min-w-full shrink-0 gap-12 py-4 w-max flex-nowrap',
          start && 'animate-scroll ',
        )}
      >
        <div className="flex gap-12">
          <div className="flex gap-12">{row.map((element) => element)}</div>
        </div>
      </ul>
    </div>
  );
}
