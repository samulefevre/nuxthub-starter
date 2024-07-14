import { useEmail } from '@@/server/utils/email'
import type { IDeleteAccountTokenRepository, IUserRepository } from '../repositories'

export const sendDeleteAccountEmailUseCase = async ({
  userRepository,
  deleteAccountTokenRepository,
  userId,
  resendApiKey,
  baseUrl,
  fromEmail,
}: {
  userRepository: IUserRepository
  deleteAccountTokenRepository: IDeleteAccountTokenRepository
  userId: number
  resendApiKey: string
  baseUrl: string
  fromEmail: string
}) => {
  const user = await userRepository.getUser(userId)

  if (!user) {
    throw new Error('User not found')
  }

  const deleteAccountToken = await deleteAccountTokenRepository.upsertDeleteAccountToken({
    userId: user.id,
  })

  if (!deleteAccountToken) {
    throw new Error('Delete account token not created')
  }

  return await useEmail({
    resendApiKey,
    baseUrl,
    fromEmail,
  }).sendDeleteAccountEmail({
    email: user.email,
    token: deleteAccountToken.token,
  })
}

export const deleteAccountUseCase = async ({
  userRepository,
  deleteAccountTokenRepository,
  userId,
  token,
}: {
  userRepository: IUserRepository
  deleteAccountTokenRepository: IDeleteAccountTokenRepository
  userId: number
  token: string
}) => {
  const verifiedToken = await deleteAccountTokenRepository.getDeleteAccountToken({ userId, token })

  if (!verifiedToken) {
    throw new Error('Token not found')
  }

  if (verifiedToken.tokenExpiresAt < new Date()) {
    await deleteAccountTokenRepository.removeDeleteAccountToken({ userId, token })
    throw new Error('Token expired')
  }

  const currentUser = await userRepository.getUser(userId)

  if (!currentUser) {
    throw new Error('User not found')
  }

  if (currentUser.avatar) {
    await hubBlob().delete(userId.toString())
  }

  await deleteAccountTokenRepository.removeDeleteAccountToken({ userId, token })

  const deletedUser = await userRepository.deleteUser({ userId })

  return deletedUser
}
