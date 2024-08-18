/* eslint-disable camelcase -- Utilisation des attributs de Notion */
import 'server-only';

import { Role } from '@/class/Role.class';
import { clone } from '@/utils/utils';
import { notionClient } from './database';

const database_id = process.env.ROLE_DATABASE ?? '';

/**
 * Récupère tous les rôles
 * @returns Liste des rôles
 */
export const getRoles = async () => {
  const response = await notionClient.databases.query({
    database_id,
  });

  const rolePromises = response.results.map((result) =>
    Role.fromNotion(result),
  );

  const roles = clone(await Promise.all(rolePromises));
  return roles;
};
