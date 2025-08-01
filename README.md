# Dineysos Website

**Wines, games, events** — this repository contains the code behind [dineysos.com](https://dineysos.com).
Built with Next.js and TypeScript, it powers the multi‑language website where we showcase upcoming events, share impressions and let visitors get in touch.

## Features

- 🇩🇪/🇬🇧 localization via **next-i18next** (German is the default language)
- Event and gallery content fetched from **Sanity CMS**
- Brochure signup & feedback forms stored in **Supabase**
- Emails sent using **Resend**
- Responsive gallery powered by **Splide** and **yet-another-react-lightbox**
- Automatically generated sitemaps using **next-sitemap**

## Getting started

1. Install dependencies

   ```bash
   npm install
   ```

2. Create a `.env.local` file with your credentials:

   ```bash
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   RESEND_API_KEY=your-resend-api-key
   ```

3. Launch the dev server

   ```bash
   npm run dev
   ```

   Visit <http://localhost:3000> and you’re ready to go.

## Scripts

- `npm run lint` – run ESLint
- `npm run lint:fix` – lint and auto‑fix problems
- `npm run build` – production build (also generates the sitemap)
- `npm start` – start the built app

## Project structure

- `src/pages` – page routes and API endpoints
- `src/components` – React components
- `src/lib` – helpers for Sanity, Supabase and i18n
- `public` – static assets, translated copy and PDF brochures

Pull requests are welcome — feel free to pour yourself a glass and join the fun!

