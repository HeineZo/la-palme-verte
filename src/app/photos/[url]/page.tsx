import { useState } from "react";
import { IconPlayerPlayFilled } from '@tabler/icons-react';
import { Button } from "@nextui-org/react";
import { getAlbumByUrl } from "server/album";
import Image from "next/image";

interface AlbumProps {
    params: {
        url: string;
    };
}

/**
 * Page d'albums
 * @param params URL de l'album
 */
export default async function page({ params }: AlbumProps) {
    const album = await getAlbumByUrl(params.url)
    const mainPhoto = album.images.shift();
    const onSlideshow = false;
    // const [onSlideshow, setOnSlideshow] = useState<boolean>(false);

    // const toggleSlideshow = async (): Promise<void> => {
    //     setOnSlideshow(!onSlideshow)
    //     if (!document.fullscreenElement) {
    //         await document.documentElement.requestFullscreen();
    //     } else {
    //         await document.exitFullscreen();
    //     }
    // }
    return (
        <>
            {!onSlideshow ? (
                <main>
                    <section className="section flex gap-5 mt-12 flex-col">
                        <div className='relative max-w-7xl w-full h-full'>
                            <Image key={1} src={mainPhoto?.file.url ?? "https://www.independentmediators.co.uk/wp-content/uploads/2016/02/placeholder-image.jpg"} alt={"Couverture de l'album"} width={1280} height={720} quality={100} />
                            <div className="absolute bottom-7 left-7 text-white w-3/4">
                                <h3>{album.title}</h3>
                                <p>{album.description}</p>
                            </div>
                        </div>
                        {/* <Button
                            className="w-fit"
                            color="primary"
                            endContent={<IconPlayerPlayFilled size={16} />}
                            onPress={toggleSlideshow}
                        > Lancer le diaporama</Button> */}
                    </section>
                    <section className="section py-0 flex flex-col items-center">
                        {album.images.map((image) => (
                            <Image key={image.name} src={image.file.url} alt={image.name} width={1280} height={720} />
                        ))}
                    </section>
                </main>
            ) : (<div></div>)}
        </>
    )
}