export interface IMagicLinkRepository {
  getMagicLinkByEmail(email: string): Promise<MagicLink | undefined>
  getMagicLinkByToken(token: string): Promise<MagicLink | undefined>
  upsertMagicLink(email: string): Promise<MagicLink | undefined>
  deleteMagicLink(token: string): Promise<MagicLink | undefined>
}
