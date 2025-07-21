import styles from "@/styles/sections/Pricing.module.css";
import { useTranslation } from "next-i18next";

const participants = [
  {
    key: "pricing.table.sGroup",
    label: "4–7",
    basePrice: "70",
    perPerson: true,
  },
  {
    key: "pricing.table.mGroup",
    label: "8–15",
    basePrice: "50",
    perPerson: true,
  },
  {
    key: "pricing.table.lGroup",
    label: "16–30",
    basePrice: "35",
    perPerson: true,
  },
  {
    key: "pricing.table.xlGroup",
    label: "31+",
    basePrice: "onRequest",
    perPerson: false,
  },
];

const pricingData = [
  {
    labelKey: "pricing.table.basePrice",
    descriptionKey: "pricing.table.basePriceDescription",
    prices: participants.map((p) =>
      p.basePrice === "onRequest" ? "onRequest" : `CHF ${p.basePrice}.–`
    ),
    per: "pricing.table.perPerson",
  },
  {
    labelKey: "pricing.table.winePairing",
    descriptionKey: "pricing.table.winePairingDescription",
    prices: ["35", "35", "35", "35"].map((p) => `ab CHF ${p}.–`),
    per: "pricing.table.perPerson",
  },
  {
    labelKey: "pricing.table.food",
    descriptionKey: "pricing.table.foodDescription",
    prices: ["onRequest", "onRequest", "onRequest", "onRequest"],
  },
  {
    labelKey: "pricing.table.venue",
    prices: ["onRequest", "onRequest", "onRequest", "onRequest"],
  },
  {
    labelKey: "pricing.table.extension",
    descriptionKey: "pricing.table.extensionDescription",
    prices: ["90", "90", "90", "90"].map((p) => `CHF ${p}.–`),
    per: "pricing.table.perHour",
  },
];

export default function Pricing() {
  const { t } = useTranslation("common");

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
                {participants.map((p, idx) => (
                  <th key={idx}>{p.label}</th> // shows "4–7", "8–15", etc.
                ))}
              </tr>
            </thead>
            <tbody>
              {pricingData.map((item, idx) => (
                <tr key={idx}>
                  <td>
                    <strong>{t(item.labelKey)}</strong>
                    <br />
                    {item.descriptionKey && (
                      <small>{t(item.descriptionKey)}</small>
                    )}
                  </td>
                  {item.prices.map((price, i) => (
                    <td key={i}>
                      {price === "onRequest" ? (
                        t("pricing.table.onRequest")
                      ) : (
                        <>
                          {price}
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
            <details key={idx} className={styles.accordionItem}>
              <summary className={styles.accordionHeader}>
                <span className={styles.headerText}>{t(p.key)}</span>
                <span className={styles.accordionArrow}>&#9660;</span>
              </summary>
              <div className={styles.accordionContent}>
                {pricingData.map((item, j) => (
                  <div key={j} className={styles.priceRow}>
                    <span className={styles.priceLabel}>
                      {t(item.labelKey)}:
                    </span>
                    <span className={styles.priceDots}></span>
                    <span className={styles.priceValue}>
                      {item.prices[idx] === "onRequest" ? (
                        t("pricing.table.onRequest")
                      ) : (
                        <p className={styles.priceBlock}>
                          <span className={styles.priceAmount}>
                            {item.prices[idx]}
                          </span>
                          {item.per && (
                            <small className={styles.priceAnnotation}>
                              {t(item.per)}
                            </small>
                          )}
                        </p>
                      )}
                    </span>
                  </div>
                ))}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
