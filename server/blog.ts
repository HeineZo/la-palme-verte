/* eslint-disable @typescript-eslint/no-unsafe-member-access -- API de Notion mal typé */
/* eslint-disable @typescript-eslint/no-unsafe-call -- API de Notion mal typé */
/* eslint-disable @typescript-eslint/no-unsafe-return -- API de Notion mal typé */
/* eslint-disable camelcase -- Utilisation des attributs de Notion */
import 'server-only';

import { Client } from '@notionhq/client';
import {
  BlockObjectResponse,
  PageObjectResponse,
} from '@notionhq/client/build/src/api-endpoints';
import { BlogPost } from '@/class/BlogPost.class';

export const notionClient = new Client({
  auth: process.env.NOTION_TOKEN,
});

const database_id = process.env.BLOG_DATABASE ?? '';

/**
 * Récupère tous les articles de blog
 * @returns Liste des articles
 */
export const getPages = async () => {
  const response = await notionClient.databases.query({
    filter: {
      property: 'État',
      status: {
        equals: 'Publié',
      },
    },
    database_id,
  });

  return response.results.map((result) => BlogPost.fromNotionPage(result));
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
      (category: any) => category.name,
    ),
  );

  return Array.from(new Set(categories.flat()));
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

  return BlogPost.fromNotionPage(response.results[0]);
};
