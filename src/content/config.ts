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
    heroAlt: z.string().optional(),
    heroCaption: z.string().optional(),
    heroWidth: z.number().int().positive().optional(),
    heroHeight: z.number().int().positive().optional(),
  }),
});

export const collections = { blog };
