import { GetStaticPropsContext } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useState } from "react";

import SeoHead from "@/components/layout/Head";
import { seoConfig } from "@/config/seo";
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
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [justReachedFinalStep, setJustReachedFinalStep] = useState<boolean>(false);

  const questions = [
    { key: "overall", rating: overallRating, setRating: setOverallRating, hover: overallHover, setHover: setOverallHover },
    { key: "instructions", rating: instructionsRating, setRating: setInstructionsRating, hover: instructionsHover, setHover: setInstructionsHover },
    { key: "alcohol", rating: alcoholRating, setRating: setAlcoholRating, hover: alcoholHover, setHover: setAlcoholHover },
    { key: "wineSelection", rating: wineSelectionRating, setRating: setWineSelectionRating, hover: wineSelectionHover, setHover: setWineSelectionHover },
    { key: "learning", rating: learningRating, setRating: setLearningRating, hover: learningHover, setHover: setLearningHover },
    { key: "difficulty", rating: difficultyRating, setRating: setDifficultyRating, hover: difficultyHover, setHover: setDifficultyHover },
    { key: "playAgain", rating: playAgainRating, setRating: setPlayAgainRating, hover: playAgainHover, setHover: setPlayAgainHover },
  ];

  const handleNext = () => {
    if (currentStep < questions.length) {
      const newStep = currentStep + 1;
      setCurrentStep(newStep);
      
      // If we're reaching the final step, add a safety delay
      if (newStep === questions.length) {
        setJustReachedFinalStep(true);
        setTimeout(() => {
          setJustReachedFinalStep(false);
        }, 1000); // 1 second delay before submit button becomes active
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setJustReachedFinalStep(false); // Reset the safety delay if going back
    }
  };

  const handleRatingAndNext = (rating: number) => {
    const currentQuestion = questions[currentStep];
    currentQuestion.setRating(rating);
    // Auto-advance after a short delay to show the selection
    setTimeout(() => {
      handleNext();
    }, 300);
  };

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
      timestamp: new Date().toISOString()
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

  const isFormValid = overallRating > 0 || instructionsRating > 0 || alcoholRating > 0 || 
                     wineSelectionRating > 0 || learningRating > 0 || difficultyRating > 0 || 
                     playAgainRating > 0 || additionalFeedback.trim().length > 0;

  if (submitted) {
    return (
      <>
        <SeoHead 
          description={{
            de: "Vielen Dank für Ihr Sip & Solve Feedback!",
            en: "Thank you for your Sip & Solve feedback!"
          }}
          title={{
            de: "Feedback gesendet - Dineysos",
            en: "Feedback Submitted - Dineysos"
          }}
        />
        <div className="base-container">
          <div className={styles.page}>
            <div className={styles.successCard}>
              <div className={styles.thankYouHeader}>
                <img 
                  src="/images/icons/Cheers.webp" 
                  alt="Cheers" 
                  className={styles.cheersIcon}
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
    setHover
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
                <img
                  src={(hover ?? rating) >= star ? "/images/icons/flower.webp" : "/images/icons/flower_empty.webp"}
                  alt={`Rating ${star}`}
                  className={styles.flowerIcon}
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
          en: "Share your Sip & Solve wine game experience with us"
        }}
        title={{
          de: "Sip & Solve Feedback - Dineysos",
          en: "Sip & Solve Feedback - Dineysos"
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
              questionKey="overall"
              rating={overallRating}
              setRating={setOverallRating}
              hover={overallHover}
              setHover={setOverallHover}
            />

            <RatingQuestion
              questionKey="instructions"
              rating={instructionsRating}
              setRating={setInstructionsRating}
              hover={instructionsHover}
              setHover={setInstructionsHover}
            />

            <RatingQuestion
              questionKey="alcohol"
              rating={alcoholRating}
              setRating={setAlcoholRating}
              hover={alcoholHover}
              setHover={setAlcoholHover}
            />

            <RatingQuestion
              questionKey="wineSelection"
              rating={wineSelectionRating}
              setRating={setWineSelectionRating}
              hover={wineSelectionHover}
              setHover={setWineSelectionHover}
            />

            <RatingQuestion
              questionKey="learning"
              rating={learningRating}
              setRating={setLearningRating}
              hover={learningHover}
              setHover={setLearningHover}
            />

            <RatingQuestion
              questionKey="difficulty"
              rating={difficultyRating}
              setRating={setDifficultyRating}
              hover={difficultyHover}
              setHover={setDifficultyHover}
            />

            <RatingQuestion
              questionKey="playAgain"
              rating={playAgainRating}
              setRating={setPlayAgainRating}
              hover={playAgainHover}
              setHover={setPlayAgainHover}
            />

            {/* Additional Feedback */}
            <div className={styles.questionGroup}>
              <label className={styles.questionLabel}>
                {t("feedback.sipSolve.questions.additional.label")}
              </label>
              <textarea
                className={styles.textarea}
                placeholder={t("feedback.sipSolve.questions.additional.placeholder")}
                value={additionalFeedback}
                onChange={(e) => setAdditionalFeedback(e.target.value)}
                rows={4}
              />
            </div>

            <button 
              className={styles.submitButton} 
              disabled={!isFormValid} 
              type="submit"
            >
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
