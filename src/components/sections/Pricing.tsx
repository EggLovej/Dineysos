import { useTranslation } from "next-i18next";

import { participants, type Price, pricingData } from "@/config/pricing";
import styles from "@/styles/sections/Pricing.module.css";

export default function Pricing() {
  const { t } = useTranslation("common");

  const formatAmount = (price: Extract<Price, { kind: "amount" }>) =>
    `${price.from ? `${t("pricing.table.startingFrom")} ` : ""}CHF ${price.amount}.–`;

  return (
    <section className={styles.pricing} id="pricing">
      <div className="base-container">
        <h2>{t("pricing.title")}</h2>

        <div className={styles.desktopContent}>
          <p>{t("pricing.description")}</p>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>{t("pricing.table.participants")}</th>
                {participants.map((p) => (
                  <th key={p.key}>{p.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {pricingData.map((item) => (
                <tr key={item.labelKey}>
                  <td>
                    <strong>{t(item.labelKey)}</strong>
                    <br />
                    {item.descriptionKey && <small>{t(item.descriptionKey)}</small>}
                  </td>
                  {item.prices.map((price, i) => (
                    <td key={i}>
                      {price.kind === "onRequest" ? (
                        t("pricing.table.onRequest")
                      ) : (
                        <>
                          {formatAmount(price)}
                          <br />
                          {item.per && <small>{t(item.per)}</small>}
                        </>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className={styles.mobileContent}>
          <p>{t("pricing.description")}</p>
          {participants.map((p, idx) => (
            <details key={p.key} className={styles.accordionItem}>
              <summary className={styles.accordionHeader}>
                <span className={styles.headerText}>{t(p.key)}</span>
                <span className={styles.accordionArrow}>&#9660;</span>
              </summary>
              <div className={styles.accordionContent}>
                {pricingData.map((item) => {
                  const price = item.prices[idx];
                  return (
                    <div key={item.labelKey} className={styles.priceRow}>
                      <span className={styles.priceLabel}>{t(item.labelKey)}:</span>
                      <span className={styles.priceDots}></span>
                      <span className={styles.priceValue}>
                        {price.kind === "onRequest" ? (
                          t("pricing.table.onRequest")
                        ) : (
                          <p className={styles.priceBlock}>
                            <span className={styles.priceAmount}>{formatAmount(price)}</span>
                            {item.per && (
                              <small className={styles.priceAnnotation}>{t(item.per)}</small>
                            )}
                          </p>
                        )}
                      </span>
                    </div>
                  );
                })}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
