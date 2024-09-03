/* eslint-disable camelcase -- Utilisation des attributs de Notion */
import 'server-only';

import { Role } from '@/class/Role.class';
import { clone } from '@/utils/utils';
import { QueryDatabaseResponse } from '@notionhq/client/build/src/api-endpoints';
import { notionClient } from './notionClient';

const database_id = process.env.ROLE_DATABASE ?? '';

/**
 * Récupère tous les rôles
 * @returns Liste des rôles
 */
export const getRoles = async (): Promise<Role[]> => {
  const response: QueryDatabaseResponse = await notionClient.databases.query({
    database_id,
  });

  const rolePromises = response.results.map((result) =>
    Role.fromNotion(result),
  );

  const roles = clone(await Promise.all(rolePromises));
  return roles;
};
