import type { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';

export interface AlbumImage {
  name: string;
  url: string;
}

export class Album {
  readonly id: string;
  readonly title: string;
  readonly cover: string;
  readonly description: string;
  readonly images: AlbumImage[];
  readonly url: string;

  constructor(
    id: string,
    title: string,
    cover: string,
    description: string,
    images: { name: string; url: string }[],
    url: string,
  ) {
    this.id = id;
    this.title = title;
    this.cover = cover;
    this.description = description;
    this.images = images;
    this.url = url;
  }

  /**
   * Transforme un album en type `Album`
   * @param response Album que l'on souhaite transformer en `Album`
   * @returns l'objet `Album` correspondant
   */
  static fromNotion(response: PageObjectResponse): Album {
    const id = response.id;
    const title =
      response.properties.Titre.type === 'title'
        ? response.properties.Titre.title[0]?.plain_text ?? 'Aucun titre'
        : 'Aucun titre';
    const cover = Album.getCoverUrl(response.cover);
    const description =
      response.properties.Description.type === 'rich_text'
        ? response.properties.Description.rich_text[0]?.plain_text ?? 'Aucune description'
        : 'Aucune description';
    const images =
      response.properties.Images.type === 'files'
        ? response.properties.Images.files.map((file) => ({
            name: file.name,
            url: file.type === 'file' ? file.file.url : '',
          }))
        : [];
    const url = response.url;
    return new Album(id, title, cover, description, images, url);
  }

  static getCoverUrl(cover: PageObjectResponse['cover']): string {
    if (!cover) return '';

    switch (cover.type) {
      case 'external':
        return cover.external.url;
      case 'file':
        return cover.file.url;
      default:
        return '';
    }
  }
}
