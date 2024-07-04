import { describe, it, expect } from 'vitest'
// import { FetchError } from 'ofetch'
import { registerEndpoint } from '@nuxt/test-utils/runtime'
import { ApiUserRepository } from '@/domain/repositories/ApiUserRepository'

// Mocking global functions and objects
/* global.FormData = class FormData {
  append() {}
}
global.$fetch = vi.fn() */

describe('ApiUserRepository', () => {
  describe('updateAvatar', () => {
    registerEndpoint('/api/users/updateAvatar',
      {
        method: 'POST',
        handler: () => ({ ok: true }),
      })

    it('should update avatar successfully', async () => {
      const userRepository = new ApiUserRepository()

      // expect return true
      await expect(userRepository.updateAvatar(new File([], 'avatar.png'))).resolves.toStrictEqual({ ok: true })

      /* await expect(userRepository.updateAvatar(new File([], 'avatar.png'))).resolves.not.toThrow() */
    })
  })

  describe('avatar failure', () => {
    registerEndpoint('/api/users/updateAvatar',
      {
        method: 'POST',
        handler: () => ({ ok: false }),
      })

    it('should throw error on fetch failure', async () => {
      const userRepository = new ApiUserRepository()
      // global.$fetch.mockRejectedValueOnce(new FetchError('Failed to update avatar', { statusCode: 400 }))

      await expect(userRepository.updateAvatar(new File([], 'avatar.png'))).rejects.toThrow('Failed to update avatar')
    })

    it('should handle unexpected errors', async () => {
      const userRepository = new ApiUserRepository()
      // global.$fetch.mockRejectedValueOnce(new Error('Unexpected error'))
      /* registerEndpoint('/api/users/updateAvatar',
        {
          method: 'POST',
          handler: () => { throw new Error('Unexpected error') },
        }) */
      await expect(userRepository.updateAvatar(new File([], 'avatar.png'))).rejects.toThrow('Failed to update avatar')
    })
  })

  describe('sendDeleteAccountEmail', () => {
    registerEndpoint('/api/users/sendDeleteAccountEmail',
      {
        method: 'POST',
        handler: () => ({}),
      })

    it('should send delete account email successfully', async () => {
      const userRepository = new ApiUserRepository()
      // global.$fetch.mockResolvedValueOnce({})
      /* registerEndpoint('/api/users/sendDeleteAccountEmail',
        {
          method: 'POST',
          handler: () => ({}),
        }) */
      await expect(userRepository.sendDeleteAccountEmail()).resolves.not.toThrow()
    })

    it('should throw error on failure', async () => {
      const userRepository = new ApiUserRepository()
      // global.$fetch.mockRejectedValueOnce(new Error('Failed to send delete account email'))
      /* registerEndpoint('/api/users/sendDeleteAccountEmail',
        {
          method: 'POST',
          handler: () => { throw new Error('Failed to send delete account email') },
        }) */
      await expect(userRepository.sendDeleteAccountEmail()).rejects.toThrow('Failed to send delete account email')
    })
  })

  describe('deleteAccount', () => {
    registerEndpoint('/api/users/deleteAccount',
      {
        method: 'POST',
        handler: () => ({}),
      })

    it('should delete account successfully', async () => {
      const userRepository = new ApiUserRepository()
      // global.$fetch.mockResolvedValueOnce({})
      /* registerEndpoint('/api/users/deleteAccount',
        {
          method: 'POST',
          handler: () => ({}),
        }) */
      await expect(userRepository.deleteAccount({ token: 'dummy-token' })).resolves.not.toThrow()
    })

    it('should throw error on fetch failure', async () => {
      const userRepository = new ApiUserRepository()
      // global.$fetch.mockRejectedValueOnce(new FetchError('Failed to delete account', { statusCode: 400 }))
      /* registerEndpoint('/api/users/deleteAccount',
        {
          method: 'POST',
          handler: () => ({ ok: false }),
        }) */
      await expect(userRepository.deleteAccount({ token: 'dummy-token' })).rejects.toThrow('Failed to delete account')
    })

    it('should handle unexpected errors', async () => {
      const userRepository = new ApiUserRepository()
      // global.$fetch.mockRejectedValueOnce(new Error('Unexpected error'))
      /* registerEndpoint('/api/users/deleteAccount',
        {
          method: 'POST',
          handler: () => { throw new Error('Unexpected error') },
        }) */
      await expect(userRepository.deleteAccount({ token: 'dummy-token' })).rejects.toThrow('Failed to delete account')
    })
  })
})
