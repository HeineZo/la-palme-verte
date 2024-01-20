/* eslint-disable @typescript-eslint/no-unnecessary-condition -- Si on enlève la condition cela ne marche plus */
import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { db: PrismaClient };

export const db =
  globalForPrisma.db ||
  new PrismaClient({
    log: ['query'],
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.db = db;
}
