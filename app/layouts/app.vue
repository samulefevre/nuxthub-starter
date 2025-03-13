<script setup lang="ts">
import { en, fr } from '@nuxt/ui/locale'

const locales = {
  en,
  fr,
}

useSeoMeta({
  title: 'NuxtHub Starter',
  description: 'A Nuxt template to build your next project quickly.',
})

const { locale } = useI18n()
</script>

<template>
  <UApp :locale="locales[locale]">
    <AppHeader />
    <UContainer>
      <UMain class="my-6">
        <slot />
      </UMain>
    </UContainer>
    {{ locale }}
    <Footer />
  </UApp>
</template>
