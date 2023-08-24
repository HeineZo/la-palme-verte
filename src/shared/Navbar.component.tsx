"use client";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import React from "react";

/**
 * Barre de navigation
 */
export default function Navbar() {
  return (
    <div className="w-full flex items-center justify-between sticky top-0 z-50 backdrop-blur-xl p-5 rounded-b-xl">
      <Image src="/logo.svg" width={50} height={50} alt="La Palme Verte" />
      <div className="flex gap-32"></div>
      <Button color="primary">Devenir adhérent</Button>
    </div>
  );
}
