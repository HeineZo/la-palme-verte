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
        'En tant qu’adhérent, vous avez la possibilité de rédiger des articles pour notre blog et de les partager avec la communauté',
    },
    {
      icon: <IconConfetti size={48} />,
      title: 'Accès au canal privé de la communauté',
      description:
        'Une fois adhérent, vous aurez accès au groupe Whatsapp où vous pourrez échanger avec les autres membres et être tenu au courant des activités',
    },
    {
      icon: <IconBrandHipchat size={48} />,
      title: 'Participation à de nombreuses activités',
      description:
        "De nombreuses activités sont organisées au cours de l'année, en tant qu’adhérent vous pourrez y participer et même proposer des idées d'activité",
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
          title="59 personnes ont déjà rejoint l’association"
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
