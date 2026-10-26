import * as Sentry from "@sentry/nextjs";

// Server-side Sentry setup. Loaded once per server instance from src/instrumentation.ts.
// Without a DSN the SDK stays silent, so local development needs no configuration.
Sentry.init({
  dsn: process.env.SENTRY_DSN ?? process.env.NEXT_PUBLIC_SENTRY_DSN,
  enabled: process.env.NODE_ENV === "production",
  environment: process.env.VERCEL_ENV ?? process.env.NODE_ENV,
  // Server-side tracing: every API request and server render becomes a trace with
  // spans for the Sanity, Supabase and Resend calls inside it. Volume is tiny for this
  // site, so sample everything; lower this if the Sentry span quota ever gets tight.
  tracesSampleRate: 1.0,
});
