'use server';
/* eslint-disable @typescript-eslint/no-unsafe-member-access -- API de Notion mal typé */
/* eslint-disable @typescript-eslint/no-unsafe-call -- API de Notion mal typé */
/* eslint-disable @typescript-eslint/no-unsafe-return -- API de Notion mal typé */
/* eslint-disable camelcase -- Utilisation des attributs de Notion */
import { BlogPost } from '@/class/BlogPost.class';
import { clone } from '@/utils/utils';
import {
  BlockObjectResponse,
  PageObjectResponse,
} from '@notionhq/client/build/src/api-endpoints';
import { notionClient } from './notionClient';

const database_id = process.env.BLOG_DATABASE ?? '';

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
) => {
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
    databaseId: database_id,
  });

  const blogPostsPromises = response.results.map((result) =>
    BlogPost.fromNotion(result),
  );
  const articles = clone(await Promise.all(blogPostsPromises));
  return {
    articles,
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
  const response = await notionClient.databases.query({
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
    databaseId: database_id,
  });

  const blogPostsPromises = response.results.map((result) =>
    BlogPost.fromNotion(result),
  );
  const articles = clone(await Promise.all(blogPostsPromises));
  return articles;
};

/**
 * Récupérer toutes les catégories des articles disponibles
 */
export const getCategories = async () => {
  const response = await notionClient.databases.query({
    filter: {
      property: 'État',
      status: {
        equals: 'Publié',
      },
    },
    databaseId: database_id,
  });

  const categories = (response.results as PageObjectResponse[]).map((result) =>
    (result.properties.Catégories as any).multi_select.map(
      (category: { id: string; name: string; color: string }) => ({
        name: category.name,
      }),
    ),
  );

  return Array.from(
    new Set(categories.flat().map((category) => category.name)),
  ) as string[];
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

  return response.results as BlockObjectResponse[];
};

/**
 * Récupérer un article par son URL
 * @param url URL de l'article
 * @returns Article retrouvé
 */
export const getPageByUrl = async (url: string) => {
  const response = await notionClient.databases.query({
    filter: {
      property: 'URL',
      rich_text: {
        equals: url,
      },
    },
    databaseId: database_id,
  });

  return BlogPost.fromNotion(response.results[0]);
};
