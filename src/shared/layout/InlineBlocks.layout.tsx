import React from 'react';
import Reveal from '../utils/Reveal.component';

export interface Row {
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface InlineBlocksProps {
  rows: Row[];
}

/**
 * Affiche une liste d'éléments avec un titre, une description et une icône.
 * @param rows Eléments à afficher contenant un titre, une description et une icône.
 */
export default function InlineBlocks({ rows }: InlineBlocksProps) {
  return (
    <div className="flex flex-col lg:flex-row gap-12 items-center justify-evenly">
      {rows.map((row, index) => (
        <Reveal key={index} index={index}>
          <div className="flex flex-col gap-6 items-center text-center max-w-[400px]">
            {row.icon}
            <h5>{row.title}</h5>
            <p>{row.description}</p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
