"use client";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import React from "react";
import pages from "structure.json";
import { usePathname } from "next/navigation";
import Link from "next/link";

/**
 * Barre de navigation
 */
export default function Navbar() {
  const pathname = usePathname();

  return (
    <div className="w-full flex items-center justify-between sticky top-0 z-50 backdrop-blur-xl p-5 rounded-b-xl">
      <Image src="/logo.svg" width={50} height={50} alt="La Palme Verte" />
      <div className="flex gap-8">
        {pages.map((page) => {
          const isActive = pathname === page.path;

          return (
            <Button
              as={Link}
              key={page.path}
              href={page.path}
              color="primary"
              variant={isActive ? "flat" : "light"}
            >
              {page.label}
            </Button>
          );
        })}
      </div>
      <Button color="primary">Devenir adhérent</Button>
    </div>
  );
}
