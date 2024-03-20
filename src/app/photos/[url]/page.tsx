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
        <div className='flex justify-center'>
            {!onSlideshow ? (
                <main className='max-w-7xl'>
                    <section className="flex justify-between py-8 flex-col">
                        <h1>{album.title}</h1>
                        <p className='xl:w-1/2'>{album.description}</p>
                    </section>
                    <section className="flex flex-col gap-4">
                        {album.images.map((image, index) => (
                            <div key={index} className={`relative mx-auto flex gap-4 ${index % 2 === 0 ? 'xl:flex-row' : 'xl:flex-row-reverse'} flex-col`}>
                                <div className="xl:w-1/2 relative">
                                    <ZoomableImage
                                        src={image.file.url}
                                        imageName={index === 0 ? "Couverture de l'album" : image.name}
                                    />
                                </div>
                                <div className="xl:w-1/2 mt-4 lg:mt-0 grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {album.images.slice(index + 1, index + 5).map((subImage, subIndex) => (
                                        <ZoomableImage key={subIndex} src={subImage.file.url} imageName={subImage.name} />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </section>
                </main >
            ) : (
                <div></div>
            )
            }
        </div>
    );
}
