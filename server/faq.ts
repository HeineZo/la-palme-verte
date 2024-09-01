import 'server-only';
import { notionClient } from './notionClient';
import { FAQ } from '@/class/FAQ.class';
import {
  PageObjectResponse,
  QueryDatabaseResponse,
} from '@notionhq/client/build/src/api-endpoints';
import { clone } from '@/utils/utils';

const databaseId = process.env.FAQ_DATABASE ?? '';

/**
 * Récupère les Questions/Réponses en fonction de la section
 * @param section Section de la FAQ
 * @returns FAQ de la section
 */
export const getBySection = async (section: string): Promise<FAQ[]> => {
  try {
    const response: QueryDatabaseResponse = await notionClient.databases.query({
      filter: {
        property: 'Section',
        select: {
          equals: section,
        },
      },
      database_id: databaseId,
    });

    const faqObjects = response.results
      .filter((result): result is PageObjectResponse => 'properties' in result)
      .map((result) => {
        try {
          return FAQ.fromNotion(result);
        } catch (error) {
          return null;
        }
      });

    return clone(
      faqObjects.filter((faqObject) => faqObject !== null),
    );
  } catch (error) {
    return [];
  }
};
