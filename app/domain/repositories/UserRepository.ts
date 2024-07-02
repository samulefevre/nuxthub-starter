export interface UserRepository {
  updateAvatar(avatar: File): Promise<
    {
      ok: boolean
      avatarPath: string
    }
  >
  sendDeleteAccountEmail(): Promise<void>
  deleteAccount({ token }: { token: string }): Promise<void>
}
