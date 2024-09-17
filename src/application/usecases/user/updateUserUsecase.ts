import { getInjection } from '~~/di/ioc'
import type { User } from '~~/src/entities/models/user'

export const updateUserUsecase = async ({ userId, updatedUser }: { userId: number, updatedUser: Partial<User> }): Promise<User> => {
  const userRepository = getInjection('IUserRepository')
  return await userRepository.updateUser({
    userId,
    updatedUser,
  })
}
