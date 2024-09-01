import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import { getUser } from 'server/user';
import { User } from './User.class';

export class BlogPost {
  readonly id: string;
  readonly title: string;
  readonly cover: string;
  readonly description: string;
  readonly content: string;
  readonly categories: string[];
  readonly authors: User[];
  readonly publicationDate: Date;
  readonly url: string;

  constructor(
    id: string,
    title: string,
    cover: string,
    description: string,
    content: string,
    categories: string[],
    authors: User[],
    publicationDate: Date,
    url: string,
  ) {
    this.id = id;
    this.title = title;
    this.cover = cover;
    this.description = description;
    this.content = content;
    this.categories = categories;
    this.authors = authors;
    this.publicationDate = publicationDate;
    this.url = url;
  }

  /**
   * Transforme un objet Notion en type BlogPost
   * @param page Objet Notion que l'on veut transformer en BlogPost
   * @returns L'objet BlogPost correspondant
   */
  static async fromNotion(page: PageObjectResponse): Promise<BlogPost> {
    const id = page.id;
    const title =
      page.properties.Titre.type === 'title'
        ? page.properties.Titre.title[0]?.plain_text ?? 'Aucun titre'
        : 'Type de la colonne Titre invalide';
    const cover =
      BlogPost.getCoverUrl(page.cover) ?? 'https://placehold.co/600x400?text=?';
    const description =
      page.properties.Description.type === 'rich_text'
        ? page.properties.Description.rich_text[0]?.plain_text ??
          'Aucune description'
        : 'Type de la colonne Description invalide';
    const categories =
      page.properties.Catégories.type === 'multi_select'
        ? page.properties.Catégories.multi_select.map(
            (category) => category.name,
          )
        : [];
    const authorsPromises =
      page.properties.Auteurs.type === 'relation'
        ? page.properties.Auteurs.relation.map((author) => getUser(author.id))
        : [];
    const authors = await Promise.all(authorsPromises);
    const publicationDate = new Date(page.created_time);
    const url =
      page.properties.URL.type === 'url'
        ? page.properties.URL.url ?? ''
        : 'Type de la colonne URL invalide';

    return new BlogPost(
      id,
      title,
      cover,
      description,
      '',
      categories,
      authors,
      publicationDate,
      url,
    );
  }

  static getCoverUrl(cover: PageObjectResponse['cover']): string | undefined {
    if (!cover) return undefined;

    switch (cover.type) {
      case 'external':
        return cover.external.url;
      case 'file':
        return cover.file.url;
      default:
        return undefined;
    }
  }
}
