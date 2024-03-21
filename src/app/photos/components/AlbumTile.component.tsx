import { Album } from '@/class/Album.class';
import { Image } from '@nextui-org/react';

interface AlbumTileProps {
  album: Album;
}

export default function AlbumTile({ album }: AlbumTileProps) {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- test
  const albumSrc = album.images[0]?.file?.url ?? '';
  return (
    <a href={`/photos/${album.url}`}>
      <div className="relative max-w-7xl rounded-medium cursor-pointer hover:scale-105 transition-all">
        <Image
          className="z-0 rounded-medium object-cover"
          key={album.id}
          src={albumSrc}
          alt="Couverture de l'album"
        />
        <div className="absolute inset-0 rounded-medium bg-gradient-to-t from-black via-transparent" />
        <div className="absolute bottom-7 left-7 text-white w-3/4">
          <h4 className="truncate">{album.title}</h4>
          <p className="truncate">{album.description}</p>
        </div>
      </div>
    </a>
  );
}
