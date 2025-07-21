import styles from "@/styles/sections/Concept.module.css";
import { useTranslation } from "next-i18next";
import GlassesRating from "@/components/common/Glasses";
import { useState } from "react";
import Modal from "@/components/ui/Modal";

export default function Concepts() {
  const { t } = useTranslation("common");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImageBase, setModalImageBase] = useState("");

  return (
    <section className={styles.concepts} id="concepts">
      <div className="base-container">
        <h2>{t("concept.heading")}</h2>

        <div className={styles.grid}>
          <div className={styles.card}>
            <div className={styles.image}>
              <img src="/images/icons/trophy.png" alt="Trophy" />
            </div>
            <div className={styles.description}>
              <h3>{t("concept.trophy.title")}</h3>
              <p>{t("concept.trophy.description")}</p>
              <button
                className={styles.button}
                onClick={() => {
                  setModalImageBase("Trophy");
                  setModalOpen(true);
                }}
              >
                {t("concept.button")}
              </button>
            </div>
            <div className={styles.classification}>
              <p>
                <span>{t("concept.gameType")} </span>
                <strong>{t("concept.trophy.gameType")}</strong>
              </p>
              <div className={styles.row}>
                <span>{t("concept.fun")}</span>
                <GlassesRating count={5} />
              </div>
              <div className={styles.row}>
                <span>{t("concept.learning")}</span>
                <GlassesRating count={2} />
              </div>
              <div className={styles.row}>
                <span>{t("concept.exchange")}</span>
                <GlassesRating count={4} />
              </div>
            </div>
          </div>

          <div className={`${styles.seperator} mobile`}>
            <img
              src="/images/icons/Flower.png"
              alt="Flower"
              className={styles.flower}
            />
            <img
              src="/images/icons/Flower.png"
              alt="Flower"
              className={styles.flower}
            />
            <img
              src="/images/icons/Flower.png"
              alt="Flower"
              className={styles.flower}
            />
          </div>

          <div className={styles.card}>
            <div className={styles.image}>
              <img src="/images/icons/classroom.png" alt="Classroom" />
            </div>
            <div className={styles.description}>
              <h3>{t("concept.classroom.title")}</h3>
              <p>{t("concept.classroom.description")}</p>
              <button
                className={styles.button}
                onClick={() => {
                  setModalImageBase("Classroom");
                  setModalOpen(true);
                }}
              >
                {t("concept.button")}
              </button>
            </div>
            <div className={styles.classification}>
              <p>
                <span>{t("concept.gameType")} </span>
                <strong>{t("concept.classroom.gameType")}</strong>
              </p>
              <div className={styles.row}>
                <span>{t("concept.fun")}</span>
                <GlassesRating count={4} />
              </div>
              <div className={styles.row}>
                <span>{t("concept.learning")}</span>
                <GlassesRating count={5} />
              </div>
              <div className={styles.row}>
                <span>{t("concept.exchange")}</span>
                <GlassesRating count={3} />
              </div>
            </div>
          </div>

          <div className={`${styles.seperator} mobile`}>
            <img
              src="/images/icons/Flower.png"
              alt="Flower"
              className={styles.flower}
            />
            <img
              src="/images/icons/Flower.png"
              alt="Flower"
              className={styles.flower}
            />
            <img
              src="/images/icons/Flower.png"
              alt="Flower"
              className={styles.flower}
            />
          </div>

          <div className={styles.card}>
            <div className={styles.image}>
              <img src="/Images/icons/olympics.png" alt="Olympics" />
            </div>
            <div className={styles.description}>
              <h3>{t("concept.olympics.title")}</h3>
              <p>{t("concept.olympics.description")}</p>
              <button
                className={styles.button}
                onClick={() => {
                  setModalImageBase("Olympics");
                  setModalOpen(true);
                }}
              >
                {t("concept.button")}
              </button>
            </div>
            <div className={styles.classification}>
              <p>
                <span>{t("concept.gameType")} </span>
                <strong>{t("concept.olympics.gameType")}</strong>
              </p>
              <div className={styles.row}>
                <span>{t("concept.fun")}</span>
                <GlassesRating count={4} />
              </div>
              <div className={styles.row}>
                <span>{t("concept.learning")}</span>
                <GlassesRating count={3} />
              </div>
              <div className={styles.row}>
                <span>{t("concept.exchange")}</span>
                <GlassesRating count={5} />
              </div>
            </div>
          </div>

          <div className={`${styles.seperator} mobile`}>
            <img
              src="/images/icons/Flower.png"
              alt="Flower"
              className={styles.flower}
            />
            <img
              src="/images/icons/Flower.png"
              alt="Flower"
              className={styles.flower}
            />
            <img
              src="/images/icons/Flower.png"
              alt="Flower"
              className={styles.flower}
            />
          </div>
        </div>
      </div>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        baseName={modalImageBase}
      />
    </section>
  );
}
