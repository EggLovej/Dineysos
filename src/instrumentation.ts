import * as Sentry from "@sentry/nextjs";

export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    await import("./sentry.server.config");
  }
}

// Reports errors thrown while rendering pages or running API routes.
export const onRequestError = Sentry.captureRequestError;
