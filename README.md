# Forjia — Web pública

Web pública de **Forjia**, la app de control horario y fichaje para pymes y
gestorías en España. Forjia es un producto de **Naveosoft**. Construida con
[Astro](https://astro.build) como sitio 100 % estático, orientada a SEO.

- **Esta web (escaparate):** https://naveosoft.es (www.forjia.es es la app; no usar para la web)
- **La app (donde se ficha y se registra uno):** https://forjia.es — vive en otro
  repositorio, `employee-time-tracker`. Aquí solo enlazamos a ella
  (`/registro`, `/precios`, `/comparativa`, `/privacidad`).
- **Contacto público:** info@forjia.es
- La web se queda en naveosoft.es por decisión del 24-09-2026 (ver
  `DOMINIO-FORJIA.md`).

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
├── components/     Piezas reutilizables (Header, Footer, SEO, Icon)
├── content/
│   └── blog/       Artículos del blog (archivos .md / .mdx)
├── content.config.ts   Definición de la colección del blog
├── layouts/        Plantilla base común a todas las páginas
├── pages/          Cada archivo es una página de la web
│   ├── index.astro         Inicio (/)
│   ├── funciones.astro     Funciones de Forjia (/funciones)
│   ├── gestorias.astro     Para gestorías (/gestorias)
│   ├── precios.astro       Precios (/precios)
│   ├── contacto.astro      Contacto (/contacto)
│   └── blog/               Listado y artículos del blog (/blog)
└── styles/
    └── global.css   Colores de marca y estilos globales
public/              Archivos estáticos (favicon, imágenes, robots.txt)
DOMINIO-FORJIA.md    Guía paso a paso para el dominio (Fase A y Fase B)
```

## ✍️ Publicar un artículo en el blog

1. Crea un archivo `.md` nuevo en `src/content/blog/`.
   El nombre del archivo será su dirección web (`mi-articulo.md` → `/blog/mi-articulo`).
2. Añade la cabecera y escribe el contenido:

```markdown
---
title: 'Título del artículo'
description: 'Resumen breve para Google y redes.'
pubDate: 2026-10-01
author: 'Equipo Forjia'
category: 'Fichaje y normativa'  # o 'Desarrollo' o 'Naveosoft'
tags: ['fichaje', 'gestorías']
draft: false
---

Contenido del artículo en texto normal (Markdown).
```

3. Guarda. Al subir a GitHub, Vercel reconstruye la web y el artículo aparece
   solo. Con `draft: true` el artículo no se publica.

## 🎨 Colores de marca

Definidos como variables CSS en `src/styles/global.css` (es la fuente de verdad):

- Azul Forjia (primario) `#2563EB`
- Oscuros `#111827` y `#0B1120`
- Fondo claro `#F8FAFC`

## ✉️ Formulario de contacto

Ya está **activo**: envía a [Web3Forms](https://web3forms.com) sin recargar la
página. El correo de destino se configura en la cuenta de Web3Forms (Linked
Emails), no en el código. Pendiente: cambiarlo de info@naveosoft.es a
info@forjia.es (ver comentario de cabecera en `src/pages/contacto.astro`).

## 📝 Pendiente

- Web3Forms → Linked Emails: pasar el destinatario a info@forjia.es.
- Fase B del dominio (app a `app.forjia.es`, web a `forjia.es`) cuando Google
  Play apruebe la app en producción. Plan en `DOMINIO-FORJIA.md`.
