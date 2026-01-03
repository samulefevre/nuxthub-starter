<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const localePath = useLocalePath()

const route = useRoute()

const items = computed<NavigationMenuItem[]>(() => [
  {
    label: 'Home',
    to: '/',
  },
  {
    label: 'Login',
    to: '/login',
    active: route.path.startsWith('/login'),
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
          <div class="flex flex-row gap-4 justify-center items-center ">
            <div class="flex-1">
              <UButton
                label="App"
                :to="localePath('/app')"
                color="primary"
                icon="i-heroicons-arrow-right-20-solid"
                trailing
              />
            </div>
            <UserMenuAvatarDropdown
              :user="user!"
              :clear="clear"
            />
          </div>
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
