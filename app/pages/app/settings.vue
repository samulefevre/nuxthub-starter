<script setup lang="ts">
const { user } = useUserSession()
const { chooseFile } = useUser()
</script>

<template>
  <div>
    <h1 class="font-bold text-2xl mb-6">
      Settings
    </h1>
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
  </div>
</template>
