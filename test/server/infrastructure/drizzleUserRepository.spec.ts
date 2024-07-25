import 'reflect-metadata'

import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import type { IUserRepository } from '~~/server/application/repositories'

import { destroyContainer, getInjection, initializeContainer } from '~~/server/di/container'

const userData = { email: 'test@example.com', name: 'Test User' }

describe('DrizzleUserRepository', () => {
  let userRepository: IUserRepository

  beforeEach(() => {
    initializeContainer()

    userRepository = getInjection('IUserRepository')
  })

  afterEach(() => {
    destroyContainer()
  })

  it('should create a new user', async () => {
    const createdUser = await userRepository.createUser(userData)

    expect(createdUser?.email).toEqual(userData.email)
    expect(createdUser?.name).toEqual(userData.name)
  })

  it('should create a new magic user', async () => {
    const createdUser = await userRepository.createMagicUser({
      email: userData.email,
    })

    expect(createdUser?.email).toEqual(userData.email)
  })

  it('should find a user by id', async () => {
    const createdUser = await userRepository.createUser(userData)

    expect(createdUser).toBeDefined()

    const user = await userRepository.getUser(createdUser!.id)

    expect(user!.id).toEqual(createdUser!.id)
    expect(user!.email).toEqual(userData.email)
    expect(user!.name).toEqual(userData.name)
  })

  it('should find a user by email', async () => {
    await userRepository.createUser(userData)

    const user = await userRepository.getUserByEmail(userData.email)

    expect(user!.email).toEqual(userData.email)
    expect(user!.name).toEqual(userData.name)
  })

  it('should update a user', async () => {
    const createdUser = await userRepository.createUser(userData)

    expect(createdUser).toBeDefined()

    const updatedUser = {
      name: 'Updated Name',
      email: 'newemail@test.gg',
    }

    const updatedUserDatas = await userRepository.updateUser({
      userId: createdUser!.id,
      updatedUser,
    })

    expect(updatedUserDatas!.id).toEqual(createdUser!.id)
    expect(updatedUserDatas!.name).toEqual(updatedUser.name)
    expect(updatedUserDatas!.email).toEqual(updatedUser.email)
  })

  it('should delete a user', async () => {
    const createdUser = await userRepository.createUser(userData)

    expect(createdUser).toBeDefined()

    await userRepository.deleteUser({ userId: createdUser!.id })

    const user = await userRepository.getUser(createdUser!.id)

    expect(user).toBeUndefined()
  })
})
