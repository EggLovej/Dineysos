import styles from "@/styles/sections/About.module.css";
import { useTranslation } from "next-i18next";

export default function About() {
  const { t } = useTranslation("common");

  return (
    <section className={styles.about} id="about">
      <div className="base-container">
        <div className={styles.content}>
          <div className={styles.left}>
            <h2>{t("about.heading")}</h2>
            <p>{t("about.paragraph1")}</p>
            <p>{t("about.paragraph2")}</p>
            <p>{t("about.paragraph3")}</p>
            <p>{t("about.paragraph4")}</p>
          </div>
          <div className={styles.right}>
            <div className="desktop">
              <img
                src="/images/large/clint&marina.png"
                alt="Clint & Marina"
                className={styles.image}
              />
              <div className={`${styles.label} ${styles.marina}`}>
                <p className={styles.name}>Marina</p>
                <p className={styles.description}>{t("about.marina")}</p>
              </div>
              <div className={`${styles.label} ${styles.clint}`}>
                <p className={styles.name}>Clint</p>
                <p className={styles.description}>{t("about.clint")}</p>
              </div>
            </div>

            <div className="mobile">
              <div className={styles.block}>
                <div className={`${styles.label} ${styles.marinaMobile}`}>
                  <p className={styles.description}>{t("about.marina")}</p>
                  <p className={styles.name}>Marina</p>
                </div>

                <img
                  src="/images/large/clint&marina.png"
                  alt="Clint & Marina"
                  className={styles.image}
                />

                <div className={`${styles.label} ${styles.clintMobile}`}>
                  <p className={styles.name}>Clint</p>
                  <p className={styles.description}>{t("about.clint")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
