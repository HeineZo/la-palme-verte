import { Album } from "@/class/Album.class";
import AlbumTile from "./AlbumTile.component";

interface AlbumBrowserProps {
    albums: Album[];
}

export default function AlbumBrowser({ albums }: AlbumBrowserProps) {

    return (<div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {albums.map((album) => (
            <div
                key={album.id}
                className="relative overflow-hidden aspect-w-1 aspect-h-1"
            >
                <AlbumTile cover={album.images[0].external.url} title={album.title} description={album.description} />
            </div>
        ))}
    </div>)
}