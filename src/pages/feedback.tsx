import { useState } from "react";
import styles from "@/styles/Feedback.module.css";
import { useTranslation } from "next-i18next";
import SeoHead from "@/components/layout/Head";
import { seoConfig } from "@/config/seo";
import { GetStaticPropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function FeedbackPage() {
  const { t } = useTranslation("common");

  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [hover, setHover] = useState<number | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await fetch("/api/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rating, comment }),
    });
    setSubmitted(true);
  }

  if (submitted)
    return (
      <>
        <SeoHead
          title={seoConfig.feedback.title}
          description={seoConfig.feedback.description}
        />
        <div className="base-container">
          <div className={styles.page}>
            <p>Thank you for your feedback!</p>
            <div className={styles.empty} />
          </div>
        </div>
      </>
    );

  return (
    <>
      <SeoHead
        title={seoConfig.feedback.title}
        description={seoConfig.feedback.description}
      />
      <div className="base-container">
        <div className={styles.page}>
          <h2>{t("feedback.title")}</h2>
          <p>{t("feedback.description")}</p>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.stars}>
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHover(star)}
                  onMouseLeave={() => setHover(null)}
                  className={styles.starButton}
                  style={{
                    color: (hover ?? rating) >= star ? "var(--orange)" : "var(--blue)",
                  }}
                >
                  ★
                </button>
              ))}
            </div>
            <textarea
              placeholder={t("feedback.commentPlaceholder")}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className={styles.textarea}
            />
            <button type="submit" className={styles.submitButton} disabled={rating === 0}>
              {t("feedback.submitButton")}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "de", ["common"])),
    },
  };
}
