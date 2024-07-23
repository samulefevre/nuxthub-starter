export const createMagicUserUseCase = async ({ email }: { email: string }): Promise<User> => {
  return await resolve('userRepository').createMagicUser({ email })
}
