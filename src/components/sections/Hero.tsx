import styles from "@/styles/sections/Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero} id="hero">
      <div className="base-container">
        <div className={styles.content}>
          <img
            src="/images/logo/color.png"
            alt="Dineysos Logo"
            className={styles.logo}
          />

          <div className={styles.imageWrapper}>
            <picture>
              <source
                srcSet="/images/large/hero_vertical.png"
                media="(max-width: 768px)"
              />
              <img
                src="/images/large/hero_horizontal.png"
                alt="Hero"
                className={styles.image}
              />
            </picture>
          </div>
          <h1>WINES, GAMES, EVENTS</h1>
        </div>
      </div>
    </section>
  );
}
