import {
  IconBrandHipchat,
  IconConfetti,
  IconPencilHeart,
} from '@tabler/icons-react';
import React from 'react';
import type { Row } from '@/shared/layout/InlineBlocks.layout';
import InlineBlocks from '@/shared/layout/InlineBlocks.layout';
import BecomeMember from '@/shared/components/BecomeMember.component';
import FAQ from '@/shared/layout/FAQ.layout';
import { getBySection } from 'server/faq';
import { clone } from '@/utils/utils';

/**
 * Page Adhérent
 */
export default async function page() {
  const faq = await getBySection('Adhésion');

  const actionsRow: Row[] = [
    {
      icon: <IconPencilHeart size={48} stroke={3} />,
      title: 'Accès à la rédaction d’articles',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare...',
    },
    {
      icon: <IconConfetti size={48} />,
      title: 'Accès au canal privé de la communauté',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare...',
    },
    {
      icon: <IconBrandHipchat size={48} />,
      title: 'Participation à de nombreuses activités',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare...',
    },
  ];

  return (
    <main>
      <section className="flex flex-col gap-20 items-center section py-28">
        {/* Nos actions */}
        <div className="flex flex-col justify-center text-center gap-6">
          <h1>Pourquoi devenir adhérent ?</h1>
          <p>
            Adhérer à La Palme Verte ce n’est pas seulement soutenir
            l’association
          </p>
        </div>
        <InlineBlocks rows={actionsRow} />
      </section>

      {/* Carrousel des membres */}
      <section className="bg-highlight">
        <BecomeMember
          buttonTitle="Rejoindre la communauté"
          subtitle="Pourquoi pas vous ?"
          title="84 personnes ont déjà rejoint l’association"
        />
      </section>
      <FAQ
        description="Les questions les plus fréquentes sur l’adhésion à l’association"
        faq={clone(faq)}
        title="Vous avez des questions ?"
      />
    </main>
  );
}
