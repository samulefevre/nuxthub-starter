import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'
import { users } from './user'

export const deleteAccountTokens = sqliteTable('delete_account_tokens', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: integer('user_id').unique().notNull().references(() => users.id, { onDelete: 'cascade' }),
  token: text('token').notNull(),
  tokenExpiresAt: integer('token_expires_at', { mode: 'timestamp' }).notNull().$defaultFn(() =>
    new Date(Date.now() + 5 * 60 * 1000), // 5 minutes
  ),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()).$onUpdateFn(() => new Date()),
})
