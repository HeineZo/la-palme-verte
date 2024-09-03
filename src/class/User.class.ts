import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import { Role } from './Role.class';

export class User {
  readonly id: string;
  readonly name: string;
  readonly surname: string;
  role: string;
  readonly roleId: string;
  readonly imageUrl: string;
  readonly instagram?: string;
  readonly linkedin?: string;
  readonly gender: string;
  readonly promotion: string[];
  priority: number;

  constructor(
    id: string,
    name: string,
    surname: string,
    role: string,
    roleId: string,
    imageUrl: string,
    instagram: string | undefined,
    linkedin: string | undefined,
    gender: string,
    promotion: string[],
    priority: number,
  ) {
    this.id = id;
    this.name = name;
    this.surname = surname;
    this.role = role;
    this.roleId = roleId;
    this.imageUrl = imageUrl;
    this.instagram = instagram;
    this.linkedin = linkedin;
    this.gender = gender;
    this.promotion = promotion;
    this.priority = priority;
  }

  static fromNotion(user: PageObjectResponse): User {
    const id = user.id;
    const name =
      user.properties.Prénom.type === 'title'
        ? user.properties.Prénom.title[0]?.plain_text ?? 'Aucun prénom'
        : 'Type de la colonne Prénom';
    const surname =
      user.properties.Nom.type === 'rich_text'
        ? user.properties.Nom.rich_text[0]?.plain_text ?? 'Aucun nom'
        : 'Type de la colonne Nom invalide';
    const role =
      user.properties.Rôle.type === 'select'
        ? user.properties.Rôle.select?.name ?? 'Aucun rôle'
        : 'Type de la colonne Rôle invalide';
    const roleId =
      user.properties.Rôle.type === 'relation'
        ? user.properties.Rôle.relation[0]?.id ?? ''
        : 'Type de la colonne Rôle invalide';
    const imageUrl = User.getImageUrl(user.properties['Photo de profil']);
    const instagram =
      user.properties.Instagram.type === 'url'
        ? user.properties.Instagram.url ?? undefined
        : 'Type de la colonne Instagram invalide';
    const linkedin =
      user.properties.Linkedin.type === 'url'
        ? user.properties.Linkedin.url ?? undefined
        : 'Type de la colonne LinkedIn invalide';
    const gender =
      user.properties.Sexe.type === 'select'
        ? user.properties.Sexe.select?.name ?? 'Aucun genre'
        : 'Type de la colonne Sexe invalide';
    const promotion =
      user.properties.Promotion.type === 'multi_select'
        ? user.properties.Promotion.multi_select.map((promo) => promo.name)
        : [];
    const priority = 99; // set priority by default

    return new User(
      id,
      name,
      surname,
      role,
      roleId,
      imageUrl,
      instagram,
      linkedin,
      gender,
      promotion,
      priority,
    );
  }

  private static getImageUrl(
    property: PageObjectResponse['properties']['Photo de profil'],
  ): string {
    if (property.type !== 'files' || property.files.length === 0) {
      return '';
    }

    const file = property.files[0];
    return file.type === 'file' ? file.file.url : '';
  }

  public toJSON(): Record<string, string | string[] | undefined> {
    return {
      id: this.id,
      name: this.name,
      surname: this.surname,
      role: this.role,
      imageUrl: this.imageUrl,
      instagram: this.instagram,
      linkedin: this.linkedin,
      promotion: this.promotion,
    };
  }

  static setRoleName(users: User[], roles: Role[]) {
    const roleNameHomme = new Map(roles.map((role) => [role.id, role.nomH]));
    const roleNameFemme = new Map(roles.map((role) => [role.id, role.nomF]));

    users.forEach((user) => {
      if (user.gender === 'Femme') {
        user.role = roleNameFemme.get(user.roleId) ?? '';
      } else {
        user.role = roleNameHomme.get(user.roleId) ?? '';
      }
    });

    return users;
  }

  static sortByRole(users: User[], roles: Role[]): User[] {
    const rolePriorities = new Map(
      roles.map((role) => [role.id, role.priority]),
    );

    users.forEach((user) => {
      user.priority = rolePriorities.get(user.roleId) ?? 99;
    });

    return users.sort((a, b) => a.priority - b.priority);
  }
}
