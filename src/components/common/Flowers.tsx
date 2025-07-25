import Image from "next/image";

import styles from "@/styles/Helper.module.css";

type FlowersRatingProps = {
  count: number;
};

export function FlowersRatingDesktop({ count }: FlowersRatingProps) {
  return (
    <span className={styles.flowersDesktop}>
      {Array.from({ length: count }, (_, i) => (
        <Image
          key={i}
          alt="Flower icon"
          className={styles.flower}
          height={24}
          src="/images/icons/flower.webp"
          width={24}
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
          alt="Flower icon"
          className={styles.flower}
          height={16}
          src="/images/icons/flower.webp"
          width={16}
        />
      ))}
    </span>
  );
}

export function FlowerSeparator({ count = 3, className = "" }) {
  return (
    <div className={`${styles.separator} ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <Image
          key={i}
          alt="Flower"
          className={styles.flower}
          height={16}
          src="/images/icons/flower.webp"
          width={16}
        />
      ))}
    </div>
  );
}
