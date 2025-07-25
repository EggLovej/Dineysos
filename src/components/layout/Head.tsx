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
      <meta content={localizedDescription} name="description" />
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <meta charSet="utf-8" />
      <meta content={locale} httpEquiv="Content-Language" />
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

      {/* Twitter */}
      <meta content="summary_large_image" name="twitter:card" />
      <meta content={localizedTitle} name="twitter:title" />
      <meta content={localizedDescription} name="twitter:description" />
      <meta content={imageUrl} name="twitter:image" />

      {/* Canonical */}
      <link href={url} rel="canonical" />

      {/* Hreflang for i18n */}
      <link href={`https://dineysos.com/de${asPath}`} hrefLang="de" rel="alternate" />
      <link href={`https://dineysos.com/en${asPath}`} hrefLang="en" rel="alternate" />
    </Head>
  );
}
