import styles from "@/styles/Helper.module.css";

type GlassesRatingProps = {
  count: number;
};

export default function GlassesRating({ count }: GlassesRatingProps) {
  return (
    <div className={styles.glasses}>
      {Array.from({ length: count }, (_, i) => (
        <img
          key={i}
          src="/images/icons/glass.png"
          alt="Glass icon"
          className={styles.glass}
        />
      ))}
    </div>
  );
}
