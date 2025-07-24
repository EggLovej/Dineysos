import styles from "@/styles/Helper.module.css";
import Image from "next/image";

type GlassesRatingProps = {
  count: number;
};

export default function GlassesRating({ count }: GlassesRatingProps) {
  return (
    <div className={styles.glasses}>
      {Array.from({ length: count }, (_, i) => (
        <Image
          key={i}
          src="/images/icons/glass.webp"
          alt="Glass icon"
          width={13}
          height={24}
          className={styles.glass}
        />
      ))}
    </div>
  );
}
