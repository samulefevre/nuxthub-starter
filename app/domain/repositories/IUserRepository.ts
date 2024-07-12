export interface IUserRepository {
  updateAvatar(avatar: File): Promise<void>
  sendDeleteAccountEmail(): Promise<void>
  deleteAccount({ token }: { token: string }): Promise<void>
}
