import styles from "@/styles/sections/Gallery.module.css";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import Image from "next/image";
import { Lightbox, SlideImage } from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

import { useState, useEffect } from "react";
import { GalleryImage } from "@/types/galleryImage";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

type GalleryProps = {
  images: GalleryImage[];
};

type CustomSlide = SlideImage & {
  description?: string;
};

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < breakpoint);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [breakpoint]);

  return isMobile;
}

export default function Gallery({ images }: GalleryProps) {
  const { t } = useTranslation("common");
  const { locale } = useRouter();
  const [index, setIndex] = useState<number>(-1);
  const isMobile = useIsMobile();
  const baseHeight = isMobile ? 200 : 300;
  if (!images.length) {
    return (
      <section className={styles.gallery}>
        <div className="base-container">
          <p>{t("gallery.noImages")}</p>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.gallery}>
      <div className="base-container">
        <h2>{t("gallery.heading")}</h2>
        <div className={styles.galleryWrapper}>
          <Splide
            className={styles.splide}
            options={{
              type: "loop",
              gap: "1rem",
              focus: "center",
              autoWidth: true,
              drag: "free",
              snap: true,
              breakpoints: {
                768: { height: "200px" },
              },
            }}
          >
            {images.map((img, i) => (
              <SplideSlide
                key={img._id}
                className={styles.slide}
                style={{ width: `${(img.width / img.height) * baseHeight}px` }}
                onClick={() => setIndex(i)}
              >
                <div
                  className={styles.imageContainer}
                  style={{
                    width: `${(img.width / img.height) * baseHeight}px`,
                    height: `${baseHeight}px`,
                  }}
                >
                  <Image
                    src={img.imageUrl}
                    alt={
                      img.description?.[locale as "de" | "en"] ??
                      "Gallery Image"
                    }
                    width={(img.width / img.height) * baseHeight}
                    height={baseHeight}
                    style={{ objectFit: "contain" }}
                  />
                </div>
              </SplideSlide>
            ))}
          </Splide>
          <div className={styles.gradientLeft} />
          <div className={styles.gradientRight} />
        </div>

        <Lightbox
          open={index >= 0}
          index={index}
          close={() => setIndex(-1)}
          styles={{
            container: { backgroundColor: "rgba(50, 50, 50, 0.85)" },
          }}
          controller={{ closeOnBackdropClick: true }}
          slides={
            images.map((img) => ({
              src: img.imageUrl,
              alt: img.description?.[locale as "de" | "en"] ?? "",
              description: img.description?.[locale as "de" | "en"] ?? "",
            })) as CustomSlide[]
          }
          render={{
            slide: ({ slide }) => {
              const customSlide = slide as CustomSlide;
              return (
                <div className={styles.lightboxSlide}>
                  <img
                    src={customSlide.src}
                    alt={customSlide.alt}
                    className={styles.lightboxImage}
                  />
                  {customSlide.description && (
                    <div className={styles.lightboxDescription}>
                      <p>{customSlide.description}</p>
                    </div>
                  )}
                </div>
              );
            },
          }}
        />
      </div>
    </section>
  );
}
