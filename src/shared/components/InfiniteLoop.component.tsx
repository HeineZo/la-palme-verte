'use client';

import { ScrollShadow } from '@nextui-org/react';
import React from 'react';

interface InfiniteLoopProps {
  firstRow: JSX.Element[];
  secondRow?: JSX.Element[];
}

/**
 * Affiche des éléments à la suite en boucle
 * @param firstRow Première ligne d'éléments à afficher
 * @param secondRow Seconde ligne d'éléments à afficher dans le sens inverse *(optionnel)*
 */
export default function InfiniteLoop({
  firstRow,
  secondRow,
}: InfiniteLoopProps) {
  return (
    <ScrollShadow
      orientation="horizontal"
      className="flex flex-col self-center w-screen gap-6 overflow-hidden"
    >
      <div className="flex gap-12 animate-infinite-scroll-x">
        <div className="flex gap-12">{firstRow.map((element) => element)}</div>
        <div className="flex gap-12">{firstRow.map((element) => element)}</div>
      </div>
      {secondRow && (
        <div className="flex gap-12 animate-infinite-scroll-x-reverse">
          <div className="flex gap-12">
            {secondRow.map((element) => element)}
          </div>
          <div className="flex gap-12">
            {secondRow.map((element) => element)}
          </div>
        </div>
      )}
    </ScrollShadow>
  );
}
