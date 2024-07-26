import { getInjection } from '~~/server/di/container'

export const createUserUsecase = async ({ email, name }: { email: string, name: string }): Promise<User | undefined> => {
  const userRepository = getInjection('IUserRepository')
  return await userRepository.createUser({ email, name })
}
