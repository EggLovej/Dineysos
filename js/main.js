const track = document.getElementById("gallery-track");
const totalImages = track.children.length;
const imageWidthPercent = 25; // image + margin
const visible = 4;
let index = 1;

const logo = document.querySelector('.logo');

window.addEventListener('scroll', () => {
    logo.classList.toggle('shrink', window.scrollY > 50);
});

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

// Auto scroll
setInterval(() => moveGallery(1), 4000);

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
