# Dineysos Website

Production website for [dineysos.com](https://dineysos.com), a wine games and events business.

The site is built as a multilingual Next.js application with CMS-backed event content, brochure lead capture, transactional email delivery, feedback collection, analytics, and SEO support.

## Tech Stack

- **Framework:** Next.js 15, React 19, TypeScript
- **Runtime:** Node.js 20+
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


## License

This repository is source-available for portfolio and code review purposes only.

The code is visible so recruiters, reviewers, and collaborators can inspect the implementation. No permission is granted to copy, redistribute, sublicense, deploy, or create derivative works from this project. All Dineysos branding, copy, images, brochures, event concepts, and other business assets are proprietary.

See [LICENSE](./LICENSE) for the full terms.
