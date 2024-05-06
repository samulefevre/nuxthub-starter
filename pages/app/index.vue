<script setup lang="ts">
const { session } = useUserSession()
</script>

<template>
  <div>
    <h1 class="font-bold text-2xl mb-4">
      App
    </h1>
    <pre>{{ session }}</pre>
  </div>
</template>
