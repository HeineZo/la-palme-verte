import React from 'react';
import BecomeMember from '@/shared/components/BecomeMember.component';
import { Button } from '@nextui-org/react';
import { getAlbums } from 'server/album';
import AlbumBrowser from './components/AlbumBrowser.component';

export default async function page() {
  const albums = await getAlbums();

  return (
    <main>
      <section className="section flex gap-5 mt-12 flex-col">
        <div>
          <h1>Photos</h1>
          <p>
            Découvrez les albums des photos prises par nos adhérents lors de nos différents
            ateliers et interventions
          </p>
        </div>
      </section>
      <AlbumBrowser albums={albums} />
      <BecomeMember
        buttonTitle="Devenir adhérent"
        shortTitle="Devenez adhérent"
        title="Participez aux sorties et aux activités en devenant adhérent"
      >
        <Button className="w-fit text-accent" color="secondary">
          En savoir plus
        </Button>
      </BecomeMember>
    </main>
  )
}
