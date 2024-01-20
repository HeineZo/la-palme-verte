'use client';

import { Avatar } from '@nextui-org/avatar';
import React from 'react';
import { cn } from '@nextui-org/system';
import InfiniteLoop from '@/shared/components/InfiniteLoop.component';
import Button from '@/shared/theme/Button';

interface BecomeMemberProps {
  className?: React.ComponentProps<'div'>['className'];
  title?: string;
  shortTitle?: string;
  subtitle?: string;
  children?: React.ReactNode;
  showInfiniteLoop?: boolean;
  buttonTitle?: string;
}

/**
 * Affiche un bloc permettant d'inciter les utilisateurs à devenir adhérent
 * @param className Style tailwind à ajouter *(optionnel)*
 * @param title titre à afficher *(optionnel)*
 * @param shortTitle titre à affichier sur petit écran *(optionnel)*
 * @param subtitle Description de la section *(optionnel)*
 * @param children element html à afficher *(optionnel)*
 * @param showInfiniteLoop Affiche une boucle infinie d'avatars *(optionnel)* valeur par défaut : true
 * @param buttonTitle Titre du bouton *(optionnel)*
 */

export default function BecomeMember({
  className,
  title,
  shortTitle = title,
  subtitle,
  children,
  showInfiniteLoop = true,
  buttonTitle,
}: BecomeMemberProps) {
  return (
  <div
  className={cn(
			  'py-16 text-center justify-center flex flex-col gap-16',
			  className,
			  !showInfiniteLoop && 'gap-6',
			)}
		>
  <div className="px-10 md:px-16">
  <h4 className="hidden md:block"> {title} </h4>
  <h4 className="block md:hidden"> {shortTitle} </h4>
  <p> {subtitle} </p>
			</div>

      {showInfiniteLoop ? (
        <InfiniteLoop
          firstRow={Array.from({ length: 20 }).map((_, i) => (
            <Avatar className="w-20 h-20 text-white" key={i} />
          ))}
          secondRow={Array.from({ length: 20 }).map((_, i) => (
            <Avatar className="w-20 h-20 text-white" key={i} />
          ))}
        />
      ) : null}
      <div className="flex gap-6 justify-center">
        {buttonTitle ? (
          <Button className="w-fit" color="primary">
            {buttonTitle}
          </Button>
        ) : null}
        {children}
      </div>
    </div>
  );
}
