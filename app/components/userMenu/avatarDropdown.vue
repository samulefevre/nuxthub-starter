<script setup lang="ts">
import type { DropdownItem } from '#ui/types'

const { user, clear } = useUserSession()

if (!user.value) {
  throw createError({
    message: 'User not found',
    statusCode: 404,
  })
}

const logout = async () => {
  await clear()
  await navigateTo('/')
}

const items: DropdownItem[][] = [
  [
    {
      label: user.value.email,
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
      click: async () => await logout(),
    },
  ],
]
</script>

<template>
  <UDropdown
    v-if="user"
    :items="items"
    :ui="{ item: { disabled: 'cursor-text select-text' } }"
    :popper="{ placement: 'bottom-start' }"
  >
    <UAvatar
      :src="user.avatarUrl ? `/images/${user.avatarUrl}` : undefined"
      :alt="user.name"
    />

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
        :name="item.icon"
        class="flex-shrink-0 h-4 w-4 text-gray-400 dark:text-gray-500 ms-auto"
      />
    </template>
  </UDropdown>
</template>
