<script setup lang="ts">
import type { HeaderLink } from '@nuxt/ui-pro/types'

const { loggedIn } = useUserSession()

const links: HeaderLink[] = [
  { label: 'Home', to: '/' },
]
</script>

<template>
  <UHeader
    title="NuxtHub Starter"
    :links="links"
  >
    <template #right>
      <template v-if="loggedIn">
        <UserMenuAvatarDropdown />
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
