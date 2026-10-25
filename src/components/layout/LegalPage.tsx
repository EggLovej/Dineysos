import Link from "next/link";
import { useTranslation } from "next-i18next";
import type { ReactNode } from "react";

import SeoHead from "@/components/layout/Head";
import { seoConfig } from "@/config/seo";
import styles from "@/styles/Legal.module.css";

type LegalPageProps = {
  document: "terms" | "imprint" | "privacy";
  children?: ReactNode;
};

export default function LegalPage({ document, children }: LegalPageProps) {
  const { t } = useTranslation("common");
  const seo = seoConfig[document];

  return (
    <>
      <SeoHead description={seo.description} title={seo.title} />
      <div className="base-container">
        <article className={styles.page}>
          <h1>{t(`legal.${document}.title`)}</h1>
          {children ?? <p>{t("legal.placeholder")}</p>}
          <Link className={styles.homeLink} href="/">
            {t("legal.backToHome")}
          </Link>
        </article>
      </div>
    </>
  );
}
