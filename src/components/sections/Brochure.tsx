import styles from "@/styles/sections/Brochure.module.css";
import { useState } from "react";
import { useTranslation } from "next-i18next";
import { useRouter } from 'next/router';

export default function Brochure() {
  const [email, setEmail] = useState("");
  const [wantsUpdates, setWantsUpdates] = useState(true);
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const { t } = useTranslation("common");
  const { locale } = useRouter();


  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
  
    try {
      const saveRes = await fetch("/api/saveEmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, wantsUpdates, language: locale }),
      });
  
      if (!saveRes.ok) throw new Error("Failed to save email");
  
      const { id } = await saveRes.json();
  
      const sendRes = await fetch("/api/sendBrochure", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
  
      if (!sendRes.ok) throw new Error("Failed to send brochure");
  
      await fetch("/api/updateEmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
  
      setStatus("success");
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  }

  return (
    <section className={styles.brochure} id="brochure">
      <div className="base-container">
        <h2>{t("brochure.heading")}</h2>
        <p>{t("brochure.text")}</p>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formRow}>
            <input
              type="email"
              placeholder={t("brochure.email")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={styles.input}
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className={styles.button}
            >
              {status === "loading"
                ? t("brochure.sending")
                : t("brochure.getBrochure")}
            </button>
          </div>

          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={wantsUpdates}
              onChange={() => setWantsUpdates(!wantsUpdates)}
            />
            {t("brochure.updates")}
          </label>

          {status === "success" && (
            <p className={`${styles.statusMessage} ${styles.success}`}>
              {t("brochure.success")}
            </p>
          )}
          {status === "error" && (
            <p className={`${styles.statusMessage} ${styles.error}`}>
              {t("brochure.error")}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
