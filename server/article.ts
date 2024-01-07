"use server"
import { db } from "./db"

/**
 * Récupérer tous les articles
 * @returns Articles
 */
export async function getArticles() {
    try {
        const data = '';
        return { data }
    } catch (error) {
        return { error: error }
    }
}