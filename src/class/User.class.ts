/* eslint-disable @typescript-eslint/no-explicit-any -- API Notion mal typé */
/* eslint-disable @typescript-eslint/no-unsafe-argument -- API Notion mal typé */
/* eslint-disable @typescript-eslint/no-unsafe-member-access -- API Notion mal typé */
/* eslint-disable @typescript-eslint/no-unsafe-assignment -- API Notion mal typé */

import { Role } from './Role.class';

export class User {
  id: string;
  name: string;
  surname: string;
  role: string;
  roleId: number;
  imageUrl: string;
  instagram: string;
  linkedin: string;
  gender: 'Homme' | 'Femme';
  priority: number;

  constructor(
    id: string,
    name: string,
    surname: string,
    role: string,
    roleId: number,
    imageUrl: string,
    instagram: string,
    linkedin: string,
    gender: 'Homme' | 'Femme',
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
    this.priority = priority;
  }

  static fromNotion(user: any) {
    const id = user.id;
    const name = user.properties.Prénom.title[0]?.plain_text ?? '';
    const surname = user.properties.Nom.rich_text[0]?.text.content ?? '';
    const role = user.properties.Rôle.select?.name;
    const roleId = user.properties.Rôle.relation[0]?.id;
    const imageUrl =
      user.properties['Photo de profil'].files[0]?.file?.url ||
      user.properties['Photo de profil'].files[0]?.external?.url;
    const instagram = user.properties.Instagram.url;
    const linkedin = user.properties.Linkedin.url;
    const gender = user.properties.Sexe.select.name;

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
      priority,
    );
  }

  public toJSON() {
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
