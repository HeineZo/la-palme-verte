import { Album } from '@/class/Album.class';
import {
  BlockObjectResponse,
  GetPageResponse,
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

export const getAlbum = async (id: string): Promise<Album> => {
  try {
    const response: GetPageResponse = await notionClient.pages.retrieve({
      page_id: id,
    });

    if ('properties' in response && 'title' in response.properties) {
      return Album.fromNotion(response);
    }

    // Si la réponse est partielle ou non conforme, on fusionne avec un objet par défaut
    const defaultAlbum: Partial<PageObjectResponse> = {
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
          id: '',
          type: 'files',
          files: [],
        },
      },
      url: '',
    };

    const fullResponse: PageObjectResponse = {
      ...defaultAlbum,
      ...(response as PartialPageObjectResponse),
    } as PageObjectResponse;

    return Album.fromNotion(fullResponse);
  } catch (error) {
    throw new Error(
      `Impossible de récupérer l'album: ${(error as Error).message}`,
    );
  }
};

/**
 * Récupérer tous les albums
 * @param max Nombre maximum d'albums à récupérer (optionnel)
 * @returns {Promise<Album[]>}
 */
export const getAlbums = async (max?: number): Promise<Album[]> => {
  try {
    const response: QueryDatabaseResponse = await notionClient.databases.query({
      filter: {
        property: 'État',
        status: {
          equals: 'Publié',
        },
      },
      page_size: max,
      database_id: databaseId,
    });
    const albums = await Promise.all(
      response.results
        .filter(
          (result): result is PageObjectResponse => 'properties' in result,
        )
        .map(async (result) => {
          try {
            return Promise.resolve(Album.fromNotion(result));
          } catch (error) {
            return null;
          }
        }),
    );
    return clone(albums.filter((album): album is Album => album !== null));
  } catch (error) {
    return [];
  }
};

/**
 * Récupérer les images d'un album
 * @param albumId Identifiant de l'album
 * @returns Liste des images
 */
export const getAlbumImages = async (
  albumId: string,
): Promise<ImageBlockObjectResponse[]> => {
  try {
    const response: ListBlockChildrenResponse =
      await notionClient.blocks.children.list({
        block_id: albumId,
      });

    return response.results.filter(
      (block): block is ImageBlockObjectResponse =>
        (block as BlockObjectResponse).type === 'image',
    );
  } catch (error) {
    console.error(
      `Erreur lors de la récupération des images de l'album ${albumId}:`,
      error,
    );
    return [];
  }
};

/**
 * Récupérer un album par son URL
 * @param url URL de l'album
 * @returns Album retrouvé ou null si non trouvé
 */
export const getAlbumByUrl = async (url: string): Promise<Album | null> => {
  try {
    const response: QueryDatabaseResponse = await notionClient.databases.query({
      filter: {
        property: 'URL',
        rich_text: {
          equals: url,
        },
      },
      database_id: databaseId,
    });

    const firstResult = response.results[0];
    if ('parent' in firstResult && 'properties' in firstResult) {
      return Album.fromNotion(firstResult as PageObjectResponse);
    }
    return null;
  } catch (error) {
    return null;
  }
};

/**
 * Retourne les dernières photos publiées
 * @returns Les dernières photos publiées
 */
export const getLatestImages = async (): Promise<string[]> => {
  try {
    const response: QueryDatabaseResponse = await notionClient.databases.query({
      sorts: [
        {
          timestamp: 'created_time',
          direction: 'descending',
        },
      ],
      database_id: databaseId,
    });

    const images: string[] = [];

    for (const result of response.results) {
      if ('properties' in result) {
        try {
          const album = Album.fromNotion(result as PageObjectResponse);
          for (const image of album.images) {
            if (images.length < numberOfLatestImages) {
              images.push(image.url);
            } else {
              return images;
            }
          }
        } catch (error) {
          console.error("Erreur lors du traitement d'un album:", error);
        }
      }
    }

    return images;
  } catch (error) {
    console.error(
      'Erreur lors de la récupération des dernières images:',
      error,
    );
    return [];
  }
};
