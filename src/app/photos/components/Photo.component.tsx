"use client";

import { Image } from '@nextui-org/image';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { getPhotos } from 'server/photo';

export default function Photo() {
  const { data, error, isFetched } = useQuery({
    queryKey: ['photos'],
    queryFn: getPhotos,
  });
  if (error) return <div>{error.message}</div>;
  if (data?.data) {
    return (
      <div>
        {data.data.map((photo) => (
          <h2>{photo.id}</h2>
          // <Image key={photo.id} src={photo.url ?? undefined} />
        ))}
      </div>
    );
  }
}
