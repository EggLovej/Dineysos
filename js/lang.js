/**
 * Gets the current language from localStorage, defaulting to 'de'.
 */
export function getLang() {
  return (localStorage.getItem("language") || "de").toLowerCase();
}

/**
 * Loads a JSON translation file and updates all i18n-marked DOM elements.
 * Also updates the downloadable brochure link and size display.
 */
export async function loadLanguage(lang) {
  let translations = {};

  try {
    const res = await fetch(`lang/${lang}.json`);
    translations = await res.json();
  } catch (err) {
    console.error("Translation load error:", err);
    return;
  }

  // Apply translations to elements with [data-i18n]
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const keys = el.getAttribute("data-i18n").split(".");
    let text = translations;
    for (const key of keys) {
      text = text?.[key];
    }
    if (typeof text === "string") {
      el.textContent = text;
    }
  });

  // Save selected language
  localStorage.setItem("language", lang);

  // Update brochure link and size label
  await updateBrochureLink(lang);

  // Update elements with data-i18n-label (e.g., accordion headers with embedded flower count)
  document.querySelectorAll("[data-i18n-label]").forEach((el) => {
    const keys = el.getAttribute("data-i18n-label").split(".");
    let labelText = translations;
    for (const key of keys) {
      labelText = labelText?.[key];
    }
    if (typeof labelText === "string") {
      el.setAttribute("data-label", labelText);
    }
  });
}

/**
 * Updates the download link and file size for the brochure PDF,
 * depending on selected language.
 */
async function updateBrochureLink(lang) {
  const brochureLink = document.getElementById("brochure-link");
  const brochureSize = document.getElementById("brochure-size");

  if (!brochureLink || !brochureSize) return;

  const href =
    lang === "en"
      ? "docs/DineysosBrochureEN.pdf"
      : "docs/DineysosBroschüreDE.pdf";

  brochureLink.href = href;

  try {
    const res = await fetch(href, { method: "HEAD" });
    const size = res.headers.get("Content-Length");

    if (size) {
      const mb = (parseInt(size, 10) / (1024 * 1024)).toFixed(1);
      brochureSize.textContent = `(PDF, ${mb} MB)`;
    } else {
      brochureSize.textContent = `(PDF)`;
    }
  } catch (err) {
    console.warn("Could not fetch brochure size:", err);
    brochureSize.textContent = `(PDF)`;
  }
}