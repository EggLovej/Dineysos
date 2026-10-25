import Image, { getImageProps } from "next/image";

import styles from "@/styles/sections/Hero.module.css";

const MOBILE_MEDIA_QUERY = "(max-width: 767px)";

export default function Hero() {
  // Art direction: let the browser pick the hero variant from a <picture> element so
  // mobile visitors get the vertical image in the server-rendered HTML instead of
  // downloading the desktop image first and swapping after hydration.
  const shared = { alt: "Hero", priority: true, sizes: "100vw", className: styles.image };
  const {
    props: { srcSet: mobileSrcSet },
  } = getImageProps({
    ...shared,
    src: "/images/large/hero_vertical.webp",
    width: 350,
    height: 480,
  });
  const { props: desktopProps } = getImageProps({
    ...shared,
    src: "/images/large/hero_horizontal.webp",
    width: 1600,
    height: 492,
  });

  return (
    <section className={styles.hero} id="hero">
      <div className="base-container">
        <div className={styles.content}>
          <Image
            alt="Dineysos Logo"
            className={styles.logo}
            height={179}
            src="/images/logo/logo.webp"
            width={500}
          />

          <div className={styles.imageWrapper}>
            <picture className={styles.picture}>
              <source media={MOBILE_MEDIA_QUERY} srcSet={mobileSrcSet} />
              <img {...desktopProps} alt={desktopProps.alt} fetchPriority="high" />
            </picture>
          </div>
          <h1>WINES, GAMES, EVENTS</h1>
        </div>
      </div>
    </section>
  );
}
