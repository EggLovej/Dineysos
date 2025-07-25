import Image from "next/image";
import { useTranslation } from "next-i18next";
import { useState } from "react";

import { FlowerSeparator } from "@/components/common/Flowers";
import GlassesRating from "@/components/common/Glasses";
import Modal from "@/components/ui/Modal";
import styles from "@/styles/sections/Concept.module.css";

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
              <Image alt="Trophy" height={246} src="/images/icons/trophy.webp" width={240} />
            </div>
            <div className={styles.description}>
              <h3>{t("concept.trophy.title")}</h3>
              <p>{t("concept.trophy.description")}</p>
              <button
                className={styles.button}
                onClick={() => {
                  setModalImageBase("trophy");
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

          <FlowerSeparator className="mobile" />

          <div className={styles.card}>
            <div className={styles.image}>
              <Image alt="Classroom" height={195} src="/images/icons/classroom.webp" width={240} />
            </div>
            <div className={styles.description}>
              <h3>{t("concept.classroom.title")}</h3>
              <p>{t("concept.classroom.description")}</p>
              <button
                className={styles.button}
                onClick={() => {
                  setModalImageBase("classroom");
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

          <FlowerSeparator className="mobile" />

          <div className={styles.card}>
            <div className={styles.image}>
              <Image alt="Trophy" height={180} src="/images/icons/olympics.webp" width={240} />
            </div>
            <div className={styles.description}>
              <h3>{t("concept.olympics.title")}</h3>
              <p>{t("concept.olympics.description")}</p>
              <button
                className={styles.button}
                onClick={() => {
                  setModalImageBase("olympics");
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

          <FlowerSeparator className="mobile" />
        </div>
      </div>

      <Modal baseName={modalImageBase} open={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  );
}
