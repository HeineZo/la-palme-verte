/* eslint-disable @typescript-eslint/no-explicit-any -- API Notion mal typé */
/* eslint-disable @typescript-eslint/no-unsafe-argument -- API Notion mal typé */
/* eslint-disable @typescript-eslint/no-unsafe-call -- API Notion mal typé */
/* eslint-disable @typescript-eslint/no-unsafe-member-access -- API Notion mal typé */
/* eslint-disable @typescript-eslint/no-unsafe-assignment -- API Notion mal typé */

import { getUser } from "server/user";
import { User } from "./User.class";

export class BlogPost {
    id: string;
    title: string;
    cover: string;
    description: string;
    content: string;
    categories: string[];
    authors: User[];
    publicationDate: Date;
    url: string;

    constructor(id: string, title: string, cover: string, description: string, content: string, categories: string[], authors: User[], publicationDate: Date, url: string) {
        this.id = id;
        this.title = title;
        this.cover = cover;
        this.description = description;
        this.content = content;
        this.categories = categories;
        this.authors = authors;
        this.publicationDate = publicationDate;
        this.url = url;
    }

    /**
     * Transforme un objet Notion en type simplifié
     * @param page Objet Notion que l'on veut transformer en type simplifié
     * @returns L'objet simplifié correspondant
     */
    static async fromNotion(page: any) {
        const id = page.id;
        const title = page.properties.Titre.title[0].plain_text ?? "Titre non disponible";
        const cover = page.cover?.external?.url ?? page.cover.file?.url ?? '';
        const description = page.properties.Description.rich_text[0]?.text.content ?? '';
        const categories = page.properties.Catégories.multi_select?.map((category: {name: string}) => category.name);
        const authorsPromises = page.properties.Auteurs.relation?.map((author: {id: string}) => getUser(author.id)) ?? [];
        const authors = await Promise.all(authorsPromises);
        const publicationDate = new Date(page.created_time);
        const url = page.properties?.URL?.rich_text[0]?.text.content ?? '';

        return new BlogPost(id, title, cover, description, '', categories, authors, publicationDate, url);
    }
}
