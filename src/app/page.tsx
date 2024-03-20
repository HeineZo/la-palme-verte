import BecomeMember from '@/shared/components/BecomeMember.component';
import FAQ from '@/shared/layout/FAQ.layout';
import type { Row } from '@/shared/layout/InlineBlocks.layout';
import InlineBlocks from '@/shared/layout/InlineBlocks.layout';
import PhotoMosaic from '@/shared/layout/PhotoMosaic.layout';
import Button from '@/shared/theme/Button';
import Reveal from '@/shared/utils/Reveal.component';
import { clone } from '@/utils/utils';
import { Image } from '@nextui-org/image';
import { Link } from '@nextui-org/react';
import {
  IconCalendarHeart,
  IconChevronRight,
  IconScubaMask,
  IconUsersGroup,
} from '@tabler/icons-react';
import { getLatestImages } from 'server/album';
import { getBySection } from 'server/faq';
import LastArticles from './blog/layout/LastArticles.layout';

/**
 * Page d'accueil
 */
export default async function Home() {
  const faq = await getBySection('Général');
  const photos = await getLatestImages();

  const actionsRow: Row[] = [
    {
      icon: <IconScubaMask size={48} stroke={3} />,
      title: "Une multitude d'activités",
      description:
        'Des activités éco-citoyennes et subaquatiques sont régulièrements mises en places pour permettre de dynamiser le campus',
    },
    {
      icon: <IconCalendarHeart size={48} />,
      title: 'Des événements caritatifs',
      description:
        'De nombreux événements sont organisés chaque année pour récolter des fonds destinés à la protection de la faune marine',
    },
    {
      icon: <IconUsersGroup size={48} />,
      title: 'Une association étudiante',
      description:
        'Aujourd’hui présente sur le campus de Tohannic à l’Université Bretagne Sud de Vannes, notre association est accessible pour tous les étudiants, peu importe leur formation',
    },
  ];

  return (
    <main>
      {/* Hero section */}
      <div className="flex gap-20 py-28 px-16 items-center justify-around bg-highlight rounded-medium w-screen">
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
              className="w-fit"
              color="primary"
              endContent={<IconChevronRight size={16} />}
              as={Link}
              href="/association"
            >
              Découvrir l'association
            </Button>
          </Reveal>
        </div>
        <div className="hidden lg:flex gap-3">
          <div className="flex flex-col gap-7">
            <Image
              alt="Image de fond marin"
              height={270}
              isZoomed
              src="https://images.unsplash.com/photo-1559825481-12a05cc00344?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1965&q=80"
              width={200}
            />
            <Image
              alt="Image de fond marin"
              height={300}
              isZoomed
              src="https://images.unsplash.com/photo-1565214975484-3cfa9e56f914?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2127&q=80"
              width={200}
            />
          </div>
          <div className="flex flex-col gap-7">
            <Image
              alt="Image de fond marin"
              isZoomed
              src="https://images.unsplash.com/photo-1682687981603-ae874bf432f2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
              width={290}
            />
            <Image
              alt="Image de fond marin"
              isZoomed
              src="https://images.unsplash.com/photo-1628630500614-1c8924c99c3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
              width={290}
            />
          </div>
        </div>
      </div>

      {/* Adhérer */}
      <BecomeMember
        buttonTitle="Devenir adhérent"
        shortTitle="Devenez adhérent"
        subtitle="En adhérant à l'association, vous pourrez participer à nos actions et
        nous aider à protéger la biodiversité marine."
        title="Devenez adhérent pour rejoindre une communauté grandissante"
      >
        <Button
          className="w-fit text-accent"
          color="secondary"
          as={Link}
          href="/association"
        >
          En savoir plus
        </Button>
      </BecomeMember>

      {/* Nos actions */}
      <div className="flex flex-col gap-10 px-10 rounded-3xl bg-highlight section">
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
      <FAQ
        description="Les questions que l'on nous pose le plus souvent"
        faq={clone(faq)}
        title="Vous avez des questions ?"
      />
    </main>
  );
}
