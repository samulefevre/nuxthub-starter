import type { CredentialRepository } from './credentialRepository'

export class DrizzleCredentialRepository implements CredentialRepository {
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
