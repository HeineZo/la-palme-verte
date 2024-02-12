import React from 'react';
import BecomeMember from '@/shared/components/BecomeMember.component';
import { Button } from '@nextui-org/react';
import AlbumTile from './components/AlbumTile.component';

export default function page() {

  // const { data, error, isFetched } = useQuery({
  //   queryKey: ['albums'],
  //   queryFn: async () => getAlbums()
  // });

  // if (error) return <div>{error.message}</div>;

  // if (data?.data) {
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
        <AlbumTile title='Clean Walk à Séné' cover={undefined} description='' />
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
  // }
}
