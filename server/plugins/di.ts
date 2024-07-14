import { DrizzleUserRepository } from '@@/server/data/repositories'

import { UpdateAvatarUseCase } from '@@/server/domain/usecases/updateAvatarUseCase'

export default defineNitroPlugin((nitroApp) => {
  onHubReady(async () => {
    const db = useDrizzle()
    const userRepository = new DrizzleUserRepository(db)

    const updateAvatarUseCase = new UpdateAvatarUseCase(userRepository)

    console.log('REGISTERING UPDATE AVATAR USE CASE')

    nitroApp.updateAvatarUseCase = updateAvatarUseCase
  })
})
