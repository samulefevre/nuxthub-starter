import { getInjection } from '~~/server/di/container'

export const createMagicUserUsecase = async ({ email }: { email: string }): Promise<User | undefined> => {
  const userRepository = getInjection('IUserRepository')
  return await userRepository.createMagicUser({ email })
}
