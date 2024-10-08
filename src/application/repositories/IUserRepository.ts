import type { User } from '~~/src/entities/models/user'

export interface IUserRepository {
  createUser({ email, name }: { email: string, name: string }): Promise<User>
  createMagicUser({ email }: { email: string }): Promise<User>
  getUser(userId: number): Promise<User | undefined>
  getUserByEmail(email: string): Promise<User | undefined>
  updateUser({ userId, updatedUser }: {
    userId: number
    updatedUser: Partial<User | undefined>
  }): Promise<User>
  deleteUser({ userId }: { userId: number }): Promise<User | undefined>
}
