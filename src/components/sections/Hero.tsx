import styles from "@/styles/sections/Hero.module.css";
import Image from "next/image";

import { useEffect, useState } from "react";

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= breakpoint);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [breakpoint]);

  return isMobile;
}

export default function Hero() {
    const isMobile = useIsMobile();

  return (
    <section className={styles.hero} id="hero">
      <div className="base-container">
        <div className={styles.content}>
          <Image
            src="/images/logo/color.webp"
            alt="Dineysos Logo"
            width={500}
            height={179}
            className={styles.logo}
          />

          <div className={styles.imageWrapper}>
            <Image
              src={
                isMobile
                  ? "/images/large/hero_vertical.webp"
                  : "/images/large/hero_horizontal.webp"
              }
              alt="Hero"
              width={isMobile ? 350 : 1148}
              height={isMobile ? 480 : 353}
              className={styles.image}
              priority
            />
          </div>
          <h1>WINES, GAMES, EVENTS</h1>
        </div>
      </div>
    </section>
  );
}
