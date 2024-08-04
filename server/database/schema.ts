import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'

export const users = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  email: text('email').unique().notNull(),
  avatar: text('avatar'),
  role: text('role', { enum: ['user', 'admin'] }).notNull().default('user'),
  lastLogin: integer('last_login', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().$onUpdateFn(() => new Date()),
})

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
