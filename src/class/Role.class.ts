/* eslint-disable @typescript-eslint/no-explicit-any -- API Notion mal typé */
/* eslint-disable @typescript-eslint/no-unsafe-argument -- API Notion mal typé */
/* eslint-disable @typescript-eslint/no-unsafe-member-access -- API Notion mal typé */
/* eslint-disable @typescript-eslint/no-unsafe-assignment -- API Notion mal typé */

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

  static fromNotion(role: any) {
    const id = role.id;
    const priority = role.properties.Priority.unique_id.number ?? 0;
    const nomH = role.properties.NomH.title[0].plain_text ?? '';
    const nomF = role.properties.NomF.rich_text[0].text.content ?? '';

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
