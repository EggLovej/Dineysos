import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState, useEffect, useRef, useCallback } from "react";

import styles from "@/styles/ui/Modal.module.css";

type ModalProps = {
  isMobile: boolean;
  open: boolean;
  onClose: () => void;
  baseName: string;
};

const TOTAL_IMAGES = 2;
const FOCUSABLE = 'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])';

export default function Modal({ isMobile, open, onClose, baseName }: ModalProps) {
  const [index, setIndex] = useState(0);
  const { locale } = useRouter();
  const lang = locale?.toLowerCase() === "en" ? "en" : "de";
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const showPrevious = useCallback(() => setIndex((i) => Math.max(0, i - 1)), []);
  const showNext = useCallback(() => setIndex((i) => Math.min(TOTAL_IMAGES - 1, i + 1)), []);

  useEffect(() => {
    if (open) setIndex(0);
  }, [open, baseName]);

  // Keyboard handling, initial focus and focus restoration while the dialog is open.
  useEffect(() => {
    if (!open) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key === "ArrowLeft") {
        showPrevious();
        return;
      }
      if (event.key === "ArrowRight") {
        showNext();
        return;
      }
      if (event.key === "Tab" && dialogRef.current) {
        // Trap focus inside the dialog.
        const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE));
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      previouslyFocused?.focus();
    };
  }, [open, onClose, showPrevious, showNext]);

  if (!open) return null;

  const imagePath = (i: number) =>
    isMobile
      ? `/images/large/modal/mobile/${lang}/${baseName}${i + 1}.webp`
      : `/images/large/modal/desktop/${lang}/${baseName}${i + 1}.webp`;

  const labels =
    lang === "de"
      ? {
          dialog: "Konzept-Details",
          close: "Schliessen",
          previous: "Vorheriges Bild",
          next: "Nächstes Bild",
        }
      : {
          dialog: "Concept details",
          close: "Close",
          previous: "Previous image",
          next: "Next image",
        };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        aria-label={labels.dialog}
        aria-modal="true"
        className={styles.modal}
        ref={dialogRef}
        role="dialog"
        onClick={(e) => e.stopPropagation()}
      >
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={index}
            animate={{ opacity: 1, x: 0 }}
            className={styles.imageWrapper}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            exit={{ opacity: 0, x: -50 }}
            initial={{ opacity: 0, x: 50 }}
            style={{ touchAction: "pan-y pinch-zoom" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onDragEnd={(e, info) => {
              const velocity = info.velocity.x;
              const offset = info.offset.x;

              // Require both sufficient offset and speed
              if (offset < -100 && velocity < -100) {
                showNext();
              } else if (offset > 100 && velocity > 100) {
                showPrevious();
              }
            }}
          >
            <button
              aria-label={labels.close}
              className={styles.closeButton}
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
            >
              <Image
                alt=""
                height={isMobile ? 16 : 24}
                src="/images/icons/orangex.webp"
                width={isMobile ? 16 : 24}
              />
            </button>

            <Image
              fill
              alt={`${baseName} ${index + 1}/${TOTAL_IMAGES}`}
              className={styles.image}
              draggable={false}
              src={imagePath(index)}
            />

            {/* Navigation Arrows */}
            {index > 0 && (
              <button
                aria-label={labels.previous}
                className={`${styles.arrow} ${styles.left}`}
                type="button"
                onClick={showPrevious}
              >
                ◀
              </button>
            )}
            {index < TOTAL_IMAGES - 1 && (
              <button
                aria-label={labels.next}
                className={`${styles.arrow} ${styles.right}`}
                type="button"
                onClick={showNext}
              >
                ▶
              </button>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Dot Indicator */}
        <div aria-hidden="true" className={styles.dots}>
          {Array.from({ length: TOTAL_IMAGES }).map((_, i) => (
            <span key={i} className={i === index ? styles.activeDot : styles.dot} />
          ))}
        </div>
      </div>
    </div>
  );
}
