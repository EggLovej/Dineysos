import * as Sentry from "@sentry/nextjs";

// Browser-side Sentry setup. Next.js loads this file before the page hydrates.
// Reports are sent through the /monitoring tunnel route on our own domain (see
// next.config.ts), so the Content Security Policy needs no extra origin.
Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  enabled: process.env.NODE_ENV === "production",
  environment: process.env.NEXT_PUBLIC_VERCEL_ENV ?? process.env.NODE_ENV,
  // No browser tracing: Vercel Speed Insights already reports Core Web Vitals.
  tracesSampleRate: 0,
});

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
