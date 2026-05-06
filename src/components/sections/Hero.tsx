import Image from "next/image";

import useIsMobile from "@/hooks/useIsMobile";
import styles from "@/styles/sections/Hero.module.css";

export default function Hero() {
  const isMobile = useIsMobile();

  return (
    <section className={styles.hero} id="hero">
      <div className="base-container">
        <div className={styles.content}>
          <Image
            alt="Dineysos Logo"
            className={styles.logo}
            height={179}
            src="/images/logo/color.webp"
            width={500}
          />

          <div className={styles.imageWrapper}>
            <Image
              priority
              alt="Hero"
              className={styles.image}
              height={isMobile ? 480 : 492}
              width={isMobile ? 350 : 1600}
              src={
                isMobile ? "/images/large/hero_vertical.webp" : "/images/large/hero_horizontal.webp"
              }
            />
          </div>
          <h1>WINES, GAMES, EVENTS</h1>
        </div>
      </div>
    </section>
  );
}
