export const createMagicUserUseCase = async ({ email }: { email: string }): Promise<User> => {
  return await useContainer().resolve('userRepository').createMagicUser({ email })
}
