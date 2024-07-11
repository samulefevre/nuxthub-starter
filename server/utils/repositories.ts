import {
  DrizzleImageRepository,
  DrizzleUserRepository,
  DrizzleCredentialRepository,
  DrizzleMagicLinkRepository,
} from '~~/server/domain/repositories/index'

const imageRepository = new DrizzleImageRepository()
const userRepository = new DrizzleUserRepository()
const credentialRepository = new DrizzleCredentialRepository()

const magicLinkRepository = new DrizzleMagicLinkRepository()

export {
  userRepository,
  imageRepository,
  credentialRepository,
  magicLinkRepository,
}
