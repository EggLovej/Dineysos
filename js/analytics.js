import { getLang } from "/js/lang.js";

function safeTrack(eventName, params) {
  if (typeof gtag === "function") {
    gtag("event", eventName, params);
  } else {
    console.warn("gtag is not defined; event skipped:", eventName, params);
  }
}

export function trackBrochureDownload() {
  const lang = getLang();
  safeTrack("download_brochure", {
    event_category: "Downloads",
    event_label: `Brochure_${lang}`,
    language: lang,
    value: 1,
  });
}

export function trackEmailClick() {
  safeTrack("contact_email", {
    event_category: "Contact",
    event_label: "Email Click",
    language: getLang(),
    value: 1,
  });
}

export function trackPhoneClick(person) {
  safeTrack("contact_phone", {
    event_category: "Contact",
    event_label: `Phone Click - ${person}`,
    language: getLang(),
    value: 1,
  });
}

export function trackSocialClick(platform) {
  safeTrack("contact_social", {
    event_category: "Social",
    event_label: platform,
    language: getLang(),
    value: 1,
  });
}

export function injectGoogleAnalytics() {
  const GA_ID = "{{GA_MEASUREMENT_ID}}"; // Replace at build time
  if (!GA_ID.includes("{{") && GA_ID.startsWith("G-")) {
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag() {
      dataLayer.push(arguments);
    }
    gtag("js", new Date());
    gtag("config", GA_ID);
  }
}