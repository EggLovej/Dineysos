import { beforeEach, describe, expect, it, vi } from "vitest";

import { mockRequest } from "../helpers/http";
import { resetSupabase, sentryMock, supabaseMock, supabaseState } from "../helpers/mocks";

vi.mock("@sentry/nextjs", () => sentryMock);
vi.mock("@/lib/supabaseClient", () => ({ supabase: supabaseMock }));

const { default: handler } = await import("@/pages/api/feedback");

const validBody = {
  type: "sip-solve",
  ratings: {
    overall: 5,
    instructions: 4,
    alcohol: 3,
    wineSelection: 5,
    learning: 2,
    difficulty: 3,
    playAgain: 5,
  },
  additionalFeedback: "Great evening",
  timestamp: "2026-10-25T18:00:00.000Z",
};

describe("POST /api/feedback", () => {
  beforeEach(() => {
    resetSupabase();
    sentryMock.captureException.mockReset();
  });

  it("rejects non-POST requests", async () => {
    const { req, res } = mockRequest({ method: "GET" });
    await handler(req, res);
    expect(res.statusCode).toBe(405);
  });

  it("rejects a body without the sip-solve type", async () => {
    const { req, res } = mockRequest({ body: { rating: 3, comment: "x" } });
    await handler(req, res);
    expect(res.statusCode).toBe(400);
    expect(supabaseState.inserts).toHaveLength(0);
  });

  it("throws on a body without ratings (reported by the Sentry wrapper)", async () => {
    // Known gap, see docs/code-review-2026-10-25.md 1.5: no validation yet.
    const { req, res } = mockRequest({ body: { type: "sip-solve" } });
    await expect(handler(req, res)).rejects.toBeInstanceOf(TypeError);
    expect(supabaseState.inserts).toHaveLength(0);
  });

  it("returns 500 when Supabase rejects the insert", async () => {
    supabaseState.insertResult = { data: null, error: { message: "db down", code: "XX000" } };
    const { req, res } = mockRequest({ body: validBody });
    await handler(req, res);
    expect(res.statusCode).toBe(500);
    expect(sentryMock.captureException).toHaveBeenCalledTimes(1);
  });

  it("maps the ratings onto the table columns and returns 200", async () => {
    const { req, res } = mockRequest({ body: validBody });
    await handler(req, res);
    expect(res.statusCode).toBe(200);
    expect(supabaseState.inserts[0]).toMatchObject({
      overall_rating: 5,
      wine_selection_rating: 5,
      play_again_rating: 5,
      additional_feedback: "Great evening",
      timestamp: validBody.timestamp,
    });
  });
});
