/* eslint-disable @typescript-eslint/no-unsafe-argument -- API Notion mal typé */
/* eslint-disable @typescript-eslint/no-unsafe-member-access -- API Notion mal typé */
/* eslint-disable @typescript-eslint/no-unsafe-assignment -- API Notion mal typé */

export class User {
  id: string;
  name: string;
  imageUrl: string;

  constructor(id: string, name: string, imageUrl: string) {
    this.id = id;
    this.name = name;
    this.imageUrl = imageUrl;
  }

  static fromNotionUser(user: any) {
    const id = user.id;
    const name = user.name;
    const imageUrl = user.avatar_url;

    return new User(id, name, imageUrl);
  }
}
