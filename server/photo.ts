'use server';
import { Photo } from '@prisma/client';
import { db } from './db/client';

/**
 * Récupérer toute les photos
 * @returns Photos
 */
export async function getPhotos() {
  try {
    const data: Photo[] = await db.photo.findMany();
    return { data };
  } catch (error) {
    return { error };
  }
}

/**
 * Supprime toutes les photos
 * @returns Résultat de la requête
 */
export async function deleteAll() {
  try {
    const data = await db.photo.deleteMany();
    return { data };
  } catch (error) {
    return { error };
  }
}
