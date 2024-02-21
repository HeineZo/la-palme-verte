import { useState } from "react";
import { IconPlayerPlayFilled } from '@tabler/icons-react';
import { Button } from "@nextui-org/react";
import BlogImage from "../components/BlogImage.component";
import { getAlbumByUrl } from "server/album";

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
    const [onSlideshow, setOnSlideshow] = useState<boolean>(false);

    const toggleSlideshow = async (): Promise<void> => {
        setOnSlideshow(!onSlideshow)
        if (!document.fullscreenElement) {
            await document.documentElement.requestFullscreen();
        } else {
            await document.exitFullscreen();
        }
    }
    return (
        <>
            {!onSlideshow ? (
                <main>
                    <section className="section flex gap-5 mt-12 flex-col">
                        <div>
                            <h1>{album.title}</h1>
                            <p>{album.description}</p>
                        </div>
                        <Button
                            className="w-fit"
                            color="primary"
                            endContent={<IconPlayerPlayFilled size={16} />}
                            onPress={toggleSlideshow}
                        > Lancer le diaporama</Button>
                    </section>
                    <section className="section py-0 flex flex-col items-center">
                        <div className='flex flex-col gap-8 w-full max-w-7xl'>
                            <BlogImage
                                photo={mainPhoto?.external.url}
                                title={album.title}
                                description={album.description}
                            ></BlogImage>
                            {album.images.map((image) => (<BlogImage photo={image.external.url} />))}
                        </div>
                    </section>
                </main>
            ) : (<div></div>)}
        </>
    )
}