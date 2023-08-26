"use client";
import Image from "next/image";
import { Link } from "@nextui-org/react";
import NextLink from "next/link";
import pages from "structure.json";
import { usePathname, useRouter } from "next/navigation";
import {
  IconBrandInstagram,
  IconBrandX,
  IconBrandLinkedin,
} from "@tabler/icons-react";
import { getYear } from "date-fns";

/**
 * Pied de page
 */
export default function Footer() {
  const pathname = usePathname();
  return (
    <section className="px-16 py-10 bg-accent w-full flex flex-col gap-14 text-white">
      <div className="flex flex-wrap flex-col md:flex-row justify-between items-center gap-5">

        {/* Logo */}
        <Image
          src="/logo-white.svg"
          width={100}
          height={100}
          alt="La Palme Verte"
        />

        {/* Pages du site */}
        <div className=" gap-8 h-fit md:flex">
          {pages.map((page) => (
            <Link
              isBlock
              href={page.path}
              className={`${pathname === page.path && "font-bold"} text-white`}
              as={NextLink}
            >
              {page.label}
            </Link>
          ))}
        </div>

        {/* Réseaux sociaux */}
        <div className="flex gap-4">
          <Link
            href={process.env.NEXT_PUBLIC_INSTAGRAM_URL}
            as={NextLink}
            className="text-white h-fit"
          >
            <IconBrandInstagram />
          </Link>
          <Link
            href={process.env.NEXT_PUBLIC_TWITTER_URL}
            as={NextLink}
            className="text-white h-fit"
          >
            <IconBrandX />
          </Link>
          <Link
            href={process.env.NEXT_PUBLIC_LINKEDIN_URL}
            as={NextLink}
            className="text-white h-fit"
          >
            <IconBrandLinkedin />
          </Link>
        </div>
      </div>

      {/* Légal */}
      <div className="border-t-1 border-white flex flex-wrap items-end justify-center gap-6 pt-8">
        <p>{getYear(new Date())} {process.env.NEXT_PUBLIC_SITE_NAME}. Tout droit réservé.</p>
        <Link as={NextLink} underline="always" className="text-white" href="#">Politique de confidentialité</Link>
        <Link as={NextLink} underline="always" className="text-white" href="#">Conditions d'utilisation</Link>
        <Link as={NextLink} underline="always" className="text-white" href="#">Paramètre des cookies</Link>
      </div>
    </section>
  );
}
