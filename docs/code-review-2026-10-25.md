# Whole-site code review (25 October 2026)

Scope: the full `quick_update` working tree including the uncommitted changes, plus read-only probes of the production site and of the Supabase project named in `.env.local`. Nothing was changed, submitted or deployed. `tsc --noEmit` passes and `eslint .` reports only two warnings.

Severity: **P1** fix before or right after this commit · **P2** fix soon · **P3** cleanup / nice to have.

---

## 1. Bugs and correctness

| # | Sev | Finding | Where |
|---|-----|---------|-------|
| 1.1 | P1 | **Supabase tables do not exist in the project `.env.local` points to.** A one-row, id-only read of `emails` and `sip_solve_feedback` with the anon key returns `42P01 relation "public.emails" does not exist`. Either the local env points at a different project than the Vercel one, or every brochure request and feedback submission in production currently fails with 500 before any email is sent. Verify the Vercel env and the table names/schema. | `.env.local`, `src/lib/supabaseClient.ts` |
| 1.2 | P1 | **`/feedback` is live in production (HTTP 200) and broken.** It posts `{ rating, comment }` but the API rejects anything without `type: "sip-solve"` (400). The page does not check the response and then shows a hard-coded English "Thank you for your feedback!" (the `feedback.thankYou` key exists but is unused). Submissions are silently lost. Either retire it into `src/legacy` or give it its own API branch. | `src/pages/feedback.tsx:20-34`, `src/pages/api/feedback.ts:25` |
| 1.3 | P1 | **Unknown event slug produces a 500, not a 404.** `getStaticPaths` uses `fallback: "blocking"`, `fetchEventBySlug` returns `null` for an unknown slug, and the page then reads `event.name`. Should `return { notFound: true }` when the fetch returns nothing. | `src/pages/events/[slug].tsx:231-243` |
| 1.4 | P2 | **Language switch never scrolls back to the section.** `const [hash] = asPath.split("#")` destructures the *path* (element 0), not the hash, so `document.getElementById("/")` is always null. Should be `const [, hash] = …`. The file also mixes the `router` singleton import with `useRouter`. | `src/components/layout/Navbar.tsx:28-43` |
| 1.5 | P2 | **Feedback API crashes on malformed bodies.** `feedback.ratings.overall` throws a TypeError when `ratings` is missing (unhandled → generic 500). Ratings are not range-checked (expected 1–5), `additionalFeedback` has no length limit, and `timestamp` is client-supplied and trusted. | `src/pages/api/feedback.ts:23-42` |
| 1.6 | P2 | **Sip & Solve feedback shows success even when the save failed.** `fetch` only throws on network errors; a 4xx/5xx response still reaches `setSubmitted(true)`. There is no error state in the UI. | `src/pages/feedback/sip&solve.tsx:49-58` |
| 1.7 | P2 | **"ab CHF 35.–" is shown in the English pricing table.** The German prefix is hard-coded in data, outside i18n. | `src/components/sections/Pricing.tsx:44` |
| 1.8 | P2 | **Mobile users first render the desktop layout.** `useIsMobile` initialises to `false`, so the Hero SSRs the 1600px horizontal image and swaps to the vertical one after hydration (double download, layout shift, hurts LCP). `About` renders both desktop and mobile DOM trees permanently. Prefer CSS media queries, `<picture>`, or `sizes`. | `src/hooks/useIsMobile.ts`, `src/components/sections/Hero.tsx`, `About.tsx` |
| 1.9 | P3 | `formatParagraph` calls `.test()` on a regex with the `g` flag; `lastIndex` state makes this fragile. It happens to work because `split` always interleaves a (possibly empty) separator. Drop the `g` flag on the test regex. | `src/pages/events/[slug].tsx:18-32` |
| 1.10 | P3 | Wrong alt text: the Olympics card image is labelled "Trophy" (copy-paste). | `src/components/sections/Concept.tsx:103` |
| 1.11 | P3 | Footer copyright is hard-coded to 2025. | `src/components/layout/Footer.tsx:22` |
| 1.12 | P3 | `wantsUpdates` default flipped to opt-in in both the UI and API (in this diff). Correct for consent, but existing rows inserted with the old `?? true` default were recorded as opted-in without an explicit tick. Worth noting in the privacy audit. | `src/pages/api/requestBrochure.ts:181` |

## 2. Security

| # | Sev | Finding | Where |
|---|-----|---------|-------|
| 2.1 | P1 | **Vulnerable dependencies.** `npm audit --omit=dev` reports 7 findings (2 critical). `next@15.3.8` carries a long list of advisories; the ones that apply to this site are the Image Optimization ones (cache key confusion, content injection, DoS) since `next/image` with `remotePatterns` is used. `i18next-fs-backend` has a critical prototype-pollution advisory (pulled in by `next-i18next`). `nanoid`, `ws`, `source-map-js`, `sharp` are also flagged. `npm audit fix` resolves most; Next needs a bump to a patched 15.x (15.5.x) which is still in range of `eslint-config-next`'s major. | `package.json` |
| 2.2 | P1 | **API routes use the public anon key.** Both handlers write through the `NEXT_PUBLIC_SUPABASE_ANON_KEY` client. For that to work, RLS must grant `anon` INSERT on both tables, which means anyone can insert rows directly against the Supabase REST endpoint, bypassing Turnstile, the honeypot and all validation. If `anon` also has SELECT, every captured lead email is publicly readable. `SUPABASE_SECRET_KEY` is already in the env but unused. Use a server-only client with the secret key in the API routes and set RLS to deny `anon` entirely. (RLS could not be verified because of 1.1.) | `src/lib/supabaseClient.ts`, both API routes |
| 2.3 | P1 | **No abuse protection on `/api/feedback`.** No Turnstile, no honeypot, no rate limit. Any script can fill the table. The brochure route has Turnstile but no rate limit either, and each request costs a Resend send with an 8 MB attachment. Consider Vercel WAF rate-limit rules or an Upstash-style limiter keyed on IP. | `src/pages/api/feedback.ts` |
| 2.4 | P2 | **No security headers beyond HSTS.** Production responds with `strict-transport-security` only (added by Vercel). Missing: `Content-Security-Policy` (even report-only), `X-Content-Type-Options: nosniff`, `X-Frame-Options` / `frame-ancestors`, `Referrer-Policy`, `Permissions-Policy`. Add a `headers()` block in `next.config.ts`. | `next.config.ts` |
| 2.5 | P2 | **`ADMIN_EMAIL` falls back to `admin@example.com`.** A missing env var silently sends the admin notification to a third-party domain. Fail fast or skip the notification. `new Resend(undefined)` at module load has the same silent-failure shape. | `src/pages/api/requestBrochure.ts:9-10` |
| 2.6 | P3 | JSON-LD is injected with `JSON.stringify` into a `<script>`. A CMS string containing `</script>` would break out of the tag. Escape `<` as `<` (one `.replace`). Low likelihood since the CMS is owner-controlled. | `src/pages/events/[slug].tsx:104` |
| 2.7 | P3 | `docs/privacy-policy-audit.md` embeds a Vercel deployment id/URL, project owner slug and internal operational notes. The README says this repo is public for portfolio review. Decide whether that file belongs in the public tree before committing. | `docs/` |

## 3. Third-party integrations

- **Sanity**: project id hard-coded (fine, it is public), `perspective: "published"`, no token, so only public published content is exposed. `useCdn: false` means every ISR revalidate hits the live API; acceptable at this scale, but `useCdn: true` is cheaper and sufficient with `perspective: "published"`. List queries project `description_de` / `description_en` which nothing reads, and the `Event` type declares `descriptionParagraphs` instead, so the type does not describe the list payload. The two list queries duplicate the projection; `fetchUpcomingEvents`/`fetchPastEvents` wrap errors with no added information while `fetchAllEventSlugs` and `fetchGalleryImages` do not wrap at all.
- **Supabase**: see 1.1, 2.2. Three env vars are unused (`SUPABASE_URL`, `SUPABASE_SECRET_KEY`, `INQUIRY_RECIPIENT_EMAIL`).
- **Resend**: the 7.9 MB EN PDF is read from disk and base64-attached on every request (~10.5 MB email). It works only because Vercel's file tracing picks up the static string literals in `path.resolve`. The DE file name contains `ü`; git and the source are NFC, macOS shows NFD, Linux will match, but it is a cross-platform trap. Prefer linking to the hosted PDF (`/docs/…`) or a short-lived signed URL, and rename to ASCII. The admin is only notified on success; failures only reach the logs.
- **Turnstile**: server-side verification is correct (secret, `remoteip`, non-OK response treated as failure). The client disables submit only when a site key is present, so a frontend without `NEXT_PUBLIC_TURNSTILE_SITE_KEY` but a backend with the secret always fails. Minor.
- **Vercel Analytics / Speed Insights**: loaded unconditionally. The privacy audit already marks the consent basis as open.
- **Google Fonts** via `next/font`: self-hosted at build time, no runtime request. Good.
- **Flaschenpost / Instagram / LinkedIn** links use `rel="noopener noreferrer"`. Good.

## 4. Architecture, modularity, duplication

What is good: clear `pages / components / lib / styles / types` split, CSS Modules everywhere, `src/legacy` with a README that says exactly how to restore each retired feature, strict TypeScript, consistent `SeoHead` + `seoConfig` pattern, Prettier + import ordering enforced.

Duplication worth collapsing (P3 unless noted):

- `events/index.tsx` and `events/past.tsx` are ~90 % identical. Extract `EventCard` / `EventList`; also drop `priority` from every list image (it preloads all of them).
- `Concept.tsx` hand-writes three identical cards with inline rating numbers; `Format.tsx` already shows the data-driven pattern for the same three concepts. One `concepts` array could feed both sections and the modal.
- `Format.tsx` renders the legend twice (desktop and mobile) with identical JSX.
- `feedback.tsx` and `feedback/sip&solve.tsx` both implement the star/flower rating widget. `RatingQuestion` is declared inside the component body (recreated on every render, remounting its subtree per keystroke), and the page keeps 16 `useState` hooks for 7 questions; a `useReducer` or a `Record<questionKey, number>` would halve the file. (P2 for the inner-component definition.)
- `getI18nStaticProps` exists but `404`, `feedback`, `feedback/sip&solve`, `events/*` and the legacy page each re-implement `serverSideTranslations`.
- `next-sitemap.config.js` and `Head.tsx` each hard-code the hreflang set.

Dead code:

- `src/components/ui/LanguageSwitcher.tsx` is imported nowhere and references global class names that do not exist.
- `src/types/splite.d.ts` (typo) declares `@splidejs/react-splide` as `any`, shadowing the real types the package ships. Delete it to get typed `options`.
- `_document.tsx` `getInitialProps` is the default boilerplate and can go.
- `data-track="email"` on the contact link has no tracker behind it.
- Unused i18n keys in `common.json`: `nav.brochure`, `nav.sipAndSolve`, `concept.quiz`, `pricing.mobile.*` (5), `feedback.thankYou`, `feedback.navigation.*` (3), `feedback.sipSolve.thankYouNote`. (DE/EN key sets are otherwise in perfect parity across all four namespaces.)
- Dev dependencies installed but not wired into `eslint.config.mjs`: `eslint-plugin-unicorn`, `eslint-plugin-jsx-a11y`, `eslint-plugin-react`, `eslint-plugin-react-hooks`, `eslint-config-prettier` (`next/core-web-vitals` brings its own copies of the React/a11y rules). The `quotes`/`semi`/`object-curly-spacing` rules duplicate Prettier and `eslint-config-prettier` is not applied, so they can conflict.
- `tsconfig.json` `typeRoots` lists `./types`, which does not exist.
- Intentionally retained and correctly isolated: `legacy/*`, `Brochure.module.css`, `Sip&Solve.module.css`, `seoConfig.sipAndSolve`, the `sip&solve.*` and `brochure.*` translation keys, `public/docs/*.pdf`. Fine as is.

## 5. SEO and i18n routing

- `https://dineysos.com/de` and `/de/events` return 200 (verified), so every German page exists twice. `Head.tsx` points `hreflang="de"` at the `/de/…` copy while `canonical` points at the unprefixed URL, and `next-sitemap` `alternateRefs` repeats the `/de` prefix. Point `de` at the unprefixed URL, add `x-default`, or redirect `/de/*` to `/*`.
- Canonical and hreflang are built from `asPath`, which includes query strings and `#hash`. Strip both.
- `public/sitemap.xml` and `sitemap-0.xml` are generated on `postbuild` yet committed; the committed copy is stale (lists `/feedback/sip&solve`, old events, no legal pages). Add them to `.gitignore`. `lastmod` is `new Date()` for every URL, which makes it meaningless to crawlers.
- The route `/feedback/sip&solve` contains `&`; it works, but it is awkward in QR codes and shows as `sip&amp;solve` in the sitemap. `sip-and-solve` with a redirect would be cleaner.
- Dates render as `de-CH` in the English UI (`toLocaleDateString("de-CH")`).

## 6. Accessibility

- `Modal`: no `role="dialog"` / `aria-modal`, no Escape handler, no focus trap, prev/next buttons have no accessible name (`◀`/`▶`).
- Burger button has `aria-label` but no `aria-expanded`; language toggle has neither.
- Rating buttons in both feedback pages have no accessible name beyond the image alt "Rating N"; hover-only state is invisible to keyboard users.

## 7. Tests

There are none: no runner, no test files, no CI (`.github` absent). The only guard rails are `tsc` and `eslint`, run manually. Nothing is over-tested, so nothing needs deleting or merging.

Recommended minimum, in order of value:

1. **CI on pull requests**: `npm ci`, `tsc --noEmit`, `eslint .`, `next build`. This alone would have caught nothing here but prevents regressions and makes `npm audit` visible.
2. **API handler tests** (Vitest + mocked `supabase`, `resend`, `fetch`): method guard, honeypot short-circuit, invalid email, Turnstile failure/unavailable, Resend failure, happy path; for feedback: malformed body, out-of-range rating, happy path. These encode the security behaviour.
3. **Pure-function unit tests**: `normalizeEmail`, `getClientIp`, `formatParagraph`, `formatTimeRange`, `renderPrivacyText`. Export them from a `lib/` module first.
4. **i18n parity test**: DE/EN key sets equal per namespace, and every `t("literal")` in `src` resolves. (A throwaway script for this review found no gaps; a test keeps it that way.)
5. Skip component snapshot tests; they would be churn for a marketing site.

## 8. Production observability

Current state: `console.error` in the two API routes (→ Vercel function logs, short retention, no alerting), Vercel Analytics (traffic) and Speed Insights (Core Web Vitals). No error tracker, no `_error.tsx` or client error boundary, no structured context (request id, locale, hashed email), no alert when a brochure fails to send or when Supabase is unreachable, and client code swallows failures (1.2, 1.6). If 1.1 is real in production, nobody would know today.

Recommended:

- **Error tracking** (Sentry's free tier or similar) for server routes and the client, with source maps uploaded on build. One `withSentry` wrapper around each handler covers most of it.
- **Alerting** on 5xx from the two API routes (Vercel log drain → any alerting target, or Sentry alerts).
- **Admin notification on failure** in `requestBrochure`, not only on success, or a daily Supabase query of `sentBrochure = false` rows.
- **Structured logs**: one log line per request with `route`, `outcome`, `language`, `durationMs`, never the raw email.
- Client: check `response.ok`, show an error state, report the failure.

## 9. Notes on the diff about to be committed

- Footer legal navigation, `LegalPage`, the three legal routes and namespaces, and the `seoConfig` entries are clean and consistent with the rest of the site.
- `wantsUpdates` now defaults to `false` on both sides. Good; see 1.12.
- `docs/privacy-policy-audit.md`: see 2.7 before committing it to a public repo.
- The committed sitemap will not include the new legal pages until the next build; harmless if the sitemap files stop being tracked.

## 10. Housekeeping

- `package.json` has no `engines` field although README and `.node-version` pin Node 22.
- `eslint-config-next@15.3.4` vs `next@15.3.8`; align when bumping Next.
- 37 MB of binary assets in `public/` are tracked in git (15 MB PDFs, 22 MB images). Fine for now; consider Git LFS or hosting the PDFs on Sanity/Vercel Blob if they churn.

---

## Status after the fix pass (same day)

Fixed in the working tree (verified with `tsc`, `eslint`, `next build` and a local `next start`): 1.3 (unknown slug → 404), 1.4 (language switch keeps the hash and scrolls), 1.7 ("from CHF" translated via `pricing.table.startingFrom`), 1.8 for the hero only (`<picture>` art direction, mobile gets the vertical image in the server HTML), 2.1 (`npm audit fix`, Next 15.5.x; only `sharp` advisories remain, which need a major bump of `next`), 2.5 (no admin-email fallback; notification is skipped and logged when unset), section 4 helper duplication (`getI18nStaticProps` used everywhere), dead code (`LanguageSwitcher.tsx`, `_document` boilerplate, `data-track`, `concept.quiz`, `pricing.mobile.*`, `typeRoots`, `eslint-plugin-unicorn`, `eslint-config-prettier`), Splide now typed via a `paths` mapping instead of an `any` shim, and generated `sitemap*.xml` / `robots.txt` are gitignored and untracked.

Deferred by the owner: 1.1/2.2 (Supabase project paused on the free tier; lead capture is not live), 1.2/1.5/1.6 (feedback is being reworked in a stash), section 7 (tests), section 8 (monitoring). Open and not yet discussed: 1.9, 1.10, 1.11, 1.12, 2.3, 2.4, 2.6, 2.7, the Sanity over-fetching, the SEO/hreflang items in section 5, accessibility in section 6, and the remaining duplication in section 4.

Second fix pass: 2.4 security headers (CSP, nosniff, frame denial, referrer and permissions policies in `next.config.ts`), 2.7 (`docs/privacy-policy-audit.md` ignored and untracked; it remains in git history), section 5 hreflang/canonical (`Head.tsx` builds locale-correct canonical, `de`/`en`/`x-default` alternates without query or hash; `next-sitemap` transform now emits absolute alternates), `/de/*` → `/*` redirect in `vercel.json` (not possible inside Next.js with i18n: it normalises unprefixed default-locale paths to `/de/...` before matching, so both `redirects()` and middleware loop), section 6 modal (dialog role, Escape, arrow keys, focus trap, labelled buttons, focus restore), and the `engines` field.
