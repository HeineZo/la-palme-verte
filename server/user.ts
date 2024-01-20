import { User } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { ApiResponse } from './db/IApiResponse';
import { db } from './db/client';

///// GET /////

/**
 * Récupérer tous les Utilisateurs
 * @returns {Promise<ApiResponse<User>>}
 */
export async function getArticles(): Promise<ApiResponse<User>> {
  try {
    const users: User[] | null = await db.user.findMany();
    return {
      data: users,
      code: 200,
      message: 'Utilisateur(s) trouvé(s)',
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
 * Récupérer un Utilisateur par son identifiant
 * @param {User.id} id
 * @returns {Promise<ApiResponse<User>>}
 */
export async function getArticleById(
  id: number,
): Promise<ApiResponse<User>> {
  try {
    const user: User | null = await db.user.findUnique({
      where: {
        id,
      },
    });
    return {
      data: user,
      code: 200,
      message: 'Utilisateur trouvé',
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

/**
 * Récupérer des Utilisateur par leur role
 * @param {'Admin' | 'Membre' | 'Adherent'} role
 * @returns {Promise<ApiResponse<User>>}
 */
export async function getArticleByRole(
  role: 'Admin' | 'Membre' | 'Adherent',
): Promise<ApiResponse<User>> {
  try {
    if (['Admin', 'Membre', 'Adherent'].includes(role)) {
      return {
        data: null,
        code: 400,
        message: 'Le role doit être Admin, Membre ou Adherent',
      };
    }
    const users: User[] | null = await db.user.findMany({
      where: {
        role
      },
    });
    return {
      data: users,
      code: 200,
      message: 'Utilisateur(s) trouvé(s)',
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