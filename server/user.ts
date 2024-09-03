import 'server-only';

import { User } from '@/class/User.class';
import { notionClient } from './notionClient';
import { clone, getAcademicYear } from '@/utils/utils';
import {
  GetPageResponse,
  PageObjectResponse,
  PartialPageObjectResponse,
  QueryDatabaseResponse,
} from '@notionhq/client/build/src/api-endpoints';
import { getRoles } from './role';

const databaseId = process.env.USER_DATABASE ?? '';
const defaultUser: PageObjectResponse = {
  parent: { type: 'page_id', page_id: '' },
  properties: {
    files: {
      id: '',
      type: 'files',
      files: [],
    },
  },
  icon: null,
  cover: null,
  created_by: { id: '', object: 'user' },
  last_edited_by: { id: '', object: 'user' },
  object: 'page',
  id: '',
  created_time: '',
  last_edited_time: '',
  archived: false,
  in_trash: false,
  url: '',
  public_url: null,
};

/**
 * Récupère un utilisateur à partir de son identifiant
 * @returns Utilisateur correspondant
 */

export const getUser = async (id: string) => {
  const response: GetPageResponse = await notionClient.pages.retrieve({
    page_id: id,
  });

  let fullResult: PageObjectResponse;
  if ('properties' in response) {
    fullResult = response;
  } else {
    fullResult = { ...defaultUser, ...response };
  }
  return User.fromNotion(fullResult);
};

/**
 * Récupère tous les utilisateurs
 * @returns Liste des utilisateurs
 */
export const getUsers = async () => {
  const response: QueryDatabaseResponse = await notionClient.databases.query({
    database_id: databaseId,
  });

  return mapResponse(response);
};

export const getStaffMembers = async (): Promise<User[]> => {
  const response: QueryDatabaseResponse = await notionClient.databases.query({
    filter: {
      and: [
        {
          property: 'Promotion',
          multi_select: {
            contains: getAcademicYear(),
          },
        },
      ],
    },
    database_id: databaseId,
  });

  const roles = await getRoles();
  const userPromises = await Promise.all(await mapResponse(response));
  const usersSorted = User.sortByRole(userPromises, roles);
  const usersSortedByName = User.setRoleName(usersSorted, roles);

  return usersSortedByName;
};

/**
 * Récupère tous les membres du staff qu'import leur promotion
 * @returns Liste des membres du staff
 */
export const getAllStaffMembers = async () => {
  const response: QueryDatabaseResponse = await notionClient.databases.query({
    filter: {
      and: [
        {
          property: 'Promotion',
          multi_select: {
            is_not_empty: true,
          },
        },
      ],
    },
    database_id: databaseId,
  });
  return mapResponse(response);
};

const mapResponse = async (
  dataBaseResponse: QueryDatabaseResponse,
): Promise<User[]> => {
  const userPromises = await Promise.all(
    dataBaseResponse.results
      .filter(
        (result): result is PageObjectResponse | PartialPageObjectResponse =>
          result.object === 'page',
      )
      .map((result) => {
        let fullResult: PageObjectResponse;
        if ('properties' in result) {
          fullResult = result;
        } else {
          fullResult = { ...defaultUser, ...result };
        }

        return User.fromNotion(fullResult);
      }),
  );
  return clone(userPromises);
};
