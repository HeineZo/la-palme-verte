/* eslint-disable camelcase -- Utilisation des attributs de Notion */
import 'server-only';

import { User } from '@/class/User.class';
import { clone } from '@/utils/utils';
import { notionClient } from './database';
import { getRoles } from './role';

const database_id = process.env.USER_DATABASE ?? '';

/**
 * Récupère un utilisateur à partir de son identifiant
 * @returns Utilisateur correspondant
 */
export const getUser = async (id: string) => {
  const response = await notionClient.pages.retrieve({ page_id: id });

  return User.fromNotion(response);
};

/**
 * Récupère tous les utilisateurs
 * @returns Liste des utilisateurs
 */
export const getUsers = async () => {
  const response = await notionClient.databases.query({
    database_id,
  });

  const userPromises = response.results.map((result) =>
    User.fromNotion(result),
  );
  const users = clone(await Promise.all(userPromises));
  return users;
};

/**
 * Récupère tous les utilisateurs
 * @returns Liste des utilisateurs
 */
export const getStaffMembers = async () => {
  const response = await notionClient.databases.query({
    database_id,
  });

  const userPromises = response.results.map((result) =>
    User.fromNotion(result),
  );

  const roles = await getRoles();

  const usersSorted = User.sortByRole(userPromises, roles);
  const usersSortedByName = User.setRoleName(usersSorted, roles);

  const users = clone(await Promise.all(usersSortedByName));

  return users;
};
