/* eslint-disable @typescript-eslint/no-explicit-any -- API Notion mal typé */
/* eslint-disable @typescript-eslint/no-unsafe-argument -- API Notion mal typé */
/* eslint-disable @typescript-eslint/no-unsafe-member-access -- API Notion mal typé */
/* eslint-disable @typescript-eslint/no-unsafe-assignment -- API Notion mal typé */

export interface File {
  name: string;
  type: string;
  file: { url: string; expiry_time: string };
}

export class Album {
  id: string;
  title: string;
  cover: string;
  description: string;
  images: File[];
  url: string;

  constructor(
    id: string,
    title: string,
    cover: string,
    description: string,
    images: File[],
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
   * @param album Album que l'on souhaite transformer en `Album`
   * @returns l'objet `Album` correspondant
   */
  static fromNotion(album: any) {
    const id = album.id;
    const title = album.properties.Titre.title[0]?.plain_text;
    const cover = album.cover?.external?.url ?? album.cover.file?.url ?? '';
    const description = album.properties.Description.rich_text[0]?.text.content;
    const images = album.properties.Images.files;
    const url = album.properties.URL.rich_text[0]?.text.content;

    return new Album(id, title, cover, description, images, url);
  }
}
