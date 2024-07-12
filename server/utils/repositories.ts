import {
  DrizzleCredentialRepository,
  DrizzleImageRepository,
  DrizzleMagicLinkRepository,
  DrizzleUserRepository,
} from '~~/server/infrastructure/repositories/index'

const credentialRepository = new DrizzleCredentialRepository()
const imageRepository = new DrizzleImageRepository()
const magicLinkRepository = new DrizzleMagicLinkRepository()
const userRepository = new DrizzleUserRepository()

export {
  credentialRepository,
  imageRepository,
  magicLinkRepository,
  userRepository,
}
