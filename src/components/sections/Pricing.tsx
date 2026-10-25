import { useTranslation } from "next-i18next";

import styles from "@/styles/sections/Pricing.module.css";

type Price = { kind: "onRequest" } | { kind: "amount"; amount: number; from?: boolean };

const ON_REQUEST: Price = { kind: "onRequest" };
const chf = (amount: number, from = false): Price => ({ kind: "amount", amount, from });

const participants = [
  { key: "pricing.table.sGroup", label: "4–7", basePrice: chf(70) },
  { key: "pricing.table.mGroup", label: "8–15", basePrice: chf(50) },
  { key: "pricing.table.lGroup", label: "16–30", basePrice: chf(35) },
  { key: "pricing.table.xlGroup", label: "31+", basePrice: ON_REQUEST },
];

const pricingData: {
  labelKey: string;
  descriptionKey?: string;
  prices: Price[];
  per?: string;
}[] = [
  {
    labelKey: "pricing.table.basePrice",
    descriptionKey: "pricing.table.basePriceDescription",
    prices: participants.map((p) => p.basePrice),
    per: "pricing.table.perPerson",
  },
  {
    labelKey: "pricing.table.winePairing",
    descriptionKey: "pricing.table.winePairingDescription",
    prices: participants.map(() => chf(35, true)),
    per: "pricing.table.perPerson",
  },
  {
    labelKey: "pricing.table.food",
    descriptionKey: "pricing.table.foodDescription",
    prices: participants.map(() => ON_REQUEST),
  },
  {
    labelKey: "pricing.table.venue",
    prices: participants.map(() => ON_REQUEST),
  },
  {
    labelKey: "pricing.table.extension",
    descriptionKey: "pricing.table.extensionDescription",
    prices: participants.map(() => chf(90)),
    per: "pricing.table.perHour",
  },
];

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
