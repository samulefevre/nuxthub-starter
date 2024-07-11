export interface MagicLinkRepository {
  getMagicLink(email: string): Promise<MagicLink | undefined>
  upsertMagicLink(email: string): Promise<string>
  deleteMagicLink(email: string): Promise<void>
}
