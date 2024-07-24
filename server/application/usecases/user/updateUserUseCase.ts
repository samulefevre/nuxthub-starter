export const updateUserUseCase = async ({ userId, updatedUser }: { userId: number, updatedUser: Partial<User> }): Promise<User | undefined> => {
  return await useContainer().resolve('userRepository').updateUser({
    userId,
    updatedUser,
  })
}
