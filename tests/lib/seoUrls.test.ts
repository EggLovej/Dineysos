import { describe, expect, it } from "vitest";

import { cleanPath, localizedUrl } from "@/components/layout/Head";

describe("cleanPath", () => {
  it.each([
    ["/", "/"],
    ["", "/"],
    ["/events", "/events"],
    ["/events?utm=x", "/events"],
    ["/#pricing", "/"],
    ["/events/foo#top?x=1", "/events/foo"],
  ])("cleanPath(%p) -> %p", (input, expected) => {
    expect(cleanPath(input)).toBe(expected);
  });
});

describe("localizedUrl", () => {
  it("serves the default locale without a prefix", () => {
    expect(localizedUrl("de", "/")).toBe("https://dineysos.com/");
    expect(localizedUrl("de", "/events")).toBe("https://dineysos.com/events");
  });

  it("prefixes English", () => {
    expect(localizedUrl("en", "/")).toBe("https://dineysos.com/en");
    expect(localizedUrl("en", "/events/foo")).toBe("https://dineysos.com/en/events/foo");
  });

  it("never produces a /de prefix (the duplicate URL redirected in vercel.json)", () => {
    expect(localizedUrl("de", "/agb")).not.toContain("/de/");
  });
});
