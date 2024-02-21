import { Album } from "@/class/Album.class";
import Image from "next/image";

interface AlbumTileProps {
    album: Album;
}

export default function AlbumTile({ album }: AlbumTileProps) {
    return (
        <a href={`/photos/${album.url}`}>
            <div className='relative max-w-7xl object-cover rounded-medium cursor-pointer'>
                <Image className="rounded-medium" key={album.images[0].file.url} src={album.images[0].file.url} alt={"Couverture de l'album"} width={640} height={360} />
                <div className="absolute inset-0 rounded-medium bg-gradient-to-t from-black via-transparent"></div>
                <div className="absolute bottom-7 left-7 text-white w-3/4">
                    <h4 className="truncate ...">{album.title}</h4>
                    <p className="truncate ...">{album.description}</p>
                </div>
            </div>
        </a>
    )
}