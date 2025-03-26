import { drizzle, type DrizzleD1Database } from 'drizzle-orm/d1'
import * as schema from '../../db/schema'

let db: DrizzleD1Database<typeof schema>

export const getOrCreateDBClient = (env: Env) => {
  if (db) return db
  db = drizzle(env.DB, { schema })
  return db
}
