export const sendDeleteAccountEmailUseCase = async ({ userId, resendApiKey, baseUrl, fromEmail }: {
  userId: number
  resendApiKey: string
  baseUrl: string
  fromEmail: string
}) => {
  const user = await userRepository.getUser(userId)

  if (!user) {
    throw new Error('User not found')
  }

  const token = await userRepository.createDeleteAccountToken({
    userId: user.id,
  })

  await useEmail({
    resendApiKey,
    baseUrl,
    fromEmail,
  }).sendDeleteAccountEmail({
    email: user.email,
    token,
  })
}

export const deleteAccountUseCase = async ({ userId, token }: { userId: number, token: string }) => {
  const verifiedToken = await userRepository.getDeleteAccountToken({ userId, token })

  if (!verifiedToken) {
    throw new Error('Token not found')
  }

  const currentUser = await userRepository.getUser(userId)

  if (!currentUser) {
    throw new Error('User not found')
  }

  if (currentUser.avatar) {
    await hubBlob().delete(userId.toString())
  }

  await userRepository.removeDeleteAccountToken({ userId, token })

  const deletedUser = await userRepository.deleteUser({ userId })

  return deletedUser
}
