"use client";
import Image from "next/image";
import React from "react";
import pages from "structure.json";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Tabs,
  Tab,
  Link as UILink,
} from "@nextui-org/react";
import { Button } from "@/shared/theme/Button";

/**
 * Barre de navigation
 */
export default function Navigation() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <Navbar shouldHideOnScroll onMenuOpenChange={setIsMenuOpen}>

      {/* Logo */}
      <NavbarBrand as={Link} href="/">
        <Image src="/logo.svg" width={50} height={50} alt="La Palme Verte" />
      </NavbarBrand>

      {/* Pages du site */}
      <NavbarContent className="hidden sm:flex gap-8" justify="center">
        <Tabs
          variant="light"
          color="secondary"
          selectedKey={pathname}
          onSelectionChange={(targetPath) => router.push(targetPath as string)}
          classNames={{
            tabList: "gap-8",
            cursor: "bg-accent",
          }}
        >
          {pages.map((page) => (
            <Tab key={page.path} title={page.label} />
          ))}
        </Tabs>
      </NavbarContent>

      <NavbarContent justify="end">
        {/* CTA */}
        <NavbarItem>
          <Button color="primary" onClick={() => router.push('/adherent')}>
            Devenir adhérent
          </Button>
        </NavbarItem>

        {/* Menu mobile */}
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
      </NavbarContent>

      {/* Menu déroulant mobile */}
      <NavbarMenu>
        {pages.map((page) => {
          const isActive = pathname === page.path;
          return (
            <NavbarMenuItem key={page.path}>
              <UILink
                color="foreground"
                className={`w-full ${isActive && "text-accent"}`}
                size="lg"
                href={page.path}
              >
                {page.label}
              </UILink>
            </NavbarMenuItem>
          );
        })}
      </NavbarMenu>
    </Navbar>
  );
}
