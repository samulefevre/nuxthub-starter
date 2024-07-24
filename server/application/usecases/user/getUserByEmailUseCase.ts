import { DrizzleUserRepository } from '~~/server/infrastructure/repositories'

export const getUserByEmailUseCase = async (email: string) => {
  return await new DrizzleUserRepository().getUserByEmail(email)
}
