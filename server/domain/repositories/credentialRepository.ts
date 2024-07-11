export interface CredentialRepository {
  createCredential({
    userId,
    providerId,
    providerKey,
  }: {
    userId: number
    providerId: 'github' | 'email' | 'google' | 'apple' | 'twitter' | 'facebook'
    providerKey: string
  }): Promise<Credential>

  getCredential({
    providerKey,
  }: {
    providerKey: string
  }): Promise<Credential | undefined>

  /* updateCredential({
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
  }): Promise<Credential> */

}
