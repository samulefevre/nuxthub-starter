import { useEmail } from '@@/server/utils/email'
import type { IUserRepository } from '../repositories'

export const sendDeleteAccountEmailUseCase = async ({
  userRepository,
  userId,
  resendApiKey,
  baseUrl,
  fromEmail,
}: {
  userRepository: IUserRepository
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

  return await useEmail({
    resendApiKey,
    baseUrl,
    fromEmail,
  }).sendDeleteAccountEmail({
    email: user.email,
    token,
  })
}

export const deleteAccountUseCase = async ({
  userRepository,
  userId,
  token,
}: {
  userRepository: IUserRepository
  userId: number
  token: string
}) => {
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
