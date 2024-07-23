export default defineEventHandler(() => {
  const url = process.env.NUXT_PUBLIC_BASE_URL || 'nourl'

  return {
    message: 'test',
    url,
  }
})
