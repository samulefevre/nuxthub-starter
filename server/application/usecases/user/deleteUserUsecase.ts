import { getInjection } from '~~/server/di/container'
import type { User } from '~~/server/entities/models/user'

export const deleteUserUsecase = async (userId: number): Promise<User | undefined> => {
  const userRepository = getInjection('IUserRepository')
  return await userRepository.deleteUser({ userId })
}
