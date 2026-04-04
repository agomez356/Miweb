import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.enum([
      'termodinamica',
      'mecanica-cuantica',
      'fisica-clasica',
      'electromagnetismo',
      'relatividad',
    ]),
    pubDate: z.coerce.date(),
    draft: z.boolean().default(false),
    heroImage: z.string().optional(),
  }),
});

export const collections = { blog };
