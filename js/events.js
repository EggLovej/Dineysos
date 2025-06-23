// /js/events.js
export async function loadUpcomingEvents() {
  const container = document.getElementById("events-grid");
  if (!container) return;

  const langButton = document.getElementById("current-lang");
  const currentLang = langButton?.textContent.toLowerCase() || "de";

  try {
    const indexRes = await fetch("/events/index.json");
    const eventFiles = await indexRes.json();

    const events = await Promise.all(
      eventFiles.map(async (filename) => {
        const res = await fetch(`/events/${filename}`);
        return await res.json();
      })
    );

    // Sort by date ascending
    events.sort((a, b) => new Date(a.date) - new Date(b.date));

    events.forEach((event) => {
      const card = document.createElement("div");
      card.className = "event-card";

      card.innerHTML = `
        <div class="event-date">${formatDate(event.date)}</div>
        <img src="${event.image}" alt="${event.title[currentLang]}" class="event-img" />
        <h2 class="event-title">${event.title[currentLang]}</h2>
        <p class="event-desc">${event.description[currentLang]}</p>
        <p class="event-location"><strong>${event.location}</strong></p>
      `;

      container.appendChild(card);
    });
  } catch (err) {
    console.error("Failed to load upcoming events:", err);
  }
}

function formatDate(dateStr) {
  const date = new Date(dateStr);
  return `${String(date.getDate()).padStart(2, "0")}.${String(
    date.getMonth() + 1
  ).padStart(2, "0")}.${date.getFullYear()}`;
}