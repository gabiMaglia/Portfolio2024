import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

const DBURL = process.env.LOCAL_DB
const NODE_ENV = process.env.NODE_ENV
const isLocal = NODE_ENV === 'dev'

// Usamos globalThis para evitar múltiples conexiones en dev con hot reload
const globalForDb = globalThis

if (!globalForDb.postgresClient) {
  globalForDb.postgresClient = postgres(DBURL, {
    ssl: isLocal ? { rejectUnauthorized: false } : undefined,
    max: 10, // opcional: max conexiones simultáneas
    idle_timeout: 30, // opcional: timeout de conexiones inactivas
  })
}

if (!globalForDb.db) {
  globalForDb.db = drizzle(globalForDb.postgresClient)
}

export const db = globalForDb.db
