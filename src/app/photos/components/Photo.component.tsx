"use client";

import { Image } from '@nextui-org/image';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { getPhotos } from 'server/photo';

export default function Photo() {
  const { data, error, isFetched } = useQuery({
    queryKey: ['photos'],
    queryFn: async () => getPhotos(),
  });
  if (error) return <div>{error.message}</div>;
  if (data?.data) {
    return (
      <div>
        <h2>Composant photo</h2>
        {data.data.map((photo) => (
          <Image key={photo.id} src={photo.url ?? undefined} />
        ))}
      </div>
    );
  }
}
