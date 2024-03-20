import { getAlbumByUrl } from 'server/album';
import ZoomableImage from './components/ZoomableImage.component';
import { File } from '@/class/Album.class';

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
                    <section className="section flex justify-between mt-28 flex-col">
                        <h1>{album.title}</h1>
                        <p className='xl:w-1/2'>{album.description}</p>
                    </section>
                    <section className="section flex flex-col gap-5">
                        <div className="relative mx-auto flex flex-col xl:flex-row xl:items-start gap-5">
                            <div className="xl:w-1/2 relative">
                                <ZoomableImage
                                    src={album.images[0].file.url}
                                    imageName={"Couverture de l'album"}
                                />
                            </div>
                            <div className="xl:w-1/2 mt-4 lg:mt-0 grid md:grid-cols-1 lg:grid-cols-2 gap-5">
                                {album.images.slice(1, 5).map((image: File) => (
                                    <ZoomableImage src={image.file.url} imageName={image.name} />
                                ))}
                            </div>
                        </div>
                        <div className="mt-4 grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
                            {album.images.slice(5).map((image: File) => (
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
