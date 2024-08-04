import { getInjection } from '~~/server/di/container'
import type { User } from '~~/server/entities/models/user'

export const getUserUsecase = async (userId: number): Promise<User | undefined> => {
  const userRepository = getInjection('IUserRepository')
  return await userRepository.getUser(userId)
}
