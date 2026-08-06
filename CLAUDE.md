# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

> El código, los comentarios y el contenido están en **español**. Mantén ese idioma
> al añadir componentes, comentarios o textos. El dueño del proyecto no es
> programador: explica los cambios en español sencillo.

## Qué es

Web corporativa de **Naveosoft** (desarrollo de software a medida) y de su producto
**Forjia** (app de fichaje/control de presencia). Sitio **100% estático** hecho con
**Astro 5**, orientado a SEO. Dominio de producción: `naveosoft.es`.

## Comandos

```bash
npm install       # instalar dependencias
npm run dev       # servidor local en http://localhost:4321
npm run build     # genera el sitio en dist/ (incluye el sitemap)
npm run preview   # previsualiza dist/ antes de publicar
```

No hay tests ni linter configurados. La verificación real es `npm run build`
(usa TypeScript en modo `strict`, así que un error de tipos o de schema del blog
rompe la build).

## Arquitectura

- **Enrutado por archivos**: cada `.astro` en `src/pages/` es una URL
  (`index.astro` → `/`, `forjia.astro` → `/forjia`, etc.). El blog usa una ruta
  dinámica `src/pages/blog/[...slug].astro`.
- **Toda página se envuelve en `src/layouts/BaseLayout.astro`**, que recibe
  `title` y `description` (obligatorios) y opcionalmente `image` y `jsonLd`.
  El layout monta `<head>` vía `SEO.astro`, carga la fuente Inter auto-alojada,
  `global.css`, y ejecuta el script de animación al hacer scroll (elementos con
  clase `.reveal` → `.is-visible`, respetando `prefers-reduced-motion`).
- **SEO centralizado** en `src/components/SEO.astro`: genera metadatos, Open Graph,
  Twitter Cards, URL canónica y JSON-LD. Las URLs canónicas y el sitemap dependen
  de `site` en `astro.config.mjs` — si cambia el dominio, cámbialo ahí.
- **Blog como content collection** (`src/content.config.ts`): los artículos son
  `.md`/`.mdx` en `src/content/blog/`. El `schema` de Zod valida el frontmatter
  (`title`, `description`, `pubDate` obligatorios; `category` es un enum cerrado:
  `'Fichaje y normativa' | 'Desarrollo' | 'Naveosoft'`). Un frontmatter inválido
  rompe la build. `draft: true` excluye el artículo de la publicación.

## Convenciones

- **Estilos**: sistema de design tokens como variables CSS en
  `src/styles/global.css` (`:root`). **Esta es la fuente de verdad de los colores**
  (marca actual: azul acero `--color-primary: #43629f`). Cada página lleva su CSS
  en un bloque `<style>` local (con scope de Astro) usando esas variables; evita
  colores hardcodeados y prefiere `var(--color-*)`, `var(--radius*)`, `var(--shadow-*)`.
- **Iconos**: SVG de línea inline vía `src/components/Icon.astro`
  (`<Icon name="mail" size={20} />`). Para añadir un icono, agrega su path al
  objeto `paths`; heredan color con `currentColor`.
- Cada componente y página empieza con un comentario de bloque en español que
  explica su propósito. Mantén ese estilo.

## Formulario de contacto

`src/pages/contacto.astro` **ya está activo**: envía por `fetch` a **Web3Forms**
(`api.web3forms.com`) con una `access_key` pública (no es secreta) y muestra estado
de éxito/error sin recargar. Nota: el README y el comentario de cabecera del archivo
aún dicen "pendiente" — están desactualizados.

## Publicar / despliegue

El sitio es estático; se publica el contenido de `dist/`. El flujo habitual es
subir a GitHub y dejar que el hosting (p. ej. Vercel) reconstruya. No hay backend.
