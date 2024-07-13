import {
  DrizzleCredentialRepository,
  DrizzleImageRepository,
  DrizzleMagicLinkRepository,
} from '@@/server/data/repositories'

const credentialRepository = new DrizzleCredentialRepository()
const imageRepository = new DrizzleImageRepository()
const magicLinkRepository = new DrizzleMagicLinkRepository()

export {
  credentialRepository,
  imageRepository,
  magicLinkRepository,
}
