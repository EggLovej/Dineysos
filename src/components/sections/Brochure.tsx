import { useRouter } from "next/router";
import Script from "next/script";
import { useTranslation } from "next-i18next";
import { useCallback, useEffect, useRef, useState } from "react";

import styles from "@/styles/sections/Brochure.module.css";

type TurnstileRenderOptions = {
  sitekey: string;
  callback: (token: string) => void;
  "expired-callback": () => void;
  "error-callback": () => void;
};

type Turnstile = {
  render: (container: HTMLElement, options: TurnstileRenderOptions) => string;
  reset: (widgetId?: string) => void;
};

declare global {
  interface Window {
    turnstile?: Turnstile;
  }
}

export default function Brochure() {
  const [email, setEmail] = useState("");
  const [wantsUpdates, setWantsUpdates] = useState(true);
  const [website, setWebsite] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const turnstileRef = useRef<HTMLDivElement>(null);
  const turnstileWidgetId = useRef<string | null>(null);
  const { t } = useTranslation("common");
  const { locale } = useRouter();
  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  const renderTurnstile = useCallback(() => {
    if (!turnstileSiteKey || !turnstileRef.current || !window.turnstile) return;
    if (turnstileWidgetId.current) return;

    turnstileWidgetId.current = window.turnstile.render(turnstileRef.current, {
      sitekey: turnstileSiteKey,
      callback: setTurnstileToken,
      "expired-callback": () => setTurnstileToken(""),
      "error-callback": () => setTurnstileToken(""),
    });
  }, [turnstileSiteKey]);

  useEffect(() => {
    renderTurnstile();
  }, [renderTurnstile]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("/api/requestBrochure", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          wantsUpdates,
          language: locale,
          turnstileToken,
          website,
        }),
      });

      if (!response.ok) throw new Error("Failed to request brochure");

      setStatus("success");
    } catch (error) {
      console.error(error);
      setTurnstileToken("");
      if (turnstileWidgetId.current) {
        window.turnstile?.reset(turnstileWidgetId.current);
      }
      setStatus("error");
    }
  }

  return (
    <section className={styles.brochure} id="brochure">
      <div className="base-container">
        {turnstileSiteKey && (
          <Script
            async
            defer
            src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
            strategy="afterInteractive"
            onLoad={renderTurnstile}
          />
        )}
        <h2>{t("brochure.heading")}</h2>
        <p>{t("brochure.text")}</p>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formRow}>
            <input
              required
              className={styles.input}
              placeholder={t("brochure.email")}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              className={styles.button}
              disabled={status === "loading" || Boolean(turnstileSiteKey && !turnstileToken)}
              type="submit"
            >
              {status === "loading" ? t("brochure.sending") : t("brochure.getBrochure")}
            </button>
          </div>
          <div aria-hidden="true" style={{ left: "-10000px", position: "absolute" }}>
            <label htmlFor="brochure-website">Website</label>
            <input
              autoComplete="off"
              id="brochure-website"
              name="website"
              tabIndex={-1}
              type="text"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />
          </div>
          {turnstileSiteKey && <div ref={turnstileRef} />}

          <label className={styles.checkboxLabel}>
            <input
              checked={wantsUpdates}
              type="checkbox"
              onChange={() => setWantsUpdates(!wantsUpdates)}
            />
            {t("brochure.updates")}
          </label>

          {status === "success" && (
            <p className={`${styles.statusMessage} ${styles.success}`}>{t("brochure.success")}</p>
          )}
          {status === "error" && (
            <p className={`${styles.statusMessage} ${styles.error}`}>{t("brochure.error")}</p>
          )}
        </form>
      </div>
    </section>
  );
}
