export interface MagicLinkRepository {
  getMagicLinkByToken(token: string): Promise<MagicLink | undefined>
  upsertMagicLink(email: string): Promise<string>
  deleteMagicLink(email: string): Promise<void>
}
