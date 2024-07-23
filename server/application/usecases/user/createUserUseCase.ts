export const createUserUseCase = async ({ email, name }: { email: string, name: string }): Promise<User> => {
  return await resolve('userRepository').createUser({ email, name })
}
