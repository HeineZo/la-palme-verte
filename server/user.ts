/* eslint-disable camelcase -- Utilisation des attributs de Notion */
import 'server-only';


import { User } from '@/class/User.class';
import { Iuser } from '@/shared/interfaces/User';
import { notionClient } from './database';

const database_id = process.env.USER_DATABASE ?? '';

/**
 * Récupère un utilisateur à partir de son identifiant
 * @returns Utilisateur correspondant
 */
export const getUser = async (id: string) => {
    const response = await notionClient.pages.retrieve({ page_id: id });

    return User.fromNotion(response);
}

/**
 * Récupère tous les utilisateurs
 * @returns Liste des utilisateurs
 */
export const getUsers = async () => {
    const users: Iuser[] = [];
    const response = await notionClient.databases.query({
        database_id,
    });

    users.push(...response.results.map((result) => User.fromNotion(result)));
    return users;
} 