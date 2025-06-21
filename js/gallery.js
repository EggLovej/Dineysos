let index = 1;
let isHovering = false;
let isLightboxOpen = false;
let autoScrollTimer = null;
let track = null;
let totalImages = 0;

/**
 * Determines how many images are visible based on screen width.
 */
function getVisibleCount() {
  if (window.innerWidth < 768) return 1;
  if (window.innerWidth < 1200) return 2;
  return 4;
}

/**
 * Adds a buffer to support smooth looping of gallery images.
 */
function getImageBuffer() {
  return getVisibleCount() + 2;
}

/**
 * Gets the pixel width of a single image.
 */
function getImageWidthPx() {
  const firstImage = track?.querySelector("img");
  return firstImage?.getBoundingClientRect().width || 300;
}

/**
 * Moves the gallery in the specified direction (-1 or 1).
 * Wrapped for reuse by arrows or auto-scroll.
 */
export function moveGallery(direction = 1) {
  if (!track) return;

  // Reset timer to avoid double-moves
  resetAutoScroll();

  const imageWidth = getImageWidthPx();
  const visible = getVisibleCount();
  const buffer = getImageBuffer();

  index += direction;

  // Loop forward
  if (index >= totalImages - visible - buffer + 5) {
    track.style.transition = "none";
    index = 1;
    track.style.transform = `translateX(-${index * imageWidth}px)`;
    void track.offsetWidth;
    track.style.transition = "transform 0.5s ease";
    index += direction;
  }

  // Loop backward
  if (index <= 0) {
    track.style.transition = "none";
    index = totalImages - visible - buffer;
    track.style.transform = `translateX(-${index * imageWidth}px)`;
    void track.offsetWidth;
    track.style.transition = "transform 0.5s ease";
    index -= 1;
  }

  // Normal move
  track.style.transform = `translateX(-${index * imageWidth}px)`;
}

/**
 * Initializes the gallery: layout, scroll, lightbox, and auto-scroll.
 */
export function initGallery() {
  track = document.getElementById("gallery-track");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");

  if (!track || !lightbox || !lightboxImg) return;

  const galleryImages = track.querySelectorAll("img");
  totalImages = track.children.length;

  // Set initial position
  track.style.justifyContent = "flex-start";
  track.style.transform = `translateX(-${index * (100 / getVisibleCount())}%)`;

  window.addEventListener("resize", () => {
    track.style.justifyContent = "flex-start";
  });

  // Hover behavior disables auto-scroll
  galleryImages.forEach((img) => {
    img.addEventListener("mouseenter", () => {
      isHovering = true;
    });
  
    img.addEventListener("mouseleave", () => {
      isHovering = false;
      resetAutoScroll();
    });
  });

  // Lightbox open
  galleryImages.forEach((img) => {
    img.addEventListener("click", () => {
      lightboxImg.src = img.src;
      lightbox.style.display = "flex";
      setTimeout(() => (lightbox.style.opacity = "1"), 10);
      isLightboxOpen = true;

      const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollBarWidth}px`;
    });
  });

  // Lightbox close
  lightbox.addEventListener("click", (e) => {
    if (e.target !== lightboxImg) {
      lightbox.style.opacity = "0";
      setTimeout(() => {
        lightbox.style.display = "none";
      }, 300);
      isLightboxOpen = false;
      document.body.style.overflow = "auto";
      document.body.style.paddingRight = "0";

      resetAutoScroll();
    }
  });

  // Start auto-scroll
  startAutoScroll();
}

function startAutoScroll() {
  autoScrollTimer = setTimeout(() => {
    if (!isHovering && !isLightboxOpen) moveGallery(1);
    startAutoScroll(); // recursively continue
  }, 5000);
}

function resetAutoScroll() {
  clearTimeout(autoScrollTimer);
  startAutoScroll();
}