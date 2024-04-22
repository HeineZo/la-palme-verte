import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";

export class Album {
  id: PageObjectResponse['id'];
  title: PageObjectResponse['properties']['title'];
  cover: PageObjectResponse['cover'];
  description:  PageObjectResponse['properties']['description'];
  images: PageObjectResponse['properties']['files'];
  url: PageObjectResponse['url'];

  constructor(
    id: PageObjectResponse['id'],
    title: PageObjectResponse['properties']['title'],
    cover: PageObjectResponse['cover'],
    description:  PageObjectResponse['properties']['description'],
    images: PageObjectResponse['properties']['files'],
    url: PageObjectResponse['url'],
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
  static fromNotion(response: PageObjectResponse) {
    const id = response.id;
    const title = response.properties.title;
    const cover = response.cover;
    const description = response.properties.description;
    const images = response.properties.files;
    const url = response.url

    return new Album(id, title, cover, description, images, url);
  }
}
