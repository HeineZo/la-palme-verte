'use client';

import { User } from '@/class/User.class';
import { IsocialMedia } from '@/shared/types/SocialMedia';
import { Avatar, Link } from '@nextui-org/react';
import {
  IconBrandFacebook as Facebook,
  IconBrandInstagram as Instagram,
  IconBrandLinkedin as Linkedin,
  IconBrandX as X,
} from '@tabler/icons-react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import NextLink from 'next/link';
import type { MouseEvent } from 'react';

interface MemberCardProps {
  member: User;
}

/**
 * Affiche une carte du membre passé en paramètre
 * @param member Membre à afficher
 */
export default function MemberCard({ member }: MemberCardProps) {
  const memberSocialsMedia = Object.entries(member).filter(([key, value]) => typeof value === 'string' && key === 'linkedin' || key === 'instagram');
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  /**
   * Anime le fond du composant en fonction de la position de la souris
   * @param currentTarget Element HTML sur lequel l'évènement a été déclenché
   * @param clientX Position X de la souris
   * @param clientY Position Y de la souris
   */
  const handleMouseMove = ({ currentTarget, clientX, clientY }: MouseEvent) => {
    const { left, top } = currentTarget.getBoundingClientRect();

    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  };

  /**
   * Retourne un logo en fonction du réseau social fourni
   * @param socialName Nom du réseau social
   * @returns Logo du réseau social
   */
  const getSocialIcon = (socialName: keyof IsocialMedia) => {
    switch (socialName) {
      case 'facebook':
        return <Facebook />;
      case 'x':
        return <X />;
      case 'linkedin':
        return <Linkedin />;
      case 'instagram':
        return <Instagram />;
      default:
        return null;
    }
  };

  return (
    <div
      className="group relative min-w-[200px]  max-w-md w-1/4 rounded-medium bg-highlight border border-white px-8 py-12"
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-medium opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(71, 108, 71, 0.25),
              transparent 80%
            )
          `,
        }}
      />
      <div className="flex flex-col items-center gap-5">
        <Avatar
          className="w-20 h-20"
          size="lg"
          src={member.imageUrl}
        />
        <div className="text-center">
          <p className="font-bold">{member.name}</p>
          <p>{member.genre === "Homme" ? member.role.nameMale : member.role.nameFemale}</p>
        </div>
        {(member.instagram !== '' || member.linkedin !== '') && (
          <div className="flex gap-4 flex-wrap justify-center">
            {(memberSocialsMedia).map(
              ([key, value]) =>
                typeof value === 'string' && (
                  <Link
                    as={NextLink}
                    className="text-black h-fit w-fit p-2 rounded-full bg-white transition duration-300 hover:bg-accent hover:text-white"
                    href={value}
                    key={key}
                  >
                    {getSocialIcon(key as keyof IsocialMedia)}
                  </Link>
                ),
            )}
          </div>
        )}
      </div>
    </div>
  );
}
