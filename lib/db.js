import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

const DBURL = process.env.LOCAL_DB
const NODE_ENV = process.env.NODE_ENV
const isLocal = NODE_ENV === 'dev'

const client = postgres(DBURL, {
  ssl: isLocal ? { rejectUnauthorized: false } : undefined,
})

export const db = drizzle(client)