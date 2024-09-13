<script setup lang="ts">
import type { HeaderLink } from '@nuxt/ui-pro/types'

const links: HeaderLink[] = [
  { label: 'App', to: '/app' },
]
</script>

<template>
  <UHeader
    title="NuxtHub Starter"
    :links
  >
    <template #right>
      <AuthState v-slot="{ loggedIn, clear, user }">
        <template v-if="loggedIn">
          <UserMenuAvatarDropdown
            :user="user!"
            :clear="clear"
          />
        </template>
        <template v-else>
          <UButton
            to="/login"
            label="Login"
            variant="soft"
          />
        </template>
      </AuthState>
    </template>
  </UHeader>
</template>
