import { getInjection } from '~~/server/di/container'

export const createUserUseCase = async ({ email, name }: { email: string, name: string }): Promise<User> => {
  const userRepository = getInjection('IUserRepository')
  return await userRepository.createUser({ email, name })
}
