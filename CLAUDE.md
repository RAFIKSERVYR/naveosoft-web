# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

> El código, los comentarios y el contenido están en **español**. Mantén ese idioma
> al añadir componentes, comentarios o textos. El dueño del proyecto no es
> programador: explica los cambios en español sencillo.

## Qué es

Web pública (escaparate) de **Forjia**, app de control horario/fichaje para pymes
y gestorías en España. Forjia es un producto de **Naveosoft**. Sitio **100 %
estático** hecho con **Astro 5**, orientado a SEO.

- **Dominio de esta web:** `https://www.forjia.es` (el antiguo `naveosoft.es`
  redirige aquí; guía de dominio en `DOMINIO-FORJIA.md`).
- **La app** vive en `https://forjia.es` y es **otro repositorio**
  (`employee-time-tracker`, React + Supabase). Desde esta web solo se enlaza a
  ella: registro `https://forjia.es/registro` (prueba de 30 días gratis), precios
  `https://forjia.es/precios`, comparativa `https://forjia.es/comparativa`,
  privacidad `https://forjia.es/privacidad`. No dupliques aquí lógica de la app.
- **Contacto público:** `info@forjia.es`.
- **Público prioritario:** gestorías/despachos laborales y jefes de pymes. Tono
  cercano y claro; sin promesas legales absolutas ("te ayuda a cumplir", nunca
  "garantiza el cumplimiento").

Páginas: Inicio (`/`), Funciones (`/funciones`), Para gestorías (`/gestorias`),
Precios (`/precios`), Blog (`/blog`), Contacto (`/contacto`).

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
  (`index.astro` → `/`, `funciones.astro` → `/funciones`, etc.). El blog usa una
  ruta dinámica `src/pages/blog/[...slug].astro`.
- **Toda página se envuelve en `src/layouts/BaseLayout.astro`**, que recibe
  `title` y `description` (obligatorios) y opcionalmente `image` y `jsonLd`.
  El layout monta `<head>` vía `SEO.astro`, carga la fuente Inter auto-alojada,
  `global.css`, y ejecuta el script de animación al hacer scroll (elementos con
  clase `.reveal` → `.is-visible`, respetando `prefers-reduced-motion`).
- **SEO centralizado** en `src/components/SEO.astro`: genera metadatos, Open Graph,
  Twitter Cards, URL canónica y JSON-LD. Las URLs canónicas y el sitemap dependen
  de `site` en `astro.config.mjs` (`https://www.forjia.es`) — si cambia el
  dominio (p. ej. en la Fase B a `https://forjia.es`), cámbialo ahí.
- **Blog como content collection** (`src/content.config.ts`): los artículos son
  `.md`/`.mdx` en `src/content/blog/`. El `schema` de Zod valida el frontmatter
  (`title`, `description`, `pubDate` obligatorios; `category` es un enum cerrado:
  `'Fichaje y normativa' | 'Desarrollo' | 'Naveosoft'`). Un frontmatter inválido
  rompe la build. `draft: true` excluye el artículo de la publicación. Autor de
  los artículos: `'Equipo Forjia'` (indícalo en el frontmatter; el valor por
  defecto del schema sigue siendo el antiguo `'Equipo Naveosoft'`). Los
  artículos terminan con una llamada a la acción a `https://forjia.es/registro`.

## Convenciones

- **Estilos**: sistema de design tokens como variables CSS en
  `src/styles/global.css` (`:root`). **Esta es la fuente de verdad de los colores**
  (marca: azul Forjia `--color-primary: #2563EB`). Cada página lleva su CSS
  en un bloque `<style>` local (con scope de Astro) usando esas variables; evita
  colores hardcodeados y prefiere `var(--color-*)`, `var(--radius*)`, `var(--shadow-*)`.
- **Iconos**: SVG de línea inline vía `src/components/Icon.astro`
  (`<Icon name="mail" size={20} />`). Para añadir un icono, agrega su path al
  objeto `paths`; heredan color con `currentColor`.
- Cada componente y página empieza con un comentario de bloque en español que
  explica su propósito. Mantén ese estilo.
- Los botones principales de conversión se llaman **"Empieza gratis"** y llevan a
  `https://forjia.es/registro`.

## Formulario de contacto

`src/pages/contacto.astro` **está activo**: envía por `fetch` a **Web3Forms**
(`api.web3forms.com`) con una `access_key` pública (no es secreta) y muestra estado
de éxito/error sin recargar. El **correo de destino no está en el código**: se
configura en la cuenta de Web3Forms (Linked Emails). Hoy llega a
`info@naveosoft.es`; está PENDIENTE que el dueño lo cambie a `info@forjia.es`.

## Publicar / despliegue

El sitio es estático; se publica el contenido de `dist/`. El flujo habitual es
subir a GitHub y dejar que Vercel (proyecto `naveosoft-web`) reconstruya. No hay
backend. Los pasos de dominio (Vercel + DNS en DonDominio) están en
`DOMINIO-FORJIA.md`; no tocar nunca los registros MX/SPF/DKIM del correo.
