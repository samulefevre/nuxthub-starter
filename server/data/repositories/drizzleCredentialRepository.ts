import type { DrizzleD1Database } from 'drizzle-orm/d1'
import type * as schema from '@@/server/database/schema'
import * as tables from '@@/server/database/schema'
import type { BetterSQLite3Database } from 'drizzle-orm/better-sqlite3'
import type { ICredentialRepository } from '@@/server/domain/repositories/ICredentialRepository'

export class DrizzleCredentialRepository implements ICredentialRepository {
  private _db: DrizzleD1Database<typeof schema> | BetterSQLite3Database<typeof schema>

  constructor(db: DrizzleD1Database<typeof schema> | BetterSQLite3Database<typeof schema>) {
    this._db = db
  }

  createCredential = async ({
    userId,
    providerId,
    providerKey,
  }: {
    userId: number
    providerId: 'github' | 'email' | 'google' | 'apple' | 'twitter' | 'facebook'
    providerKey: string

  }) => {
    const credential = await useDrizzle().insert(tables.credentials).values({
      providerId,
      providerKey,
      userId,
    }).returning().get()

    if (!credential) {
      throw new Error('Failed to create credential')
    }

    return credential
  }

  getCredential = async ({
    providerKey,
  }: {
    providerKey: string
  }) => {
    const credential = await useDrizzle().select().from(tables.credentials).where(and(eq(tables.credentials.providerKey, providerKey))).get()

    if (!credential) {
      throw new Error('Credential not found')
    }

    return credential
  }

  /* updateCredential = async ({
    userId,
    service,
    accessToken,
    refreshToken,
    expiresAt,
  }: {
    userId: number
    service: string
    accessToken: string
    refreshToken: string
    expiresAt: Date
  }) => {
    const credential = await useDrizzle().update(tables.credentials).set({
      accessToken,
      refreshToken,
      expiresAt,
    }).where(and(
      eq(tables.credentials.userId, userId),
      eq(tables.credentials.service, service),
    )).returning().get()

    if (!credential) {
      throw new Error('Failed to update credential')
    }

    return credential
  }
 */
  /* deleteCredential = async ({
    userId,
    service,
  }: {
    userId: number
    service: string
  }) => {
    await useDrizzle().delete(tables.credentials).where(and(
      eq(tables.credentials.userId, userId),
      eq(tables.credentials.service, service),
    )).returning().get()
  } */
}
