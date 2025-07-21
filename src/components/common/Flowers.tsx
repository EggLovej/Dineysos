import styles from "@/styles/Helper.module.css";

type FlowersRatingProps = {
  count: number;
};

export function FlowersRatingDesktop({ count }: FlowersRatingProps) {
  return (
    <span className={styles.flowersDesktop}>
      {Array.from({ length: count }, (_, i) => (
        <img
          key={i}
          src="/images/icons/flower.png"
          alt="Flower icon"
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
        <img
          key={i}
          src="/images/icons/flower.png"
          alt="Flower icon"
          className={styles.flower}
        />
      ))}
    </span>
  );
}
