/* eslint-disable @typescript-eslint/no-unsafe-return -- API Notion mal typé */
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
     * Transforme un article en type `BlogPost`
     * @param page Article que l'on veut transformer en `BlogPost`
     * @returns L'objet `BlogPost` correspondant
     */
    static fromNotionPage(page: any) {
        const id = page.id;
        const title = page.properties.Titre.title[0].plain_text;
        const cover = page.cover.external.url;
        const description = page.properties.Description.rich_text[0].text.content;
        const categories = page.properties.Catégories.multi_select.map((category: any) => category.name);
        const authors = page.properties.Auteurs.relation.map((author: any) => getUser(author.id));
        const publicationDate = new Date(page.created_time);
        const url = page.properties.URL.rich_text[0].text.content;

        return new BlogPost(id, title, cover, description, '', categories, authors, publicationDate, url);
    }
}
