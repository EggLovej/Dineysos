import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "@/styles/ui/Modal.module.css";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  baseName: string;
};

export default function Modal({ open, onClose, baseName }: ModalProps) {
  const [index, setIndex] = useState(0);
  const { locale } = useRouter();
  const lang = locale?.toLowerCase() === "en" ? "en" : "de";

  useEffect(() => {
    if (open) setIndex(0); // Reset to first image on open
  }, [open, baseName]);

  if (!open) return null;

  const totalImages = 2;
  const imagePath = `/images/large/modal/desktop/${lang}/${baseName}${
    index + 1
  }.png`;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <img
          src={imagePath}
          alt={`Modal ${baseName} ${index + 1}`}
          className={styles.image}
        />

        {/* Navigation Arrows */}
        {index > 0 && (
          <button
            className={`${styles.arrow} ${styles.left}`}
            onClick={() => setIndex(index - 1)}
          >
            ◀
          </button>
        )}
        {index < totalImages - 1 && (
          <button
            className={`${styles.arrow} ${styles.right}`}
            onClick={() => setIndex(index + 1)}
          >
            ▶
          </button>
        )}

        {/* Dot Indicator */}
        <div className={styles.dots}>
          {Array.from({ length: totalImages }).map((_, i) => (
            <span
              key={i}
              className={i === index ? styles.activeDot : styles.dot}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
