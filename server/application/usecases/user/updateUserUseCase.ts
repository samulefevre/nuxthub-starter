export const updateUserUseCase = async ({ userId, updatedUser }: { userId: number, updatedUser: Partial<User> }): Promise<User | undefined> => {
  return await resolve('userRepository').updateUser({
    userId,
    updatedUser,
  })
}
