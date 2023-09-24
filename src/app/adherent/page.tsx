import InlineBlocks, { Row } from "@/shared/layout/InlineBlocks.layout";
import {
  IconBrandHipchat,
  IconConfetti,
  IconPencilHeart,  
} from "@tabler/icons-react";
import React from "react";

export default function page() {

  const actionsRow: Row[] = [
    {
      icon: <IconBrandHipchat size={48} stroke={3} />,
      title: "Accès à la rédaction d’articles",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare...",
    },
    {
      icon: <IconConfetti size={48} />,
      title: "Accès au canal privé de la communauté",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare...",
    },
    {
      icon: <IconPencilHeart size={48} />,
      title: "Participation à de nombreuses activités",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare...",
    },
  ];

  return (
    <div className="flex flex-col items-center">
      {/* Nos actions */}
      <div className="flex flex-col gap-10 p-16 rounded-3xl bg-highlight section">
        <h3 className="text-center">Pourquoi devenir adhérent ?</h3>
        <p> Adhérer à La Palme Verte ce n’est pas seulement soutenir l’association </p>
        <InlineBlocks rows={actionsRow} />
      </div>
    </div>
  )
}
