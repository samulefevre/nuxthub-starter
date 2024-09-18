import type { IMagicLinkRepository } from '~~/src/application/repositories'
import type { MagicLink } from '~~/src/entities/models/magicLink'

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

  deleteMagicLink(token: string): Promise<MagicLink> {
    const magicLink = this.magicLinks.find(ml => ml.token === token)

    if (!magicLink) {
      throw new Error('Failed to delete magic link1')
    }

    this.magicLinks = this.magicLinks.filter(ml => ml.token !== token)

    return Promise.resolve(magicLink)
  }
}
