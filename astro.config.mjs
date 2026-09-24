// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

// Configuración principal de Astro.
// https://astro.build/config
export default defineConfig({
  // Dominio final de la web. Se usa para generar el sitemap,
  // las URLs canónicas y las etiquetas Open Graph.
  site: 'https://www.forjia.es',

  // Redirecciones de las URLs antiguas (web corporativa de Naveosoft)
  // a las nuevas de la web de Forjia, para no perder enlaces ni SEO.
  redirects: {
    '/servicios': '/',
    '/sobre-nosotros': '/',
    '/forjia': '/funciones',
  },

  // Integraciones activas.
  integrations: [
    // Genera automáticamente el sitemap.xml al construir la web.
    sitemap(),
    // Permite escribir artículos del blog en Markdown y MDX.
    mdx(),
  ],
});
