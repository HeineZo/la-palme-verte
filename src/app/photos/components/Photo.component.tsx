'use client';

import { Image } from '@nextui-org/image';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { getPhotos, deleteAll } from 'server/photo';
import Button from '@/shared/theme/Button';
import Zoom from "smooth-zoom";
import ZoomableImage from './ZoomableImage.component';

export default function Photo() {
  const { data, error, isFetched } = useQuery({
    queryKey: ['photos'],
    queryFn: async () => getPhotos(),
  });
  if (error) return <div>{error.message}</div>;
  if (data?.data) {
    return (
      <div>
        {/* <Button
          onClick={() => {
            void (async () => {
              await deleteAll();
            })();
          }}
        >
          Supprimer
        </Button> */}
        {data.data.map((photo) => (
          // <Image key={photo.id} src={photo.url ?? undefined} />
          <ZoomableImage key={photo.id} src={photo.url ?? undefined}></ZoomableImage>
        ))}
      </div>
    );
  }
}
