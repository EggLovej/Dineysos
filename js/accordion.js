export function initAccordion() {
  const headers = document.querySelectorAll(".accordion-header");

  headers.forEach((button) => {
    button.addEventListener("click", () => {
      const current = button.parentElement;

      document.querySelectorAll(".accordion-item.active").forEach((item) => {
        if (item !== current) item.classList.remove("active");
      });

      current.classList.toggle("active");
    });
  });
}