"use client";
import { Avatar } from "@nextui-org/avatar";
import React from "react";
import InfiniteLoop from "@/shared/components/InfiniteLoop.component";
import { cn } from "@nextui-org/react";

type BecomeMemberProps = {
  className?: React.ComponentProps<"div">["className"];
  title?: string;
  shortTitle?: string,
  subtitle?: string;
  children?: React.ReactNode;
};

/**
 * Affiche un bloc permettant d'inciter les utilisateurs à devenir adhérent
 * @param className Classe tailwind à ajouter *(optionnel)*
 */

export default function BecomeMember({className, title, shortTitle, subtitle, children}: BecomeMemberProps) {
  if (shortTitle === undefined) {
    shortTitle = title;
  }
    return (
    <div className={cn("py-16 text-center justify-center flex flex-col gap-16", className)}>
      <div className="px-10 md:px-16">
        <h4 className="hidden md:block"> { title } </h4>
        <h4 className="block md:hidden"> { shortTitle } </h4>
        <p> { subtitle } </p>
      </div>

      <InfiniteLoop
        firstRow={Array.from({ length: 20 }).map((_, i) => (
          <Avatar key={i} className="w-20 h-20 text-white" />
        ))}
        secondRow={Array.from({ length: 20 }).map((_, i) => (
          <Avatar key={i} className="w-20 h-20 text-white" />
        ))}
      />

      <div className="flex gap-6 justify-center">
        {children}
      </div>
    </div>
  );
}
