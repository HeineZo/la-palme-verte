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
    <main>
      <section className="section flex justify-between py-8 flex-col">
        <h1>{album?.title ?? "Aucun titre"}</h1>
        <p className="xl:w-1/2">{album?.description ?? "Aucune description"}</p>
      </section>
      <Gallery images={album?.images ?? []} />
    </main>
  );
}
