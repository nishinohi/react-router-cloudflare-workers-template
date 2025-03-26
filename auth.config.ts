import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { drizzle } from 'drizzle-orm/better-sqlite3'

// Since this is a configuration file for better-auth to generate the schema for drizzle,
// the database does not need to exist.
export const auth = betterAuth({
  database: drizzleAdapter(drizzle('dummy'), {
    provider: 'sqlite',
  }),
})
