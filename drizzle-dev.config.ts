import { defineConfig } from 'drizzle-kit'
import { loadD1Credentials } from 'drizzle/lib/util'

const dbCredentials = loadD1Credentials('develop')

export default defineConfig({
  schema: './db/schema.ts',
  out: './drizzle',
  dialect: 'sqlite',
  driver: 'd1-http',
  dbCredentials,
})
