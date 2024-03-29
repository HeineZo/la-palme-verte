/* eslint-disable camelcase -- Utilisation des attributs de Notion */
import 'server-only';
import { notionClient } from './database';
import { FAQ } from '@/class/FAQ.class';

const database_id = process.env.FAQ_DATABASE ?? '';

/**
 * Récupère les Questions/Réponses en fonction de la section
 * @param section Section de la FAQ
 * @returns FAQ de la section
 */
export const getBySection = async (section: string) => {
  const response = await notionClient.databases.query({
    filter: {
      property: 'Section',
      select: {
        equals: section,
      },
    },
    database_id,
  });

  return response.results.map((result) => FAQ.fromNotion(result));
};
