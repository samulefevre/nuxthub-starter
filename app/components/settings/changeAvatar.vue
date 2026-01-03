<script setup lang="ts">
const { user } = useUserSession()
const { chooseFile } = useSettings()

const config = useRuntimeConfig()
const baseUrl = config.public.baseUrl

const avatarPath = computed(() => {
  return user.value?.avatarUrl ? `${baseUrl}/images/${user.value.avatarUrl}` : undefined
})
</script>

<template>
  <UCard v-if="user">
    <template #header>
      <h3 class="font-bold text-lg">
        Avatar
      </h3>
    </template>
    {{ avatarPath }}
    <div class="flex flex-row gap-4 items-center">
      <UAvatar
        :src="avatarPath"
        :alt="user.name"
        size="xl"
      />
      <UButton
        label="Change avatar"
        variant="soft"
        @click="() => chooseFile()"
      />
    </div>
  </UCard>
</template>
