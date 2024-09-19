import { getInjection } from '~~/di/ioc'

export const upsertDeleteAccountTokenUsecase = async (userId: number) => {
  const deleteAccountTokenRepository = getInjection('IDeleteAccountTokenRepository')
  return await deleteAccountTokenRepository.upsertDeleteAccountToken({ userId })
}
