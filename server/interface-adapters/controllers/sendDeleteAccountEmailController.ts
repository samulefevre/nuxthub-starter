import { upsertDeleteAccountTokenUsecase } from '~~/server/application/usecases/deleteAccountToken'
import { sendEmailDeleteAccountUsecase } from '~~/server/application/usecases/email'
import { getUserUsecase } from '~~/server/application/usecases/user'

export const sendDeleteAccountEmailController = async (userId: number) => {
  const user = await getUserUsecase(userId)

  if (!user) {
    throw new Error('User not found')
  }

  const deleteAccountToken = await upsertDeleteAccountTokenUsecase(userId)

  if (!deleteAccountToken) {
    throw new Error('Delete account token not created')
  }

  return await sendEmailDeleteAccountUsecase({
    email: user.email,
    token: deleteAccountToken.token,
  })
}
