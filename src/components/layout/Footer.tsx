import Image from "next/image";

import styles from "@/styles/layout/Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <div className={styles.left}>
          <Image
            alt="Dineysos Logo"
            className={styles.logo}
            height={179}
            src="/images/logo/color.webp"
            width={500}
          />

          <p>© 2025 Dineysos Wine & Dine Events</p>
        </div>

        <div className={styles.right}>
          <a
            data-platform="Instagram"
            href="https://www.instagram.com/dineysos/"
            rel="noopener noreferrer"
            target="_blank"
          >
            <Image
              alt="Instagram"
              className={styles.icon}
              height={24}
              src="/images/svg/instagram.svg"
              width={24}
            />
          </a>
          <a
            data-platform="LinkedIn"
            href="https://www.linkedin.com/company/dineysos/posts/?feedView=all"
            rel="noopener noreferrer"
            target="_blank"
          >
            <Image
              alt="LinkedIn"
              className={styles.icon}
              height={24}
              src="/images/svg/linkedin.svg"
              width={24}
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
