<script setup lang="ts">
import { AccountModalsConfirmDeleteAccount } from '#components'

const modal = useModal()

const openModal = () => {
  modal.open(AccountModalsConfirmDeleteAccount)
}
</script>

<template>
  <UCard>
    <template #header>
      <h3 class="font-bold text-lg">
        Delete Account
      </h3>
    </template>

    <div class="flex flex-row gap-4 items-center">
      <p class="text-sm text-neutral-400">
        Click the button below to delete your account.
      </p>
      <UButton
        label="Delete Account"
        variant="soft"
        color="error"
        @click="openModal"
      />
    </div>
  </UCard>
</template>
