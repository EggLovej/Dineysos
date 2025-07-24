import styles from "@/styles/sections/Contact.module.css";
import { useTranslation } from "next-i18next";
import Image from "next/image";

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
                image="/images/people/clint.webp"
                phone="078 944 90 95"
              />
              <ContactCard
                name="Marina"
                image="/images/people/marina.webp"
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
              <Image
                src="/images/logo/color.webp"
                alt="Dineysos Logo"
                width={500}
                height={179}
                className={styles.logoImage}
              />
            </div>

            <div className={styles.qrCodes}>
              <QRCodeLink
                href="https://www.instagram.com/dineysos/#"
                src="/images/icons/qr/instagram.webp"
                alt="Instagram QR"
              />
              <QRCodeLink
                href="https://www.linkedin.com/company/dineysos/posts/?feedView=all"
                src="/images/icons/qr/linkedin.webp"
                alt="LinkedIn QR"
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
      <Image
        src={image}
        alt={name}
        width={100}
        height={100}
        className={styles.cardImage}
      />
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
}: {
  href: string;
  src: string;
  alt: string;
}) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      <Image
        src={src}
        alt={alt}
        width={100}
        height={100}
        className={styles.qrCode}
      />
    </a>
  );
}
