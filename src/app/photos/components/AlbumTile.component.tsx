"use client"
import { Album } from '@/class/Album.class';
import { Image } from '@nextui-org/react';

interface AlbumTileProps {
  album: Album;
}

export default function AlbumTile({ album }: AlbumTileProps) {
  return (
    <a href={`/photos/${album.url}`}>
      <div className="relative max-w-7xl rounded-medium cursor-pointer hover:scale-105 transition-all w-full h-full bg-black">
        <Image
          className="z-0 rounded-medium object-cover"
          key={album.id}
          src={album.cover}
          alt="Couverture de l'album"
        />
        <div className="absolute inset-0 rounded-medium bg-gradient-to-t from-black via-transparent" />
        <div className="absolute bottom-7 left-7 text-white w-3/4">
          <h5 className="text-left truncate lg:text-3xl">{album.title}</h5>
          <p className="text-left truncate">{album.description}</p>
        </div>
      </div>
    </a>
  );
}
