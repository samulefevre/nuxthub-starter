<script setup lang="ts">
import { EButton, EHtml } from 'vue-email'

defineProps<{ url: string }>()
</script>

<template>
  <EHtml lang="en">
    <EButton
      :href="url"
      style="color: #61dafb"
    >
      Click here to login
    </EButton>
  </EHtml>
</template>
