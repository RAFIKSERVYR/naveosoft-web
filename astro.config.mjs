// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

// Configuración principal de Astro.
// https://astro.build/config
export default defineConfig({
  // Dominio final de la web. Se usa para generar el sitemap,
  // las URLs canónicas y las etiquetas Open Graph.
  site: 'https://naveosoft.es',

  // Integraciones activas.
  integrations: [
    // Genera automáticamente el sitemap.xml al construir la web.
    sitemap(),
    // Permite escribir artículos del blog en Markdown y MDX.
    mdx(),
  ],
});
