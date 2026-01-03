<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const route = useRoute()

const items = computed<NavigationMenuItem[]>(() => [
  {
    label: 'App',
    to: '/app',
    active: route.path.startsWith('/app'),
  },
])
</script>

<template>
  <UHeader
    title="NuxtHub Starter"
  >
    <UNavigationMenu :items="items" />
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
    <template #body>
      <UNavigationMenu
        :items="items"
        orientation="vertical"
        class="-mx-2.5"
      />
    </template>
  </UHeader>
</template>
