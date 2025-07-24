import styles from "@/styles/sections/Format.module.css";
import helperstyles from "@/styles/Helper.module.css";
import { useTranslation } from "next-i18next";
import {
  FlowersRatingDesktop,
  FlowersRatingMobile,
} from "@/components/common/Flowers";
import Image from "next/image";

const formatData = [
  {
    nameKey: "concept.trophy.title",
    icon: "/images/icons/trophy.webp",
    flowers: [4, 4, 3, 2, 1],
  },
  {
    nameKey: "concept.classroom.title",
    icon: "/images/icons/classroom.webp",
    flowers: [2, 2, 4, 4, 3],
  },
  {
    nameKey: "concept.olympics.title",
    icon: "/images/icons/olympics.webp",
    flowers: [3, 2, 3, 3, 4],
  },
];

const tableCols = [
  "format.table.col1",
  "format.table.col2",
  "format.table.col3",
  "format.table.col4",
  "format.table.col5",
];
const legendKeys = ["one", "two", "three", "four"];

export default function Format() {
  const { t } = useTranslation("common");

  return (
    <section className={styles.format} id="format">
      <div className="base-container">
        <h2>{t("format.title")}</h2>
        <div className={styles.description}>
          <p>{t("format.description1")}</p>
          <p>{t("format.description2")}</p>
        </div>

        {/* Desktop Table */}
        <div className={styles.tableWrapper}>
          <div className={styles.table}>
            <table>
              <thead>
                <tr>
                  <th></th>
                  {tableCols.map((key) => (
                    <th key={key}>{t(key)}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {formatData.map((row, i) => (
                  <tr key={i}>
                    <td>{t(row.nameKey)}</td>
                    {row.flowers.map((count, j) => (
                      <td key={j}>
                        <FlowersRatingDesktop count={count} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className={styles.legend}>
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className={styles.legendRow}>
                <span className={styles.legendSymbol}>
                  {[...Array(n)].map((_, i) => (
                    <Image
                      key={i}
                      src="/images/icons/flower.webp"
                      className={helperstyles.flower}
                      alt="Flower"
                      width={24}
                      height={24}
                    />
                  ))}
                </span>
                <span className={styles.legendText}>
                  {" "}
                  {t(`format.legend.${legendKeys[n - 1]}`)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Accordion */}
        <div className={styles.accordion}>
          {formatData.map((entry, i) => (
            <details key={i} className={styles.accordionItem}>
              <summary className={styles.accordionHeader}>
                <div className={styles.accordionHeaderLeft}>
                  <img
                    src={entry.icon}
                    className={styles.accordionIcon}
                    alt={t(entry.nameKey) || "Concept icon"}
                  />
                  <span className={styles.accordionTitle}>
                    {t(entry.nameKey)}
                  </span>
                </div>
                <span className={styles.accordionArrow}>&#9660;</span>
              </summary>
              <div className={styles.accordionContent}>
                {entry.flowers.map((count, j) => (
                  <p
                    key={j}
                    className={
                      j % 2 === 0
                        ? styles.accordionBright
                        : styles.accordionDark
                    }
                  >
                    <strong>{t(tableCols[j])}</strong>{" "}
                    <FlowersRatingMobile count={count} />
                  </p>
                ))}
              </div>
            </details>
          ))}

          <div className={styles.legend}>
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className={styles.legendRow}>
                <span className={styles.legendSymbol}>
                  {[...Array(n)].map((_, i) => (
                    <Image
                      key={i}
                      src="/images/icons/flower.webp"
                      className={helperstyles.flower}
                      alt="Flower"
                      width={24}
                      height={24}
                    />
                  ))}
                </span>
                <span className={styles.legendText}>
                  {t(`format.legend.${legendKeys[n - 1]}`)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
