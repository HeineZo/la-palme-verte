'use client';

import { File } from '@/class/Album.class';
import {
  Modal,
  ModalContent,
  Button,
  useDisclosure,
  Image,
} from '@nextui-org/react';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import { useState } from 'react';

interface GalleryProps {
  images: File[];
}

/**
 * Affiche des images dans une gallerie photo
 * @param images Images à afficher
 */
export default function Gallery({ images }: GalleryProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [fullscreenImage, setFullscreenImage] = useState<File>();

  /**
   * Détermine s'il y a une image suivante après l'image courante
   * @returns True s'il y a une image suivante, sinon false
   */
  const hasNext = () => {
    const currentIndex = images.findIndex(
      (image) => image.file.url === fullscreenImage?.file.url,
    );
    return currentIndex < images.length - 1;
  };

  /**
   * Détermine s'il y a une image précédente avant l'image courante
   * @returns True s'il y a une image précédente, sinon false 
   */
  const hasPrevious = () => {
    const currentIndex = images.findIndex(
      (image) => image.file.url === fullscreenImage?.file.url,
    );
    return currentIndex > 0;
  };

  /**
   * Affiche l'image en mode plein écran
   * @param image
   */
  const handleFullScreen = (image: File) => {
    setFullscreenImage(image);
    onOpen();
  };

  /**
   * En mode plein écran, affiche l'image suivante
   */
  const nextImage = () => {
    const currentIndex = images.findIndex(
      (image) => image.file.url === fullscreenImage?.file.url,
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
      (image) => image.file.url === fullscreenImage?.file.url,
    );
    const previousIndex = currentIndex - 1;
    if (previousIndex >= 0) {
      setFullscreenImage(images[previousIndex]);
    }
  };

  return (
    <section className="flex flex-col gap-4">
      {images.map((image, index) => (
        <div
          key={index}
          className={`relative mx-auto flex gap-4 ${
            index % 2 === 0 ? 'xl:flex-row' : 'xl:flex-row-reverse'
          } flex-col`}
        >
          <div className="xl:w-1/2 relative">
            <Image
              className="rounded-medium"
              src={image.file.url}
              alt={index === 0 ? "Couverture de l'album" : image.name}
              onClick={() => {
                handleFullScreen(image);
              }}
            />
          </div>
          <div className="xl:w-1/2 mt-4 lg:mt-0 grid grid-cols-1 md:grid-cols-2 gap-4">
            {images.slice(index + 1, index + 5).map((subImage, subIndex) => (
              <Image
                key={subIndex}
                src={subImage.file.url}
                alt={subImage.name}
                className="rounded-medium"
                onClick={() => {
                  handleFullScreen(subImage);
                }}
              />
            ))}
          </div>
        </div>
      ))}

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
              src={fullscreenImage?.file.url}
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
