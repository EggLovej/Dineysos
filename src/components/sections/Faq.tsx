import { useTranslation } from "next-i18next";

import styles from "@/styles/sections/Faq.module.css";

const faqItems = [
  "audience",
  "duration",
  "location",
  "included",
  "customization",
  "alcoholFree",
] as const;

export default function Faq() {
  const { t } = useTranslation("common");

  return (
    <section className={styles.faq} id="faq">
      <div className="base-container">
        <h2>{t("faq.heading")}</h2>

        <div className={styles.list}>
          {faqItems.map((item) => (
            <details key={item} className={styles.item}>
              <summary>{t(`faq.items.${item}.question`)}</summary>
              <p>{t(`faq.items.${item}.answer`)}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
