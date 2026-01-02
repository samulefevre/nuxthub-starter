<script setup lang="ts">
useSeoMeta({
  title: 'NuxtHub Starter',
  description: 'A Nuxt template to build your next project quickly.',
})
</script>

<template>
  <UApp>
    <AppHeader />
    <UContainer>
      <UMain class="my-6">
        <slot />
      </UMain>
    </UContainer>
    <Footer />
  </UApp>
</template>
