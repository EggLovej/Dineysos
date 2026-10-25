import type { GetStaticPropsContext } from "next";
import { useTranslation } from "next-i18next";

import LegalPage from "@/components/layout/LegalPage";
import { getI18nStaticProps } from "@/lib/getStaticProps";
import styles from "@/styles/Legal.module.css";

const sections = [
  "payment",
  "cancellation",
  "forceMajeure",
  "partialServices",
  "thirdParties",
] as const;

export default function TermsPage() {
  const { t } = useTranslation("terms");

  return (
    <LegalPage document="terms">
      <div className={styles.document}>
        {sections.map((section) => (
          <section key={section} aria-labelledby={`terms-${section}`}>
            <h2 id={`terms-${section}`}>{t(`sections.${section}.title`)}</h2>
            <p>{t(`sections.${section}.body`)}</p>
            {section === "cancellation" && (
              <>
                <ul>
                  {[0, 1, 2].map((index) => (
                    <li key={index}>{t(`sections.cancellation.fees.${index}`)}</li>
                  ))}
                </ul>
                <p>{t("sections.cancellation.after")}</p>
              </>
            )}
          </section>
        ))}
      </div>
    </LegalPage>
  );
}

export async function getStaticProps(context: GetStaticPropsContext) {
  return getI18nStaticProps(context, ["common", "terms"]);
}
