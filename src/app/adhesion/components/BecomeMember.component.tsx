"use client";
import { Button } from "@/shared/theme/Button";
import { Avatar } from "@nextui-org/avatar";
import React from "react";
import InfiniteLoop from "@/shared/components/InfiniteLoop.component";
import { cn } from "@nextui-org/react";

interface BecomeMemberProps {
  className?: React.ComponentProps<"div">["className"];
}

/**
 * Affiche un bloc permettant d'inciter les utilisateurs à devenir adhérent
 * @param className Classe tailwind à ajouter *(optionnel)*
 */
export default function BecomeMember({ className }: BecomeMemberProps) {
  return (
    <div className={cn("py-16 text-center justify-center flex flex-col gap-16", className)}>
      <div className="px-10 md:px-16">
        <h4 className="hidden md:block">Devenez adhérent pour rejoindre une communauté grandissante</h4>
        <h4 className="block md:hidden">Devenez adhérent</h4>
        <p>
          En adhérant à l'association, vous pourrez participer à nos actions et
          nous aider à protéger la biodiversité marine.
        </p>
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
        <Button color="primary" className="w-fit">
          Devenir adhérent
        </Button>
        <Button color="secondary" className="w-fit text-accent">
          En savoir plus
        </Button>
      </div>
    </div>
  );
}
