import 'server-only';

import { User } from '@/class/User.class';
import { notionClient } from './notionClient';
import { clone, getAcademicYear } from '@/utils/utils';
import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';

const databaseId = process.env.USER_DATABASE ?? '';

/**
 * Récupère un utilisateur à partir de son identifiant
 * @returns Utilisateur correspondant
 */
export const getUser = async (id: string) => {
  const response = await notionClient.pages.retrieve({ page_id: id });

  return User.fromNotion(response as PageObjectResponse);
};

/**
 * Récupère tous les utilisateurs
 * @returns Liste des utilisateurs
 */
export const getUsers = async () => {
  const response = await notionClient.databases.query({
    database_id: databaseId,
  });

  const userPromises = response.results.map((result) =>
    User.fromNotion(result as PageObjectResponse),
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
    filter: {
      and: [
        {
          property: 'Promotion',
          multi_select: {
            contains: getAcademicYear(),
          },
        }
      ],
    },
    database_id: databaseId,
  });

  const userPromises = response.results.map((result) =>
    User.fromNotion(result as PageObjectResponse),
  );
  const users = clone(await Promise.all(userPromises));
  return users;
};

/**
 * Récupère tous les membres du staff qu'import leur promotion
 * @returns Liste des membres du staff 
 */
export const getAllStaffMembers = async () => {
  const response = await notionClient.databases.query({
    filter: {
      and: [
        {
          property: 'Promotion',
          multi_select: {
            is_not_empty: true,
          },
        }
      ],
    },
    database_id: databaseId,
  });

  const userPromises = response.results.map((result) =>
    User.fromNotion(result as PageObjectResponse),
  );
  const users = clone(await Promise.all(userPromises));
  return users;
}
