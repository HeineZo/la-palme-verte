/* eslint-disable @typescript-eslint/no-misused-promises -- Temporary fix */
"use client"
import { Album } from '@/class/Album.class';
import { Image } from '@nextui-org/react';
import { useState } from 'react';
import { getAlbum } from 'server/album';

interface AlbumTileProps {
  album: Album;
}

export default function AlbumTile({ album }: AlbumTileProps) {
  const albumSrc = album.images[0]?.file?.url ?? '';
  const [imageSrc, setImageSrc] = useState(albumSrc)
  return (
    <a href={`/photos/${album.url}`}>
      <div className="relative max-w-7xl rounded-medium cursor-pointer hover:scale-105 transition-all">
        <Image
          className="z-0 rounded-medium object-cover"
          key={album.id}
          src={imageSrc}
          alt="Couverture de l'album"
          onError={async () => {
              const response = await getAlbum(album.id);
            
            // const res = clone(await getChangelogImageSrc(album.id));
            setImageSrc(response.images[0].file.url);
          }}
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
