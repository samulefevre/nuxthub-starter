export default defineNuxtRouteMiddleware(async () => {
  const locale = useNuxtApp().$i18n.locale
  const { loggedIn } = useUserSession()

  if (!loggedIn.value) {
    return navigateTo(`/${locale.value}/login`)
  }
})
