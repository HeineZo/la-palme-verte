'use client';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { getPhotos } from 'server/photo';
import Photo, { PhotoProps } from './components/Photo.component';

export default function page() {
  const { data, error, isFetched } = useQuery({
    queryKey: ['photos'],
    queryFn: async () => getPhotos(),
  });

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

  if (error) return <div>{error.message}</div>;

  if (data?.data) {
    return (
      <main>
        <section className="section flex gap-5 mt-12 flex-col">
          <h1>Photos</h1>
          <p>
            Découvrez les photos prises par nos adhérents lors de nos différents
            ateliers et interventions
          </p>
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
        </section>
      </main>
    );
  }
}
