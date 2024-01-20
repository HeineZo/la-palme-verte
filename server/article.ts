import { EArticleCategory } from '@/utils/enums';
import { BlogPost } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { ApiResponse } from './db/IApiResponse';
import { db } from './db/client';


///// GET /////

/**
 * Récupérer tous les articles
 * @returns {Promise<ApiResponse<BlogPost>>}
 */
export async function getArticles(): Promise<ApiResponse<BlogPost>> {
  try {
    const articles: BlogPost[] | null = await db.blogPost.findMany();
    return {
      data: articles,
      code: 200,
      message: 'Articles trouvés',
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
 * Récupérer un article par son identifiant
 * @param {BlogPost.id} id
 * @returns {Promise<ApiResponse<BlogPost>>}
 */
export async function getArticleById(
  id: number,
): Promise<ApiResponse<BlogPost>> {
  try {
    const article: BlogPost | null = await db.blogPost.findUnique({
      where: {
        id,
      },
    });
    return {
      data: article,
      code: 200,
      message: 'Article trouvé',
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
 * Récupere un article par ses categories
 * @param {EArticleCategory} category
 * @returns {Promise<ApiResponse<BlogPost>>}
 */
export async function getArticleByCategories(
  category: EArticleCategory,
): Promise<ApiResponse<BlogPost>> {
  const isValidCategories = category in EArticleCategory;
  if (!isValidCategories) {
    return {
      data: null,
      code: 500,
      message: 'Categorie inconnue',
    };
  }
  try {
    const articleByAuthorId: BlogPost[] = await db.blogPost.findMany({
      where: {
        categories: {
          some: {
            name: category,
          },
        },
      },
    });
    return {
      data: articleByAuthorId,
      code: 200,
      message: 'Article(s) trouvé(s)',
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
 * Récupere un article par son auteur
 * @param {BlogPost.AuthorId} AuthorId
 * @returns {Promise<ApiResponse<BlogPost>>}
 */
export async function getArticleByAuthorID(
  AuthorId: number,
): Promise<ApiResponse<BlogPost>> {
  try {
    const articleByCategories: BlogPost[] = await db.blogPost.findMany({
      where: {
        author: {
          id: AuthorId,
        },
      },
    });
    return {
      data: articleByCategories,
      code: 200,
      message: 'Article(s) trouvé(s)',
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
 * Récupere un article par son contenu ou son titre
 * @param {BlogPost.id} Content
 * @returns {Promise<ApiResponse<BlogPost>>}
 */
export async function getArticleByContent(
  Content: string,
): Promise<ApiResponse<BlogPost>> {
  try {
    const articleByCategories: BlogPost[] = await db.blogPost.findMany({
      where: {
        OR: [
          {
            content: {
              contains: Content,
            },
          },
          {
            title: {
              contains: Content,
            },
          },
        ],
      },
    });
    return {
      data: articleByCategories,
      code: 200,
      message: 'Article(s) trouvé(s)',
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
 * Récupere un article par sa durée de lecture
 * @param {BlogPost.readTime} time
 * @param {'lq' | 'lte' | 'eq' | 'gt' | 'gte'} operator
 * @returns {Promise<ApiResponse<BlogPost>>}
 */
export async function getArticleByRangeTime(
  time: number,
  operator: 'lq' | 'lte' | 'eq' | 'gt' | 'gte',
): Promise<ApiResponse<BlogPost>> {
  let articleByCategories: BlogPost[] = [];
  try {
    if (!(operator in ['lq', 'lte', 'eq', 'gt', 'gte'])) {
      return {
        data: null,
        code: 400,
        message: 'Operateur inconnu',
      };
    }
    if (operator === 'eq') {
      articleByCategories = await db.blogPost.findMany({
        where: {
          readTime: time,
        },
      });
    } else {
      articleByCategories = await db.blogPost.findMany({
        where: {
          readTime: {
            [operator]: time,
          },
        },
      });
    }
    return {
      data: articleByCategories,
      code: 200,
      message: 'Article(s) trouvé(s)',
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

///// POST /////

/**
 * Créer un article
 * @param {BlogPost} article
 * @returns {Promise<ApiResponse<BlogPost>>}
 */
export async function postArticle(
  article: BlogPost,
): Promise<ApiResponse<BlogPost>> {
  try {
    const newArticle: BlogPost = await db.blogPost.create({
      data: article,
    });
    return {
      data: newArticle,
      code: 201,
      message: 'Article créé',
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