<script setup lang="ts">
const { sendDeleteAccountEmail } = useSettings()
</script>

<template>
  <UCard>
    <template #header>
      <h3 class="font-bold text-lg">
        Account
      </h3>
    </template>
    <div class="flex flex-row gap-4 items-center">
      <p class="text-sm text-neutral-400">
        An email will be sent to you to confirm the deletion of your account.
      </p>
      <UButton
        label="Delete Account"
        variant="soft"
        color="error"
        @click="sendDeleteAccountEmail"
      />
    </div>
  </UCard>
</template>
