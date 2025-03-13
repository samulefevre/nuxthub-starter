<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

const schema = z.object({
  email: z.string().email('Invalid email'),
})

type Schema = z.output<typeof schema>

const emailSend = ref(false)
const isSubmitting = ref(false)

const toast = useToast()

const state = reactive<Partial<Schema>>({
  email: undefined,
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  try {
    isSubmitting.value = true

    await useUsersApi().sendMagicLink(event.data.email)

    emailSend.value = true
    state.email = undefined
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  catch (error) {
    toast.add({
      title: 'Failed to send email',
      color: 'error',
    })
  }
  finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div>
    <UAlert
      v-if="emailSend"
      type="success"
      title="An email with a magic link has been sent to your email address."
      description="Click the link in the email to login."
      color="primary"
      variant="subtle"
      class="mb-4"
    />
    <UCard>
      <UForm
        :schema="schema"
        :state="state"
        class="space-y-4"
        @submit="onSubmit"
      >
        <UFormField
          label="Email"
          name="email"
        >
          <UInput
            v-model="state.email"
            type="email"
          />
        </UFormField>

        <UButton
          type="submit"
          :loading="isSubmitting"
        >
          Submit
        </UButton>
      </UForm>
    </UCard>
  </div>
</template>
