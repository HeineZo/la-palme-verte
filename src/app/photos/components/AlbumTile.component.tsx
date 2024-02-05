import { Photo } from "@prisma/client";
import BlogImage from "./BlogImage.component";

interface AlbumTileProps {
    cover?: Photo;
    title: string;
    description: string;
}

export default function AlbumTile({ cover, title, description }: AlbumTileProps) {
    return (
        <div className='flex flex-col gap-8 w-full max-w-7xl'>
            <BlogImage
                photo={cover}
                title={title}
                description={description}
            ></BlogImage>
        </div>
    )
}