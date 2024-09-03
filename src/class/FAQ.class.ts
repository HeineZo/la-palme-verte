import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';

export class FAQ {
  readonly id: string;
  readonly question: string;
  readonly answer: string;
  readonly section: string;

  constructor(id: string, question: string, answer: string, section: string) {
    this.id = id;
    this.question = question;
    this.answer = answer;
    this.section = section;
  }

  /**
   * Transforme un objet Notion en type simplifié
   * @param page Objet Notion que l'on veut transformer en type simplifié
   * @returns L'objet simplifié correspondant
   */
  static fromNotion(page: PageObjectResponse): FAQ {
    const id = page.id;
    const question =
      page.properties.Question.type === 'title'
        ? page.properties.Question.title[0]?.plain_text ?? 'Aucune question'
        : 'Type de la colonne Question invalide';
    const answer =
      page.properties.Réponse.type === 'rich_text'
        ? page.properties.Réponse.rich_text[0].plain_text
        : 'Type de la colonne Réponse invalide';
    const section =
      page.properties.Section.type === 'select'
        ? page.properties.Section.select?.name ?? 'Aucune section'
        : 'Type de la colonne Selection invalide';

    return new FAQ(id, question, answer, section);
  }
}
