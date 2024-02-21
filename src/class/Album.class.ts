/* eslint-disable @typescript-eslint/no-explicit-any -- API Notion mal typé */
/* eslint-disable @typescript-eslint/no-unsafe-argument -- API Notion mal typé */
/* eslint-disable @typescript-eslint/no-unsafe-member-access -- API Notion mal typé */
/* eslint-disable @typescript-eslint/no-unsafe-assignment -- API Notion mal typé */

interface File {
  name: string;
  type: string;
  external: { url: string };
}

export class Album {
  id: string;
  title: string;
  description: string;
  images: File[];

  constructor(id: string, title: string, description: string, images: File[]) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.images = images;
  }

  /**
   * Transforme un album en type `Album`
   * @param album Album que l'on souhaite transformer en `Album`
   * @returns l'objet `Album` correspondant
   */
  static fromNotion(album: any) {
    const id = album.id;
    const title = album.properties.Titre.title[0].plain_text;
    const description = album.properties.Description.rich_text[0].text.content;
    const images = album.properties.Images.files[0];

    return new Album(id, title, description, images);
  }
}
