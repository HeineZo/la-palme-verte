import { useState } from 'react';
import { IconPlayerPlayFilled } from '@tabler/icons-react';
import { Button, Image } from '@nextui-org/react';
import { getAlbumByUrl } from 'server/album';
import ZoomableImage from './components/ZoomableImage.component';
import Zoom from 'smooth-zoom';

interface AlbumProps {
    params: {
        url: string;
    };
}

export default async function page({ params }: AlbumProps) {
    const album = await getAlbumByUrl(params.url);
    const onSlideshow = false;

    return (
        <>
            {!onSlideshow ? (
                <main>
                    <section className="section flex flex-col gap-5 mt-12">
                        <div className="relative mx-auto flex flex-col xl:flex-row xl:items-start xl:gap-5">
                            <div className="xl:w-1/2 relative">
                                <Image
                                    className="z-0 lg:w-full rounded-medium"
                                    src={album.images[0].file.url}
                                    alt={"Couverture de l'album"}
                                />
                                <div className="absolute inset-0 rounded-medium bg-gradient-to-t from-black via-transparent"></div>
                                <div className="absolute bottom-7 left-7 text-white w-3/4">
                                    <h4>{album.title}</h4>
                                    <p>{album.description}</p>
                                </div>
                            </div>
                            <div className="xl:w-1/2 mt-4 lg:mt-0 grid grid-cols-2 gap-4">
                                {album.images.slice(1, 5).map((image) => (
                                    <ZoomableImage src={image.file.url} imageName={image.name} />
                                ))}
                            </div>
                        </div>
                        <div className="mt-4 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {album.images.slice(5).map((image) => (
                                <ZoomableImage src={image.file.url} imageName={image.name} />
                            ))}
                        </div>
                    </section>
                </main>
            ) : (
                <div></div>
            )}
        </>
    );
}
