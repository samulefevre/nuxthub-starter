import { getInjection } from '~~/di/ioc'

export const removeDeleteAccountTokenUsecase = async ({ userId, token }: { userId: number, token: string }) => {
  const deleteAccountTokenRepository = getInjection('IDeleteAccountTokenRepository')
  return await deleteAccountTokenRepository.removeDeleteAccountToken({ userId, token })
}
