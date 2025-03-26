import { defineConfig } from 'drizzle-kit'
import { loadD1Credentials } from 'drizzle/lib/util'

const dbCredentials = loadD1Credentials('production')

export default defineConfig({
  schema: './db/schema.ts',
  out: './migrations',
  dialect: 'sqlite',
  driver: 'd1-http',
  dbCredentials,
})
