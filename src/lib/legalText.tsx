// Renders the light markup used in the privacy policy translations: **bold**, *em*,
// and the contact details as links.
export function renderPrivacyText(text: string) {
  return text
    .split(/(\*\*[^*]+\*\*|\*[^*]+\*|info@dineysos\.com|www\.edoeb\.admin\.ch|\+41 78 944 90 95)/g)
    .map((part, index) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={index}>{part.slice(2, -2)}</strong>;
      }
      if (part.startsWith("*") && part.endsWith("*")) {
        return <em key={index}>{part.slice(1, -1)}</em>;
      }
      if (part === "info@dineysos.com") {
        return (
          <a key={index} href={`mailto:${part}`}>
            {part}
          </a>
        );
      }
      if (part === "www.edoeb.admin.ch") {
        return (
          <a key={index} href={`https://${part}`}>
            {part}
          </a>
        );
      }
      if (part === "+41 78 944 90 95") {
        return (
          <a key={index} href="tel:+41789449095">
            {part}
          </a>
        );
      }
      return part;
    });
}
