/* eslint-disable @typescript-eslint/no-explicit-any -- API Notion mal typé */
/* eslint-disable @typescript-eslint/no-unsafe-argument -- API Notion mal typé */
/* eslint-disable @typescript-eslint/no-unsafe-member-access -- API Notion mal typé */
/* eslint-disable @typescript-eslint/no-unsafe-assignment -- API Notion mal typé */

import { notionClient } from 'server/database';

export class Role {
  priority: string;
  nameMale: string;
  nameFemale: string;

  constructor(id: string, nameMale: string, nameFermale: string) {
    this.priority = id;
    this.nameMale = nameMale;
    this.nameFemale = nameFermale;
  }

  static fromNotion(role: any) {
    const priority = role.id;
    const nameMale = role.properties.NomH.title[0]?.plain_text ?? '';
    const nameFemale = role.properties.NomF.rich_text[0]?.text.content ?? '';

    return new Role(priority, nameMale, nameFemale);
  }

  static getRole = async (id: string) => {
    const response = await notionClient.pages.retrieve({ page_id: id });

    return Role.fromNotion(response);
  };
}
