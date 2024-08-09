import type { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';

export interface AlbumImage {
  name: string;
  url: string;
}

export class Album {
  readonly id: string;
  readonly title: string;
  readonly cover: PageObjectResponse['cover'];
  readonly description: string;
  readonly images: AlbumImage[];
  readonly url: string;

  constructor(
    id: string,
    title: string,
    cover: PageObjectResponse['cover'],
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
      response.properties.title.type === 'title'
        ? response.properties.title.title[0]?.plain_text ?? ''
        : '';
    const cover = response.cover;
    const description =
      response.properties.description.type === 'rich_text'
        ? response.properties.description.rich_text[0]?.plain_text ?? ''
        : '';
    const images =
      response.properties.files.type === 'files'
        ? response.properties.files.files.map((file) => ({
            name: file.name,
            url: file.type === 'file' ? file.file.url : file.external.url,
          }))
        : [];
    const url = response.url;

    return new Album(id, title, cover, description, images, url);
  }
}
