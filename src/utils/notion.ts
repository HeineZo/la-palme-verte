/* eslint-disable camelcase -- Utilisation des attributs de Notion */
import 'server-only';

import { Client } from '@notionhq/client';
import { BlockObjectResponse, PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';

export const notionClient = new Client({
  auth: process.env.NOTION_TOKEN,
});

const database_id = process.env.NOTION_DATABASE_ID ?? '';

/**
 * Récupère tous les articles de blog
 * @returns Liste des articles
 */
export const getPages = async () => {
  const response = await notionClient.databases.query({
    filter: {
      property: 'État',
      select: {
        equals: 'Publié',
      },
    },
    database_id,
  });

  return response.results;
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

  return response.results[0] as PageObjectResponse | undefined;
};
