export interface IDeleteAccountTokenRepository {
  upsertDeleteAccountToken({
    userId,
  }: {
    userId: number
  }): Promise<DeleteAccountToken | undefined>

  getDeleteAccountToken({
    userId,
    token,
  }: {
    userId: number
    token: string
  }): Promise<DeleteAccountToken | undefined>

  removeDeleteAccountToken({
    userId,
    token,
  }: {
    userId: number
    token: string
  }): Promise<DeleteAccountToken | undefined>
}
