import Head from "next/head";
import { useRouter } from "next/router";

type SeoHeadProps = {
  title: { de: string; en: string };
  description: { de: string; en: string };
  imageUrl?: string;
};

const SITE_URL = "https://dineysos.com";

// The default locale (de) lives at the root, every other locale under its prefix.
function localizedUrl(locale: "de" | "en", path: string) {
  const cleanPath = path === "/" ? "" : path;
  return locale === "de" ? `${SITE_URL}${cleanPath || "/"}` : `${SITE_URL}/${locale}${cleanPath}`;
}

export default function SeoHead({
  title,
  description,
  imageUrl = `${SITE_URL}/images/icons/og-default.png`,
}: SeoHeadProps) {
  const { locale, asPath } = useRouter();
  const safeLocale = locale === "de" ? "de" : "en";

  // asPath never carries the locale prefix, but it does carry query strings and
  // hashes, which must not end up in canonical or alternate URLs.
  const path = asPath.split(/[?#]/)[0] || "/";
  const url = localizedUrl(safeLocale, path);

  const localizedTitle = title[safeLocale];
  const localizedDescription = description[safeLocale];

  return (
    <Head>
      <title>{localizedTitle}</title>
      <meta content={localizedDescription} name="description" />
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <meta charSet="utf-8" />
      <meta content={safeLocale} httpEquiv="Content-Language" />
      <link href="/favicon.ico" rel="icon" />

      {/* SEO Indexing */}
      <meta content="index, follow" name="robots" />

      {/* Open Graph */}
      <meta content="website" property="og:type" />
      <meta content={localizedTitle} property="og:title" />
      <meta content={localizedDescription} property="og:description" />
      <meta content={imageUrl} property="og:image" />
      <meta content={url} property="og:url" />
      <meta content="Dineysos" property="og:site_name" />
      <meta content={safeLocale === "de" ? "de_CH" : "en_US"} property="og:locale" />

      {/* Twitter */}
      <meta content="summary_large_image" name="twitter:card" />
      <meta content={localizedTitle} name="twitter:title" />
      <meta content={localizedDescription} name="twitter:description" />
      <meta content={imageUrl} name="twitter:image" />

      {/* Canonical: the URL of this page in the current locale */}
      <link href={url} rel="canonical" />

      {/* Hreflang: one entry per locale plus x-default pointing at the default locale */}
      <link href={localizedUrl("de", path)} hrefLang="de" rel="alternate" />
      <link href={localizedUrl("en", path)} hrefLang="en" rel="alternate" />
      <link href={localizedUrl("de", path)} hrefLang="x-default" rel="alternate" />
    </Head>
  );
}
