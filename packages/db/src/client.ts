import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

export function createDb(url: string) {
  const client = postgres(url, {
    ssl: { rejectUnauthorized: false },
    max: 1,
    // D-19: la base tiene pocas conexiones. Una ociosa se suelta a los 5 s (antes 30) y ninguna
    // vive más de 5 min, así las funciones viejas de un deploy anterior no retienen el cupo.
    idle_timeout: 5,
    max_lifetime: 60 * 5,
    connect_timeout: 10,
  });
  return drizzle(client, { schema });
}

export type DB = ReturnType<typeof createDb>;
