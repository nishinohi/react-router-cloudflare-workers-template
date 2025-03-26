import dotenv from 'dotenv'
import { defineConfig } from 'drizzle-kit'

dotenv.config({ path: '.env.local' })
const dbUrl = process.env.D1_LOCAL_URL
if (!dbUrl)
  throw Error(
    `The DB URL is not set. Please execute the following command to set a value for D1_LOCAL_URL in .env.local.
$ echo "D1_LOCAL_URL='./.wrangler/state/v3/d1/miniflare-D1DatabaseObject/[your_local].sqlite'" >> .env.local`,
  )

export default defineConfig({
  schema: './db/schema.ts',
  out: './migrations',
  dialect: 'sqlite',
  dbCredentials: {
    url: dbUrl,
  },
})
