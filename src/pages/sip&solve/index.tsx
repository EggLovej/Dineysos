import { GetStaticPropsContext } from "next";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import SeoHead from "@/components/layout/Head";
import { seoConfig } from "@/config/seo";
import styles from "@/styles/Sip&Solve.module.css";

export default function SipAndSolvePage() {
  const { t } = useTranslation("common");

  return (
    <>
      <SeoHead
        description={seoConfig.sipAndSolve.description}
        title={seoConfig.sipAndSolve.title}
      />
      <div className={styles.page}>
        <div className="base-container">
          <div className={styles.content}>
            {/* First image - Sip:SolveBox.webp */}
            <div className={styles.imageWrapper}>
              <Image
                priority
                alt="Sip & Solve Box"
                className={styles.boxImage}
                height={400}
                src="/images/large/Sip&SolveBox.webp"
                width={400}
              />
            </div>

            {/* Title and description section */}
            <div className={styles.titleSection}>
              <h1 className={styles.title1}>{t("sip&solve.title1")}</h1>
              <h2 className={styles.title2}>{t("sip&solve.title2")}</h2>
              <p className={styles.description}>{t("sip&solve.description")}</p>
              <p className={styles.shortDescription}>{t("sip&solve.short")}</p>
            </div>

            {/* Get it here button */}
            <div className={styles.buttonWrapper}>
              <a
                className={styles.getItButton}
                href="https://www.flaschenpost.ch/en/dineysos-weinbox_dineysos-wine-dine?_size=750&_vintage=0&_packaging=Spezialverpackung&_sku=1215742"
                rel="noopener noreferrer"
                target="_blank"
              >
                {t("sip&solve.button")}
              </a>
            </div>

            {/* Second image - Sip&Solve.webp */}
            <div className={styles.imageWrapper}>
              <Image
                alt="Sip & Solve Game"
                className={styles.gameImage}
                height={400}
                src="/images/large/Sip&Solve.webp"
                width={600}
              />
            </div>
          </div>
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
    revalidate: 60,
  };
}
