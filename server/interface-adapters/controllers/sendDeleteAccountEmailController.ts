import { upsertDeleteAccountTokenUseCase } from '~~/server/application/usecases/deleteAccountToken'
import { sendEmailDeleteAccountUseCase } from '~~/server/application/usecases/email'
import { getUserUseCase } from '~~/server/application/usecases/user'

export const sendDeleteAccountEmailController = async (userId: number) => {
  const user = await getUserUseCase(userId)

  if (!user) {
    throw new Error('User not found')
  }

  const deleteAccountToken = await upsertDeleteAccountTokenUseCase(userId)

  if (!deleteAccountToken) {
    throw new Error('Delete account token not created')
  }

  return await sendEmailDeleteAccountUseCase({
    email: user.email,
    token: deleteAccountToken.token,
  })
}
