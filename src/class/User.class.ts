import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';

export class User {
  readonly id: string;
  readonly name: string;
  readonly surname: string;
  readonly role: string;
  readonly imageUrl: string;
  readonly instagram: string;
  readonly linkedin: string;

  constructor(
    id: string,
    name: string,
    surname: string,
    role: string,
    imageUrl: string,
    instagram: string,
    linkedin: string,
  ) {
    this.id = id;
    this.name = name;
    this.surname = surname;
    this.role = role;
    this.imageUrl = imageUrl;
    this.instagram = instagram;
    this.linkedin = linkedin;
  }

  static fromNotion(user: PageObjectResponse): User {
    const id = user.id;
    const name =
      user.properties.Prénom.type === 'title'
        ? user.properties.Prénom.title[0]?.plain_text ?? ''
        : 'Inconnu';
    const surname =
      user.properties.Nom.type === 'rich_text'
        ? user.properties.Nom.rich_text[0]?.plain_text ?? ''
        : '';
    const role =
      user.properties.Rôle.type === 'select'
        ? user.properties.Rôle.select?.name ?? ''
        : 'Membre';
    const imageUrl = User.getImageUrl(user.properties['Photo de profil']);
    const instagram =
      user.properties.Instagram.type === 'url'
        ? user.properties.Instagram.url ?? ''
        : '';
    const linkedin =
      user.properties.Linkedin.type === 'url'
        ? user.properties.Linkedin.url ?? ''
        : '';

    return new User(id, name, surname, role, imageUrl, instagram, linkedin);
  }

  private static getImageUrl(
    property: PageObjectResponse['properties']['Photo de profil'],
  ): string {
    if (property.type !== 'files' || property.files.length === 0) {
      return '';
    }

    const file = property.files[0];
    return file.type === 'file' ? file.file.url : file.external.url;
  }

  public toJSON(): Record<string, string> {
    return {
      id: this.id,
      name: this.name,
      surname: this.surname,
      role: this.role,
      imageUrl: this.imageUrl,
      instagram: this.instagram,
      linkedin: this.linkedin,
    };
  }
}
