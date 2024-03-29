import { Album } from "@/class/Album.class";
import AlbumTile from "./AlbumTile.component";
import Reveal from "@/shared/utils/Reveal.component";

interface AlbumBrowserProps {
    albums: Album[];
}

export default function AlbumBrowser({ albums }: AlbumBrowserProps) {

    return (
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 2xl:grid-cols-3">
            {albums.map((album, index) => album.images.length > 0 && (
                <Reveal index={index} key={album.id}>
                    <AlbumTile album={album} />
                </Reveal>
            ))
            }
        </div >
    )
}