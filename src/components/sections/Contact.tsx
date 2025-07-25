import Image from "next/image";
import { useTranslation } from "next-i18next";

import styles from "@/styles/sections/Contact.module.css";

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
                <a className={styles.email} data-track="email" href="mailto:info@dineysos.com">
                  info@dineysos.com
                </a>
              </p>
              <p>{t("contact.left.message3")}</p>
            </div>

            <div className={styles.cards}>
              <ContactCard image="/images/people/clint.webp" name="Clint" phone="078 944 90 95" />
              <ContactCard image="/images/people/marina.webp" name="Marina" phone="079 832 24 36" />
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
                alt="Dineysos Logo"
                className={styles.logoImage}
                height={179}
                src="/images/logo/color.webp"
                width={500}
              />
            </div>

            <div className={styles.qrCodes}>
              <QRCodeLink
                alt="Instagram QR"
                href="https://www.instagram.com/dineysos/#"
                src="/images/icons/qr/instagram.webp"
              />
              <QRCodeLink
                alt="LinkedIn QR"
                href="https://www.linkedin.com/company/dineysos/posts/?feedView=all"
                src="/images/icons/qr/linkedin.webp"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactCard({ name, image, phone }: { name: string; image: string; phone: string }) {
  return (
    <div className={styles.card}>
      <Image alt={name} className={styles.cardImage} height={100} src={image} width={100} />
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

function QRCodeLink({ href, src, alt }: { href: string; src: string; alt: string }) {
  return (
    <a href={href} rel="noopener noreferrer" target="_blank">
      <Image alt={alt} className={styles.qrCode} height={100} src={src} width={100} />
    </a>
  );
}
