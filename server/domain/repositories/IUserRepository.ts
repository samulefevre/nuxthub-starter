export interface IUserRepository {
  createUser({ email, name }: { email: string, name: string }): Promise<User>
  createMagicUser({ email }: { email: string }): Promise<User>
  getUser(userId: number): Promise<User | undefined>
  getUserByEmail(email: string): Promise<User | undefined>
  updateUser({ userId, updatedUser }: {
    userId: number
    updatedUser: Partial<User>
  }): Promise<User | undefined>
  deleteUser({ userId }: { userId: number }): Promise<User | undefined>
  createDeleteAccountToken({ userId }: { userId: number }): Promise<string>
  getDeleteAccountToken({ userId, token }: { userId: number, token: string }): Promise<DeleteAccountToken | undefined>
  removeDeleteAccountToken({ userId, token }: { userId: number, token: string }): Promise<void>
}
