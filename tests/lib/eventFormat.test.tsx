import { describe, expect, it } from "vitest";

import { formatParagraph, formatTimeRange } from "@/lib/eventFormat";

// formatParagraph returns an array of strings and <a> elements.
function render(parts: ReturnType<typeof formatParagraph>) {
  return parts
    .map((part) =>
      typeof part === "string" ? part : `<a:${part.props.href}>${part.props.children}</a>`
    )
    .join("");
}

describe("formatParagraph", () => {
  it("leaves text without emails untouched", () => {
    expect(render(formatParagraph("Just a sentence."))).toBe("Just a sentence.");
  });

  it("links a single email", () => {
    expect(render(formatParagraph("Write to info@dineysos.com today."))).toBe(
      "Write to <a:mailto:info@dineysos.com>info@dineysos.com</a> today."
    );
  });

  it("links several emails, including adjacent ones (no regex state leaks)", () => {
    expect(render(formatParagraph("a@b.com c@d.ch and e@f.org"))).toBe(
      "<a:mailto:a@b.com>a@b.com</a> <a:mailto:c@d.ch>c@d.ch</a> and <a:mailto:e@f.org>e@f.org</a>"
    );
  });

  it("is stable when called repeatedly with the same input", () => {
    const text = "x@y.com and z@w.com";
    expect(render(formatParagraph(text))).toBe(render(formatParagraph(text)));
  });
});

describe("formatTimeRange", () => {
  it("formats a same-day range as HH:MM – HH:MM in de-CH", () => {
    // Use UTC inputs; the exact hours depend on the test machine's timezone, so
    // assert the shape and the dash rather than specific digits.
    const result = formatTimeRange("2026-11-03T17:00:00Z", "2026-11-03T20:30:00Z");
    expect(result).toMatch(/^\d{2}:\d{2} – \d{2}:\d{2}$/);
  });
});
