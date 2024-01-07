'use client';

import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { flushSync } from 'react-dom';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import { cn } from '@nextui-org/react';
import Button from '@/shared/theme/Button';

const TWEEN_FACTOR = 1.2;

interface ArrowProps {
  onClick: () => void;
  disabled?: boolean;
}

interface PhotoCarrouselProps {
  photos: string[];
  height?: React.ComponentProps<'img'>['className'];
  className?: React.ComponentProps<'div'>['className'];
}

/**
 * Carrousel permettant de faire défiler des images
 * @param photos Photos à afficher dans le carrousel
 * @param className Style à appliquer au carrousel *(optionnel)*
 */
export default function PhotoCarrousel({
  photos,
  className,
  height = 'h-[500px]',
}: PhotoCarrouselProps) {
  // API du carrousel
  const [emblaRef, emblaApi] = useEmblaCarousel();
  const [tweenValues, setTweenValues] = useState<number[]>([]);

  // Etats des boutons de direction
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

  /**
	 * A chaque changement d'image
	 */
  const onScroll = useCallback(() => {
    if (!emblaApi) return;

    const engine = emblaApi.internalEngine();
    const scrollProgress = emblaApi.scrollProgress();

    // On vérifie si on peut encore scroller, si non on désactive le bouton correspondant
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());

    // Effet parralax
    const styles = emblaApi.scrollSnapList().map((scrollSnap, index) => {
      let diffToTarget = scrollSnap - scrollProgress;

      if (engine.options.loop) {
        engine.slideLooper.loopPoints.forEach((loopItem) => {
          const target = loopItem.target();
          if (index === loopItem.index && target !== 0) {
            const sign = Math.sign(target);
            if (sign === -1)
							diffToTarget = scrollSnap - (1 + scrollProgress);
            if (sign === 1)
							diffToTarget = scrollSnap + (1 - scrollProgress);
          }
        });
      }
      return diffToTarget * (-1 / TWEEN_FACTOR) * 100;
    });
    setTweenValues(styles);
  }, [emblaApi, setTweenValues]);

  /**
   * Elément précédent
   */
  const scrollPrev = useCallback(() => {
    emblaApi && emblaApi.scrollPrev();
  }, [emblaApi]);
  /**
   * Elément suivant
   */
  const scrollNext = useCallback(() => {
    emblaApi && emblaApi.scrollNext();
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onScroll();
    emblaApi.on('scroll', () => {
      flushSync(() => {
        onScroll();
      });
    });
    emblaApi.on('reInit', onScroll);
  }, [emblaApi, onScroll]);

  return (
    <div className={cn('relative', className)}>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex touch-pan-y ml-[calc(var(--slide-spacing)_*_-1)]">
          {photos.map((photo, index: number) => (
            <div
              className="flex-[0_0_var(--slide-size)] min-w-0 pl-[var(--slide-spacing)] relative"
              key={index}
            >
              <div className="h-full overflow-hidden rounded-medium">
                <div
                  className="relative h-full w-full"
                  style={{
                    ...(tweenValues.length && {
                      transform: `translateX(${tweenValues[index]}%)`,
                    }),
                  }}
                >
                  <img
                    alt="Photo de la gallerie photo"
                    className={cn(
                      'block object-cover max-w-none w-[calc(100%_+_(var(--slide-spacing)_*_2))] ml-[calc(var(--slide-spacing)_*_-1)]',
                      height,
                    )}
                    src={photo}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <LeftArrow disabled={prevBtnDisabled} onClick={scrollPrev} />
      <RightArrow disabled={nextBtnDisabled} onClick={scrollNext} />
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
      className="absolute top-1/2 left-2 z-10 transform -translate-y-1/2"
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
      className="absolute top-1/2 right-2 z-10 transform -translate-y-1/2"
      color="primary"
      disabled={disabled}
      isIconOnly
      onClick={onClick}
    >
      <IconChevronRight size={24} />
    </Button>
  );
}
