'use client';

import { Image } from '@nextui-org/image';
import React, { useEffect } from 'react';
import Button from '@/shared/theme/Button';
import Zoom from "smooth-zoom";
import ZoomableImage from '../[url]/components/ZoomableImage.component';

interface BlogImage {
  photo?: string
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
      <ZoomableImage className={`rounded-medium ${className}`} key={photo} src={photo ?? undefined}></ZoomableImage>
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