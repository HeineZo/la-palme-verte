import 'server-only';

import { Role } from '@/class/Role.class';
import { notionClient } from './database';

/**
 * Récupère une rôle à partir de son identifiant
 * @returns Rôle correspondant
 */
export const getRole = async (id: string) => {
  const response = await notionClient.pages.retrieve({ page_id: id });

  return Role.fromNotion(response);
};
