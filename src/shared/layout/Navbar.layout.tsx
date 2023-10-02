'use client';

import {
  Link as UILink,
  Navbar as NavbarUI,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Tabs,
} from '@nextui-org/react';
import { Tab } from '@nextui-org/tabs';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { Key } from 'react';
import pages from 'structure.json';

import Button from '@/shared/theme/Button';

/**
 * Barre de navigation
 */
export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  /**
   * Dirige l'utilisateur vers la page cible
   * @param targetPath Chemin de la page cible
   */
  const handleNavigation = (targetPath: Key) => {
    router.push(targetPath as string);
  };

  return (
    <NavbarUI shouldHideOnScroll onMenuOpenChange={setIsMenuOpen}>
      {/* Logo */}
      <NavbarBrand as={Link} href="/">
        <Image src="/logo.svg" width={50} height={50} alt="La Palme Verte" />
      </NavbarBrand>

      {/* Pages du site */}
      <NavbarContent className="hidden sm:flex gap-8" justify="center">
        <Tabs
          variant="light"
          color="secondary"
          // Pour éviter la redirection lorsqu'on est dans une page autre que celles du menu
          selectedKey={
            pages.main.some((page) => page.path === pathname)
              ? pathname
              : undefined
          }
          onSelectionChange={handleNavigation}
          classNames={{
            tabList: 'gap-8',
            cursor: 'bg-accent',
          }}
        >
          {pages.main.map((page) => (
            <Tab key={page.path} title={page.label} />
          ))}
        </Tabs>
      </NavbarContent>

      <NavbarContent justify="end">
        {/* CTA */}
        <NavbarItem>
          <Button color="primary" as={Link} href={pages.other.adherent.path}>
            {pages.other.adherent.label}
          </Button>
        </NavbarItem>

        {/* Menu mobile */}
        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          className="sm:hidden"
        />
      </NavbarContent>

      {/* Menu déroulant mobile */}
      <NavbarMenu>
        {pages.main.map((page) => {
          const isActive = pathname === page.path;
          return (
            <NavbarMenuItem key={page.path}>
              <UILink
                color="foreground"
                className={`w-full ${isActive && 'text-accent'}`}
                size="lg"
                href={page.path}
              >
                {page.label}
              </UILink>
            </NavbarMenuItem>
          );
        })}
      </NavbarMenu>
    </NavbarUI>
  );
}
