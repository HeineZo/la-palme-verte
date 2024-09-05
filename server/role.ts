/* eslint-disable camelcase -- Utilisation des attributs de Notion */
import 'server-only';

import { Role } from '@/class/Role.class';
import { clone } from '@/utils/utils';
import {
  PageObjectResponse,
  PartialPageObjectResponse,
  QueryDatabaseResponse,
} from '@notionhq/client/build/src/api-endpoints';
import { notionClient } from './notionClient';

const database_id = process.env.ROLE_DATABASE ?? '';
const defaultRole: PageObjectResponse = {
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
 * Récupère tous les rôles
 * @returns Liste des rôles
 */
export const getRoles = async (): Promise<Role[]> => {
  const response: QueryDatabaseResponse = await notionClient.databases.query({
    database_id,
  });

  const roles = response.results
    .filter(
      (result): result is PageObjectResponse | PartialPageObjectResponse =>
        result.object === 'page',
    )
    .map((result) => {
      let fullResult: PageObjectResponse;
      if ('properties' in result) {
        fullResult = result;
      } else {
        fullResult = { ...defaultRole, ...result };
      }
      return Role.fromNotion(fullResult);
    });

  return clone(roles);
};
