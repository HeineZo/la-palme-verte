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
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import pages from 'structure.json';
import Button from '@/shared/theme/Button';

/**
 * Barre de navigation
 */
export default function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <NavbarUI onMenuOpenChange={setIsMenuOpen} shouldHideOnScroll>
      {/* Logo */}
      <NavbarBrand as={Link} href="/">
        <Image alt="La Palme Verte" height={50} src="/logo.svg" width={50} />
      </NavbarBrand>

      {/* Pages du site */}
      <NavbarContent className="hidden sm:flex gap-8" justify="center">
        <Tabs
          classNames={{
            tabList: 'gap-8',
            cursor: 'bg-accent',
          }}
          color="secondary"
          selectedKey={pathname}
          variant="light"
        >
          {pages.main.map((page) => (
            <Tab
              key={page.path}
              title={page.label}
              href={page.path}
            />
          ))}
        </Tabs>
      </NavbarContent>

      <NavbarContent justify="end">
        {/* CTA */}
        <NavbarItem>
          <Button as={Link} color="primary" href={pages.other.adherent.path}>
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
                className={`w-full ${isActive && 'text-accent'}`}
                color="foreground"
                href={page.path}
                size="lg"
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
