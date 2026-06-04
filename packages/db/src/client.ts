import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

export function createDb(url: string) {
  const client = postgres(url, {
    ssl: { rejectUnauthorized: false },
    max: 1,
    idle_timeout: 30,
  });
  return drizzle(client, { schema });
}

export type DB = ReturnType<typeof createDb>;
