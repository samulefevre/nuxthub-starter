import type { schema } from '~~/server/utils/drizzle'

export type DeleteAccountToken = typeof schema.deleteAccountTokens.$inferSelect
