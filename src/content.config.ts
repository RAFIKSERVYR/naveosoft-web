import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Colección "blog".
 * Lee todos los archivos .md y .mdx dentro de src/content/blog/.
 * El "schema" define qué datos debe llevar cada artículo en su cabecera
 * (frontmatter). Si falta uno obligatorio, Astro avisará con un error claro.
 */
const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    // Título del artículo (obligatorio).
    title: z.string(),
    // Descripción breve para el listado y el SEO (obligatorio).
    description: z.string(),
    // Fecha de publicación (obligatorio). Formato: AAAA-MM-DD.
    pubDate: z.coerce.date(),
    // Fecha de última actualización (opcional).
    updatedDate: z.coerce.date().optional(),
    // Autor. Si no se indica, se usa "Equipo Naveosoft".
    author: z.string().default('Equipo Naveosoft'),
    // Categoría del artículo.
    category: z
      .enum(['Fichaje y normativa', 'Desarrollo', 'Naveosoft'])
      .default('Naveosoft'),
    // Etiquetas (opcional).
    tags: z.array(z.string()).default([]),
    // Imagen de portada (opcional): ruta dentro de /public, ej. "/blog/mi-imagen.jpg".
    heroImage: z.string().optional(),
    // Marcar como borrador para que no se publique todavía.
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
