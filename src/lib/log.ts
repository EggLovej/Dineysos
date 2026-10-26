import * as Sentry from "@sentry/nextjs";

// Minimal structured logging for API routes. Each call writes one JSON line to the
// console (Vercel renders it as searchable fields, short retention) and the same line
// to Sentry Logs (searchable for 30 days). Errors are additionally captured as Sentry
// issues. Never pass personal data (such as a visitor's email address) in `fields`.

type Fields = Record<string, string | number | boolean | null | undefined>;

function toError(error: unknown): Error {
  if (error instanceof Error) return error;
  if (error && typeof error === "object" && "message" in error) {
    const err = new Error(String((error as { message: unknown }).message));
    if ("code" in error) err.name = `Error ${String((error as { code: unknown }).code)}`;
    return err;
  }
  return new Error(String(error));
}

// Sentry Logs attributes cannot be null or undefined.
function toAttributes(fields: Fields): Record<string, string | number | boolean> {
  return Object.fromEntries(
    Object.entries(fields).filter(
      (entry): entry is [string, string | number | boolean] => entry[1] != null
    )
  );
}

export function logEvent(route: string, outcome: string, fields: Fields = {}) {
  const attributes = { route, outcome, ...toAttributes(fields) };
  console.info(JSON.stringify({ level: "info", ...attributes, at: new Date().toISOString() }));
  Sentry.logger.info(`${route} ${outcome}`, attributes);
}

export function logError(route: string, outcome: string, error: unknown, fields: Fields = {}) {
  const err = toError(error);
  const attributes = {
    route,
    outcome,
    errorName: err.name,
    message: err.message,
    ...toAttributes(fields),
  };
  console.error(JSON.stringify({ level: "error", ...attributes, at: new Date().toISOString() }));
  Sentry.logger.error(`${route} ${outcome}: ${err.message}`, attributes);
  Sentry.captureException(err, { tags: { route, outcome }, extra: fields });
}
