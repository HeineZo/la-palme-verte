'use server';
import { BlogPost } from '@/class/BlogPost.class';
import { clone } from '@/utils/utils';
import {
  BlockObjectResponse,
  PageObjectResponse,
  PartialPageObjectResponse,
  QueryDatabaseResponse,
} from '@notionhq/client/build/src/api-endpoints';
import { notionClient } from './notionClient';

const databaseId = process.env.BLOG_DATABASE ?? '';
const defaultBlogPost: PageObjectResponse = {
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

export interface GetArticlesResponse {
  articles: BlogPost[];
  hasMore: boolean;
  nextArticle: string | undefined;
}

/**
 * Récupère les articles de blog avec une pagination
 * @param category Catégorie des articles à récupérer
 * @param lastArticleId Indice du dernier article à partir duquel récupérer le reste
 * @returns Liste des articles
 */
export const getArticles = async (
  category?: string | null,
  lastArticleId?: string,
  maxArticlesProps?: number,
): Promise<GetArticlesResponse> => {
  const maxArticles =
    maxArticlesProps || Number(process.env.NEXT_PUBLIC_ARTICLES_PER_PAGE);
  const response = await notionClient.databases.query({
    filter: {
      and: [
        {
          property: 'État',
          status: {
            equals: 'Publié',
          },
        },
        category
          ? {
              property: 'Catégories',
              multi_select: {
                contains: category,
              },
            }
          : {
              or: [],
            },
      ],
    },
    start_cursor: lastArticleId,
    page_size: maxArticles,
    databaseId
  });

  const blogPosts = await Promise.all(
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
          fullResult = { ...defaultBlogPost, ...result };
        }

        return BlogPost.fromNotion(fullResult);
      }),
  );

  return {
    articles: clone(blogPosts),
    hasMore: response.has_more,
    nextArticle: response.next_cursor ?? undefined,
  };
};

/**
 * Retourne les articles de blog correspondant à un texte
 * @param text Texte à rechercher
 * @returns Articles correspondant
 */
export const getArticlesByText = async (text: string) => {
  const response: QueryDatabaseResponse = await notionClient.databases.query({
    filter: {
      and: [
        {
          property: 'État',
          status: {
            equals: 'Publié',
          },
        },
        {
          or: [
            {
              property: 'Titre',
              title: {
                contains: text,
              },
            },
            {
              property: 'Description',
              rich_text: {
                contains: text,
              },
            },
          ],
        },
      ],
    },
    databaseId
  });

  const articles = await Promise.all(
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
          fullResult = { ...defaultBlogPost, ...result };
        }

        return BlogPost.fromNotion(fullResult);
      }),
  );
  return clone(articles);
};

/**
 * Récupérer toutes les catégories des articles disponibles
 */
export const getCategories = async () => {
  const response: QueryDatabaseResponse = await notionClient.databases.query({
    filter: {
      property: 'État',
      status: {
        equals: 'Publié',
      },
    },
    databaseId
  });

  const filteredResults = await Promise.all(
    response.results
      .filter(
        (result): result is PageObjectResponse | PartialPageObjectResponse =>
          result.object === 'page',
      )
      .map((result) => {
        if ('properties' in result) {
          return result;
        }
        return { ...defaultBlogPost, ...result };
      }),
  );
  const categories = filteredResults.map((result) =>
    result.properties.Catégories.type === 'multi_select'
      ? result.properties.Catégories.multi_select.map(
          (category: { id: string; name: string; color: string }) => ({
            name: category.name,
          }),
        )
      : {
          name: '',
        },
  );

  return Array.from(
    new Set(categories.flat().map((category) => category.name)),
  );
};

/**
 * Récupérer le contenu d'une page d'article
 * @param pageId Identifiant de la page
 * @returns Contenu de la page
 */
export const getPageContent = async (pageId: string) => {
  const response = await notionClient.blocks.children.list({
    block_id: pageId,
  });

  return response.results.filter(
    (block): block is BlockObjectResponse => 'type' in block,
  );
};

/**
 * Récupérer un article par son URL
 * @param url URL de l'article
 * @returns Article retrouvé
 */
export const getPageByUrl = async (url: string): Promise<BlogPost> => {
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

  let fullResult: PageObjectResponse = defaultBlogPost;
  if (firstResult.object === 'page') {

    if ('properties' in firstResult) {
      fullResult = firstResult;
    } else {
      fullResult = { ...defaultBlogPost, ...firstResult };
    }
  }
  return BlogPost.fromNotion(fullResult);
};
