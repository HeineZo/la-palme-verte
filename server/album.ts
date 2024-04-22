/* eslint-disable camelcase -- Utilisation des attributs de Notion */
import { Album } from '@/class/Album.class';
import {
  GetPageResponse,
  ImageBlockObjectResponse,
  PageObjectResponse,
  PartialPageObjectResponse,
} from '@notionhq/client/build/src/api-endpoints';
import { notionClient } from './notionClient';
import { clone } from '@/utils/utils';

const database_id = process.env.GALLERY_DATABASE ?? '';
const numberOfLatestImages: number = parseInt(
  process.env.NUMBER_OF_LATEST_IMAGES || '-6',
  10,
);

export const getAlbum = async (id: string) => {
  const response: GetPageResponse = await notionClient.pages.retrieve({
    page_id: id,
  });

  if ('properties' in response && 'title' in response.properties) {
    return Album.fromNotion(response);
  }
  const defaultAlbum: PageObjectResponse = {
    id: '',
    properties: {
      title: {
        type: 'title',
        title: [
          {
            type: 'text',
            text: { content: '', link: null },
            annotations: {
              bold: false,
              code: false,
              italic: false,
              color: 'default',
              underline: false,
              strikethrough: false,
            },
            href: null,
            plain_text: '',
          },
        ],
        id: '',
      },
      files: {
        type: 'files',
        files: [{ file: { url: '', expiry_time: '' }, name: '' }],
        id: '',
      },
    },
    url: '',
    parent: {
      type: 'database_id',
      database_id: '',
    },
    icon: null,
    cover: null,
    created_by: {
      id: '',
      object: 'user',
    },
    last_edited_by: {
      id: '',
      object: 'user',
    },
    object: 'page',
    created_time: '',
    last_edited_time: '',
    archived: false,
    in_trash: false,
    public_url: null,
  };
  const partialResponse: PartialPageObjectResponse = response;
  const fullResponse: PageObjectResponse = {
    ...defaultAlbum,
    ...partialResponse,
  };
  return Album.fromNotion(fullResponse);
};

/**
 * Récupérer tous les albums
 * @param max Nombre maximum d'albums à récupérer (optionnel)
 * @returns {Promise<ApiResponse<Album>>}
 */
export const getAlbums = async (max?: number) => {
  const response = await notionClient.databases.query({
    filter: {
      property: 'État',
      status: {
        equals: 'Publié',
      },
    },
    page_size: max,
    database_id,
  });
  const albumsPromises = response.results
    .filter(
      (result): result is PageObjectResponse =>
        'parent' in result && 'properties' in result,
    )
    .map((result) => Album.fromNotion(result));
  const albums = clone(await Promise.all(albumsPromises));

  return albums;
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

  const firstResult = response.results[0];
  if ('parent' in firstResult && 'properties' in firstResult) {
    return Album.fromNotion(firstResult as PageObjectResponse);
  }
};

/**
 * Retourne les dernières photos publiées
 * @returns Les dernières photos publiées
 */
// export const getLatestImages = async () => {
//   const response = await notionClient.databases.query({
//     sorts: [
//       {
//         timestamp: 'created_time',
//         direction: 'descending',
//       },
//     ],
//     database_id,
//   });

//   let index = 0;
//   const images: string[] = [];

//   while (
//     images.length < numberOfLatestImages &&
//     index < response.results.length
//   ) {
//     const result = response.results[index];

//     if ('parent' in result && 'properties' in result) {
//       const album = Album.fromNotion(result as PageObjectResponse);


//       if (album.images.length > 0) {
//         const numberOfImagesToAdd = numberOfLatestImages - images.length;
//         const urlImages = album.images.filter(image => image.type === 'url');
      
//         const imagesToAdd = urlImages
//           .slice(0, numberOfImagesToAdd)
//           .map((image: { url: string }) => image.url);
      
//         images.push(...imagesToAdd);
//       }
      

//     index++;
//   }

//   return images;
// };
