<script setup lang="ts">
import { Button, Html } from '@vue-email/components'

defineProps<{ url: string }>()
</script>

<template>
  <Html lang="en">
    <Button
      :href="url"
      style="color: #61dafb"
    >
      Click here to login
    </Button>
  </Html>
</template>
