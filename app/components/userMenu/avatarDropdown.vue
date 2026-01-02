<script setup lang="ts">
import type { User } from '#auth-utils'
import type { DropdownMenuItem } from '@nuxt/ui'

const { user, clear } = defineProps<{
  user: User
  clear: () => Promise<void>
}>()

const open = ref(false)

const logout = async () => {
  await clear()
  await navigateTo('/')
}

const items = [
  [
    {
      label: user.email,
      slot: 'account' as const,
      disabled: true,
    },
  ], [
    {
      label: 'Settings',
      icon: 'i-heroicons-cog-8-tooth',
      to: '/app/settings',
    },
  ], [
    {
      label: 'Sign out',
      icon: 'i-heroicons-arrow-left-on-rectangle',
      onSelect: async () => await logout(),
    },
  ],
] satisfies DropdownMenuItem[][]

const config = useRuntimeConfig()
const baseUrl = config.public.baseUrl

const avatarPath = computed(() => {
  return user.avatarUrl ? `${baseUrl}/images/${user.avatarUrl}` : undefined
})
</script>

<template>
  <UDropdownMenu
    v-model:open="open"
    arrow
    :items="items"
    :popper="{ placement: 'bottom-start' }"
  >
    <UButton variant="link">
      <UAvatar
        :src="avatarPath"
        :alt="user.name"
      />
    </UButton>

    <template #account="{ item }">
      <div class="text-left">
        <p>
          Signed in as
        </p>
        <p class="truncate font-medium text-neutral-900 dark:text-white">
          {{ item.label }}
        </p>
      </div>
    </template>

    <template #item="{ item }">
      <span class="truncate">{{ item.label }}</span>

      <UIcon
        v-if="'icon' in item && item.icon"
        :name="item.icon"
        class="shrink-0 h-4 w-4 text-neutral-400 dark:text-neutral-500 ms-auto"
      />
    </template>
  </UDropdownMenu>
</template>
