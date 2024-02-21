import PhotoCarrousel from "@/shared/components/PhotoCarrousel.component";
import { Button } from "@nextui-org/react";
import { IconPlayerStopFilled } from "@tabler/icons-react";

interface SlideshowProps {
    photos: string[]
    toggleSlideshow: () => Promise<void>
}

export default function Slideshow({ photos, toggleSlideshow }: SlideshowProps) {
    return (
        <main>
            <section>
                <Button
                    className="w-fit"
                    color="primary"
                    endContent={<IconPlayerStopFilled size={16} />}
                    onPress={toggleSlideshow}
                > Arrêter le diaporama</Button>
                <PhotoCarrousel photos={photos}></PhotoCarrousel>
            </section>
        </main>
    )
}