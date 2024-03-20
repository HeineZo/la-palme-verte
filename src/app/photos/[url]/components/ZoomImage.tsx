'use client';
import React from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Image,
} from '@nextui-org/react';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';

interface ZoomImageProps {
  src: string;
  alt: string;
}

export default function ZoomImage({ src, alt }: ZoomImageProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Image className="rounded-medium" src={src} alt={alt} onClick={onOpen} />
      <Modal
        backdrop="blur"
        isOpen={isOpen}
        onClose={onClose}
        size="5xl"
        hideCloseButton
        shadow={'sm'}
      >
        <ModalContent className="bg-transparent">
          <div className='flex gap-8 items-center'>
            <Button
              color="primary"
              isIconOnly
              // onClick={onClick}
            >
              <IconChevronLeft size={24} />
            </Button>
            <Image className="rounded-medium" src={src} alt={alt} />
            <Button
              color="primary"
              isIconOnly
              // onClick={onClick}
            >
              <IconChevronRight size={24} />
            </Button>
          </div>
        </ModalContent>
      </Modal>
    </>
  );
}
