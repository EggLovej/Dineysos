import { GetStaticPropsContext } from "next";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import SeoHead from "@/components/layout/Head";
import { seoConfig } from "@/config/seo";
import styles from "@/styles/NotFound.module.css";

export default function NotFoundPage() {
  const { t } = useTranslation("common");

  return (
    <>
      <SeoHead description={seoConfig.notFound.description} title={seoConfig.notFound.title} />
      <div className="base-container">
        <div className={styles.page}>
          <Image
            alt="Logo"
            className={styles.image}
            height={179}
            src="/images/logo/logo.webp"
            width={500}
          />
          <h2>{t("404.title")}</h2>
          <p>{t("404.description")}</p>
          <Link className={styles.homeLink} href="/">
            {t("404.backToHome")}
          </Link>
        </div>
      </div>
    </>
  );
}

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "de", ["common"])),
    },
  };
}
