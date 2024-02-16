import React from 'react';
import BecomeMember from '@/shared/components/BecomeMember.component';
import { Button } from '@nextui-org/react';
import AlbumTile from './components/AlbumTile.component';
import { getAlbums } from 'server/album';

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
      <section className="section py-0 flex flex-col items-center">
        <h1>{albums[0].title}</h1>
        <AlbumTile title={albums[0].title} cover={undefined} description='' />
      </section>
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
