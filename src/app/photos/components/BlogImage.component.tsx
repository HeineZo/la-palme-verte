'use client';

import { Image } from '@nextui-org/image';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import { getPhotos, deleteAll } from 'server/photo';
import Button from '@/shared/theme/Button';
import Zoom from "smooth-zoom";
import ZoomableImage from './ZoomableImage.component';
import { Photo } from '@prisma/client';

interface BlogImage {
  photo?: Photo
  title?: string;
  description?: string;
  className?: string;
}

export default function BlogImage({ photo, title, description, className }: BlogImage) {

  return (
    <div className='relative'>
      {/* <Button
          onClick={() => {
            void (async () => {
              await deleteAll();
            })();
          }}
        >
          Supprimer
        </Button> */}
      {/* // <Image key={photo.id} src={photo.url ?? undefined} /> */}
      <ZoomableImage className={`rounded-medium ${className}`} key={photo?.id} src={photo?.url ?? undefined}></ZoomableImage>
      {/* TODO: make text responsive */}
      {(title && description) && (
        <div className="absolute bottom-7 left-7 text-white w-3/4">
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
      )}
    </div>
  );
}