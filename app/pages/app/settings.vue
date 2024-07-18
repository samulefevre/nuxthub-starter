<script setup lang="ts">
definePageMeta({
  layout: 'app',
})
</script>

<template>
  <div>
    <h1 class="font-bold text-2xl mb-6">
      Settings
    </h1>
    <div class="flex flex-col gap-6">
      <SettingsChangeAvatar />
      <SettingsDeleteAccount />
    </div>
  </div>
</template>
