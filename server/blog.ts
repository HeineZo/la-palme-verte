/* eslint-disable @typescript-eslint/no-unsafe-member-access -- API de Notion mal typé */
/* eslint-disable @typescript-eslint/no-unsafe-call -- API de Notion mal typé */
/* eslint-disable @typescript-eslint/no-unsafe-return -- API de Notion mal typé */
/* eslint-disable camelcase -- Utilisation des attributs de Notion */
import 'server-only';

import { BlogPost } from '@/class/BlogPost.class';
import { ApiResponse } from '@/shared/type/IApiResponse';
import { APIResponseError } from '@notionhq/client';
import {
  BlockObjectResponse,
  PageObjectResponse,
} from '@notionhq/client/build/src/api-endpoints';
import { notionClient } from './database';

const database_id = process.env.BLOG_DATABASE ?? '';

/**
 * Récupère tous les articles de blog
 * @returns Liste des articles
 */
export const getPages = async () => {
  const response = await notionClient.databases.query({
    database_id,
  });

  const blogPostsPromises = response.results.map((result) => BlogPost.fromNotion(result));
  const blogPosts = await Promise.all(blogPostsPromises);
  
  return blogPosts;
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
    database_id,
  });

  const categories = (response.results as PageObjectResponse[]).map((result) =>
    (result.properties.Catégories as any).multi_select.map(
      (category: { id : string, name: string, color: string}) => ({ name: category.name}),
    ),
  );

  return Array.from(new Set(categories.flat().map((category) => category.name))) as string[];

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
    database_id,
  });

  return BlogPost.fromNotion(response.results[0]);
};

/**
 * Récupere le dernier article publié
 * @returns Dernier article publié
 */
export const getLatestArticle = async () => {
  // Initialiser l'état initial
  const  result: ApiResponse<BlogPost> = { results: [], code: 200, message: ''} ;

  try {
    const response = await notionClient.databases.query({
      filter: {
        property: 'État',
        status: {
          equals: 'Publié',
        },
      },
      database_id,
      sorts: [
        {
          property: 'Date de création',
          direction: 'descending',
        },
      ],
    });

    result.results = await BlogPost.fromNotion(response.results[0]);
    result.code = 200;
    result.message = 'Dernier article récupéré avec succès';
  } catch (error) {
    if (error instanceof APIResponseError) {
      return { result: { ...result, code: error.status, message: error.message } };
    } 
      return { result: { ...result, code: 400, message: 'Erreur inattendue lors de la récupération des données' } };
  }
  
  return result;
};