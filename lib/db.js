import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

const DBURL = process.env.DBURL
const NODE_ENV = process.env.NODE_ENV
const isLocal = NODE_ENV === 'dev'

const globalForDb = globalThis

if (!globalForDb.postgresClient) {
  globalForDb.postgresClient = postgres(DBURL, {
    ssl: isLocal ? { rejectUnauthorized: false } : undefined,
    max: 1,
    idle_timeout: 30,
  })
}

if (!globalForDb.db) {
  globalForDb.db = drizzle(globalForDb.postgresClient)
}

export const db = globalForDb.db
