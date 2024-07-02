import { DrizzleImageRepository, DrizzleUserRepository } from '~~/server/domain/repositories/index'

const imageRepository = new DrizzleImageRepository()
const userRepository = new DrizzleUserRepository()

export {
  userRepository,
  imageRepository,
}
