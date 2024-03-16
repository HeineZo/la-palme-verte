"use client"

import Button from '@/shared/theme/Button';
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

    // Etats des boutons de direction
    const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
    const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

    const toggleZoom = () => {
        setIsZoomed(!isZoomed);
        handleResize();
    };

    const handleResize = () => {
        const image = imageRef.current;
        if (image) {
            if (isZoomed) {
                image.style.width = '100vw';
                image.style.height = '100vh';
                image.style.objectFit = 'contain';
                image.style.position = 'fixed';
                image.style.top = '0';
                image.style.left = '0';
                image.style.zIndex = '9999';
                image.style.cursor = 'zoom-out';
                image.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
                image.style.borderRadius = '0';
            } else {
                image.style.width = 'auto';
                image.style.height = 'auto';
                image.style.objectFit = 'initial';
                image.style.position = 'static';
                image.style.top = 'auto';
                image.style.left = 'auto';
                image.style.zIndex = 'auto';
                image.style.cursor = 'pointer';
                image.style.backgroundColor = 'transparent';
                image.style.borderRadius = '24px';
            }
        }
    };

    return (
        <div className="zoomable-image-container relative">
            {!isZoomed && (
                <LeftArrow disabled={prevBtnDisabled} onClick={() => { }} />
            )}
            <img
                className="rounded-medium cursor-pointer"
                src={src}
                alt={imageName}
                ref={imageRef}
                onClick={toggleZoom}
            />
            {!isZoomed && (
                <RightArrow disabled={nextBtnDisabled} onClick={() => { }} />
            )}
        </div>
    );
}

/**
 * Bouton gauche pour se direction dans le carrousel
 * @param onClick Fonction à appeler lors du clic sur le bouton
 * @param disabled Etat du bouton
 */
export function LeftArrow({ onClick, disabled }: ArrowProps) {
    if (!disabled) {
        return null;
    }
    return (
        <Button
            className="absolute left-0"
            color="primary"
            disabled={disabled}
            isIconOnly
            onClick={onClick}
        >
            <IconChevronLeft size={24} />
        </Button>
    );
}

/**
 * Bouton gauche pour se direction dans le carrousel
 * @param onClick Fonction à appeler lors du clic sur le bouton
 * @param disabled Etat du bouton
 */
export function RightArrow({ onClick, disabled }: ArrowProps) {
    if (!disabled) {
        return null;
    }
    return (
        <Button
            className="absolute right-0"
            color="primary"
            disabled={disabled}
            isIconOnly
            onClick={onClick}
        >
            <IconChevronRight size={24} />
        </Button>
    );
}
