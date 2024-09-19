import { getInjection } from '~~/di/ioc'
import type { User } from '~~/src/entities/models/user'

export const getUserUsecase = async (userId: number): Promise<User | undefined> => {
  const userRepository = getInjection('IUserRepository')
  return await userRepository.getUser(userId)
}
