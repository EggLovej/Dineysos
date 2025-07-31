import Image from "next/image";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

import styles from "@/styles/ui/Modal.module.css";

type ModalProps = {
  isMobile: boolean;
  open: boolean;
  onClose: () => void;
  baseName: string;
};

export default function Modal({ isMobile, open, onClose, baseName }: ModalProps) {
  const [index, setIndex] = useState(0);
  const { locale } = useRouter();
  const lang = locale?.toLowerCase() === "en" ? "en" : "de";
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);

  useEffect(() => {
    if (open) setIndex(0); // Reset to first image on open
  }, [open, baseName]);

  if (!open) return null;

  const totalImages = 2;
  const imagePath = isMobile
    ? `/images/large/modal/mobile/${lang}/${baseName}${index + 1}.png`
    : `/images/large/modal/desktop/${lang}/${baseName}${index + 1}.webp`;

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.changedTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStartX === null || touchEndX === null) return;

    const deltaX = touchStartX - touchEndX;

    if (deltaX > 50 && index < totalImages - 1) {
      setIndex(index + 1); // swipe left → next image
    } else if (deltaX < -50 && index > 0) {
      setIndex(index - 1); // swipe right → previous image
    }

    // Reset
    setTouchStartX(null);
    setTouchEndX(null);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.changedTouches[0].clientX);
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {isMobile ? (
          <div
            className={styles.imageWrapper}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {" "}
            <button className={styles.closeButton} onClick={onClose}>
              <Image alt="Close modal" height={16} width={16} src="/images/icons/orangex.webp" />
            </button>
            <Image
              alt={`Modal ${baseName} ${index + 1}`}
              className={styles.image}
              fill
              src={imagePath}
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
          </div>
        ) : (
          <div
            className={styles.imageWrapper}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {" "}
            <button className={styles.closeButton} onClick={onClose}>
              <Image alt="Close modal" height={24} width={24} src="/images/icons/orangex.webp" />
            </button>
            <Image
              alt={`Modal ${baseName} ${index + 1}`}
              className={styles.image}
              fill
              src={imagePath}
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
          </div>
        )}

        {/* Dot Indicator */}
        <div className={styles.dots}>
          {Array.from({ length: totalImages }).map((_, i) => (
            <span key={i} className={i === index ? styles.activeDot : styles.dot} />
          ))}
        </div>
      </div>
    </div>
  );
}
