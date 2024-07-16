<script setup lang="ts">
const { confirmDeleteAccount } = useSettings()

const route = useRoute()
const token = route.query.token as string

const modal = useModal()

const deleteAccount = async ({ token }: { token: string }) => {
  await confirmDeleteAccount({ token })
  modal.close()
}
</script>

<template>
  <UModal>
    <UCard>
      <template #header>
        <h3 class="font-bold text-lg">
          Delete Account
        </h3>
      </template>
      <p class="text-sm text-gray-400">
        Click the button below to delete your account.
      </p>
      <template #footer>
        <UButton
          label="Delete Account"
          variant="soft"
          color="red"
          @click="deleteAccount({ token })"
        />
      </template>
    </UCard>
  </UModal>
</template>
