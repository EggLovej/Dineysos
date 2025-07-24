import Head from "next/head";
import { useRouter } from "next/router";

type SeoHeadProps = {
  title: { de: string; en: string };
  description: { de: string; en: string };
  imageUrl?: string;
};

export default function SeoHead({
  title,
  description,
  imageUrl = "https://dineysos.com/images/icons/og-default.png",
}: SeoHeadProps) {
  const { locale, asPath } = useRouter();
  const safeLocale = locale === "de" ? "de" : "en";
  const url = `https://dineysos.com${asPath}`;

  const localizedTitle = title[safeLocale];
  const localizedDescription = description[safeLocale];

  return (
    <Head>
      <title>{localizedTitle}</title>
      <meta name="description" content={localizedDescription} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
      <meta httpEquiv="Content-Language" content={locale} />
      <link rel="icon" href="/favicon.ico" />

      {/* SEO Indexing */}
      <meta name="robots" content="index, follow" />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={localizedTitle} />
      <meta property="og:description" content={localizedDescription} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="Dineysos" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={localizedTitle} />
      <meta name="twitter:description" content={localizedDescription} />
      <meta name="twitter:image" content={imageUrl} />

      {/* Canonical */}
      <link rel="canonical" href={url} />

      {/* Hreflang for i18n */}
      <link
        rel="alternate"
        hrefLang="de"
        href={`https://dineysos.com/de${asPath}`}
      />
      <link
        rel="alternate"
        hrefLang="en"
        href={`https://dineysos.com/en${asPath}`}
      />
    </Head>
  );
}
