export const createUserUseCase = async ({ email, name }: { email: string, name: string }): Promise<User> => {
  return await useContainer().resolve('userRepository').createUser({ email, name })
}
