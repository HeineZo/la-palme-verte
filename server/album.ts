import { Album } from '@/class/Album.class';
import {
  BlockObjectResponse,
  ImageBlockObjectResponse,
  ListBlockChildrenResponse,
  PageObjectResponse,
  PartialPageObjectResponse,
  QueryDatabaseResponse,
} from '@notionhq/client/build/src/api-endpoints';
import { notionClient } from './notionClient';
import { clone } from '@/utils/utils';

const databaseId = process.env.GALLERY_DATABASE ?? '';
const numberOfLatestImages: number = parseInt(
  process.env.NUMBER_OF_LATEST_IMAGES || '-6',
  10,
);
const defaultAlbum: PageObjectResponse = {
  parent: { type: 'page_id', page_id: '' },
  properties: {
    files: {
      id: '',
      type: 'files',
      files: [],
    },
  },
  icon: null,
  cover: null,
  created_by: { id: '', object: 'user' },
  last_edited_by: { id: '', object: 'user' },
  object: 'page',
  id: '',
  created_time: '',
  last_edited_time: '',
  archived: false,
  in_trash: false,
  url: '',
  public_url: null,
};

/**
 * Récupérer tous les albums
 * @param max Nombre maximum d'albums à récupérer (optionnel)
 * @returns {Promise<Album[]>}
 */
export const getAlbums = async (max?: number): Promise<Album[]> => {
  const response: QueryDatabaseResponse = await notionClient.databases.query({
    filter: {
      property: 'État',
      status: {
        equals: 'Publié',
      },
    },
    page_size: max,
    databaseId
  });

  const albums = await Promise.all(
    response.results
      .filter(
        (result): result is PageObjectResponse | PartialPageObjectResponse =>
          result.object === 'page',
      )
      .map((result) => {
        let fullResult: PageObjectResponse;
        if ('properties' in result) {
          fullResult = result;
        } else {
          fullResult = { ...defaultAlbum, ...result };
        }

        return Album.fromNotion(fullResult);
      }),
  );
  return clone(albums);
};

/**
 * Récupérer les images d'un album
 * @param albumId Identifiant de l'album
 * @returns Liste des images
 */
export const getAlbumImages = async (
  albumId: string,
): Promise<ImageBlockObjectResponse[]> => {
  const response: ListBlockChildrenResponse =
    await notionClient.blocks.children.list({
      block_id: albumId,
    });

  return response.results
    .filter((block): block is BlockObjectResponse => 'type' in block)
    .filter(
      (block): block is ImageBlockObjectResponse => block.type === 'image',
    )
    .map((block) => {
      const safeBlock: ImageBlockObjectResponse = {
        ...block,
        image: block.image,
      };
      return safeBlock;
    });
};

/**
 * Récupérer un album par son URL
 * @param url URL de l'album
 * @returns Album retrouvé ou null si non trouvé
 */
export const getAlbumByUrl = async (url: string): Promise<Album | null> => {
  const response: QueryDatabaseResponse = await notionClient.databases.query({
    filter: {
      property: 'URL',
      rich_text: {
        equals: url,
      },
    },
    databaseId
  });

  const firstResult = response.results[0];

  if (firstResult.object === 'page') {
    let fullResult: PageObjectResponse;

    if ('properties' in firstResult) {
      fullResult = firstResult;
    } else {
      fullResult = { ...defaultAlbum, ...firstResult };
    }
    return Album.fromNotion(fullResult);
  }
  return null;
};

/**
 * Retourne les dernières photos publiées
 * @returns Les dernières photos publiées
 */
export const getLatestImages = async (): Promise<string[]> => {
  const response: QueryDatabaseResponse = await notionClient.databases.query({
    sorts: [
      {
        timestamp: 'created_time',
        direction: 'descending',
      },
    ],
    databaseId
  });

  const latestImages: string[] = [];

  const filteredResults = response.results.filter(
    (result): result is PageObjectResponse | PartialPageObjectResponse =>
      result.object === 'page',
  );

  for (const result of filteredResults) {
    let fullResult: PageObjectResponse;
    if ('properties' in result) {
      fullResult = result;
    } else {
      fullResult = { ...defaultAlbum, ...result };
    }

    const album = Album.fromNotion(fullResult);

    for (const image of album.images) {
      if (latestImages.length < numberOfLatestImages) {
        latestImages.push(image.url);
      } else {
        return latestImages;
      }
    }
  }
  return latestImages;
};
