import { createDb } from '@portfolio/db';

const DBURL = process.env.DBURL;
const globalForDb = globalThis;

if (!globalForDb.portfolioDb) {
  globalForDb.portfolioDb = createDb(DBURL);
}

export const db = globalForDb.portfolioDb;
