# Grupo CGR — Sitio Web Corporativo

Sitio institucional de Grupo CGR, empresa familiar de construcción con más de 18 años de trayectoria.
Construido con Astro, React, TypeScript y Tailwind CSS, orientado a maximizar solicitudes de presupuesto
por WhatsApp.

## Stack

- [Astro](https://astro.build) — framework principal, renderizado estático
- [React](https://react.dev) — islas interactivas (galería con lightbox, carrusel de testimonios)
- [TypeScript](https://www.typescriptlang.org) — modo estricto
- [Tailwind CSS v4](https://tailwindcss.com) — estilos utilitarios (configuración CSS-first)
- [Motion](https://motion.dev) — animaciones sutiles al hacer scroll
- ESLint + Prettier + Husky + lint-staged — calidad de código

## Primeros pasos

```sh
pnpm install
pnpm dev       # http://localhost:4321
```

## Comandos

| Comando                        | Acción                                                   |
| :----------------------------- | :------------------------------------------------------- |
| `pnpm dev`                     | Levanta el servidor de desarrollo                        |
| `pnpm build`                   | Compila el sitio de producción en `./dist/`              |
| `pnpm preview`                 | Sirve el build de producción localmente                  |
| `pnpm check`                   | Type-checking de Astro/TypeScript                        |
| `pnpm lint` / `lint:fix`       | ESLint                                                   |
| `pnpm format` / `format:check` | Prettier                                                 |
| `pnpm generate:favicons`       | Regenera los favicons desde la marca en `Logo.astro`     |
| `pnpm generate:og-image`       | Regenera la imagen de Open Graph (`public/og-image.jpg`) |

## Contenido a reemplazar antes de publicar

- **Testimonios** (`src/data/testimonials.ts`): contenido de ejemplo, reemplazar por reseñas reales.
- **Galería** (`src/data/gallery.ts`): reemplazar imágenes en `src/assets/images/proyectos/` y actualizar
  las entradas correspondientes.
- **Google Analytics**: definir `PUBLIC_GA_MEASUREMENT_ID` (ver `.env.example`) en las variables de entorno
  de producción. Sin esa variable, GA4 no se carga (tampoco se carga en desarrollo).
- **Dominio**: `astro.config.mjs` (`site`) y `src/consts.ts` usan `https://www.grupocgr.com.ar` como
  placeholder recomendado; actualizar si el dominio final es otro.

## Contacto por WhatsApp

Los botones de "Solicitar Presupuesto" alternan automáticamente entre los dos contactos definidos en
`src/consts.ts` (`WHATSAPP_CONTACTS`). Cada visitante se asigna a un contacto vía `localStorage`
(`src/lib/whatsapp.ts`) la primera vez que visita el sitio, y mantiene ese mismo contacto en visitas
posteriores — así la conversación nunca "cambia de persona" a mitad de camino. A nivel de tráfico
general, la asignación es 50/50.

## Analítica

Eventos trackeados vía GA4 (`src/lib/analytics.ts`): `page_view` (automático), `click_whatsapp`,
`service_click`, `cta_click`, `scroll_depth` (25/50/75/100%).
