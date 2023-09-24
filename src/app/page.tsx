import InlineBlocks, { Row } from "@/shared/layout/InlineBlocks.layout";
import PhotoMosaic from "@/shared/layout/PhotoMosaic.layout";
import { Button } from "@/shared/theme/Button";
import { Image } from "@nextui-org/image";
import {
  IconCalendarHeart,
  IconChevronRight,
  IconScubaMask,
  IconUsersGroup,
} from "@tabler/icons-react";
import LastArticles from "./blog/layout/LastArticles.layout";
import FAQ from "@/shared/layout/FAQ.layout";
import BecomeMember from "@/app/adherent/components/BecomeMember.component";
import Reveal from "@/shared/utils/Reveal.component";

/**
 * Page d'accueil
 */
export default function Home() {
  const actionsRow: Row[] = [
    {
      icon: <IconScubaMask size={48} stroke={3} />,
      title: "Une multitude d’ateliers",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare...",
    },
    {
      icon: <IconCalendarHeart size={48} />,
      title: "Des événements caritatifs",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare...",
    },
    {
      icon: <IconUsersGroup size={48} />,
      title: "Fédérer une communauté",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare...",
    },
  ];

  // placeholders en attendant la mise en place de la galerie photo
  const photos = [
    "https://images.unsplash.com/photo-1500763702684-af70eba9a9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80",
    "https://images.unsplash.com/photo-1655149000913-88f86c38593f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1970&q=80",
    "https://images.unsplash.com/photo-1506434304575-afbb92660c28?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80",
    "https://images.unsplash.com/photo-1606043580455-bd22074d1e67?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
    "https://images.unsplash.com/photo-1450825404103-e02d63c0b624?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2073&q=80",
    "https://images.unsplash.com/photo-1450825404103-e02d63c0b624?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2073&q=80",
    "https://images.unsplash.com/photo-1655149002351-132042bee905?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2022&q=80",
    "https://images.unsplash.com/photo-1522055598936-5611c49b072f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  ];

  const questions = [
    {
      title: "Pourquoi avoir choisi ce nom ?",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare...",
    },
    {
      title: "Comment adhérer à l'association ?",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare...",
    },
    {
      title: "Comment participer aux ateliers ?",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare...",
    },
    {
      title: "Pourquoi l'adhésion n'est-elle pas gratuite ?",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare...",
    },
    {
      title:
        "J'habite dans un autre pays, est-il tout de même possible d'adhérer ?",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare...",
    },
  ];

  return (
    <div className="flex flex-col items-center">
      {/* Hero section */}
      <div className="flex gap-20 py-28 px-16 items-center justify-around bg-highlight rounded-medium w-full">
        <div className="flex flex-col gap-6 md:w-3/4 lg:w-1/3 h-fit">
          <Reveal>
            <h1>Plongez au coeur de l'action</h1>
          </Reveal>
          <Reveal index={2}>
            <p>
              De 2005 à aujourd’hui, La Palme Verte n’a cessé de se réinventer
              et de sensibiliser le public sur l’importance de la préservation
              de nos fond-marins.
            </p>
          </Reveal>
          <Reveal index={3}>
            <Button
              color="primary"
              endContent={<IconChevronRight size={16} />}
              className="w-fit"
            >
              Découvrir l'association
            </Button>
          </Reveal>
        </div>
        <div className="hidden lg:flex gap-3">
          <div className="flex flex-col gap-7">
            <Image
              isZoomed
              width={200}
              height={270}
              alt="Image de fond marin"
              src="https://images.unsplash.com/photo-1559825481-12a05cc00344?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1965&q=80"
            />
            <Image
              isZoomed
              width={200}
              height={300}
              alt="Image de fond marin"
              src="https://images.unsplash.com/photo-1565214975484-3cfa9e56f914?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2127&q=80"
            />
          </div>
          <div className="flex flex-col gap-7">
            <Image
              isZoomed
              width={290}
              alt="Image de fond marin"
              src="https://images.unsplash.com/photo-1682687981603-ae874bf432f2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
            />
            <Image
              isZoomed
              width={290}
              alt="Image de fond marin"
              src="https://images.unsplash.com/photo-1628630500614-1c8924c99c3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
            />
          </div>
        </div>
      </div>

      {/* Adhérer */}
      <BecomeMember 
        title="Devenez adhérent pour rejoindre une communauté grandissante"
        shortTitle="Devenez adhérent"
        subtitle="Devenez adhérent"
      >
        <Button color="primary" className="w-fit">Devenir adhérent</Button>
        <Button color="secondary" className="w-fit text-accent">En savoir plus</Button>
      </BecomeMember>


      {/* Nos actions */}
      <div className="flex flex-col gap-10 p-16 rounded-3xl bg-highlight section">
        <h3 className="text-center">Nos actions</h3>
        <InlineBlocks rows={actionsRow} />
      </div>

      {/* Les photos */}
      <div className="flex flex-col gap-6 items-center section text-center">
        <h2>Une image vaut mieux que mille mots</h2>
        <p>Les dernières photos publiées par nos adhérents</p>
        <PhotoMosaic photos={photos} />
      </div>

      {/* Blog */}
      <LastArticles />

      {/* FAQ */}
      <FAQ questions={questions} 
        title="Vous avez des questions ?"
        description="Les questions que l'on nous pose le plus souvent"
      />
    </div>
  );
}
