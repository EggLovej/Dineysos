import styles from "@/styles/sections/Contact.module.css";
import { useTranslation } from "next-i18next";

export default function Contact() {
  const { t } = useTranslation("common");

  return (
    <section className={styles.contact} id="contact">
      <div className="base-container">
        <h2>{t("contact.title")}</h2>

        <div className={styles.content}>
          <div className={styles.left}>
            <div className={styles.text}>
              <p>{t("contact.left.message1")}</p>
              <p>{t("contact.left.message2")}</p>
              <p>
                <a
                  href="mailto:info@dineysos.com"
                  className={styles.email}
                  data-track="email"
                >
                  info@dineysos.com
                </a>
              </p>
              <p>{t("contact.left.message3")}</p>
            </div>

            <div className={styles.cards}>
              <ContactCard
                name="Clint"
                image="/images/people/clint.png"
                phone="078 944 90 95"
              />
              <ContactCard
                name="Marina"
                image="/images/people/marina.png"
                phone="079 832 24 36"
              />
            </div>
          </div>

          <div className={styles.right}>
            <p>
              <strong>{t("contact.right.title")}</strong>
            </p>
            <ul className={styles.flowerList}>
              <li>{t("contact.right.one")}</li>
              <li>{t("contact.right.two")}</li>
              <li>{t("contact.right.three")}</li>
              <li>{t("contact.right.four")}</li>
              <li>{t("contact.right.five")}</li>
            </ul>

            <div className={styles.logo}>
              <img src="/images/logo/color.png" alt="Dineysos Logo" />
            </div>

            <div className={styles.qrCodes}>
              <QRCodeLink
                href="https://www.instagram.com/dineysos/#"
                src="/images/icons/qr/instagram.png"
                alt="Instagram QR"
                platform="Instagram"
              />
              <QRCodeLink
                href="https://www.linkedin.com/company/dineysos/posts/?feedView=all"
                src="/images/icons/qr/linkedin.png"
                alt="LinkedIn QR"
                platform="LinkedIn"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactCard({
  name,
  image,
  phone,
}: {
  name: string;
  image: string;
  phone: string;
}) {
  return (
    <div className={styles.card}>
      <img src={image} alt={name} className={styles.cardImage} />
      <div className={styles.cardInfo}>
        <p>{name}</p>
        <p>
          <a className={styles.phone} href={`tel:${phone}`}>
            {phone}
          </a>
        </p>
      </div>
    </div>
  );
}

function QRCodeLink({
  href,
  src,
  alt,
  platform,
}: {
  href: string;
  src: string;
  alt: string;
  platform: string;
}) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      <img src={src} alt={alt} className={styles.qrCode} />
    </a>
  );
}
