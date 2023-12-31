import { Image } from '@nextui-org/image';
import React from 'react';
import PhotoCarrousel from '@/shared/components/PhotoCarrousel.component';
import Button from '@/shared/theme/Button';
import Reveal from '../utils/Reveal.component';

interface PhotoMosaicProps {
  photos: string[];
}

/**
 * Mosaïque de photos
 * @param photos Photos à afficher dans la mosaïque
 * @todo Afficher les informations de la photo au hover (on pourrait limite en faire un composant)
 */
export default function PhotoMosaic({ photos }: PhotoMosaicProps) {
  return (
    <div className="flex flex-col items-center gap-8">
      <div className="hidden md:block w-full max-w-7xl mx-auto gap-8 space-y-8 columns-3">
        {photos?.map((photo, index) => (
          <Reveal key={index} index={index}>
            <Image src={photo} alt="Photo de la gallerie photo" />
          </Reveal>
        ))}
      </div>
      <PhotoCarrousel photos={photos} className="md:hidden" />
      <Button color="secondary" className="text-accent w-fit">
        Voir plus
      </Button>
    </div>
  );
}
