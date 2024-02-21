import BlogImage from "./BlogImage.component";

interface AlbumTileProps {
    cover?: string;
    title: string;
    description: string;
}

export default function AlbumTile({ cover, title, description }: AlbumTileProps) {
    return (
        <div className='flex flex-col gap-8 max-w-7xl object-cover w-full h-full'>
            <BlogImage
                photo={cover}
                title={title}
                description={description}
            ></BlogImage>
        </div>
    )
}