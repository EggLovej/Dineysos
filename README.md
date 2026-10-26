# Dineysos Website

Production website for [dineysos.com](https://dineysos.com), a wine games and events business.

The site is built as a multilingual Next.js application with CMS-backed event content, brochure lead capture, transactional email delivery, feedback collection, analytics, and SEO support.

## Tech Stack

- **Framework:** Next.js 15, React 19, TypeScript
- **Runtime:** Node.js 22.x on Vercel
- **Styling:** CSS Modules, global CSS
- **Internationalization:** next-i18next, react-i18next
- **CMS:** Sanity CMS for events and gallery images
- **Database:** Supabase for brochure leads and feedback submissions
- **Email:** Resend for brochure delivery and admin notifications
- **Bot protection:** Cloudflare Turnstile + honeypot field
- **UI/media:** next/image, Splide carousel, yet-another-react-lightbox, Framer Motion
- **SEO/analytics:** custom SEO component, JSON-LD event schema, next-sitemap, Vercel Analytics, Vercel Speed Insights
- **Tooling:** ESLint, Prettier, TypeScript

## Architecture

```txt
src/pages
  Page routes and API routes

src/components
  Shared layout, UI, and page section components

src/lib
  Sanity, Supabase, and i18n helpers

src/styles
  CSS Modules and global styles

public
  Static images, brochures, translations, robots.txt, and sitemap files
```


## Development

```bash
npm run dev        # local dev server
npm run typecheck  # tsc --noEmit
npm run lint       # eslint
npm test           # vitest (tests/, Node environment, no browser rendering)
npm run build      # production build, also regenerates the sitemap
```

Tests live in `tests/` and cover the API routes (with Supabase, Resend, Turnstile and Sentry mocked), the pure helpers in `src/lib`, the SEO URL builder, translation parity between `de` and `en`, and the pricing data. CI (`.github/workflows/ci.yml`) runs typecheck, lint and tests on every push and pull request; the production build is verified by Vercel's preview deployment. Dependabot opens grouped monthly update PRs.

## Environment variables

| Variable | Used by |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase client (brochure leads, feedback) |
| `RESEND_API_KEY` | Resend (brochure delivery, admin notifications) |
| `ADMIN_EMAIL` | Recipient of brochure notifications; when unset, notifications are skipped and an error is logged |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY` | Cloudflare Turnstile on the brochure form |
| `NEXT_PUBLIC_SENTRY_DSN` | Sentry error tracking (browser and server); unset disables reporting |
| `SENTRY_ORG`, `SENTRY_PROJECT`, `SENTRY_AUTH_TOKEN` | Source map upload during the Vercel build; optional |

## Monitoring

- **Errors:** Sentry via `@sentry/nextjs`. Browser reports go through the `/monitoring` tunnel route on this domain. Config lives in `src/instrumentation.ts`, `src/instrumentation-client.ts` and `src/sentry.server.config.ts`; `src/pages/_error.tsx` reports rendering errors.
- **Logs:** API routes write one JSON line per request through `src/lib/log.ts` (route, outcome, duration, error name; never personal data). Each line goes to the Vercel runtime log and to Sentry Logs (30-day retention); errors logged there are also captured as Sentry issues.
- **Tracing:** server-side only (`tracesSampleRate: 1.0` in `src/sentry.server.config.ts`): every API request and server render is a trace with spans for Sanity, Supabase and Resend calls. The browser bundle has tracing tree-shaken out (`next.config.ts`), since Vercel Speed Insights already reports Core Web Vitals.
- **Uptime:** a Sentry uptime monitor checks `https://dineysos.com/` every 5 minutes (3 consecutive failures open an issue).
- **Alerts:** Sentry's default rule emails on new high-priority issues; a second rule emails the team when one issue produces more than 20 events in an hour (production only).
- **Brochure failures:** when the brochure email cannot be sent, the lead is kept in Supabase with `sentBrochure = false` and `ADMIN_EMAIL` receives a failure notification.

## License

This repository is source-available for portfolio and code review purposes only.

The code is visible so recruiters, reviewers, and collaborators can inspect the implementation. No permission is granted to copy, redistribute, sublicense, deploy, or create derivative works from this project. All Dineysos branding, copy, images, brochures, event concepts, and other business assets are proprietary.

See [LICENSE](./LICENSE) for the full terms.
