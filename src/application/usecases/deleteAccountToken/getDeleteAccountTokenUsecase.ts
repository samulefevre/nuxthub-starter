import { getInjection } from '~~/di/ioc'

export const getDeleteAccountTokenUsecase = async ({ userId, token }: { userId: number, token: string }) => {
  const deleteAccountTokenRepository = getInjection('IDeleteAccountTokenRepository')
  return await deleteAccountTokenRepository.getDeleteAccountToken({ userId, token })
}
