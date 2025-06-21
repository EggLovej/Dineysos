import { getLang } from "./lang.js";

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