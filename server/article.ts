"use server"
import { db } from "./db/client"

/**
 * Récupérer tous les articles
 * @returns Articles
 */
export function getArticles() {
    try {
        const data = '';
        return { data }
    } catch (error) {
        return { error }
    }
}