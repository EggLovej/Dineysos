import Image from "next/image";
import { useTranslation } from "next-i18next";

import styles from "@/styles/sections/PartnersReferences.module.css";

const partners = [
  { alt: "BCG", height: 2160, src: "/images/icons/partners/bcg.webp", width: 3840 },
  {
    alt: "Terravigna",
    height: 2917,
    src: "/images/icons/partners/terravigna.webp",
    width: 2917,
  },
  { alt: "ZWA", height: 140, src: "/images/icons/partners/zwa.webp", width: 160 },
  { alt: "Expovina", height: 350, src: "/images/icons/partners/expovina.webp", width: 600 },
  {
    alt: "Flaschenpost",
    height: 404,
    src: "/images/icons/partners/flaschenpost.webp",
    width: 804,
  },
] as const;

export default function PartnersReferences() {
  const { t } = useTranslation("common");

  return (
    <section className={styles.partnersReferences} id="partners-references">
      <div className="base-container">
        <h2>{t("partnersReferences.heading")}</h2>

        <div className={styles.grid}>
          {partners.map((partner) => (
            <div key={partner.alt} className={styles.imageCard}>
              <Image
                alt={partner.alt}
                className={styles.image}
                height={partner.height}
                sizes="(max-width: 768px) 40vw, 16vw"
                src={partner.src}
                width={partner.width}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
