export async function loadUpcomingEvents(lang) {
  await loadEvents({
    lang,
    indexPath: "/events/index.json",
    containerId: "events-grid-upcoming",
    sort: (a, b) => new Date(a.date) - new Date(b.date),
  });
}

export async function loadPastEvents(lang) {
  await loadEvents({
    lang,
    indexPath: "/events/past-index.json",
    containerId: "events-grid-past",
    sort: (a, b) => new Date(b.date) - new Date(a.date), // most recent first
  });
}

async function loadEvents({ lang, indexPath, containerId, sort }) {
  const container = document.getElementById(containerId);
  if (!container) return;

  try {
    const indexRes = await fetch(indexPath);
    const eventDirs = await indexRes.json();

    const events = await Promise.all(
      eventDirs.map(async (folder) => {
        const res = await fetch(`/events/${folder}/info.json`);
        const data = await res.json();
        return { ...data, folder };
      })
    );

    events.sort(sort);

    container.innerHTML = ""; // Clear before adding

    events.forEach((event) => {
      const card = document.createElement("div");
      card.className = "event-card";

      card.innerHTML = `
        <a href="/events/${event.folder}/page.html" class="event-link">
          <img src="/events/${event.folder}/cover.png" alt="${event.title[lang]}" class="event-img" />
          <div class="event-description">
            <div class="event-title">
              <h3 class="nowrap">${event.title[lang]}</h3>
              <p>${event.subtitle[lang]}</p>
            </div>
            <div class="event-info">
              <div class="event-date">${formatDate(event.date)}</div>
              <div class="event-location">${event.city}</div>
            </div>
          </div>
        </a>
      `;

      container.appendChild(card);
    });
  } catch (err) {
    console.error(`Failed to load events from ${indexPath}:`, err);
  }
}

export async function loadEventInfo(lang) {
  try {
    const res = await fetch("info.json");
    const info = await res.json();

    // Populate image, title, subtitle, date, location
    document.getElementById("event-cover").src = "cover.png"; // or info.cover if you want it dynamic too
    document.getElementById("event-cover").alt = info.title[lang];
    document.getElementById("event-title-text").textContent = info.title[lang];

    if (info.subtitle?.[lang]) {
      const subtitleEl = document.createElement("p");
      subtitleEl.textContent = info.subtitle[lang];
      subtitleEl.className = "event-subtitle";
      document.querySelector(".event-header").insertBefore(subtitleEl, document.querySelector(".event-meta"));
    }

    document.getElementById("event-date").textContent = formatDate(info.date);
    document.getElementById("event-time").textContent = info.time;
    document.getElementById("event-location-name").textContent = info.location;
    document.getElementById("event-street").textContent = info.street;
    document.getElementById("event-zip-city").textContent = `${info.zip} ${info.city}`;
  } catch (err) {
    console.error("Failed to load event info.json", err);
  }
}

function formatDate(dateStr) {
  const date = new Date(dateStr);

  const weekday = date.toLocaleDateString("de-DE", { weekday: "short" }).replace(/\.$/, "");
  const day = date.toLocaleDateString("de-DE", { day: "2-digit" });
  const month = date.toLocaleDateString("de-DE", { month: "long" });
  const year = date.toLocaleDateString("de-DE", { year: "numeric" });

  return `${weekday} ${day}. ${month} ${year}`;
}