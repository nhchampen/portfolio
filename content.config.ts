import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    projects: defineCollection({
      type: 'page',
      source: 'projects/**/*.md',
      schema: z.object({
        title:   z.string(),
        tagline: z.string(),
        type:    z.string(),
        year:    z.union([z.number(), z.string()]),
        tags:    z.array(z.string()),
        stats: z.array(z.object({
          value: z.string(),
          label: z.string(),
        })).optional(),
        next: z.object({
          title: z.string(),
          slug:  z.string(),
        }).optional(),
        links: z.array(z.object({
          url: z.string(),
          label: z.string(),
        })).optional(),
      }),
    }),
  },
})
