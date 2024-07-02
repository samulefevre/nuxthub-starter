export interface UserRepository {
  updateAvatarPath({
    userId,
    avatarPath,
  }: {
    userId: number
    avatarPath: string
  }): Promise<User | undefined>
  getUser(userId: number): Promise<User | undefined>
}
