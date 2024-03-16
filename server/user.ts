/* eslint-disable camelcase -- Utilisation des attributs de Notion */
import 'server-only';


import { User } from '@/class/User.class';
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
    const users: User[] = [];
    const response = await notionClient.databases.query({
        database_id,
    });

    users.push(...response.results.map((result) => User.fromNotion(result)));
    return users;
} 

/**
 * Récupère tous les utilisateurs
 * @returns Liste des utilisateurs
 */
export const getStaffMembers = async () => {
    const users: User[] = [];
    const response = await notionClient.databases.query({
        filter: {
            and: [
                {
                    property: 'Rôle',
                    select: {
                        does_not_equal: 'Membre',
                    },
                },
                {
                    property: 'Rôle',
                    select: {
                        is_not_empty: true,
                    },
                },
            ],
        },
        database_id,
    });

    users.push(...response.results.map((result) => User.fromNotion(result)));
    return users;
} 


