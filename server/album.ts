/* eslint-disable camelcase -- Utilisation des attributs de Notion */
import { Album } from '@/class/Album.class';
import { ImageBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import { notionClient } from './database';
import { clone } from '@/utils/utils';

const database_id = process.env.GALLERY_DATABASE ?? '';
const numberOfLatestImages: number = parseInt(
  process.env.NUMBER_OF_LATEST_IMAGES || '-6',
  10,
);

export const getAlbum = async (id: string) => {
  const response = await notionClient.pages.retrieve({ page_id: id });

  return Album.fromNotion(response);
}

/**
 * Récupérer tous les albums
 * @returns {Promise<ApiResponse<Album>>}
 */
export const getAlbums = async () => {
  const response = await notionClient.databases.query({ database_id });
  const albumsPromises = response.results.map((result) =>
    Album.fromNotion(result),
  );
  const albums = clone(await Promise.all(albumsPromises));

  return albums.reverse();
};

/**
 * Récupérer les images d'un album
 * @param albumId Identifiant de l'album
 * @returns Liste des images
 */
export const getAlbumImages = async (albumId: string) => {
  const response = await notionClient.blocks.children.list({
    block_id: albumId,
  });
  return response.results as ImageBlockObjectResponse[];
};

/**
 * Récupérer un album par son URL
 * @param url URL de l'album
 * @returns Album retrouvé
 */
export const getAlbumByUrl = async (url: string) => {
  const response = await notionClient.databases.query({
    filter: {
      property: 'URL',
      rich_text: {
        equals: url,
      },
    },
    database_id,
  });

  return Album.fromNotion(response.results[0]);
};

export const getLatestImages = async () => {
  const response = await notionClient.databases.query({
    sorts: [
      {
        timestamp: 'created_time',
        direction: 'descending',
      },
    ],
    database_id,
  });

  let index = 0;
  const images: string[] = [];

  while (
    images.length < numberOfLatestImages &&
    index < response.results.length
  ) {
    const album = Album.fromNotion(response.results[index]);

    if (album.images.length > 0) {
      images.push(
        ...album.images
          .slice(numberOfLatestImages * -1 - images.length)
          .map((image) => image.file.url),
      );
    }

    index++;
  }

  return images;
};
