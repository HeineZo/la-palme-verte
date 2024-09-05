import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';

export class Role {
  id: string;
  priority: number;
  nomH: string;
  nomF: string;

  constructor(id: string, priority: number, nomH: string, nomF: string) {
    this.id = id;
    this.priority = priority;
    this.nomH = nomH;
    this.nomF = nomF;
  }

  static fromNotion(role: PageObjectResponse) {
    const id = role.id;
    const priority =
      role.properties.Priority.type === 'unique_id'
        ? role.properties.Priority.unique_id.number ?? 99
        : 99;
    const nomH =
      role.properties.NomH.type === 'title'
        ? role.properties.NomH.title[0]?.plain_text ?? 'Aucun rôle associé'
        : 'Type de la colonne NomH invalide';
    const nomF =
      role.properties.NomF.type === 'rich_text'
        ? role.properties.NomF.rich_text[0]?.plain_text ?? 'Aucun rôle associé'
        : 'Type de la colonne NomF invalide';

    return new Role(id, priority, nomH, nomF);
  }

  public toJSON() {
    return {
      id: this.id,
      priority: this.priority,
      nomH: this.nomH,
      nomF: this.nomF,
    };
  }
}
