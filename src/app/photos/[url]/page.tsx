import { getAlbumByUrl } from 'server/album';
import Gallery from './components/Gallery';

interface AlbumProps {
  params: {
    url: string;
  };
}

export default async function page({ params }: AlbumProps) {
  const album = await getAlbumByUrl(params.url);

  return (
    <div className="flex justify-center w-full">
      <main className="max-w-7xl w-full">
        <section className="flex justify-between py-8 flex-col">
          <h1>{album.title}</h1>
          <p className="xl:w-1/2">{album.description}</p>
        </section>
        <Gallery images={album.images} />
      </main>
    </div>
  );
}
