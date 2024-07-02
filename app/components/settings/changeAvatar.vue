<script setup lang="ts">
const { user } = useUserSession()
const { chooseFile } = useUser()
</script>

<template>
  <UCard>
    <template #header>
      <h3 class="font-bold text-lg">
        Avatar
      </h3>
    </template>
    <div class="flex flex-row gap-4 items-center">
      <UAvatar
        :src="`/images/${user?.avatarUrl}` ?? undefined"
        :alt="user?.name"
        size="xl"
      />
      <UButton
        label="Change avatar"
        variant="soft"
        @click="chooseFile"
      />
    </div>
  </UCard>
</template>
