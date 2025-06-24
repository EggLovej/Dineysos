import { loadLanguage, getLang } from "/js/lang.js";

export function initNavbar() {
  const logo = document.querySelector(".logo");
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".nav-links");
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll("nav a");
  const langToggle = document.getElementById("current-lang");
  const langMenu = document.getElementById("lang-menu");

  if (!logo || !toggle || !nav || !langToggle || !langMenu) return;

  // Logo shrink + active section highlight
  window.addEventListener("scroll", () => {
    // Shrink logo
    logo.classList.toggle("shrink", window.scrollY > 50);

    // Highlight nav link
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop - sectionHeight / 3) {
        current = section.getAttribute("id");
      }
    });
    const currentPath = window.location.pathname;
    navLinks.forEach((link) => {
      link.classList.remove("active");

      const href = link.getAttribute("href");
      const normalizedHref = href?.split("#")[1];
      const sectionMatch = normalizedHref === current;
      const pageMatch =
        href && href.endsWith(".html") && currentPath.endsWith(href);

      if (sectionMatch || pageMatch) {
        link.classList.add("active");
      }
    });
  });

  // Hamburger menu toggle
  toggle.addEventListener("click", (event) => {
    nav.classList.toggle("active");
    event.stopPropagation();
  });

  document.addEventListener("click", (event) => {
    const isClickInsideToggle = toggle.contains(event.target);
    const isClickInsideNav = nav.contains(event.target);
    if (!isClickInsideToggle && !isClickInsideNav) {
      nav.classList.remove("active");
    }
    langMenu.style.display = "none";
  });

  // Language toggle dropdown
  langToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    langMenu.style.display =
      langMenu.style.display === "block" ? "none" : "block";
  });

  // Language selection buttons
  document.querySelectorAll(".lang-option").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const lang = btn.getAttribute("data-lang");
      await loadLanguage(lang);
      langMenu.style.display = "none";
      langToggle.textContent = lang.toUpperCase();
    });
  });

  // Set language on page load (optional, could be in main.js only)
  const savedLang = getLang();
  langToggle.textContent = savedLang.toUpperCase();
  // Run once on page load (in case no scroll happens
  window.dispatchEvent(new Event("scroll"));
}
