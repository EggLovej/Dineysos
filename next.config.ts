import type { NextConfig } from "next";

import nextI18NextConfig from "./next-i18next.config.js";

const isDev = process.env.NODE_ENV !== "production";

// Content Security Policy. Keep this list in sync with the third parties the site loads:
// - Sanity image CDN (lightbox renders raw <img> tags, next/image is proxied via /_next/image)
// - Cloudflare Turnstile (retired brochure form, kept so it can be restored)
// - Vercel Analytics / Speed Insights load from the same origin (/_vercel/...)
// Next.js dev mode needs 'unsafe-eval' for hot reloading; production does not.
const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' https://challenges.cloudflare.com${isDev ? " 'unsafe-eval' 'unsafe-inline'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://cdn.sanity.io",
  "font-src 'self' data:",
  "connect-src 'self' https://challenges.cloudflare.com",
  "frame-src https://challenges.cloudflare.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=()" },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  i18n: nextI18NextConfig.i18n,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/images/**",
      },
    ],
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  // Note: redirecting the prefixed default locale (/de/...) to the unprefixed URL
  // cannot be done here or in middleware: with i18n enabled Next.js normalises
  // "/events" to "/de/events" before matching, so any "/de" rule redirects the
  // unprefixed URL to itself. That redirect lives in vercel.json instead, which
  // Vercel applies to the raw request path before Next.js sees it.
};

export default nextConfig;
