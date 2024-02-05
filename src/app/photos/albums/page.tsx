import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getPhotos } from "server/photo";
import { IconPlayerPlayFilled } from '@tabler/icons-react';
import { Button } from "@nextui-org/react";
import BlogImage from "../components/BlogImage.component";

export default function page() {
    const [onSlideshow, setOnSlideshow] = useState<boolean>(false);

    const { data, error, isFetched } = useQuery({
        queryKey: ['photos'],
        queryFn: async () => getPhotos(),
    });

    const toggleSlideshow = async (): Promise<void> => {
        setOnSlideshow(!onSlideshow)
        if (!document.fullscreenElement) {
            await document.documentElement.requestFullscreen();
        } else {
            await document.exitFullscreen();
        }
    }

    if (error) return <div>{error.message}</div>;

    if (data?.data) {
        return (
            <>
                {!onSlideshow ? (
                    <main>
                        <section className="section flex gap-5 mt-12 flex-col">
                            <div>
                                <h1>Clean Walk à Séné.</h1>
                                <p>
                                    Les 12  octobre 2023, nous avons poursuivis nos action par le biais d’une “clean walk”. C’est sur la plage de Langle, à Séné que nos adhérents ont pu participer à leur 1ère action écocitoyenne de cette année
                                    universitaire.Grâce à la collaboration de l’association “les mains dans le sable” et
                                    de la  fondation ubs, les membres de la
                                    Palme Verte ont obtenu du matériel
                                    (sacs et pinces) pour nettoyer cette plage et récolter 140 kg de déchets.
                                </p>
                            </div>
                            <Button
                                className="w-fit"
                                color="primary"
                                endContent={<IconPlayerPlayFilled size={16} />}
                                onPress={toggleSlideshow}
                            > Lancer le diaporama</Button>
                        </section>
                        <section className="section py-0 flex flex-col items-center">
                            <div className='flex flex-col gap-8 w-full max-w-7xl'>
                                <BlogImage
                                    photo={data.data[1]}
                                    title="Clean Walk à Séné."
                                    description="Les 12  octobre 2023, nous avons poursuivis nos action par le biais d’une “clean walk”. C’est sur la plage de Langle, à Séné que nos adhérents ont pu participer à leur 1ère action écocitoyenne de cette année
                          universitaire.Grâce à la collaboration de l’association “les mains dans le sable” et
                          de la  fondation ubs, les membres de la
                          Palme Verte ont obtenu du matériel
                          (sacs et pinces) pour nettoyer cette plage et récolter 140 kg de déchets."
                                ></BlogImage>
                                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                                    {data.data.map((photo) => (
                                        <div
                                            key={photo.id}
                                            className="relative overflow-hidden aspect-w-1 aspect-h-1"
                                        >
                                            <BlogImage photo={photo} className="object-cover w-full h-full" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>
                    </main>
                ) : (<div></div>)}
            </>
        )
    }
}