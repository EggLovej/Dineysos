let currentSlide = 0;
let maxSlides = 0;

/**
 * Opens the modal with carousel images.
 * @param {string} baseName - Base name of image files (e.g., "Concept1")
 */
export function openModal(baseName) {
  const lang = (localStorage.getItem("language") || "de").toUpperCase();
  const isMobile = window.innerWidth <= 768;
  const deviceType = isMobile ? "Mobile" : "Desktop";
  maxSlides = isMobile ? 4 : 2;
  currentSlide = 0;

  const carouselTrack = document.getElementById("carouselTrack");
  carouselTrack.innerHTML = ""; // Clear old slides

  for (let i = 1; i <= maxSlides; i++) {
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

  updateArrows();
  createDots();
  document.body.style.overflow = "hidden";
}

/**
 * Moves the carousel by one slide in the specified direction.
 * @param {number} direction - +1 or -1
 */
export function slideModal(direction) {
  const track = document.getElementById("carouselTrack");

  currentSlide = Math.max(0, Math.min(currentSlide + direction, maxSlides - 1));
  track.style.transform = `translateX(-${currentSlide * 100}%)`;

  updateArrows();
  updateDots();
}

/**
 * Updates the visibility of navigation arrows.
 */
function updateArrows() {
  document.getElementById("leftArrow").style.display =
    currentSlide === 0 ? "none" : "block";
  document.getElementById("rightArrow").style.display =
    currentSlide === maxSlides - 1 ? "none" : "block";
}

/**
 * Creates dot indicators for the modal carousel.
 */
function createDots() {
  const dotsContainer = document.getElementById("carouselDots");
  dotsContainer.innerHTML = "";

  for (let i = 0; i < maxSlides; i++) {
    const dot = document.createElement("span");
    if (i === currentSlide) dot.classList.add("active");
    dotsContainer.appendChild(dot);
  }
}

/**
 * Updates the active state of carousel dots.
 */
function updateDots() {
  const dots = document.getElementById("carouselDots").children;
  Array.from(dots).forEach((dot, i) => {
    dot.className = i === currentSlide ? "active" : "";
  });
}

/**
 * Closes the modal and resets scroll state.
 */
export function closeModal() {
  const modal = document.getElementById("ConceptModal");
  const content = document.getElementById("modalContent");

  modal.classList.add("hide");
  content.classList.add("hide");

  setTimeout(() => {
    modal.classList.remove("show", "hide");
    content.classList.remove("hide");
  }, 300);

  document.body.style.overflow = "auto";
}

/**
 * Closes modal if backdrop (not content) is clicked.
 */
export function handleBackdropClick(event) {
  const modalContent = document.getElementById("modalContent");
  if (!modalContent.contains(event.target)) {
    closeModal();
  }
}

/**
 * Initializes swipe detection for modal carousel.
 * Should be called once on DOMContentLoaded.
 */
let swipeInitialized = false;

export function initModalSwipe() {
  if (swipeInitialized) return;
  swipeInitialized = true;

  const track = document.getElementById("carouselTrack");
  if (!track) return;

  let startX = 0;

  track.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  });

  track.addEventListener("touchend", (e) => {
    const endX = e.changedTouches[0].clientX;
    const diff = startX - endX;

    if (Math.abs(diff) > 50) {
      slideModal(diff > 0 ? 1 : -1);
    }
  });
}