import Image from "next/image";
import { useTranslation } from "next-i18next";
import { useEffect, useRef, useState } from "react";

import GlassesRating from "@/components/common/Glasses";
import styles from "@/styles/sections/Concept.module.css";
import buttonStyles from "@/styles/ui/SectionLink.module.css";

type ConceptKey = "classroom" | "trophy" | "olympics";
type SelectedConcept = ConceptKey | "custom";

const conceptRows: ConceptKey[] = ["classroom", "trophy", "olympics"];
const importanceCriteria = [
  "wineTheory",
  "tastingTechnique",
  "foodPairing",
  "discoverPreferences",
] as const;
const importanceValues = [1, 2, 3, 4, 5] as const;
const winePreferences = ["all", "red", "white", "bubbles"] as const;

const ratings: Record<ConceptKey, { exchange: number; fun: number; learning: number }> = {
  classroom: { exchange: 3, fun: 4, learning: 5 },
  trophy: { exchange: 4, fun: 5, learning: 2 },
  olympics: { exchange: 5, fun: 4, learning: 3 },
};

export default function Concepts() {
  const { t } = useTranslation("common");
  const [selectedConcept, setSelectedConcept] = useState<SelectedConcept | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const customConceptTitle = t("concept.custom.title");
  const customOpenDetailsLabel = t("concept.table.openDetails", {
    concept: customConceptTitle,
  });

  useEffect(() => {
    if (!selectedConcept) return;

    previousFocusRef.current = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedConcept(null);
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleEscape);
      previousFocusRef.current?.focus();
    };
  }, [selectedConcept]);

  const openConcept = (concept: SelectedConcept) => setSelectedConcept(concept);

  return (
    <section className={styles.concepts} id="concepts">
      <div className="base-container">
        <h2>{t("concept.heading")}</h2>
        <p className={styles.introduction}>{t("concept.description")}</p>

        <div className={styles.tableViewport}>
          <table className={styles.table}>
            <caption className={styles.visuallyHidden}>{t("concept.table.caption")}</caption>
            <thead>
              <tr>
                <th scope="col">{t("concept.table.headers.concept")}</th>
                <th scope="col">{t("concept.table.headers.focus")}</th>
                <th scope="col">{t("concept.table.headers.setup")}</th>
                <th scope="col">{t("concept.table.headers.suitable")}</th>
                <th scope="col">{t("concept.table.headers.participants")}</th>
                <th scope="col">{t("concept.table.headers.wines")}</th>
              </tr>
            </thead>
            <tbody>
              {conceptRows.map((concept) => (
                <tr
                  key={concept}
                  aria-haspopup="dialog"
                  aria-label={t("concept.table.openDetails", {
                    concept: t(`concept.${concept}.title`),
                  })}
                  className={styles.interactiveRow}
                  role="button"
                  tabIndex={0}
                  onClick={() => openConcept(concept)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      openConcept(concept);
                    }
                  }}
                >
                  <td className={styles.nameCell}>{t(`concept.${concept}.title`)}</td>
                  <td>{t(`concept.table.rows.${concept}.focus`)}</td>
                  <td>{t(`concept.table.rows.${concept}.setup`)}</td>
                  <td>{t(`concept.table.rows.${concept}.suitable`)}</td>
                  <td>{t(`concept.table.rows.${concept}.participants`)}</td>
                  <td>{t(`concept.table.rows.${concept}.wines`)}</td>
                </tr>
              ))}
              <tr
                aria-haspopup="dialog"
                aria-label={customOpenDetailsLabel}
                className={`${styles.interactiveRow} ${styles.customRow}`}
                role="button"
                tabIndex={0}
                onClick={() => openConcept("custom")}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    openConcept("custom");
                  }
                }}
              >
                <td className={styles.nameCell}>{customConceptTitle}</td>
                <td className={styles.customPrompt} colSpan={5}>
                  {t("concept.custom.prompt")}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className={styles.mobileConceptList}>
          {conceptRows.map((concept) => {
            const conceptTitle = t(`concept.${concept}.title`);
            const openDetailsLabel = t("concept.table.openDetails", {
              concept: conceptTitle,
            });
            const [wineCount, ...wineNoteLines] = t(`concept.table.rows.${concept}.wines`).split(
              "\n"
            );

            return (
              <button
                key={concept}
                aria-haspopup="dialog"
                aria-label={openDetailsLabel}
                className={styles.mobileConceptCard}
                type="button"
                onClick={() => openConcept(concept)}
              >
                <span className={styles.mobileCardTitle}>{conceptTitle}</span>

                <span className={styles.mobileCardBody}>
                  <span className={styles.mobileCardFocus}>
                    <span className={styles.mobileCardLabel}>
                      {t("concept.table.headers.focus")}
                    </span>
                    <strong>{t(`concept.table.rows.${concept}.focus`)}</strong>
                  </span>

                  <span className={styles.mobileCardStats}>
                    <span className={styles.mobileCardStat}>
                      <span className={styles.mobileCardLabel}>
                        {t("concept.table.headers.participants")}
                      </span>
                      <strong>{t(`concept.table.rows.${concept}.participants`)}</strong>
                    </span>
                    <span className={styles.mobileCardStat}>
                      <span className={styles.mobileCardLabel}>
                        {t("concept.table.headers.wines")}
                      </span>
                      <strong className={styles.mobileCardStatValue}>
                        <span>{wineCount}</span>
                        {wineNoteLines.length > 0 && <small>{wineNoteLines.join(" ")}</small>}
                      </strong>
                    </span>
                  </span>

                  <span className={styles.mobileCardDetails}>
                    <span className={styles.mobileCardDetail}>
                      <span className={styles.mobileCardLabel}>
                        {t("concept.table.headers.suitable")}
                      </span>
                      <span>{t(`concept.table.rows.${concept}.suitable`)}</span>
                    </span>
                    <span className={styles.mobileCardDetail}>
                      <span className={styles.mobileCardLabel}>
                        {t("concept.table.headers.setup")}
                      </span>
                      <span>{t(`concept.table.rows.${concept}.setup`)}</span>
                    </span>
                  </span>

                  <span className={styles.mobileCardAction}>
                    {t("concept.table.openDetailsShort")}
                  </span>
                </span>
              </button>
            );
          })}

          <button
            aria-haspopup="dialog"
            aria-label={customOpenDetailsLabel}
            className={`${styles.mobileConceptCard} ${styles.mobileCustomCard}`}
            type="button"
            onClick={() => openConcept("custom")}
          >
            <span className={styles.mobileCardTitle}>{customConceptTitle}</span>
            <span className={styles.mobileCustomContent}>
              <strong>{t("concept.custom.prompt")}</strong>
              <span className={styles.mobileCardAction}>{t("concept.table.openDetailsShort")}</span>
            </span>
          </button>
        </div>

        <div className={styles.contactCta}>
          <a className={buttonStyles.sectionLink} href="#contact">
            {t("concept.contactButton")}
          </a>
        </div>
      </div>

      {selectedConcept && (
        <div
          className={styles.dialogOverlay}
          onClick={(event) => {
            if (event.currentTarget === event.target) setSelectedConcept(null);
          }}
        >
          <div
            aria-labelledby="concept-dialog-title"
            aria-modal="true"
            className={styles.dialog}
            role="dialog"
          >
            <button
              ref={closeButtonRef}
              aria-label={t("concept.dialog.close")}
              className={styles.closeButton}
              type="button"
              onClick={() => setSelectedConcept(null)}
            >
              <Image alt="" height={30} src="/images/icons/orangex.webp" width={30} />
            </button>

            {selectedConcept === "custom" ? (
              <section className={styles.designCard}>
                <h3 id="concept-dialog-title">{t("concept.custom.designTitle")}</h3>

                <div className={styles.scaleArea}>
                  <div aria-hidden="true" className={styles.scaleHeader}>
                    <span />
                    <div className={styles.scaleLabels}>
                      <span>{t("concept.custom.veryImportant")}</span>
                      <span>{t("concept.custom.notImportant")}</span>
                    </div>
                  </div>

                  <div className={styles.importanceScales}>
                    {importanceCriteria.map((criterion) => (
                      <div
                        key={criterion}
                        aria-label={t(`concept.custom.criteria.${criterion}`)}
                        className={styles.criterion}
                        role="group"
                      >
                        <span className={styles.criterionLabel}>
                          {t(`concept.custom.criteria.${criterion}`)}
                        </span>
                        <div className={styles.scaleOptions}>
                          {importanceValues.map((value) => (
                            <input
                              key={value}
                              aria-label={t("concept.custom.importanceChoice", {
                                criterion: t(`concept.custom.criteria.${criterion}`),
                                value,
                              })}
                              name={`importance-${criterion}`}
                              type="radio"
                              value={value}
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <fieldset className={styles.preferenceGroup}>
                  <legend>{t("concept.custom.preferencesTitle")}</legend>
                  <div className={styles.preferenceOptions}>
                    {winePreferences.map((preference) => (
                      <label key={preference} className={styles.preferenceOption}>
                        <input name={`wine-preference-${preference}`} type="checkbox" />
                        <span>{t(`concept.custom.preferences.${preference}`)}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>

                <div className={styles.textFields}>
                  <label>
                    <span>{t("concept.custom.favoriteRegion")}</span>
                    <input type="text" />
                  </label>
                  <label>
                    <span>{t("concept.custom.favoriteWine")}</span>
                    <input type="text" />
                  </label>
                </div>
              </section>
            ) : (
              <article className={styles.detailCard}>
                <div className={styles.detailCopy}>
                  <h3 id="concept-dialog-title">
                    {selectedConcept === "olympics"
                      ? t("concept.olympics.modalTitle")
                      : t(`concept.${selectedConcept}.title`)}
                  </h3>
                  <p>{t(`concept.${selectedConcept}.description`)}</p>
                </div>

                <div className={styles.ratings}>
                  <p className={styles.gameType}>
                    <span>{t("concept.gameType")} </span>
                    <strong>{t(`concept.${selectedConcept}.gameType`)}</strong>
                  </p>
                  <div className={styles.ratingRow}>
                    <span>{t("concept.fun")}</span>
                    <GlassesRating count={ratings[selectedConcept].fun} />
                  </div>
                  <div className={styles.ratingRow}>
                    <span>{t("concept.learning")}</span>
                    <GlassesRating count={ratings[selectedConcept].learning} />
                  </div>
                  <div className={styles.ratingRow}>
                    <span>{t("concept.exchange")}</span>
                    <GlassesRating count={ratings[selectedConcept].exchange} />
                  </div>
                </div>
              </article>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
