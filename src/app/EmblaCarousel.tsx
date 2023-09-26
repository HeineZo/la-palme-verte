"use client";

import type { EmblaCarouselType, EmblaOptionsType } from "embla-carousel-react";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";

type PropType = {
    slides: number[];
    options?: EmblaOptionsType;
};

export const EmblaCarousel = (props: PropType) => {
    const { slides, options } = props;
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });
    const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
    const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

    const scrollPrev = useCallback(
        () => emblaApi && emblaApi.scrollPrev(),
        [emblaApi]
    );
    const scrollNext = useCallback(
        () => emblaApi && emblaApi.scrollNext(),
        [emblaApi]
    );

    const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
        setPrevBtnDisabled(!emblaApi.canScrollPrev());
        setNextBtnDisabled(!emblaApi.canScrollNext());
    }, []);

    useEffect(() => {
        if (!emblaApi) return;

        onSelect(emblaApi);
        emblaApi.on("reInit", onSelect);
        emblaApi.on("select", onSelect);
    }, [emblaApi, onSelect]);

    return (
        <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
                {slides.map((index) => (
                    <img
                        key={index}
                        className="flex-[0_0_100%] min-w-0"
                        src={`/assets/images/association/slide-${
                            index + 1
                        }.jpg`}
                        alt=""
                    />
                ))}
                {/* <div className="flex-[0_0_100%] min-w-0">Slide 1</div>
                <div className="flex-[0_0_100%] min-w-0">Slide 2</div>
                <div className="flex-[0_0_100%] min-w-0">Slide 3</div> */}
            </div>
        </div>
    );
};
