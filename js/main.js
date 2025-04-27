const logo = document.querySelector(".logo");

window.addEventListener("scroll", () => {
  logo.classList.toggle("shrink", window.scrollY > 50);
});

const track = document.getElementById("gallery-track");
const totalImages = track.children.length;
const imageWidthPercent = 25; // image + margin
const visible = 4;
let index = 1;
let isHovering = false;
let isLightboxOpen = false;

function moveGallery(direction) {
  index += direction;

  // jump to end if needed
  if (index >= totalImages - visible) {
    track.style.transition = "none";
    index = 1;
    track.style.transform = `translateX(-${index * imageWidthPercent}%)`;
    void track.offsetWidth;
    track.style.transition = "transform 0.5s ease";
    index += direction;
  }

  // jump to beginning if needed
  if (index <= 0) {
    track.style.transition = "none";
    index = totalImages - visible - 1;
    track.style.transform = `translateX(-${index * imageWidthPercent}%)`;
    void track.offsetWidth;
    track.style.transition = "transform 0.5s ease";
    index -= 1;
  }

  track.style.transform = `translateX(-${index * imageWidthPercent}%)`;
}

// Initial position
track.style.transform = `translateX(-${index * imageWidthPercent}%)`;

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
setInterval(() => {
  if (!isHovering && !isLightboxOpen) {
    moveGallery(1);
  }
}, 4000);

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const galleryImages = document.querySelectorAll("#gallery-track img");

// Open lightbox when clicking an image
galleryImages.forEach(img => {
    img.addEventListener('click', () => {
      lightboxImg.src = img.src;
      lightbox.style.display = 'flex';
      setTimeout(() => {
        lightbox.style.opacity = '1';
      }, 10);
  
      isLightboxOpen = true;
      const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollBarWidth}px`; // compensate for missing scrollbar
    });
  });

// Close lightbox when clicking outside the image
lightbox.addEventListener('click', (e) => {
    if (e.target !== lightboxImg) {
      lightbox.style.opacity = '0';
      setTimeout(() => {
        lightbox.style.display = 'none';
      }, 300);
  
      isLightboxOpen = false;
      document.body.style.overflow = 'auto';
      document.body.style.paddingRight = '0'; // remove the compensation
    }
  });

let currentSlide = 0;

function openModal(baseName) {
  currentSlide = 0;

  document.getElementById(
    "img1"
  ).src = `Images/Concepts/Modals/${baseName}.png`;
  document.getElementById(
    "img2"
  ).src = `Images/Concepts/Modals/${baseName}2.png`;

  document.getElementById("carouselTrack").style.transform = `translateX(0%)`;
  document.getElementById("ConceptModal").classList.add("show");

  updateArrows();
  createDots();
  document.body.style.overflow = 'hidden';
}

function slideModal(direction) {
  const track = document.getElementById("carouselTrack");
  const maxSlide = 1;

  currentSlide = Math.min(Math.max(currentSlide + direction, 0), maxSlide);
  track.style.transform = `translateX(-${currentSlide * 100}%)`;

  updateArrows();
  updateDots();
}

function updateArrows() {
  document.getElementById("leftArrow").style.display =
    currentSlide === 0 ? "none" : "block";
  document.getElementById("rightArrow").style.display =
    currentSlide === 1 ? "none" : "block";
}

function createDots() {
  const dotsContainer = document.getElementById("carouselDots");
  dotsContainer.innerHTML = `
    <span class="${currentSlide === 0 ? "active" : ""}"></span>
    <span class="${currentSlide === 1 ? "active" : ""}"></span>
`;
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
    document.body.style.overflow = 'auto'; // allow scrolling again
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

document.addEventListener("DOMContentLoaded", function() {
    // Auto-generate flowers
    const flowerCells = document.querySelectorAll('td[data-flowers]');
  
    flowerCells.forEach(cell => {
      const flowerCount = parseInt(cell.getAttribute('data-flowers'));
  
      // Create a container div
      const container = document.createElement('div');
      container.className = 'flower-container';
  
      // Generate and append flowers to the container
      for (let i = 0; i < flowerCount; i++) {
        const img = document.createElement('img');
        img.src = 'Images/Format/blume.png';
        img.alt = 'Flower';
        img.className = 'flower';
        container.appendChild(img);
      }
  
      // Append the container to the cell
      cell.appendChild(container);
    });
  });