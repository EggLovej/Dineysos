import styles from "@/styles/events/EventPage.module.css";

const EMAIL_PATTERN = "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}";
// Capturing group so split() keeps the matched emails; global so every email is split out.
const EMAIL_SPLIT_REGEX = new RegExp(`(${EMAIL_PATTERN})`, "g");
// Anchored and non-global: a global regex keeps lastIndex state between test() calls.
const EMAIL_TEST_REGEX = new RegExp(`^${EMAIL_PATTERN}$`);

export function formatParagraph(text: string) {
  const parts = text.split(EMAIL_SPLIT_REGEX);

  return parts.map((part, idx) =>
    EMAIL_TEST_REGEX.test(part) ? (
      <a key={idx} className={styles.email} href={`mailto:${part}`}>
        {part}
      </a>
    ) : (
      part
    )
  );
}

export function formatTimeRange(start: string, end: string) {
  const startTime = new Date(start).toLocaleTimeString("de-CH", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const endTime = new Date(end).toLocaleTimeString("de-CH", {
    hour: "2-digit",
    minute: "2-digit",
  });
  return `${startTime} – ${endTime}`;
}
