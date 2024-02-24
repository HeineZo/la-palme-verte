
import InfiniteLoop from '@/shared/components/InfiniteLoop.component';
import Button from '@/shared/theme/Button';
import { Avatar } from '@nextui-org/avatar';
import { cn } from '@nextui-org/system';
import React from 'react';
import { getUsers } from 'server/user';
import { Iuser } from '../interfaces/User';

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

export default async function BecomeMember({
  className,
  title,
  shortTitle = title,
  subtitle,
  children,
  showInfiniteLoop = true,
  buttonTitle,
}: BecomeMemberProps) {

  const users: Iuser[] = await getUsers();
  
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
          firstRow={users.slice(0, users.length / 2).map((user, i) => (
            <Avatar src={user.imageUrl} name={user.name.charAt(0).toUpperCase() + user.surname.charAt(0).toUpperCase()} className="w-20 h-20 text-white text-xl" key={i} />
          ))}
          secondRow={users.slice(users.length / 2, users.length).map((user, i) => (
            <Avatar src={user.imageUrl} name={user.name.charAt(0).toUpperCase() + user.surname.charAt(0).toUpperCase()} className="w-20 h-20 text-white text-xl" key={i} />
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
