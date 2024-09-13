<script setup lang="ts">
import type { HeaderLink } from '@nuxt/ui-pro/types'

const localePath = useLocalePath()

const links: HeaderLink[] = [
  { label: 'Home', to: '/' },
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
          <div class="flex flex-row gap-4 justify-center items-center ">
            <div class="flex-1">
              <UButton
                label="App"
                :to="localePath('/app')"
                color="black"
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
  </UHeader>
</template>
