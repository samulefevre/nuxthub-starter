import { drizzle } from 'drizzle-orm/d1'

import { users } from '../database/schema/user'
import { magicLinks } from '../database/schema/magicLink'
import { deleteAccountTokens } from '../database/schema/deleteAccountTokens'

export const schema = {
  users,
  magicLinks,
  deleteAccountTokens,
}

export { sql, eq, and, or } from 'drizzle-orm'

export const tables = schema

export function useDrizzle() {
  return drizzle(hubDatabase(), { schema })
}
