"use client"

import Button from '@/shared/theme/Button';
import { Image } from '@nextui-org/image';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import { useRef, useState } from 'react';

interface ZoomableImageProps {
    src: string;
    imageName: string;
}

interface ArrowProps {
    onClick: () => void;
    disabled?: boolean;
}

export default function ZoomableImage({ src, imageName }: ZoomableImageProps) {
    const imageRef = useRef<HTMLImageElement>(null);
    const [isZoomed, setIsZoomed] = useState(false);

    const toggleZoom = () => {
        setIsZoomed(!isZoomed);
        handleResize();
    };

    const handleResize = () => {
        const image = imageRef.current;
        if (image) {
            image.classList.toggle('zoomed', isZoomed);
        }
    };

    return (
        <div className={isZoomed ? 'image-container' : ''}>
            <Image
                className={`rounded-medium ${isZoomed ? 'image-zoomed' : 'cursor-pointer'}`}
                src={src}
                alt={imageName}
                ref={imageRef}
                onClick={toggleZoom}
            />
        </div>
    );
}

export function LeftArrow({ onClick }: ArrowProps) {
    return (
        <Button
            className="absolute z-10 left-0 transform -translate-x-1/2 -translate-y-1/2"
            color="primary"
            isIconOnly
            onClick={onClick}
        >
            <IconChevronLeft size={24} />
        </Button>
    );
}

export function RightArrow({ onClick }: ArrowProps) {
    return (
        <Button
            className="absolute z-10 right-0 transform translate-x-1/2 -translate-y-1/2"
            color="primary"
            isIconOnly
            onClick={onClick}
        >
            <IconChevronRight size={24} />
        </Button>
    );
}
