import Image from "next/image";

import styles from "@/styles/Helper.module.css";

type GlassesRatingProps = {
  count: number;
};

export default function GlassesRating({ count }: GlassesRatingProps) {
  return (
    <div className={styles.glasses}>
      {Array.from({ length: count }, (_, i) => (
        <Image
          key={i}
          alt="Glass icon"
          className={styles.glass}
          height={24}
          src="/images/icons/glass.webp"
          width={13}
        />
      ))}
    </div>
  );
}
