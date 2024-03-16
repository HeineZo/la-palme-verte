/* eslint-disable camelcase -- Utilisation des attributs de Notion */
import { notionClient } from './database';
import { User } from '@/class/User.class';

const database_id = process.env.USER_DATABASE ?? '';

/**
 * Récupère un utilisateur à partir de son identifiant
 * @returns Utilisateur correspondant
 */
export const getUser = async (id: string) => {
    const response = await notionClient.pages.retrieve({ page_id: id });

    return User.fromNotion(response);
}