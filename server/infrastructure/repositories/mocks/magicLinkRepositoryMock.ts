import { injectable } from 'inversify'
import type { IMagicLinkRepository } from '~~/server/application/repositories'

@injectable()
export class MagicLinkRepositoryMock implements IMagicLinkRepository {
  private magicLinks: MagicLink[] = []

  getMagicLinkByEmail(email: string): Promise<MagicLink | undefined> {
    const magicLink = this.magicLinks.find(ml => ml.email === email)
    return Promise.resolve(magicLink)
  }

  getMagicLinkByToken(token: string): Promise<MagicLink | undefined> {
    const magicLink = this.magicLinks.find(ml => ml.token === token)
    return Promise.resolve(magicLink)
  }

  upsertMagicLink(email: string): Promise<MagicLink | undefined> {
    const token = 'mock-token'
    const tokenTTL = 5 * 60 * 1000 // 5 min
    const tokenExpiresAt = new Date(Date.now() + tokenTTL)

    const magicLink: MagicLink = {
      id: this.magicLinks.length + 1,
      email,
      token,
      createdAt: new Date(),
      updatedAt: new Date(),
      tokenExpiresAt,
    }

    this.magicLinks.push(magicLink)

    return Promise.resolve(magicLink)
  }

  deleteMagicLink(token: string): Promise<MagicLink | undefined> {
    const index = this.magicLinks.findIndex(ml => ml.token === token)

    return index >= 0 ? Promise.resolve(this.magicLinks.splice(index, 1)[0]) : Promise.resolve(undefined)
  }
}
