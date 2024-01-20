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
      <h1>Photos</h1>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Photo />
      </HydrationBoundary>
    </main>
  );
}
