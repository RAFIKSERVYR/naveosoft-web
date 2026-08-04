# Naveosoft — Web corporativa

Web corporativa de **Naveosoft**, empresa de desarrollo de software a medida y
creadora de **Forjia** (app de control de presencia y fichaje). Construida con
[Astro](https://astro.build) como sitio estático, orientada a SEO.

Dominio: **naveosoft.es**

## 🧞 Comandos

Todos se ejecutan desde la carpeta del proyecto, en una terminal:

| Comando           | Qué hace                                             |
| :---------------- | :--------------------------------------------------- |
| `npm install`     | Instala las dependencias                             |
| `npm run dev`     | Arranca la web en local en `http://localhost:4321`   |
| `npm run build`   | Genera la web final en la carpeta `dist/`            |
| `npm run preview` | Previsualiza la web ya construida, antes de publicar |

## 📁 Estructura

```
src/
├── components/     Piezas reutilizables (Header, Footer, SEO)
├── content/
│   └── blog/       Artículos del blog (archivos .md / .mdx)
├── content.config.ts   Definición de la colección del blog
├── layouts/        Plantilla base común a todas las páginas
├── pages/          Cada archivo es una página de la web
│   ├── index.astro         Inicio (/)
│   ├── forjia.astro        Forjia (/forjia)
│   ├── servicios.astro     Servicios (/servicios)
│   ├── sobre-nosotros.astro
│   ├── contacto.astro
│   └── blog/               Listado y artículos del blog
└── styles/
    └── global.css   Colores de marca y estilos globales
public/              Archivos estáticos (favicon, imágenes, robots.txt)
```

## ✍️ Publicar un artículo en el blog

1. Crea un archivo `.md` nuevo en `src/content/blog/`.
   El nombre del archivo será su dirección web.
2. Añade la cabecera y escribe el contenido:

```markdown
---
title: 'Título del artículo'
description: 'Resumen breve para Google y redes.'
pubDate: 2026-08-10
category: 'Fichaje y normativa'  # o 'Desarrollo' o 'Naveosoft'
tags: ['fichaje', 'consejos']
draft: false
---

Contenido del artículo en texto normal (Markdown).
```

3. Guarda. Si el proyecto está en Vercel, súbelo a GitHub y la web se
   actualizará automáticamente.

## 🎨 Colores de marca

Definidos como variables CSS en `src/styles/global.css`:

- Azul primario `#3B82F6`
- Azul cielo (acento) `#38BDF8`
- Oscuros `#111827` y `#0B1120`
- Fondo claro `#F8FAFC`

## 📝 Pendiente

- Activar el envío del formulario de contacto (`src/pages/contacto.astro`).
