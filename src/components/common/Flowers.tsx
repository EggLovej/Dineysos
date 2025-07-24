import styles from "@/styles/Helper.module.css";
import Image from "next/image";

type FlowersRatingProps = {
  count: number;
};

export function FlowersRatingDesktop({ count }: FlowersRatingProps) {
  return (
    <span className={styles.flowersDesktop}>
      {Array.from({ length: count }, (_, i) => (
        <Image
          key={i}
          src="/images/icons/flower.webp"
          alt="Flower icon"
          width={24}
          height={24}
          className={styles.flower}
        />
      ))}
    </span>
  );
}

export function FlowersRatingMobile({ count }: FlowersRatingProps) {
  return (
    <span className={styles.flowersMobile}>
      {Array.from({ length: count }, (_, i) => (
        <Image
          key={i}
          src="/images/icons/flower.webp"
          alt="Flower icon"
          width={16}
          height={16}
          className={styles.flower}
        />
      ))}
    </span>
  );
}

export function FlowerSeparator({ count = 3, className = "" }) {
  return (
    <div className={`${styles.separator} ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <img
          key={i}
          src="/images/icons/flower.webp"
          width={16}
          height={16}
          alt="Flower"
          className={styles.flower}
        />
      ))}
    </div>
  );
}