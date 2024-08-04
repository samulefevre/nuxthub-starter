import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'

export const magicLinks = sqliteTable('magic_links', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  email: text('email').unique().notNull(),
  token: text('token').notNull(),
  tokenExpiresAt: integer('token_expires_at', { mode: 'timestamp' }).notNull().$defaultFn(() =>
    new Date(Date.now() + 5 * 60 * 1000), // 5 minutes
  ),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()).$onUpdateFn(() => new Date()),
})
