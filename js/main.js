// Navbar logo shrink effect

const logo = document.querySelector(".logo");

window.addEventListener("scroll", () => {
  logo.classList.toggle("shrink", window.scrollY > 50);
});

// Change navbar to hamburger menu on mobile

document.addEventListener("DOMContentLoaded", function () {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".nav-links");

  toggle.addEventListener("click", (event) => {
    nav.classList.toggle("active");
    event.stopPropagation(); // prevent the click from bubbling to document
  });

  document.addEventListener("click", (event) => {
    const isClickInsideToggle = toggle.contains(event.target);
    const isClickInsideNav = nav.contains(event.target);

    if (!isClickInsideToggle && !isClickInsideNav) {
      nav.classList.remove("active");
    }
  });
});

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    if (scrollY >= sectionTop - sectionHeight / 3) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

// turn navlinks orange on hover
document.querySelectorAll("nav a").forEach((link) => {
  link.addEventListener("mouseover", () => {
    link.classList.add("hover");
  });
  link.addEventListener("mouseout", () => {
    link.classList.remove("hover");
  });
});

async function loadLanguage(lang) {
  let translations = {};

  try {
    const res = await fetch(`lang/${lang}.json`);
    translations = await res.json();

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const keys = el.getAttribute("data-i18n").split(".");
      let text = translations;
      for (const key of keys) {
        text = text?.[key];
      }
      if (text) el.textContent = text;
    });

    localStorage.setItem("language", lang);
  } catch (err) {
    console.error("Translation load error:", err);
    return;
  }
  await updateBrochureLink(lang);

  document.querySelectorAll("[data-i18n-label]").forEach((el) => {
    const keys = el.getAttribute("data-i18n-label").split(".");
    let labelText = translations;
    for (const key of keys) {
      labelText = labelText?.[key];
    }
    if (labelText) el.setAttribute("data-label", labelText);
  });
  renderFormatFlowers();
}

const langToggle = document.getElementById("current-lang");
const langMenu = document.getElementById("lang-menu");

langToggle.addEventListener("click", (e) => {
  e.stopPropagation();
  langMenu.style.display =
    langMenu.style.display === "block" ? "none" : "block";
});

// Click outside closes menu
document.addEventListener("click", () => {
  langMenu.style.display = "none";
});

// Language switch
document.querySelectorAll(".lang-option").forEach((btn) => {
  btn.addEventListener("click", async () => {
    const lang = btn.getAttribute("data-lang");
    await loadLanguage(lang);
    langMenu.style.display = "none";
    document.getElementById("current-lang").textContent = lang.toUpperCase();
  });
});

// Update current language button on load
document.addEventListener("DOMContentLoaded", async () => {
  const savedLang = localStorage.getItem("language") || "de";
  await loadLanguage(savedLang);
  document.getElementById("current-lang").textContent = savedLang.toUpperCase();
});

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
      const mb = (parseInt(size) / (1024 * 1024)).toFixed(1);
      brochureSize.textContent = `(PDF, ${mb} MB)`;
    } else {
      brochureSize.textContent = `(PDF)`;
    }
  } catch (err) {
    console.warn("Could not fetch brochure size:", err);
    brochureSize.textContent = `(PDF)`;
  }
}

// Gallery

const track = document.getElementById("gallery-track");
const totalImages = track.children.length;
let index = 1;
let isHovering = false;
let isLightboxOpen = false;
let autoScrollTimer;

function getImageBuffer() {
  return getVisibleCount() + 2; // add a couple extra for safety
}

function updateGalleryAlignment() {
  track.style.justifyContent = "flex-start"; // always
}

// Call this on load and on resize:
updateGalleryAlignment();
window.addEventListener("resize", updateGalleryAlignment);

// Determine how many images to show based on screen width
function getVisibleCount() {
  if (window.innerWidth < 768) return 1;
  if (window.innerWidth < 1200) return 2;
  return 4;
}

function getImageWidthPercent() {
  return 100 / getVisibleCount();
}

function getImageWidthPx() {
  const firstImage = track.querySelector("img");
  return firstImage?.getBoundingClientRect().width || 300; // fallback
}

function moveGallery(direction) {
  const imageWidth = getImageWidthPx();
  const visible = getVisibleCount();
  const buffer = getImageBuffer();

  index += direction;

  if (index >= totalImages - getVisibleCount() - getImageBuffer() + 5) {
    track.style.transition = "none";
    index = 1;
    track.style.transform = `translateX(-${index * imageWidth}px)`;
    void track.offsetWidth;
    track.style.transition = "transform 0.5s ease";
    index += direction;
  }

  if (index <= 0) {
    track.style.transition = "none";
    index = totalImages - visible - buffer;
    track.style.transform = `translateX(-${index * imageWidth}px)`;
    void track.offsetWidth;
    track.style.transition = "transform 0.5s ease";
    index -= 1;
  }

  track.style.transform = `translateX(-${index * imageWidth}px)`;
}

// Initial position
track.style.transform = `translateX(-${index * getImageWidthPercent()}%)`;

const images = document.querySelectorAll("#gallery-track img");

images.forEach((img) => {
  img.addEventListener("mouseenter", () => {
    isHovering = true;
  });
  img.addEventListener("mouseleave", () => {
    isHovering = false;
  });
});

// Auto scroll
function startAutoScroll() {
  autoScrollTimer = setTimeout(() => {
    if (!isHovering && !isLightboxOpen) {
      moveGallery(1);
    }
    startAutoScroll(); // 🔥 set up next auto-scroll
  }, 4000);
}

function resetAutoScroll() {
  clearTimeout(autoScrollTimer);
  startAutoScroll();
}

startAutoScroll();

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const galleryImages = document.querySelectorAll("#gallery-track img");

// Open lightbox when clicking an image
galleryImages.forEach((img) => {
  img.addEventListener("click", () => {
    lightboxImg.src = img.src;
    lightbox.style.display = "flex";
    setTimeout(() => {
      lightbox.style.opacity = "1";
    }, 10);

    isLightboxOpen = true;
    const scrollBarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${scrollBarWidth}px`; // compensate for missing scrollbar
  });
});

// Close lightbox when clicking outside the image
lightbox.addEventListener("click", (e) => {
  if (e.target !== lightboxImg) {
    lightbox.style.opacity = "0";
    setTimeout(() => {
      lightbox.style.display = "none";
    }, 300);

    isLightboxOpen = false;
    document.body.style.overflow = "auto";
    document.body.style.paddingRight = "0"; // remove the compensation
  }
});

// Modal

let currentSlide = 0;
let maxSlides = 2;

function openModal(baseName) {
  currentSlide = 0;
  let lang = localStorage.getItem("language") || "de";
  lang = lang.toUpperCase();

  const isMobile = window.innerWidth <= 768;
  const deviceType = isMobile ? "Mobile" : "Desktop";
  const imageCount = isMobile ? 4 : 2;
  maxSlides = imageCount;

  const carouselTrack = document.getElementById("carouselTrack");
  carouselTrack.innerHTML = ""; // clear previous slides

  for (let i = 1; i <= imageCount; i++) {
    const slide = document.createElement("div");
    slide.className = "slide";

    const img = document.createElement("img");
    img.className = "modal-image";
    img.src = `Images/Concepts/Modals/${deviceType}/${lang}/${baseName}${i}.png`;

    slide.appendChild(img);
    carouselTrack.appendChild(slide);
  }

  carouselTrack.style.transform = `translateX(0%)`;
  document.getElementById("ConceptModal").classList.add("show");

  currentSlide = 0;
  updateArrows(imageCount);
  createDots(imageCount);
  document.body.style.overflow = "hidden";
}

function slideModal(direction) {
  const track = document.getElementById("carouselTrack");

  currentSlide = Math.min(Math.max(currentSlide + direction, 0), maxSlides - 1);
  track.style.transform = `translateX(-${currentSlide * 100}%)`;

  updateArrows(maxSlides);
  updateDots();
}

function updateArrows(maxSlide) {
  document.getElementById("leftArrow").style.display =
    currentSlide === 0 ? "none" : "block";
  document.getElementById("rightArrow").style.display =
    currentSlide === maxSlide - 1 ? "none" : "block";
}

function createDots(count) {
  const dotsContainer = document.getElementById("carouselDots");
  dotsContainer.innerHTML = "";

  for (let i = 0; i < count; i++) {
    const dot = document.createElement("span");
    if (i === currentSlide) dot.classList.add("active");
    dotsContainer.appendChild(dot);
  }
}

function updateDots() {
  const dots = document.getElementById("carouselDots").children;
  for (let i = 0; i < dots.length; i++) {
    dots[i].className = i === currentSlide ? "active" : "";
  }
}

function closeModal() {
  const modal = document.getElementById("ConceptModal");
  const content = document.getElementById("modalContent");

  modal.classList.add("hide");
  content.classList.add("hide");

  setTimeout(() => {
    modal.classList.remove("show", "hide");
    content.classList.remove("hide");
    document.getElementById("img1").src = "";
    document.getElementById("img2").src = "";
  }, 300);
  document.body.style.overflow = "auto"; // allow scrolling again
}

function handleBackdropClick(event) {
  const modalContent = document.getElementById("modalContent");
  if (!modalContent.contains(event.target)) {
    closeModal();
  }
}
let startX = 0;

document.getElementById("carouselTrack").addEventListener(
  "touchstart",
  function (e) {
    startX = e.touches[0].clientX;
  },
  false
);

document.getElementById("carouselTrack").addEventListener(
  "touchend",
  function (e) {
    let endX = e.changedTouches[0].clientX;
    let diff = startX - endX;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        slideModal(1); // swipe left -> next image
      } else {
        slideModal(-1); // swipe right -> previous image
      }
    }
  },
  false
);

document.addEventListener("DOMContentLoaded", function () {
  // Auto-generate flowers
  const flowerCells = document.querySelectorAll("td[data-flowers]");

  flowerCells.forEach((cell) => {
    const flowerCount = parseInt(cell.getAttribute("data-flowers"));

    // Create a container div
    const container = document.createElement("div");
    container.className = "flower-container";

    // Generate and append flowers to the container
    for (let i = 0; i < flowerCount; i++) {
      const img = document.createElement("img");
      img.src = "Images/Format/blume.png";
      img.alt = "Flower";
      img.className = "flower";
      container.appendChild(img);
    }

    // Append the container to the cell
    cell.appendChild(container);
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const glassContainers = document.querySelectorAll(".glasses[data-glasses]");

  glassContainers.forEach((container) => {
    const count = parseInt(container.getAttribute("data-glasses"));

    for (let i = 0; i < count; i++) {
      const img = document.createElement("img");
      img.src = "Images/Concepts/Glass.png";
      img.alt = "Glass";
      img.className = "glass-icon";
      container.appendChild(img);
    }
  });
});

// Accordion toggle + arrow
document.querySelectorAll(".accordion-header").forEach((button) => {
  button.addEventListener("click", () => {
    const item = button.parentElement;
    item.classList.toggle("active");
  });
});

// Generate flowers
function renderFormatFlowers() {
  document
    .querySelectorAll(".formats-accordion .accordion-content p")
    .forEach((p) => {
      const count = parseInt(p.getAttribute("data-flowers"));
      const label = p.getAttribute("data-label");

      // Clear previous content
      p.innerHTML = "";

      // Create label span
      const labelSpan = document.createElement("span");
      labelSpan.className = "label-text";
      labelSpan.textContent = label;
      p.appendChild(labelSpan);

      // Create flower container
      const flowerContainer = document.createElement("div");
      flowerContainer.className = "flower-container";

      for (let i = 0; i < count; i++) {
        const img = document.createElement("img");
        img.src = "Images/Format/blume.png";
        img.alt = "Flower";
        img.className = "flower";
        flowerContainer.appendChild(img);
      }

      p.appendChild(flowerContainer);
    });
}

function getLang() {
  return (localStorage.getItem("language") || "de").toLowerCase();
}

function trackBrochureDownload() {
  const lang = getLang();
  gtag("event", "download_brochure", {
    event_category: "Downloads",
    event_label: `Brochure_${lang}`,
    language: lang,
    value: 1
  });
}

function trackEmailClick() {
  gtag("event", "contact_email", {
    event_category: "Contact",
    event_label: "Email Click",
    language: getLang(),
    value: 1
  });
}

function trackPhoneClick(person) {
  gtag("event", "contact_phone", {
    event_category: "Contact",
    event_label: `Phone Click - ${person}`,
    language: getLang(),
    value: 1
  });
}

function trackSocialClick(platform) {
  gtag("event", "contact_social", {
    event_category: "Social",
    event_label: platform,
    language: getLang(),
    value: 1
  });
}