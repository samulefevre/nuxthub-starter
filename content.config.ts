import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    content: defineCollection({
      type: 'data',
      source: '**/*.yml',
      schema: z.object({
        title: z.string(),
      }),
    })
  }
})