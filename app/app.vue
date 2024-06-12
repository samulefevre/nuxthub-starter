<script setup lang="ts">
useSeoMeta({
  title: 'NuxtHub Starter',
  description: 'A Nuxt template to build your next project quickly.',
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <UNotifications />
  <UModals />
</template>
