export interface UserRepository {
  updateAvatarPath({ userId, avatarPath }: { userId: number, avatarPath: string }): Promise<User | undefined>
  getUser(userId: number): Promise<User | undefined>
  deleteUser({ userId }: { userId: number }): Promise<void>
  createDeleteAccountToken({ userId }: { userId: number }): Promise<string>
  getDeleteAccountToken({ userId, token }: { userId: number, token: string }): Promise<string>
  removeDeleteAccountToken({ userId, token }: { userId: number, token: string }): Promise<void>
}
