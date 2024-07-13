export interface IMagicLinkRepository {
  getMagicLinkByToken(token: string): Promise<MagicLink | undefined>
  upsertMagicLink(email: string): Promise<MagicLink | undefined>
  deleteMagicLink(email: string): Promise<MagicLink | undefined>
}
