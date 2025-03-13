<script setup lang="ts">
const { confirmDeleteAccount } = useSettings()

const route = useRoute()
const token = route.query.token as string

const emit = defineEmits<{ close: [boolean] }>()

const deleteAccount = async ({ token }: { token: string }) => {
  await confirmDeleteAccount({ token })
  emit('close', true)
}
</script>

<template>
  <UModal :close="{ onClick: () => emit('close', false) }">
    <UCard>
      <template #header>
        <h3 class="font-bold text-lg">
          Delete Account
        </h3>
      </template>
      <p class="text-sm text-neutral-400">
        Click the button below to delete your account.
      </p>
      <template #footer>
        <UButton
          label="Delete Account"
          variant="soft"
          color="warning"
          @click="deleteAccount({ token })"
        />
      </template>
    </UCard>
  </UModal>
</template>
