<script setup lang="ts">
import * as locales from '@nuxt/ui-pro/locale'

useSeoMeta({
  title: 'NuxtHub Starter',
  description: 'A Nuxt template to build your next project quickly.',
})

const { locale } = useI18n()
</script>

<template>
  <UApp :locale="locales[locale]">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
