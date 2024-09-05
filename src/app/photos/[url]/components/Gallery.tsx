'use client';

import { AlbumImage } from '@/class/Album.class';
import {
  Button,
  Image,
  Modal,
  ModalContent,
  cn,
  useDisclosure,
} from '@nextui-org/react';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import { useMemo, useState } from 'react';

interface GalleryProps {
  images: AlbumImage[];
}

/**
 * Affiche des images dans une gallerie photo
 * @param images Images à afficher
 */
export default function Gallery({ images }: GalleryProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [fullscreenImage, setFullscreenImage] = useState<AlbumImage>();

  /**
   * Détermine s'il y a une image suivante après l'image courante
   * @returns True s'il y a une image suivante, sinon false
   */
  const hasNext = () => {
    const currentIndex = images.findIndex(
      (image) => image.url === fullscreenImage?.url,
    );
    return currentIndex < images.length - 1;
  };

  /**
   * Détermine s'il y a une image précédente avant l'image courante
   * @returns True s'il y a une image précédente, sinon false
   */
  const hasPrevious = () => {
    const currentIndex = images.findIndex(
      (image) => image.url === fullscreenImage?.url,
    );
    return currentIndex > 0;
  };

  /**
   * Affiche l'image en mode plein écran
   * @param image
   */
  const handleFullScreen = (image: AlbumImage) => {
    setFullscreenImage(image);
    onOpen();
  };

  /**
   * En mode plein écran, affiche l'image suivante
   */
  const nextImage = () => {
    const currentIndex = images.findIndex(
      (image) => image.url === fullscreenImage?.url,
    );
    const nextIndex = currentIndex + 1;
    if (nextIndex < images.length) {
      setFullscreenImage(images[nextIndex]);
    }
  };

  /**
   * En mode plein écran, affiche l'image précédente
   */
  const previousImage = () => {
    const currentIndex = images.findIndex(
      (image) => image.url === fullscreenImage?.url,
    );
    const previousIndex = currentIndex - 1;
    if (previousIndex >= 0) {
      setFullscreenImage(images[previousIndex]);
    }
  };

  const randomIndex = useMemo(() => {
    return Math.floor(Math.random() * 3) + 1;
  }, []);

  return (
    <section className="flex flex-col gap-4 section w-full">
      <div className="grid grid-flow-row auto-rows-max grid-cols-4 gap-4">
        {images.map((image, index) => (
          <div
            key={image.name}
            className={cn(
              index % randomIndex === 1
                ? 'row-span-2 col-span-2'
                : 'col-span-1 row-span-1',
            )}
          >
            <Image
              className="rounded-medium cursor-zoom-in"
              src={image.url}
              alt={index === 0 ? "Couverture de l'album" : image.name}
              onClick={() => {
                handleFullScreen(image);
              }}
            />
          </div>
        ))}
      </div>

      {/* Mode plein écran */}
      <Modal
        backdrop="blur"
        isOpen={isOpen}
        onClose={onClose}
        size="5xl"
        hideCloseButton
        shadow={undefined}
      >
        <ModalContent className="bg-transparent shadow-none">
          <div className="flex gap-8 items-center">
            <Button
              color="primary"
              isIconOnly
              onClick={previousImage}
              isDisabled={!hasPrevious()}
            >
              <IconChevronLeft size={24} />
            </Button>
            <Image
              className="rounded-medium"
              src={fullscreenImage?.url}
              alt={fullscreenImage?.name}
            />
            <Button
              color="primary"
              isIconOnly
              onClick={nextImage}
              isDisabled={!hasNext()}
            >
              <IconChevronRight size={24} />
            </Button>
          </div>
        </ModalContent>
      </Modal>
    </section>
  );
}
