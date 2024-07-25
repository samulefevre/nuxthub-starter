import { getDeleteAccountTokenUsecase, removeDeleteAccountTokenUsecase } from '~~/server/application/usecases/deleteAccountToken'
import { deleteAvatarUseCase } from '~~/server/application/usecases/image'
import { deleteUserUseCase, getUserUseCase } from '~~/server/application/usecases/user'

interface IDeleteAccount {
  userId: number
  token: string
}

export async function deleteAccountController({ userId,
  token }: IDeleteAccount) {
  const verifiedToken = await getDeleteAccountTokenUsecase({ userId, token })

  if (!verifiedToken) {
    throw new Error('Token not found')
  }

  if (verifiedToken.tokenExpiresAt < new Date()) {
    await removeDeleteAccountTokenUsecase({ userId, token })
    throw new Error('Token expired')
  }

  const currentUser = await getUserUseCase(userId)

  if (!currentUser) {
    throw new Error('User not found')
  }

  if (currentUser.avatar) {
    await deleteAvatarUseCase(userId.toString())
  }

  await removeDeleteAccountTokenUsecase({ userId, token })

  const deletedUser = await deleteUserUseCase(userId)

  return deletedUser
}
