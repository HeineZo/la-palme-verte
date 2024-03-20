import BecomeMember from '@/shared/components/BecomeMember.component';
import { Button, Link } from '@nextui-org/react';
import { getAlbums } from 'server/album';
import AlbumBrowser from './components/AlbumBrowser.component';

export default async function page() {
  const albums = await getAlbums();

  return (
    <main>
      <section className="section flex flex-col">
        <div className="mb-12">
          <h1>Photos</h1>
          <p>
            Découvrez les albums des photos prises par nos adhérents lors de nos
            différents ateliers et interventions
          </p>
        </div>
        <AlbumBrowser albums={albums} />
      </section>
      <BecomeMember
        buttonTitle="Devenir adhérent"
        shortTitle="Devenez adhérent"
        title="Participez aux sorties et aux activités en devenant adhérent"
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
    </main>
  );
}
