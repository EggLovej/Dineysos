import type { GetStaticPropsContext } from "next";
import { useTranslation } from "next-i18next";

import LegalPage from "@/components/layout/LegalPage";
import { getI18nStaticProps } from "@/lib/getStaticProps";
import styles from "@/styles/Legal.module.css";

const registrationFields = ["company", "vat", "registerOffice", "registerNumber"] as const;
const sections = [
  { key: "disclaimer", paragraphs: 3 },
  { key: "links", paragraphs: 1 },
  { key: "copyright", paragraphs: 1 },
] as const;

export default function ImprintPage() {
  const { t } = useTranslation("imprint");

  return (
    <LegalPage document="imprint">
      <div className={styles.document}>
        <div className={styles.imprintDetails}>
          <address>
            {[0, 1, 2, 3, 4].map((index) => (
              <div key={index}>{t(`address.${index}`)}</div>
            ))}
          </address>

          <div>
            <p>
              {t("contact.phoneLabel")}{" "}
              <a href={`tel:${t("contact.phones.0").replaceAll(" ", "")}`}>
                {t("contact.phones.0")}
              </a>
              {" | "}
              <a href={`tel:${t("contact.phones.1").replaceAll(" ", "")}`}>
                {t("contact.phones.1")}
              </a>
            </p>
            <p>
              {t("contact.emailLabel")}{" "}
              <a href={`mailto:${t("contact.email")}`}>{t("contact.email")}</a>
            </p>
            <p>
              {t("contact.websiteLabel")} <a href={t("contact.website")}>{t("contact.website")}</a>
            </p>
          </div>

          <dl className={styles.registration}>
            {registrationFields.map((field) => (
              <div key={field}>
                <dt>{t(`registration.${field}.label`)}</dt>{" "}
                <dd>{t(`registration.${field}.value`)}</dd>
              </div>
            ))}
          </dl>

          <section aria-labelledby="imprint-owners">
            <h2 id="imprint-owners">{t("owners.title")}</h2>
            <p>
              {t("owners.names.0")}
              <br />
              {t("owners.names.1")}
            </p>
          </section>
        </div>

        {sections.map(({ key, paragraphs }) => (
          <section key={key} aria-labelledby={`imprint-${key}`}>
            <h2 id={`imprint-${key}`}>{t(`sections.${key}.title`)}</h2>
            {Array.from({ length: paragraphs }, (_, index) => (
              <p key={index}>{t(`sections.${key}.paragraphs.${index}`)}</p>
            ))}
          </section>
        ))}

        <p className={styles.updated}>{t("updated")}</p>
      </div>
    </LegalPage>
  );
}

export async function getStaticProps(context: GetStaticPropsContext) {
  return getI18nStaticProps(context, ["common", "imprint"]);
}
