import type { NextApiRequest } from "next";

/** Client IP from the first X-Forwarded-For entry (set by Vercel), else the socket. */
export function getClientIp(req: NextApiRequest) {
  const forwardedFor = req.headers["x-forwarded-for"];

  if (Array.isArray(forwardedFor)) {
    return forwardedFor[0]?.split(",")[0]?.trim();
  }

  return forwardedFor?.split(",")[0]?.trim() ?? req.socket.remoteAddress;
}

/** Trimmed, lower-cased email, or null when the value is not a plausible address. */
export function normalizeEmail(email: unknown) {
  if (typeof email !== "string") return null;

  const normalizedEmail = email.trim().toLowerCase();
  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail);

  if (!isValidEmail || normalizedEmail.length > 254) return null;

  return normalizedEmail;
}
