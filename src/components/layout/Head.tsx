import Head from "next/head";
import { useRouter } from "next/router";

type SeoHeadProps = {
    title?: string;
    description?: string;
};

export default function SeoHead({
    title = "Dineysos – Wine & Dine Events",
    description = "Unvergessliche Wein- und Spieleabende für Gruppen jeder Art.",
}: SeoHeadProps) {
    const { locale, asPath } = useRouter();
    const url = `https://dineysos.com${asPath}`;

    return (
        <Head>
            <title>{title}</title>
            <meta name="description" content={description} />
            <link rel="icon" href="/favicon.ico" type="image/x-icon" />

            {/* Language / Accessibility */}
            <meta httpEquiv="Content-Language" content={locale} />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta charSet="utf-8" />

            {/* SEO / Social */}
            <meta property="og:type" content="website" />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:url" content={url} />
            <meta property="og:site_name" content="Dineysos" />

            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />

            <link rel="canonical" href={url} />
        </Head>
    );
}