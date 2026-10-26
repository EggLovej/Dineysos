import * as Sentry from "@sentry/nextjs";
import type { NextPageContext } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import styles from "@/styles/NotFound.module.css";

type ErrorPageProps = {
  statusCode?: number;
};

// Shown for server errors (500) and client-side rendering errors. Translations are not
// loaded for this page, so the two languages are inlined.
const copy = {
  de: {
    title: "Etwas ist schiefgelaufen",
    text: "Bitte versuche es später noch einmal.",
    home: "Zur Startseite",
  },
  en: { title: "Something went wrong", text: "Please try again later.", home: "Back to home" },
};

export default function ErrorPage({ statusCode }: ErrorPageProps) {
  const { locale } = useRouter();
  const t = locale === "en" ? copy.en : copy.de;

  return (
    <div className="base-container">
      <div className={styles.page}>
        <Image
          alt="Logo"
          className={styles.image}
          height={179}
          src="/images/logo/logo.webp"
          width={500}
        />
        <h2>
          {statusCode ? `${statusCode} – ` : ""}
          {t.title}
        </h2>
        <p>{t.text}</p>
        <Link className={styles.homeLink} href="/">
          {t.home}
        </Link>
      </div>
    </div>
  );
}

ErrorPage.getInitialProps = async (contextData: NextPageContext): Promise<ErrorPageProps> => {
  await Sentry.captureUnderscoreErrorException(contextData);
  const statusCode = contextData.res?.statusCode ?? contextData.err?.statusCode ?? 500;
  return { statusCode };
};
