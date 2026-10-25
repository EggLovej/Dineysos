import type { NextApiRequest } from "next";
import { describe, expect, it } from "vitest";

import { getClientIp, normalizeEmail } from "@/lib/request";

describe("normalizeEmail", () => {
  it("trims and lower-cases a valid address", () => {
    expect(normalizeEmail("  Guest@Example.COM ")).toBe("guest@example.com");
  });

  it.each(["", "plain", "a@b", "a @b.com", "a@b .com", 123, null, undefined, {}])(
    "rejects %p",
    (value) => {
      expect(normalizeEmail(value)).toBeNull();
    }
  );

  it("rejects addresses longer than 254 characters", () => {
    expect(normalizeEmail(`${"a".repeat(250)}@b.com`)).toBeNull();
  });
});

describe("getClientIp", () => {
  const request = (headers: Record<string, string | string[]>) =>
    ({ headers, socket: { remoteAddress: "10.0.0.1" } }) as unknown as NextApiRequest;

  it("takes the first X-Forwarded-For entry", () => {
    expect(getClientIp(request({ "x-forwarded-for": "203.0.113.9, 10.0.0.2" }))).toBe(
      "203.0.113.9"
    );
  });

  it("handles an array header", () => {
    expect(getClientIp(request({ "x-forwarded-for": ["203.0.113.9", "x"] }))).toBe("203.0.113.9");
  });

  it("falls back to the socket address", () => {
    expect(getClientIp(request({}))).toBe("10.0.0.1");
  });
});
