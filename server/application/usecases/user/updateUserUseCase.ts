import { getInjection } from '~~/server/di/container'

export const updateUserUseCase = async ({ userId, updatedUser }: { userId: number, updatedUser: Partial<User> }): Promise<User | undefined> => {
  const userRepository = getInjection('IUserRepository')
  return await userRepository.updateUser({
    userId,
    updatedUser,
  })
}
