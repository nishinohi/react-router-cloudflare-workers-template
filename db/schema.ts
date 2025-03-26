import { sql } from 'drizzle-orm'
import { int, integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

const commonTimestamp = {
  updatedAt: integer('updatedAt', { mode: 'timestamp' })
    .default(sql`(unixepoch())`)
    .$onUpdate(() => new Date())
    .notNull(),
  createdAt: integer('createdAt', { mode: 'timestamp' })
    .default(sql`(unixepoch())`)
    .notNull(),
} as const

export const usersTable = sqliteTable('users_table', {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  age: int().notNull(),
  email: text().notNull().unique(),
  ...commonTimestamp,
})
