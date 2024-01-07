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
