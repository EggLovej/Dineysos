import { beforeEach, describe, expect, it, vi } from "vitest";

import { sentryMock } from "../helpers/mocks";

vi.mock("@sentry/nextjs", () => sentryMock);

const { logError, logEvent } = await import("@/lib/log");

describe("log helper", () => {
  beforeEach(() => {
    sentryMock.captureException.mockReset();
    sentryMock.logger.info.mockReset();
    sentryMock.logger.error.mockReset();
    vi.mocked(console.info).mockClear();
    vi.mocked(console.error).mockClear();
  });

  it("writes one JSON line and one Sentry log for an event, dropping empty fields", () => {
    logEvent("/api/x", "done", { language: "de", durationMs: 12, leadId: undefined, note: null });

    const line = JSON.parse(vi.mocked(console.info).mock.calls[0][0] as string);
    expect(line).toMatchObject({
      level: "info",
      route: "/api/x",
      outcome: "done",
      language: "de",
      durationMs: 12,
    });
    expect(line.at).toMatch(/^\d{4}-/);
    expect(sentryMock.logger.info).toHaveBeenCalledWith("/api/x done", {
      route: "/api/x",
      outcome: "done",
      language: "de",
      durationMs: 12,
    });
    expect(sentryMock.captureException).not.toHaveBeenCalled();
  });

  it("converts Supabase-style error objects into real errors before capturing", () => {
    logError("/api/x", "failed", { message: "relation does not exist", code: "42P01" });

    const captured = sentryMock.captureException.mock.calls[0][0] as Error;
    expect(captured).toBeInstanceOf(Error);
    expect(captured.message).toBe("relation does not exist");
    expect(captured.name).toBe("Error 42P01");
    expect(sentryMock.captureException.mock.calls[0][1]).toMatchObject({
      tags: { route: "/api/x", outcome: "failed" },
    });
    expect(sentryMock.logger.error).toHaveBeenCalledWith(
      "/api/x failed: relation does not exist",
      expect.objectContaining({ errorName: "Error 42P01" })
    );
  });

  it("passes real errors through unchanged", () => {
    const err = new RangeError("boom");
    logError("/api/x", "failed", err);
    expect(sentryMock.captureException.mock.calls[0][0]).toBe(err);
  });
});
