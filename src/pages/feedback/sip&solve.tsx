import { GetStaticPropsContext } from "next";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useState } from "react";

import SeoHead from "@/components/layout/Head";
import styles from "@/styles/Feedback.module.css";

export default function SipSolveFeedbackPage() {
  const { t } = useTranslation("common");

  const [overallRating, setOverallRating] = useState<number>(0);
  const [instructionsRating, setInstructionsRating] = useState<number>(0);
  const [alcoholRating, setAlcoholRating] = useState<number>(0);
  const [wineSelectionRating, setWineSelectionRating] = useState<number>(0);
  const [learningRating, setLearningRating] = useState<number>(0);
  const [difficultyRating, setDifficultyRating] = useState<number>(0);
  const [playAgainRating, setPlayAgainRating] = useState<number>(0);
  const [additionalFeedback, setAdditionalFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const [overallHover, setOverallHover] = useState<number | null>(null);
  const [instructionsHover, setInstructionsHover] = useState<number | null>(null);
  const [alcoholHover, setAlcoholHover] = useState<number | null>(null);
  const [wineSelectionHover, setWineSelectionHover] = useState<number | null>(null);
  const [learningHover, setLearningHover] = useState<number | null>(null);
  const [difficultyHover, setDifficultyHover] = useState<number | null>(null);
  const [playAgainHover, setPlayAgainHover] = useState<number | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const feedbackData = {
      type: "sip-solve",
      ratings: {
        overall: overallRating,
        instructions: instructionsRating,
        alcohol: alcoholRating,
        wineSelection: wineSelectionRating,
        learning: learningRating,
        difficulty: difficultyRating,
        playAgain: playAgainRating,
      },
      additionalFeedback,
      timestamp: new Date().toISOString(),
    };

    try {
      await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(feedbackData),
      });
      setSubmitted(true);
    } catch (error) {
      console.error("Failed to submit feedback:", error);
    }
  }

  const isFormValid =
    overallRating > 0 ||
    instructionsRating > 0 ||
    alcoholRating > 0 ||
    wineSelectionRating > 0 ||
    learningRating > 0 ||
    difficultyRating > 0 ||
    playAgainRating > 0 ||
    additionalFeedback.trim().length > 0;

  if (submitted) {
    return (
      <>
        <SeoHead
          description={{
            de: "Vielen Dank für Ihr Sip & Solve Feedback!",
            en: "Thank you for your Sip & Solve feedback!",
          }}
          title={{
            de: "Feedback gesendet - Dineysos",
            en: "Feedback Submitted - Dineysos",
          }}
        />
        <div className="base-container">
          <div className={styles.page}>
            <div className={styles.successCard}>
              <div className={styles.thankYouHeader}>
                <Image
                  alt="Cheers"
                  className={styles.cheersIcon}
                  height={96}
                  src="/images/icons/Cheers.webp"
                  width={96}
                />
                <h2>{t("feedback.sipSolve.thankYou")}</h2>
              </div>
              <p>{t("feedback.sipSolve.thankYouMessage")}</p>
            </div>
            <div className={styles.empty} />
          </div>
        </div>
      </>
    );
  }

  const RatingQuestion = ({
    questionKey,
    rating,
    setRating,
    hover,
    setHover,
  }: {
    questionKey: string;
    rating: number;
    setRating: (value: number) => void;
    hover: number | null;
    setHover: (value: number | null) => void;
  }) => (
    <div className={styles.questionGroup}>
      <label className={styles.questionLabel}>
        {t(`feedback.sipSolve.questions.${questionKey}.label`)}
      </label>

      <div className={styles.ratingContainer}>
        <div className={styles.scaleRow}>
          <div className={styles.minLabel}>
            {t(`feedback.sipSolve.questions.${questionKey}.min`)}
          </div>

          <div className={styles.stars}>
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                className={styles.starButton}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(null)}
              >
                <Image
                  alt={`Rating ${star}`}
                  className={styles.flowerIcon}
                  height={56}
                  width={56}
                  src={
                    (hover ?? rating) >= star
                      ? "/images/icons/flower_high_res.webp"
                      : "/images/icons/flower_empty_high_res.webp"
                  }
                />
              </button>
            ))}
          </div>

          <div className={styles.maxLabel}>
            {t(`feedback.sipSolve.questions.${questionKey}.max`)}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <SeoHead
        description={{
          de: "Teilen Sie Ihre Sip & Solve Weinspiel-Erfahrung mit uns",
          en: "Share your Sip & Solve wine game experience with us",
        }}
        title={{
          de: "Sip & Solve Feedback - Dineysos",
          en: "Sip & Solve Feedback - Dineysos",
        }}
      />
      <div className="base-container">
        <div className={styles.page}>
          <div className={styles.header}>
            <h2>{t("feedback.sipSolve.title")}</h2>
            <p>{t("feedback.sipSolve.description")}</p>
          </div>

          <form className={styles.form} onSubmit={handleSubmit}>
            <RatingQuestion
              hover={overallHover}
              questionKey="overall"
              rating={overallRating}
              setHover={setOverallHover}
              setRating={setOverallRating}
            />

            <RatingQuestion
              hover={instructionsHover}
              questionKey="instructions"
              rating={instructionsRating}
              setHover={setInstructionsHover}
              setRating={setInstructionsRating}
            />

            <RatingQuestion
              hover={alcoholHover}
              questionKey="alcohol"
              rating={alcoholRating}
              setHover={setAlcoholHover}
              setRating={setAlcoholRating}
            />

            <RatingQuestion
              hover={wineSelectionHover}
              questionKey="wineSelection"
              rating={wineSelectionRating}
              setHover={setWineSelectionHover}
              setRating={setWineSelectionRating}
            />

            <RatingQuestion
              hover={learningHover}
              questionKey="learning"
              rating={learningRating}
              setHover={setLearningHover}
              setRating={setLearningRating}
            />

            <RatingQuestion
              hover={difficultyHover}
              questionKey="difficulty"
              rating={difficultyRating}
              setHover={setDifficultyHover}
              setRating={setDifficultyRating}
            />

            <RatingQuestion
              hover={playAgainHover}
              questionKey="playAgain"
              rating={playAgainRating}
              setHover={setPlayAgainHover}
              setRating={setPlayAgainRating}
            />

            {/* Additional Feedback */}
            <div className={styles.questionGroup}>
              <label className={styles.questionLabel}>
                {t("feedback.sipSolve.questions.additional.label")}
              </label>
              <textarea
                className={styles.textarea}
                placeholder={t("feedback.sipSolve.questions.additional.placeholder")}
                rows={4}
                value={additionalFeedback}
                onChange={(e) => setAdditionalFeedback(e.target.value)}
              />
            </div>

            <button className={styles.submitButton} disabled={!isFormValid} type="submit">
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
