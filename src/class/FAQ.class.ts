/* eslint-disable @typescript-eslint/no-explicit-any -- API Notion mal typé */
/* eslint-disable @typescript-eslint/no-unsafe-argument -- API Notion mal typé */
/* eslint-disable @typescript-eslint/no-unsafe-call -- API Notion mal typé */
/* eslint-disable @typescript-eslint/no-unsafe-member-access -- API Notion mal typé */
/* eslint-disable @typescript-eslint/no-unsafe-assignment -- API Notion mal typé */

import { getUser } from "server/user";

export class FAQ {
    id: string;
    question: string;
    answer: string;
    section: string;

    constructor(id: string, question: string, answer: string, section: string) {
        this.id = id;
        this.question = question;
        this.answer = answer;
        this.section = section;
    }

    /**
     * Transforme un objet Notion en type simplifié
     * @param page Objet Notion que l'on veut transformer en type simplifié
     * @returns L'objet simplifié correspondant
     */
    static fromNotion(page: any) {
        const id = page.id;
        const question = page.properties.Question.title[0].plain_text;
        const answer = page.properties.Réponse.rich_text[0].text.content;
        const section = page.properties.Section.select.name;

        return new FAQ(id, question, answer, section);
    }
}
