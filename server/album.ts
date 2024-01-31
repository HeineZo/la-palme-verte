import { Album } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { ApiResponse } from './db/IApiResponse';
import { db } from './db/client';

///// GET /////

/**
 * Récupérer tous les albums
 * @returns {Promise<ApiResponse<Album>>}
 */
export async function getAlbums(): Promise<ApiResponse<Album>> {
  try {
    const albums: Album[] | null = await db.album.findMany();
    return {
      data: albums,
      code: 200,
      message: 'Albums trouvés',
    };
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      return {
        data: [],
        code: parseInt(error.code),
        message: error.message,
      };
    }
    return {
      data: null,
      code: 500,
      message: 'Erreur interne du serveur, inconnu',
    };
  }
}

/**
 * Récupérer un album par son identifiant
 * @param {Album.id} id
 * @returns {Promise<ApiResponse<Album>>}
 */
export async function getAlbumById(
  id: number,
): Promise<ApiResponse<Album>> {
  try {
    const album: Album | null = await db.album.findUnique({
      where: {
        id,
      },
    });
    return {
      data: album,
      code: 200,
      message: 'Album trouvé',
    };
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      return {
        data: null,
        code: parseInt(error.code),
        message: error.message,
      };
    }
    return {
      data: null,
      code: 500,
      message: 'Erreur interne du serveur, inconnu',
    };
  }
}