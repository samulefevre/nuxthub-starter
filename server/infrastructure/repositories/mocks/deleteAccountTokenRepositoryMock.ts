import { injectable } from 'inversify'
import type { IDeleteAccountTokenRepository } from '~~/server/application/repositories'

@injectable()
export class DeleteAccountTokenRepositoryMock implements IDeleteAccountTokenRepository {
  private deleteAccountTokens: DeleteAccountToken[] = []

  upsertDeleteAccountToken({ userId }: { userId: number }): Promise<DeleteAccountToken | undefined> {
    const token = 'mock-token'
    const tokenTTL = 5 * 60 * 1000 // 5 min
    const tokenExpiresAt = new Date(Date.now() + tokenTTL)

    const deleteAccountToken: DeleteAccountToken = {
      id: this.deleteAccountTokens.length + 1,
      userId,
      token,
      createdAt: new Date(),
      updatedAt: new Date(),
      tokenExpiresAt,
    }

    this.deleteAccountTokens.push(deleteAccountToken)

    return Promise.resolve(deleteAccountToken)
  }

  getDeleteAccountToken({ userId, token }: { userId: number, token: string }): Promise<DeleteAccountToken | undefined> {
    const deleteAccountToken = this.deleteAccountTokens.find(dat => dat.userId === userId && dat.token === token)
    return Promise.resolve(deleteAccountToken)
  }

  removeDeleteAccountToken({ userId, token }: { userId: number, token: string }): Promise<DeleteAccountToken | undefined> {
    const index = this.deleteAccountTokens.findIndex(dat => dat.userId === userId && dat.token === token)

    return index >= 0 ? Promise.resolve(this.deleteAccountTokens.splice(index, 1)[0]) : Promise.resolve(undefined)
  }
}
