'use client';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { getPhotos } from 'server/photo';
import Photo from './components/Photo.component';
import BecomeMember from '@/shared/components/BecomeMember.component';
import { Button } from '@nextui-org/react';
import { IconPlayerPlayFilled } from '@tabler/icons-react';
import Slideshow from './components/Slideshow.component';

export default function page() {
  const [onSlideshow, setOnSlideshow] = useState<boolean>(false);

  const { data, error, isFetched } = useQuery({
    queryKey: ['photos'],
    queryFn: async () => getPhotos(),
  });

  const toggleSlideshow = async (): Promise<void> => {
    console.log("presed")
    setOnSlideshow(!onSlideshow)
    if (!document.fullscreenElement) {
      await document.documentElement.requestFullscreen();
    } else {
      await document.exitFullscreen();
    }
  }

  // const organizePhotosInGrid = (photos) => {
  //   const grid: PhotoProps[] = [];
  //   let currentRow: PhotoProps[] = [];

  //   photos.forEach((photo, index) => {
  //     const isPortrait = photo.height > photo.width;
  //     const gridColumnSpan = isPortrait ? 'col-span-2' : 'col-span-1';

  //     currentRow.push(
  //       <div key={photo.id} className={`relative overflow-hidden aspect-w-1 aspect-h-1 ${gridColumnSpan}`}>
  //         <Photo
  //           photo={photo}
  //           className="object-cover w-full h-full"
  //         />
  //       </div>
  //     );

  //     // Check if the current row is full or if it's the last photo
  //     const isLastPhoto = index === photos.length - 1;
  //     const isRowFull = isPortrait ? currentRow.length === 1 : currentRow.length === 2;

  //     if (isRowFull || isLastPhoto) {
  //       grid.push(
  //         <div key={`row-${index}`} className="grid grid-cols-2 gap-4 md:grid-cols-4">
  //           {currentRow}
  //         </div>
  //       );

  //       // Start a new row
  //       currentRow = [];
  //     }
  //   });

  //   return grid;
  // };

  const photos = [
    'https://images.unsplash.com/photo-1500763702684-af70eba9a9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80',
    'https://images.unsplash.com/photo-1655149000913-88f86c38593f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1970&q=80',
    'https://images.unsplash.com/photo-1506434304575-afbb92660c28?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80',
    'https://images.unsplash.com/photo-1606043580455-bd22074d1e67?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
    'https://images.unsplash.com/photo-1450825404103-e02d63c0b624?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2073&q=80',
    'https://images.unsplash.com/photo-1450825404103-e02d63c0b624?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2073&q=80',
    'https://images.unsplash.com/photo-1655149002351-132042bee905?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2022&q=80',
    'https://images.unsplash.com/photo-1522055598936-5611c49b072f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
  ];

  if (error) return <div>{error.message}</div>;

  if (data?.data) {
    return (
      <>
        {!onSlideshow ? (
          <main>
            <section className="section flex gap-5 mt-12 flex-col">
              <div>
                <h1>Photos</h1>
                <p>
                  Découvrez les photos prises par nos adhérents lors de nos différents
                  ateliers et interventions
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
                <Photo
                  photo={data.data[1]}
                  title="Clean Walk à Séné."
                  description="Les 12  octobre 2023, nous avons poursuivis nos action par le biais d’une “clean walk”. C’est sur la plage de Langle, à Séné que nos adhérents ont pu participer à leur 1ère action écocitoyenne de cette année
                          universitaire.Grâce à la collaboration de l’association “les mains dans le sable” et
                          de la  fondation ubs, les membres de la
                          Palme Verte ont obtenu du matériel
                          (sacs et pinces) pour nettoyer cette plage et récolter 140 kg de déchets."
                ></Photo>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                  {data.data.map((photo) => (
                    <div
                      key={photo.id}
                      className="relative overflow-hidden aspect-w-1 aspect-h-1"
                    >
                      <Photo photo={photo} className="object-cover w-full h-full" />
                    </div>
                  ))}
                </div>
              </div>
            </section>
            <BecomeMember
              buttonTitle="Devenir adhérent"
              shortTitle="Devenez adhérent"
              title="Participez aux sorties et aux activités en devenant adhérent"
            >
              <Button className="w-fit text-accent" color="secondary">
                En savoir plus
              </Button>
            </BecomeMember>
          </main>
        ) : (
          <Slideshow photos={photos} toggleSlideshow={toggleSlideshow}></Slideshow>
        )}
      </>
    );
  }
}
