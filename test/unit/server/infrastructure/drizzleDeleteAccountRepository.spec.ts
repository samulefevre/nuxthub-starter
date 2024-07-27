import 'reflect-metadata'

import { describe, it, expect, beforeEach, afterEach } from 'vitest'

import type { IDeleteAccountTokenRepository } from '~~/server/application/repositories'
import { destroyContainer, getInjection, initializeContainer } from '~~/server/di/container'

describe('DrizzleDeleteAccountRepository', () => {
  let deleteAccountTokenRepository: IDeleteAccountTokenRepository

  beforeEach(() => {
    initializeContainer()

    deleteAccountTokenRepository = getInjection('IDeleteAccountTokenRepository')
  })

  afterEach(() => {
    destroyContainer()
  })

  it('should create a delete account token', async () => {
    const token = await deleteAccountTokenRepository.upsertDeleteAccountToken({
      userId: 1,
    })

    expect(token).toBeDefined()
  })

  it('should get a delete account token', async () => {
    const createdDeleteAccountToken = await deleteAccountTokenRepository.upsertDeleteAccountToken({
      userId: 1,
    })

    const deleteAccountToken = await deleteAccountTokenRepository.getDeleteAccountToken({
      userId: createdDeleteAccountToken!.userId,
      token: createdDeleteAccountToken!.token,
    })

    expect(deleteAccountToken).toBeDefined()
  })

  it('should not get a delete account token with wrong token', async () => {
    const newDeleteAccountToken = await deleteAccountTokenRepository.upsertDeleteAccountToken({
      userId: 1,
    })

    expect(newDeleteAccountToken).toBeDefined()

    const deleteAccountToken = await deleteAccountTokenRepository.getDeleteAccountToken({
      userId: 1,
      token: 'wrong-token',
    })

    expect(deleteAccountToken).toBeUndefined()
  })

  it('should not get a delete account token with wrong user id', async () => {
    const createdDeleteAccountToken = await deleteAccountTokenRepository.upsertDeleteAccountToken({
      userId: 1,
    })

    const deleteAccountToken = await deleteAccountTokenRepository.getDeleteAccountToken({
      userId: 10,
      token: createdDeleteAccountToken!.token,
    })

    expect(deleteAccountToken).toBeUndefined()
  })

  it('should not get a delete account token with wrong user id and token', async () => {
    await deleteAccountTokenRepository.upsertDeleteAccountToken({
      userId: 1,
    })

    const deleteAccountToken = await deleteAccountTokenRepository.getDeleteAccountToken({
      userId: 10,
      token: 'wrong-token',
    })

    expect(deleteAccountToken).toBeUndefined()
  })

  it('should remove a delete account token', async () => {
    const createdDeleteAccountToken = await deleteAccountTokenRepository.upsertDeleteAccountToken({
      userId: 1,
    })

    expect(createdDeleteAccountToken).toBeDefined()

    const deletedAccountToken = await deleteAccountTokenRepository.removeDeleteAccountToken({
      userId: createdDeleteAccountToken!.userId,
      token: createdDeleteAccountToken!.token,
    })

    expect(deletedAccountToken).toBeDefined()
  })

  it('should not remove a delete account token with wrong token', async () => {
    await deleteAccountTokenRepository.upsertDeleteAccountToken({
      userId: 1,
    })

    const removedDeleteAccount = await deleteAccountTokenRepository.removeDeleteAccountToken({
      userId: 1,
      token: 'wrong-token',
    })

    expect(removedDeleteAccount).toBeUndefined()
  })

  it('should not remove a delete account token with wrong userId and good token', async () => {
    const deleteAccountToken = await deleteAccountTokenRepository.upsertDeleteAccountToken({
      userId: 1,
    })

    expect(deleteAccountToken).toBeDefined()

    const removedDeleteAccount = await deleteAccountTokenRepository.removeDeleteAccountToken({
      userId: 10,
      token: deleteAccountToken!.token,
    })

    expect(removedDeleteAccount).toBeUndefined()
  })
})
