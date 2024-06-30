export interface UserRepository {
  updateAvatar(avatar: File): Promise<
    {
      ok: boolean
      avatarPath: string
    }
  >
}
