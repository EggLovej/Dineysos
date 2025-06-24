import { initNavbar } from "/js/navbar.js";
import { loadLanguage, getLang } from "/js/lang.js";
import { initGallery, moveGallery } from "/js/gallery.js";
import {
  renderFlowers,
  renderGlasses,
  renderFormatFlowers,
} from "/js/decorations.js";
import {
  openModal,
  slideModal,
  closeModal,
  handleBackdropClick,
} from "/js/modal.js";
import { initAccordion } from "/js/accordion.js";
import {
  trackBrochureDownload,
  trackEmailClick,
  trackPhoneClick,
  trackSocialClick,
  injectGoogleAnalytics,
} from "/js/analytics.js";
import { loadFooter, loadNavbar } from "/js/loadComponents.js";

// --- Bootstrap on DOM load ---
document.addEventListener("DOMContentLoaded", async () => {
  await loadFooter();
  await loadNavbar();
  initUI();
  await initLanguage();
  initDecorations();
  initGalleryControls();
  initModalControls();
  initTracking();

});

// --- UI Core Components ---
function initUI() {
  initNavbar();
  initAccordion();
  initGallery();
}

// --- Load i18n and set language button ---
async function initLanguage() {
  const lang = getLang();
  await loadLanguage(lang);
  const langButton = document.getElementById("current-lang");
  if (langButton) langButton.textContent = lang.toUpperCase();
}

// --- Decorative icons like glasses and flowers ---
function initDecorations() {
  renderFlowers();
  renderGlasses();
  renderFormatFlowers();
}

// --- Arrows and gallery interactivity ---
function initGalleryControls() {
  document.querySelector(".prev")?.addEventListener("click", () => {
    moveGallery(-1);
  });
  document.querySelector(".next")?.addEventListener("click", () => {
    moveGallery(1);
  });
}

// --- Modal carousel buttons, clicks, and open triggers ---
function initModalControls() {
  // Open buttons
  document.querySelectorAll("[data-concept]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const baseName = btn.getAttribute("data-concept");
      if (baseName) openModal(baseName);
    });
  });

  // Arrows & close
  document.getElementById("leftArrow")?.addEventListener("click", () =>
    slideModal(-1)
  );
  document.getElementById("rightArrow")?.addEventListener("click", () =>
    slideModal(1)
  );
  document.querySelector(".close")?.addEventListener("click", closeModal);
  document
    .getElementById("ConceptModal")
    ?.addEventListener("click", handleBackdropClick);
}

// --- Attach event tracking to relevant elements ---
function initTracking() {
  // Inject Google Analytics
  injectGoogleAnalytics();

  // Social platforms
  document.querySelectorAll("[data-platform]").forEach((el) => {
    const platform = el.getAttribute("data-platform");
    if (platform) {
      el.addEventListener("click", () => trackSocialClick(platform));
    }
  });

  // Email clicks
  document.querySelectorAll("[data-track='email']").forEach((el) => {
    el.addEventListener("click", () => trackEmailClick());
  });

  // Phone clicks
  document.querySelectorAll("[data-track='phone']").forEach((el) => {
    const person = el.getAttribute("data-person");
    if (person) {
      el.addEventListener("click", () => trackPhoneClick(person));
    }
  });

  // Brochure click
  document
    .querySelector("[data-track='brochure']")
    ?.addEventListener("click", () => trackBrochureDownload());
}