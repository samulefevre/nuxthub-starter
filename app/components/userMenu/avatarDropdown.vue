<script setup lang="ts">
import type { User } from '#auth-utils'
import type { DropdownMenuItem } from '#ui/types'

const { user, clear } = defineProps<{
  user: User
  clear: () => Promise<void>
}>()

const open = ref(false)

const logout = async () => {
  await clear()
  await navigateTo('/')
}

const items: DropdownMenuItem[][] = [
  [
    {
      label: user.email,
      slot: 'account',
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
]
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
        provider="nuxthub"
        :src="user.avatarUrl ? user.avatarUrl : undefined"
        :alt="user.name"
        label="Open"
      />
    </UButton>

    <template #account="{ item }">
      <div class="text-left">
        <p>
          Signed in as
        </p>
        <p class="truncate font-medium text-gray-900 dark:text-white">
          {{ item.label }}
        </p>
      </div>
    </template>

    <template #item="{ item }">
      <span class="truncate">{{ item.label }}</span>

      <UIcon
        v-if="item.icon"
        :name="item.icon"
        class="flex-shrink-0 h-4 w-4 text-gray-400 dark:text-gray-500 ms-auto"
      />
    </template>
  </UDropdownMenu>
</template>
