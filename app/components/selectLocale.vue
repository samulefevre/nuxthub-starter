<script setup lang="ts">
import { en, fr } from '@nuxt/ui/locale'

const { locale } = useI18n()
</script>

<template>
  <ULocaleSelect
    v-model="locale"
    :locales="[en, fr]"
  />
</template>
