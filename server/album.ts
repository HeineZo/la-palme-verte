/* eslint-disable camelcase -- Utilisation des attributs de Notion */
import 'server-only';

import { ImageBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import { notionClient } from './database';
import { Album } from '@/class/Album.class';

const database_id = process.env.ALBUM_DATABASE ?? '';

/**
 * Récupérer tous les albums
 * @returns {Promise<ApiResponse<Album>>}
 */
export const getAlbums = async () => {
  const response = await notionClient.databases.query({ database_id });
  const albumsPromises = response.results.map((result) =>
    Album.fromNotion(result),
  );
  const albums = await Promise.all(albumsPromises);

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
