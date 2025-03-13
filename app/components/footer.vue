<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const links = [{
  label: 'Nuxt UI',
  to: 'https://ui.nuxt.com/',
}, {
  label: 'Nuxt Docs',
  to: 'https://nuxt.com',
}, {
  label: 'Nuxt Studio',
  to: 'https://nuxt.studio',
}] satisfies NavigationMenuItem[]
</script>

<template>
  <UFooter :links="links">
    <template #left>
      Copyright © {{ new Date().getFullYear() }}
    </template>

    <template #right>
      <SelectLocale />
      <UColorModeButton size="sm" />
      <UButton
        icon="i-simple-icons-x"
        color="neutral"
        variant="ghost"
        to="https://x.com/nuxt_js"
        target="_blank"
      />
      <UButton
        icon="i-simple-icons-discord"
        color="neutral"
        variant="ghost"
        to="https://discord.com/invite/ps2h6QT"
        target="_blank"
      />
      <UButton
        icon="i-simple-icons-github"
        color="neutral"
        variant="ghost"
        to="https://github.com/nuxt/nuxt"
        target="_blank"
      />
    </template>
  </UFooter>
</template>
