import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';
import React from 'react';
import { getPhotos } from 'server/photo';
import Photo from './components/Photo.component';

export default async function page() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['photo'],
    queryFn: getPhotos,
  });

  return (
    <main>
      <section className="section flex gap-5 mt-12 flex-col">
        <h1>Photos</h1>
        <p>Découvrez les photos prises par nos adhérents lors de nos différents ateliers et interventions</p>
      </section>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Photo />
      </HydrationBoundary>
    </main>
  );
}
