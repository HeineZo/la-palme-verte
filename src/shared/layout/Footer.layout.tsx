'use client';

import { Link } from '@nextui-org/react';
import {
  IconBrandInstagram,
  IconBrandLinkedin,
  IconMail,
} from '@tabler/icons-react';
import { getYear } from 'date-fns';
import Image from 'next/image';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import pages from 'structure.json';

/**
 * Pied de page
 */
export default function Footer() {
  const pathname = usePathname();
  return (
    <div className="px-16 py-10 bg-accent w-full flex flex-col gap-14 text-white mt-10">
      <div className="flex flex-wrap flex-col md:flex-row justify-between items-center gap-5">
        {/* Logo */}
        <Image
          alt="La Palme Verte"
          height={100}
          src="/logo-white.svg"
          width={100}
        />

        {/* Pages du site */}
        <div className=" gap-8 h-fit md:flex">
          {pages.main.map((page) => (
            <Link
              as={NextLink}
              className={`${pathname === page.path && 'font-bold'} text-white`}
              href={page.path}
              isBlock
              key={page.path}
            >
              {page.label}
            </Link>
          ))}
        </div>

        {/* Réseaux sociaux */}
        <div className="flex gap-4">
          <Link
            as={NextLink}
            className="text-white h-fit"
            href={process.env.NEXT_PUBLIC_INSTAGRAM_URL}
          >
            <IconBrandInstagram />
          </Link>
          <Link
            as={NextLink}
            className="text-white h-fit"
            href={process.env.NEXT_PUBLIC_MAIL}
          >
            <IconMail />
          </Link>
          <Link
            as={NextLink}
            className="text-white h-fit"
            href={process.env.NEXT_PUBLIC_LINKEDIN_URL}
          >
            <IconBrandLinkedin />
          </Link>
        </div>
      </div>

      {/* Légal */}
      <div className="border-t-1 border-white flex flex-wrap items-end justify-center gap-6 pt-8">
        <p>
          {getYear(new Date())} {process.env.NEXT_PUBLIC_SITE_NAME}. Tout droit
          réservé.
        </p>
        <Link as={NextLink} className="text-white" href="/" underline="always">
          Politique de confidentialité
        </Link>
        <Link as={NextLink} className="text-white" href="/" underline="always">
          Conditions d'utilisation
        </Link>
        <Link as={NextLink} className="text-white" href="/" underline="always">
          Paramètre des cookies
        </Link>
      </div>
    </div>
  );
}
