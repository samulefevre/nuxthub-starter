import { getDeleteAccountTokenUseCase, removeDeleteAccountTokenUseCase } from '~~/server/application/usecases/deleteAccountToken'
import { deleteAvatarUseCase } from '~~/server/application/usecases/image'
import { deleteUserUseCase, getUserUseCase } from '~~/server/application/usecases/user'

interface IDeleteAccount {
  userId: number
  token: string
}

export async function deleteAccountController({ userId,
  token }: IDeleteAccount) {
  const verifiedToken = await getDeleteAccountTokenUseCase({ userId, token })

  if (!verifiedToken) {
    throw new Error('Token not found')
  }

  if (verifiedToken.tokenExpiresAt < new Date()) {
    await removeDeleteAccountTokenUseCase({ userId, token })
    throw new Error('Token expired')
  }

  const currentUser = await getUserUseCase(userId)

  if (!currentUser) {
    throw new Error('User not found')
  }

  if (currentUser.avatar) {
    await deleteAvatarUseCase(userId.toString())
  }

  await removeDeleteAccountTokenUseCase({ userId, token })

  const deletedUser = await deleteUserUseCase(userId)

  return deletedUser
}
