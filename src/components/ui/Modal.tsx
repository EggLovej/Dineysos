import Image from "next/image";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

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

  useEffect(() => {
    if (open) setIndex(0);
  }, [open, baseName]);

  if (!open) return null;

  const totalImages = 2;
  const imagePath = (i: number) =>
    isMobile
      ? `/images/large/modal/mobile/${lang}/${baseName}${i + 1}.png`
      : `/images/large/modal/desktop/${lang}/${baseName}${i + 1}.webp`;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={index}
            className={styles.imageWrapper}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(e, info) => {
              if (info.offset.x < -100 && index < totalImages - 1) {
                setIndex(index + 1);
              } else if (info.offset.x > 100 && index > 0) {
                setIndex(index - 1);
              }
            }}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <button className={styles.closeButton} onClick={onClose}>
              <Image
                alt="Close modal"
                height={isMobile ? 16 : 24}
                width={isMobile ? 16 : 24}
                src="/images/icons/orangex.webp"
              />
            </button>

            <Image
              alt={`Modal ${baseName} ${index + 1}`}
              className={styles.image}
              fill
              src={imagePath(index)}
              draggable={false}
            />

            {/* Navigation Arrows */}
            {index > 0 && (
              <button className={`${styles.arrow} ${styles.left}`} onClick={() => setIndex(index - 1)}>
                ◀
              </button>
            )}
            {index < totalImages - 1 && (
              <button className={`${styles.arrow} ${styles.right}`} onClick={() => setIndex(index + 1)}>
                ▶
              </button>
            )}
          </motion.div>
        </AnimatePresence>

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