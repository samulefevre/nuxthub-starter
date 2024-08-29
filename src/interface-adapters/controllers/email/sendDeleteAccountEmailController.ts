import { startSpan } from '@sentry/nuxt'
import { upsertDeleteAccountTokenUsecase } from '~~/src/application/usecases/deleteAccountToken'
import { sendEmailDeleteAccountUsecase } from '~~/src/application/usecases/email'
import { getUserUsecase } from '~~/src/application/usecases/user'

export const sendDeleteAccountEmailController = async (userId: number) => {
  return await startSpan(
    {
      name: 'sendDeleteAccount Controller',
    },
    async () => {
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
    },
  )
}
