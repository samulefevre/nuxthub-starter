<script setup lang="ts">
const { session } = useUserSession()
</script>

<template>
  <div>
    <pre>{{ session }}</pre>
  </div>
</template>
