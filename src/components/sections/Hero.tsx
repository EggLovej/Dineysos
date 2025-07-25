import Image from "next/image";
import { useEffect, useState } from "react";

import styles from "@/styles/sections/Hero.module.css";

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
              height={isMobile ? 480 : 353}
              width={isMobile ? 350 : 1148}
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
