/**
 * Renders a row of flower images in every <td> with a data-flowers attribute.
 * Example: <td data-flowers="3"></td>
 */
export function renderFlowers() {
  const flowerCells = document.querySelectorAll("td[data-flowers]");

  flowerCells.forEach((cell) => {
    const flowerCount = parseInt(cell.getAttribute("data-flowers"), 10);
    if (isNaN(flowerCount) || flowerCount <= 0) return;

    const container = document.createElement("div");
    container.className = "flower-container";

    for (let i = 0; i < flowerCount; i++) {
      const img = document.createElement("img");
      img.src = "/Images/Format/blume.png";
      img.alt = "Flower";
      img.className = "flower";
      container.appendChild(img);
    }

    cell.appendChild(container);
  });
}

/**
 * Appends a number of glass icons to each element with class "glasses" and data-glasses attribute.
 * Example: <div class="glasses" data-glasses="2"></div>
 */
export function renderGlasses() {
  const glassContainers = document.querySelectorAll(".glasses[data-glasses]");

  glassContainers.forEach((container) => {
    const count = parseInt(container.getAttribute("data-glasses"), 10);
    if (isNaN(count) || count <= 0) return;

    for (let i = 0; i < count; i++) {
      const img = document.createElement("img");
      img.src = "/Images/Concepts/Glass.png";
      img.alt = "Glass";
      img.className = "glass-icon";
      container.appendChild(img);
    }
  });
}

/**
 * For each paragraph in the format accordion, adds a label and a flower rating.
 * Expects data-flowers and data-label attributes on <p> elements.
 */
export function renderFormatFlowers() {
  const items = document.querySelectorAll(".formats-accordion .accordion-content p");

  items.forEach((p) => {
    const count = parseInt(p.getAttribute("data-flowers"), 10);
    const label = p.getAttribute("data-label");

    if (!label || isNaN(count) || count <= 0) return;

    p.innerHTML = ""; // Clear previous content

    const labelSpan = document.createElement("span");
    labelSpan.className = "label-text";
    labelSpan.textContent = label;
    p.appendChild(labelSpan);

    const flowerContainer = document.createElement("div");
    flowerContainer.className = "flower-container";

    for (let i = 0; i < count; i++) {
      const img = document.createElement("img");
      img.src = "/Images/Format/blume.png";
      img.alt = "Flower";
      img.className = "flower";
      flowerContainer.appendChild(img);
    }

    p.appendChild(flowerContainer);
  });
}