import PhotoCarrousel from '@/shared/components/PhotoCarrousel.component';
import Button from '@/shared/theme/Button';
import { Image } from '@nextui-org/image';
import { Link } from '@nextui-org/react';
import Reveal from '../utils/Reveal.component';

interface PhotoMosaicProps {
  photos: string[];
}

/**
 * Mosaïque de photos
 * @param photos - Photos à afficher dans la mosaïque
 */
export default function PhotoMosaic({ photos }: PhotoMosaicProps) {
  console.log(photos.length)
  return (
    <div className="flex flex-col items-center gap-8">
      <div className="hidden md:block w-full max-w-7xl mx-auto gap-8 space-y-8 columns-3">
        {photos.map((photo, index) => (
          <Reveal index={index} key={index}>
            <Image alt="Photo de la gallerie photo" src={photo} />
          </Reveal>
        ))}
      </div>
      <PhotoCarrousel className="md:hidden" photos={photos} />
      <Button
        className="text-accent w-fit"
        color="secondary"
        as={Link}
        href={`/photos`}
      >
        Voir plus
      </Button>
    </div>
  );
}
