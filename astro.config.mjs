// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

// Configuración principal de Astro.
// https://astro.build/config
export default defineConfig({
  // Dominio final de la web. Se usa para generar el sitemap,
  // las URLs canónicas y las etiquetas Open Graph.
  // OJO (verificado en Vercel el 02-10-2026): la APP vive en www.forjia.es
  // (forjia.es redirige 308 a www). Esta web NO puede usar www.forjia.es hasta
  // que la app se mude a app.forjia.es. Todo el código usa Astro.site, así que
  // el día de la mudanza solo hay que cambiar esta línea.
  site: 'https://naveosoft.es',

  // URLs sin barra final (/funciones, no /funciones/). Vercel sirve los .html
  // sin extensión gracias a cleanUrls en vercel.json.
  trailingSlash: 'never',
  build: { format: 'file' },

  // Las redirecciones antiguas (/servicios, /sobre-nosotros, /forjia) viven
  // en vercel.json como 301 de verdad.

  // Integraciones activas.
  integrations: [
    // Genera automáticamente el sitemap.xml al construir la web.
    sitemap(),
    // Permite escribir artículos del blog en Markdown y MDX.
    mdx(),
  ],
});
