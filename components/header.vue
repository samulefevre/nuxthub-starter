<script setup lang="ts">
import type { HeaderLink } from '@nuxt/ui-pro/types'

const { loggedIn, clear } = useUserSession()

const links = [
  { label: 'Home', to: '/' },
] satisfies HeaderLink[]

const logout = async () => {
  await clear()
  await navigateTo('/')
}
</script>

<template>
  <UHeader
    title="NuxtHub Starter"
    :links="links"
  >
    <template #right>
      <template v-if="loggedIn">
        <UButton
          label="Logout"
          variant="soft"
          @click="logout"
        />
      </template>
      <template v-else>
        <UButton
          to="/login"
          label="Login"
          variant="soft"
        />
      </template>
    </template>
  </UHeader>
</template>
